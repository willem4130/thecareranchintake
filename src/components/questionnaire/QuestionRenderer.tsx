'use client';

import * as React from 'react';
import {
  ShortTextQuestion,
  type ShortTextQuestionProps,
  LongTextQuestion,
  type LongTextQuestionProps,
  EmailQuestion,
  type EmailQuestionProps,
  PhoneQuestion,
  type PhoneQuestionProps,
  DateQuestion,
  type DateQuestionProps,
  RatingQuestion,
  type RatingQuestionProps,
  ScaleQuestion,
  type ScaleQuestionProps,
  YesNoQuestion,
  type YesNoQuestionProps,
  SingleChoiceQuestion,
  type SingleChoiceQuestionProps,
  MultipleChoiceQuestion,
  type MultipleChoiceQuestionProps,
  DropdownQuestion,
  type DropdownQuestionProps,
  FileUploadQuestion,
  type FileUploadQuestionProps,
  MatrixQuestion,
  type MatrixQuestionProps,
  RangeQuestion,
  type RangeQuestionProps,
} from './questions';

export type QuestionType =
  | 'short-text'
  | 'long-text'
  | 'email'
  | 'phone'
  | 'date'
  | 'rating'
  | 'scale'
  | 'yes-no'
  | 'single-choice'
  | 'multiple-choice'
  | 'dropdown'
  | 'file-upload'
  | 'matrix'
  | 'range';

export type QuestionConfig =
  | ({ type: 'short-text' } & ShortTextQuestionProps)
  | ({ type: 'long-text' } & LongTextQuestionProps)
  | ({ type: 'email' } & EmailQuestionProps)
  | ({ type: 'phone' } & PhoneQuestionProps)
  | ({ type: 'date' } & DateQuestionProps)
  | ({ type: 'rating' } & RatingQuestionProps)
  | ({ type: 'scale' } & ScaleQuestionProps)
  | ({ type: 'yes-no' } & YesNoQuestionProps)
  | ({ type: 'single-choice' } & SingleChoiceQuestionProps)
  | ({ type: 'multiple-choice' } & MultipleChoiceQuestionProps)
  | ({ type: 'dropdown' } & DropdownQuestionProps)
  | ({ type: 'file-upload' } & FileUploadQuestionProps)
  | ({ type: 'matrix' } & MatrixQuestionProps)
  | ({ type: 'range' } & RangeQuestionProps);

export interface QuestionRendererProps {
  config: QuestionConfig;
}

export function QuestionRenderer({ config }: QuestionRendererProps) {
  switch (config.type) {
    case 'short-text':
      return <ShortTextQuestion {...config} />;

    case 'long-text':
      return <LongTextQuestion {...config} />;

    case 'email':
      return <EmailQuestion {...config} />;

    case 'phone':
      return <PhoneQuestion {...config} />;

    case 'date':
      return <DateQuestion {...config} />;

    case 'rating':
      return <RatingQuestion {...config} />;

    case 'scale':
      return <ScaleQuestion {...config} />;

    case 'yes-no':
      return <YesNoQuestion {...config} />;

    case 'single-choice':
      return <SingleChoiceQuestion {...config} />;

    case 'multiple-choice':
      return <MultipleChoiceQuestion {...config} />;

    case 'dropdown':
      return <DropdownQuestion {...config} />;

    case 'file-upload':
      return <FileUploadQuestion {...config} />;

    case 'matrix':
      return <MatrixQuestion {...config} />;

    case 'range':
      return <RangeQuestion {...config} />;

    default:
      return (
        <div className="rounded-[3px] border-2 border-red-500 bg-red-50 p-4 text-center">
          <p className="font-serif text-base font-bold text-red-600">Unknown question type</p>
          <p className="mt-1 font-serif text-sm text-red-500">
            Please contact support if this issue persists.
          </p>
        </div>
      );
  }
}
