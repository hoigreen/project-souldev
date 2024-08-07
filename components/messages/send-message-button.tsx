'use client';

import { Link } from '@/navigation';
import { Send2 } from 'iconsax-react';
import { useTranslations } from 'next-intl';
import { buttonVariants } from '../ui/button';
import { cn } from '@/lib/utils';
import { useQuery } from '@tanstack/react-query';
import { getConversations } from '@/lib/actions/conversation';
import { Skeleton } from '../ui/skeleton';
import { useSession } from 'next-auth/react';

type ConversationBoxProps = {
  className?: string;
  loadingClassName?: string;
  userId: string;
};

export function SendMessageButton({
  userId,
  className,
  loadingClassName,
}: ConversationBoxProps) {
  const t = useTranslations('Home');
  const { data: session } = useSession();

  const { data: response, isLoading } = useQuery({
    queryKey: ['get-my-conversations', userId],
    queryFn: () => getConversations(),
  });

  if (!session) {
    return null;
  }

  if (isLoading) {
    return (
      <Skeleton className={cn('h-10 w-32 rounded-lg', loadingClassName)} />
    );
  }

  if (!response?.success) {
    return null;
  }

  const conversationId = response.data.find(
    (conversation) =>
      (conversation.user_id_1._id === session.user._id &&
        conversation.user_id_2._id === userId) ||
      (conversation.user_id_1._id === userId &&
        conversation.user_id_2._id === session.user._id),
  )?._id;

  if (!conversationId) {
    return null;
  }

  return (
    <Link
      href={`/messages/${conversationId}`}
      className={cn(
        buttonVariants(),
        'w-fit gap-1 text-xs sm:text-sm',
        className,
      )}
    >
      <Send2 size={16} />
      <span className="max-sm:hidden md:hidden lg:block xl:hidden xl:rounded-xl 2xl:block 2xl:rounded-lg">
        {t('M206')}
      </span>
    </Link>
  );
}
