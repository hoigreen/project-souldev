'use client';

import { Heading } from '@/components/app/heading';
import PostForm from '@/components/post/form';
import { ActionPost } from '@/lib/definitions';
import { useRouter } from '@/navigation';
import { useTranslations } from 'next-intl';

export default function Page() {
  const t = useTranslations('Post');
  const router = useRouter();

  return (
    <div className="space-y-4 md:space-y-6 lg:space-y-8 xl:space-y-12">
      <Heading title={t('M1')} />

      <PostForm
        action={ActionPost.Create}
        onPostCreated={() => router.push('/home')}
      />
    </div>
  );
}
