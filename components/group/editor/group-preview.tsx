'use client';

import { cn } from '@/lib/utils';
import React from 'react';
import { useWatch } from 'react-hook-form';

type GroupEditorPreviewProps = React.HTMLAttributes<HTMLDivElement>;

export function GroupEditorPreview({ className }: GroupEditorPreviewProps) {
  const groupPreview = useWatch();

  const preview = {
    name: groupPreview.name,
  };

  return <div className={cn('min-h-full', className)}>{preview.name}</div>;
}
