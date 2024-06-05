import { Label } from '@/components/ui/label';
import { cn } from '@/lib/utils';
import React from 'react';

type SettingsItemProps = React.HTMLAttributes<HTMLDivElement> & {
  title: string;
};

export default function SettingsItem({
  className,
  children,
  title,
  ...props
}: SettingsItemProps) {
  return (
    <div
      className={cn(
        'flex w-full flex-col gap-4 lg:flex-row lg:items-center lg:gap-8',
        className,
      )}
      {...props}
    >
      <Label className="w-full max-w-64 text-base md:text-lg">{title}</Label>

      <div className="grow">{children}</div>
    </div>
  );
}
