"use client";

import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { useAuthStore } from "@/stores/authStore";
import { Spinner } from "@/components/ui/Spinner";
import { RouteEnum } from "@/enum/RouteEnum";

type ProtectedRouteProps = {
  children: React.ReactNode;
};

export const ProtectedRoute = ({ children }: ProtectedRouteProps) => {
  const router = useRouter();

  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);
  // Has my app finished checking localStorage for an existing login? because zustand is synchronous,
  // but localStorage is not, so we need to wait for it to finish before we can check if the user is authenticated or not.
  const isAuthLoaded = useAuthStore((state) => state.isAuthLoaded);

  useEffect(() => {
    if (isAuthLoaded && !isAuthenticated) {
      router.push(RouteEnum.LOGIN);
    }
  }, [isAuthLoaded, isAuthenticated, router]);

  if (!isAuthLoaded) {
    return <Spinner size="lg" />
  }

  if (!isAuthenticated) {
    return null;
  }

  return <>{children}</>;
};