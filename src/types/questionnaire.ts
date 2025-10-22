import type { QuestionConfig } from '@/components/questionnaire/QuestionRenderer';

export interface QuestionnaireStep {
  id: number;
  title: string;
  description?: string;
  questions: QuestionConfig[];
}

export interface QuestionnaireData {
  [questionId: string]: unknown; // Dynamic data based on question type
}

export interface QuestionnaireState {
  currentStep: number;
  data: QuestionnaireData;
  completedSteps: number[];
  lastSaved?: Date;
}
