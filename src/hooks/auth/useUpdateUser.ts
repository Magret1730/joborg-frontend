"use client";

import { useState } from "react";
import { updateUser } from "@/api/userApi";
import { UpdateUserPayload, UpdateUserResponse } from "@/types/user.type";
import { useAuthStore } from "@/stores/authStore";

export const useUpdateUser = () => {
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

//   const setAuth = useAuthStore((state) => state.setAuth);

  const update = async (id: string, payload: UpdateUserPayload) => {
    try {
      setIsLoading(true);
      setError("");

      const response = await updateUser(id, payload);
      if (!response.success) {
        throw new Error(response.message || "Failed to update profile.");
      }
    //   console.log("Update User Hook response:", response);
    //   if (response.data?.user) {
    //     setAuth(response.data.user, response.data.token);
    //   } else {
    //     throw new Error("User data or token is missing");
    //   }

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
    update,
    error,
    isLoading,
    setIsLoading,
  };
};
