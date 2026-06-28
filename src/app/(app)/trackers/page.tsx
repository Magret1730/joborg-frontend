import type { Metadata } from "next";
import { TrackersClient } from "@/app/(app)/trackers/TrackersClient";

export const metadata: Metadata = {
  title: "Trackers",
  description: "Overview of your career trackers page monitoring.",
};

export default function TrackerPage() {
  return <TrackersClient />;
}