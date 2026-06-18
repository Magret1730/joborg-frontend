"use client";

import { useEffect } from "react";

type ErrorPageProps = {
  error: Error & { digest?: string };
  reset: () => void;
};

// handles when a page crashes
export default function ErrorPage({ error, reset }: ErrorPageProps) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <main className="flex min-h-screen items-center justify-center bg-[var(--bg)] px-6 text-[var(--text)]">
      <section className="w-full max-w-lg rounded-[var(--radius-xl)] border border-[var(--border)] bg-[var(--card)] p-8 text-center shadow-[var(--card-shadow)]">
        <p className="mb-2 text-sm font-medium uppercase tracking-wide text-[var(--danger-text)]">
          Something went wrong
        </p>

        <h1 className="mb-3 text-3xl font-bold">
          We hit an unexpected error
        </h1>

        <p className="mb-6 text-sm leading-6 text-[var(--muted)]">
          Please try again. If the problem continues, come back later.
        </p>

        <button
          type="button"
          onClick={reset}
          className="rounded-[var(--radius-md)] bg-[var(--primary)] px-5 py-2.5 text-sm font-medium text-white transition hover:bg-[var(--primary-hover)]"
        >
          Try again
        </button>
      </section>
    </main>
  );
}