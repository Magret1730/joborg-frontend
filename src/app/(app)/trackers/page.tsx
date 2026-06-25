import type { Metadata } from "next";
import { TrackerClient } from "@/app/(app)/trackers/TrackerClient";

export const metadata: Metadata = {
  title: "Tracker",
  description: "Overview of your career tracker page monitoring.",
};

export default function TrackerPage() {
  return <TrackerClient />;
}