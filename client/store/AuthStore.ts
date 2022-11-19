import create from 'zustand';
import {persist} from 'zustand/middleware';
export const useAuthStore = create(persist(
    (set) => ({
        users: {
            name: '',
        },
        setUsers: (users) => set({ users }),
    }),
    {
        name: 'auth',
        getStorage: () => localStorage,
    }
));





