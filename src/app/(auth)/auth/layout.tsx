// import { AuthHeader } from "@/components/layout/AuthHeader";
import { PublicHeader } from "@/components/layout/PublicHeader";

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
        <div className="w-full">
          {children}
        </div>
      </main>
    </div>
  );
}