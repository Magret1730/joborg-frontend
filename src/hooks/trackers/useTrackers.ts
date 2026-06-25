"use client";
// manages loading, error, and response state for trackers
import { useState } from "react";
import { getTrackers } from "@/api/trackersApi";
import { TrackerPayload } from "@/types/tracker.type.js";

export const useTrackers = () => {
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [trackers, setTrackers] = useState<TrackerPayload[]>([]);

  const fetchTrackers = async () => {
    try {
      setIsLoading(true);
      setError("");

      const response = await getTrackers();
      setTrackers(response.data || []); 

      return response;
    } catch (err) {
      const message =
        err instanceof Error ? err.message : "Failed to fetch trackers";

        setError(message);

      // throw err;
    } finally {
      setIsLoading(false);
    }
  };

  return {
    trackers,
    setTrackers,
    error,
    isLoading,
    setIsLoading,
    fetchTrackers,
  };
};