"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { appNavItems } from "@/constants/navItems";
import { AppLogo } from "@/components/ui/AppLogo";
import { useAuthStore } from "@/stores/authStore";
import { Button } from "@heroui/react";
import { toast } from "react-toastify";
import { useTheme } from "@/components/providers/ThemeProvider";
import { FiMoon, FiSun, FiLogOut } from "react-icons/fi";
import { Menu, X } from "lucide-react";

export const Sidebar = () => {
  const pathname = usePathname();
  const logout = useAuthStore((state) => state.logout);
  const user = useAuthStore((state) => state.user);
  const { theme, toggleTheme } = useTheme();

  const [isCollapsed, setIsCollapsed] = useState(true);

  useEffect(() => {
    const handleResize = () => {
      const isSmallScreen = window.innerWidth < 1024;

      if (isSmallScreen) {
        setIsCollapsed(true);
      } else {
        setIsCollapsed(false);
      }
    };

    handleResize();

    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const capitalizeName = (name?: string) => {
    if (!name) return "";

    return name.charAt(0).toUpperCase() + name.slice(1).toLowerCase();
  };

  const firstName = capitalizeName(user?.first_name);
  const lastName = capitalizeName(user?.last_name);

  const fullName = `${firstName} ${lastName}`.trim() || "John Doe";
  const userEmail = user?.email || "Signed in";

  const initials =
    `${user?.first_name?.[0] ?? ""}${
      user?.last_name?.[0] ?? ""
    }`.toUpperCase() || "JD";

  const handleLogout = () => {
    logout();
    toast.success("Logged out successfully");
  };

  const handleNavClick = () => {
    if (window.innerWidth < 1024) {
      setIsCollapsed(true);
    }
  };

  return (
    <aside
      className={`h-screen shrink-0 overflow-hidden border-r border-[var(--border)] bg-[var(--sidebar)] py-5 text-[var(--text)] transition-all duration-300 ${
        isCollapsed ? "w-24 px-3" : "w-64 px-4"
      }`}
    >
      <section className="flex h-full flex-col justify-between">
        <div className="">
          <Button
            type="button"
            onClick={() => setIsCollapsed((prev) => !prev)}
            className={`flex min-w-0 items-center justify-center mb-4 border-[var(--border)] bg-[var(--card)] p-0 text-[var(--text)] shadow-sm transition hover:border-[var(--primary)] hover:bg-[var(--surface-hover)] hover:text-[var(--primary)] ${
              isCollapsed
                ? "h-6 w-6 rounded-[var(--radius-sm)] ml-6"
                : "h-6 w-6 rounded-[var(--radius-md)]"
            }`}
            aria-label={isCollapsed ? "Open sidebar" : "Collapse sidebar"}
          >
            {isCollapsed ? <Menu size={16} /> : <X size={16} />}
          </Button>

          <div
            className={`mb-8 flex ${
              isCollapsed
                ? "flex-col items-center gap-4"
                : "items-center justify-between gap-3"
            }`}
          >
            <AppLogo showText={!isCollapsed} />
          </div>

          {/* Navigation */}
          <nav className="space-y-2">
            {appNavItems.map((item) => {
              const Icon = item.icon;
              const isActive = pathname === item.href;

              return (
                <Link
                  key={item.href}
                  href={item.href}
                  title={item.label}
                  onClick={handleNavClick}
                  className={`group relative flex items-center rounded-[var(--radius-md)] text-sm font-medium transition ${
                    isCollapsed ? "h-12 justify-center px-0" : "gap-3 px-3 py-2"
                  } ${
                    isActive
                      ? "bg-[var(--primary)] text-white"
                      : "text-[var(--muted)] hover:bg-[var(--surface-hover)] hover:text-[var(--text)]"
                  }`}
                >
                  <Icon size={20} />

                  {!isCollapsed && <span>{item.label}</span>}

                  {isCollapsed && (
                    <span className="pointer-events-none absolute left-full top-1/2 z-50 ml-3 hidden -translate-y-1/2 whitespace-nowrap rounded-md border border-[var(--border)] bg-[var(--card)] px-2 py-1 text-xs text-[var(--text)] opacity-0 shadow-md transition group-hover:opacity-100 sm:block">
                      {item.label}
                    </span>
                  )}
                </Link>
              );
            })}
          </nav>
        </div>

        {/* Account / theme / logout */}
        <div
          className={`mt-5 w-full rounded-[var(--radius-md)] border border-[var(--border)] bg-[var(--surface)] ${
            isCollapsed ? "flex flex-col items-center gap-3 p-2" : "p-3"
          }`}
        >
          <div
            className={`flex items-center gap-3 ${
              isCollapsed ? "justify-center" : ""
            }`}
          >
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[var(--primary)] text-sm font-semibold text-white">
              {initials}
            </div>

            {!isCollapsed && (
              <div className="min-w-0">
                <p className="truncate text-sm font-semibold text-[var(--text)]">
                  {fullName}
                </p>
                <p className="truncate text-xs text-[var(--muted)]">
                  {userEmail}
                </p>
              </div>
            )}
          </div>

          <div
            className={`flex w-full ${
              isCollapsed
                ? "flex-col items-center gap-2"
                : "mt-4 flex-col gap-2"
            }`}
          >
            <Button
              type="button"
              onClick={toggleTheme}
              data-title={theme === "dark" ? "Light Mode" : "Dark Mode"}
              className={`flex min-w-0 items-center justify-center gap-2 rounded-[var(--radius-md)] border border-[var(--border)] bg-[var(--card)] text-[var(--text)] transition hover:border-[var(--primary)] hover:bg-[var(--surface-hover)] hover:text-[var(--primary)] ${
                isCollapsed
                  ? "h-10 w-10 p-0"
                  : "w-full px-3 py-2 text-sm font-medium"
              }`}
              aria-label="Toggle theme"
            >
              {theme === "dark" ? <FiSun size={18} /> : <FiMoon size={18} />}

              {!isCollapsed && (
                <span>{theme === "dark" ? "Light Mode" : "Dark Mode"}</span>
              )}
            </Button>

            <Button
              type="button"
              onClick={handleLogout}
              data-title="Logout"
              className={`flex min-w-0 items-center justify-center gap-2 rounded-[var(--radius-md)] bg-[var(--primary)] text-white transition hover:bg-[var(--primary-hover)] ${
                isCollapsed
                  ? "h-10 w-10 p-0"
                  : "w-full px-3 py-2 text-sm font-medium"
              }`}
              aria-label="Logout"
            >
              <FiLogOut size={18} />

              {!isCollapsed && <span>Logout</span>}
            </Button>
          </div>
        </div>
      </section>
    </aside>
  );
};
