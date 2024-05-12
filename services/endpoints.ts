export const endpoints = {
  user: {
    register: '/api/users/register',
    login: '/api/users/login',
    currentUser: '/api/users/current-user/:email',
    authGoogle: '/api/users/auth-google',
    authGitHub: '/api/users/auth-github',
    forgetPassword: '/api/users/forget-password',
    resetPassword: '/api/users/reset-password',
    updateAvatar: '/api/users/update-avatar/:_id',
  },
};
