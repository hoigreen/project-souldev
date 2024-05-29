'use client';

import React from 'react';
import { CreatePostDialog } from './post/dialog/create-post-dialog';
import { ViewDetailPostDialog } from './post/dialog/view-detail-post-dialog';
import { SharePostDialog } from './post/dialog/share-post-dialog';
import { RemoveFriendDialog } from './peoples/dialog/remove-friend-dialog';
import { ViewDetailsPeoples } from './peoples/dialog/view-details-peoples';

export default function Dialogs(): React.JSX.Element {
  return (
    <>
      <CreatePostDialog />
      <ViewDetailPostDialog />
      <SharePostDialog />
      <RemoveFriendDialog />
      <ViewDetailsPeoples />
    </>
  );
}
