import { useState } from "react";
import { deleteTracker } from "@/api/trackersApi";

export const useDeleteTracker = () => {
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const removeTracker = async (id: string) => {
    try {
      setIsLoading(true);
      setError("");

      const response = await deleteTracker(id);
      return response;
    } catch (err) {
      const message =
        err instanceof Error ? err.message : "Failed to delete tracker";

      setError(message);
    } finally {
      setIsLoading(false);
    }
  };

  return {
    error,
    isLoading,
    removeTracker,
  };
};