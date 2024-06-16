import { create } from 'zustand';

interface UsersOnlineStore {
  users: string[];
  actions: {
    set: (ids: string[]) => void;
  };
}

const usersOnlineStore = create<UsersOnlineStore>((set) => ({
  users: [],
  actions: {
    set: (ids) => set(() => ({ users: ids })),
  },
}));

export const useOnlineUsers = () => usersOnlineStore((state) => state.users);
export const useOnlineActions = () =>
  usersOnlineStore((state) => state.actions);
