'use client';

import * as React from 'react';
import { cn } from '@/lib/utils';
import { QuestionCard, QuestionLabel, QuestionDescription } from '../QuestionCard';

export interface YesNoQuestionProps {
  id: string;
  question: string;
  description?: string;
  required?: boolean;
  value?: boolean;
  error?: string;
  onChange: (value: boolean) => void;
}

export function YesNoQuestion({
  id,
  question,
  description,
  required,
  value,
  error,
  onChange,
}: YesNoQuestionProps) {
  return (
    <QuestionCard error={error}>
      <QuestionLabel required={required}>{question}</QuestionLabel>
      {description && <QuestionDescription>{description}</QuestionDescription>}

      <div className="flex gap-4" role="radiogroup" aria-labelledby={id} aria-required={required}>
        <button
          type="button"
          onClick={() => onChange(true)}
          aria-checked={value === true}
          role="radio"
          className={cn(
            'flex-1 rounded-[3px] border-2 px-6 py-3 font-serif font-bold uppercase transition-all duration-200',
            'hover:border-primary hover:shadow-hover',
            'focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2',
            {
              'border-primary bg-primary text-white shadow-soft': value === true,
              'border-editorial-lightGray bg-white text-editorial-darkGray': value !== true,
            }
          )}
        >
          Yes
        </button>
        <button
          type="button"
          onClick={() => onChange(false)}
          aria-checked={value === false}
          role="radio"
          className={cn(
            'flex-1 rounded-[3px] border-2 px-6 py-3 font-serif font-bold uppercase transition-all duration-200',
            'hover:border-primary hover:shadow-hover',
            'focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2',
            {
              'border-primary bg-primary text-white shadow-soft': value === false,
              'border-editorial-lightGray bg-white text-editorial-darkGray': value !== false,
            }
          )}
        >
          No
        </button>
      </div>
    </QuestionCard>
  );
}
