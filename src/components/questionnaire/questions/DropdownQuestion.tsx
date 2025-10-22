'use client';

import * as React from 'react';
import { ChevronDown } from 'lucide-react';
import { cn } from '@/lib/utils';
import { QuestionCard, QuestionLabel, QuestionDescription } from '../QuestionCard';

export interface DropdownOption {
  value: string;
  label: string;
}

export interface DropdownQuestionProps {
  id: string;
  question: string;
  description?: string;
  required?: boolean;
  value?: string;
  error?: string;
  options: DropdownOption[];
  placeholder?: string;
  onChange: (value: string) => void;
}

export function DropdownQuestion({
  id,
  question,
  description,
  required,
  value = '',
  error,
  options,
  placeholder = 'Select an option...',
  onChange,
}: DropdownQuestionProps) {
  const [isOpen, setIsOpen] = React.useState(false);
  const dropdownRef = React.useRef<HTMLDivElement>(null);

  const selectedOption = options.find((opt) => opt.value === value);

  // Close dropdown when clicking outside
  React.useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen]);

  const handleSelect = (optionValue: string) => {
    onChange(optionValue);
    setIsOpen(false);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Escape') {
      setIsOpen(false);
    } else if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      setIsOpen(!isOpen);
    }
  };

  return (
    <QuestionCard error={error}>
      <QuestionLabel required={required}>{question}</QuestionLabel>
      {description && <QuestionDescription>{description}</QuestionDescription>}

      <div className="relative" ref={dropdownRef}>
        {/* Dropdown Button */}
        <button
          type="button"
          id={id}
          onClick={() => setIsOpen(!isOpen)}
          onKeyDown={handleKeyDown}
          className={cn(
            'flex w-full items-center justify-between rounded-[3px] border-2 bg-white px-4 py-3 font-serif text-base transition-all duration-200',
            'hover:border-primary hover:shadow-hover',
            'focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2',
            {
              'border-primary shadow-soft': isOpen,
              'border-editorial-lightGray': !isOpen && !error,
              'border-red-500': error,
              'text-editorial-darkGray': value,
              'text-editorial-gray': !value,
            }
          )}
          aria-haspopup="listbox"
          aria-expanded={isOpen}
          aria-required={required}
          aria-invalid={!!error}
          aria-describedby={error ? `${id}-error` : undefined}
        >
          <span>{selectedOption?.label || placeholder}</span>
          <ChevronDown
            className={cn('h-5 w-5 text-editorial-gray transition-transform duration-200', {
              'rotate-180': isOpen,
            })}
          />
        </button>

        {/* Dropdown Menu */}
        {isOpen && (
          <div
            className="absolute z-50 mt-2 max-h-64 w-full overflow-auto rounded-[3px] border-2 border-editorial-lightGray bg-white shadow-dropdown"
            role="listbox"
          >
            {options.map((option) => {
              const isSelected = option.value === value;

              return (
                <button
                  key={option.value}
                  type="button"
                  onClick={() => handleSelect(option.value)}
                  role="option"
                  aria-selected={isSelected}
                  className={cn(
                    'w-full px-4 py-3 text-left font-serif text-base transition-colors duration-150',
                    'hover:bg-primary/10',
                    {
                      'bg-primary/5 font-bold text-primary': isSelected,
                      'text-editorial-darkGray': !isSelected,
                    }
                  )}
                >
                  {option.label}
                </button>
              );
            })}
          </div>
        )}
      </div>
    </QuestionCard>
  );
}
