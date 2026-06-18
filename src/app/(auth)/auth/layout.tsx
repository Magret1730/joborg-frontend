// import { AuthHeader } from "@/components/layout/AuthHeader";

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-[var(--bg)] text-[var(--text)]">
      {/* <AuthHeader /> */}

      <main className="flex min-h-[calc(100vh-73px)] items-center justify-center px-4 py-10">
        {children}
      </main>
    </div>
  );
}