import Image from 'next/image';
import { Dialog, DialogContent, DialogTrigger } from '../dialog';
import React from 'react';

/* ---------------------------------------------------------------------------------------------------------------------
 * Component: ViewImageDialog
 * ------------------------------------------------------------------------------------------------------------------ */

export type ViewImageDialogProps = React.ComponentPropsWithoutRef<
  typeof Dialog
> & {
  alt: string;
  src: string;
};

export function ViewImageDialog({
  alt,
  src,
  children,
  ...props
}: ViewImageDialogProps) {
  if (!src) {
    return null;
  }

  return (
    <Dialog {...props}>
      <DialogTrigger asChild>{children}</DialogTrigger>

      <DialogContent className="h-[calc(90vh)] overflow-hidden bg-gradient-to-tr from-green-100/80 via-blue-300/80 to-teal-200/80 sm:h-[calc(100vh-160px)]">
        <Image fill alt={alt} className="object-contain px-5 py-10" src={src} />
      </DialogContent>
    </Dialog>
  );
}
