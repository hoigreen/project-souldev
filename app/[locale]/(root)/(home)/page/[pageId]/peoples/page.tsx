import { ErrorStage, ErrorStageType } from '@/components/app/error-stage';
import { Heading } from '@/components/app/heading';
import ListPeoples from '@/components/peoples/list-peoples';
import { ListPeoplesLoading } from '@/components/peoples/loading';
import { Card } from '@/components/ui/card';
import { EmphasizedTextBold } from '@/components/ui/emphasize';
import { TabsContent, TabsList, TabsTrigger, Tabs } from '@/components/ui/tabs';
import { getPageDetails } from '@/lib/actions/page';
import { UserBasic } from '@/lib/definitions';
import { Metadata } from 'next';
import {
  getTranslations,
  unstable_setRequestLocale as unstableSetRequestLocale,
} from 'next-intl/server';
import { Suspense } from 'react';

export const metadata: Metadata = {
  title: 'Peoples',
};

enum PeoplesTab {
  Likes = 'likes',
  Followers = 'followers',
}

export default async function Page({
  params: { locale, pageId },
}: {
  params: { locale: string; pageId: string };
}) {
  unstableSetRequestLocale(locale);
  const t = await getTranslations('Home');

  const response = await getPageDetails({ pageId });

  if (!response.success) {
    return <ErrorStage stage={ErrorStageType.ServerError} />;
  }

  const peoplesLike = response.data.likes.map(
    (item) => item.user_id,
  ) as UserBasic[];
  const peoplesFollowers = response.data.followers.map(
    (item) => item.user_id,
  ) as UserBasic[];

  return (
    <div className="space-y-4 md:space-y-6 lg:space-y-8 xl:space-y-12">
      <Heading title={t('M194')} size={1} />

      <Tabs defaultValue={PeoplesTab.Likes} className="space-y-3">
        <TabsList>
          <TabsTrigger value={PeoplesTab.Likes}>{t('M196')}</TabsTrigger>
          <TabsTrigger value={PeoplesTab.Followers}>{t('M195')}</TabsTrigger>
        </TabsList>

        <TabsContent value={PeoplesTab.Likes}>
          <Card className="mx-auto w-full max-w-3xl space-y-3 p-3 md:p-4">
            <p className="text-right font-medium md:text-lg">
              {t.rich('M190', {
                emphasize: EmphasizedTextBold,
                count: peoplesLike.length,
              })}
            </p>
            <Suspense fallback={<ListPeoplesLoading />}>
              <ListPeoples data={peoplesLike} className="md:grid-cols-1" />
            </Suspense>
          </Card>
        </TabsContent>
        <TabsContent value={PeoplesTab.Followers}>
          <Card className="mx-auto w-full max-w-3xl space-y-3 p-3 md:p-4">
            <p className="text-right font-medium md:text-lg">
              {t.rich('M191', {
                emphasize: EmphasizedTextBold,
                count: peoplesFollowers.length,
              })}
            </p>
            <Suspense fallback={<ListPeoplesLoading />}>
              <ListPeoples data={peoplesFollowers} className="md:grid-cols-1" />
            </Suspense>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
