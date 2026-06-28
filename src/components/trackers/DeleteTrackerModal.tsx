"use client";

import { Button } from "@heroui/react";
import { FiAlertTriangle, FiTrash2, FiX } from "react-icons/fi";

type DeleteTrackerModalProps = {
  isOpen: boolean;
  trackerName?: string;
  isLoading?: boolean;
  onClose: () => void;
  onConfirm: () => Promise<void> | void;
};

export const DeleteTrackerModal = ({
  isOpen,
  trackerName,
  isLoading = false,
  onClose,
  onConfirm,
}: DeleteTrackerModalProps) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/45 px-4 py-6 backdrop-blur-sm">
      <div className="w-full max-w-md rounded-[var(--radius-lg)] border border-[var(--border)] bg-[var(--card)] p-5 shadow-2xl sm:p-6">
        <div className="flex items-start justify-between gap-4">
          <div className="flex items-start gap-3">
            <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-[var(--radius-md)] bg-red-100 text-red-600 dark:bg-red-500/15 dark:text-red-400">
              <FiAlertTriangle size={22} />
            </div>

            <div>
              <h2 className="text-lg font-bold text-[var(--text)]">
                Delete Tracker
              </h2>

              <p className="mt-1 text-sm leading-6 text-[var(--muted)]">
                Are you sure you want to delete{" "}
                <span className="font-semibold text-[var(--text)]">
                  {trackerName || "this tracker"}
                </span>
                ? This action cannot be undone.
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={onClose}
            disabled={isLoading}
            className="rounded-[var(--radius-md)] p-2 text-[var(--muted)] transition hover:bg-[var(--surface-hover)] hover:text-[var(--text)] disabled:cursor-not-allowed disabled:opacity-60"
            aria-label="Close delete modal"
          >
            <FiX size={20} />
          </button>
        </div>

        <div className="mt-6 flex flex-col-reverse gap-3 sm:flex-row sm:justify-end">
          <Button
            type="button"
            onClick={onClose}
            isDisabled={isLoading}
            className="rounded-[var(--radius-md)] border border-[var(--border)] bg-[var(--card)] px-5 py-2 text-sm font-medium text-[var(--text)] transition hover:bg-[var(--surface-hover)] disabled:cursor-not-allowed disabled:opacity-60"
          >
            Cancel
          </Button>

          <Button
            type="button"
            onClick={onConfirm}
            isDisabled={isLoading}
            className="flex items-center justify-center gap-2 rounded-[var(--radius-md)] bg-red-600 px-5 py-2 text-sm font-medium text-white transition hover:bg-red-700 disabled:cursor-not-allowed disabled:opacity-60"
          >
            <FiTrash2 size={16} />
            {isLoading ? "Deleting..." : "Delete Tracker"}
          </Button>
        </div>
      </div>
    </div>
  );
};