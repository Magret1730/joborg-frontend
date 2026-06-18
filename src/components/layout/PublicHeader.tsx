"use client";

import { MdOutlineWork } from "react-icons/md";
import Link from "next/link";
import { RouteEnum } from "@/enum/RouteEnum";
import { FiMoon, FiSun } from "react-icons/fi";
import { useTheme } from "@/components/providers/ThemeProvider";
import { LayoutVariantEnum } from "@/enum/LayoutVariantEnum";
import { Button } from "@heroui/react";

type HeaderProps = {
  variant?: LayoutVariantEnum;
};

export const PublicHeader = ({
  variant = LayoutVariantEnum.PUBLIC,
}: HeaderProps) => {
  const { theme, toggleTheme } = useTheme();

  const isApp = variant === LayoutVariantEnum.APP;
  const isAuth = variant === LayoutVariantEnum.AUTH;
  const isPublic = variant === LayoutVariantEnum.PUBLIC;

  return (
    <header className="flex items-center justify-between border-b border-[var(--border)] bg-[var(--header)] px-6 py-4 text-[var(--text)]">
      <Link href={RouteEnum.HOME} className="flex items-center gap-2">
        <div className="flex h-9 w-9 items-center justify-center rounded-[var(--radius-md)] bg-[var(--primary-soft)] text-[var(--primary)]">
          <MdOutlineWork size={22} />
        </div>

        <p className="text-lg font-semibold">joborg</p>
      </Link>

      <div className="flex items-center gap-4">
        {isPublic && (
          <>
            <Link
              href={RouteEnum.HOME}
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
          className="flex h-9 w-9 items-center justify-center rounded-[var(--radius-md)] border border-[var(--border)] bg-[var(--surface)] text-[var(--text)] transition hover:bg-[var(--surface-hover)]"
          aria-label="Toggle theme"
        >
          {theme === "dark" ? <FiSun size={16} /> : <FiMoon size={16} />}
        </Button>
      </div>
    </header>
  );
};
