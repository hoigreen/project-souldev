import cookie from '@/lib/cookie';
import axios, { AxiosResponse } from 'axios';

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
  get: (url: string, body?: any) => instance.get(url, body).then(response),

  post: (url: string, body: any) => instance.post(url, body).then(response),

  put: (url: string, body: any) => instance.put(url, body).then(response),

  patch: (url: string, body: any) => instance.patch(url, body).then(response),

  delete: (url: string, body: any) => instance.delete(url, body).then(response),
};

export default requestService;
