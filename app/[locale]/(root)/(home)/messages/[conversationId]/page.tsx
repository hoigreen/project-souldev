import { ErrorStage, ErrorStageType } from '@/components/app/error-stage';
import { ConversationContainer } from '@/components/messages/conversation-container';
import { ConversationForm } from '@/components/messages/conversation-form';
import { ConversationHeader } from '@/components/messages/conversation-header';
import { getConversationById, getMessages } from '@/lib/actions/conversation';
import getSession from '@/lib/get-session';
import { getFullName } from '@/lib/utils';
import { Metadata } from 'next';
import { unstable_setRequestLocale as unstableSetRequestLocale } from 'next-intl/server';

type PageProps = {
  params: {
    locale: string;
    conversationId: string;
  };
};

export async function generateMetadata({
  params: { conversationId },
}: PageProps): Promise<Metadata> {
  const response = await getConversationById(conversationId);
  const session = await getSession();

  if (!session) {
    return {
      title: 'Unauthorized',
    };
  }

  if (!response.success) {
    return {
      title: 'Something went wrong',
    };
  }

  const user1 = response.data.user_id_1;
  const user2 = response.data.user_id_2;

  const people = user1._id === session.user._id ? user2 : user1;

  return {
    title: getFullName(people.first_name, people.last_name),
  };
}

export default async function Page({
  params: { locale, conversationId },
}: PageProps) {
  unstableSetRequestLocale(locale);
  const session = await getSession();

  if (!session) {
    return (
      <div className="h-full grow bg-white dark:bg-black md:overflow-auto md:rounded-lg md:shadow-md">
        <ErrorStage stage={ErrorStageType.Unauthorized} />
      </div>
    );
  }

  const [conversationResponse, messsagesResponse] = await Promise.all([
    getConversationById(conversationId),
    getMessages(conversationId),
  ]);

  if (!conversationResponse.success) {
    return (
      <div className="h-full grow bg-white dark:bg-black md:overflow-auto md:rounded-lg md:shadow-md">
        <ErrorStage stage={ErrorStageType.ServerError} />
      </div>
    );
  }

  if (!messsagesResponse.success) {
    return (
      <div className="h-full grow bg-white dark:bg-black md:overflow-auto md:rounded-lg md:shadow-md">
        <ErrorStage stage={ErrorStageType.ServerError} />
      </div>
    );
  }

  const peopleId =
    conversationResponse.data.user_id_1._id === session.user._id
      ? conversationResponse.data.user_id_2._id
      : conversationResponse.data.user_id_1._id;

  return (
    <div className="flex h-full grow flex-col bg-white dark:bg-black md:overflow-auto md:rounded-lg md:shadow-md">
      <ConversationHeader
        conversation={conversationResponse.data}
        currentUser={session.user}
      />

      <ConversationContainer
        conversation={conversationResponse.data}
        currentUser={session.user}
        initialMessages={messsagesResponse.items}
        initialPagination={{
          hasNextPage: messsagesResponse.page < messsagesResponse.totalPage,
          page: messsagesResponse.page,
        }}
      />

      <ConversationForm peopleId={peopleId} />
    </div>
  );
}
