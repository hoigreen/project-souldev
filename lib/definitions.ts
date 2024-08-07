import React from 'react';
import { IMessage } from '@novu/notification-center';
import { GroupRole } from './constants';
import { AuthType } from './enums';
import { User as AuthUser } from 'next-auth';

export type Response = {
  success: boolean;
};

export type ServerResponse<T> = {
  success: boolean;
  msg?: string;
  data: T;
};

export interface Notification {
  id: string;
  seen: boolean;
  createdAt: IMessage['createdAt'];
  payload: IMessage['payload'];
}

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

export interface UserBasic {
  _id: string;
  first_name: string;
  last_name: string;
  image: string;
}

export type User = AuthUser &
  UserBasic & {
    email: string;
    authType: AuthType;
    mobile: string;
    token: string;
    refreshToken: string;
    isOnboardingCompleted: boolean;
    bio: string;
    twiter: string;
    facebook: string;
    github: string;
  };

export type UserResponse = {
  success: boolean;
  data: User;
};

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
  image?: string;
  bio: string;
  facebook?: string;
  github?: string;
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

export type Manager = {
  user_id: string;
  role: GroupRole;
};

export type Group = {
  _id: string;
  name: string;
  image_group: string[];
  code: string;
  description: string;
  managers: Manager[];
  members: {
    user_id: UserBasic;
    date: string;
  }[];
  member_requests: {
    user_id: UserBasic;
    date: string;
  }[];
  creator_id: string;
  created: {
    time: string;
  };
  modified: {
    user_id: UserBasic;
    time: Date;
  };
};

export interface Follower {
  user_id: UserBasic;
}

export type Page = {
  _id: string;
  name: string;
  image_page: string[];
  email: string;
  phone?: string;
  address?: string;
  website?: string;
  creator_id: string;
  followers: Follower[];
  likes: Like[];
  description?: string;
  managers: Manager[];
};

export type Post = {
  _id: string;
  tittle: string;
  name: string;
  user_id: UserProfile;
  content: string;
  images: [];
  id_category: string;
  likes: Like[];
  group_id?: Group;
  page_id?: Page;
  shares: Share[];
  created?: string;
  commentsCount?: number;
  isSaved?: boolean;
  isLiked?: boolean;
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
  linkedIn?: string;
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
  Remove = 'remove',
  Accept = 'accept',
  Cancel = 'cancel',
  Follow = 'follow',
  UnFollow = 'unfollow',
  CancelRequest = 'cancelRequest',

  AddManager = 'addManager',
}

export type MyFriendRequestsResponse = {
  success: boolean;
  listFriendRequest: {
    _id: string;
    user_id: UserBasic;
  }[];
};

export type AddFriendResponse = {
  success: boolean;
  toUser: Profile;
  fromUser: Profile;
};

export type MyFollowingsResponse = {
  success: boolean;
  listFollowingUser: {
    _id: string;
    user_id: UserBasic;
  }[];
};

export type CancelFriendRequestResponse = {
  success: boolean;
  msg: string;
};

export enum ViewDetailsActionPeoples {
  viewDetail = 'viewDetail',
  viewFriends = 'viewFriends',
  viewFollowers = 'viewFollowers',
  viewFollowings = 'viewFollowings',
}

export interface ViewDetailPeoplesData {
  viewAction: ViewDetailsActionPeoples;
}

export type MyFollowersResponse = {
  success: boolean;
  listFollowerUser: {
    _id: string;
    user_id: UserBasic;
  }[];
};

export type ManagerDetail = {
  user_id: UserBasic;
  role: GroupRole;
};
export type GroupsResponse = {
  success: boolean;
  items: Group[];
  page: number;
  pageSize: number;
  totalPage: number;
};

export type GroupsResponseNoPagination = {
  success: boolean;
  data: Group[];
};

export type GroupDetailResponse = {
  success: boolean;
  data: Group;
};

export type MembersOfGroupsResponse = {
  success: boolean;
  users: UserBasic[];
  managers: UserBasic[];
};

export type CreatePostData = {
  groupId?: string;
  pageId?: string;
};
export type GroupDataModal = {
  groupId: string;
};

export type PaginationsResponse<T> = {
  success: boolean;
  items: T;
  page: number;
  pageSize: number;
  totalPage: number;
};

export type Message = {
  _id: string;
  from: UserBasic;
  to: UserBasic;
  date: string;
  text: string;
};

export type MessageInfo = {
  conversationId: string;
  message: Message;
};

export type Conversation = {
  _id: string;
  createdAt: string;
  user_id_1: UserBasic;
  user_id_2: UserBasic;
  messages: Message[];
  created: string;
  modified: string;
};
