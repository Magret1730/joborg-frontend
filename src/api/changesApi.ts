import { ChangeResponse, ChangePayload, ChangesResponse } from "@/types/change.type";

const BACKEND_URL = process.env.NEXT_PUBLIC_API_BASE_URL;
if (!BACKEND_URL) {
  throw new Error(
    "NEXT_PUBLIC_API_BASE_URL is not defined in environment variables"
  );
}

export const getChanges = async (): Promise<ChangesResponse> => {
  try {
    const token =
      typeof window !== "undefined" ? localStorage.getItem("jotoken") : null;

    const response = await fetch(`${BACKEND_URL}/changes/`, {
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
      throw new Error(data.message || data.error || "Failed to fetch changes");
    }

    return data;
  } catch (error) {
    console.error("Error in Get Changes API:", error);
    throw error;
  }
};

export const getChange = async (trackerId: string): Promise<ChangeResponse> => {
  try {
    const token =
      typeof window !== "undefined" ? localStorage.getItem("jotoken") : null;

    if (!trackerId) {
      throw new Error("Tracker ID is required to fetch changes.");
    }

    const response = await fetch(`${BACKEND_URL}/tracker/${trackerId}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        ...(token && {
          Authorization: `Bearer ${token}`,
        }),
      },
    });

    const data = await response.json();

    return data;
  } catch (error) {
    console.error("Error in Get Tracker Change API:", error);
    throw error;
  }
};

export const getChangesByTracker = async (trackerId: string): Promise<ChangeResponse> => {
  try {
    const token =
      typeof window !== "undefined" ? localStorage.getItem("jotoken") : null;

    const response = await fetch(`${BACKEND_URL}/changes/tracker/${trackerId}/changes-by-tracker`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        ...(token && {
          Authorization: `Bearer ${token}`,
        }),
      },
    });

    const data = await response.json();

    // if (!response.ok) {
    //   throw new Error(data.message || data.error || "Failed to fetch changes");
    // }

    return data;
  } catch (error) {
    console.error("Error in Get Changes By Tracker API:", error);
    throw error;
  }
};