import { AlertResponse } from "@/types/alert.type";

const BACKEND_URL = process.env.NEXT_PUBLIC_API_BASE_URL;
if (!BACKEND_URL) {
  throw new Error(
    "NEXT_PUBLIC_API_BASE_URL is not defined in environment variables"
  );
}

export const getAlerts = async (): Promise<AlertResponse> => {
  try {
    const token =
      typeof window !== "undefined" ? localStorage.getItem("jotoken") : null;

    const response = await fetch(`${BACKEND_URL}/alerts/`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        ...(token && {
          Authorization: `Bearer ${token}`,
        }),
      },
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || data.error || "Failed to fetch alerts");
    }

    return data;
  } catch (error) {
    console.error("Error in Get Alerts API:", error);
    throw error;
  }
};

export const getAlert = async (trackerId: string): Promise<AlertResponse> => {
  try {
    const token =
      typeof window !== "undefined" ? localStorage.getItem("jotoken") : null;

    const response = await fetch(`${BACKEND_URL}/alerts/tracker/${trackerId}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        ...(token && {
          Authorization: `Bearer ${token}`,
        }),
      },
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || data.error || "Failed to fetch alerts");
    }

    return data;
  } catch (error) {
    console.error("Error in Get Tracker Alerts API:", error);
    throw error;
  }
};
