import { useState } from "react";
import { postTracker } from "@/api/trackersApi";

export const usePostTracker = () => {
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const createTracker = async (data: any) => {
    try {
      setIsLoading(true);
      setError("");

      const response = await postTracker(data);
      return response;
    } catch (err) {
      const message =
        err instanceof Error ? err.message : "Failed to create tracker";

      setError(message);
    } finally {
      setIsLoading(false);
    }
  };

  return {
    error,
    isLoading,
    createTracker,
  };
};
