import { useState, useEffect } from "react";
import { getTracker } from "@/api/trackersApi";
import { TrackerPayload } from "@/types/tracker.type.js";

export const useGetTracker = (id: string) => {
  const [tracker, setTracker] = useState<TrackerPayload[]>([]);
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const fetchTracker = async () => {
    try {
      setIsLoading(true);
      setError("");

      const response = await getTracker(id);
      setTracker(response.data || null);

      return response;
    } catch (err) {
      const message =
        err instanceof Error ? err.message : "Failed to fetch tracker";

      setError(message);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchTracker();
  }, [id]);

  return {
    tracker,
    error,
    isLoading,
    fetchTracker,
  };
};
