import { Heading } from '@/components/app/heading';
import { Card } from '@/components/ui/card';
import { Loading } from '@/components/ui/loading';
import { getUserProfile } from '@/lib/actions/profile';
import { SearchParams } from '@/lib/definitions';
import getSession from '@/lib/get-session';
import { Metadata } from 'next';
import {
  getTranslations,
  unstable_setRequestLocale as unstableSetRequestLocale,
} from 'next-intl/server';

export const metadata: Metadata = {
  title: 'Feeds',
  description: 'Discover the latest news and stories',
};

export default async function ProfilePage({
  params: { locale },
  searchParams,
}: {
  params: { locale: string };
  searchParams: SearchParams;
}) {
  unstableSetRequestLocale(locale);
  const t = await getTranslations('Home');

  const session = await getSession();

  const user = session?.user;

  if (!user) return <Loading />;

  const userProfile = await getUserProfile();

  return (
    <div className="space-y-4 md:space-y-6 lg:space-y-8 xl:space-y-12">
      <Heading title={t('M19')} />

      {/* <ProfileCard user={ } /> */}

      <Card className="flex items-center justify-between p-4 md:p-6">
        <div></div>
      </Card>
    </div>
  );
}
