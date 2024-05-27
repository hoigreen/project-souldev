import { Modals } from '@/lib/constants';
import { Dialog, DialogContent } from '@/components/ui/dialog';
import { useModalActions, useModalData, useModalOpen } from '@/hooks/use-modal';
import { RemoveFriendData } from '@/lib/definitions';
import React from 'react';
import SharePostForm from '../../post/form/share-form';

export function RemoveFriendDialog() {
  const isOpen = useModalOpen(Modals.RemoveFriend);
  const { onClose } = useModalActions(Modals.RemoveFriend);
  const { user } = useModalData<RemoveFriendData>(Modals.RemoveFriend, {
    user: undefined,
  });

  console.log(user);

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="p-3">
        {/* <SharePostForm postId={postId} onSharedSuccess={() => onClose()} /> */}
      </DialogContent>
    </Dialog>
  );
}
