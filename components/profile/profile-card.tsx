import { Profile } from '@/lib/definitions';
import React from 'react';
import { Card } from '../ui/card';

type ProfileCardProps = React.HTMLAttributes<HTMLDivElement> & {
  profile: Profile;
};

export default function ProfileCard({
  className,
  profile,
  ...props
}: ProfileCardProps) {
  return <Card className={className} {...props}></Card>;
}
