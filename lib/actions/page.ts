'use server';

import requestService from '@/services/request-service';
import {
  Page,
  PaginationsResponse,
  Response,
  ServerResponse,
} from '../definitions';
import { Query } from '../url-builder';
import { getPathname } from '@/services/url';
import { endpoint } from '@/services/endpoint';

export async function getPages(
  query?: Query,
): Promise<PaginationsResponse<Page[]>> {
  return requestService.get(
    getPathname({ path: endpoint.page.getList, query }),
  );
}

export async function getPagesLiked(): Promise<ServerResponse<Page[]>> {
  return requestService.get(endpoint.page.getLiked);
}

export async function getMyPages(): Promise<ServerResponse<Page[]>> {
  return requestService.get(endpoint.page.getMyPages);
}

export async function getPagesFollowing(): Promise<ServerResponse<Page[]>> {
  return requestService.get(endpoint.page.getPagesFollowing);
}

export async function likePage(params: { pageId: string }): Promise<Response> {
  return requestService.post(
    getPathname({ path: endpoint.page.likePage, params }),
  );
}

export async function unlikePage(params: {
  pageId: string;
}): Promise<Response> {
  return requestService.post(
    getPathname({ path: endpoint.page.unlikePage, params }),
  );
}

export async function followPage(params: {
  pageId: string;
}): Promise<Response> {
  return requestService.post(
    getPathname({ path: endpoint.page.followPage, params }),
  );
}

export async function unfollowPage(params: {
  pageId: string;
}): Promise<Response> {
  return requestService.post(
    getPathname({ path: endpoint.page.unFollowPage, params }),
  );
}

// export async function getGroupDetails(
//   params: Params,
// ): Promise<GroupDetailResponse> {
//   return requestService.get(
//     getPathname({ path: endpoint.group.getDetails, params }),
//   );
// }

// export async function getMyGroups(): Promise<GroupsResponseNoPagination> {
//   return requestService.get(endpoint.group.getMyGroups);
// }

// export async function getGroupsJoined(): Promise<GroupsResponseNoPagination> {
//   return requestService.get(endpoint.group.getGroupsJoined);
// }

// export async function getGroupsRequestedToJoin(): Promise<GroupsResponseNoPagination> {
//   return requestService.get(endpoint.group.getGroupsRequestedToJoin);
// }

// export async function getMembersOfGroup(
//   params: Params,
// ): Promise<MembersOfGroupsResponse> {
//   return requestService.get(
//     getPathname({ path: endpoint.group.getListMember, params }),
//   );
// }

// export async function leaveGroup(params: Params): Promise<Response> {
//   return requestService.delete(
//     getPathname({ path: endpoints.group.leave, params }),
//   );
// }

// export async function createGroup(formData: FormData) {
//   return requestService.post(endpoint.group.create, formData, {
//     headers: {
//       'Content-Type': 'multipart/form-data',
//     },
//   });
// }

// export async function updateGroup(
//   params: Params,
//   body: FormData,
// ): Promise<GroupDetailResponse> {
//   return requestService.post(
//     getPathname({ path: endpoint.group.update, params }),
//     body,
//     {
//       headers: {
//         'Content-Type': 'multipart/form-data',
//       },
//     },
//   );
// }

// export async function deleteGroup(params: Params): Promise<Response> {
//   return requestService.delete(
//     getPathname({ path: endpoint.group.deteleGroup, params }),
//   );
// }

// export async function joinGroup(params: Params) {
//   return requestService.post(
//     getPathname({ path: endpoint.group.join, params }),
//   );
// }

// export async function acceptRequestToJoinGroup(
//   params: Params,
//   body: { requestUser_id: string },
// ) {
//   return requestService.post(
//     getPathname({ path: endpoint.group.acceptRequestJoin, params }),
//     body,
//   );
// }

// export async function cancelRequestToJoinGroup(params: Params) {
//   return requestService.post(
//     getPathname({ path: endpoint.group.cancelRequestJoin, params }),
//   );
// }

// export async function getPostInGroup({
//   params,
//   query,
// }: {
//   params?: Params;
//   query?: Query;
// }): Promise<PostsResponse> {
//   return requestService.get(
//     getPathname({ path: endpoint.group.getPostsInGroup, params, query }),
//   );
// }

// export async function leaveGroup(params: Params): Promise<Response> {
//   return requestService.delete(
//     getPathname({ path: endpoint.group.leaveGroup, params }),
//   );
// }
