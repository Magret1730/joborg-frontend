import type { Metadata } from "next";
import { AlertsClient } from "@/app/(app)/alerts/AlertsClient";

export const metadata: Metadata = {
  title: "Alerts",
  description: "Overview of your career Alerts page monitoring.",
};

export default function AlertsPage() {
  return <AlertsClient />;
}