'use client';

import { Dialog, DialogContent } from '@/components/ui/dialog';
import { useModalActions, useModalData, useModalOpen } from '@/hooks/use-modal';
import { Modals } from '@/lib/constants';
import {
  MyFollowersResponse,
  MyFollowingsResponse,
  MyFriendsResponse,
  UserBasic,
  ViewDetailPeoplesData,
  ViewDetailsActionPeoples,
} from '@/lib/definitions';
import { cn } from '@/lib/utils';
import { PeoplesHeading } from '../peoples-heading';
import React from 'react';
import ListPeoples from '../list-peoples';
import { ListPeoplesLoading } from '../loading';
import { ErrorStage, ErrorStageType } from '../../error-stage';
import useQueryPeoplesUser from '@/hooks/use-query-peoples-user';

export function ViewDetailsPeoplesDialog(): React.JSX.Element {
  const isOpen = useModalOpen(Modals.ViewDetailsPeoples);
  const { onClose } = useModalActions(Modals.ViewDetailsPeoples);
  const { viewAction } = useModalData<ViewDetailPeoplesData>(
    Modals.ViewDetailsPeoples,
    {
      viewAction: ViewDetailsActionPeoples.viewFriends,
    },
  );

  // Get my friends list
  const { data: response, isLoading } = useQueryPeoplesUser(viewAction);

  if (isLoading) {
    return (
      <Dialog open={isOpen} onOpenChange={onClose}>
        <DialogContent>
          <div className="space-y-6">
            <PeoplesHeading viewAction={viewAction} />
            <ListPeoplesLoading className="md:grid-cols-1" />
          </div>
        </DialogContent>
      </Dialog>
    );
  }

  if (!response?.success) {
    return <ErrorStage stage={ErrorStageType.ServerError} />;
  }

  let data: UserBasic[] = [];

  if (viewAction === ViewDetailsActionPeoples.viewFriends) {
    data = (response as MyFriendsResponse).listFriend.map(
      (item) => item.user_id,
    );
  } else if (viewAction === ViewDetailsActionPeoples.viewFollowers) {
    data = (response as MyFollowersResponse).listFollowerUser.map(
      (item) => item.user_id,
    );
  } else {
    data = (response as MyFollowingsResponse).listFollowingUser.map(
      (item) => item.user_id,
    );
  }

  if (data.length === 0) {
    return (
      <Dialog open={isOpen} onOpenChange={onClose}>
        <DialogContent>
          <div className="space-y-6">
            <PeoplesHeading viewAction={viewAction} />
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
          <PeoplesHeading viewAction={viewAction} />

          <ListPeoples data={data} className="md:grid-cols-1" />
        </div>
      </DialogContent>
    </Dialog>
  );
}
