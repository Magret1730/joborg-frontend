import Link from "next/link";
import { MdConstruction } from "react-icons/md";
import { RouteEnum } from "@/enum/RouteEnum";

type UnderConstructionProps = {
  title?: string;
  description?: string;
  showDashboardButton?: boolean;
};

export const UnderConstruction = ({
  title = "This page is under construction",
  description = "We are still working on this feature. It will be available in a future version of joborg.",
  showDashboardButton = true,
}: UnderConstructionProps) => {
  return (
    <section className="flex min-h-[70vh] items-center justify-center px-4">
      <div className="w-full max-w-xl rounded-[var(--radius-xl)] border border-[var(--border)] bg-[var(--card)] p-8 text-center shadow-[var(--card-shadow)]">
        <div className="mx-auto mb-5 flex h-14 w-14 items-center justify-center rounded-full bg-[var(--warning-soft)] text-[var(--warning-text)]">
          <MdConstruction size={30} />
        </div>

        <p className="mb-2 text-sm font-medium uppercase tracking-wide text-[var(--muted)]">
          Coming Soon
        </p>

        <h1 className="mb-3 text-2xl font-bold text-[var(--text)]">
          {title}
        </h1>

        <p className="mx-auto mb-6 max-w-md text-sm leading-6 text-[var(--muted)]">
          {description}
        </p>

        {showDashboardButton && (
          <Link
            href={RouteEnum.DASHBOARD}
            className="inline-flex rounded-[var(--radius-md)] bg-[var(--primary)] px-5 py-2.5 text-sm font-medium text-white transition hover:bg-[var(--primary-hover)]"
          >
            Back to dashboard
          </Link>
        )}
      </div>
    </section>
  );
};

// import { UnderConstruction } from "@/components/shared/UnderConstruction";

// export default function JobsPage() {
//   return (
//     <UnderConstruction
//       title="Smart job detection is coming soon"
//       description="In MVP 2, joborg will detect actual job postings from supported platforms like Greenhouse, Lever, Ashby, and Workday. For now, you can track career pages and receive alerts when changes are detected."
//     />
//   );
// }