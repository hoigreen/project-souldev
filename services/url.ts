import { buildParams, buildQuery, Params, Query } from '@/lib/url-builder';

export const getPathname = ({
  path,
  params,
  query,
}: {
  path: string;
  params?: Params;
  query?: Query;
}) => {
  return buildQuery(buildParams(path, params), query);
};
