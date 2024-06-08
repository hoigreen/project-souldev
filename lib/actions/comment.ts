'use server';

import { AddCommentResponse } from '@/lib/definitions';
import { Params } from '@/lib/url-builder';
import { endpoint } from '@/services/endpoint';
import requestService from '@/services/request-service';
import { getPathname } from '@/services/url';

export async function addComment(
  params: Params,
  formData: FormData,
): Promise<AddCommentResponse> {
  return await requestService.post(
    getPathname({ path: endpoint.comment.add, params }),
    formData,
    {
      headers: { 'Content-Type': 'multipart/form-data' },
    },
  );
}
