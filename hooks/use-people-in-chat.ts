import { Conversation, User } from '@/lib/definitions';
import { useMemo } from 'react';

export function usePeopleInChat(conversation: Conversation, currentUser: User) {
  return useMemo(() => {
    const otherUser =
      conversation.user_id_1._id === currentUser.id
        ? conversation.user_id_2
        : conversation.user_id_1;

    return otherUser;
  }, [conversation, currentUser]);
}
