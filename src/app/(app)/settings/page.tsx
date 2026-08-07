import { SettingsClient } from "@/app/(app)/settings/SettingsClient";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Settings",
  description: "Overview of your career settings page.",
};

export default function SettingsPage() {
  return <SettingsClient />;
}