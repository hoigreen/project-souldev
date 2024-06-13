'use server';

import { endpoint } from '@/services/endpoint';
import requestService from '@/services/request-service';
import { Conversation, ServerResponse } from '../definitions';

export async function getConversations(): Promise<
  ServerResponse<Conversation[]>
> {
  return requestService.get(endpoint.conversation.list);
}
