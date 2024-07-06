import { Modals } from '@/lib/constants';
import { Dialog, DialogContent } from '@/components/ui/dialog';
import { useModalActions, useModalData, useModalOpen } from '@/hooks/use-modal';
import {
  FriendActions,
  GroupDataModal,
  MyFriendsResponse,
  ViewDetailsActionPeoples,
} from '@/lib/definitions';
import React from 'react';
import { useTranslations } from 'next-intl';
import useQueryPeoplesUser from '@/hooks/use-query-peoples-user';
import { ErrorStage, ErrorStageType } from '@/components/app/error-stage';
import ListPeoples from '@/components/peoples/list-peoples';
import { Heading } from '@/components/app/heading';

export function AddManagerDialog() {
  const t = useTranslations('Home');
  const isOpen = useModalOpen(Modals.AddGroupManager);
  const { onClose } = useModalActions(Modals.AddGroupManager);
  const { groupId } = useModalData<GroupDataModal>(Modals.AddGroupManager, {
    groupId: '',
  });
  const { data, isError } = useQueryPeoplesUser(
    ViewDetailsActionPeoples.viewFriends,
  );

  if (isError) {
    return (
      <Dialog open={isOpen} onOpenChange={onClose}>
        <DialogContent className="max-w-3xl p-4">
          <ErrorStage stage={ErrorStageType.ServerError} />
        </DialogContent>
      </Dialog>
    );
  }

  if (!data?.success) {
    return (
      <Dialog open={isOpen} onOpenChange={onClose}>
        <DialogContent className="max-w-3xl p-4">
          <ErrorStage stage={ErrorStageType.ResourceNotFound} />
        </DialogContent>
      </Dialog>
    );
  }

  const myFriends = (data as MyFriendsResponse).listFriend.map(
    (item) => item.user_id,
  );

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-3xl p-4">
        <Heading title={t('M168')} />
        <ListPeoples
          groupId={groupId}
          data={myFriends}
          action={FriendActions.AddManager}
          className="mt-4 md:grid-cols-1"
        />
      </DialogContent>
    </Dialog>
  );
}
