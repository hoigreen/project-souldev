import cookie from '@/lib/cookie';
import axios, { AxiosRequestConfig, AxiosResponse } from 'axios';

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

const requestService = {
  get: (url: string, config?: AxiosRequestConfig<any | undefined>) =>
    instance.get(url, config).then(response),

  post: (
    url: string,
    body: any,
    config?: AxiosRequestConfig<any | undefined>,
  ) => instance.post(url, body, config).then(response),

  put: (url: string, body: any, config?: AxiosRequestConfig<any | undefined>) =>
    instance.put(url, body, config).then(response),

  patch: (
    url: string,
    body: any,
    config?: AxiosRequestConfig<any | undefined>,
  ) => instance.patch(url, body, config).then(response),

  delete: (url: string, config?: AxiosRequestConfig<any | undefined>) =>
    instance.delete(url, config).then(response),
};

export default requestService;
