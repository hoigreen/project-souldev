import { Heading } from '@/components/app/heading';
import PostCard from '@/components/app/post/post-card';
import getSession from '@/lib/get-session';
import { unstable_setRequestLocale as unstableSetRequestLocale } from 'next-intl/server';

export default async function Page({
  params: { locale, postId },
}: {
  params: { locale: string; postId: string };
}) {
  unstableSetRequestLocale(locale);

  return (
    <div className="space-y-4 md:space-y-6 lg:space-y-8 xl:space-y-12"></div>
  );
}
