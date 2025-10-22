'use client';

import * as React from 'react';
import { useParams, useRouter } from 'next/navigation';
import { PageContainer, ProgressTimeline, AutoSaveIndicator } from '@/components/questionnaire';
import { QuestionRenderer, type QuestionConfig } from '@/components/questionnaire/QuestionRenderer';
import { useAutoSave, type AutoSaveStatus } from '@/hooks/useAutoSave';
import { questionnaireSteps } from '@/lib/questionnaireData';
import type { QuestionnaireData } from '@/types/questionnaire';
import { Button } from '@/components/ui/button';
import { ChevronLeft, ChevronRight, CheckCircle } from 'lucide-react';

const STORAGE_KEY = 'questionnaire-data';

export default function QuestionnairePage() {
  const params = useParams();
  const router = useRouter();
  const stepParam = params.step as string;
  const currentStepNumber = parseInt(stepParam, 10);

  const [formData, setFormData] = React.useState<QuestionnaireData>({});
  const [saveStatus, setSaveStatus] = React.useState<AutoSaveStatus>('idle');
  const [isInitialized, setIsInitialized] = React.useState(false);

  const currentStep = questionnaireSteps.find((s) => s.id === currentStepNumber);
  const isLastStep = currentStepNumber === questionnaireSteps.length;
  const isFirstStep = currentStepNumber === 1;

  // Initialize data from localStorage on mount
  React.useEffect(() => {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
      try {
        const parsed = JSON.parse(stored);
        setFormData(parsed);
      } catch (e) {
        console.error('Failed to parse stored data:', e);
      }
    }
    setIsInitialized(true);
  }, []);

  // Auto-save hook
  useAutoSave({
    data: formData,
    onSave: async (data) => {
      // Save to localStorage
      localStorage.setItem(STORAGE_KEY, JSON.stringify(data));

      // TODO: Replace with actual API call
      // await api.saveQuestionnaire(data);

      // Simulate network delay
      await new Promise((resolve) => setTimeout(resolve, 500));
    },
    delay: 500,
    enabled: isInitialized,
    onStatusChange: setSaveStatus,
  });

  const handleFieldChange = (questionId: string, value: unknown) => {
    setFormData((prev) => ({
      ...prev,
      [questionId]: value,
    }));
  };

  const handleNext = () => {
    if (currentStepNumber < questionnaireSteps.length) {
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
      // TODO: Replace with actual API submission
      console.log('Submitting questionnaire:', formData);

      // Simulate submission
      await new Promise((resolve) => setTimeout(resolve, 1000));

      // Clear localStorage after successful submission
      localStorage.removeItem(STORAGE_KEY);

      // Redirect to success page
      alert('Questionnaire submitted successfully!');
      router.push('/');
    } catch (error) {
      console.error('Submission error:', error);
      alert('Failed to submit questionnaire. Please try again.');
    }
  };

  // Render questions with data binding
  const renderQuestions = () => {
    if (!currentStep) return null;

    return currentStep.questions.map((question) => {
      const questionWithData: QuestionConfig = {
        ...question,
        value: formData[question.id],
        onChange: (value: unknown) => handleFieldChange(question.id, value),
      } as QuestionConfig;

      return <QuestionRenderer key={question.id} config={questionWithData} />;
    });
  };

  // Render review step
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

          {/* Summary of responses */}
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
          className="w-full gap-2 bg-primary font-serif text-lg font-bold hover:bg-primary/90"
        >
          <CheckCircle className="h-5 w-5" />
          Submit Questionnaire
        </Button>
      </div>
    );
  };

  // Redirect to step 1 if invalid step
  React.useEffect(() => {
    if (
      isNaN(currentStepNumber) ||
      currentStepNumber < 1 ||
      currentStepNumber > questionnaireSteps.length
    ) {
      router.push('/questionnaire/1');
    }
  }, [currentStepNumber, router]);

  if (!currentStep || !isInitialized) {
    return null; // Or loading state
  }

  return (
    <PageContainer>
      {/* Header with Progress */}
      <div className="mb-8 space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="font-serif text-3xl font-bold text-editorial-darkGray">
              {currentStep.title}
            </h1>
            {currentStep.description && (
              <p className="mt-2 font-serif text-base text-editorial-gray">
                {currentStep.description}
              </p>
            )}
          </div>
          <AutoSaveIndicator status={saveStatus} />
        </div>

        <ProgressTimeline
          steps={questionnaireSteps.map((step) => ({
            id: step.id.toString(),
            title: step.title,
            order: step.id,
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
