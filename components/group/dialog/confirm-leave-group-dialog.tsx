import { Modals } from '@/lib/constants';
import { Dialog, DialogContent } from '@/components/ui/dialog';
import { useModalActions, useModalData, useModalOpen } from '@/hooks/use-modal';
import { GroupDataModal } from '@/lib/definitions';
import React from 'react';
import { useTranslations } from 'next-intl';
import { Button } from '@/components/ui/button';
import { useRouter } from '@/navigation';
import { leaveGroup } from '@/lib/actions/group';
import toast from 'react-hot-toast';

export function ConfirmLeaveGroupDialog() {
  const t = useTranslations('Home');
  const router = useRouter();
  const isOpen = useModalOpen(Modals.LeaveGroup);
  const { onClose } = useModalActions(Modals.LeaveGroup);
  const { groupId } = useModalData<GroupDataModal>(Modals.LeaveGroup, {
    groupId: '',
  });

  const handleClick = async () => {
    const response = await leaveGroup({ groupId });
    if (!response.success) {
      toast.error(t('M15'));

      return;
    }

    toast.success(t('M171'));
    router.push('/groups');
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-lg p-4">
        <div className="space-y-6">
          <div className="space-y-3">
            <h2 className="block text-base font-bold">{t('M167')}</h2>
            <p className="block text-sm">{t('M169')}</p>
          </div>

          <div className="flex items-center justify-end gap-2">
            <Button onClick={onClose}>{t('M33')}</Button>
            <Button variant="destructive" onClick={handleClick}>
              {t('M167')}
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
