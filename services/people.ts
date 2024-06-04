import {
  acceptFriendRequest,
  addFriend,
  cancelFriendRequest,
  unfollow,
} from '@/lib/actions/profile';

export const handleAddFriend = async ({
  toUserId,
  onError,
  onSuccess,
}: {
  toUserId: string;
  onError: () => void;
  onSuccess: () => void;
}) => {
  const response = await addFriend(toUserId);

  if (!response.success) {
    onError();

    return;
  }

  onSuccess();
};

export const handleCancelRequest = async ({
  requestUserId,
  onError,
  onSuccess,
}: {
  requestUserId: string;
  onError: () => void;
  onSuccess: () => void;
}) => {
  const response = await cancelFriendRequest(requestUserId);

  if (!response.success) {
    onError();

    return;
  }

  onSuccess();
};

export const handleAccept = async ({
  userId,
  onError,
  onSuccess,
}: {
  userId: string;
  onError: () => void;
  onSuccess: () => void;
}) => {
  const response = await acceptFriendRequest(userId);

  if (!response.success) {
    onError();

    return;
  }

  onSuccess();
};

export const handleUnfollow = async ({
  userId,
  onError,
  onSuccess,
}: {
  userId: string;
  onError: () => void;
  onSuccess: () => void;
}) => {
  const response = await unfollow(userId);

  if (!response.success) {
    onError();

    return;
  }

  onSuccess();
};
