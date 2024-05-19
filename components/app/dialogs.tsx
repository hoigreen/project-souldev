'use client';

import React from 'react';
import { CreatePostDialog } from './post/dialog/create-post-dialog';
import { ViewDetailPostDialog } from './post/dialog/view-detail-post-dialog';

export default function Dialogs(): React.JSX.Element {
  return (
    <>
      <CreatePostDialog />
      <ViewDetailPostDialog />
    </>
  );
}
