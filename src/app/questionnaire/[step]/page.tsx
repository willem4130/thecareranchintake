'use client';

import * as React from 'react';
import { useParams, useRouter } from 'next/navigation';
import { PageContainer, ProgressTimeline, AutoSaveIndicator } from '@/components/questionnaire';
import { QuestionRenderer, type QuestionConfig } from '@/components/questionnaire/QuestionRenderer';
import { useAutoSave, type AutoSaveStatus } from '@/hooks/useAutoSave';
import { api } from '@/trpc/client';
import { Button } from '@/components/ui/button';
import { ChevronLeft, ChevronRight, CheckCircle, Loader2 } from 'lucide-react';
import { mapQuestionType, parseOptions, parseValidationRules } from '@/lib/questionTypeMapping';

export default function QuestionnairePage() {
  const params = useParams();
  const router = useRouter();
  const stepParam = params.step as string;
  const currentStepNumber = parseInt(stepParam, 10);

  const [formData, setFormData] = React.useState<Record<string, unknown>>({});
  const [saveStatus, setSaveStatus] = React.useState<AutoSaveStatus>('idle');
  const [pageId, setPageId] = React.useState<string | null>(null);

  // Fetch form structure to get total pages
  const { data: form } = api.questionnaire.getForm.useQuery();

  // Fetch page data by order number
  const { data: page, isLoading: isLoadingPage } = api.questionnaire.getPageByOrder.useQuery(
    { order: currentStepNumber },
    { enabled: currentStepNumber > 0 && !isNaN(currentStepNumber) }
  );

  // Fetch existing responses for this page
  const { data: responses } = api.questionnaire.getPageResponses.useQuery(
    { pageId: pageId! },
    { enabled: !!pageId }
  );

  // Save responses mutation
  const saveResponsesMutation = api.questionnaire.saveResponses.useMutation();

  // Submit form mutation
  const submitFormMutation = api.questionnaire.submitForm.useMutation();

  // Update pageId when page loads
  React.useEffect(() => {
    if (page) {
      setPageId(page.id);
    }
  }, [page]);

  // Initialize form data from responses
  React.useEffect(() => {
    if (responses) {
      setFormData(responses);
    }
  }, [responses]);

  // Auto-save hook
  useAutoSave({
    data: formData,
    onSave: async (data) => {
      if (!pageId) return;

      await saveResponsesMutation.mutateAsync({
        pageId,
        responses: data,
      });
    },
    delay: 500,
    enabled: !!pageId,
    onStatusChange: setSaveStatus,
  });

  const handleFieldChange = (questionId: string, value: unknown) => {
    setFormData((prev) => ({
      ...prev,
      [questionId]: value,
    }));
  };

  const handleNext = () => {
    if (form && currentStepNumber < form.pages.length) {
      router.push(`/questionnaire/${currentStepNumber + 1}`);
    }
  };

  const handlePrevious = () => {
    if (currentStepNumber > 1) {
      router.push(`/questionnaire/${currentStepNumber - 1}`);
    }
  };

  const handleSubmit = async () => {
    try {
      await submitFormMutation.mutateAsync();
      alert('Questionnaire submitted successfully!');
      router.push('/');
    } catch (error) {
      console.error('Submission error:', error);
      alert('Failed to submit questionnaire. Please try again.');
    }
  };

  // Redirect to step 1 if invalid step
  React.useEffect(() => {
    if (
      form &&
      (isNaN(currentStepNumber) || currentStepNumber < 1 || currentStepNumber > form.pages.length)
    ) {
      router.push('/questionnaire/1');
    }
  }, [currentStepNumber, form, router]);

  // Map database questions to component questions
  const renderQuestions = () => {
    if (!page) return null;

    const allQuestions = page.sections.flatMap((section: (typeof page.sections)[number]) =>
      section.questions.map((dbQuestion: (typeof section.questions)[number]) => {
        const questionType = mapQuestionType(dbQuestion.type);
        const validation = parseValidationRules(dbQuestion.validationRules);
        const options = parseOptions(dbQuestion.options);

        // Base props for all questions
        const baseConfig = {
          id: dbQuestion.id,
          question: dbQuestion.text,
          description: dbQuestion.description ?? undefined,
          required: dbQuestion.required,
          value: formData[dbQuestion.id],
          onChange: (value: unknown) => handleFieldChange(dbQuestion.id, value),
        };

        // Build question config based on type
        let questionConfig: QuestionConfig;

        switch (questionType) {
          case 'short-text':
          case 'email':
          case 'phone':
            questionConfig = {
              ...baseConfig,
              type: questionType,
            } as QuestionConfig;
            break;

          case 'long-text':
            questionConfig = {
              ...baseConfig,
              type: questionType,
              rows: validation?.min ?? 4,
              maxLength: validation?.max,
            } as QuestionConfig;
            break;

          case 'date':
            questionConfig = {
              ...baseConfig,
              type: questionType,
            } as QuestionConfig;
            break;

          case 'rating':
          case 'scale':
            questionConfig = {
              ...baseConfig,
              type: questionType,
              minValue: validation?.minValue ?? (questionType === 'rating' ? 0 : 1),
              maxValue: validation?.maxValue ?? 10,
              minLabel: validation?.minLabel,
              maxLabel: validation?.maxLabel,
            } as QuestionConfig;
            break;

          case 'yes-no':
            questionConfig = {
              ...baseConfig,
              type: questionType,
            } as QuestionConfig;
            break;

          case 'single-choice':
            questionConfig = {
              ...baseConfig,
              type: questionType,
              choices: options,
            } as QuestionConfig;
            break;

          case 'multiple-choice':
            questionConfig = {
              ...baseConfig,
              type: questionType,
              options,
              minSelections: validation?.minSelections,
              maxSelections: validation?.maxSelections,
            } as QuestionConfig;
            break;

          case 'dropdown':
            questionConfig = {
              ...baseConfig,
              type: questionType,
              options,
            } as QuestionConfig;
            break;

          case 'file-upload':
            questionConfig = {
              ...baseConfig,
              type: questionType,
            } as QuestionConfig;
            break;

          default:
            questionConfig = {
              ...baseConfig,
              type: 'short-text',
            } as QuestionConfig;
        }

        return <QuestionRenderer key={dbQuestion.id} config={questionConfig} />;
      })
    );

    return allQuestions;
  };

  // Render review step (last step)
  const renderReviewStep = () => {
    return (
      <div className="space-y-6">
        <div className="rounded-[3px] border-2 border-editorial-lightGray bg-white p-8">
          <h3 className="mb-4 font-serif text-2xl font-bold text-editorial-darkGray">
            Review Your Information
          </h3>
          <p className="mb-6 font-serif text-base text-editorial-gray">
            Please review your responses before submitting. You can go back to make changes if
            needed.
          </p>

          <div className="space-y-4">
            {Object.entries(formData).map(([key, value]) => (
              <div key={key} className="border-b border-editorial-lightGray pb-3 last:border-b-0">
                <span className="font-serif text-sm font-bold text-editorial-darkGray">{key}:</span>
                <p className="mt-1 font-serif text-sm text-editorial-gray">
                  {typeof value === 'object' ? JSON.stringify(value) : String(value || 'N/A')}
                </p>
              </div>
            ))}
          </div>
        </div>

        <Button
          onClick={handleSubmit}
          size="lg"
          disabled={submitFormMutation.isPending}
          className="w-full gap-2 bg-primary font-serif text-lg font-bold hover:bg-primary/90"
        >
          {submitFormMutation.isPending ? (
            <>
              <Loader2 className="h-5 w-5 animate-spin" />
              Submitting...
            </>
          ) : (
            <>
              <CheckCircle className="h-5 w-5" />
              Submit Questionnaire
            </>
          )}
        </Button>
      </div>
    );
  };

  // Loading state
  if (isLoadingPage || !page || !form) {
    return (
      <PageContainer>
        <div className="flex min-h-[400px] items-center justify-center">
          <Loader2 className="h-8 w-8 animate-spin text-primary" />
        </div>
      </PageContainer>
    );
  }

  const isLastStep = currentStepNumber === form.pages.length;
  const isFirstStep = currentStepNumber === 1;

  return (
    <PageContainer>
      {/* Header with Progress */}
      <div className="mb-8 space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="font-serif text-3xl font-bold text-editorial-darkGray">{page.title}</h1>
            {page.description && (
              <p className="mt-2 font-serif text-base text-editorial-gray">{page.description}</p>
            )}
          </div>
          <AutoSaveIndicator status={saveStatus} />
        </div>

        <ProgressTimeline
          steps={form.pages.map((p: (typeof form.pages)[number]) => ({
            id: p.id,
            title: p.title,
            order: p.order,
          }))}
          currentStep={currentStepNumber}
        />
      </div>

      {/* Questions or Review */}
      <div className="mb-8 space-y-6">{isLastStep ? renderReviewStep() : renderQuestions()}</div>

      {/* Navigation Buttons */}
      <div className="flex items-center justify-between border-t-2 border-editorial-lightGray pt-6">
        <Button
          onClick={handlePrevious}
          disabled={isFirstStep}
          variant="outline"
          size="lg"
          className="gap-2"
        >
          <ChevronLeft className="h-5 w-5" />
          Previous
        </Button>

        {!isLastStep && (
          <Button onClick={handleNext} size="lg" className="gap-2 bg-primary hover:bg-primary/90">
            Next
            <ChevronRight className="h-5 w-5" />
          </Button>
        )}
      </div>
    </PageContainer>
  );
}
