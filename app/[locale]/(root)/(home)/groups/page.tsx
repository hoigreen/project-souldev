import { Heading } from '@/components/app/heading';
import { SearchParams } from '@/lib/definitions';
import { Metadata } from 'next';
import { unstable_setRequestLocale as unstableSetRequestLocale } from 'next-intl/server';

export const metadata: Metadata = {
  title: 'Feeds',
  description: 'Discover the latest news and stories',
};

export default async function HomePage({
  params: { locale },
  searchParams,
}: {
  params: { locale: string };
  searchParams: SearchParams;
}) {
  unstableSetRequestLocale(locale);

  return (
    <div className="space-y-4 md:space-y-6 lg:space-y-8 xl:space-y-12">
      <Heading title="Message" />
    </div>
  );
}