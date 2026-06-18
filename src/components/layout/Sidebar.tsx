
"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { MdOutlineWork } from "react-icons/md";
import { appNavItems } from "@/constants/navItems";

export const Sidebar = () => {
  const pathname = usePathname();

  return (
    <aside className="hidden w-64 border-r border-[var(--border)] bg-[var(--sidebar)] px-4 py-5 text-[var(--text)] lg:block">
      <div className="mb-8 flex items-center gap-2">
        <div className="flex h-9 w-9 items-center justify-center rounded-[var(--radius-md)] bg-[var(--primary-soft)] text-[var(--primary)]">
          <MdOutlineWork size={22} />
        </div>

        <p className="text-lg font-semibold">joborg</p>
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
    </aside>
  );
};