import { z } from 'zod';
import { createTRPCRouter, protectedProcedure } from '@/server/api/trpc';
import { TRPCError } from '@trpc/server';

export const questionnaireRouter = createTRPCRouter({
  /**
   * Get the full form structure with all pages
   */
  getForm: protectedProcedure.query(async ({ ctx }) => {
    // Get the active form (assumes single active form)
    const form = await ctx.db.form.findFirst({
      where: { isActive: true },
      include: {
        pages: {
          orderBy: { order: 'asc' },
          include: {
            sections: {
              orderBy: { order: 'asc' },
              include: {
                questions: {
                  orderBy: { order: 'asc' },
                },
              },
            },
          },
        },
      },
    });

    if (!form) {
      throw new TRPCError({
        code: 'NOT_FOUND',
        message: 'No active form found',
      });
    }

    return form;
  }),

  /**
   * Get a specific page with all its questions
   */
  getPage: protectedProcedure
    .input(z.object({ pageId: z.string() }))
    .query(async ({ ctx, input }) => {
      const page = await ctx.db.formPage.findUnique({
        where: { id: input.pageId },
        include: {
          sections: {
            orderBy: { order: 'asc' },
            include: {
              questions: {
                orderBy: { order: 'asc' },
              },
            },
          },
          form: {
            select: {
              id: true,
              title: true,
            },
          },
        },
      });

      if (!page) {
        throw new TRPCError({
          code: 'NOT_FOUND',
          message: 'Page not found',
        });
      }

      return page;
    }),

  /**
   * Get page by order number (for /questionnaire/[step] routing)
   */
  getPageByOrder: protectedProcedure
    .input(z.object({ order: z.number().min(1) }))
    .query(async ({ ctx, input }) => {
      const form = await ctx.db.form.findFirst({
        where: { isActive: true },
      });

      if (!form) {
        throw new TRPCError({
          code: 'NOT_FOUND',
          message: 'No active form found',
        });
      }

      const page = await ctx.db.formPage.findFirst({
        where: {
          formId: form.id,
          order: input.order,
        },
        include: {
          sections: {
            orderBy: { order: 'asc' },
            include: {
              questions: {
                orderBy: { order: 'asc' },
              },
            },
          },
          form: {
            select: {
              id: true,
              title: true,
            },
          },
        },
      });

      if (!page) {
        throw new TRPCError({
          code: 'NOT_FOUND',
          message: `Page ${input.order} not found`,
        });
      }

      return page;
    }),

  /**
   * Get or create user's form submission with all responses
   */
  getSubmission: protectedProcedure.query(async ({ ctx }) => {
    const userId = ctx.session.user.id;

    // Get the active form
    const form = await ctx.db.form.findFirst({
      where: { isActive: true },
    });

    if (!form) {
      throw new TRPCError({
        code: 'NOT_FOUND',
        message: 'No active form found',
      });
    }

    // Get or create submission
    let submission = await ctx.db.formSubmission.findUnique({
      where: {
        formId_userId: {
          formId: form.id,
          userId,
        },
      },
      include: {
        responses: true,
        deadline: true,
      },
    });

    // Create submission if it doesn't exist
    if (!submission) {
      submission = await ctx.db.formSubmission.create({
        data: {
          formId: form.id,
          userId,
          status: 'IN_PROGRESS',
        },
        include: {
          responses: true,
          deadline: true,
        },
      });
    }

    return submission;
  }),

  /**
   * Get responses for a specific page
   */
  getPageResponses: protectedProcedure
    .input(z.object({ pageId: z.string() }))
    .query(async ({ ctx, input }) => {
      const userId = ctx.session.user.id;

      // Get submission
      const submission = await ctx.db.formSubmission.findFirst({
        where: {
          userId,
          form: { isActive: true },
        },
      });

      if (!submission) {
        return {};
      }

      // Get all questions for this page
      const page = await ctx.db.formPage.findUnique({
        where: { id: input.pageId },
        include: {
          sections: {
            include: {
              questions: true,
            },
          },
        },
      });

      if (!page) {
        return {};
      }

      // Get all question IDs for this page
      const questionIds = page.sections.flatMap((section) => section.questions.map((q) => q.id));

      // Get responses
      const responses = await ctx.db.response.findMany({
        where: {
          submissionId: submission.id,
          questionId: { in: questionIds },
        },
      });

      // Convert to map of questionId -> value
      const responseMap: Record<string, unknown> = {};
      responses.forEach((response) => {
        // Determine which value field to use based on what's populated
        let value: unknown = null;

        if (response.textValue !== null) {
          value = response.textValue;
        } else if (response.numberValue !== null) {
          value = response.numberValue;
        } else if (response.dateValue !== null) {
          value = response.dateValue;
        } else if (response.booleanValue !== null) {
          value = response.booleanValue;
        } else if (response.jsonValue !== null) {
          value = response.jsonValue;
        } else if (response.fileUrl !== null) {
          value = response.fileUrl;
        }

        responseMap[response.questionId] = value;
      });

      return responseMap;
    }),

  /**
   * Save responses (auto-save or manual save)
   */
  saveResponses: protectedProcedure
    .input(
      z.object({
        pageId: z.string(),
        responses: z.record(z.string(), z.unknown()),
      })
    )
    .mutation(async ({ ctx, input }) => {
      const userId = ctx.session.user.id;

      // Get or create submission
      const form = await ctx.db.form.findFirst({
        where: { isActive: true },
      });

      if (!form) {
        throw new TRPCError({
          code: 'NOT_FOUND',
          message: 'No active form found',
        });
      }

      let submission = await ctx.db.formSubmission.findUnique({
        where: {
          formId_userId: {
            formId: form.id,
            userId,
          },
        },
      });

      if (!submission) {
        submission = await ctx.db.formSubmission.create({
          data: {
            formId: form.id,
            userId,
            status: 'IN_PROGRESS',
          },
        });
      }

      // Get all questions for this page to validate
      const page = await ctx.db.formPage.findUnique({
        where: { id: input.pageId },
        include: {
          sections: {
            include: {
              questions: true,
            },
          },
        },
      });

      if (!page) {
        throw new TRPCError({
          code: 'NOT_FOUND',
          message: 'Page not found',
        });
      }

      // Map question IDs to their types
      const questionMap = new Map();
      page.sections.forEach((section) => {
        section.questions.forEach((q) => {
          questionMap.set(q.id, q.type);
        });
      });

      // Save each response
      await Promise.all(
        Object.entries(input.responses).map(async ([questionId, value]) => {
          if (!questionMap.has(questionId)) {
            // Skip invalid question IDs
            return;
          }

          // Determine which field to store the value in
          const responseData: {
            textValue?: string | null;
            numberValue?: number | null;
            dateValue?: Date | null;
            booleanValue?: boolean | null;
            jsonValue?: unknown;
            fileUrl?: string | null;
          } = {};

          if (typeof value === 'string') {
            responseData.textValue = value;
          } else if (typeof value === 'number') {
            responseData.numberValue = value;
          } else if (typeof value === 'boolean') {
            responseData.booleanValue = value;
          } else if (value instanceof Date) {
            responseData.dateValue = value;
          } else if (value !== null && value !== undefined) {
            responseData.jsonValue = value;
          } else {
            // Clear all values for null/undefined
            responseData.textValue = null;
            responseData.numberValue = null;
            responseData.dateValue = null;
            responseData.booleanValue = null;
            responseData.jsonValue = null;
            responseData.fileUrl = null;
          }

          // Upsert response
          await ctx.db.response.upsert({
            where: {
              submissionId_questionId: {
                submissionId: submission.id,
                questionId,
              },
            },
            create: {
              submissionId: submission.id,
              questionId,
              ...responseData,
              jsonValue: responseData.jsonValue as never,
            },
            update: {
              ...responseData,
              jsonValue: responseData.jsonValue as never,
            },
          });
        })
      );

      // Update lastSavedAt and currentPageId
      await ctx.db.formSubmission.update({
        where: { id: submission.id },
        data: {
          lastSavedAt: new Date(),
          currentPageId: input.pageId,
        },
      });

      return { success: true };
    }),

  /**
   * Submit form (mark as completed)
   */
  submitForm: protectedProcedure.mutation(async ({ ctx }) => {
    const userId = ctx.session.user.id;

    const form = await ctx.db.form.findFirst({
      where: { isActive: true },
    });

    if (!form) {
      throw new TRPCError({
        code: 'NOT_FOUND',
        message: 'No active form found',
      });
    }

    const submission = await ctx.db.formSubmission.findUnique({
      where: {
        formId_userId: {
          formId: form.id,
          userId,
        },
      },
    });

    if (!submission) {
      throw new TRPCError({
        code: 'NOT_FOUND',
        message: 'Submission not found',
      });
    }

    // Update status to SUBMITTED
    await ctx.db.formSubmission.update({
      where: { id: submission.id },
      data: {
        status: 'SUBMITTED',
        submittedAt: new Date(),
      },
    });

    return { success: true };
  }),

  /**
   * Get form progress (percentage complete)
   */
  getProgress: protectedProcedure.query(async ({ ctx }) => {
    const userId = ctx.session.user.id;

    const form = await ctx.db.form.findFirst({
      where: { isActive: true },
      include: {
        pages: {
          include: {
            sections: {
              include: {
                questions: true,
              },
            },
          },
        },
      },
    });

    if (!form) {
      return { percentage: 0, answered: 0, total: 0 };
    }

    const submission = await ctx.db.formSubmission.findUnique({
      where: {
        formId_userId: {
          formId: form.id,
          userId,
        },
      },
      include: {
        responses: true,
      },
    });

    // Count total questions
    const totalQuestions = form.pages.reduce(
      (total, page) =>
        total +
        page.sections.reduce((sectionTotal, section) => sectionTotal + section.questions.length, 0),
      0
    );

    const answeredQuestions = submission?.responses.length ?? 0;
    const percentage =
      totalQuestions > 0 ? Math.round((answeredQuestions / totalQuestions) * 100) : 0;

    return {
      percentage,
      answered: answeredQuestions,
      total: totalQuestions,
    };
  }),
});
