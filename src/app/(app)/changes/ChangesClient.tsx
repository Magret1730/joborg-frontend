"use client";
import { useGetChanges } from "@/hooks/changes/useGetChanges";
import { useEffect } from "react";
import { formatDate } from "@/lib/dateFormatter";
import Link from "next/link";
import { getStatusClass } from "@/lib/getStatusClass";
import { PageError, PageLoader } from "@/components/ui/PageState";
import { FiEye, FiExternalLink } from "react-icons/fi";
import { Button, Tooltip } from "@heroui/react";
import { toast } from "react-toastify";
import posthog from "posthog-js";

export const ChangesClient = () => {
  const {
    changes,
    isLoading: isChangesLoading,
    error: changesError,
    fetchChanges,
  } = useGetChanges();

  console.log("ChangesClient changes:", changes);

  useEffect(() => {
    fetchChanges();
  }, []);

  if (isChangesLoading) {
    return <PageLoader message="Loading changes page..." />;
  }

  if (changesError) {
    return (
      <PageError
        message={changesError}
        onRetry={() => {
          fetchChanges();
        }}
      />
    );
  }

  const tooltipClass =
    "rounded-[var(--radius-md)] border border-[var(--border)] bg-[var(--card)] px-3 py-2 text-xs font-medium text-[var(--text)] shadow-lg";

  return (
    <section className="space-y-8">
      <div className="flex items-center justify-between ">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-[var(--text)] sm:text-4xl">
            Changes
          </h1>
          <p className="mt-2 max-w-2xl text-sm leading-6 text-[var(--muted)] sm:text-base">
            View all detected changes to your tracked pages.
          </p>
        </div>
      </div>

      <div className="overflow-hidden rounded-[var(--radius-lg)] border border-[var(--border)] bg-[var(--card)] shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full min-w-[1000px] table-fixed text-left text-sm">
            <thead className="bg-[var(--surface)]  border-b border-[var(--border)] text-xs uppercase tracking-wide text-[var(--muted)]">
              <tr>
                <th className="w-[120px] pl-5 pr-2 py-3 font-semibold">
                  Company
                </th>
                <th className="w-[200px] pl-5 pr-2 py-3 font-semibold">
                  Tracker URL
                </th>
                <th className="w-[130px] pl-5 pr-2 py-3 font-semibold">
                  Created At
                </th>
                <th className="w-[130px] pl-5 pr-2 py-3 font-semibold">
                  Detected At
                </th>
                <th className="w-[80px] pl-5 pr-2 py-3 font-semibold">
                  Notification Sent
                </th>
                <th className="w-[120px] pl-2 pr-5 py-3 font-semibold">
                  Actions
                </th>
              </tr>
            </thead>

            <tbody className="divide-y divide-[var(--border)]">
              {changes.length === 0 ? (
                <tr>
                  <td
                    colSpan={7}
                    className="text-center py-8 text-[var(--muted)]"
                  >
                    No changes found.
                  </td>
                </tr>
              ) : (
                changes.map((change, index) => (
                  <tr
                    key={`${index}`}
                    className="transition hover:bg-[var(--surface-hover)]"
                  >
                    <td className="pl-5 pr-2 py-4 font-medium text-[var(--text)]">
                      {change.company_name}
                    </td>
                    <td className="pl-5 pr-2 py-4 font-medium text-[var(--muted)]">
                      <p className="max-w-[320px] [overflow-wrap:anywhere]">
                        {change.url}
                      </p>
                    </td>
                    <td className="pl-5 pr-2 py-4 text-[var(--muted)]">
                      {formatDate(change.created_at)}
                    </td>

                    <td className="pl-5 pr-2 py-4 text-[var(--muted)]">
                      {formatDate(change.detected_at)}
                    </td>
                    <td className="pl-5 pr-2 py-4 text-[var(--muted)]">
                      {change.notification_sent ? "Yes" : "No"}
                    </td>
                    <td className="pl-2 pr-5 py-4">
                      <div className="flex items-center gap-2">
                       
                        <Tooltip delay={0}>
                          <Link
                            href={`/changes/${change.id}`}
                            type="button"
                            aria-label="View change"
                            className="h-9 w-9 min-w-0 flex items-center justify-center p-0 text-[var(--muted)] transition hover:text-[var(--primary)] cursor-pointer"
                          >
                            <FiEye size={16} />
                          </Link>

                          <Tooltip.Content className={tooltipClass}>
                            <p>View changes</p>
                          </Tooltip.Content>
                        </Tooltip>

                     
                        <Tooltip delay={0}>
                          <Link
                            href={change.url}
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
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
};
