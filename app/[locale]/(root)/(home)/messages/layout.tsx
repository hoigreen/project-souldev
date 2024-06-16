import { ErrorStage, ErrorStageType } from '@/components/app/error-stage';
import { LeftSidebar } from '@/components/app/left-sidebar';
import { ConversationsList } from '@/components/messages/conversations-list';
import { getConversations } from '@/lib/actions/conversation';
import { Conversation, User } from '@/lib/definitions';
import getSession from '@/lib/get-session';
import { unstable_setRequestLocale as unstableSetRequestLocale } from 'next-intl/server';
import { ReactNode } from 'react';

export default async function MessageLayout({
  children,
  params: { locale },
}: {
  children: ReactNode;
  params: { locale: string };
}) {
  unstableSetRequestLocale(locale);

  const session = await getSession();

  if (!session) {
    return (
      <div className="h-screen p-2 px-4 py-14 pb-10 md:p-4 md:pt-20 xl:px-10">
        <div className="flex size-full items-center justify-center">
          <ErrorStage stage={ErrorStageType.Unauthorized} />
        </div>
      </div>
    );
  }

  const response = await getConversations();

  if (!response.success) {
    return (
      <div className="h-screen p-2 px-4 py-14 pb-10 md:p-4 md:pt-20 xl:px-10">
        <div className="flex size-full items-center justify-center">
          <ErrorStage stage={ErrorStageType.ServerError} />
        </div>
      </div>
    );
  }

  return (
    <div className="h-screen pt-14 md:p-4 md:pt-20 xl:px-10 xl:pl-80">
      <LeftSidebar />

      <div className="flex size-full md:gap-10 md:p-3 lg:p-4">
        <ConversationsList
          initialItems={response.data as Array<Conversation>}
          currentUser={session.user as User}
        />

        {children}
      </div>
    </div>
  );
}
