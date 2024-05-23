'use server';

import { ProfileResponse } from '@/lib/definitions';
import { endpoints } from '@/services/endpoints';
import requestService from '@/services/request-service';

export async function getUserProfile(): Promise<ProfileResponse> {
  return await requestService.get(endpoints.profile.getProfile);
}

export async function createProfile() {
  return await requestService.post(endpoints.profile.createProfile);
}

export async function getMySavedPosts() {
  return await requestService.get(endpoints.profile.getMySavedPosts);
}
