// src/components/auth/GuestOnlyRoute.tsx

"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuthStore } from "@/stores/authStore";
import { Spinner } from "@/components/ui/Spinner";
import { RouteEnum } from "@/enum/RouteEnum";

type GuestOnlyRouteProps = {
  children: React.ReactNode;
};

export const GuestOnlyRoute = ({ children }: GuestOnlyRouteProps) => {
  const router = useRouter();

  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);
  const isAuthLoaded = useAuthStore((state) => state.isAuthLoaded);

  useEffect(() => {
    if (isAuthLoaded && isAuthenticated) {
      router.replace(RouteEnum.DASHBOARD);
    }
  }, [isAuthLoaded, isAuthenticated, router]);

  if (!isAuthLoaded) {
    return <Spinner size="lg" />;
  }

  if (isAuthenticated) {
    return null;
  }

  return <>{children}</>;
};