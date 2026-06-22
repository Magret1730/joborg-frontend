"use client";

import Link from "next/link";
import { RouteEnum } from "@/enum/RouteEnum";
import { FiMoon, FiSun } from "react-icons/fi";
import { useTheme } from "@/components/providers/ThemeProvider";
import { LayoutVariantEnum } from "@/enum/LayoutVariantEnum";
import { Button } from "@heroui/react";
import { AppLogo } from "@/components/ui/AppLogo";
import { Menu, X } from "lucide-react";
import { useState } from "react";

type HeaderProps = {
  variant?: LayoutVariantEnum;
};

export const PublicHeader = ({
  variant = LayoutVariantEnum.PUBLIC,
}: HeaderProps) => {
  const { theme, toggleTheme } = useTheme();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const isApp = variant === LayoutVariantEnum.APP;
  const isAuth = variant === LayoutVariantEnum.AUTH;
  const isPublic = variant === LayoutVariantEnum.PUBLIC;

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
  };

  return (
    <header className="sticky top-0 z-50 border-b border-[var(--border)] bg-[var(--header)] text-[var(--text)]">
      <div className="relative mx-auto flex h-[73px] w-full items-center justify-between px-4 sm:px-6 lg:px-20">
        <Link
          href={RouteEnum.HOME}
          className="flex items-center gap-2"
          onClick={closeMobileMenu}
        >
          <AppLogo />
        </Link>

        {/* Desktop nav */}
        <div className="hidden items-center gap-8 md:flex">
          {isPublic && (
            <>
              <Link
                href={RouteEnum.ABOUT}
                className="text-sm font-medium text-[var(--muted)] transition hover:text-[var(--text)]"
              >
                About
              </Link>

              <Link
                href={RouteEnum.CONTACT}
                className="text-sm font-medium text-[var(--muted)] transition hover:text-[var(--text)]"
              >
                Contact
              </Link>

              <Link
                href={RouteEnum.LOGIN}
                className="text-sm font-medium text-[var(--muted)] transition hover:text-[var(--text)]"
              >
                Sign In
              </Link>

              <Link
                href={RouteEnum.REGISTER}
                className="rounded-[var(--radius-md)] bg-[var(--primary)] px-4 py-2 text-sm font-medium text-white transition hover:bg-[var(--primary-hover)]"
              >
                Sign Up
              </Link>
            </>
          )}

          {isAuth && (
            <Link
              href={RouteEnum.HOME}
              className="text-sm font-medium text-[var(--muted)] transition hover:text-[var(--text)]"
            >
              Back to home
            </Link>
          )}

          {isApp && (
            <div className="flex items-center gap-3">
              <span className="text-sm text-[var(--muted)]">John Doe</span>

              <div className="flex h-9 w-9 items-center justify-center rounded-full bg-[var(--primary)] text-sm font-semibold text-white">
                JD
              </div>
            </div>
          )}

          <Button
            type="button"
            onClick={toggleTheme}
            className="flex h-9 w-9 min-w-0 items-center justify-center rounded-[var(--radius-md)] border border-[var(--border)] bg-[var(--surface)] p-0 text-[var(--text)] transition hover:bg-[var(--surface-hover)]"
            aria-label="Toggle theme"
          >
            {theme === "dark" ? <FiSun size={16} /> : <FiMoon size={16} />}
          </Button>
        </div>

        {/* Mobile actions */}
        <div className="flex items-center gap-2 md:hidden">
          <Button
            type="button"
            onClick={toggleTheme}
            className="flex h-9 w-9 min-w-0 items-center justify-center rounded-[var(--radius-md)] border border-[var(--border)] bg-[var(--surface)] p-0 text-[var(--text)] transition hover:bg-[var(--surface-hover)]"
            aria-label="Toggle theme"
          >
            {theme === "dark" ? <FiSun size={16} /> : <FiMoon size={16} />}
          </Button>

          <Button
            type="button"
            onClick={() => setIsMobileMenuOpen((prev) => !prev)}
            className="flex h-9 w-9 min-w-0 items-center justify-center rounded-[var(--radius-md)] border border-[var(--border)] bg-[var(--surface)] p-0 text-[var(--text)] transition hover:bg-[var(--surface-hover)]"
            aria-label="Toggle mobile menu"
          >
            {isMobileMenuOpen ? <X size={18} /> : <Menu size={18} />}
          </Button>
        </div>

        {/* Mobile menu */}
        {isMobileMenuOpen && (
          <div className="absolute left-4 right-4 top-[calc(100%+8px)] rounded-[var(--radius-md)] border border-[var(--border)] bg-[var(--surface)] p-4 shadow-lg md:hidden">
            <nav className="flex flex-col gap-3">
              {isPublic && (
                <>
                  <Link
                    href={RouteEnum.ABOUT}
                    onClick={closeMobileMenu}
                    className="rounded-[var(--radius-sm)] px-3 py-2 text-sm font-medium text-[var(--muted)] transition hover:bg-[var(--surface-hover)] hover:text-[var(--text)]"
                  >
                    About
                  </Link>

                  <Link
                    href={RouteEnum.CONTACT}
                    onClick={closeMobileMenu}
                    className="rounded-[var(--radius-sm)] px-3 py-2 text-sm font-medium text-[var(--muted)] transition hover:bg-[var(--surface-hover)] hover:text-[var(--text)]"
                  >
                    Contact
                  </Link>

                  <Link
                    href={RouteEnum.LOGIN}
                    onClick={closeMobileMenu}
                    className="rounded-[var(--radius-sm)] px-3 py-2 text-sm font-medium text-[var(--muted)] transition hover:bg-[var(--surface-hover)] hover:text-[var(--text)]"
                  >
                    Sign In
                  </Link>

                  <Link
                    href={RouteEnum.REGISTER}
                    onClick={closeMobileMenu}
                    className="mt-2 rounded-[var(--radius-md)] bg-[var(--primary)] px-4 py-2 text-center text-sm font-medium text-white transition hover:bg-[var(--primary-hover)]"
                  >
                    Sign Up
                  </Link>
                </>
              )}

              {isAuth && (
                <Link
                  href={RouteEnum.HOME}
                  onClick={closeMobileMenu}
                  className="rounded-[var(--radius-sm)] px-3 py-2 text-sm font-medium text-[var(--muted)] transition hover:bg-[var(--surface-hover)] hover:text-[var(--text)]"
                >
                  Back to home
                </Link>
              )}

              {isApp && (
                <div className="flex items-center gap-3 rounded-[var(--radius-sm)] px-3 py-2">
                  <div className="flex h-9 w-9 items-center justify-center rounded-full bg-[var(--primary)] text-sm font-semibold text-white">
                    JD
                  </div>

                  <div>
                    <p className="text-sm font-medium text-[var(--text)]">
                      John Doe
                    </p>
                    <p className="text-xs text-[var(--muted)]">
                      Signed in
                    </p>
                  </div>
                </div>
              )}
            </nav>
          </div>
        )}
      </div>
    </header>
  );
};