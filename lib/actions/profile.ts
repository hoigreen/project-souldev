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
import { endpoint } from '@/services/endpoint';
import requestService from '@/services/request-service';
import { Params, Query } from '../url-builder';
import { getPathname } from '@/services/url';

// Profile
export async function getUserProfile(): Promise<ProfileResponse> {
  return await requestService.get(endpoint.profile.getProfile);
}

export async function getProfileById(params: Params): Promise<ProfileResponse> {
  return await requestService.get(
    getPathname({ path: endpoint.profile.getProfileById, params }),
  );
}

export async function createProfile() {
  return await requestService.post(endpoint.profile.createProfile);
}

export async function getMySavedPosts() {
  return await requestService.get(endpoint.profile.getMySavedPosts);
}

// Peoples & Friend
export async function getRecommendPeoples(
  query?: Query,
): Promise<ListPeoplesWithPaginationResponse> {
  return await requestService.get(
    getPathname({ path: endpoint.profile.getRecommendedPeoples, query }),
  );
}

export async function getMyFriendsList(): Promise<MyFriendsResponse> {
  return await requestService.get(endpoint.profile.getMyFriendsList);
}

export async function getMyFollowers(): Promise<MyFollowersResponse> {
  return await requestService.get(endpoint.profile.getMyFollowers);
}

export async function getMyFollowings(): Promise<MyFollowingsResponse> {
  return await requestService.get(endpoint.profile.getMyFollowings);
}

export async function getMyFriendsRequest(): Promise<MyFriendRequestsResponse> {
  return await requestService.get(endpoint.profile.getMyFriendRequest);
}

export async function addFriend(toUserId: string): Promise<AddFriendResponse> {
  return await requestService.post(endpoint.profile.addFriend, {
    toUser_id: toUserId,
  });
}

export async function cancelFriendRequest(
  requestUserId: string,
): Promise<CancelFriendRequestResponse> {
  return await requestService.post(endpoint.profile.removeFriendRequest, {
    requestUser_id: requestUserId,
  });
}

export async function acceptFriendRequest(
  requestUserId: string,
): Promise<AddFriendResponse> {
  return await requestService.post(endpoint.profile.acceptFriendRequest, {
    requestUser_id: requestUserId,
  });
}

export async function removeFriend(toUserId: string) {
  return await requestService.post(endpoint.profile.removeFriend, {
    toUser_id: toUserId,
  });
}

export async function unfollow(
  toUserId: string,
): Promise<CancelFriendRequestResponse> {
  return await requestService.post(endpoint.profile.unfollow, {
    toUser_id: toUserId,
  });
}
