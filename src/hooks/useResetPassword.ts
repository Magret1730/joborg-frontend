"use client";
// manages loading, error, and response state for user login
import { useState } from "react";
import { resetPasswordUser } from "@/api/authApi";
import { ResetPasswordPayload} from "@/types/auth.type";
import { useAuthStore } from "@/stores/authStore";

export const useResetPassword = () => {
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const resetPassword = async (payload: ResetPasswordPayload) => {
    try {
      setIsLoading(true);
      setError("");

      const response = await resetPasswordUser(payload);

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
    resetPassword,
    error,
    isLoading,
    setIsLoading,
  };
};