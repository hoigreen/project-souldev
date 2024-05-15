import cookie from '@/lib/cookie';
import axios, { AxiosRequestConfig, AxiosResponse } from 'axios';

export interface RequestService {
  get: (
    url: string,
    config?: AxiosRequestConfig<any | undefined>,
  ) => Promise<any>;
  post: (
    url: string,
    body?: Record<string, any> | FormData,
    config?: AxiosRequestConfig<any | undefined>,
  ) => Promise<any>;
  put: (
    url: string,
    body: Record<string, any> | FormData,
    config?: AxiosRequestConfig<any | undefined>,
  ) => Promise<any>;
  patch: (
    url: string,
    body: Record<string, any> | FormData,
    config?: AxiosRequestConfig<any | undefined>,
  ) => Promise<any>;
  delete: (
    url: string,
    config?: AxiosRequestConfig<any | undefined>,
  ) => Promise<any>;
}

const instance = axios.create({
  baseURL: `${process.env.NEXT_PUBLIC_ENDPOINT}`,
  timeout: 50000,
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json;charset=utf-8',
  },
});

instance.interceptors.request.use((config: any) => {
  let accessToken = null;
  if (cookie.get(process.env.NEXT_PUBLIC_AUTH_COOKIE_NAME as string)) {
    accessToken = cookie.get(
      process.env.NEXT_PUBLIC_AUTH_COOKIE_NAME as string,
    );
  }

  if (accessToken) {
    return {
      ...config,
      headers: {
        Authorization: accessToken,
      },
    };
  } else {
    return config;
  }
});

const response = (response: AxiosResponse) => response.data;

const requestService: RequestService = {
  get: (url, config) => instance.get(url, config).then(response),

  post: (url, body, config) => instance.post(url, body, config).then(response),

  put: (url, body, config) => instance.put(url, body, config).then(response),

  patch: (url, body, config) =>
    instance.patch(url, body, config).then(response),

  delete: (url, config) => instance.delete(url, config).then(response),
};

export default requestService;
