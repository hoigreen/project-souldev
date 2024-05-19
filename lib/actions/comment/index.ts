'use server';

import { AddCommentResponse } from '@/lib/definitions';
import { Params, Query } from '@/lib/url-builder';
import { endpoints } from '@/services/endpoints';
import requestService from '@/services/request-service';
import { getEndpoint } from '@/services/url';

export async function addComment(
  params: Params,
  formData: FormData,
): Promise<AddCommentResponse> {
  return await requestService.post(
    getEndpoint({ path: endpoints.comment.add, params }),
    formData,
    {
      headers: { 'Content-Type': 'multipart/form-data' },
    },
  );
}
