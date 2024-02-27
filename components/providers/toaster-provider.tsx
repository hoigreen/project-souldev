'use client';

import { Toaster, ToasterProps } from 'react-hot-toast';

export function ToasterProvider({ children, ...props }: ToasterProps) {
  return <Toaster {...props}>{children}</Toaster>;
}
