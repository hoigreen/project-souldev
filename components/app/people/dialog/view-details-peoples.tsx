'use client';

import { Dialog, DialogContent } from '@/components/ui/dialog';
import { useModalActions, useModalData, useModalOpen } from '@/hooks/use-modal';
import { Modals } from '@/lib/constants';
import {
  ViewDetailPeoplesData,
  ViewDetailsActionPeoples,
} from '@/lib/definitions';
import { cn } from '@/lib/utils';
import { PeoplesHeading } from '../peoples-heading';
import React from 'react';

export function ViewDetailsPeoples({
  className,
}: {
  className?: string;
}): React.JSX.Element {
  const isOpen = useModalOpen(Modals.ViewDetailsPeoples);
  const { onClose } = useModalActions(Modals.ViewDetailsPeoples);
  const { viewAction } = useModalData<ViewDetailPeoplesData>(
    Modals.ViewDetailsPeoples,
    {
      viewAction: ViewDetailsActionPeoples.viewFriends,
    },
  );

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent
        className={cn(className)}
        classNames={{
          children:
            'flex flex-col gap-4 bg-background md:p-3 lg:flex-row lg:gap-10',
        }}
      >
        <PeoplesHeading viewAction={viewAction} />
      </DialogContent>
    </Dialog>
  );
}
