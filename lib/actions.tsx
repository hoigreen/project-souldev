'use server';

import cookie from './cookie';
import { endpoints } from '@/services/endpoints';
import requestService from '@/services/request-service';
import { signOut, SignOutParams } from 'next-auth/react';
import { SignupBody } from './definitions';

// This file contain server actions

export async function login(body: { email: string; password: string }) {
  const data = await requestService.post(endpoints.user.login, body);

  return data;
}

export async function logOut(options?: SignOutParams) {
  try {
    await signOut(options);

    cookie.delete(
      (process.env.NEXT_PUBLIC_AUTH_COOKIE_NAME as string) ?? 'access_token',
    );
  } catch (error: any) {
    console.error(error);
  }
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

export async function register(body: SignupBody) {
  const data = await requestService.post(endpoints.user.register, body);

  return data;
}

export async function authGoogle(body: SignupBody) {
  if (!body) return;
  const data = await requestService.post(endpoints.user.authGoogle, body);

  return data;
}

export async function authGitHub(body: SignupBody) {
  if (!body) return;
  const data = await requestService.post(endpoints.user.authGitHub, body);

  return data;
}

export async function forgetPassWord(body: { email: string }) {
  const data = await requestService.post(endpoints.user.forgetPassword, body);

  return data;
}

export async function resetPassWord(body: { token: string; password: string }) {
  const data = await requestService.put(endpoints.user.resetPassword, body);

  return data;
}
