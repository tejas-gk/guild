import create from 'zustand';
import { persist } from 'zustand/middleware';
export interface AuthStore {
    token: string;
    setToken: (token: string) => void;
}

export const useAuthStore = create(
    persist(
        (set)=> ({
            token: '',
            setToken: (token: string) => set({ token }),
            removeToken: () => set({ token: '' }),
        }),
        {
            name: 'auth',
            getStorage: () => localStorage,
            
        }
    )
);





