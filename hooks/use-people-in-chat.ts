import { Conversation, User, UserBasic } from '@/lib/definitions';
import { useMemo } from 'react';

export function usePeopleInChat(
  conversation: Conversation,
  currentUser: UserBasic,
) {
  return useMemo(() => {
    const otherUser =
      conversation.user_id_1._id === currentUser._id
        ? conversation.user_id_2
        : conversation.user_id_1;

    return otherUser;
  }, [conversation, currentUser]);
}
