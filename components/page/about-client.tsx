'use client';

import { cn } from '@/lib/utils';
import React from 'react';
import { Page } from '@/lib/definitions';
import { PageAbout } from './page-about';
import { PageEditor } from './editor/page-editor';

type PageAboutProps = React.HTMLAttributes<HTMLDivElement> & {
  data: Page;
};
export function AboutClient({ className, data }: PageAboutProps) {
  const [isOpenEdit, setIsOpenEdit] = React.useState(false);

  return (
    <div
      className={cn(
        'flex w-full flex-col items-center gap-4 lg:flex-row lg:items-start lg:justify-center lg:gap-6',
        className,
      )}
    >
      <PageAbout
        data={data}
        className="w-full max-w-lg"
        setOpen={setIsOpenEdit}
      />

      <PageEditor
        className={cn('w-full max-w-lg', !isOpenEdit && 'hidden')}
        classNames={{
          form: 'z-0 w-full max-w-full grow p-3 md:p-4 xl:static xl:max-w-full',
          preview: 'hidden',
        }}
        initialData={data}
      />
    </div>
  );
}
