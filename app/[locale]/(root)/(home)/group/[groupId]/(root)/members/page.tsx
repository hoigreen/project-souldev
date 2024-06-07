import { ErrorStage, ErrorStageType } from '@/components/app/error-stage';
import { Heading } from '@/components/app/heading';
import ListPeoples from '@/components/peoples/list-peoples';
import { ListPeoplesLoading } from '@/components/peoples/loading';
import { Card } from '@/components/ui/card';
import { TabsContent, TabsList, TabsTrigger, Tabs } from '@/components/ui/tabs';
import { getMembersOfGroup } from '@/lib/actions/group';
import { MemberType } from '@/lib/constants';
import { Metadata } from 'next';
import {
  getTranslations,
  unstable_setRequestLocale as unstableSetRequestLocale,
} from 'next-intl/server';
import { Suspense } from 'react';

export const metadata: Metadata = {
  title: 'Members',
};

export default async function Page({
  params: { locale, groupId },
}: {
  params: { locale: string; groupId: string };
}) {
  unstableSetRequestLocale(locale);
  const t = await getTranslations('Home');

  const response = await getMembersOfGroup({ groupId });

  if (!response.success) {
    return <ErrorStage stage={ErrorStageType.ServerError} />;
  }

  return (
    <div className="space-y-4 md:space-y-6 lg:space-y-8 xl:space-y-12">
      <Heading title={t('M155')} size={1} />

      <Tabs defaultValue={MemberType.Member} className="space-y-3">
        <TabsList>
          <TabsTrigger value={MemberType.Member}>{t('M155')}</TabsTrigger>
          <TabsTrigger value={MemberType.Manager}>{t('M160')}</TabsTrigger>
        </TabsList>

        <TabsContent value={MemberType.Member}>
          <Card className="mx-auto w-full max-w-3xl space-y-3 p-3 md:p-4">
            <p className="text-right font-medium md:text-lg">
              {t('M143', {
                totalMembers: response.users.length,
              })}
            </p>
            <Suspense fallback={<ListPeoplesLoading />}>
              <ListPeoples data={response.users} className="md:grid-cols-1" />
            </Suspense>
          </Card>
        </TabsContent>
        <TabsContent value={MemberType.Manager}>
          <Card className="mx-auto w-full max-w-3xl space-y-3 p-3 md:p-4">
            <p className="text-right font-medium md:text-lg">
              {t('M143', {
                totalMembers: response.users.length,
              })}
            </p>
            <Suspense fallback={<ListPeoplesLoading />}>
              <ListPeoples
                data={response.managers}
                className="md:grid-cols-1"
              />
            </Suspense>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
