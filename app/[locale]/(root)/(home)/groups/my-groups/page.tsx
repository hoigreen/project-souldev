import { Heading } from '@/components/app/heading';
import { Metadata } from 'next';
import {
  getTranslations,
  unstable_setRequestLocale as unstableSetRequestLocale,
} from 'next-intl/server';

export const metadata: Metadata = {
  title: 'My groups',
};

export default async function HomePage({
  params: { locale },
}: {
  params: { locale: string };
}) {
  unstableSetRequestLocale(locale);
  const t = await getTranslations('Home');

  return (
    <>
      <div className="space-y-3">
        <Heading title={t('M125')} size={1} />
      </div>

      <div className="space-y-3">
        <Heading title={t('M128')} size={1} />
      </div>
    </>
  );
}
