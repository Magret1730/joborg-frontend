import { create } from "zustand";

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

    set({
      user,
      token,
      isAuthenticated: true,
      isAuthLoaded: true,
    });
  },

  logout: () => {
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


// useAuthStore.getState().setAuth(user, token);
// OR
// const setAuth = useAuthStore((state) => state.setAuth);
// setAuth(user, token);

// Login
// const setAuth = useAuthStore((state) => state.setAuth);
// const handleLogin = async () => {
//   const response = await loginUser({
//     email,
//     password,
//   });

//   setAuth(response.user, response.token);
// };

// Navbar
// const user = useAuthStore((state) => state.user);
// const isAuthenticated = useAuthStore((state) => state.isAuthenticated);
// const logout = useAuthStore((state) => state.logout);
// return (
//   <nav>
//     {isAuthenticated ? (
//       <>
//         <p>{user?.email}</p>
//         <button onClick={logout}>Logout</button>
//       </>
//     ) : (
//       <Link href="/login">Login</Link>
//     )}
//   </nav>
// );