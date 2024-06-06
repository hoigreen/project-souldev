'use server';

import requestService from '@/services/request-service';
import {
  GroupDetailResponse,
  GroupsResponse,
  GroupsResponseNoPagination,
  Response,
} from '../definitions';
import { Params, Query } from '../url-builder';
import { getEndpoint } from '@/services/url';
import { endpoints } from '@/services/endpoints';

export async function getGroups(query?: Query): Promise<GroupsResponse> {
  return requestService.get(
    getEndpoint({ path: endpoints.group.getList, query }),
  );
}

export async function getGroupDetails(
  params: Params,
): Promise<GroupDetailResponse> {
  return requestService.get(
    getEndpoint({ path: endpoints.group.getDetails, params }),
  );
}

export async function getMyGroups(): Promise<GroupsResponseNoPagination> {
  return requestService.get(endpoints.group.getMyGroups);
}

export async function getGroupsJoined(): Promise<GroupsResponseNoPagination> {
  return requestService.get(endpoints.group.getGroupsJoined);
}

export async function getGroupsRequestedToJoin(): Promise<GroupsResponseNoPagination> {
  return requestService.get(endpoints.group.getGroupsRequestedToJoin);
}

// export async function leaveGroup(params: Params): Promise<Response> {
//   return requestService.delete(
//     getEndpoint({ path: endpoints.group.leave, params }),
//   );
// }

export async function createGroup(formData: FormData): Promise<Response> {
  return requestService.post(endpoints.group.create, formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });
}

export async function updateGroup(
  params: Params,
  body: { groupName: string; groupCode: string },
): Promise<GroupDetailResponse> {
  return requestService.put(
    getEndpoint({ path: endpoints.group.update, params }),
    body,
  );
}

export async function deleteGroup(params: Params): Promise<void> {
  return requestService.delete(
    getEndpoint({ path: endpoints.group.deteleGroup, params }),
  );
}

export async function joinGroup(params: Params): Promise<Response> {
  return requestService.post(
    getEndpoint({ path: endpoints.group.join, params }),
  );
}
