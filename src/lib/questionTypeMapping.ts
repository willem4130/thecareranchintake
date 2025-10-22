import type { QuestionType as DbQuestionType } from '@prisma/client';
import type { QuestionType } from '@/components/questionnaire/QuestionRenderer';

/**
 * Maps database QuestionType enum to component QuestionType
 */
export function mapQuestionType(dbType: DbQuestionType): QuestionType {
  const mapping: Record<DbQuestionType, QuestionType> = {
    SHORT_TEXT: 'short-text',
    LONG_TEXT: 'long-text',
    EMAIL: 'email',
    PHONE: 'phone',
    DATE: 'date',
    RATING: 'rating',
    SCALE: 'scale',
    YES_NO: 'yes-no',
    SINGLE_CHOICE: 'single-choice',
    MULTIPLE_CHOICE: 'multiple-choice',
    DROPDOWN: 'dropdown',
    FILE_UPLOAD: 'file-upload',
    NUMBER: 'short-text', // Treat NUMBER as short-text for now
    TIME: 'short-text', // Treat TIME as short-text for now
  };

  return mapping[dbType];
}

/**
 * Parse JSON options from database
 */
export function parseOptions(optionsJson: unknown): { value: string; label: string }[] {
  if (!optionsJson) return [];

  try {
    if (Array.isArray(optionsJson)) {
      return optionsJson.map((opt, idx) => {
        if (typeof opt === 'string') {
          return { value: opt.toLowerCase().replace(/\s+/g, '-'), label: opt };
        }
        if (typeof opt === 'object' && opt !== null && 'value' in opt && 'label' in opt) {
          return opt as { value: string; label: string };
        }
        return { value: `option-${idx}`, label: String(opt) };
      });
    }
  } catch (e) {
    console.error('Failed to parse options:', e);
  }

  return [];
}

/**
 * Parse validation rules from database
 */
export function parseValidationRules(rulesJson: unknown):
  | {
      min?: number;
      max?: number;
      minValue?: number;
      maxValue?: number;
      minLabel?: string;
      maxLabel?: string;
      minSelections?: number;
      maxSelections?: number;
      pattern?: string;
    }
  | undefined {
  if (!rulesJson || typeof rulesJson !== 'object') return undefined;

  return rulesJson as {
    min?: number;
    max?: number;
    minValue?: number;
    maxValue?: number;
    minLabel?: string;
    maxLabel?: string;
    minSelections?: number;
    maxSelections?: number;
    pattern?: string;
  };
}
