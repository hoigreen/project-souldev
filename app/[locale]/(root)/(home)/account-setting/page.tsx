import SettingsBox from '@/components/app/account-setting/setting-box';
import { Heading } from '@/components/app/heading';
import { Metadata } from 'next';
import {
  getTranslations,
  unstable_setRequestLocale as unstableSetRequestLocale,
} from 'next-intl/server';

export const metadata: Metadata = {
  title: 'Settings',
};

export default async function HomePage({
  params: { locale },
}: {
  params: { locale: string };
}) {
  unstableSetRequestLocale(locale);
  const t = await getTranslations('Home');

  return (
    <div className="space-y-4 md:space-y-6 lg:space-y-8 xl:space-y-12">
      <div className="space-y-3">
        <Heading title={t('M135')} />
        <p className="text-xs font-light sm:text-sm md:text-base">
          {t('M136')}
        </p>
        <hr />

        <SettingsBox />
      </div>
    </div>
  );
}
