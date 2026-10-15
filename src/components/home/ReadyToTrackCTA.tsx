import Link from "next/link";
import { FaRegEnvelope } from "react-icons/fa6";
import { FaCheckCircle } from "react-icons/fa";

export const ReadyToTrackCTA = () => {
    return (
      <section className="px-6 py-16">
        <div className="mx-auto flex w-full max-w-6xl flex-col items-center justify-between gap-8 rounded-[var(--radius-lg)] border border-[var(--input-border)] bg-[var(--surface)] px-8 py-8 shadow-sm md:flex-row md:px-12">
          <div className="flex flex-col items-center gap-6 text-center md:flex-row md:text-left">
            <div className="relative flex h-28 w-28 shrink-0 items-center justify-center rounded-2xl bg-[var(--primary)]/10">
              <FaRegEnvelope className="text-6xl text-[var(--primary)]" />
  
              <span className="absolute -right-2 top-8 flex h-10 w-10 items-center justify-center rounded-full bg-green-500 text-white shadow-md">
                <FaCheckCircle className="text-xl" />
              </span>
            </div>
  
            <div>
              <h2 className="text-2xl font-bold leading-tight text-[var(--foreground)] md:text-3xl">
                Ready to track career pages <br className="hidden md:block" />
                and catch changes early?
              </h2>
  
              <p className="mt-3 text-base text-[var(--muted)] md:text-lg">
                Join joborg and start monitoring in minutes.
              </p>
            </div>
          </div>
  
          <div className="flex flex-col items-center gap-3">
            <Link
              href="/register"
              className="rounded-[var(--radius-sm)] bg-[var(--primary)] px-8 py-3 text-sm font-semibold text-white shadow-sm transition hover:opacity-90"
            >
              Get Started Free
            </Link>
  
            <p className="text-sm text-[var(--muted)]">
              No credit card required
            </p>
          </div>
        </div>
      </section>
    );
  };