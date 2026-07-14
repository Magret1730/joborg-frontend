"use client";
import { useGetChanges } from "@/hooks/changes/useGetChanges";
import { useGetChange } from "@/hooks/changes/useGetChange";
import { useEffect, useState } from "react";
import { formatDate } from "@/lib/dateFormatter";
import Link from "next/link";
import { PageError, PageLoader } from "@/components/ui/PageState";
import { FiEye, FiExternalLink, FiMoreVertical } from "react-icons/fi";
import { Button, Tooltip, Dropdown, Kbd, Label } from "@heroui/react";

const PAGE_SIZE = 10;

const paginateItems = <T,>(items: T[], page: number) => {
  const start = (page - 1) * PAGE_SIZE;
  return items.slice(start, start + PAGE_SIZE);
};

const getTotalPages = (itemsLength: number) => {
  return Math.max(1, Math.ceil(itemsLength / PAGE_SIZE));
};

export const ChangesClient = () => {
  const [changesPage, setChangesPage] = useState(1);

  const {
    changes,
    isLoading: isChangesLoading,
    error: changesError,
    fetchChanges,
  } = useGetChanges();

  const {
    change,
    isLoading: isChangeLoading,
    error: changeError,
    fetchChange,
  } = useGetChange();

  const paginatedChanges = paginateItems(changes, changesPage);
  const totalChangesPages = getTotalPages(changes.length);

  const totalChanges = changes?.length || 0;

  const changesStart =
    totalChanges === 0 ? 0 : (changesPage - 1) * PAGE_SIZE + 1;
  const changesEnd = Math.min(changesPage * PAGE_SIZE, totalChanges);

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
                <th className="w-[140px] pl-5 pr-2 py-3 font-semibold">
                  Company
                </th>
                <th className="w-[240px] pl-5 pr-2 py-3 font-semibold">
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
                <th className="w-[60px] pl-2 pr-5 py-3 font-semibold text-right">
                  Actions
                </th>
              </tr>
            </thead>

            <tbody className="divide-y divide-[var(--border)]">
              {paginatedChanges.length === 0 ? (
                <tr>
                  <td
                    colSpan={7}
                    className="text-center py-8 text-[var(--muted)]"
                  >
                    No changes found.
                  </td>
                </tr>
              ) : (
                paginatedChanges.map((change, index) => (
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
                      <Dropdown>
                        <Button
                          type="button"
                          isIconOnly
                          aria-label="Open change actions"
                          className="ml-auto flex h-9 w-9 min-w-0 items-center justify-center rounded-full border border-[var(--border)] bg-[var(--card)] p-0 text-[var(--muted)] shadow-sm transition hover:border-[var(--primary)] hover:bg-[var(--surface-hover)] hover:text-[var(--primary)]"
                        >
                          <FiMoreVertical size={16} />
                        </Button>
                        <Dropdown.Popover>
                          <Dropdown.Menu
                            // onAction={(key) => console.log(`Selected: ${key}`)}
                            className="p-2 rounded-[var(--radius-md)] border border-[var(--border)] bg-[var(--card)] shadow-lg flex flex-col gap-2"
                          >
                            <Dropdown.Item
                              id="view-changes"
                              textValue="View changes"
                              className="flex items-center gap-2 cursor-pointer"
                              href={`/changes/${change.id}`}
                            >
                              <FiEye className="size-4 shrink-0 text-muted" />
                              <Label className="text-sm">
                                View Change
                              </Label>
                            </Dropdown.Item>
                            <Dropdown.Item
                              id="open-career-page"
                              textValue="Open Career Page"
                              className="flex items-center gap-2 cursor-pointer"
                              href={change.url}
                              target="_blank"
                            >
                              <FiExternalLink className="size-4 shrink-0 text-muted" />
                              <Label className="text-sm">
                                Open URL
                              </Label>
                            </Dropdown.Item>
                            <Dropdown.Item
                              id="open-career-page"
                              textValue="Open Career Page"
                              className="flex items-center gap-2 cursor-pointer"
                              href={`/changes/change/${change.id}`}
                              target="_blank"
                            >
                              <FiExternalLink className="size-4 shrink-0 text-muted" />
                              <Label>View Tracker Changes</Label>
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
          Showing {changesStart}-{changesEnd} of {totalChanges} changes.
        </p>
        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            size="sm"
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
            variant="outline"
            size="sm"
            isDisabled={changesPage === totalChangesPages}
            onClick={() =>
              setChangesPage((prev) => Math.min(totalChangesPages, prev + 1))
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
