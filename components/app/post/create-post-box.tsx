'use client';

import PostForm from './form';
import { ActionPost } from '@/lib/definitions';
import React from 'react';

type CreatePostBoxProps = React.HTMLAttributes<HTMLDivElement> & {};

export default function CreatePostBox({}: CreatePostBoxProps): React.JSX.Element {
  return (
    <div>
      <PostForm action={ActionPost.Create} />
    </div>
  );
}
