'use client';

import * as React from 'react';
import { cn } from '@/lib/utils';
import { Card } from '@/components/ui/card';

export interface QuestionCardProps {
  children: React.ReactNode;
  error?: string;
  className?: string;
}

export function QuestionCard({ children, error, className }: QuestionCardProps) {
  return (
    <Card
      className={cn(
        'p-6 transition-shadow duration-200 hover:shadow-medium md:p-8',
        {
          'border-l-4 border-l-error': error,
        },
        className
      )}
    >
      {children}
      {error && (
        <p className="mt-2 font-serif text-xs text-error" role="alert">
          {error}
        </p>
      )}
    </Card>
  );
}

export interface QuestionLabelProps {
  children: React.ReactNode;
  required?: boolean;
  className?: string;
}

export function QuestionLabel({ children, required, className }: QuestionLabelProps) {
  return (
    <label
      className={cn('mb-3 block font-serif text-base font-bold text-editorial-black', className)}
    >
      {children}
      {required && <span className="ml-1 text-primary">*</span>}
    </label>
  );
}

export interface QuestionDescriptionProps {
  children: React.ReactNode;
  className?: string;
}

export function QuestionDescription({ children, className }: QuestionDescriptionProps) {
  return (
    <p
      className={cn(
        'mb-4 font-serif text-[13px] leading-relaxed text-editorial-darkGray',
        className
      )}
    >
      {children}
    </p>
  );
}
