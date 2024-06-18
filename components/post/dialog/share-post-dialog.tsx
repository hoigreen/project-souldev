import { Modals } from '@/lib/constants';
import { Dialog, DialogContent } from '@/components/ui/dialog';
import { useModalActions, useModalData, useModalOpen } from '@/hooks/use-modal';
import { SharePostData } from '@/lib/definitions';
import React from 'react';
import SharePostForm from '../form/share-form';

export function SharePostDialog(): React.JSX.Element {
  const isOpen = useModalOpen(Modals.SharePost);
  const { onClose } = useModalActions(Modals.SharePost);
  const { postId } = useModalData<SharePostData>(Modals.SharePost, {
    postId: '',
  });

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="p-3">
        <SharePostForm postId={postId} onSharedSuccess={onClose} />
      </DialogContent>
    </Dialog>
  );
}
