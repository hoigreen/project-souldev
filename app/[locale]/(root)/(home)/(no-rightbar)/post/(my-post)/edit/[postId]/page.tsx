import { unstable_setRequestLocale as unstableSetRequestLocale } from 'next-intl/server';

export default async function Page({
  params: { locale },
}: {
  params: { locale: string };
}) {
  unstableSetRequestLocale(locale);

  return (
    <div className="space-y-4 md:space-y-6 lg:space-y-8 xl:space-y-12"></div>
  );
}
