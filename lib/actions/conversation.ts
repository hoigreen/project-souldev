'use server';

import { endpoint } from '@/services/endpoint';
import requestService from '@/services/request-service';
import { Conversation, Message, ServerResponse } from '../definitions';
import { getPathname } from '@/services/url';

export async function getConversations(): Promise<
  ServerResponse<Conversation[]>
> {
  return requestService.get(endpoint.conversation.list);
}

export async function getConversationById(
  conversationId: string,
): Promise<ServerResponse<Conversation>> {
  return requestService.get(
    getPathname({
      path: endpoint.conversation.detail,
      params: { conversationId },
    }),
  );
}

export async function getMessages(
  conversationId: string,
): Promise<ServerResponse<Message[]>> {
  return requestService.get(
    getPathname({
      path: endpoint.conversation.messages,
      params: { conversationId },
    }),
  );
}
