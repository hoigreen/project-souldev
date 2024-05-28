'use server';

import {
  AddFriendResponse,
  ListPeoplesWithPaginationResponse,
  MyFollowerResponse,
  MyFriendsResponse,
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

// Peoples & Friend

export async function getRecommendPeoples(
  query?: Query,
): Promise<ListPeoplesWithPaginationResponse> {
  return await requestService.get(
    getEndpoint({ path: endpoints.profile.getRecommendedPeoples, query }),
  );
}

export async function getMyFriendsList(): Promise<MyFriendsResponse> {
  return await requestService.get(endpoints.profile.getMyFriendsList);
}

export async function getMyFriendsRequest(): Promise<MyFollowerResponse> {
  return await requestService.get(endpoints.profile.getMyFriendRequest);
}

export async function addFriend(toUserId: string): Promise<AddFriendResponse> {
  return await requestService.post(endpoints.profile.addFriend, {
    toUser_id: toUserId,
  });
}

export async function removeFriend(toUserId: string) {
  return await requestService.post(endpoints.profile.removeFriend, {
    toUser_id: toUserId,
  });
}
