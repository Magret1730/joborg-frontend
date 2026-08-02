"use client";

// import { useGetChanges } from "@/hooks/changes/useGetChanges";
import { useAlerts } from "@/hooks/alerts/useGetAlerts";
import { useEffect, useState } from "react";
import { formatDate } from "@/lib/dateFormatter";
import { PageError, PageLoader } from "@/components/ui/PageState";
import { FiEye, FiExternalLink, FiMoreVertical } from "react-icons/fi";
import { Button, Dropdown, Label } from "@heroui/react";
import { RouteEnum } from "@/enum/RouteEnum";

const PAGE_SIZE = 10;

const paginateItems = <T,>(items: T[], page: number) => {
  const start = (page - 1) * PAGE_SIZE;
  return items.slice(start, start + PAGE_SIZE);
};

const getTotalPages = (itemsLength: number) => {
  return Math.max(1, Math.ceil(itemsLength / PAGE_SIZE));
};

export const AlertsClient = () => {
  const [alertsPage, setAlertsPage] = useState(1);

  const {
    alerts,
    isLoading: isAlertsLoading,
    error: alertsError,
    fetchAlerts,
  } = useAlerts();

  const paginatedAlerts = paginateItems(alerts, alertsPage);
  const totalAlertsPages = getTotalPages(alerts.length);

  const totalAlerts = alerts?.length || 0;

  const alertsStart =
    totalAlerts === 0 ? 0 : (alertsPage - 1) * PAGE_SIZE + 1;
  const alertsEnd = Math.min(alertsPage * PAGE_SIZE, totalAlerts);

  useEffect(() => {
    fetchAlerts();
  }, []);

  if (isAlertsLoading) {
    return <PageLoader message="Loading alerts page..." />;
  }

  if (alertsError) {
    return (
      <PageError
        message={alertsError}
        onRetry={() => {
          fetchAlerts();
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
            Alerts
          </h1>
          <p className="mt-2 max-w-2xl text-sm leading-6 text-[var(--muted)] sm:text-base">
            View all detected alerts to your tracked pages.
          </p>
        </div>
      </div>

      <div className="overflow-hidden rounded-[var(--radius-lg)] border border-[var(--border)] bg-[var(--card)] shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full min-w-[1000px] table-fixed text-left text-sm">
            <thead className="bg-[var(--surface)]  border-b border-[var(--border)] text-xs uppercase tracking-wide text-[var(--muted)]">
              <tr>
                <th className="w-[140px] pl-5 pr-2 py-3 font-semibold">
                  Company
                </th>
                <th className="w-[240px] pl-5 pr-2 py-3 font-semibold">
                  Tracker URL
                </th>
                <th className="w-[130px] pl-5 pr-2 py-3 font-semibold">
                  Detected At
                </th>
                <th className="w-[130px] pl-5 pr-2 py-3 font-semibold">
                  Sent At
                </th>
                <th className="w-[100px] pl-5 pr-2 py-3 font-semibold">
                  Status
                </th>
                <th className="w-[100px] pl-5 pr-2 py-3 font-semibold">
                  Channel
                </th>
                <th className="w-[60px] pl-2 pr-5 py-3 font-semibold text-right">
                  Actions
                </th>
              </tr>
            </thead>

            <tbody className="divide-y divide-[var(--border)]">
              {paginatedAlerts.length === 0 ? (
                <tr>
                  <td
                    colSpan={7}
                    className="text-center py-8 text-[var(--muted)]"
                  >
                    No alerts found.
                  </td>
                </tr>
              ) : (
                paginatedAlerts.map((alert, index) => (
                  <tr
                    key={`${index}`}
                    className="transition hover:bg-[var(--surface-hover)]"
                  >
                    <td className="pl-5 pr-2 py-4 font-medium text-[var(--text)]">
                      {alert.company_name}
                    </td>
                    <td className="pl-5 pr-2 py-4 font-medium text-[var(--muted)]">
                      <p className="max-w-[320px] [overflow-wrap:anywhere]">
                        {alert.url}
                      </p>
                    </td>
                    <td className="pl-5 pr-2 py-4 text-[var(--muted)]">
                      {formatDate(alert.detected_at)}
                    </td>
                    <td className="pl-5 pr-2 py-4 text-[var(--muted)]">
                      {formatDate(alert.sent_at)}
                    </td>
                    <td className="pl-5 pr-2 py-4 text-[var(--muted)]">
                      {alert.status.toUpperCase()}
                    </td>
                    <td className="pl-5 pr-2 py-4 text-[var(--muted)]">
                      {alert.channel.toUpperCase()}
                    </td>
                    <td className="pl-2 pr-5 py-4">
                      <Dropdown>
                        <Button
                          type="button"
                          isIconOnly
                          aria-label="Open alert actions"
                          className="ml-auto flex h-9 w-9 min-w-0 items-center justify-center rounded-full border border-[var(--border)] bg-[var(--card)] p-0 text-[var(--muted)] shadow-sm transition hover:border-[var(--primary)] hover:bg-[var(--surface-hover)] hover:text-[var(--primary)]"
                        >
                          <FiMoreVertical size={16} />
                        </Button>
                        <Dropdown.Popover>
                          <Dropdown.Menu className="p-2 rounded-[var(--radius-md)] border border-[var(--border)] bg-[var(--card)] shadow-lg flex flex-col gap-2">
                            <Dropdown.Item
                              id="view-alerts"
                              textValue="View alerts"
                              className="flex items-center gap-2 cursor-pointer"
                              href={RouteEnum.ALERTS + `/${alert.tracker_id}`}
                            >
                              <FiEye className="size-4 shrink-0 text-muted" />
                              <Label className="text-sm">View Alert</Label>
                            </Dropdown.Item>

                            <Dropdown.Item
                              id="open-url"
                              textValue="Open URL"
                              className="flex items-center gap-2 cursor-pointer"
                              href={alert.url}
                              target="_blank"
                            >
                              <FiExternalLink className="size-4 shrink-0 text-muted" />
                              <Label className="text-sm">
                                Open URL
                              </Label>
                            </Dropdown.Item>

                            <Dropdown.Item
                              id="view-tracker"
                              textValue="View Tracker"
                              className="flex items-center gap-2 cursor-pointer"
                              href={`/trackers/${alert.tracker_id}`}
                            >
                              <FiEye className="size-4 shrink-0 text-muted" />
                              <Label className="text-sm">
                                View Tracker
                              </Label>
                            </Dropdown.Item>

                            <Dropdown.Item
                              id="view-alerts-by-tracker"
                              textValue="View Tracker alerts"
                              className="flex items-center gap-2 cursor-pointer"
                              href={RouteEnum.ALERTS + `/${alert.tracker_id}/trackerAlerts`}
                            >
                              <FiEye className="size-4 shrink-0 text-muted" />
                              <Label className="text-sm">
                                View Tracker Changes
                              </Label>
                            </Dropdown.Item>
                          </Dropdown.Menu>
                        </Dropdown.Popover>
                      </Dropdown>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Pagination bar */}
      <div className="flex items-center justify-between">
        <p className="text-sm text-[var(--muted)]">
          Showing {alertsStart}-{alertsEnd} of {totalAlerts} alerts.
        </p>
        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            size="sm"
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
            variant="outline"
            size="sm"
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
    </section>
  );
};
