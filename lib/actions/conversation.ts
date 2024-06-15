'use server';

import { endpoint } from '@/services/endpoint';
import requestService from '@/services/request-service';
import {
  Conversation,
  Message,
  PaginationsResponse,
  ServerResponse,
} from '../definitions';
import { getPathname } from '@/services/url';
import { Query } from '../url-builder';

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
  query?: Query,
): Promise<PaginationsResponse<Message[]>> {
  return requestService.get(
    getPathname({
      path: endpoint.conversation.messages,
      params: { conversationId },
      query,
    }),
  );
}
