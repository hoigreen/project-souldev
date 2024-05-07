import BackLinkButton from '@/components/ui/app/back-link-button';
import Container from '@/components/ui/containter';
import { Typography } from '@/components/ui/typography';
import { Locale } from '@/lib/definitions';
import { terms } from '@/lib/terms';
import { useTranslations } from 'next-intl';
import { unstable_setRequestLocale as unstableSetRequestLocale } from 'next-intl/server';

export default function Page({
  params: { locale },
}: {
  params: { locale: Locale };
}) {
  unstableSetRequestLocale(locale);
  const t = useTranslations('Action');

  return (
    <Container className="space-y-4 py-8">
      <BackLinkButton text={t('M1')} />
      <Typography content={terms[locale]} />
    </Container>
  );
}
