'use client';

import { Card } from '@/components/ui/card';
import { cn } from '@/lib/utils';
import React, { useMemo } from 'react';
import { Globe, Mail, MapPin, Pencil } from 'lucide-react';
import { Page } from '@/lib/definitions';
import { Call } from 'iconsax-react';
import { Button } from '../ui/button';
import { Typography } from '../ui/typography';
import { useTranslations } from 'next-intl';

type PageAboutProps = React.HTMLAttributes<HTMLDivElement> & {
  data: Page;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
};

type TAboutItem = {
  content?: string;
  icon: any;
};

export function PageAbout({ className, data, setOpen }: PageAboutProps) {
  const t = useTranslations('Home');

  const infos: TAboutItem[] = useMemo(
    () => [
      {
        content: data.address,
        icon: MapPin,
      },
      {
        content: data.phone,
        icon: Call,
      },
      {
        content: data.email,
        icon: Mail,
      },
      {
        content: data.website,
        icon: Globe,
      },
    ],
    [data],
  );

  return (
    <Card className={cn('w-full space-y-3 px-3 py-4', className)}>
      <div className="space-y-2">
        <h3 className="text-base font-medium md:text-lg">{t('M86')}</h3>

        <Typography content={data.description} />
      </div>

      <hr />

      <div className="flex items-start gap-2">
        <div className="grow space-y-4">
          {infos.map((info, index) => (
            <PageAboutItem key={index} item={info} />
          ))}
        </div>

        <Button
          variant="outline"
          onClick={() => setOpen(true)}
          className="size-10 p-2"
        >
          <Pencil />
        </Button>
      </div>
    </Card>
  );
}

export function PageAboutItem({
  item: { content, icon: Icon },
}: {
  item: TAboutItem;
}) {
  return (
    <div className="flex items-center gap-2 md:gap-3">
      {Icon && <Icon size={24} />}

      <span className="text-sm md:text-base">{content ?? '---'}</span>
    </div>
  );
}
