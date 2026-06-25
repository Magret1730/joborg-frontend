"use client";
import { useGetTrackers } from "@/hooks/trackers/useGetTrackers";
import { useEffect } from "react";
import { formatDate } from "@/lib/dateFormatter";
import Link from "next/link";
import { getStatusClass } from "@/lib/getStatusClass";
import { PageError, PageLoader } from "@/components/ui/PageState";
import {
  FiPauseCircle,
  FiPlayCircle,
  FiEye,
  FiEdit2,
  FiTrash2,
  FiExternalLink,
  FiPlusCircle,
} from "react-icons/fi";
import { Button, Tooltip } from "@heroui/react";
import { RouteEnum } from "@/enum/RouteEnum";
import { useRouter } from "next/navigation";

export const TrackerClient = () => {
  const router = useRouter();

  const {
    trackers,
    isLoading: isTrackerLoading,
    error: trackerError,
    fetchTrackers,
  } = useGetTrackers();

  useEffect(() => {
    fetchTrackers();
  }, []);

  if (isTrackerLoading) {
    return <PageLoader message="Loading trackers page..." />;
  }

  if (trackerError) {
    return (
      <PageError
        message={trackerError}
        onRetry={() => {
          fetchTrackers();
        }}
      />
    );
  }

  const tooltipClass =
    "rounded-[var(--radius-md)] border border-[var(--border)] bg-[var(--card)] px-3 py-2 text-xs font-medium text-[var(--text)] shadow-lg";

  console.log("trackers", trackers);

  return (
    <section className="space-y-8">
      <div className="flex items-center justify-between ">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-[var(--text)] sm:text-4xl">
            Trackers
          </h1>
          <p className="mt-2 max-w-2xl text-sm leading-6 text-[var(--muted)] sm:text-base">
            Manage your career tracker page monitors.
          </p>
        </div>

        <Button
          type="button"
          onClick={() => router.push(RouteEnum.ADD_TRACKER)}
          className="inline-flex justify-center items-center rounded-[var(--radius-md)] bg-[var(--primary)] px-4 py-3 text-sm font-medium text-white transition hover:bg-[var(--primary-hover)]"
        >
          <FiPlusCircle size={16} className="mr-2" />
          Add Tracker
        </Button>
      </div>

      <div className="overflow-hidden rounded-[var(--radius-lg)] border border-[var(--border)] bg-[var(--card)] shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full min-w-[1000px] table-fixed text-left text-sm">
            <thead className="bg-[var(--surface)]  border-b border-[var(--border)] text-xs uppercase tracking-wide text-[var(--muted)]">
              <tr>
                <th className="w-[120px] pl-5 pr-2 py-3 font-semibold">
                  Company
                </th>
                <th className="w-[140px] pl-5 pr-2 py-3 font-semibold">
                  Label
                </th>
                <th className="w-[200px] pl-5 pr-2 py-3 font-semibold">URL</th>
                <th className="w-[120px] pl-5 pr-2 py-3 font-semibold">
                  Last Checked
                </th>
                <th className="w-[120px] pl-5 pr-2 py-3 font-semibold">
                  Last Changed
                </th>
                <th className="w-[100px] pl-5 pr-2 py-3 font-semibold">
                  Status
                </th>
                <th className="w-[140px] pl-2 pr-5 py-3 font-semibold">
                  Actions
                </th>
              </tr>
            </thead>

            <tbody className="divide-y divide-[var(--border)]">
              {trackers.map((tracker, index) => (
                <tr
                  key={`${index}`}
                  className="transition hover:bg-[var(--surface-hover)]"
                >
                  <td className="pl-5 pr-2 py-4 font-medium text-[var(--text)]">
                    {tracker.company_name}
                  </td>
                  <td className="pl-5 pr-2 py-4 font-medium text-[var(--muted)]">
                    {tracker.label}
                  </td>
                  <td className="pl-5 pr-2 py-4 font-medium text-[var(--muted)]">
                    <p className="max-w-[320px] [overflow-wrap:anywhere]">
                      {tracker.url}
                    </p>
                  </td>
                  <td className="pl-5 pr-2 py-4 text-[var(--muted)]">
                    {formatDate(tracker.last_changed_at)}
                  </td>
                  <td className="pl-5 pr-2 py-4 text-[var(--muted)]">
                    {formatDate(tracker.last_checked_at)}
                  </td>
                  <td className="pl-5 pr-2 py-4">
                    <span
                      className={`inline-flex rounded-full px-2.5 py-1 text-xs font-medium ${getStatusClass(
                        tracker.status
                      )}`}
                    >
                      {tracker.status}
                    </span>
                  </td>
                  <td className="pl-2 pr-5 py-4">
                    <div className="flex items-center gap-2">
                      <Tooltip delay={0}>
                        <Button
                          type="button"
                          isIconOnly
                          aria-label={
                            tracker.status === "PAUSED"
                              ? "Resume tracker"
                              : "Pause tracker"
                          }
                          className="h-9 w-9 min-w-0 p-0 text-[var(--muted)] transition hover:text-[var(--primary)] cursor-pointer"
                        >
                          {tracker.status === "PAUSED" ? (
                            <FiPlayCircle size={16} />
                          ) : (
                            <FiPauseCircle size={16} />
                          )}
                        </Button>

                        <Tooltip.Content className={tooltipClass}>
                          <p>
                            {tracker.status === "PAUSED"
                              ? "Resume tracker"
                              : "Pause tracker"}
                          </p>
                        </Tooltip.Content>
                      </Tooltip>

                      <Tooltip delay={0}>
                        <Button
                          type="button"
                          isIconOnly
                          aria-label="View tracker"
                          className="h-9 w-9 min-w-0 p-0 text-[var(--muted)] transition hover:text-[var(--primary)] cursor-pointer"
                        >
                          <FiEye size={16} />
                        </Button>

                        <Tooltip.Content className={tooltipClass}>
                          <p>View tracker</p>
                        </Tooltip.Content>
                      </Tooltip>

                      <Tooltip delay={0}>
                        <Button
                          type="button"
                          isIconOnly
                          aria-label="Edit tracker"
                          className="h-9 w-9 min-w-0 p-0 text-[var(--muted)] transition hover:text-[var(--primary)] cursor-pointer"
                        >
                          <FiEdit2 size={16} />
                        </Button>

                        <Tooltip.Content className={tooltipClass}>
                          <p>Edit tracker</p>
                        </Tooltip.Content>
                      </Tooltip>

                      {/* // Fix this not showing */}
                      <Tooltip delay={0}>
                        <Link
                          href={tracker.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          aria-label="Open tracker URL"
                          className="h-9 w-9 min-w-0 flex items-center justify-center p-0 text-[var(--muted)] transition hover:text-[var(--primary)]"
                        >
                          <FiExternalLink size={16} />
                        </Link>

                        <Tooltip.Content className="z-50 rounded-[var(--radius-md)] border border-[var(--border)] bg-[var(--card)] px-3 py-2 text-xs font-medium text-[var(--text)] shadow-lg">
                          Open career page
                        </Tooltip.Content>
                      </Tooltip>

                      <Tooltip delay={0}>
                        <Button
                          type="button"
                          isIconOnly
                          aria-label="Delete tracker"
                          className="h-9 w-9 min-w-0 p-0 text-red-500 transition hover:text-red-600"
                        >
                          <FiTrash2 size={16} />
                        </Button>

                        <Tooltip.Content className="rounded-[var(--radius-md)] border border-[var(--border)] bg-[var(--card)] px-3 py-2 text-xs font-medium text-[var(--text)] shadow-lg">
                          Delete tracker
                        </Tooltip.Content>
                      </Tooltip>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
};
