"use client";

import { Button } from "@heroui/react";
import { Spinner } from "@/components/ui/Spinner";
import { FiAlertCircle, FiRefreshCcw } from "react-icons/fi";

type PageLoaderProps = {
  message?: string;
};

type PageErrorProps = {
  message?: string;
  onRetry?: () => void;
};

export const PageLoader = ({ message = "Loading..." }: PageLoaderProps) => {
  return (
    <div className="flex min-h-[50vh] w-full flex-col items-center justify-center gap-3 text-center">
      <Spinner size="lg" />
      <p className="text-sm text-[var(--muted)]">{message}</p>
    </div>
  );
};

export const PageError = ({
  message = "Something went wrong.",
  onRetry,
}: PageErrorProps) => {
  return (
    <div className="flex min-h-[50vh] w-full items-center justify-center">
      <div className="w-full max-w-md rounded-[var(--radius-lg)] border border-[var(--border)] bg-[var(--card)] p-6 text-center shadow-sm">
        <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-red-100 text-red-600 dark:bg-red-500/15 dark:text-red-400">
          <FiAlertCircle size={22} />
        </div>

        <h2 className="mt-4 text-base font-semibold text-[var(--text)]">
          Unable to load data
        </h2>

        <p className="mt-2 text-sm leading-6 text-[var(--muted)]">
          {message}
        </p>

        {onRetry && (
          <Button
            type="button"
            onClick={onRetry}
            className="mt-5 inline-flex items-center justify-center gap-2 rounded-[var(--radius-md)] bg-[var(--primary)] px-4 py-2 text-sm font-medium text-white transition hover:bg-[var(--primary-hover)]"
          >
            <FiRefreshCcw size={15} />
            Try again
          </Button>
        )}
      </div>
    </div>
  );
};