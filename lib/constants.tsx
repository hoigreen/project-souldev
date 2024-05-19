import {
  AddSquare,
  Bezier,
  Flag,
  Home2,
  Messages2,
  Profile,
  Profile2User,
  SearchNormal1,
  Setting2,
  UserAdd,
} from 'iconsax-react';
import { RoutesLink } from './definitions';

export const routesLink: RoutesLink[] = [
  {
    icon: <Home2 variant="TwoTone" size={24} />,
    route: '/home',
    label: 'M1',
  },
  {
    icon: <SearchNormal1 variant="TwoTone" size={24} />,
    route: '/search',
    label: 'M2',
  },
  {
    icon: <Bezier variant="TwoTone" size={24} />,
    route: '/explore',
    label: 'M10',
  },
  {
    icon: <UserAdd variant="TwoTone" size={24} />,
    route: '/peoples',
    label: 'M3',
  },
  {
    icon: <Profile2User variant="TwoTone" size={24} />,
    route: '/groups',
    label: 'M4',
  },
  {
    icon: <Flag variant="TwoTone" size={24} />,
    route: '/pages',
    label: 'M5',
  },
];

export const routesLink2: RoutesLink[] = [
  {
    icon: <AddSquare variant="TwoTone" size={24} />,
    route: '/post/create',
    label: 'M11',
  },
];

export const routesLink3: RoutesLink[] = [
  {
    icon: <Messages2 variant="TwoTone" size={24} />,
    route: '/messages',
    label: 'M6',
  },
  {
    icon: <Profile variant="TwoTone" size={24} />,
    route: '/profile',
    label: 'M7',
  },
];

export const routesLink4: RoutesLink[] = [
  {
    icon: <Setting2 variant="TwoTone" size={24} />,
    route: '/account-setting',
    label: 'M8',
  },
];

export const FACEBOOK_URL_REGEX = /^(https?:\/\/)?(?:www\.)?facebook\.com/;
export const TWITTER_URL_REGEX = /^(https?:\/\/)?(?:www\.)?twitter\.com/;
export const GITHUB_URL_REGEX = /^(https?:\/\/)?(?:www\.)?github\.com/;

export enum Modals {
  CreatePost = 'CreatePost',
  ViewDetailPost = 'ViewDetailPost',
}
