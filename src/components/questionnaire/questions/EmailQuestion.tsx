'use client';

import * as React from 'react';
import { Input } from '@/components/ui/input';
import { QuestionCard, QuestionLabel, QuestionDescription } from '../QuestionCard';

export interface EmailQuestionProps {
  id: string;
  question: string;
  description?: string;
  required?: boolean;
  value?: string;
  error?: string;
  placeholder?: string;
  onChange: (value: string) => void;
}

export function EmailQuestion({
  id,
  question,
  description,
  required,
  value = '',
  error,
  placeholder = 'your@email.com',
  onChange,
}: EmailQuestionProps) {
  return (
    <QuestionCard error={error}>
      <QuestionLabel required={required}>{question}</QuestionLabel>
      {description && <QuestionDescription>{description}</QuestionDescription>}
      <Input
        id={id}
        type="email"
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
