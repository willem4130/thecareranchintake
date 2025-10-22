'use client';

import * as React from 'react';
import { Input } from '@/components/ui/input';
import { QuestionCard, QuestionLabel, QuestionDescription } from '../QuestionCard';

export interface ShortTextQuestionProps {
  id: string;
  question: string;
  description?: string;
  required?: boolean;
  value?: string;
  error?: string;
  placeholder?: string;
  onChange: (value: string) => void;
}

export function ShortTextQuestion({
  id,
  question,
  description,
  required,
  value = '',
  error,
  placeholder,
  onChange,
}: ShortTextQuestionProps) {
  return (
    <QuestionCard error={error}>
      <QuestionLabel required={required}>{question}</QuestionLabel>
      {description && <QuestionDescription>{description}</QuestionDescription>}
      <Input
        id={id}
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        aria-required={required}
        aria-invalid={!!error}
        aria-describedby={error ? `${id}-error` : undefined}
      />
    </QuestionCard>
  );
}
