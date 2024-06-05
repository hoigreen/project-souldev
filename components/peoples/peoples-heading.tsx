import { ViewDetailsActionPeoples } from '@/lib/definitions';
import React from 'react';
import { useTranslations } from 'next-intl';
import { Heading } from '../app/heading';

export function PeoplesHeading({
  viewAction,
}: {
  viewAction?: ViewDetailsActionPeoples;
}): React.JSX.Element {
  const t = useTranslations('Home');

  const handleTitleByViewAction = () => {
    switch (viewAction) {
      case ViewDetailsActionPeoples.viewFriends:
        return t('M96');
      case ViewDetailsActionPeoples.viewFollowers:
        return t('M23');
      case ViewDetailsActionPeoples.viewFollowings:
        return t('M24');
      default:
        return '';
    }
  };

  return <Heading size={1} title={handleTitleByViewAction()} />;
}
