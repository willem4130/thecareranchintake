'use client';

import * as React from 'react';
import { cn } from '@/lib/utils';
import { QuestionCard, QuestionLabel, QuestionDescription } from '../QuestionCard';

export interface LongTextQuestionProps {
  id: string;
  question: string;
  description?: string;
  required?: boolean;
  value?: string;
  error?: string;
  placeholder?: string;
  rows?: number;
  maxLength?: number;
  onChange: (value: string) => void;
}

export function LongTextQuestion({
  id,
  question,
  description,
  required,
  value = '',
  error,
  placeholder,
  rows = 6,
  maxLength,
  onChange,
}: LongTextQuestionProps) {
  const characterCount = value.length;
  const showCount = maxLength !== undefined;

  return (
    <QuestionCard error={error}>
      <QuestionLabel required={required}>{question}</QuestionLabel>
      {description && <QuestionDescription>{description}</QuestionDescription>}
      <textarea
        id={id}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        rows={rows}
        maxLength={maxLength}
        aria-required={required}
        aria-invalid={!!error}
        aria-describedby={error ? `${id}-error` : undefined}
        className={cn(
          'w-full rounded-[3px] border border-editorial-lightGray bg-white px-[10px] py-[5px]',
          'font-serif text-sm leading-relaxed text-editorial-darkGray',
          'placeholder:text-editorial-gray',
          'focus:border-editorial-gray focus:outline-none',
          'transition-colors',
          'disabled:cursor-not-allowed disabled:opacity-50'
        )}
      />
      {showCount && (
        <p className="mt-2 text-right font-serif text-xs text-editorial-gray">
          {characterCount} / {maxLength} characters
        </p>
      )}
    </QuestionCard>
  );
}
