import { useState } from "react";
import { pauseTracker } from "@/api/trackersApi";

export const usePauseTracker = () => {
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const pause = async (id: string) => {
    try {
      setIsLoading(true);
      setError("");

      const response = await pauseTracker(id);
      return response;
    } catch (err) {
      const message =
        err instanceof Error ? err.message : "Failed to pause tracker";

      setError(message);
    } finally {
      setIsLoading(false);
    }
  };

  return {
    error,
    isLoading,
    pause,
  };
};