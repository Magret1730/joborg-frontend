"use client";

import Link from "next/link";
import { Button } from "@heroui/react";
import { RouteEnum } from "@/enum/RouteEnum";
import {
  FiArrowLeft,
  FiBell,
  FiEdit2,
  FiExternalLink,
  FiGlobe,
  FiPauseCircle,
  FiPlayCircle,
  FiTrash2,
  FiClock,
  FiRefreshCcw,
  FiMail,
  FiActivity,
} from "react-icons/fi";
import { PageError, PageLoader } from "@/components/ui/PageState";
import { formatDate } from "@/lib/dateFormatter";
import { getStatusClass } from "@/lib/getStatusClass";
import { TrackerStatusEnum } from "@/enum/TrackerEnum";
import { useEffect, useState } from "react";
import { useGetTracker } from "@/hooks/trackers/useGetTracker";
import { useParams } from "next/navigation";
import { useGetAlert } from "@/hooks/alerts/useGetAlert";
import { useGetChange } from "@/hooks/changes/useGetChange";
import { usePauseTracker } from "@/hooks/trackers/usePauseTracker";
import { useResumeTracker } from "@/hooks/trackers/useResumeTracker";

const PAGE_SIZE = 5;

const paginateItems = <T,>(items: T[], page: number) => {
  const start = (page - 1) * PAGE_SIZE;
  return items.slice(start, start + PAGE_SIZE);
};

const getTotalPages = (itemsLength: number) => {
  return Math.max(1, Math.ceil(itemsLength / PAGE_SIZE));
};

