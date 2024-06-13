import { ErrorStage, ErrorStageType } from '@/components/app/error-stage';
import { ConversationForm } from '@/components/messages/conversation-form';
import { ConversationHeaderNew } from '@/components/messages/conversation-header-new';
import { getProfileById } from '@/lib/actions/profile';
import getSession from '@/lib/get-session';
import { Metadata } from 'next';
import { unstable_setRequestLocale as unstableSetRequestLocale } from 'next-intl/server';

type PageProps = {
  params: {
    locale: string;
    userId: string;
  };
};

export const metadata: Metadata = {
  title: 'New chat',
};

export default async function Page({ params: { locale, userId } }: PageProps) {
  unstableSetRequestLocale(locale);
  const session = await getSession();

  if (!session) {
    return (
      <div className="h-full grow bg-white dark:bg-black md:overflow-auto md:rounded-lg md:shadow-md">
        <ErrorStage stage={ErrorStageType.Unauthorized} />
      </div>
    );
  }

  const response = await getProfileById({ userId });

  if (!response.success) {
    return (
      <div className="h-full grow bg-white dark:bg-black md:overflow-auto md:rounded-lg md:shadow-md">
        <ErrorStage stage={ErrorStageType.ServerError} />
      </div>
    );
  }

  return (
    <div className="flex h-full grow flex-col bg-white dark:bg-black md:overflow-auto md:rounded-lg md:shadow-md">
      <ConversationHeaderNew user={response.data.user_id} />
      <div className="grow bg-neutral-50"></div>
      <ConversationForm peopleId={response.data.user_id._id} />
    </div>
  );
}
