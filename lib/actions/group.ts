'use server';

import requestService from '@/services/request-service';
import { GroupDetailResponse, GroupsResponse, Response } from '../definitions';
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

export async function createGroup(body: {
  groupName: string;
  groupCode: string;
}): Promise<GroupDetailResponse> {
  return requestService.post(endpoints.group.create, body);
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
