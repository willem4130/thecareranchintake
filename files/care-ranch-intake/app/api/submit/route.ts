import { NextRequest, NextResponse } from "next/server";
import { intakeFormSchema } from "@/lib/form-schema";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    // Validate the data
    const validatedData = intakeFormSchema.parse(body);

    // TODO: Send email using Resend
    // const { data, error } = await resend.emails.send({
    //   from: 'Intake Form <onboarding@resend.dev>',
    //   to: ['your-email@thecareranch.com'],
    //   subject: 'New Retreat Intake Form Submission',
    //   html: generateEmailHTML(validatedData),
    // });

    // For now, just log the data
    console.log("Form submission received:", validatedData);

    // TODO: Optionally save to database

    return NextResponse.json(
      { message: "Form submitted successfully!" },
      { status: 200 }
    );
  } catch (error) {
    console.error("Form submission error:", error);
    return NextResponse.json(
      { error: "Failed to submit form" },
      { status: 500 }
    );
  }
}
