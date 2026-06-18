import { create } from "zustand";

type User = {
  id: string;
  name?: string;
  email: string;
  is_admin?: boolean;
};

type AuthStore = {
  user: User | null;
  token: string | null;
  isAuthenticated: boolean;

  setAuth: (user: User, token: string) => void;
  logout: () => void;
};

export const useAuthStore = create<AuthStore>((set) => ({
  user: null,
  token: null,
  isAuthenticated: false,

  setAuth: (user, token) => {
    localStorage.setItem("joborg-token", token);

    set({
      user,
      token,
      isAuthenticated: true,
    });
  },

  logout: () => {
    localStorage.removeItem("joborg-token");

    set({
      user: null,
      token: null,
      isAuthenticated: false,
    });
  },
}));