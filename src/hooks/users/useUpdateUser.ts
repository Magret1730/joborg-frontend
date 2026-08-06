"use client";

import { useState } from "react";
import { updateUser } from "@/api/userApi";
import { UpdateUserPayload, UpdateUserResponse } from "@/types/user.type";

export const useUpdateUser = () => {
  const [data, setData] = useState<UpdateUserResponse | null>(null);
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const update = async (id: string, payload: UpdateUserPayload) => {
    try {
      setIsLoading(true);
      setError("");

      const response = await updateUser(id, payload);

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
    update,
    data,
    error,
    isLoading,
    setIsLoading,
  };
};