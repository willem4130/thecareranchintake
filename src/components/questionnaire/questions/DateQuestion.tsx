'use client';

import * as React from 'react';
import { Input } from '@/components/ui/input';
import { QuestionCard, QuestionLabel, QuestionDescription } from '../QuestionCard';
import { format, isValid, parse } from 'date-fns';

export interface DateQuestionProps {
  id: string;
  question: string;
  description?: string;
  required?: boolean;
  value?: string; // ISO date string (YYYY-MM-DD)
  error?: string;
  minDate?: string; // ISO date string
  maxDate?: string; // ISO date string
  onChange: (value: string) => void;
}

export function DateQuestion({
  id,
  question,
  description,
  required,
  value = '',
  error,
  onChange,
}: DateQuestionProps) {
  const [displayValue, setDisplayValue] = React.useState('');

  // Initialize display value from ISO string
  React.useEffect(() => {
    if (value) {
      try {
        const date = parse(value, 'yyyy-MM-dd', new Date());
        if (isValid(date)) {
          setDisplayValue(format(date, 'dd-MM-yyyy'));
        }
      } catch {
        setDisplayValue('');
      }
    }
  }, [value]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const input = e.target.value;
    setDisplayValue(input);

    // Try to parse DD-MM-YYYY format
    const cleaned = input.replace(/[^0-9]/g, '');
    if (cleaned.length === 8) {
      const day = cleaned.slice(0, 2);
      const month = cleaned.slice(2, 4);
      const year = cleaned.slice(4, 8);
      const dateString = `${day}-${month}-${year}`;

      try {
        const parsedDate = parse(dateString, 'dd-MM-yyyy', new Date());
        if (isValid(parsedDate)) {
          // Convert to ISO format for storage
          const isoDate = format(parsedDate, 'yyyy-MM-dd');
          onChange(isoDate);
        }
      } catch {
        // Invalid date, don't update
      }
    }
  };

  const handleBlur = () => {
    // Reformat display value on blur if valid
    if (value) {
      try {
        const date = parse(value, 'yyyy-MM-dd', new Date());
        if (isValid(date)) {
          setDisplayValue(format(date, 'dd-MM-yyyy'));
        }
      } catch {
        setDisplayValue('');
      }
    }
  };

  return (
    <QuestionCard error={error}>
      <QuestionLabel required={required}>{question}</QuestionLabel>
      {description && <QuestionDescription>{description}</QuestionDescription>}
      <Input
        id={id}
        type="text"
        value={displayValue}
        onChange={handleChange}
        onBlur={handleBlur}
        placeholder="DD-MM-YYYY"
        maxLength={10}
        aria-required={required}
        aria-invalid={!!error}
        aria-describedby={error ? `${id}-error` : undefined}
      />
      {!error && (
        <p className="mt-1 font-serif text-xs italic text-editorial-gray">
          Format: DD-MM-YYYY (e.g., 15-03-1990)
        </p>
      )}
    </QuestionCard>
  );
}
