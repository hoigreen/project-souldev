'use server';

import {
  MyPostsResponse,
  PostDetailResponse,
  PostsResponse,
  Response,
  SharePostBody,
  SharePostResponse,
  countMyPostsResponse,
} from '@/lib/definitions';
import { Params, Query } from '@/lib/url-builder';
import { endpoint } from '@/services/endpoint';
import requestService from '@/services/request-service';
import { getPathname } from '@/services/url';

export async function getPosts({
  params,
  query,
}: {
  params?: Params;
  query?: Query;
}): Promise<PostsResponse> {
  return await requestService.get(
    getPathname({ path: endpoint.posts.getAll, params, query }),
  );
}

export async function getMyPosts(): Promise<MyPostsResponse> {
  return await requestService.get(endpoint.posts.getMyPosts);
}

export async function getPostsByUserId(
  params: Params,
): Promise<MyPostsResponse> {
  return await requestService.get(
    getPathname({ path: endpoint.posts.getPostsByUserId, params }),
  );
}

export async function getMySharedPosts(): Promise<MyPostsResponse> {
  return await requestService.get(endpoint.posts.getMySharedPosts);
}

export async function countMyPosts(): Promise<countMyPostsResponse> {
  return await requestService.get(endpoint.posts.countMyPosts);
}

export async function getPostById(params: Params): Promise<PostDetailResponse> {
  return await requestService.get(
    getPathname({ path: endpoint.posts.getPostById, params }),
  );
}

export async function createPost(formData: FormData): Promise<void> {
  return await requestService.post(endpoint.posts.add, formData, {
    headers: {
      'Content-Type':
        'multipart/form-data; boundary=<calculated when request is sent>',
    },
  });
}

export async function likePost(params: Params): Promise<void> {
  return await requestService.post(
    getPathname({ path: endpoint.posts.like, params }),
  );
}

export async function unlikePost(params: Params): Promise<void> {
  return await requestService.post(
    getPathname({ path: endpoint.posts.unlike, params }),
  );
}

export async function sharePost(
  params: Params,
  body: SharePostBody,
): Promise<SharePostResponse> {
  return await requestService.post(
    getPathname({ path: endpoint.posts.sharePost, params }),
    body,
  );
}

export async function savePost(params: Params): Promise<Response> {
  return requestService.post(
    getPathname({ path: endpoint.posts.savePost, params }),
  );
}

export async function unsavePost(params: Params): Promise<Response> {
  return requestService.post(
    getPathname({ path: endpoint.posts.unsavePost, params }),
  );
}
