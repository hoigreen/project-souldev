'use server';

import {
  OnboardingRequestBody,
  ProfileAdvanceInfoBody,
  ProfileAdvanceInfoResponse,
  Response,
  SignupBody,
  UpdateBasicInfoBody,
  UpdateBasicInfoResponse,
} from '@/lib/definitions';
import { Params } from '@/lib/url-builder';
import { endpoints } from '@/services/endpoints';
import requestService from '@/services/request-service';
import { getEndpoint } from '@/services/url';

// This file contain server actions

export async function login(body: { email: string; password: string }) {
  const data = await requestService.post(endpoints.user.login, body);

  return data;
}

export async function getCurrentUser(params: Params) {
  const data = await requestService.get(
    getEndpoint({ path: endpoints.user.currentUser, params }),
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
    getEndpoint({ path: endpoints.user.updateAvatar, params }),
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
    getEndpoint({ path: endpoints.user.completeOnboarding, params }),
    body,
  );
}

export async function updateInfoBasic(
  body: UpdateBasicInfoBody,
): Promise<UpdateBasicInfoResponse> {
  return requestService.put(endpoints.user.updateUserBasic, body);
}

export async function updateInfoAdvance(
  body: ProfileAdvanceInfoBody,
): Promise<ProfileAdvanceInfoResponse> {
  return requestService.post(endpoints.profile.updateProfile, body);
}

export async function updatePassword(body: {
  password: string;
}): Promise<Response> {
  return requestService.post(endpoints.user.changePassword, body);
}
