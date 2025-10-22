'use client';

import * as React from 'react';
import { Upload, X, File, Image as ImageIcon } from 'lucide-react';
import { cn } from '@/lib/utils';
import { QuestionCard, QuestionLabel, QuestionDescription } from '../QuestionCard';

export interface UploadedFile {
  name: string;
  size: number;
  type: string;
  url?: string; // Preview URL or uploaded URL
  file?: File; // Original file object
}

export interface FileUploadQuestionProps {
  id: string;
  question: string;
  description?: string;
  required?: boolean;
  value?: UploadedFile[];
  error?: string;
  maxFiles?: number;
  maxSizeBytes?: number; // Max file size in bytes
  acceptedTypes?: string[]; // e.g., ['image/*', 'application/pdf']
  onChange: (files: UploadedFile[]) => void;
}

export function FileUploadQuestion({
  id,
  question,
  description,
  required,
  value = [],
  error,
  maxFiles = 5,
  maxSizeBytes = 10 * 1024 * 1024, // 10MB default
  acceptedTypes = ['image/*', 'application/pdf'],
  onChange,
}: FileUploadQuestionProps) {
  const [isDragging, setIsDragging] = React.useState(false);
  const fileInputRef = React.useRef<HTMLInputElement>(null);

  const formatFileSize = (bytes: number): string => {
    if (bytes < 1024) return `${bytes} B`;
    if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
    return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
  };

  const handleFiles = (files: FileList | null) => {
    if (!files) return;

    const newFiles: UploadedFile[] = [];
    const remainingSlots = maxFiles - value.length;

    for (let i = 0; i < Math.min(files.length, remainingSlots); i++) {
      const file = files[i];

      if (file && file.size <= maxSizeBytes) {
        const uploadedFile: UploadedFile = {
          name: file.name,
          size: file.size,
          type: file.type,
          file,
        };

        // Create preview URL for images
        if (file.type.startsWith('image/')) {
          uploadedFile.url = URL.createObjectURL(file);
        }

        newFiles.push(uploadedFile);
      }
    }

    if (newFiles.length > 0) {
      onChange([...value, ...newFiles]);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    handleFiles(e.dataTransfer.files);
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const removeFile = (index: number) => {
    const newFiles = value.filter((_, i) => i !== index);
    // Revoke object URL to free memory
    if (value[index]?.url && value[index]?.file) {
      URL.revokeObjectURL(value[index].url!);
    }
    onChange(newFiles);
  };

  const isImage = (type: string) => type.startsWith('image/');

  return (
    <QuestionCard error={error}>
      <QuestionLabel required={required}>{question}</QuestionLabel>
      {description && <QuestionDescription>{description}</QuestionDescription>}

      <div className="space-y-4">
        {/* Drop Zone */}
        <div
          onDrop={handleDrop}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onClick={() => fileInputRef.current?.click()}
          className={cn(
            'flex cursor-pointer flex-col items-center justify-center rounded-[3px] border-2 border-dashed p-8 transition-all duration-200',
            'hover:border-primary hover:bg-primary/5',
            {
              'border-primary bg-primary/10': isDragging,
              'border-editorial-lightGray bg-white': !isDragging,
            }
          )}
        >
          <Upload className="mb-3 h-12 w-12 text-editorial-gray" />
          <p className="mb-1 font-serif text-base font-bold text-editorial-darkGray">
            Click to upload or drag and drop
          </p>
          <p className="font-serif text-sm text-editorial-gray">
            {acceptedTypes.join(', ')} (max {formatFileSize(maxSizeBytes)})
          </p>
          <p className="mt-1 font-serif text-xs italic text-editorial-gray">
            {value.length} / {maxFiles} files uploaded
          </p>
        </div>

        {/* Hidden File Input */}
        <input
          ref={fileInputRef}
          id={id}
          type="file"
          multiple={maxFiles > 1}
          accept={acceptedTypes.join(',')}
          onChange={(e) => handleFiles(e.target.files)}
          className="hidden"
          aria-required={required}
          aria-invalid={!!error}
          aria-describedby={error ? `${id}-error` : undefined}
        />

        {/* File List */}
        {value.length > 0 && (
          <div className="space-y-2">
            {value.map((file, index) => (
              <div
                key={index}
                className="flex items-center gap-3 rounded-[3px] border-2 border-editorial-lightGray bg-white p-3"
              >
                {/* File Icon/Preview */}
                {isImage(file.type) && file.url ? (
                  <img src={file.url} alt={file.name} className="h-12 w-12 rounded object-cover" />
                ) : (
                  <div className="flex h-12 w-12 items-center justify-center rounded bg-editorial-lightGray">
                    {isImage(file.type) ? (
                      <ImageIcon className="h-6 w-6 text-editorial-gray" />
                    ) : (
                      <File className="h-6 w-6 text-editorial-gray" />
                    )}
                  </div>
                )}

                {/* File Info */}
                <div className="flex-1">
                  <p className="font-serif text-sm font-bold text-editorial-darkGray">
                    {file.name}
                  </p>
                  <p className="font-serif text-xs text-editorial-gray">
                    {formatFileSize(file.size)}
                  </p>
                </div>

                {/* Remove Button */}
                <button
                  type="button"
                  onClick={() => removeFile(index)}
                  className="rounded-full p-1 transition-colors hover:bg-red-100 focus:outline-none focus:ring-2 focus:ring-red-500"
                  aria-label={`Remove ${file.name}`}
                >
                  <X className="h-5 w-5 text-red-500" />
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
    </QuestionCard>
  );
}
