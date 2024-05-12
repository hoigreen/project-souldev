'use server';

import { endpoints } from '@/services/endpoints';
import requestService from '@/services/request-service';
import { SignupBody } from './definitions';
import { getEndpoint } from '@/services/url';
import { Params } from './url-builder';

// This file contain server actions

export async function login(body: { email: string; password: string }) {
  const data = await requestService.post(endpoints.user.login, body);

  return data;
}

export async function getCurrentUser(params: Params) {
  const data = await requestService.get(
    getEndpoint(endpoints.user.currentUser, params),
  );

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

export async function updateAvatar(params: Params, formData: FormData) {
  const data = await requestService.post(
    getEndpoint(endpoints.user.updateAvatar, params),
    formData,
    {
      headers: {
        'Content-Type':
          'multipart/form-data; boundary=<calculated when request is sent>',
      },
    },
  );

  return data;
}

export async function completeOnboarding(body: any) {
  // const data = await requestService.post(endpoints.user.completeOnboarding, body);
  // return data;
}
