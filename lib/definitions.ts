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
  Local = 'local', // eslint-disable-line no-unused-vars
  Google = 'google', // eslint-disable-line no-unused-vars
  Github = 'github', // eslint-disable-line no-unused-vars
}

export enum IsVerifiedStatus {
  Verified = 1, // eslint-disable-line no-unused-vars
  NotVerified = 0, // eslint-disable-line no-unused-vars
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

export interface Like {
  user_id: UserProfile;
}

export interface Share {
  user_id: string;
  description: string;
  _id: string;
  createdAt?: string;
}

export type Post = {
  _id: string;
  tittle: string;
  name: string;
  user_id: UserProfile;
  content: string;
  images: [];
  id_category: string;
  likes: Like[];
  shares: Share[];
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

export interface PostBody {
  content: string;
}

export enum ActionPost {
  Create = 'create', // eslint-disable-line no-unused-vars
  Update = 'update', // eslint-disable-line no-unused-vars
}

export interface ViewDetailPostData {
  postId: string;
}

export interface UserBasic {
  _id: string;
  first_name: string;
  last_name: string;
  image: string;
}

export interface Comment {
  _id: string;
  user_id: UserBasic;
  post_id: string;
  text?: string;
  images: [];
  date: string;
}
export interface PostDetailResponse {
  success: boolean;
  post_data: Post;
  comment_data: Comment[];
}

export interface AddCommentResponse {
  success: boolean;
  data: Comment;
}

export interface SharePostData {
  postId: string;
}

export interface SharePostBody {
  description?: string;
}

export interface SharePostResponse {
  success: boolean;
  data: any;
}

export interface Follower {
  user_id: UserBasic;
}

export interface Friend {
  user_id: UserBasic;
  date: string;
}

export interface Experience {
  title: string;
  company: string;
  from: string;
  to?: string;
  current: boolean;
  description?: string;
}

export interface Education {
  school: string;
  degree: string;
  from: string;
  to?: string;
  current: boolean;
  description?: string;
}

export interface Address {
  city: string;
  district: string;
  ward: string;
  location: string;
}

export interface Profile {
  _id: string;
  user_id: UserProfile;
  address: Address[];
  company: string;
  website: string;
  linkedIn: string;
  status: string;
  skills: string[];
  experience: Experience[];
  education: Education[];
  followings: Follower[];
  followers: Follower[];
  friends: Friend[];
  friend_requests: Friend[];
}

export interface ProfileResponse {
  success: boolean;
  data: Profile;
}

export interface countMyPostsResponse {
  success: boolean;
  data: number;
}

export interface MyPostsResponse {
  success: boolean;
  data: Post[];
}

export type UpdateBasicInfoBody = {
  first_name: string;
  last_name: string;
  mobile: string;
  twitter?: string;
  facebook?: string;
  github?: string;
  bio?: string;
};

export type UpdateBasicInfoResponse = {
  success: boolean;
  data: UserBasic;
};

export type ProfileAdvanceInfoBody = {
  skills?: string[];
  linkedIn?: string;
  website?: string;
  address?: Address[];
  education?: Education[];
  experience?: Experience[];
};

export type ProfileAdvanceInfoResponse = {
  success: boolean;
  data: Profile;
};

export type UsersResponse = {
  _id: string;
  user_id: UserProfile;
};

export type ListPeoplesWithPaginationResponse = {
  success?: boolean;
  totalPage: number;
  page: number;
  pageSize: number;
  items: UsersResponse[];
};

export type MyFriendsResponse = {
  success: boolean;
  listFriend: Friend[];
};

export interface RemoveFriendData {
  user?: UserBasic;
}

export enum FriendActions {
  Remove = 'remove', // eslint-disable-line no-unused-vars
  Accept = 'accept', // eslint-disable-line no-unused-vars
  Cancel = 'cancel', // eslint-disable-line no-unused-vars
  UnFollow = 'unfollow', // eslint-disable-line no-unused-vars
}
