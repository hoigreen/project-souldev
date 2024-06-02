'use client';

import { Comment, Locale } from '@/lib/definitions';
import React from 'react';
import { useLocale, useTranslations } from 'next-intl';
import { calculateTime, cn, getFullName } from '@/lib/utils';
import AvatarUser from '@/components/ui/app/avatar-user';

type ListCommentsProps = React.HTMLAttributes<HTMLDivElement> & {
  comments?: Comment[];
};

export default function ListComments({
  className,
  comments,
}: ListCommentsProps) {
  const t = useTranslations('Home');
  const locale = useLocale();

  return (
    <div
      className={cn(
        'mt-10 space-y-4 overflow-auto rounded-lg border p-3',
        className,
      )}
    >
      {comments &&
        (comments.length === 0 ? (
          <p className="text-center text-sm">{t('M13')}</p>
        ) : (
          comments.map((comment, index) => (
            <div className="space-y-2" key={index}>
              <div key={index} className="flex items-center gap-3">
                <AvatarUser
                  className="size-10"
                  src={comment.user_id.image}
                  alt={String(comment.user_id.last_name)}
                  fallback={getFullName(
                    comment.user_id.first_name,
                    comment.user_id.last_name,
                  )}
                />

                <div className="flex grow items-center justify-between">
                  <p className="text-base font-medium">
                    {getFullName(
                      comment.user_id.first_name,
                      comment.user_id.last_name,
                    )}
                  </p>

                  <span className="text-sm italic">
                    {calculateTime(comment.date, locale as Locale)}
                  </span>
                </div>
              </div>

              <p className="text-sm">{comment.text}</p>
            </div>
          ))
        ))}
    </div>
  );
}
