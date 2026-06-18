import type { Metadata } from "next";
import { DashboardClient } from "@/app/(app)/dashboard/DashboardClient";

export const metadata: Metadata = {
  title: "Dashboard",
  description: "Overview of your career page monitoring.",
};

export default function DashboardPage() {
  return <DashboardClient />;
}
