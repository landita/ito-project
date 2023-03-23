import { create } from 'zustand';
import { devtools } from 'zustand/middleware';
import { ApplicationStore, Applications } from '../interfaces';

const applicationStore = create<ApplicationStore>()(
  devtools(
    (set) => ({
      applications: [],
      setApplications: (data: Applications[]) =>
        set(() => ({ applications: data })),
    }),
    {
      name: 'application-storage',
    },
  ),
);

export default applicationStore;
