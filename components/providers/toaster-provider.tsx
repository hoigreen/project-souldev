'use client';

import type { ToasterProps as ToasterPropsType } from 'react-hot-toast';
import { Toaster } from 'react-hot-toast';

export function ToasterProvider({ children, ...props }: ToasterPropsType) {
  return <Toaster {...props}>{children}</Toaster>;
}
