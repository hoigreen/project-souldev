'use client';

import { useModalActions, useModalData, useModalOpen } from '@/hooks/use-modal';
import { Modals } from '@/lib/constants';
import { UserBasic, UserProfile } from '@/lib/definitions';
import { useTranslations } from 'next-intl';
import { ErrorStage, ErrorStageType } from '@/components/app/error-stage';
import { Dialog, DialogContent } from '@/components/ui/dialog';
import React from 'react';
import { Heading } from '@/components/app/heading';
import ListPeoples from '@/components/peoples/list-peoples';

export function ViewLikesPostDialog(): React.JSX.Element {
  const t = useTranslations('Home');
  const isOpen = useModalOpen(Modals.ViewLikesPost);
  const { onClose } = useModalActions(Modals.ViewLikesPost);
  const data = useModalData<UserProfile[]>(Modals.ViewLikesPost, []);

  if (data.length === 0) {
    return (
      <Dialog open={isOpen} onOpenChange={onClose}>
        <DialogContent>
          <ErrorStage stage={ErrorStageType.ResourceNotFound} />
        </DialogContent>
      </Dialog>
    );
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent>
        <div className="space-y-6">
          <Heading title={t('M117')} className="text-center" size={1} />
          <ListPeoples data={data as UserBasic[]} className="md:grid-cols-1" />
        </div>
      </DialogContent>
    </Dialog>
  );
}
