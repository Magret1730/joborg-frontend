"use client";
// manages loading, error, and response state for user login
import { useState } from "react";
import { forgotPasswordUser } from "@/api/authApi";
import { ForgotPasswordPayload,} from "@/types/auth.type";
import { useAuthStore } from "@/stores/authStore";

export const useForgotPassword = () => {
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const setAuth = useAuthStore((state) => state.setAuth);

  const forgotPassword = async (payload: ForgotPasswordPayload) => {
    try {
      setIsLoading(true);
      setError("");

      const response = await forgotPasswordUser(payload);

      return response;
    } catch (err) {
      const message =
        err instanceof Error ? err.message : "Something went wrong";

      setError(message);

      throw err;
    } finally {
      setIsLoading(false);
    }
  };

  return {
    forgotPassword,
    error,
    isLoading,
    setIsLoading,
  };
};