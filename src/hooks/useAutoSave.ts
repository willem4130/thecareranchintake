'use client';

import { useEffect, useRef, useCallback } from 'react';

export type AutoSaveStatus = 'idle' | 'saving' | 'saved' | 'error';

export interface UseAutoSaveOptions<T> {
  data: T;
  onSave: (data: T) => Promise<void>;
  delay?: number; // Debounce delay in milliseconds
  enabled?: boolean;
  onStatusChange?: (status: AutoSaveStatus) => void;
}

export interface UseAutoSaveReturn {
  status: AutoSaveStatus;
  isLoading: boolean;
  save: () => Promise<void>;
  reset: () => void;
}

/**
 * Auto-save hook with debouncing
 * Automatically saves data after a delay when it changes
 *
 * @example
 * const { status } = useAutoSave({
 *   data: formData,
 *   onSave: async (data) => {
 *     await api.saveForm(data);
 *   },
 *   delay: 500,
 * });
 */
export function useAutoSave<T>({
  data,
  onSave,
  delay = 500,
  enabled = true,
  onStatusChange,
}: UseAutoSaveOptions<T>): UseAutoSaveReturn {
  const statusRef = useRef<AutoSaveStatus>('idle');
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);
  const previousDataRef = useRef<T>(data);
  const isMountedRef = useRef(true);
  const savingRef = useRef(false);

  const setStatus = useCallback(
    (newStatus: AutoSaveStatus) => {
      statusRef.current = newStatus;
      if (onStatusChange && isMountedRef.current) {
        onStatusChange(newStatus);
      }
    },
    [onStatusChange]
  );

  const save = useCallback(async () => {
    if (savingRef.current) return;

    try {
      savingRef.current = true;
      setStatus('saving');
      await onSave(data);
      setStatus('saved');

      // Reset to idle after 2 seconds
      setTimeout(() => {
        if (isMountedRef.current) {
          setStatus('idle');
        }
      }, 2000);
    } catch (error) {
      console.error('Auto-save error:', error);
      setStatus('error');

      // Reset to idle after 3 seconds on error
      setTimeout(() => {
        if (isMountedRef.current) {
          setStatus('idle');
        }
      }, 3000);
    } finally {
      savingRef.current = false;
    }
  }, [data, onSave, setStatus]);

  const reset = useCallback(() => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
      timeoutRef.current = null;
    }
    setStatus('idle');
  }, [setStatus]);

  useEffect(() => {
    isMountedRef.current = true;

    return () => {
      isMountedRef.current = false;
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, []);

  useEffect(() => {
    if (!enabled) return;

    // Check if data has actually changed
    const hasChanged = JSON.stringify(data) !== JSON.stringify(previousDataRef.current);

    if (!hasChanged) return;

    // Update previous data reference
    previousDataRef.current = data;

    // Clear existing timeout
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }

    // Set new timeout
    timeoutRef.current = setTimeout(() => {
      save();
    }, delay);

    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, [data, delay, enabled, save]);

  return {
    status: statusRef.current,
    isLoading: statusRef.current === 'saving',
    save,
    reset,
  };
}
