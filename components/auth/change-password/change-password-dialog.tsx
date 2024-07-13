'use client';

import React from 'react';
import { useModalActions, useModalOpen } from '@/hooks/use-modal';
import { Modals } from '@/lib/constants';
import { Dialog, DialogContent } from '@/components/ui/dialog';
import { ChangePasswordForm } from './change-password-form';

export default function ChangePasswordDialog() {
  const isOpen = useModalOpen(Modals.ChangePassword);
  const { onClose } = useModalActions(Modals.ChangePassword);

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-xl md:p-4 lg:p-6">
        <ChangePasswordForm />
      </DialogContent>
    </Dialog>
  );
}
