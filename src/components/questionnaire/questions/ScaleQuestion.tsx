'use client';

import * as React from 'react';
import { QuestionCard, QuestionLabel, QuestionDescription } from '../QuestionCard';

export interface ScaleQuestionProps {
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
  step?: number;
  onChange: (value: number) => void;
}

export function ScaleQuestion({
  id,
  question,
  description,
  required,
  value,
  error,
  minValue = 1,
  maxValue = 10,
  minLabel,
  maxLabel,
  step = 1,
  onChange,
}: ScaleQuestionProps) {
  const currentValue = value ?? minValue;
  const percentage = ((currentValue - minValue) / (maxValue - minValue)) * 100;

  return (
    <QuestionCard error={error}>
      <QuestionLabel required={required}>{question}</QuestionLabel>
      {description && <QuestionDescription>{description}</QuestionDescription>}

      <div className="space-y-4">
        {/* Current Value Display */}
        <div className="flex items-center justify-center">
          <span className="font-serif text-4xl font-bold text-primary">{currentValue}</span>
        </div>

        {/* Slider Track Container */}
        <div className="space-y-2">
          <div className="relative">
            {/* Background Track */}
            <div className="h-2 w-full rounded-full bg-editorial-lightGray" />

            {/* Progress Track */}
            <div
              className="absolute left-0 top-0 h-2 rounded-full bg-primary transition-all duration-200"
              style={{ width: `${percentage}%` }}
            />

            {/* Slider Input */}
            <input
              type="range"
              id={id}
              min={minValue}
              max={maxValue}
              step={step}
              value={currentValue}
              onChange={(e) => onChange(Number(e.target.value))}
              className="absolute left-0 top-0 h-2 w-full cursor-pointer appearance-none bg-transparent focus:outline-none [&::-webkit-slider-thumb]:h-6 [&::-webkit-slider-thumb]:w-6 [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:border-2 [&::-webkit-slider-thumb]:border-primary [&::-webkit-slider-thumb]:bg-white [&::-webkit-slider-thumb]:shadow-soft [&::-webkit-slider-thumb]:transition-all [&::-webkit-slider-thumb]:duration-200 [&::-webkit-slider-thumb]:hover:scale-110 [&::-webkit-slider-thumb]:focus:ring-2 [&::-webkit-slider-thumb]:focus:ring-primary [&::-webkit-slider-thumb]:focus:ring-offset-2 [&::-moz-range-thumb]:h-6 [&::-moz-range-thumb]:w-6 [&::-moz-range-thumb]:appearance-none [&::-moz-range-thumb]:rounded-full [&::-moz-range-thumb]:border-2 [&::-moz-range-thumb]:border-primary [&::-moz-range-thumb]:bg-white [&::-moz-range-thumb]:shadow-soft [&::-moz-range-thumb]:transition-all [&::-moz-range-thumb]:duration-200 [&::-moz-range-thumb]:hover:scale-110"
              aria-required={required}
              aria-invalid={!!error}
              aria-describedby={error ? `${id}-error` : undefined}
              aria-valuemin={minValue}
              aria-valuemax={maxValue}
              aria-valuenow={currentValue}
            />
          </div>

          {/* Min/Max Labels */}
          <div className="flex justify-between">
            <span className="font-serif text-sm text-editorial-gray">{minLabel || minValue}</span>
            <span className="font-serif text-sm text-editorial-gray">{maxLabel || maxValue}</span>
          </div>
        </div>
      </div>
    </QuestionCard>
  );
}
