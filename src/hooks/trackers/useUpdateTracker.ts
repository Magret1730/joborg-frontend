import { useState } from "react";
import { updateTracker } from "@/api/trackersApi";
import { UpdateTrackerPayload } from "@/types/tracker.type";

export const useUpdateTracker = () => {
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const modifyTracker = async (
    id: string,
    payload: UpdateTrackerPayload
  ) => {
    try {
      setIsLoading(true);
      setError("");

      const response = await updateTracker(id, payload);
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