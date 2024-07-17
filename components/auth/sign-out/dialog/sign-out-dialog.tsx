import { Modals } from '@/lib/constants';
import { Dialog, DialogContent } from '@/components/ui/dialog';
import { useModalActions, useModalOpen } from '@/hooks/use-modal';
import React, { useTransition } from 'react';
import { useTranslations } from 'next-intl';
import { Button } from '@/components/ui/button';
import signOut from '@/lib/sign-out';
import toast from 'react-hot-toast';

export function SignOutDialog() {
  const t = useTranslations('Auth');
  const isOpen = useModalOpen(Modals.SignOut);
  const { onClose } = useModalActions(Modals.SignOut);
  const [isPending, startTransition] = useTransition();

  const handleSignOut = async () => {
    toast.success(t('M64'));
    startTransition(async () => {
      await signOut();

      onClose();
    });
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-lg p-4">
        <div className="space-y-6">
          <div className="space-y-3">
            <h2 className="block text-base font-bold">{t('M61')}</h2>
            <p className="block text-sm">{t('M62')}</p>
          </div>

          <div className="flex items-center justify-end gap-2">
            <Button
              variant="outline"
              onClick={handleSignOut}
              loading={isPending}
            >
              {t('M60')}
            </Button>
            <Button onClick={onClose}>{t('M63')}</Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
