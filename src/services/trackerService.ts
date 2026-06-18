import { apiRequest } from "./api";

export function getTrackers() {
  return apiRequest("/trackers");
}

export function createTracker(payload: {
  company_name: string;
  label?: string;
  url: string;
}) {
  return apiRequest("/trackers", {
    method: "POST",
    body: JSON.stringify(payload),
  });
}