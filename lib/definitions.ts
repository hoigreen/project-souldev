import React from 'react';

export type SignupBody = {
  email: string;
  password: string;
  first_name: string;
  last_name: string;
  phone?: string;
  terms: boolean;
  image?: string;
};

export type SearchParams = Record<string, string[] | string | undefined>;

export interface Route {
  name: string;
  path: string;
  routes?: Route[];
}

export interface FeatureItem {
  description: string;
  title: string;
  icon: any;
}

export type Locale = 'en' | 'vi';

export type RoutesLink = {
  route: string;
  icon: React.ReactNode;
  label: string;
};

export type UserParams = {
  userId: string;
};

export type OnboardingRequestBody = {
  first_name: string;
  last_name: string;
  mobile: string;
  twitter?: string;
  facebook?: string;
  github?: string;
  bio?: string;
  isOnboardingCompleted: boolean;
};

export enum AuthType {
  Local = 'local',
  Google = 'google',
  Github = 'github',
}

export enum IsVerifiedStatus {
  Verified = 1,
  NotVerified = 0,
}

export interface UserProfile {
  _id: string;
  email: string;
  first_name: string;
  last_name: string;
  authType: AuthType;
  mobile: string;
  is_verified: IsVerifiedStatus;
  createdAt: string;
  updatedAt: string;
  __v: number;
  image: string;
  bio: string;
  facebook: string;
  github: string;
}

export type Post = {
  _id: string;
  tittle: string;
  name: string;
  user_id: UserProfile;
  content: string;
  images: [];
  id_category: string;
  likes: [];
  shares: [];
  created?: string;
  __v?: number;
  createdAt?: string;
  updatedAt?: string;
};

export interface PostsResponse {
  totalPage: number;
  page: number;
  pageSize: number;
  items: Post[];
}

export interface Like {
  user_id: UserProfile;
}

export interface PostBody {
  content: string;
}

export enum ActionPost {
  Create = 'create',
  Update = 'update',
}
