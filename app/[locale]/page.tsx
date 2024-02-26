import { useTranslations } from 'next-intl';
import { unstable_setRequestLocale as unstableSetRequestLocale } from 'next-intl/server';

export default function Page({
  params: { locale },
}: {
  params: { locale: string };
}): React.JSX.Element {
  unstableSetRequestLocale(locale);
  const t = useTranslations('Page');

  return <h1>{t('title')}</h1>;
}
