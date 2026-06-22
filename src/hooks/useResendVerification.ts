"use client";

import { useState } from "react";
import { resendVerificationLink } from "@/api/authApi";

export const useResendVerification = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const resendVerification = async (email: string) => {
    try {
      setIsLoading(true);
      setError("");

      const data = await resendVerificationLink(email);
      return data;
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
    resendVerification,
    isLoading,
    error,
  };
};