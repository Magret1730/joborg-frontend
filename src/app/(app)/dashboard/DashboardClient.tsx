"use client";

import Link from "next/link";
import {
  FiBell,
  FiCheckCircle,
  FiExternalLink,
  FiGrid,
  FiPauseCircle,
  FiPlusCircle,
} from "react-icons/fi";
import { RouteEnum } from "@/enum/RouteEnum";
import { useEffect, useState } from "react";
import { useGetTrackers } from "@/hooks/trackers/useGetTrackers";
import { PageError, PageLoader } from "@/components/ui/PageState";
import { TrackerStatusEnum } from "@/enum/TrackerEnum";
import { formatDate } from "@/lib/dateFormatter";
import { useAlerts } from "@/hooks/alerts/useGetAlerts";
import { getStatusClass } from "@/lib/getStatusClass";
import { Button } from "@heroui/react";
import { useRouter } from "next/navigation";
import { usePostTracker } from "@/hooks/trackers/usePostTracker";
import { TrackerModalMode } from "@/enum/TrackerModalEnum";
import { TrackerPayload } from "@/types/tracker.type";
import { toast } from "react-toastify";
import { TrackerModal } from "@/components/trackers/TrackerModal";

export const DashboardClient = () => {
  const router = useRouter();

  const [isTrackerModalOpen, setIsTrackerModalOpen] = useState(false);
  const [trackerModalMode, setTrackerModalMode] = useState<TrackerModalMode>(
    TrackerModalMode.ADD
  );
  const [selectedTracker, setSelectedTracker] = useState<TrackerPayload | null>(
    null
  );

  const {
    trackers,
    isLoading: isTrackerLoading,
    error: trackerError,
    fetchTrackers,
  } = useGetTrackers();

  const {
    alerts,
    isLoading: isAlertsLoading,
    error: alertsError,
    fetchAlerts,
  } = useAlerts();

  const {
    createTracker,
    isLoading: isCreateLoading,
    error: isCreateError,
  } = usePostTracker();

  const openAddTrackerModal = () => {
    setTrackerModalMode(TrackerModalMode.ADD);
    setSelectedTracker(null);
    setIsTrackerModalOpen(true);
  };

  const closeTrackerModal = () => {
    setIsTrackerModalOpen(false);
    setSelectedTracker(null);
  };

  const dontCloseTrackerModal = () => {
    setIsTrackerModalOpen(true);
  };

  useEffect(() => {
    fetchTrackers();
    fetchAlerts();
  }, []);

  const handleSaveTracker = async (payload: {
    company_name: string;
    url: string;
    label?: string;
    status: string;
  }) => {
    try {
      const response = await createTracker(payload);

      if (!response?.success) {
        toast.error(response?.message || "Failed to create tracker.");
        return;
      }

      toast.success(
        response?.message ||
          `Tracker "${payload.company_name}" created successfully.`
      );

      await fetchTrackers();

      // close only after success
      closeTrackerModal();
    } catch (error) {
      const message =
        error instanceof Error ? error.message : "Failed to save tracker.";

      toast.error(message);

      // do not close modal
      dontCloseTrackerModal();
    }
  };

  // Sort trackers by last_changed_at in descending order and slice the first 5
  const slicedTrackers = trackers.slice(0, 5).sort((a, b) => {
    const dateA = new Date(a.last_changed_at).getTime();
    const dateB = new Date(b.last_changed_at).getTime();

    return dateB - dateA; // Sort in descending order
  });

  // Sort alerts by sent_at in descending order and slice the first 5
  const slicedAlerts = alerts.slice(0, 5);

  if (isTrackerLoading || isAlertsLoading) {
    return <PageLoader message="Loading dashboard..." />;
  }

  if (trackerError || alertsError) {
    return (
      <PageError
        message={trackerError || alertsError}
        onRetry={() => {
          fetchTrackers();
          fetchAlerts();
        }}
      />
    );
  }

  const totalTrackers = trackers.length;
  const activeTrackers = trackers.filter(
    (tracker) => tracker.status === TrackerStatusEnum.ACTIVE
  ).length;
  const pausedTrackers = trackers.filter(
    (tracker) => tracker.status === TrackerStatusEnum.PAUSED
  ).length;
  const alertsSent = alerts.length;

  const stats: {
    label: string;
    value: number;
    icon: React.ComponentType<{ size?: string | number }>;
    iconClass: string;
  }[] = [
    {
      label: "Total Trackers",
      value: totalTrackers,
      icon: FiGrid,
      iconClass:
        "bg-blue-100 text-blue-600 dark:bg-blue-500/15 dark:text-blue-400",
    },
    {
      label: "Active Trackers",
      value: activeTrackers,
      icon: FiCheckCircle,
      iconClass:
        "bg-emerald-100 text-emerald-600 dark:bg-emerald-500/15 dark:text-emerald-400",
    },
    {
      label: "Paused Trackers",
      value: pausedTrackers,
      icon: FiPauseCircle,
      iconClass:
        "bg-amber-100 text-amber-600 dark:bg-amber-500/15 dark:text-amber-400",
    },
    // {
    //   label: "Changes Detected",
    //   value: 9,
    //   icon: FiRefreshCcw,
    //   iconClass:
    //     "bg-purple-100 text-purple-600 dark:bg-purple-500/15 dark:text-purple-400",
    // },
    {
      label: "Alerts Sent",
      value: alertsSent,
      icon: FiBell,
      iconClass:
        "bg-green-100 text-green-600 dark:bg-green-500/15 dark:text-green-400",
    },
  ];

  return (
    <section className="space-y-8">
      <div className="flex items-center justify-between ">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-[var(--text)] sm:text-4xl">
            Dashboard
          </h1>
          <p className="mt-2 max-w-2xl text-sm leading-6 text-[var(--muted)] sm:text-base">
            Overview of your career page monitoring.
          </p>
        </div>

        <Button
          type="button"
          className="my-4 inline-flex justify-center items-center rounded-[var(--radius-md)] bg-[var(--primary)] px-4 py-3 text-sm font-medium text-white transition hover:bg-[var(--primary-hover)] cursor-pointer"
          onClick={openAddTrackerModal}
        >
          <FiPlusCircle size={16} className="mr-2" />
          Add Tracker
        </Button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-5">
        {stats.map((stat) => {
          const Icon = stat.icon;

          return (
            <div
              key={stat.label}
              className="rounded-[var(--radius-lg)] border border-[var(--border)] bg-[var(--card)] p-5 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md"
            >
              <div className="flex items-start justify-between gap-4">
                <div>
                  <p className="text-sm font-medium text-[var(--muted)]">
                    {stat.label}
                  </p>
                  <h2 className="mt-3 text-3xl font-bold text-[var(--text)]">
                    {stat.value}
                  </h2>
                </div>

                <div
                  className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-[var(--radius-md)] ${stat.iconClass}`}
                >
                  <Icon size={20} />
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Tables */}
      <div className="grid grid-cols-1 gap-5 xl:grid-cols-2">
        {/* Recent Page Changes */}
        <div className="overflow-hidden rounded-[var(--radius-lg)] border border-[var(--border)] bg-[var(--card)] shadow-sm">
          <div className="flex items-center justify-between border-b border-[var(--border)] px-5 py-4">
            <div>
              <h2 className="text-base font-semibold text-[var(--text)]">
                Recent Page Changes
              </h2>
              <p className="mt-1 text-xs text-[var(--muted)]">
                Latest detected updates from tracked career pages.
              </p>
            </div>

            <Link
              href={RouteEnum.TRACKERS}
              className="text-sm font-medium text-[var(--primary)] hover:underline"
            >
              View all
            </Link>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full min-w-[520px] table-fixed text-left text-sm">
              <thead className="bg-[var(--surface)] text-xs uppercase tracking-wide text-[var(--muted)]">
                <tr>
                  <th className="w-[140px] pl-5 pr-2 py-3 font-semibold">
                    Company
                  </th>
                  <th className="w-[120px] pl-5 pr-2 py-3 font-semibold">
                    Last Checked
                  </th>
                  <th className="w-[120px] pl-5 pr-2 py-3 font-semibold">
                    Last Changed
                  </th>
                  <th className="w-[100px] pl-5 pr-2 py-3 font-semibold">
                    Status
                  </th>
                  <th className="w-[40px] pl-2 pr-5 py-3 font-semibold"></th>
                </tr>
              </thead>

              <tbody className="divide-y divide-[var(--border)]">
                {trackers.length === 0 ? (
                  <tr>
                    <td
                      colSpan={5}
                      className="text-center py-4 text-[var(--muted)]"
                    >
                      <div className="flex flex-col items-center justify-center gap-2">
                        <p>No trackers added yet.</p>
                        <Button
                          type="button"
                          onClick={() => router.push(RouteEnum.ADD_TRACKER)}
                          className="my-4 inline-flex justify-center items-center rounded-[var(--radius-md)] bg-[var(--primary)] px-4 py-3 text-sm font-medium text-white transition hover:bg-[var(--primary-hover)]"
                        >
                          <FiPlusCircle size={16} className="mr-2" />
                          Add Tracker
                        </Button>
                      </div>
                    </td>
                  </tr>
                ) : (
                  slicedTrackers.map((tracker, index) => (
                    <tr
                      key={`${index}`}
                      className="transition hover:bg-[var(--surface-hover)] cursor-pointer"
                      onClick={() => router.push(`/trackers/${tracker.id}`)}
                    >
                      <td className="pl-5 pr-2 py-4 font-medium text-[var(--text)]">
                        {tracker.company_name}
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
                      <td className="pl-2 pr-5 py-4 cursor-pointer">
                        <Link href={tracker.url} target="_blank">
                          <FiExternalLink className="text-[var(--muted)]" />
                        </Link>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>

        {/* Recent Alerts */}
        <div className="overflow-hidden rounded-[var(--radius-lg)] border border-[var(--border)] bg-[var(--card)] shadow-sm">
          <div className="flex items-center justify-between border-b border-[var(--border)] px-5 py-4">
            <div>
              <h2 className="text-base font-semibold text-[var(--text)]">
                Recent Alerts
              </h2>
              <p className="mt-1 text-xs text-[var(--muted)]">
                Email notifications sent from tracker activity.
              </p>
            </div>

            <Link
              href={RouteEnum.ALERTS}
              className="text-sm font-medium text-[var(--primary)] hover:underline"
            >
              View all
            </Link>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full min-w-[540px] table-fixed text-left text-sm">
              <thead className="bg-[var(--surface)] text-xs uppercase tracking-wide text-[var(--muted)]">
                <tr>
                  <th className="w-[160px] pl-5 pr-2 py-3 font-semibold">
                    Company
                  </th>
                  <th className="w-[120px] pl-5 pr-2 py-3 font-semibold">
                    Channel
                  </th>
                  <th className="w-[140px] pl-5 pr-2 py-3 font-semibold">
                    Sent At
                  </th>
                  <th className="w-[100px] pl-2 pr-5 py-3 font-semibold">
                    Status
                  </th>
                </tr>
              </thead>

              <tbody className="divide-y divide-[var(--border)]">
                {alerts.length === 0 ? (
                  <tr>
                    <td
                      colSpan={4}
                      className="text-center py-4 text-[var(--muted)]"
                    >
                      <div className="flex flex-col items-center justify-center gap-2">
                        <p>No alerts sent yet.</p>
                        <Button
                          type="button"
                          onClick={() => router.push(RouteEnum.ADD_TRACKER)}
                          className="inline-flex justify-center items-center rounded-[var(--radius-md)] bg-[var(--primary)] px-4 py-3 text-sm font-medium text-white transition hover:bg-[var(--primary-hover)]"
                        >
                          <FiPlusCircle size={16} className="mr-2" />
                          Add Tracker
                        </Button>
                      </div>
                    </td>
                  </tr>
                ) : (
                  slicedAlerts.map((alert, index) => (
                    <tr
                      key={index}
                      className="transition hover:bg-[var(--surface-hover)]"
                    >
                      <td className="pl-5 pr-2 py-4 font-medium text-[var(--text)]">
                        {alert.company_name}
                      </td>
                      <td className="pl-5 pr-2 py-4 text-[var(--muted)]">
                        {alert.channel.charAt(0).toUpperCase() +
                          alert.channel.slice(1)}{" "}
                        Alert
                      </td>
                      <td className="pl-5 pr-2 py-4 text-[var(--muted)]">
                        {formatDate(alert.sent_at)}
                      </td>
                      <td className="pl-2 pr-5 py-4">
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
        </div>
      </div>

      {/* *************************************************************** */}
      <TrackerModal
        isOpen={isTrackerModalOpen}
        mode={trackerModalMode}
        tracker={selectedTracker}
        isLoading={isCreateLoading}
        onClose={closeTrackerModal}
        onSubmit={handleSaveTracker}
      />
    </section>
  );
};
