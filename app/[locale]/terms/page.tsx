import Container from '@/components/ui/containter';
import { Typography } from '@/components/ui/typography';
import { Locale } from '@/lib/definitions';
import { terms } from '@/lib/terms';
import { unstable_setRequestLocale } from 'next-intl/server';

export default function Page({
  params: { locale },
}: {
  params: { locale: Locale };
}) {
  unstable_setRequestLocale(locale);

  return (
    <Container className="py-8">
      <Typography content={terms[locale]} />
    </Container>
  );
}
