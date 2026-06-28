"use client";
// manages loading, error, and response state for alerts
import { useState } from "react";
import { getAlerts } from "@/api/alertApi";
import { AlertPayload } from "@/types/alert.type.js";

export const useAlerts = () => {
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [alerts, setAlerts] = useState<AlertPayload[]>([]);

  const fetchAlerts = async () => {
    try {
      setIsLoading(true);
      setError("");

      const response = await getAlerts();
      setAlerts(response.data || []); 

      return response;
    } catch (err) {
      const message =
        err instanceof Error ? err.message : "Failed to fetch alerts";

        setError(message);

      // throw err;
    } finally {
      setIsLoading(false);
    }
  };

  return {
    alerts,
    setAlerts,
    error,
    isLoading,
    setIsLoading,
    fetchAlerts,
  };
};