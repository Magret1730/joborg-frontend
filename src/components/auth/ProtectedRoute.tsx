"use client";

import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { useAuthStore } from "@/stores/authStore";

type ProtectedRouteProps = {
  children: React.ReactNode;
};

export const ProtectedRoute = ({ children }: ProtectedRouteProps) => {
  const router = useRouter();

  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);
  const isAuthLoaded = useAuthStore((state) => state.isAuthLoaded);

  useEffect(() => {
    if (isAuthLoaded && !isAuthenticated) {
      router.push("/login");
    }
  }, [isAuthLoaded, isAuthenticated, router]);

  if (!isAuthLoaded) {
    return <p>Loading...</p>; // Change to a spinner or skeleton if you have one
  }

  if (!isAuthenticated) {
    return null;
  }

  return <>{children}</>;
};