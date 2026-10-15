// import { AuthHeader } from "@/components/layout/AuthHeader";
import { PublicHeader } from "@/components/layout/PublicHeader";
import { GuestOnlyRoute } from "@/components/auth/GuestOnlyRoute";

const metadata = {
  title: "Joborg - Auth",
  description: "Joborg Authentication",
};

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-[var(--bg)] text-[var(--text)]">
      <PublicHeader />

      <main className="flex min-h-[calc(100vh-73px)] w-full items-center justify-center px-4 py-10">
        <div className="w-full max-w-5xl">
          <GuestOnlyRoute>{children}</GuestOnlyRoute>
        </div>
      </main>
    </div>
  );
}