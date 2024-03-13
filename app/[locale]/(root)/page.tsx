import { useTranslations } from 'next-intl';

export default function Page({
  params: { locale },
}: {
  params: { locale: string };
}): React.JSX.Element {
  const t = useTranslations('Page');

  return <h1>{t('title')}</h1>;
}
