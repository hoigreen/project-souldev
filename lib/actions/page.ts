'use server';

import requestService from '@/services/request-service';
import {
  Page,
  PaginationsResponse,
  Response,
  ServerResponse,
} from '../definitions';
import { Params, Query } from '../url-builder';
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

export async function createPage(formData: FormData) {
  return requestService.post(endpoint.page.create, formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });
}

export async function updatePage(
  params: Params,
  body: FormData,
): Promise<Response> {
  return requestService.post(
    getPathname({ path: endpoint.page.update, params }),
    body,
    {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    },
  );
}

export async function getPageDetails(
  params: Params,
): Promise<ServerResponse<Page>> {
  return requestService.get(
    getPathname({ path: endpoint.page.getDetails, params }),
  );
}

// export async function leaveGroup(params: Params): Promise<Response> {
//   return requestService.delete(
//     getPathname({ path: endpoints.group.leave, params }),
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
