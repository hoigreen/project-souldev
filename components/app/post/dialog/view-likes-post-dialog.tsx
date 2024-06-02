'use client';

import { useModalActions, useModalData, useModalOpen } from '@/hooks/use-modal';
import { Modals } from '@/lib/constants';
import { UserBasic, UserProfile } from '@/lib/definitions';
import { useTranslations } from 'next-intl';
import { ErrorStage, ErrorStageType } from '../../error-stage';
import { Dialog, DialogContent } from '@/components/ui/dialog';
import ListPeoples from '../../peoples/list-peoples';
import { Heading } from '../../heading';
import React from 'react';

export function ViewLikesPostDialog(): React.JSX.Element {
  const t = useTranslations('Home');
  const isOpen = useModalOpen(Modals.ViewLikesPost);
  const { onClose } = useModalActions(Modals.ViewLikesPost);
  const data = useModalData<UserProfile[]>(Modals.ViewLikesPost, []);

  if (data.length === 0) {
    return (
      <Dialog open={isOpen} onOpenChange={onClose}>
        <DialogContent>
          <div className="space-y-6">
            <ErrorStage stage={ErrorStageType.ResourceNotFound} />
          </div>
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
