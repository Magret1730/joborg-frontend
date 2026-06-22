"use client";
// manages loading, error, and response state for user login
import { useState } from "react";
import { loginUser } from "@/api/authApi";
import { LoginPayload, LoginResponse } from "@/types/auth.type";
import { useAuthStore } from "@/stores/authStore";

export const useLogin = () => {
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [showResendVerification, setShowResendVerification] = useState(false);

  const setAuth = useAuthStore((state) => state.setAuth);

  const login = async (payload: LoginPayload) => {
    try {
      setIsLoading(true);
      setError("");
      setShowResendVerification(false);

      const response = await loginUser(payload);

      if (response.data?.user) {
        setAuth(response.data.user, response.data.token);
      } else {
        throw new Error("User data or token is missing");
      }

      return response;
    } catch (err) {
      const message =
        err instanceof Error ? err.message : "Something went wrong";

      setError(message);

      if (message.toLowerCase().includes("Please verify your email before logging in")) {
        setShowResendVerification(true);
      }

      throw err;
    } finally {
      setIsLoading(false);
    }
  };

  return {
    login,
    error,
    isLoading,
    setIsLoading,
    showResendVerification,
  };
};