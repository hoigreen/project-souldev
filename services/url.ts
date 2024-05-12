import { buildParams, buildQuery, Params, Query } from '@/lib/url-builder';

export const getEndpoint = ({
  path,
  params,
  query,
}: {
  path: string;
  params?: Params;
  query?: Query;
}) => {
  return buildQuery(
    buildParams(`${process.env.NEXT_PUBLIC_ENDPOINT}${path}`, params),
    query,
  );
};

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
