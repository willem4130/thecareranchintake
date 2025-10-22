import { describe, expect, it } from 'vitest';
import { cn } from '@/lib/utils';

describe('cn utility', () => {
  it('should merge class names', () => {
    expect(cn('px-2 py-1', 'px-3')).toBe('py-1 px-3');
  });

  it('should handle conditional classes', () => {
    const condition = false;
    expect(cn('px-2', condition && 'py-1', 'text-sm')).toBe('px-2 text-sm');
  });

  it('should handle undefined and null', () => {
    expect(cn('px-2', undefined, null, 'py-1')).toBe('px-2 py-1');
  });
});
