'use server';

import { endpoints } from '@/services/endpoints';
import requestService from '@/services/request-service';
import cookie from './cookie';

// This file contain server actions
export async function login(body: { email: string; password: string }) {
  const data = await requestService.post(endpoints.user.login, body);

  return data;
}

export async function getCurrentUser() {
  const data = await requestService.get(endpoints.user.currentUser, {
    headers: {
      Authorization: cookie.get(
        process.env.NEXT_PUBLIC_AUTH_COOKIE_NAME as string,
      ),
    },
  });

  return data;
}
