'use server';

import {
  AddFriendResponse,
  CancelFriendRequestResponse,
  ListPeoplesWithPaginationResponse,
  MyFriendRequestsResponse,
  MyFollowingsResponse,
  MyFriendsResponse,
  ProfileResponse,
  MyFollowersResponse,
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

export async function getMyFollowers(): Promise<MyFollowersResponse> {
  return await requestService.get(endpoints.profile.getMyFollowers);
}

export async function getMyFollowings(): Promise<MyFollowingsResponse> {
  return await requestService.get(endpoints.profile.getMyFollowings);
}

export async function getMyFriendsRequest(): Promise<MyFriendRequestsResponse> {
  return await requestService.get(endpoints.profile.getMyFriendRequest);
}

export async function addFriend(toUserId: string): Promise<AddFriendResponse> {
  return await requestService.post(endpoints.profile.addFriend, {
    toUser_id: toUserId,
  });
}

export async function cancelFriendRequest(
  requestUserId: string,
): Promise<CancelFriendRequestResponse> {
  return await requestService.post(endpoints.profile.removeFriendRequest, {
    requestUser_id: requestUserId,
  });
}

export async function acceptFriendRequest(
  requestUserId: string,
): Promise<AddFriendResponse> {
  return await requestService.post(endpoints.profile.acceptFriendRequest, {
    requestUser_id: requestUserId,
  });
}

export async function removeFriend(toUserId: string) {
  return await requestService.post(endpoints.profile.removeFriend, {
    toUser_id: toUserId,
  });
}

export async function unfollow(
  toUserId: string,
): Promise<CancelFriendRequestResponse> {
  return await requestService.post(endpoints.profile.unfollow, {
    toUser_id: toUserId,
  });
}
