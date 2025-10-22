'use client';

import * as React from 'react';
import { cn } from '@/lib/utils';
import { QuestionCard, QuestionLabel, QuestionDescription } from '../QuestionCard';

export interface Choice {
  value: string;
  label: string;
}

export interface SingleChoiceQuestionProps {
  id: string;
  question: string;
  description?: string;
  required?: boolean;
  value?: string;
  error?: string;
  choices: Choice[];
  onChange: (value: string) => void;
}

export function SingleChoiceQuestion({
  id,
  question,
  description,
  required,
  value,
  error,
  choices,
  onChange,
}: SingleChoiceQuestionProps) {
  return (
    <QuestionCard error={error}>
      <QuestionLabel required={required}>{question}</QuestionLabel>
      {description && <QuestionDescription>{description}</QuestionDescription>}

      <div className="space-y-3" role="radiogroup" aria-labelledby={id} aria-required={required}>
        {choices.map((choice) => (
          <label
            key={choice.value}
            className={cn(
              'flex cursor-pointer items-center gap-3 rounded-[3px] border-2 px-4 py-3 transition-all duration-200',
              'hover:border-primary hover:shadow-hover',
              {
                'border-primary bg-primary/5': value === choice.value,
                'border-editorial-lightGray bg-white': value !== choice.value,
              }
            )}
          >
            <input
              type="radio"
              name={id}
              value={choice.value}
              checked={value === choice.value}
              onChange={(e) => onChange(e.target.value)}
              className="h-5 w-5 border-editorial-gray text-primary focus:ring-2 focus:ring-primary focus:ring-offset-2"
              aria-checked={value === choice.value}
            />
            <span className="font-serif text-sm text-editorial-darkGray">{choice.label}</span>
          </label>
        ))}
      </div>
    </QuestionCard>
  );
}
