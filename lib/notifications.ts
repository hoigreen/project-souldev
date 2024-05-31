import { IMessage } from '@novu/notification-center';

export interface Notification {
  id: string;
  content: string;
  createdAt: IMessage['createdAt'];
  payload: IMessage['payload'];
  seen: boolean;
  templateIdentifier: IMessage['templateIdentifier'];
}

export const NOVU_APPLICATION_IDENTIFIER = process.env
  .NEXT_PUBLIC_NOVU_APPLICATION_IDENTIFIER as string;
