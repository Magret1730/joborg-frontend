"use client";
// manages loading, error, and response state for user registration
import { useState } from "react";
import { registerUser } from "@/api/authApi";
import { RegisterPayload, RegisterResponse } from "@/types/auth.type";

export const useRegister = () => {
  const [data, setData] = useState<RegisterResponse | null>(null);
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const register = async (payload: RegisterPayload) => {
    try {
      setIsLoading(true);
      setError("");

      const response = await registerUser(payload);

      setData(response);
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
    register,
    data,
    error,
    isLoading,
    setIsLoading,
  };
};