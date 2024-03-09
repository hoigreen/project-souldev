export const endpoints = {
  user: {
    register: '/api/users/register',
    login: '/api/users/login',
    currentUser: (token: string) => `/api/users/current-user?token=${token}`,
  },
};
