"use client";

import Link from "next/link";
import {
  FiBell,
  FiBriefcase,
  FiCheckCircle,
  FiExternalLink,
  FiGrid,
  FiPauseCircle,
  FiRefreshCcw,
} from "react-icons/fi";
import { RouteEnum } from "@/enum/RouteEnum";

const stats = [
  {
    label: "Total Trackers",
    value: 24,
    icon: FiGrid,
    iconClass: "bg-blue-100 text-blue-600 dark:bg-blue-500/15 dark:text-blue-400",
  },
  {
    label: "Active Trackers",
    value: 18,
    icon: FiCheckCircle,
    iconClass:
      "bg-emerald-100 text-emerald-600 dark:bg-emerald-500/15 dark:text-emerald-400",
  },
  {
    label: "Paused Trackers",
    value: 6,
    icon: FiPauseCircle,
    iconClass:
      "bg-amber-100 text-amber-600 dark:bg-amber-500/15 dark:text-amber-400",
  },
  {
    label: "Changes Detected",
    value: 9,
    icon: FiRefreshCcw,
    iconClass:
      "bg-purple-100 text-purple-600 dark:bg-purple-500/15 dark:text-purple-400",
  },
  {
    label: "Alerts Sent",
    value: 15,
    icon: FiBell,
    iconClass:
      "bg-green-100 text-green-600 dark:bg-green-500/15 dark:text-green-400",
  },
];

const recentChanges = [
  {
    company: "Stripe",
    url: "careers.stripe.com",
    detectedAt: "Today, 10:30 AM",
    status: "New Change",
  },
  {
    company: "Vercel",
    url: "vercel.com/careers",
    detectedAt: "Today, 9:15 AM",
    status: "New Change",
  },
  {
    company: "Linear",
    url: "linear.app/careers",
    detectedAt: "Yesterday, 4:20 PM",
    status: "Reviewed",
  },
  {
    company: "Notion",
    url: "notion.so/careers",
    detectedAt: "Yesterday, 2:45 PM",
    status: "New Change",
  },
  {
    company: "Figma",
    url: "figma.com/careers",
    detectedAt: "Jun 22, 6:20 PM",
    status: "Reviewed",
  },
];

const recentAlerts = [
  {
    company: "Stripe",
    alertType: "Page Change",
    sentAt: "Today, 10:31 AM",
    status: "Delivered",
  },
  {
    company: "Vercel",
    alertType: "Page Change",
    sentAt: "Today, 9:16 AM",
    status: "Delivered",
  },
  {
    company: "Notion",
    alertType: "Page Change",
    sentAt: "Yesterday, 2:46 PM",
    status: "Failed",
  },
  {
    company: "Linear",
    alertType: "Tracker Update",
    sentAt: "Yesterday, 4:22 PM",
    status: "Delivered",
  },
  {
    company: "Figma",
    alertType: "Page Change",
    sentAt: "Jun 22, 6:21 PM",
    status: "Delivered",
  },
];

const getStatusClass = (status: string) => {
  switch (status.toLowerCase()) {
    case "new change":
      return "bg-blue-100 text-blue-700 dark:bg-blue-500/15 dark:text-blue-300";
    case "reviewed":
      return "bg-slate-100 text-slate-700 dark:bg-slate-700/60 dark:text-slate-300";
    case "delivered":
      return "bg-emerald-100 text-emerald-700 dark:bg-emerald-500/15 dark:text-emerald-300";
    case "failed":
      return "bg-red-100 text-red-700 dark:bg-red-500/15 dark:text-red-300";
    default:
      return "bg-slate-100 text-slate-700 dark:bg-slate-700/60 dark:text-slate-300";
  }
};

export const DashboardClient = () => {
  return (
    <section className="space-y-8">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-[var(--text)] sm:text-4xl">
            Dashboard
          </h1>
          <p className="mt-2 max-w-2xl text-sm leading-6 text-[var(--muted)] sm:text-base">
            Overview of your career page monitoring.
          </p>
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
              href={RouteEnum.CHANGES}
              className="text-sm font-medium text-[var(--primary)] hover:underline"
            >
              View all
            </Link>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full min-w-[650px] text-left text-sm">
              <thead className="bg-[var(--surface)] text-xs uppercase tracking-wide text-[var(--muted)]">
                <tr>
                  <th className="px-5 py-3 font-semibold">Company</th>
                  <th className="px-5 py-3 font-semibold">URL</th>
                  <th className="px-5 py-3 font-semibold">Detected At</th>
                  <th className="px-5 py-3 font-semibold">Status</th>
                  <th className="px-5 py-3 font-semibold"></th>
                </tr>
              </thead>

              <tbody className="divide-y divide-[var(--border)]">
                {recentChanges.map((change) => (
                  <tr
                    key={`${change.company}-${change.detectedAt}`}
                    className="transition hover:bg-[var(--surface-hover)]"
                  >
                    <td className="px-5 py-4 font-medium text-[var(--text)]">
                      {change.company}
                    </td>
                    <td className="px-5 py-4 text-[var(--muted)]">
                      {change.url}
                    </td>
                    <td className="px-5 py-4 text-[var(--muted)]">
                      {change.detectedAt}
                    </td>
                    <td className="px-5 py-4">
                      <span
                        className={`inline-flex rounded-full px-2.5 py-1 text-xs font-medium ${getStatusClass(
                          change.status
                        )}`}
                      >
                        {change.status}
                      </span>
                    </td>
                    <td className="px-5 py-4">
                      <FiExternalLink className="text-[var(--muted)]" />
                    </td>
                  </tr>
                ))}
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
            <table className="w-full min-w-[650px] text-left text-sm">
              <thead className="bg-[var(--surface)] text-xs uppercase tracking-wide text-[var(--muted)]">
                <tr>
                  <th className="px-5 py-3 font-semibold">Company</th>
                  <th className="px-5 py-3 font-semibold">Alert Type</th>
                  <th className="px-5 py-3 font-semibold">Sent At</th>
                  <th className="px-5 py-3 font-semibold">Status</th>
                </tr>
              </thead>

              <tbody className="divide-y divide-[var(--border)]">
                {recentAlerts.map((alert) => (
                  <tr
                    key={`${alert.company}-${alert.sentAt}`}
                    className="transition hover:bg-[var(--surface-hover)]"
                  >
                    <td className="px-5 py-4 font-medium text-[var(--text)]">
                      {alert.company}
                    </td>
                    <td className="px-5 py-4 text-[var(--muted)]">
                      {alert.alertType}
                    </td>
                    <td className="px-5 py-4 text-[var(--muted)]">
                      {alert.sentAt}
                    </td>
                    <td className="px-5 py-4">
                      <span
                        className={`inline-flex rounded-full px-2.5 py-1 text-xs font-medium ${getStatusClass(
                          alert.status
                        )}`}
                      >
                        {alert.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </section>
  );
}