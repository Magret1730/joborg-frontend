import { useState } from "react";
import { checkNowTracker } from "@/api/trackersApi";

export const useCheckNowTracker = () => {
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const checkNow = async (id: string) => {
    try {
      setIsLoading(true);
      setError("");

      const response = await checkNowTracker(id);
      return response;
    } catch (err) {
      const message =
        err instanceof Error ? err.message : "Failed to check-now tracker";

      setError(message);
    } finally {
      setIsLoading(false);
    }
  };

  return {
    error,
    isLoading,
    checkNow,
  };
};