'use client';

import pluralize from 'pluralize';
import React, { forwardRef, useRef } from 'react';
import ReactQuill from 'react-quill';
import { twMerge } from 'tailwind-merge';
import 'react-quill/dist/quill.snow.css';
import 'quill-emoji/dist/quill-emoji.css';

const toolbarOptions = [
  ['bold', 'italic', 'underline'],
  ['blockquote', 'code-block'],
  [{ header: 1 }, { header: 2 }],
  [{ list: 'ordered' }, { list: 'bullet' }],
  [{ indent: '-1' }, { indent: '+1' }],
  [{ direction: 'rtl' }],
  [{ size: ['small', false, 'large', 'huge'] }],
  [{ header: [1, 2, 3, 4, 5, 6, false] }],
  [{ color: [] }, { background: [] }],
  [{ font: [] }],
  [{ align: [] }],
  ['clean'],
];

export const Editor = forwardRef<
  React.ElementRef<typeof ReactQuill>,
  React.ComponentPropsWithoutRef<typeof ReactQuill> & {
    disabled?: boolean;
  }
>(({ className, disabled, onChange, modules, ...props }, _) => {
  const wordCountRef = useRef<HTMLDivElement>(null);

  const updateWordCount = (count: number): void => {
    if (!wordCountRef.current) {
      return;
    }

    wordCountRef.current.innerText = pluralize(
      'character',
      count,
      true,
    ).toString();
  };

  return (
    <div className={twMerge(className)}>
      <ReactQuill
        modules={{
          clipboard: {
            matchVisual: false,
          },
          history: {
            delay: 500,
            maxStack: 100,
            userOnly: true,
          },
          syntax: false,
          toolbar: toolbarOptions,
          ...modules,
        }}
        onChange={(...args) => {
          onChange?.(...args);
          updateWordCount(args[3].getLength() - 1);
        }}
        readOnly={disabled}
        theme="snow"
        {...props}
      />

      <div
        className="mt-1 text-xs text-neutral-600 dark:text-neutral-300"
        ref={wordCountRef}
      >
        0 characters
      </div>
    </div>
  );
});

Editor.displayName = 'Editor';
