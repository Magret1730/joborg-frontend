import Link from "next/link";
import { MdOutlineWorkOff } from "react-icons/md";
import { RouteEnum } from "@/enum/RouteEnum";

// handles invalid routes.
export default function NotFound() {
  return (
    <main className="flex min-h-screen items-center justify-center bg-[var(--bg)] px-6 text-[var(--text)]">
      <section className="w-full max-w-lg rounded-[var(--radius-xl)] border border-[var(--border)] bg-[var(--card)] p-8 text-center shadow-[var(--card-shadow)]">
        <div className="mx-auto mb-5 flex h-14 w-14 items-center justify-center rounded-full bg-[var(--danger-soft)] text-[var(--danger-text)]">
          <MdOutlineWorkOff size={28} />
        </div>

        <p className="mb-2 text-sm font-medium uppercase tracking-wide text-[var(--muted)]">
          404 Error
        </p>

        <h1 className="mb-3 text-3xl font-bold">
          Page not found
        </h1>

        <p className="mb-6 text-sm leading-6 text-[var(--muted)]">
          The page you are looking for may have not been created or does not exist.
        </p>

        <div className="flex flex-col justify-center gap-3 sm:flex-row">
          <Link
            href={RouteEnum.HOME}
            className="rounded-[var(--radius-md)] bg-[var(--primary)] px-5 py-2.5 text-sm font-medium text-white transition hover:bg-[var(--primary-hover)]"
          >
            Go home
          </Link>

          {/* <Link
            href={RouteEnum.DASHBOARD}
            className="rounded-[var(--radius-md)] border border-[var(--border)] bg-[var(--surface)] px-5 py-2.5 text-sm font-medium text-[var(--text)] transition hover:bg-[var(--surface-hover)]"
          >
            Go to dashboard
          </Link> */}
        </div>
      </section>
    </main>
  );
}