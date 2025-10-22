'use client';

import * as React from 'react';
import { cn } from '@/lib/utils';
import { Check } from 'lucide-react';

export interface ProgressStep {
  id: string;
  title: string;
  order: number;
}

export interface ProgressTimelineProps {
  steps: ProgressStep[];
  currentStep: number;
  className?: string;
}

export function ProgressTimeline({ steps, currentStep, className }: ProgressTimelineProps) {
  return (
    <div className={cn('w-full', className)}>
      <div className="flex items-center justify-between">
        {steps.map((step, index) => {
          const isCompleted = step.order < currentStep;
          const isCurrent = step.order === currentStep;
          const isUpcoming = step.order > currentStep;

          return (
            <React.Fragment key={step.id}>
              {/* Step Circle */}
              <div className="flex flex-col items-center">
                <div
                  className={cn(
                    'flex h-10 w-10 items-center justify-center rounded-full border-2 transition-colors duration-200',
                    {
                      'border-primary bg-primary text-white': isCompleted || isCurrent,
                      'border-editorial-lightGray bg-white text-editorial-gray': isUpcoming,
                    }
                  )}
                >
                  {isCompleted ? (
                    <Check className="h-5 w-5" />
                  ) : (
                    <span className="font-serif text-sm font-bold">{step.order}</span>
                  )}
                </div>
                {/* Step Label - Hidden on mobile */}
                <p
                  className={cn(
                    'mt-2 hidden text-center font-serif text-[11px] uppercase tracking-wide md:block',
                    {
                      'font-bold text-primary': isCurrent,
                      'text-editorial-darkGray': isCompleted,
                      'text-editorial-gray': isUpcoming,
                    }
                  )}
                >
                  {step.title}
                </p>
              </div>

              {/* Connector Line */}
              {index < steps.length - 1 && (
                <div className="flex-1 px-2">
                  <div
                    className={cn('h-0.5 w-full transition-colors duration-200', {
                      'bg-primary': step.order < currentStep,
                      'bg-editorial-lightGray': step.order >= currentStep,
                    })}
                  />
                </div>
              )}
            </React.Fragment>
          );
        })}
      </div>

      {/* Mobile: Current Step Title */}
      <div className="mt-4 text-center md:hidden">
        <p className="font-serif text-sm font-bold text-primary">
          {steps.find((s) => s.order === currentStep)?.title}
        </p>
        <p className="font-serif text-xs text-editorial-gray">
          Step {currentStep} of {steps.length}
        </p>
      </div>
    </div>
  );
}
