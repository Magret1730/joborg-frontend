"use client";

import Link from "next/link";
import { Button } from "@heroui/react";
import { RouteEnum } from "@/enum/RouteEnum";
import {
  FiArrowLeft,
  FiExternalLink,
  FiGlobe,
  FiClock,
  FiRefreshCcw,
  FiActivity,
} from "react-icons/fi";
import { PageLoader } from "@/components/ui/PageState";
import { formatDate } from "@/lib/dateFormatter";
import { getStatusClass } from "@/lib/getStatusClass";
import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { useGetAlertsByTracker } from "@/hooks/alerts/useGetAlertsByTracker";

const PAGE_SIZE = 10;

const paginateItems = <T,>(items: T[], page: number) => {
  const start = (page - 1) * PAGE_SIZE;
  return items.slice(start, start + PAGE_SIZE);
};

const getTotalPages = (itemsLength: number) => {
  return Math.max(1, Math.ceil(itemsLength / PAGE_SIZE));
};

export default function TrackerChanges() {
  const params = useParams();
  const router = useRouter();

  const alertId = params?.id as string;

  const {
    alerts,
    isLoading: isAlertsLoading,
    error: alertsError,
    fetchAlerts,
  } = useGetAlertsByTracker();

  const [alertsPage, setAlertsPage] = useState(1);

  const paginatedAlerts = paginateItems(alerts, alertsPage);
  const totalAlertsPages = getTotalPages(alert.length);

  const firstAlert = alerts?.[0];

  useEffect(() => {
    if (!alertId) return;

    fetchAlerts(alertId);
  }, [alertId]);

  if (isAlertsLoading) {
    return <PageLoader message="Loading recent alerts..." />;
  }

  const totalAlerts = alerts?.length || 0;

  const alertsStart =
    totalAlerts === 0 ? 0 : (alertsPage - 1) * PAGE_SIZE + 1;
  const alertsEnd = Math.min(alertsPage * PAGE_SIZE, totalAlerts);

  return (
    <section className="space-y-6">
      {/* Back link */}
      <Link
        href={RouteEnum.ALERTS}
        className="inline-flex items-center gap-2 text-sm font-medium text-[var(--muted)] transition hover:text-[var(--primary)]"
      >
        <FiArrowLeft size={16} />
        Back to Alerts
      </Link>

      {/* Header */}
      <div className="rounded-[var(--radius-lg)] border border-[var(--border)] bg-[var(--card)] p-5 shadow-sm sm:p-6">
        <div className="flex flex-col gap-5 lg:flex-row lg:items-start lg:justify-between">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
            <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-[var(--radius-lg)] bg-blue-100 text-[var(--primary)] dark:bg-blue-500/15">
              <FiGlobe size={30} />
            </div>

            <div className="min-w-0">
              <div className="flex flex-wrap items-center gap-3">
                <h1 className="text-2xl font-bold tracking-tight text-[var(--text)] sm:text-3xl">
                  {firstAlert?.company_name}
                </h1>

                <span
                  className={`inline-flex rounded-full px-2.5 py-1 text-xs font-medium ${getStatusClass(
                    firstAlert?.status?.toLowerCase() || ""
                  )}`}
                >
                  {firstAlert?.status}
                </span>
              </div>

              <p className="text-sm text-[var(--muted)]">
                {firstAlert?.label}
              </p>

              <Link
                href={firstAlert?.url || "#"}
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm font-medium text-[var(--primary)] hover:underline mt-2 inline-flex max-w-full items-center gap-2"
              >
                <span className="truncate">{firstAlert?.url}</span>
                <FiExternalLink size={14} />
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Summary cards */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <div className="rounded-[var(--radius-lg)] border border-[var(--border)] bg-[var(--card)] p-5 shadow-sm">
          <div className="flex items-center gap-3">
            <div className="flex h-11 w-11 items-center justify-center rounded-[var(--radius-md)] bg-blue-100 text-blue-600 dark:bg-blue-500/15 dark:text-blue-300">
              <FiClock size={20} />
            </div>
            <div>
              <p className="text-sm text-[var(--muted)]">Date Last Sent</p>
              <p className="mt-1 text-sm font-semibold text-[var(--text)]">
                {formatDate(firstAlert?.sent_at)}
              </p>
            </div>
          </div>
        </div>

        <div className="rounded-[var(--radius-lg)] border border-[var(--border)] bg-[var(--card)] p-5 shadow-sm">
          <div className="flex items-center gap-3">
            <div className="flex h-11 w-11 items-center justify-center rounded-[var(--radius-md)] bg-blue-100 text-blue-600 dark:bg-blue-500/15 dark:text-blue-300">
              <FiClock size={20} />
            </div>
            <div>
              <p className="text-sm text-[var(--muted)]">Last Checked</p>
              <p className="mt-1 text-sm font-semibold text-[var(--text)]">
                {formatDate(firstAlert?.detected_at)}
              </p>
            </div>
          </div>
        </div>

        <div className="rounded-[var(--radius-lg)] border border-[var(--border)] bg-[var(--card)] p-5 shadow-sm">
          <div className="flex items-center gap-3">
            <div className="flex h-11 w-11 items-center justify-center rounded-[var(--radius-md)] bg-purple-100 text-purple-600 dark:bg-purple-500/15 dark:text-purple-300">
              <FiRefreshCcw size={20} />
            </div>
            <div>
              <p className="text-sm text-[var(--muted)]">Last Alert Detected</p>
              <p className="mt-1 text-sm font-semibold text-[var(--text)]">
                {formatDate(firstAlert?.detected_at)}
              </p>
            </div>
          </div>
        </div>

        <div className="rounded-[var(--radius-lg)] border border-[var(--border)] bg-[var(--card)] p-5 shadow-sm">
          <div className="flex items-center gap-3">
            <div className="flex h-11 w-11 items-center justify-center rounded-[var(--radius-md)] bg-emerald-100 text-emerald-600 dark:bg-emerald-500/15 dark:text-emerald-300">
              <FiActivity size={20} />
            </div>
            <div>
              <p className="text-sm text-[var(--muted)]">Total Alerts</p>
              <p className="mt-1 text-2xl font-bold text-[var(--text)]">
                {totalAlerts}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Activity Sections */}
      <div className="space-y-6">
        {/* Recent Alerts */}
        <div className="rounded-[var(--radius-lg)] border border-[var(--border)] bg-[var(--card)] shadow-sm">
          <div className="flex flex-col gap-3 border-b border-[var(--border)] px-5 py-4 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <h2 className="text-lg font-semibold text-[var(--text)]">
                Recent Page Alerts
              </h2>
              <p className="mt-1 text-sm text-[var(--muted)]">
                Latest updates detected for this tracker.
              </p>
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full min-w-[760px] table-fixed text-left text-sm">
              <thead className="bg-[var(--surface)] text-xs uppercase tracking-wide text-[var(--muted)]">
                <tr>
                  <th className="w-[200px] px-5 py-3 font-semibold">
                    Detected At
                  </th>
                  <th className="w-[200px] px-5 py-3 font-semibold">
                    Sent At
                  </th>
                  <th className="w-[150px] px-5 py-3 font-semibold">
                    Status
                  </th>
                  <th className="w-[150px] px-5 py-3 font-semibold">
                    Channel
                  </th>
                </tr>
              </thead>

              <tbody className="divide-y divide-[var(--border)]">
                {paginatedAlerts.length === 0 ? (
                  <tr>
                    <td colSpan={4} className="px-5 py-10 text-center">
                      <p className="text-sm font-medium text-[var(--text)]">
                        No alerts detected yet
                      </p>
                      <p className="mt-1 text-sm text-[var(--muted)]">
                        Joborg will show detected alerts updates here when this
                        tracker changes.
                      </p>
                    </td>
                  </tr>
                ) : (
                  paginatedAlerts.map((alert) => (
                    <tr
                      key={alert.id}
                      className="transition hover:bg-[var(--surface-hover)]"
                    >
                      <td className="px-5 py-4 align-top text-[var(--muted)]">
                        {formatDate(alert.detected_at)}
                      </td>

                      <td className="px-5 py-4 align-top">
                        {formatDate(alert.sent_at)}
                      </td>

                      <td className="px-5 py-4 align-top">
                        {alert.status}
                      </td>

                      <td className="px-5 py-4 align-top">
                        <span className="inline-flex rounded-full bg-blue-100 px-2.5 py-1 text-xs font-medium text-blue-700 dark:bg-blue-500/15 dark:text-blue-300">
                          {alert.channel.toUpperCase()}
                        </span>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>

          {/* Pagination bar */}
          <div className="flex flex-col gap-3 border-t border-[var(--border)] px-5 py-4 sm:flex-row sm:items-center sm:justify-between">
            <p className="text-sm text-[var(--muted)]">
              Showing {alertsStart}–{alertsEnd} of {totalAlerts} alerts
            </p>

            <div className="flex items-center gap-2">
              <Button
                type="button"
                isDisabled={alertsPage === 1}
                onClick={() => setAlertsPage((prev) => Math.max(1, prev - 1))}
                className="rounded-[var(--radius-md)] border border-[var(--border)] bg-[var(--card)] px-3 py-2 text-sm text-[var(--text)] transition hover:bg-[var(--surface-hover)] disabled:cursor-not-allowed disabled:opacity-50"
              >
                Previous
              </Button>

              <span className="text-sm text-[var(--muted)]">
                Page {alertsPage} of {totalAlertsPages}
              </span>

              <Button
                type="button"
                isDisabled={alertsPage === totalAlertsPages}
                onClick={() =>
                  setAlertsPage((prev) =>
                    Math.min(totalAlertsPages, prev + 1)
                  )
                }
                className="rounded-[var(--radius-md)] border border-[var(--border)] bg-[var(--card)] px-3 py-2 text-sm text-[var(--text)] transition hover:bg-[var(--surface-hover)] disabled:cursor-not-allowed disabled:opacity-50"
              >
                Next
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
