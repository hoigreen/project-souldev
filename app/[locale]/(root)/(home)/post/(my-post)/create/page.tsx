import { Heading } from '@/components/app/heading';
import PostForm from '@/components/app/post/form';
import { ActionPost } from '@/lib/definitions';
import {
  getTranslations,
  unstable_setRequestLocale as unstableSetRequestLocale,
} from 'next-intl/server';

export default async function Page({
  params: { locale },
}: {
  params: { locale: string };
}) {
  unstableSetRequestLocale(locale);
  const t = await getTranslations('Post');

  return (
    <div className="space-y-4 md:space-y-6 lg:space-y-8 xl:space-y-12">
      <Heading title={t('M1')} />

      <PostForm action={ActionPost.Create} />
    </div>
  );
}
