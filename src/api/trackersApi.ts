import { TrackerResponse } from "@/types/tracker.type";

const BACKEND_URL = process.env.NEXT_PUBLIC_API_BASE_URL;
if (!BACKEND_URL) {
  throw new Error(
    "NEXT_PUBLIC_API_BASE_URL is not defined in environment variables"
  );
}

export const getTrackers = async (): Promise<TrackerResponse> => {
  try {
    const token =
      typeof window !== "undefined" ? localStorage.getItem("jotoken") : null;

    const response = await fetch(`${BACKEND_URL}/trackers`, {
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
      throw new Error(data.message || data.error || "Forgot Password failed");
    }

    return data;
  } catch (error) {
    console.error("Error in forgot password user:", error);
    throw error;
  }
};
