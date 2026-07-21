"use client";
// manages loading, error, and response state for changes
import { useState } from "react";
import { getChangesByTracker } from "@/api/changesApi";
import { ChangePayload } from "@/types/change.type.js";

export const useGetChangesByTracker = () => {
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [change, setChange] = useState<ChangePayload[]>([]);

  const fetchChange = async (id: string) => {
    try {
      setIsLoading(true);
      setError("");

      const response = await getChangesByTracker(id);
      setChange(response.data || []); 

      return response;
    } catch (err) {
      const message =
        err instanceof Error ? err.message : "Failed to fetch changes by tracker";

        setError(message);
    } finally {
      setIsLoading(false);
    }
  };

  return {
    change,
    setChange,
    error,
    isLoading,
    setIsLoading,
    fetchChange,
  };
};