'use client';

import * as React from 'react';
import { cn } from '@/lib/utils';
import { QuestionCard, QuestionLabel, QuestionDescription } from '../QuestionCard';

export interface MultipleChoiceOption {
  value: string;
  label: string;
}

export interface MultipleChoiceQuestionProps {
  id: string;
  question: string;
  description?: string;
  required?: boolean;
  value?: string[]; // Array of selected values
  error?: string;
  options: MultipleChoiceOption[];
  minSelections?: number;
  maxSelections?: number;
  onChange: (value: string[]) => void;
}

export function MultipleChoiceQuestion({
  id,
  question,
  description,
  required,
  value = [],
  error,
  options,
  minSelections,
  maxSelections,
  onChange,
}: MultipleChoiceQuestionProps) {
  const handleToggle = (optionValue: string) => {
    const isSelected = value.includes(optionValue);

    if (isSelected) {
      // Remove from selection
      onChange(value.filter((v) => v !== optionValue));
    } else {
      // Add to selection (if not at max)
      if (!maxSelections || value.length < maxSelections) {
        onChange([...value, optionValue]);
      }
    }
  };

  const selectionCount = value.length;
  const showSelectionHint = minSelections || maxSelections;
  let selectionHintText = '';

  if (minSelections && maxSelections) {
    selectionHintText = `Select between ${minSelections} and ${maxSelections} options`;
  } else if (minSelections) {
    selectionHintText = `Select at least ${minSelections} option${minSelections > 1 ? 's' : ''}`;
  } else if (maxSelections) {
    selectionHintText = `Select up to ${maxSelections} option${maxSelections > 1 ? 's' : ''}`;
  }

  return (
    <QuestionCard error={error}>
      <QuestionLabel required={required}>{question}</QuestionLabel>
      {description && <QuestionDescription>{description}</QuestionDescription>}

      {showSelectionHint && (
        <p className="mb-3 font-serif text-sm italic text-editorial-gray">
          {selectionHintText}
          {selectionCount > 0 && ` (${selectionCount} selected)`}
        </p>
      )}

      <div className="space-y-2" role="group" aria-labelledby={id} aria-required={required}>
        {options.map((option) => {
          const isSelected = value.includes(option.value);
          const isDisabled = !isSelected && !!maxSelections && selectionCount >= maxSelections;

          return (
            <label
              key={option.value}
              className={cn(
                'flex cursor-pointer items-center gap-3 rounded-[3px] border-2 p-4 transition-all duration-200',
                'hover:border-primary hover:shadow-hover',
                {
                  'border-primary bg-primary/5 shadow-soft': isSelected,
                  'border-editorial-lightGray bg-white': !isSelected,
                  'cursor-not-allowed opacity-50': isDisabled,
                }
              )}
            >
              <input
                type="checkbox"
                checked={isSelected}
                onChange={() => handleToggle(option.value)}
                disabled={isDisabled}
                className="h-5 w-5 cursor-pointer rounded border-2 border-editorial-gray text-primary transition-colors focus:ring-2 focus:ring-primary focus:ring-offset-2 disabled:cursor-not-allowed"
              />
              <span className="font-serif text-base text-editorial-darkGray">{option.label}</span>
            </label>
          );
        })}
      </div>
    </QuestionCard>
  );
}
