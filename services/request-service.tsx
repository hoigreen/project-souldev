import { redirect } from '@/navigation';
import axios, { AxiosError, AxiosRequestConfig, AxiosResponse } from 'axios';
import { cookies } from 'next/headers';

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
  const cookie = cookies();
  let accessToken = null;

  if (cookie.get(process.env.NEXT_PUBLIC_AUTH_COOKIE_NAME as string)) {
    accessToken = cookie.get(
      process.env.NEXT_PUBLIC_AUTH_COOKIE_NAME as string,
    )?.value;
  }

  if (accessToken) {
    return {
      ...config,
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    };
  } else {
    return config;
  }
});

instance.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    const status = error.response?.status || 500;
    if (status === 401) {
      redirect('/auth/sign-out');
    } else {
      return Promise.reject(error); // Delegate error to calling side
    }
  },
);

const response = (response: AxiosResponse) => response.data;

const error = (error: AxiosError) => {
  if (error.response) {
    return error.response.data;
  } else {
    return error;
  }
};

const requestService: RequestService = {
  get: (url, config) => instance.get(url, config).then(response).catch(error),

  post: (url, body, config) =>
    instance.post(url, body, config).then(response).catch(error),

  put: (url, body, config) =>
    instance.put(url, body, config).then(response).catch(error),

  patch: (url, body, config) =>
    instance.patch(url, body, config).then(response).catch(error),

  delete: (url, config) =>
    instance.delete(url, config).then(response).catch(error),
};

export default requestService;
