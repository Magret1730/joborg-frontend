import { useState } from "react";
import { updateTracker } from "@/api/trackersApi";

export const useUpdateTracker = () => {
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const modifyTracker = async (id: string) => {
    try {
      setIsLoading(true);
      setError("");

      const response = await updateTracker(id);
      return response;
    } catch (err) {
      const message =
        err instanceof Error ? err.message : "Failed to update tracker";

      setError(message);
    } finally {
      setIsLoading(false);
    }
  };

  return {
    error,
    isLoading,
    modifyTracker,
  };
};