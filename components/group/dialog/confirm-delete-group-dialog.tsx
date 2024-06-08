import { Modals } from '@/lib/constants';
import { Dialog, DialogContent } from '@/components/ui/dialog';
import { useModalActions, useModalData, useModalOpen } from '@/hooks/use-modal';
import { GroupDataModal } from '@/lib/definitions';
import React from 'react';
import { useTranslations } from 'next-intl';
import { Button } from '@/components/ui/button';
import { useRouter } from '@/navigation';
import { deleteGroup } from '@/lib/actions/group';
import toast from 'react-hot-toast';

export function ConfirmDeleteGroupDialog() {
  const t = useTranslations('Home');
  const router = useRouter();
  const isOpen = useModalOpen(Modals.DeleteGroup);
  const { onClose } = useModalActions(Modals.DeleteGroup);
  const { groupId } = useModalData<GroupDataModal>(Modals.DeleteGroup, {
    groupId: '',
  });

  const handleClick = async () => {
    const response = await deleteGroup({ groupId });

    if (!response.success) {
      toast.error(t('M15'));

      return;
    }

    toast.success(t('M172'));

    router.push('/groups/my-groups');
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-lg p-4">
        <div className="space-y-6">
          <div className="space-y-3">
            <h2 className="block text-base font-bold">{t('M166')}</h2>
            <p className="block text-sm">{t('M170')}</p>
          </div>

          <div className="flex items-center justify-end gap-2">
            <Button onClick={onClose}>{t('M33')}</Button>
            <Button variant="destructive" onClick={handleClick}>
              {t('M166')}
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
