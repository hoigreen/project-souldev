import { useTranslations } from 'next-intl';
import { unstable_setRequestLocale } from 'next-intl/server';

export default function LandingLayout({
  children,
  params: { locale },
}: {
  children: React.ReactNode;
  params: { locale: string };
}): React.JSX.Element {
  unstable_setRequestLocale(locale);

  return <main>{children}</main>;
}
