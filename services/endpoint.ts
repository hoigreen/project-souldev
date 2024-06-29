export const endpoint = {
  user: {
    register: '/api/users/register',
    login: '/api/users/login',
    currentUser: '/api/users/current-user/:email',
    authGoogle: '/api/users/auth-google',
    authGitHub: '/api/users/auth-github',
    forgetPassword: '/api/users/forget-password',
    resetPassword: '/api/users/reset-password',
    updateAvatar: '/api/users/update-avatar/:_id',
    completeOnboarding: '/api/users/complete-onboarding/:_id',
    updateUserBasic: '/api/users/update-profile',
    changePassword: '/api/users/update-password',
  },
  posts: {
    getAll: '/api/post/get-posts',
    getMyPosts: '/api/post/currentUser',
    getPostsByUserId: '/api/post/user/:userId',
    countMyPosts: '/api/post/count-my-posts',
    getPostById: '/api/post/:postId',
    add: '/api/post/add-post',
    like: '/api/post/like/:postId',
    unlike: '/api/post/unlike/:postId',
    sharePost: '/api/post/share/:postId',
    getMySharedPosts: '/api/post/my-posts-shared',
  },

  comment: {
    getCommentsByPostId: '/api/comment/get-comments/:postId',
    add: '/api/comment/add-comment/:postId',
    like: '/api/comment/like/:commentId',
    unlike: '/api/comment/unlike/:commentId',
  },

  profile: {
    createProfile: '/api/profile/create-profile',
    updateProfile: '/api/profile/update-profile',
    getProfile: '/api/profile/get-profile-auth',
    getProfileById: '/api/profile/get-profile-by-userId/:userId',
    getMySavedPosts: '/api/profile/my-posts-saved',
    getRecommendedPeoples: '/api/profile/get-recommend-friends',
    getMyFriendsList: '/api/profile/get-all-friends',
    getMyFollowers: '/api/profile/get-followers',
    getMyFollowings: '/api/profile/get-followings',
    getMyFriendRequest: '/api/profile/get-friends-requests',
    addFriend: '/api/profile/add-friend',
    follow: '/api/profile/follow',
    unfollow: '/api/profile/unfollow',
    acceptFriendRequest: '/api/profile/accept-friend-request',
    removeFriendRequest: '/api/profile/remove-friend-request',
    removeFriend: '/api/profile/remove-friend',
    search: '/api/profile/search',
  },

  group: {
    getList: '/api/group-media',
    getMyGroups: '/api/group-media/my-groups',
    getGroupsJoined: '/api/group-media/joined',
    getGroupsRequestedToJoin: '/api/group-media/requested',
    getPostsInGroup: '/api/group-media/get-posts/:groupId',
    getDetails: '/api/group-media/:groupId',
    create: '/api/group-media/create-group',
    update: '/api/group-media/update-group/:groupId',
    joinByLink: '/api/group-media/join-group-by-link/:userId/:groupId',
    join: '/api/group-media/join-group/:groupId',
    deteleGroup: '/api/group-media/delete-group/:groupId',
    leaveGroup: '/api/group-media/leave-group/:groupId',
    acceptRequestJoin: '/api/group-media/accept-request-join-group/:groupId',
    cancelRequestJoin: '/api/group-media/remove-request-join-group/:groupId',
    getListMember: '/api/group-media/get-list-member/:groupId',
    addMember: '/api/group-media/add-member/:groupId',
    removeMember: '/api/group-media/remove-member/:groupId',
    addManager: '/api/group-media/add-manager/:groupId',
    removeManager: '/api/group-media/remove-manager/:groupId',
  },

  page: {
    getList: '/api/page/get-pages',
    getLiked: '/api/page/get-liked-pages',
    getMyPages: '/api/page/my-pages',
    getPagesFollowing: '/api/page/get-followed-pages',
    getDetails: '/api/page/get-page-byId/:pageId',
    getPostsOfPage: '/api/page/get-posts/:pageId',
    getPostById: '/api/page/post/:postId',
    getRandomPostsInPage: '/api/page/random-posts',
    countPostsPage: '/api/page/count-my-posts',
    create: '/api/page/create',
    update: '/api/page/update/:pageId',
    delete: '/api/page/delete',
    addManager: '/api/page/add-manager',
    removeManager: '/api/page/remove-manager',
    addPost: '/api/page/add-post',
    updatePost: '/api/page/update-post/:postId',
    likePage: '/api/page/like-page/:pageId',
    unlikePage: '/api/page/unlike-page/:pageId',
    followPage: '/api/page/follow-page/:pageId',
    unFollowPage: '/api/page/unfollow-page/:pageId',
  },

  conversation: {
    list: '/api/conversation/get-list-conversation',
    detail: '/api/conversation/get-conversation/:conversationId',
    messages: '/api/conversation/get-list-mess/:conversationId',
    sendMessage: '/api/conversation/chat',
  },
};
