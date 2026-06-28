import { TrackersResponse, TrackerResponse } from "@/types/tracker.type";

const BACKEND_URL = process.env.NEXT_PUBLIC_API_BASE_URL;
if (!BACKEND_URL) {
  throw new Error(
    "NEXT_PUBLIC_API_BASE_URL is not defined in environment variables"
  );
}

// get all trackers
export const getTrackers = async (): Promise<TrackersResponse> => {
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
      throw new Error(data.message || data.error || "Get Trackers failed");
    }

    return data;
  } catch (error) {
    console.error("Error in get tracker:", error);
    throw error;
  }
};

// get tracker by id
export const getTracker = async (id: string): Promise<TrackerResponse> => {
  try {
    const token =
      typeof window !== "undefined" ? localStorage.getItem("jotoken") : null;

    const url = `${BACKEND_URL}/trackers/${id}`;

    const response = await fetch(url, {
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
      throw new Error(data.message || data.error || "Get Tracker failed");
    }

    return data;
  } catch (error) {
    console.error("Error in get tracker:", error);
    throw error;
  }
};

// get tracker by id
export const deleteTracker = async (id: string): Promise<TrackerResponse> => {
  try {
    const token =
      typeof window !== "undefined" ? localStorage.getItem("jotoken") : null;

    const response = await fetch(`${BACKEND_URL}/trackers/:id`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        ...(token && {
          Authorization: `Bearer ${token}`,
        }),
      },
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || data.error || "Delete Tracker failed");
    }

    return data;
  } catch (error) {
    console.error("Error in delete tracker:", error);
    throw error;
  }
};

// update tracker by id
export const updateTracker = async (id: string): Promise<TrackerResponse> => {
  try {
    const token =
      typeof window !== "undefined" ? localStorage.getItem("jotoken") : null;

    const response = await fetch(`${BACKEND_URL}/trackers/:id`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        ...(token && {
          Authorization: `Bearer ${token}`,
        }),
      },
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || data.error || "Update Tracker failed");
    }

    return data;
  } catch (error) {
    console.error("Error in update tracker:", error);
    throw error;
  }
};

// pause tracker by id
export const pauseTracker = async (id: string): Promise<TrackerResponse> => {
  try {
    const token =
      typeof window !== "undefined" ? localStorage.getItem("jotoken") : null;

    const response = await fetch(`${BACKEND_URL}/trackers/:id/pause`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        ...(token && {
          Authorization: `Bearer ${token}`,
        }),
      },
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || data.error || "Pause Tracker failed");
    }

    return data;
  } catch (error) {
    console.error("Error in pause tracker:", error);
    throw error;
  }
};

// resume tracker by id
export const resumeTracker = async (id: string): Promise<TrackerResponse> => {
  try {
    const token =
      typeof window !== "undefined" ? localStorage.getItem("jotoken") : null;

    const response = await fetch(`${BACKEND_URL}/trackers/:id/resume`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        ...(token && {
          Authorization: `Bearer ${token}`,
        }),
      },
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || data.error || "Get Tracker failed");
    }

    return data;
  } catch (error) {
    console.error("Error in get tracker:", error);
    throw error;
  }
};

// check-now
export const checkNowTracker = async (id: string): Promise<TrackerResponse> => {
  try {
    const token =
      typeof window !== "undefined" ? localStorage.getItem("jotoken") : null;

    const response = await fetch(`${BACKEND_URL}/trackers/:id/check-now`, {
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
      throw new Error(data.message || data.error || "Get Tracker failed");
    }

    return data;
  } catch (error) {
    console.error("Error in get tracker:", error);
    throw error;
  }
};

//post tracker
export const postTracker = async (payload: any): Promise<TrackerResponse> => {
  try {
    const token =
      typeof window !== "undefined" ? localStorage.getItem("jotoken") : null;

    const response = await fetch(`${BACKEND_URL}/trackers`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        ...(token && {
          Authorization: `Bearer ${token}`,
        }),
      },
      body: JSON.stringify(payload),
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || data.error || "Post Tracker failed");
    }

    return data;
  } catch (error) {
    console.error("Error in post tracker:", error);
    throw error;
  }
};
