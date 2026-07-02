import { create } from "zustand";
import posthog from "posthog-js";

type User = {
  id: string;
  first_name: string;
  last_name: string;
  email: string;
  is_admin?: boolean;
};

type AuthStore = {
  user: User | null;
  token: string | null;
  isAuthenticated: boolean;
  isAuthLoaded: boolean;

  setAuth: (user: User, token: string) => void;
  loadAuthFromStorage: () => void;
  logout: () => void;
};

export const useAuthStore = create<AuthStore>((set) => ({
  user: null,
  token: null,
  isAuthenticated: false,
  isAuthLoaded: false,

  setAuth: (user, token) => {
    // Store the token and user in localStorage
    localStorage.setItem("jotoken", token);
    localStorage.setItem("jouser", JSON.stringify(user));

    posthog.identify(user.email, {
      email: user.email,
      first_name: user.first_name,
      last_name: user.last_name,
    });

    // Update the Zustand's store state
    set({
      user,
      token,
      isAuthenticated: true,
      isAuthLoaded: true,
    });
  },

  // On app initialization, load auth state from localStorage
  // This function checks the browser storage when the app loads.
  loadAuthFromStorage: () => {
    const token = localStorage.getItem("jotoken");
    const storedUser = localStorage.getItem("jouser");

    if (!token || !storedUser) {
      set({
        user: null,
        token: null,
        isAuthenticated: false,
        isAuthLoaded: true,
      });

      return;
    }

    const user = JSON.parse(storedUser) as User;

    posthog.identify(user.email, {
      email: user.email,
      first_name: user.first_name,
      last_name: user.last_name,
    });

    set({
      user,
      token,
      isAuthenticated: true,
      isAuthLoaded: true,
    });
  },

  logout: () => {
    posthog.capture("user_logged_out");
    posthog.reset();

    localStorage.removeItem("jotoken");
    localStorage.removeItem("jouser");

    set({
      user: null,
      token: null,
      isAuthenticated: false,
      isAuthLoaded: true,
    });
  },
}));
