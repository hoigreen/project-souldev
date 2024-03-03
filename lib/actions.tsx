'use server';

import { endpoints } from '@/services/endpoints';
import requestService from '@/services/request-service';
import { getEndpoint } from '@/services/url';

// This file contain server actions
export async function login(body: { email: string; password: string }) {
  const { data, error } = await requestService.post(
    getEndpoint(endpoints.user.login),
    body,
  );

  return { data, error };
}
