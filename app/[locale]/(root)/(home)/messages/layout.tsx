import { unstable_setRequestLocale as unstableSetRequestLocale } from 'next-intl/server';
import { ReactNode } from 'react';

export default function MessageLayout({
  children,
  params: { locale },
}: {
  children: ReactNode;
  params: { locale: string };
}) {
  unstableSetRequestLocale(locale);

  // if (error) {
  //   return (
  //     <div className="h-screen p-2 px-4 py-14 pb-10 md:p-4 md:pt-20 xl:px-10">
  //       <div className="flex size-full items-center justify-center">
  //         <ErrorStage stage={ErrorStageType.ServerError} />
  //       </div>
  //     </div>

  //   );
  // }

  return (
    <div className="h-screen p-2 px-4 py-14 pb-10 md:p-4 md:pt-20 xl:px-10">
      <div className="size-full">
        {/* <MessagesList
          initialItems={conversations.edges as Array<ConversationEdge>}
          initialPagination={conversations.pageInfo}
          currentUser={currentUser as User}
        /> */}
        {children}
      </div>
    </div>
  );
}
