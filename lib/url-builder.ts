export type Params = Partial<{ [key: string]: string | number }>;
export type Query =
  | string
  | Partial<{ [key: string]: string | string[] | number | number[] | boolean }>;

export const buildParams = (url: string, params?: Params) => {
  if (!params) {
    return url;
  }

  return Object.entries(params).reduce(
    (acc, [key, value]) => acc.replace(`:${key}`, String(value)),
    url,
  );
};

export const buildQuery = (url: string, query?: Query) => {
  if (!query) {
    return url;
  }

  if (typeof query === 'string') {
    return `${url}?${query}`;
  }

  const queryString = Object.entries(query)
    .filter(Boolean)
    .map(([key, value]) => {
      if (Array.isArray(value)) {
        return value.map((v) => `${key}=${v}`).join('&');
      }

      return `${key}=${value}`;
    })
    .join('&');

  if (queryString) {
    return `${url}?${queryString}`;
  }

  return url;
};
