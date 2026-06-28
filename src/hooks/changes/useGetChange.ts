"use client";
// manages loading, error, and response state for changes
import { useState } from "react";
import { getChange } from "@/api/changesApi";
import { ChangePayload } from "@/types/change.type.js";

export const useGetChange = () => {
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [change, setChange] = useState<ChangePayload[]>([]);

  const fetchChange = async (id: string) => {
    try {
      setIsLoading(true);
      setError("");

      const response = await getChange(id);
      setChange(response.data || []); 

      return response;
    } catch (err) {
      const message =
        err instanceof Error ? err.message : "Failed to fetch change";

        setError(message);

      // throw err;
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