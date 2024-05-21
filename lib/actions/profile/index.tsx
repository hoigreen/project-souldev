'use server';

import { endpoints } from '@/services/endpoints';
import requestService from '@/services/request-service';

export async function getUserProfile() {
  return await requestService.get(endpoints.profile.getProfile);
}

export async function createProfile() {
  return await requestService.post(endpoints.profile.createProfile);
}
