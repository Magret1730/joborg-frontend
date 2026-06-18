"use client";

import { useEffect } from "react";
import { useAuthStore } from "@/stores/authStore";

type AuthProviderProps = {
  children: React.ReactNode;
};

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const loadAuthFromStorage = useAuthStore(
    (state) => state.loadAuthFromStorage
  );

  useEffect(() => {
    loadAuthFromStorage();
  }, [loadAuthFromStorage]);

  return <>{children}</>;
};