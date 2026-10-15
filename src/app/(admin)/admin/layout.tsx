// TO BE CHANGED - PASSED THIS FOR VERCEL

import { Sidebar } from "@/components/layout/Sidebar";
// import { AppHeader } from "@/components/layout/AppHeader";
import { ProtectedRoute } from "@/components/auth/ProtectedRoute";

export default function AppLayout({ children }: { children: React.ReactNode }) {
  return (
    <ProtectedRoute>
      <div className="min-h-screen bg-[var(--bg)] text-[var(--text)]">
        <div className="flex min-h-screen">
          <Sidebar />

          <div className="flex min-h-screen flex-1 flex-col">
            {/* <AppHeader /> */}

            <main className="flex-1 px-6 py-6">{children}</main>
          </div>
        </div>
      </div>
    </ProtectedRoute>
  );
}