import { Modals } from '@/lib/constants';
import { Dialog, DialogContent } from '@/components/ui/dialog';
import { useModalActions, useModalData, useModalOpen } from '@/hooks/use-modal';
import PostForm from '../form';
import { ActionPost, CreatePostData } from '@/lib/definitions';
import { useRouter } from '@/navigation';
import toast from 'react-hot-toast';
import { useTranslations } from 'next-intl';
import React from 'react';

export function CreatePostDialog(): React.JSX.Element {
  const isOpen = useModalOpen(Modals.CreatePost);
  const { onClose } = useModalActions(Modals.CreatePost);
  const { groupId } = useModalData<CreatePostData>(Modals.CreatePost, {
    groupId: undefined,
  });
  const router = useRouter();
  const t = useTranslations('Home');

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="p-3">
        <PostForm
          groupId={groupId}
          action={ActionPost.Create}
          onPostCreated={() => {
            router.refresh();
            toast.success(t('M12'));
            onClose();
          }}
        />
      </DialogContent>
    </Dialog>
  );
}
