"use client";

import { useCallback, useState } from "react";
import { verifyEmail } from "@/api/authApi";

// Change this to a const enum if you prefer, but using a union type for simplicity here
type VerifyStatus = "idle" | "loading" | "success" | "error";

export const useVerifyEmail = () => {
  const [status, setStatus] = useState<VerifyStatus>("idle");
  const [message, setMessage] = useState("");

  const verify = useCallback(async (token: string) => {
    try {
      setStatus("loading");
      setMessage("Verifying your email...");

      const response = await verifyEmail(token);

      setStatus("success");
      setMessage(response.message || "Email verified successfully.");

      return response;
    } catch (error) {
      const errorMessage =
        error instanceof Error ? error.message : "Email verification failed.";

      setStatus("error");
      setMessage(errorMessage);

      throw error;
    }
  }, []);

  return {
    verify,
    status,
    message,
    isLoading: status === "loading",  // change as well
    isSuccess: status === "success",
    isError: status === "error",
  };
};