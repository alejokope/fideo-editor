import { create } from 'zustand';

interface AuthUser {
  id: string;
  username: string;
  email: string;
  role: string;
}

interface AuthState {
  user: AuthUser | null;
  features: string[];
  logout: () => void;
}

export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  features: [],
  logout: () => set({ user: null, features: [] }),
}));