'use client';

import * as React from 'react';
import { cn } from '@/lib/utils';
import { QuestionCard, QuestionLabel, QuestionDescription } from '../QuestionCard';

export interface RatingQuestionProps {
  id: string;
  question: string;
  description?: string;
  required?: boolean;
  value?: number;
  error?: string;
  minValue?: number;
  maxValue?: number;
  minLabel?: string;
  maxLabel?: string;
  onChange: (value: number) => void;
}

export function RatingQuestion({
  id,
  question,
  description,
  required,
  value,
  error,
  minValue = 0,
  maxValue = 10,
  minLabel,
  maxLabel,
  onChange,
}: RatingQuestionProps) {
  const values = Array.from({ length: maxValue - minValue + 1 }, (_, i) => minValue + i);

  return (
    <QuestionCard error={error}>
      <QuestionLabel required={required}>{question}</QuestionLabel>
      {description && <QuestionDescription>{description}</QuestionDescription>}

      <div className="space-y-4">
        {/* Rating Buttons */}
        <div
          className="flex flex-wrap gap-2"
          role="radiogroup"
          aria-labelledby={id}
          aria-required={required}
        >
          {values.map((val) => (
            <button
              key={val}
              type="button"
              onClick={() => onChange(val)}
              aria-checked={value === val}
              role="radio"
              className={cn(
                'flex h-12 w-12 items-center justify-center rounded-[3px] border-2 font-serif text-base font-bold transition-all duration-200',
                'hover:border-primary hover:shadow-hover',
                'focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2',
                {
                  'border-primary bg-primary text-white shadow-soft': value === val,
                  'border-editorial-lightGray bg-white text-editorial-darkGray': value !== val,
                }
              )}
            >
              {val}
            </button>
          ))}
        </div>

        {/* Labels */}
        {(minLabel || maxLabel) && (
          <div className="flex justify-between">
            {minLabel && (
              <span className="font-serif text-xs italic text-editorial-gray">{minLabel}</span>
            )}
            {maxLabel && (
              <span className="font-serif text-xs italic text-editorial-gray">{maxLabel}</span>
            )}
          </div>
        )}
      </div>
    </QuestionCard>
  );
}
