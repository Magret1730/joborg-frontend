"use client";

import { useEffect, useState } from "react";
import { Button } from "@heroui/react";
import {
  FiBriefcase,
  FiLink,
  FiPlus,
  FiEdit2,
  FiX,
  FiPlusCircle,
} from "react-icons/fi";
import { TrackerPayload } from "@/types/tracker.type";
import { TrackerStatusEnum } from "@/enum/TrackerEnum";
import { Spinner } from "../ui/Spinner";
import { TrackerModalMode } from "@/enum/TrackerModalEnum";

// type TrackerModalMode = "add" | "edit";

type TrackerModalProps = {
  isOpen: boolean;
  mode: TrackerModalMode;
  tracker?: TrackerPayload | null;
  isLoading?: boolean;
  onClose: () => void;
  onSubmit: (payload: {
    company_name: string;
    url: string;
    label?: string;
    status: string;
  }) => Promise<void>;
};

export const TrackerModal = ({
  isOpen,
  mode,
  tracker,
  isLoading = false,
  onClose,
  onSubmit,
}: TrackerModalProps) => {
  const [companyName, setCompanyName] = useState("");
  const [url, setUrl] = useState("");
  const [label, setLabel] = useState("");
  const [status, setStatus] = useState(TrackerStatusEnum.ACTIVE);

  const isEditMode = mode === TrackerModalMode.EDIT;

  useEffect(() => {
    if (!isOpen) return;

    if (isEditMode && tracker) {
      setCompanyName(tracker.company_name || "");
      setUrl(tracker.url || "");
      setLabel(tracker.label || "");
      setStatus(
        (tracker.status as TrackerStatusEnum) || TrackerStatusEnum.ACTIVE
      );
    } else {
      setCompanyName("");
      setUrl("");
      setLabel("");
      setStatus(TrackerStatusEnum.ACTIVE);
    }
  }, [isOpen, isEditMode, tracker]);

  if (!isOpen) return null;

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    await onSubmit({
      company_name: companyName.trim(),
      url: url.trim(),
      label: label.trim() || undefined,
      status,
    });
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/45 px-4 py-6 backdrop-blur-sm">
      <div className="w-full max-w-2xl rounded-[var(--radius-lg)] border border-[var(--border)] bg-[var(--card)] p-5 shadow-2xl sm:p-6">
        <div className="flex items-start justify-between gap-4">
          <div className="flex items-start gap-3">
            <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-[var(--radius-md)] bg-blue-100 text-[var(--primary)] dark:bg-blue-500/15">
              {isEditMode ? <FiEdit2 size={20} /> : <FiPlus size={20} />}
            </div>

            <div>
              <h2 className="text-xl font-bold text-[var(--text)]">
                {isEditMode ? "Edit Tracker" : "Add Tracker"}
              </h2>
              <p className="mt-1 text-sm text-[var(--muted)]">
                {isEditMode
                  ? "Update tracker information and monitoring settings."
                  : "Add a new career page to start monitoring for changes."}
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="rounded-[var(--radius-md)] p-2 text-[var(--muted)] transition hover:bg-[var(--surface-hover)] hover:text-[var(--text)]"
            aria-label="Close modal"
          >
            <FiX size={20} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="mt-6 space-y-5">
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            <div>
              <label className="mb-2 block text-sm font-semibold text-[var(--text)]">
                Company Name
              </label>
              <div className="flex items-center gap-2 rounded-[var(--radius-md)] border border-[var(--input-border)] bg-[var(--card)] px-3 py-2 focus-within:border-[var(--primary)]">
                <FiBriefcase
                  className="shrink-0 text-[var(--muted)]"
                  size={16}
                />
                <input
                  value={companyName}
                  onChange={(event) => setCompanyName(event.target.value)}
                  placeholder="e.g. Stripe"
                  required
                  className="w-full bg-transparent text-sm text-[var(--text)] outline-none placeholder:text-[var(--muted)]"
                />
              </div>
            </div>

            <div>
              <label className="mb-2 block text-sm font-semibold text-[var(--text)]">
                Career Page URL
              </label>
              <div className="flex items-center gap-2 rounded-[var(--radius-md)] border border-[var(--input-border)] bg-[var(--card)] px-3 py-2 focus-within:border-[var(--primary)]">
                <FiLink className="shrink-0 text-[var(--muted)]" size={16} />
                <input
                  value={url}
                  onChange={(event) => setUrl(event.target.value)}
                  placeholder="https://careers.example.com"
                  required
                  className="w-full bg-transparent text-sm text-[var(--text)] outline-none placeholder:text-[var(--muted)]"
                />
              </div>
            </div>

            <div>
              <label className="mb-2 block text-sm font-semibold text-[var(--text)]">
                Label Optional
              </label>
              <input
                value={label}
                onChange={(event) => setLabel(event.target.value)}
                placeholder="e.g. SaaS, Payments"
                className="w-full rounded-[var(--radius-md)] border border-[var(--input-border)] bg-[var(--card)] px-3 py-2 text-sm text-[var(--text)] outline-none placeholder:text-[var(--muted)] focus:border-[var(--primary)]"
              />
            </div>
          </div>

          <div className="flex flex-col-reverse gap-3 border-t border-[var(--border)] pt-5 sm:flex-row sm:justify-end">
            <Button
              type="button"
              onClick={onClose}
              className="rounded-[var(--radius-md)] border border-[var(--border)] bg-[var(--card)] px-5 py-2 text-sm font-medium text-[var(--text)] transition hover:bg-[var(--surface-hover)]"
            >
              Cancel
            </Button>

            <Button
              type="submit"
              isDisabled={isLoading}
              className="inline-flex justify-center items-center rounded-[var(--radius-md)] bg-[var(--primary)] px-5 py-2 text-sm font-medium text-white transition hover:bg-[var(--primary-hover)] disabled:cursor-not-allowed disabled:opacity-60 cursor-pointer"
            >
              {isEditMode ? (
                <FiEdit2 size={16} className="mr-2" />
              ) : (
                <FiPlusCircle size={16} className="mr-2" />
              )}
              {isLoading ? (
                <Spinner size="sm" label={isEditMode ? "Updating..." : "Adding..."} />
              ) : isEditMode ? (
                "Update Tracker"
              ) : (
                "Add Tracker"
              )}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};
