"use client";

import Link from "next/link";
import { Button } from "@heroui/react";
import { RouteEnum } from "@/enum/RouteEnum";
import {
  FiArrowLeft,
  FiExternalLink,
  FiGlobe,
  FiClock,
  FiBell,
  FiActivity,
  FiRefreshCcw,
} from "react-icons/fi";
import { PageError, PageLoader } from "@/components/ui/PageState";
import { formatDate } from "@/lib/dateFormatter";
import { getStatusClass } from "@/lib/getStatusClass";
import { useEffect } from "react";
import { useParams } from "next/navigation";
import { useGetChange } from "@/hooks/changes/useGetChange";

export default function ChangeDetails() {
  const params = useParams();

  const changeId = params?.id as string;

  const {
    change,
    isLoading: isChangeLoading,
    error: changeError,
    fetchChange,
  } = useGetChange();

  useEffect(() => {
    if (!changeId) return;

    fetchChange(changeId);
  }, [changeId]);

  if (isChangeLoading) {
    return <PageLoader message="Loading change details..." />;
  }

  if (changeError) {
    return (
      <PageError
        message={changeError}
        onRetry={() => {
          fetchChange(changeId);
        }}
      />
    );
  }

  // Handles both cases:
  // 1. change is an object
  // 2. change is an array with one object
  const selectedChange = Array.isArray(change) ? change[0] : change;

  if (!selectedChange) {
    return (
      <PageError
        message="Change record not found."
        onRetry={() => {
          fetchChange(changeId);
        }}
      />
    );
  }

  return (
    <section className="space-y-6">
      {/* Back link */}
      <Link
        href={RouteEnum.CHANGES}
        className="inline-flex items-center gap-2 text-sm font-medium text-[var(--muted)] transition hover:text-[var(--primary)]"
      >
        <FiArrowLeft size={16} />
        Back to Changes
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
                  {selectedChange.company_name}
                </h1>

                <span
                  className={`inline-flex rounded-full px-2.5 py-1 text-xs font-medium ${getStatusClass(
                    selectedChange.status?.toLowerCase() || ""
                  )}`}
                >
                  {selectedChange.status}
                </span>
              </div>

              <p className="mt-1 text-sm text-[var(--muted)]">
                {selectedChange.label || "No label"}
              </p>

              <a
                href={selectedChange.url}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-2 inline-flex max-w-full items-center gap-2 text-sm font-medium text-[var(--primary)] hover:underline"
              >
                <span className="truncate">{selectedChange.url}</span>
                <FiExternalLink size={14} />
              </a>
            </div>
          </div>

          {/* Actions */}
          <div className="flex flex-wrap gap-2">
            <Link
              href={`/trackers/${selectedChange.tracker_id}`}
              className="flex items-center justify-center gap-2 rounded-[var(--radius-md)] border border-[var(--border)] bg-[var(--card)] px-4 py-2 text-sm font-medium text-[var(--text)] transition hover:border-[var(--primary)] hover:bg-[var(--surface-hover)] hover:text-[var(--primary)]"
            >
              <FiActivity size={16} />
              View Tracker
            </Link>

            <a
              href={selectedChange.url}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-2 rounded-[var(--radius-md)] border border-[var(--border)] bg-[var(--card)] px-4 py-2 text-sm font-medium text-[var(--text)] transition hover:border-[var(--primary)] hover:bg-[var(--surface-hover)] hover:text-[var(--primary)]"
            >
              <FiExternalLink size={16} />
              Open URL
            </a>
          </div>
        </div>
      </div>

      {/* Summary cards */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-2">
        <div className="rounded-[var(--radius-lg)] border border-[var(--border)] bg-[var(--card)] p-5 shadow-sm">
          <div className="flex items-center gap-3">
            <div className="flex h-11 w-11 items-center justify-center rounded-[var(--radius-md)] bg-blue-100 text-blue-600 dark:bg-blue-500/15 dark:text-blue-300">
              <FiClock size={20} />
            </div>
            <div>
              <p className="text-sm text-[var(--muted)]">Detected At</p>
              <p className="mt-1 text-sm font-semibold text-[var(--text)]">
                {formatDate(selectedChange.detected_at)}
              </p>
            </div>
          </div>
        </div>

        <div className="rounded-[var(--radius-lg)] border border-[var(--border)] bg-[var(--card)] p-5 shadow-sm">
          <div className="flex items-center gap-3">
            <div className="flex h-11 w-11 items-center justify-center rounded-[var(--radius-md)] bg-purple-100 text-purple-600 dark:bg-purple-500/15 dark:text-purple-300">
              <FiActivity size={20} />
            </div>
            <div>
              <p className="text-sm text-[var(--muted)]">Tracker Status</p>
              <p className="mt-1 text-sm font-semibold text-[var(--text)]">
                {selectedChange.status}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Change summary */}
      <div className="rounded-[var(--radius-lg)] border border-[var(--border)] bg-[var(--card)] shadow-sm">
        <div className="border-b border-[var(--border)] px-5 py-4">
          <h2 className="text-lg font-semibold text-[var(--text)]">
            Change Summary
          </h2>
          <p className="mt-1 text-sm text-[var(--muted)]">
            Details about the page update Joborg detected.
          </p>
        </div>

        <div className="space-y-5 p-5">
          <div className="rounded-[var(--radius-md)] border border-[var(--border)] bg-[var(--surface)] p-4">
            <p className="text-sm font-medium text-[var(--text)]">
              Page content changed
            </p>
            <p className="mt-1 text-sm text-[var(--muted)]">
              Joborg detected a new version of this tracked career page. Open
              the page to review the latest content.
            </p>
          </div>

          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            <div className="rounded-[var(--radius-md)] border border-[var(--border)] p-4">
              <p className="text-sm font-medium text-[var(--muted)]">Company</p>
              <p className="mt-1 text-sm font-semibold text-[var(--text)]">
                {selectedChange.company_name}
              </p>
            </div>

            <div className="rounded-[var(--radius-md)] border border-[var(--border)] p-4">
              <p className="text-sm font-medium text-[var(--muted)]">
                Tracker Label
              </p>
              <p className="mt-1 text-sm font-semibold text-[var(--text)]">
                {selectedChange.label || "No label"}
              </p>
            </div>

            <div className="rounded-[var(--radius-md)] border border-[var(--border)] p-4">
              <p className="text-sm font-medium text-[var(--muted)]">
                Detected At
              </p>
              <p className="mt-1 text-sm font-semibold text-[var(--text)]">
                {formatDate(selectedChange.detected_at)}
              </p>
            </div>

            <div className="rounded-[var(--radius-md)] border border-[var(--border)] p-4">
              <p className="text-sm font-medium text-[var(--muted)]">
                Tracked URL
              </p>

              <a
                href={selectedChange.url}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-1 inline-flex max-w-full items-center gap-2 text-sm font-semibold text-[var(--primary)] hover:underline"
              >
                <span className="truncate">{selectedChange.url}</span>
                <FiExternalLink size={14} />
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}