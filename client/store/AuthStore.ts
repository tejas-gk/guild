import  zustand  from 'zustand';
import { persist } from 'zustand/middleware';

const useAuthStore = zustand(
    persist(
        (set) => ({
            token: '',
            setToken: (token: string) => set({ token }),
        }),
        {
            name: 'auth',
        }
    )
);

export default useAuthStore;

