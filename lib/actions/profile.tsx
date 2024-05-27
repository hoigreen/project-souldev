'use server';

import {
  ListPeoplesWithPaginationResponse,
  ProfileResponse,
} from '@/lib/definitions';
import { endpoints } from '@/services/endpoints';
import requestService from '@/services/request-service';
import { Query } from '../url-builder';
import { getEndpoint } from '@/services/url';

export async function getUserProfile(): Promise<ProfileResponse> {
  return await requestService.get(endpoints.profile.getProfile);
}

export async function createProfile() {
  return await requestService.post(endpoints.profile.createProfile);
}

export async function getMySavedPosts() {
  return await requestService.get(endpoints.profile.getMySavedPosts);
}

export async function getRecommendPeoples(
  query?: Query,
): Promise<ListPeoplesWithPaginationResponse> {
  return await requestService.get(
    getEndpoint({ path: endpoints.profile.getRecommendedPeoples, query }),
  );
}
