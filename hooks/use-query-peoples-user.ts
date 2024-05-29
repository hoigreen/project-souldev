import {
  getMyFollowers,
  getMyFollowings,
  getMyFriendsList,
} from '@/lib/actions/profile';
import { ViewDetailsActionPeoples } from '@/lib/definitions';
import { useQuery } from '@tanstack/react-query';

export default function useQueryPeoplesUser(
  viewAction: ViewDetailsActionPeoples,
) {
  switch (viewAction) {
    case ViewDetailsActionPeoples.viewFriends:
      return useQuery({
        queryKey: ['query-get-my-friends', viewAction],
        queryFn: async () => await getMyFriendsList(),
      });
    case ViewDetailsActionPeoples.viewFollowers:
      return useQuery({
        queryKey: ['query-get-my-followers', viewAction],
        queryFn: async () => await getMyFollowers(),
      });
    case ViewDetailsActionPeoples.viewFollowings:
      return useQuery({
        queryKey: ['query-get-my-followings', viewAction],
        queryFn: async () => await getMyFollowings(),
      });
  }
}
