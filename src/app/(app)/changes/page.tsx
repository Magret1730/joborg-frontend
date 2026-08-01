import type { Metadata } from "next";
import { ChangesClient } from "@/app/(app)/changes/ChangesClient";

export const metadata: Metadata = {
  title: "Changes",
  description: "Overview of your career changes page monitoring.",
};

export default function ChangesPage() {
  return <ChangesClient />;
}