export default function TrackerDetails() {
  const params = useParams();

  const trackerId = params?.id as string;

  const {
    tracker,
    isLoading: isTrackerLoading,
    error: trackerError,
    fetchTracker,
  } = useGetTracker();

  const {
    pause,
    isLoading: isPauseLoading,
    error: pauseError,
  } = usePauseTracker();

  const {
    resume,
    isLoading: isResumeLoading,
    error: resumeError,
  } = useResumeTracker();

  const {
    alert,
    isLoading: isAlertsLoading,
    error: alertsError,
    fetchAlert,
  } = useGetAlert();

  const {
    change,
    isLoading: isChangesLoading,
    error: changesError,
    fetchChange,
  } = useGetChange();

  const [changesPage, setChangesPage] = useState(1);
  const [alertsPage, setAlertsPage] = useState(1);

  const paginatedChanges = paginateItems(change, changesPage);
  const paginatedAlerts = paginateItems(alert, alertsPage);

  const totalChangesPages = getTotalPages(change.length);
  const totalAlertsPages = getTotalPages(alert.length);

  useEffect(() => {
    if (!trackerId) return;

    fetchTracker(trackerId);
    fetchAlert(trackerId);
    fetchChange(trackerId);
  }, [trackerId]);

  const handleToggleTrackerStatus = async () => {
    if (!tracker?.id) return;
  
    if (tracker.status === TrackerStatusEnum.PAUSED) {
      await resume(tracker.id);
    } else {
      await pause(tracker.id);
    }
  
    await fetchTracker(tracker.id);
  };

  if (isTrackerLoading) {
    return <PageLoader message="Loading tracker page..." />;
  }

  if (isAlertsLoading) {
    return <PageLoader message="Loading alert history..." />;
  }

  if (isChangesLoading) {
    return <PageLoader message="Loading recent changes..." />;
  }

  // if (isPauseLoading || isResumeLoading) {
  //   return <PageLoader message="Updating tracker status..." />;
  // }

  if (trackerError) {
    return (
      <PageError
        message={trackerError}
        onRetry={() => {
          fetchTracker(trackerId);
        }}
      />
    );
  }

  if (alertsError) {
    return (
      <PageError
        message={alertsError}
        onRetry={() => {
          fetchAlert(trackerId);
        }}
      />
    );
  }

  if (pauseError) {
    return (
      <PageError
        message={pauseError}
        onRetry={() => {
          fetchChange(trackerId)
        }}
      />
    );
  }

  if (resumeError) {
    return (
      <PageError
        message={resumeError}
        onRetry={() => {
          fetchChange(trackerId)
        }}
      />
    );
  }

  if (changesError) {
    return (
      <PageError
        message={changesError}
        onRetry={() => {
          fetchChange(trackerId);
        }}
      />
    );
  }

  const isPaused = tracker?.status === TrackerStatusEnum.PAUSED;
  const totalAlerts = alert?.length || 0;
  const totalChanges = change?.length || 0;

  const changesStart =
    totalChanges === 0 ? 0 : (changesPage - 1) * PAGE_SIZE + 1;
  const changesEnd = Math.min(changesPage * PAGE_SIZE, totalChanges);

  const alertsStart = totalAlerts === 0 ? 0 : (alertsPage - 1) * PAGE_SIZE + 1;
  const alertsEnd = Math.min(alertsPage * PAGE_SIZE, totalAlerts);

  return (
    <section className="space-y-6">
      {/* Back link */}
      <Link
        href={RouteEnum.TRACKERS}
        className="inline-flex items-center gap-2 text-sm font-medium text-[var(--muted)] transition hover:text-[var(--primary)]"
      >
        <FiArrowLeft size={16} />
        Back to Trackers
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
                  {tracker?.company_name}
                </h1>

                <span
                  className={`inline-flex rounded-full px-2.5 py-1 text-xs font-medium ${getStatusClass(
                    tracker?.status?.toLowerCase() || ""
                  )}`}
                >
                  {tracker?.status}
                </span>
              </div>

              <p className="text-sm text-[var(--muted)]">{tracker?.label}</p>

              <Button
                type="button"
                onClick={() =>
                  window.open(tracker?.url, "_blank", "noopener,noreferrer")
                }
                className="mt-2 inline-flex max-w-full items-center gap-2 text-sm font-medium text-[var(--primary)] hover:underline"
              >
                <span className="truncate">{tracker?.url}</span>
                <FiExternalLink size={14} />
              </Button>
            </div>
          </div>

          {/* Actions */}
          <div className="flex flex-wrap gap-2">
            <Button
              type="button"
              onClick={() =>
                window.open(tracker?.url, "_blank", "noopener,noreferrer")
              }
              className="flex items-center justify-center gap-2 rounded-[var(--radius-md)] border border-[var(--border)] bg-[var(--card)] px-4 py-2 text-sm font-medium text-[var(--text)] transition hover:border-[var(--primary)] hover:bg-[var(--surface-hover)] hover:text-[var(--primary)]"
            >
              <FiExternalLink size={16} />
              Open URL
            </Button>

            <Button
              type="button"
              className="flex items-center justify-center gap-2 rounded-[var(--radius-md)] border border-[var(--border)] bg-[var(--card)] px-4 py-2 text-sm font-medium text-[var(--text)] transition hover:border-[var(--primary)] hover:bg-[var(--surface-hover)] hover:text-[var(--primary)]"
            >
              <FiEdit2 size={16} />
              Edit
            </Button>

            <Button
              type="button"
              className="flex items-center justify-center gap-2 rounded-[var(--radius-md)] border border-[var(--border)] bg-[var(--card)] px-4 py-2 text-sm font-medium text-[var(--text)] transition hover:border-[var(--primary)] hover:bg-[var(--surface-hover)] hover:text-[var(--primary)]"
              onClick={handleToggleTrackerStatus}
            >
              {tracker?.status === TrackerStatusEnum.PAUSED ? (
                <FiPlayCircle size={16} />
              ) : (
                <FiPauseCircle size={16} />
              )}
              {tracker?.status === TrackerStatusEnum.PAUSED ? "Resume" : "Pause"}
            </Button>

            <Button
              type="button"
              className="flex items-center justify-center gap-2 rounded-[var(--radius-md)] border border-red-200 bg-transparent px-4 py-2 text-sm font-medium text-red-500 transition hover:bg-red-50 dark:border-red-500/30 dark:hover:bg-red-500/10"
            >
              <FiTrash2 size={16} />
              Delete
            </Button>
          </div>
        </div>
      </div>

      {/* Summary cards */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-5">
        <div className="rounded-[var(--radius-lg)] border border-[var(--border)] bg-[var(--card)] p-5 shadow-sm">
          <div className="flex items-center gap-3">
            <div className="flex h-11 w-11 items-center justify-center rounded-[var(--radius-md)] bg-blue-100 text-blue-600 dark:bg-blue-500/15 dark:text-blue-300">
              <FiClock size={20} />
            </div>
            <div>
              <p className="text-sm text-[var(--muted)]">Date Created</p>
              <p className="mt-1 text-sm font-semibold text-[var(--text)]">
                {formatDate(tracker?.created_at)}
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
                {formatDate(tracker?.last_checked_at)}
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
              <p className="text-sm text-[var(--muted)]">Last Changed</p>
              <p className="mt-1 text-sm font-semibold text-[var(--text)]">
                {formatDate(tracker?.last_changed_at)}
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
              <p className="text-sm text-[var(--muted)]">Total Changes</p>
              <p className="mt-1 text-2xl font-bold text-[var(--text)]">
                {totalChanges}
              </p>
            </div>
          </div>
        </div>

        <div className="rounded-[var(--radius-lg)] border border-[var(--border)] bg-[var(--card)] p-5 shadow-sm">
          <div className="flex items-center gap-3">
            <div className="flex h-11 w-11 items-center justify-center rounded-[var(--radius-md)] bg-amber-100 text-amber-600 dark:bg-amber-500/15 dark:text-amber-300">
              <FiBell size={20} />
            </div>
            <div>
              <p className="text-sm text-[var(--muted)]">Alerts Sent</p>
              <p className="mt-1 text-2xl font-bold text-[var(--text)]">
                {totalAlerts}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Activity Sections */}
      <div className="space-y-6">
        {/* Recent Changes */}
        <div className="rounded-[var(--radius-lg)] border border-[var(--border)] bg-[var(--card)] shadow-sm">
          <div className="flex flex-col gap-3 border-b border-[var(--border)] px-5 py-4 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <h2 className="text-lg font-semibold text-[var(--text)]">
                Recent Page Changes
              </h2>
              <p className="mt-1 text-sm text-[var(--muted)]">
                Latest updates detected for this tracker.
              </p>
            </div>

            <Link
              href={RouteEnum.CHANGES}
              className="text-sm font-medium text-[var(--primary)] hover:underline"
            >
              View all changes
            </Link>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full min-w-[760px] table-fixed text-left text-sm">
              <thead className="bg-[var(--surface)] text-xs uppercase tracking-wide text-[var(--muted)]">
                <tr>
                  <th className="w-[190px] px-5 py-3 font-semibold">
                    Detected At
                  </th>
                  <th className="w-[360px] px-5 py-3 font-semibold">Change</th>
                  <th className="w-[160px] px-5 py-3 font-semibold">
                    Alert Status
                  </th>
                  <th className="w-[140px] px-5 py-3 font-semibold">
                    Tracker Status
                  </th>
                </tr>
              </thead>

              <tbody className="divide-y divide-[var(--border)]">
                {paginatedChanges.length === 0 ? (
                  <tr>
                    <td colSpan={4} className="px-5 py-10 text-center">
                      <p className="text-sm font-medium text-[var(--text)]">
                        No changes detected yet
                      </p>
                      <p className="mt-1 text-sm text-[var(--muted)]">
                        Joborg will show detected page updates here when this
                        tracker changes.
                      </p>
                    </td>
                  </tr>
                ) : (
                  paginatedChanges.map((change) => (
                    <tr
                      key={change.id}
                      className="transition hover:bg-[var(--surface-hover)]"
                    >
                      <td className="px-5 py-4 align-top text-[var(--muted)]">
                        {formatDate(change.detected_at)}
                      </td>

                      <td className="px-5 py-4 align-top">
                        <div>
                          <p className="font-medium text-[var(--text)]">
                            Page content changed
                          </p>
                          <p className="mt-1 text-xs text-[var(--muted)]">
                            A new version of this career page was detected.
                          </p>
                        </div>
                      </td>

                      <td className="px-5 py-4 align-top">
                        <span
                          className={`inline-flex rounded-full px-2.5 py-1 text-xs font-medium ${
                            change.notification_sent
                              ? "bg-emerald-100 text-emerald-700 dark:bg-emerald-500/15 dark:text-emerald-300"
                              : "bg-amber-100 text-amber-700 dark:bg-amber-500/15 dark:text-amber-300"
                          }`}
                        >
                          {change.notification_sent
                            ? "Alert sent"
                            : "Alert pending"}
                        </span>
                      </td>

                      <td className="px-5 py-4 align-top">
                        <span className="inline-flex rounded-full bg-blue-100 px-2.5 py-1 text-xs font-medium text-blue-700 dark:bg-blue-500/15 dark:text-blue-300">
                          {change.status}
                        </span>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>

          <div className="flex flex-col gap-3 border-t border-[var(--border)] px-5 py-4 sm:flex-row sm:items-center sm:justify-between">
            <p className="text-sm text-[var(--muted)]">
              Showing {changesStart}–{changesEnd} of {totalChanges} changes
            </p>

            <div className="flex items-center gap-2">
              <Button
                type="button"
                isDisabled={changesPage === 1}
                onClick={() => setChangesPage((prev) => Math.max(1, prev - 1))}
                className="rounded-[var(--radius-md)] border border-[var(--border)] bg-[var(--card)] px-3 py-2 text-sm text-[var(--text)] transition hover:bg-[var(--surface-hover)] disabled:cursor-not-allowed disabled:opacity-50"
              >
                Previous
              </Button>

              <span className="text-sm text-[var(--muted)]">
                Page {changesPage} of {totalChangesPages}
              </span>

              <Button
                type="button"
                isDisabled={changesPage === totalChangesPages}
                onClick={() =>
                  setChangesPage((prev) =>
                    Math.min(totalChangesPages, prev + 1)
                  )
                }
                className="rounded-[var(--radius-md)] border border-[var(--border)] bg-[var(--card)] px-3 py-2 text-sm text-[var(--text)] transition hover:bg-[var(--surface-hover)] disabled:cursor-not-allowed disabled:opacity-50"
              >
                Next
              </Button>
            </div>
          </div>
        </div>

        {/* Alert History */}
        <div className="rounded-[var(--radius-lg)] border border-[var(--border)] bg-[var(--card)] shadow-sm">
          <div className="flex flex-col gap-3 border-b border-[var(--border)] px-5 py-4 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <h2 className="text-lg font-semibold text-[var(--text)]">
                Alert History
              </h2>
              <p className="mt-1 text-sm text-[var(--muted)]">
                Recent notifications sent for this tracker.
              </p>
            </div>

            <Link
              href={RouteEnum.ALERTS}
              className="text-sm font-medium text-[var(--primary)] hover:underline"
            >
              View all alerts
            </Link>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full min-w-[820px] table-fixed text-left text-sm">
              <thead className="bg-[var(--surface)] text-xs uppercase tracking-wide text-[var(--muted)]">
                <tr>
                  <th className="w-[150px] px-5 py-3 font-semibold">Channel</th>
                  <th className="w-[280px] px-5 py-3 font-semibold">
                    Recipient
                  </th>
                  <th className="w-[210px] px-5 py-3 font-semibold">Sent At</th>
                  <th className="w-[140px] px-5 py-3 font-semibold">Status</th>
                </tr>
              </thead>

              <tbody className="divide-y divide-[var(--border)]">
                {totalAlerts === 0 ? (
                  <tr>
                    <td
                      colSpan={4}
                      className="px-5 py-4 text-center text-[var(--muted)]"
                    >
                      No alerts sent for this tracker yet.
                    </td>
                  </tr>
                ) : (
                  paginatedAlerts.map((alert) => (
                    <tr
                      key={alert.id}
                      className="transition hover:bg-[var(--surface-hover)]"
                    >
                      <td className="px-5 py-4 align-top">
                        <span className="inline-flex items-center gap-2 font-medium text-[var(--text)]">
                          <FiMail size={15} />
                          {alert.channel.charAt(0).toUpperCase() +
                            alert.channel.slice(1).toLowerCase()}
                        </span>
                      </td>

                      <td className="px-5 py-4 align-top text-[var(--muted)]">
                        <span className="break-all">{alert.recipient}</span>
                      </td>

                      <td className="px-5 py-4 align-top text-[var(--muted)]">
                        {formatDate(alert.sent_at)}
                      </td>

                      <td className="px-5 py-4 align-top">
                        <span
                          className={`inline-flex rounded-full px-2.5 py-1 text-xs font-medium ${getStatusClass(
                            alert.status
                          )}`}
                        >
                          {alert.status}
                        </span>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>

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
                  setAlertsPage((prev) => Math.min(totalAlertsPages, prev + 1))
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
