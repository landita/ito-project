import { create } from 'zustand';
import { devtools, persist, createJSONStorage } from 'zustand/middleware';
import { UserSession, UserSessionStore } from '../interfaces';

const userStore = create<UserSessionStore>()(
  devtools(
    persist(
      (set) => ({
        user: {
          username: '',
          email: '',
          rol: '',
          employeeId: '',
          isActive: false,
        },
        setSession: (session: UserSession) =>
          set(() => ({ user: { ...session, isActive: true } })),
        logoutSession: () => set(() => ({ user: { isActive: false } })),
      }),
      {
        name: 'user-storage',
        storage: createJSONStorage(() => sessionStorage),
      },
    ),
  ),
);

export default userStore;
