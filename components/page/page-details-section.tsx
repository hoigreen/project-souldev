'use client';

import { Card } from '@/components/ui/card';
import { cn } from '@/lib/utils';
import { useTranslations } from 'next-intl';
import React from 'react';
import Image from 'next/image';
import { ImagePlus } from 'lucide-react';
import { Group } from '@/lib/definitions';
import { Popover, PopoverContent, PopoverTrigger } from '../ui/popover';
import { Button } from '../ui/button';
import { Add, MoreCircle } from 'iconsax-react';
import { Modals } from '@/lib/constants';
import { useModalActions } from '@/hooks/use-modal';

type GroupDetailsSectionProps = React.HTMLAttributes<HTMLDivElement> & {
  data: Group;
  isManager?: boolean;
};

export default function GroupDetailsSection({
  className,
  data,
  isManager,
}: GroupDetailsSectionProps) {
  const t = useTranslations('Home');
  const { onOpen: onOpenDialogLeaveGroup } = useModalActions(Modals.LeaveGroup);
  const { onOpen: onOpenDialogDeleteGroup } = useModalActions(
    Modals.DeleteGroup,
  );

  return (
    <Card
      className={cn(
        'space-y-3 rounded-lg border bg-neutral-50 p-3 dark:bg-neutral-700 md:space-y-6 md:p-4 lg:p-6',
        className,
      )}
    >
      <div className="relative flex aspect-[24/9] w-full items-center justify-center overflow-hidden rounded-lg bg-neutral-200 dark:bg-neutral-600">
        {data.image_group && data.image_group[0] ? (
          <Image
            src={data.image_group[0]}
            alt={data.name}
            fill
            className="absolute inset-0 size-full"
          />
        ) : (
          <ImagePlus size={48} />
        )}
      </div>

      <div className="space-y-3 md:flex md:items-start md:justify-between md:space-y-0">
        <div className="space-y-3">
          <h2 className="text-xl font-bold text-neutral-900 dark:text-neutral-100 md:text-2xl lg:text-3xl">
            {data.name}
          </h2>

          <p className="text-sm lg:text-base">
            {t('M143', {
              totalMembers: data.members.length,
            })}
          </p>
        </div>

        <div className="mt-3 flex items-center gap-3 md:mt-0 md:gap-4">
          {isManager && (
            <Button className="flex items-center gap-2 text-sm md:text-base">
              <Add size={16} />
              <span>{t('M168')}</span>
            </Button>
          )}

          <Popover>
            <PopoverTrigger asChild>
              <MoreCircle
                size={24}
                variant="TwoTone"
                className="cursor-pointer"
              />
            </PopoverTrigger>
            <PopoverContent className="w-80">
              <div className="grid gap-4">
                <div className="space-y-2">
                  <h4 className="font-medium leading-none">{t('M164')}</h4>
                  <p className="text-sm text-muted-foreground">{t('M165')}</p>
                </div>

                <div className="grid gap-2 divide-y">
                  <Button
                    variant="destructive"
                    onClick={
                      isManager
                        ? () => onOpenDialogDeleteGroup({ groupId: data._id })
                        : () => onOpenDialogLeaveGroup({ groupId: data._id })
                    }
                  >
                    {isManager ? t('M166') : t('M167')}
                  </Button>
                </div>
              </div>
            </PopoverContent>
          </Popover>
        </div>
      </div>
    </Card>
  );
}
