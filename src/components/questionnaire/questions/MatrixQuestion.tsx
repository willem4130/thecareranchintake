'use client';

import * as React from 'react';
import { cn } from '@/lib/utils';
import { QuestionCard, QuestionLabel, QuestionDescription } from '../QuestionCard';

export interface MatrixRow {
  id: string;
  label: string;
}

export interface MatrixColumn {
  id: string;
  label: string;
}

export interface MatrixValue {
  [rowId: string]: string; // rowId -> columnId
}

export interface MatrixQuestionProps {
  id: string;
  question: string;
  description?: string;
  required?: boolean;
  value?: MatrixValue;
  error?: string;
  rows: MatrixRow[];
  columns: MatrixColumn[];
  onChange: (value: MatrixValue) => void;
}

export function MatrixQuestion({
  question,
  description,
  required,
  value = {},
  error,
  rows,
  columns,
  onChange,
}: MatrixQuestionProps) {
  const handleCellClick = (rowId: string, columnId: string) => {
    onChange({
      ...value,
      [rowId]: columnId,
    });
  };

  const isSelected = (rowId: string, columnId: string) => {
    return value[rowId] === columnId;
  };

  return (
    <QuestionCard error={error}>
      <QuestionLabel required={required}>{question}</QuestionLabel>
      {description && <QuestionDescription>{description}</QuestionDescription>}

      <div className="overflow-x-auto">
        <table className="w-full border-collapse">
          <thead>
            <tr>
              <th className="border-2 border-editorial-lightGray bg-editorial-lightGray/30 p-3 text-left font-serif text-sm font-bold text-editorial-darkGray">
                {/* Empty corner cell */}
              </th>
              {columns.map((column) => (
                <th
                  key={column.id}
                  className="border-2 border-editorial-lightGray bg-editorial-lightGray/30 p-3 text-center font-serif text-sm font-bold text-editorial-darkGray"
                >
                  {column.label}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {rows.map((row) => (
              <tr key={row.id}>
                <td className="border-2 border-editorial-lightGray bg-editorial-lightGray/10 p-3 font-serif text-sm font-bold text-editorial-darkGray">
                  {row.label}
                </td>
                {columns.map((column) => {
                  const selected = isSelected(row.id, column.id);

                  return (
                    <td
                      key={column.id}
                      className="border-2 border-editorial-lightGray bg-white p-2 text-center"
                    >
                      <button
                        type="button"
                        onClick={() => handleCellClick(row.id, column.id)}
                        className={cn(
                          'h-10 w-10 rounded-full border-2 transition-all duration-200',
                          'hover:border-primary hover:shadow-hover',
                          'focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2',
                          {
                            'border-primary bg-primary shadow-soft': selected,
                            'border-editorial-gray bg-white': !selected,
                          }
                        )}
                        aria-label={`Select ${column.label} for ${row.label}`}
                        aria-pressed={selected}
                      >
                        {selected && (
                          <span className="flex h-full w-full items-center justify-center text-white">
                            ✓
                          </span>
                        )}
                      </button>
                    </td>
                  );
                })}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {required && Object.keys(value).length < rows.length && (
        <p className="mt-2 font-serif text-xs italic text-editorial-gray">
          Please answer all {rows.length} rows
        </p>
      )}
    </QuestionCard>
  );
}
