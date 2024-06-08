'use server';

import {
  UserResponse,
  OnboardingRequestBody,
  ProfileAdvanceInfoBody,
  ProfileAdvanceInfoResponse,
  Response,
  SignupBody,
  UpdateBasicInfoBody,
  UpdateBasicInfoResponse,
} from '@/lib/definitions';
import { Params } from '@/lib/url-builder';
import { endpoint } from '@/services/endpoint';
import requestService from '@/services/request-service';
import { getPathname } from '@/services/url';
import { User } from 'next-auth';

// This file contain server actions

export async function login(body: { email: string; password: string }) {
  const data = await requestService.post(endpoint.user.login, body);

  return data;
}

export async function getCurrentUser(params: Params) {
  const data = await requestService.get(
    getPathname({ path: endpoint.user.currentUser, params }),
  );

  return data;
}

export async function register(body: SignupBody) {
  const data = await requestService.post(endpoint.user.register, body);

  return data;
}

export async function authGoogle(body: SignupBody) {
  if (!body) return;
  const data = await requestService.post(endpoint.user.authGoogle, body);

  return data;
}

export async function authGitHub(body: SignupBody) {
  if (!body) return;
  const data = await requestService.post(endpoint.user.authGitHub, body);

  return data;
}

export async function forgetPassWord(body: { email: string }) {
  const data = await requestService.post(endpoint.user.forgetPassword, body);

  return data;
}

export async function resetPassWord(body: { token: string; password: string }) {
  const data = await requestService.put(endpoint.user.resetPassword, body);

  return data;
}

export async function updateAvatar(params: Params, formData: FormData) {
  const data = await requestService.post(
    getPathname({ path: endpoint.user.updateAvatar, params }),
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

export async function completeOnboarding(
  params: Params,
  body: OnboardingRequestBody,
) {
  return await requestService.post(
    getPathname({ path: endpoint.user.completeOnboarding, params }),
    body,
  );
}

export async function updateInfoBasic(
  body: UpdateBasicInfoBody,
): Promise<UpdateBasicInfoResponse> {
  return requestService.put(endpoint.user.updateUserBasic, body);
}

export async function updateInfoAdvance(
  body: ProfileAdvanceInfoBody,
): Promise<ProfileAdvanceInfoResponse> {
  return requestService.post(endpoint.profile.updateProfile, body);
}

export async function updatePassword(body: {
  password: string;
}): Promise<Response> {
  return requestService.post(endpoint.user.changePassword, body);
}
