"use client";
// manages loading, error, and response state for alerts
import { useState } from "react";
import { getAlert } from "@/api/alertApi";
import { AlertPayload } from "@/types/alert.type.js";

export const useGetAlert = () => {
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [alert, setAlert] = useState<AlertPayload[]>([]);

  const fetchAlert = async (id: string) => {
    try {
      setIsLoading(true);
      setError("");

      const response = await getAlert(id);
      setAlert(response.data || []); 

      return response;
    } catch (err) {
      const message =
        err instanceof Error ? err.message : "Failed to fetch alert";

        setError(message);

      // throw err;
    } finally {
      setIsLoading(false);
    }
  };

  return {
    alert,
    setAlert,
    error,
    isLoading,
    setIsLoading,
    fetchAlert,
  };
};