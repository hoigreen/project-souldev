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
  let currentUser;
  if (cookie.get('currentUser')) {
    currentUser = cookie.get('currentUser');
  }

  return {
    ...config,
    headers: {
      Authorization: currentUser ? `Bearer ${currentUser}` : null,
    },
  };
});

const response = (response: AxiosResponse) => response.data;

const requestService = {
  get: (url: string, body: any) => instance.get(url, body).then(response),

  post: (url: string, body: any) => instance.post(url, body).then(response),

  put: (url: string, body: any) => instance.put(url, body).then(response),

  patch: (url: string, body: any) => instance.patch(url, body).then(response),

  delete: (url: string, body: any) => instance.delete(url, body).then(response),
};

export default requestService;
