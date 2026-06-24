"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { appNavItems } from "@/constants/navItems";
import { AppLogo } from "@/components/ui/AppLogo";
import { useAuthStore } from "@/stores/authStore";
import { Button } from "@heroui/react";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";

export const Sidebar = () => {
  const pathname = usePathname();
  const logout = useAuthStore((state) => state.logout);
  const router = useRouter();

  return (
    <aside className="hidden w-64 border-r border-[var(--border)] bg-[var(--sidebar)] px-4 py-5 text-[var(--text)] lg:block">
      <section className="flex flex-col justify-between h-full">
        <div>
          <div className="mb-8 flex items-center gap-2">
            <AppLogo />

            {/* <p className="text-lg font-semibold">joborg</p> */}
          </div>

          <nav className="space-y-1">
            {appNavItems.map((item) => {
              const Icon = item.icon;
              const isActive = pathname === item.href;

              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`flex items-center justify-between rounded-[var(--radius-md)] px-3 py-2 text-sm font-medium transition ${
                    isActive
                      ? "bg-[var(--primary)] text-white"
                      : "text-[var(--muted)] hover:bg-[var(--surface-hover)] hover:text-[var(--text)]"
                  }`}
                >
                  <span className="flex items-center gap-3">
                    <Icon size={18} />
                    {item.label}
                  </span>

                  {item.badge && (
                    <span className="rounded-full bg-[var(--accent-soft)] px-2 py-0.5 text-xs text-[var(--accent)]">
                      {item.badge}
                    </span>
                  )}
                </Link>
              );
            })}
          </nav>
        </div>

        <div className="rounded-[var(--radius-md)] border border-[var(--border)] bg-[var(--card)] p-4 shadow-sm">
          <div className="flex flex-col items-center text-center">
            <AppLogo />

            <p className="mt-1 text-sm leading-5 text-[var(--muted)]">
              Track company career pages and job boards.
            </p>

            <Button
              onClick={() => {
                logout();
                toast.success("Logged out successfully");
              }}
              className="mt-4 w-full rounded-[var(--radius-md)] bg-[var(--primary)] px-4 py-2 text-sm font-medium text-white transition hover:bg-[var(--primary-hover)]"
            >
              Logout
            </Button>
          </div>
        </div>
      </section>
    </aside>
  );
};
