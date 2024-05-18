import { twMerge } from 'tailwind-merge';
import React from 'react';
import { markdownToHTML } from '@/lib/markdown';

export function Typography({
  className,
  content,
}: {
  className?: string;
  content?: string | null;
}): React.JSX.Element {
  return (
    <div
      dangerouslySetInnerHTML={{
        __html: markdownToHTML(content || ''),
      }}
      className={twMerge(
        'prose prose-sm prose-neutral max-w-full break-words text-justify dark:prose-invert',
        className,
      )}
    />
  );
}
