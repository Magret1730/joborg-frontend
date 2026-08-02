"use client";

// manages loading, error, and response state for alerts
import { useState } from "react";
import { getAlertsByTrackerId } from "@/api/alertApi";
import { AlertPayload } from "@/types/alert.type.js";

export const useGetAlertsByTracker = () => {
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [alerts, setAlerts] = useState<AlertPayload[]>([]);

  const fetchAlerts = async (id: string) => {
    try {
      setIsLoading(true);
      setError("");

      const response = await getAlertsByTrackerId(id);
      setAlerts(response.data || []); 

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
    alerts,
    setAlerts,
    error,
    isLoading,
    setIsLoading,
    fetchAlerts,
  };
};