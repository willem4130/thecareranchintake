'use client';

import * as React from 'react';
import { Input } from '@/components/ui/input';
import { QuestionCard, QuestionLabel, QuestionDescription } from '../QuestionCard';

export interface PhoneQuestionProps {
  id: string;
  question: string;
  description?: string;
  required?: boolean;
  value?: string;
  error?: string;
  placeholder?: string;
  onChange: (value: string) => void;
}

export function PhoneQuestion({
  id,
  question,
  description,
  required,
  value = '',
  error,
  placeholder = '+31 6 12345678',
  onChange,
}: PhoneQuestionProps) {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    // Allow only numbers, spaces, +, (, ), and -
    const sanitized = e.target.value.replace(/[^0-9+\-() ]/g, '');
    onChange(sanitized);
  };

  return (
    <QuestionCard error={error}>
      <QuestionLabel required={required}>{question}</QuestionLabel>
      {description && <QuestionDescription>{description}</QuestionDescription>}
      <Input
        id={id}
        type="tel"
        value={value}
        onChange={handleChange}
        placeholder={placeholder}
        aria-required={required}
        aria-invalid={!!error}
        aria-describedby={error ? `${id}-error` : undefined}
      />
      {!error && (
        <p className="mt-1 font-serif text-xs italic text-editorial-gray">
          Include country code (e.g., +31 for Netherlands)
        </p>
      )}
    </QuestionCard>
  );
}
