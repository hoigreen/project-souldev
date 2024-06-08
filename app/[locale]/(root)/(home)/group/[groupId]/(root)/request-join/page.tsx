import { ErrorStage, ErrorStageType } from '@/components/app/error-stage';
import { Heading } from '@/components/app/heading';
import RequestJoinGroup from '@/components/group/request-join-group';
import { ListPeoplesLoading } from '@/components/peoples/loading';
import { Card } from '@/components/ui/card';
import { getGroupDetails } from '@/lib/actions/group';
import getSession from '@/lib/get-session';
import { Metadata } from 'next';
import {
  getTranslations,
  unstable_setRequestLocale as unstableSetRequestLocale,
} from 'next-intl/server';
import { notFound } from 'next/navigation';
import { Suspense } from 'react';

export const metadata: Metadata = {
  title: 'Request Join',
};

export default async function Page({
  params: { locale, groupId },
}: {
  params: { locale: string; groupId: string };
}) {
  unstableSetRequestLocale(locale);
  const t = await getTranslations('Home');

  const session = await getSession();

  if (!session) {
    return <ErrorStage stage={ErrorStageType.Unauthorized} />;
  }

  const groupResponse = await getGroupDetails({ groupId });

  if (!groupResponse.success) {
    return <ErrorStage stage={ErrorStageType.ServerError} />;
  }

  const isAdmin = groupResponse.data.managers.some(
    (manager) => manager.user_id === session.user._id,
  );

  if (!isAdmin) {
    notFound();
  }
  const data = groupResponse.data.member_requests;

  if (data.length === 0) {
    return <ErrorStage stage={ErrorStageType.ResourceNotFound} />;
  }

  const users = data.map((item) => item.user_id);

  return (
    <div className="space-y-4 md:space-y-6 lg:space-y-8 xl:space-y-12">
      <Heading title={t('M161')} size={1} />

      <Card className="mx-auto w-full max-w-3xl space-y-3 p-3 md:p-4">
        <p className="text-right font-medium md:text-lg">
          {t('M143', {
            totalMembers: data.length,
          })}
        </p>
        <Suspense fallback={<ListPeoplesLoading />}>
          <RequestJoinGroup data={users} groupId={groupId} />
        </Suspense>
      </Card>
    </div>
  );
}
