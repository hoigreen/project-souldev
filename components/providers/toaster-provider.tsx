'use client';

import { Toaster, ToasterProps as ToasterPropsType } from 'react-hot-toast';

export function ToasterProvider({ children, ...props }: ToasterPropsType) {
  return <Toaster {...props}>{children}</Toaster>;
}
