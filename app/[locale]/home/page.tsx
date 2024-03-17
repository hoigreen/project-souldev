import { unstable_setRequestLocale } from 'next-intl/server';

export default function HomePage({
  params: { locale },
}: {
  params: { locale: string };
}) {
  unstable_setRequestLocale(locale);

  return <div>HomePage</div>;
}
