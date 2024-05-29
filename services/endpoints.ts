export const endpoints = {
  user: {
    // POST user register
    register: '/api/users/register',

    // POST user login
    login: '/api/users/login',

    // GET current user
    currentUser: '/api/users/current-user/:email',

    // POST user auth google
    authGoogle: '/api/users/auth-google',

    // POST user auth github
    authGitHub: '/api/users/auth-github',

    // POST user forget password
    forgetPassword: '/api/users/forget-password',

    // PUT reset password
    resetPassword: '/api/users/reset-password',

    // POST update avatar
    updateAvatar: '/api/users/update-avatar/:_id',

    // POST complete onboarding
    completeOnboarding: '/api/users/complete-onboarding/:_id',

    // PUT update user
    updateUserBasic: '/api/users/update-profile',
  },
  posts: {
    // GET /api/posts
    getAll: '/api/post/get-posts',

    getMyPosts: '/api/post/user',

    countMyPosts: '/api/post/count-my-posts',

    // GET /api/post/:postId
    getPostById: '/api/post/:postId',

    // POST create post
    add: '/api/post/add-post',

    // POST like post
    like: '/api/post/like/:postId',

    // POST unlike post
    unlike: '/api/post/unlike/:postId',

    sharePost: '/api/post/share/:postId',

    getMySharedPosts: '/api/post/my-posts-shared',
  },

  comment: {
    getCommentsByPostId: '/api/comment/get-comments/:postId',

    add: '/api/comment/add-comment/:postId',

    // POST like comment
    like: '/api/comment/like/:commentId',

    // POST unlike comment
    unlike: '/api/comment/unlike/:commentId',
  },

  profile: {
    createProfile: '/api/profile/create-profile',

    updateProfile: '/api/profile/update-profile',

    getProfile: '/api/profile/get-profile-auth',

    getMySavedPosts: '/api/profile/my-posts-saved',

    getRecommendedPeoples: '/api/profile/get-recommend-friends',

    getMyFriendsList: '/api/profile/get-all-friends',

    getMyFollowers: '/api/profile/get-followers',

    getMyFollowings: '/api/profile/get-followings',

    getMyFriendRequest: '/api/profile/get-friends-requests',

    addFriend: '/api/profile/add-friend',

    unfollow: '/api/profile/unfollow',

    acceptFriendRequest: '/api/profile/accept-friend-request',

    removeFriendRequest: '/api/profile/remove-friend-request',

    removeFriend: '/api/profile/remove-friend',
  },
};
