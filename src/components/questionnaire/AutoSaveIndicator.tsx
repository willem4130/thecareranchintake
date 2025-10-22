'use client';

import * as React from 'react';
import { cn } from '@/lib/utils';
import { Loader2, Check, AlertCircle } from 'lucide-react';

export type SaveStatus = 'idle' | 'saving' | 'saved' | 'error';

export interface AutoSaveIndicatorProps {
  status: SaveStatus;
  lastSaved?: Date;
  className?: string;
}

export function AutoSaveIndicator({ status, lastSaved, className }: AutoSaveIndicatorProps) {
  const getStatusText = () => {
    switch (status) {
      case 'saving':
        return 'Saving...';
      case 'saved':
        return lastSaved
          ? `Saved at ${lastSaved.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' })}`
          : 'Saved';
      case 'error':
        return 'Failed to save';
      default:
        return '';
    }
  };

  const getIcon = () => {
    switch (status) {
      case 'saving':
        return <Loader2 className="h-3 w-3 animate-spin" />;
      case 'saved':
        return <Check className="h-3 w-3" />;
      case 'error':
        return <AlertCircle className="h-3 w-3" />;
      default:
        return null;
    }
  };

  if (status === 'idle') {
    return null;
  }

  return (
    <div
      className={cn(
        'flex items-center gap-1.5 font-serif text-[11px] italic',
        {
          'text-editorial-gray': status === 'saving',
          'text-primary': status === 'saved',
          'text-error': status === 'error',
        },
        className
      )}
    >
      {getIcon()}
      <span>{getStatusText()}</span>
    </div>
  );
}
