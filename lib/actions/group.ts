'use server';

import requestService from '@/services/request-service';
import {
  GroupDetailResponse,
  GroupsResponse,
  GroupsResponseNoPagination,
  MembersOfGroupsResponse,
} from '../definitions';
import { Params, Query } from '../url-builder';
import { getPathname } from '@/services/url';
import { endpoint } from '@/services/endpoint';

export async function getGroups(query?: Query): Promise<GroupsResponse> {
  return requestService.get(
    getPathname({ path: endpoint.group.getList, query }),
  );
}

export async function getGroupDetails(
  params: Params,
): Promise<GroupDetailResponse> {
  return requestService.get(
    getPathname({ path: endpoint.group.getDetails, params }),
  );
}

export async function getMyGroups(): Promise<GroupsResponseNoPagination> {
  return requestService.get(endpoint.group.getMyGroups);
}

export async function getGroupsJoined(): Promise<GroupsResponseNoPagination> {
  return requestService.get(endpoint.group.getGroupsJoined);
}

export async function getGroupsRequestedToJoin(): Promise<GroupsResponseNoPagination> {
  return requestService.get(endpoint.group.getGroupsRequestedToJoin);
}

export async function getMembersOfGroup(params: Params) {
  return requestService.get<MembersOfGroupsResponse>(
    getPathname({ path: endpoint.group.getListMember, params }),
  );
}

// export async function leaveGroup(params: Params): Promise<Response> {
//   return requestService.delete(
//     getPathname({ path: endpoints.group.leave, params }),
//   );
// }

export async function createGroup(formData: FormData) {
  return requestService.post(endpoint.group.create, formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });
}

export async function updateGroup(
  params: Params,
  body: FormData,
): Promise<GroupDetailResponse> {
  return requestService.post(
    getPathname({ path: endpoint.group.update, params }),
    body,
    {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    },
  );
}

export async function deleteGroup(params: Params) {
  return requestService.delete(
    getPathname({ path: endpoint.group.deteleGroup, params }),
  );
}

export async function joinGroup(params: Params) {
  return requestService.post(
    getPathname({ path: endpoint.group.join, params }),
  );
}

export async function acceptRequestToJoinGroup(
  params: Params,
  body: { requestUser_id: string },
) {
  return requestService.post(
    getPathname({ path: endpoint.group.acceptRequestJoin, params }),
    body,
  );
}

// export async function cancelRequestToJoinGroup(params: Params) {
//   return requestService.delete(
//     getPathname({ path: endpoints.group., params }),
//   );
// }

export async function getPostInGroup(params: Params) {
  return requestService.get(
    getPathname({ path: endpoint.group.getPostsInGroup, params }),
  );
}
