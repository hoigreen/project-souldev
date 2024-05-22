import React from 'react';
import { Avatar, AvatarFallback, AvatarImage } from '../avatar';
import { cn } from '@/lib/utils';

export default function AvatarUser({
  className,
  src,
  alt,
  fallback,
}: {
  className?: string;
  src?: string;
  alt?: string;
  fallback: string;
}): React.JSX.Element {
  return (
    <Avatar className={cn(className)}>
      <AvatarImage src={src} alt={alt} />
      <AvatarFallback>{fallback}</AvatarFallback>
    </Avatar>
  );
}
