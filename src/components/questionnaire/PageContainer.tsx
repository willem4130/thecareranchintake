'use client';

import * as React from 'react';
import { cn } from '@/lib/utils';

export interface PageContainerProps {
  children: React.ReactNode;
  className?: string;
}

export function PageContainer({ children, className }: PageContainerProps) {
  return (
    <div className={cn('editorial-container min-h-screen bg-editorial-veryLightGray', className)}>
      {children}
    </div>
  );
}

export interface PageHeaderProps {
  title: string;
  description?: string;
  className?: string;
}

export function PageHeader({ title, description, className }: PageHeaderProps) {
  return (
    <div className={cn('mb-8', className)}>
      <h1 className="editorial-heading mb-3 text-3xl md:text-4xl">{title}</h1>
      {description && <p className="editorial-body max-w-2xl text-base">{description}</p>}
    </div>
  );
}

export interface PageActionsProps {
  children: React.ReactNode;
  className?: string;
}

export function PageActions({ children, className }: PageActionsProps) {
  return (
    <div className={cn('mt-8 flex items-center justify-between gap-4', className)}>{children}</div>
  );
}
