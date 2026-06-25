import { useState } from "react";
import { resumeTracker } from "@/api/trackersApi";

export const useResumeTracker = () => {
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const resume = async (id: string) => {
    try {
      setIsLoading(true);
      setError("");

      const response = await resumeTracker(id);
      return response;
    } catch (err) {
      const message =
        err instanceof Error ? err.message : "Failed to resume tracker";

      setError(message);
    } finally {
      setIsLoading(false);
    }
  };

  return {
    error,
    isLoading,
    resume,
  };
};