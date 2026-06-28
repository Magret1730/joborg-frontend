"use client";
// manages loading, error, and response state for alerts
import { useState } from "react";
import { getChanges } from "@/api/changesApi";
import { ChangePayload } from "@/types/change.type.js";

export const usechanges = () => {
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [changes, setChanges] = useState<ChangePayload[]>([]);

  const fetchchanges = async () => {
    try {
      setIsLoading(true);
      setError("");

      const response = await getChanges();
      setChanges(response.data || []); 

      return response;
    } catch (err) {
      const message =
        err instanceof Error ? err.message : "Failed to fetch changes";

        setError(message);

      // throw err;
    } finally {
      setIsLoading(false);
    }
  };

  return {
    changes,
    setChanges,
    error,
    isLoading,
    setIsLoading,
    fetchchanges,
  };
};