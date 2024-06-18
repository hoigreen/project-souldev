import { Modals } from '@/lib/constants';
import { Dialog, DialogContent } from '@/components/ui/dialog';
import { useModalActions, useModalData, useModalOpen } from '@/hooks/use-modal';
import { RemoveFriendData } from '@/lib/definitions';
import React from 'react';
import { useTranslations } from 'next-intl';
import { getFullName } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import toast from 'react-hot-toast';
import { useRouter } from '@/navigation';
import { removeFriend } from '@/lib/actions/profile';

export function RemoveFriendDialog() {
  const t = useTranslations('Home');
  const router = useRouter();
  const isOpen = useModalOpen(Modals.RemoveFriend);
  const { onClose } = useModalActions(Modals.RemoveFriend);
  const { user } = useModalData<RemoveFriendData>(Modals.RemoveFriend, {
    user: undefined,
  });

  const handleDeleteFriend = async (userId?: string) => {
    if (!userId) {
      toast.error(t('M15'));
      return;
    }

    const response = await removeFriend(userId);

    if (!response.success) {
      toast.error(t('M15'));

      return;
    }

    onClose();
    toast.success(t('M100'));
    router.refresh();
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-lg p-4">
        <div className="space-y-6">
          <div className="space-y-3">
            <h2 className="block text-base font-bold">{t('M97')}</h2>
            <p className="block text-sm">
              {t('M98', {
                name: getFullName(user?.first_name, user?.last_name),
              })}
            </p>
          </div>

          <div className="flex items-center justify-end gap-2">
            <Button onClick={onClose}>{t('M33')}</Button>
            <Button
              variant="outline"
              onClick={() => handleDeleteFriend(user?._id)}
            >
              {t('M99')}
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
