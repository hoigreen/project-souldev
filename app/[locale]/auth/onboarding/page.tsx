import UserOnboarding from '@/components/onboarding/user-onboarding';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Onboarding',
};

export default function Page() {
  return <UserOnboarding />;
}
