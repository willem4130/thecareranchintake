'use client';

import * as React from 'react';
import { QuestionCard, QuestionLabel, QuestionDescription } from '../QuestionCard';

export interface RangeValue {
  min: number;
  max: number;
}

export interface RangeQuestionProps {
  id: string;
  question: string;
  description?: string;
  required?: boolean;
  value?: RangeValue;
  error?: string;
  minValue?: number;
  maxValue?: number;
  step?: number;
  minLabel?: string;
  maxLabel?: string;
  onChange: (value: RangeValue) => void;
}

export function RangeQuestion({
  id,
  question,
  description,
  required,
  value,
  error,
  minValue = 0,
  maxValue = 100,
  step = 1,
  minLabel,
  maxLabel,
  onChange,
}: RangeQuestionProps) {
  const currentValue = value ?? { min: minValue, max: maxValue };

  const handleMinChange = (newMin: number) => {
    // Ensure min doesn't exceed max
    const adjustedMin = Math.min(newMin, currentValue.max);
    onChange({ ...currentValue, min: adjustedMin });
  };

  const handleMaxChange = (newMax: number) => {
    // Ensure max doesn't go below min
    const adjustedMax = Math.max(newMax, currentValue.min);
    onChange({ ...currentValue, max: adjustedMax });
  };

  const minPercentage = ((currentValue.min - minValue) / (maxValue - minValue)) * 100;
  const maxPercentage = ((currentValue.max - minValue) / (maxValue - minValue)) * 100;

  return (
    <QuestionCard error={error}>
      <QuestionLabel required={required}>{question}</QuestionLabel>
      {description && <QuestionDescription>{description}</QuestionDescription>}

      <div className="space-y-6">
        {/* Selected Range Display */}
        <div className="flex items-center justify-center gap-3">
          <div className="flex flex-col items-center">
            <span className="mb-1 font-serif text-xs font-bold uppercase tracking-wide text-editorial-gray">
              Minimum
            </span>
            <span className="font-serif text-3xl font-bold text-primary">{currentValue.min}</span>
          </div>
          <span className="font-serif text-2xl text-editorial-gray">—</span>
          <div className="flex flex-col items-center">
            <span className="mb-1 font-serif text-xs font-bold uppercase tracking-wide text-editorial-gray">
              Maximum
            </span>
            <span className="font-serif text-3xl font-bold text-primary">{currentValue.max}</span>
          </div>
        </div>

        {/* Dual Slider */}
        <div className="space-y-2">
          <div className="relative h-2">
            {/* Background Track */}
            <div className="absolute h-2 w-full rounded-full bg-editorial-lightGray" />

            {/* Selected Range Track */}
            <div
              className="absolute h-2 rounded-full bg-primary transition-all duration-200"
              style={{
                left: `${minPercentage}%`,
                right: `${100 - maxPercentage}%`,
              }}
            />

            {/* Min Slider */}
            <input
              type="range"
              id={`${id}-min`}
              min={minValue}
              max={maxValue}
              step={step}
              value={currentValue.min}
              onChange={(e) => handleMinChange(Number(e.target.value))}
              className="pointer-events-none absolute left-0 top-0 h-2 w-full cursor-pointer appearance-none bg-transparent focus:outline-none [&::-webkit-slider-thumb]:pointer-events-auto [&::-webkit-slider-thumb]:h-6 [&::-webkit-slider-thumb]:w-6 [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:border-2 [&::-webkit-slider-thumb]:border-primary [&::-webkit-slider-thumb]:bg-white [&::-webkit-slider-thumb]:shadow-soft [&::-webkit-slider-thumb]:transition-all [&::-webkit-slider-thumb]:duration-200 [&::-webkit-slider-thumb]:hover:scale-110 [&::-webkit-slider-thumb]:focus:ring-2 [&::-webkit-slider-thumb]:focus:ring-primary [&::-webkit-slider-thumb]:focus:ring-offset-2 [&::-moz-range-thumb]:pointer-events-auto [&::-moz-range-thumb]:h-6 [&::-moz-range-thumb]:w-6 [&::-moz-range-thumb]:appearance-none [&::-moz-range-thumb]:rounded-full [&::-moz-range-thumb]:border-2 [&::-moz-range-thumb]:border-primary [&::-moz-range-thumb]:bg-white [&::-moz-range-thumb]:shadow-soft [&::-moz-range-thumb]:transition-all [&::-moz-range-thumb]:duration-200 [&::-moz-range-thumb]:hover:scale-110"
              aria-label="Minimum value"
              aria-required={required}
              aria-invalid={!!error}
              aria-valuemin={minValue}
              aria-valuemax={maxValue}
              aria-valuenow={currentValue.min}
            />

            {/* Max Slider */}
            <input
              type="range"
              id={`${id}-max`}
              min={minValue}
              max={maxValue}
              step={step}
              value={currentValue.max}
              onChange={(e) => handleMaxChange(Number(e.target.value))}
              className="pointer-events-none absolute left-0 top-0 h-2 w-full cursor-pointer appearance-none bg-transparent focus:outline-none [&::-webkit-slider-thumb]:pointer-events-auto [&::-webkit-slider-thumb]:h-6 [&::-webkit-slider-thumb]:w-6 [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:border-2 [&::-webkit-slider-thumb]:border-primary [&::-webkit-slider-thumb]:bg-white [&::-webkit-slider-thumb]:shadow-soft [&::-webkit-slider-thumb]:transition-all [&::-webkit-slider-thumb]:duration-200 [&::-webkit-slider-thumb]:hover:scale-110 [&::-webkit-slider-thumb]:focus:ring-2 [&::-webkit-slider-thumb]:focus:ring-primary [&::-webkit-slider-thumb]:focus:ring-offset-2 [&::-moz-range-thumb]:pointer-events-auto [&::-moz-range-thumb]:h-6 [&::-moz-range-thumb]:w-6 [&::-moz-range-thumb]:appearance-none [&::-moz-range-thumb]:rounded-full [&::-moz-range-thumb]:border-2 [&::-moz-range-thumb]:border-primary [&::-moz-range-thumb]:bg-white [&::-moz-range-thumb]:shadow-soft [&::-moz-range-thumb]:transition-all [&::-moz-range-thumb]:duration-200 [&::-moz-range-thumb]:hover:scale-110"
              aria-label="Maximum value"
              aria-required={required}
              aria-invalid={!!error}
              aria-valuemin={minValue}
              aria-valuemax={maxValue}
              aria-valuenow={currentValue.max}
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
