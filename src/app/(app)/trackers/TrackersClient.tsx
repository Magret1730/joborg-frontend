"use client";
import { useGetTrackers } from "@/hooks/trackers/useGetTrackers";
import { useEffect } from "react";
import { formatDate } from "@/lib/dateFormatter";
import Link from "next/link";
import { getStatusClass } from "@/lib/getStatusClass";
import { PageError, PageLoader } from "@/components/ui/PageState";
import {
  FiPauseCircle,
  FiPlayCircle,
  FiEye,
  FiEdit2,
  FiTrash2,
  FiExternalLink,
  FiPlusCircle,
  FiMoreVertical,
} from "react-icons/fi";
import { Button, Tooltip, Dropdown, Label } from "@heroui/react";
import { TrackerStatusEnum } from "@/enum/TrackerEnum";
import { usePauseTracker } from "@/hooks/trackers/usePauseTracker";
import { useResumeTracker } from "@/hooks/trackers/useResumeTracker";
import { useState } from "react";
import { TrackerModal } from "@/components/trackers/TrackerModal";
import { useDeleteTracker } from "@/hooks/trackers/useDeleteTracker";
import { usePostTracker } from "@/hooks/trackers/usePostTracker";
import { useUpdateTracker } from "@/hooks/trackers/useUpdateTracker";
import { TrackerPayload } from "@/types/tracker.type";
import { TrackerModalMode } from "@/enum/TrackerModalEnum";
import { DeleteTrackerModal } from "@/components/trackers/DeleteTrackerModal";
import { toast } from "react-toastify";
import posthog from "posthog-js";

export const TrackersClient = () => {
  const [isTrackerModalOpen, setIsTrackerModalOpen] = useState(false);
  const [trackerModalMode, setTrackerModalMode] = useState<
    TrackerModalMode.ADD | TrackerModalMode.EDIT
  >(TrackerModalMode.ADD);
  const [selectedTracker, setSelectedTracker] = useState<TrackerPayload | null>(
    null
  );
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [trackerToDelete, setTrackerToDelete] = useState<TrackerPayload | null>(
    null
  );

  const {
    trackers,
    isLoading: isTrackerLoading,
    error: trackerError,
    fetchTrackers,
  } = useGetTrackers();

  const { pause } = usePauseTracker();
  const { resume } = useResumeTracker();
  const { removeTracker, isLoading: isDeleteLoading } = useDeleteTracker();
  const { createTracker, isLoading: isCreateLoading } = usePostTracker();
  const { modifyTracker, isLoading: isUpdateLoading } = useUpdateTracker();

  useEffect(() => {
    fetchTrackers();
  }, []);

  if (isTrackerLoading) {
    return <PageLoader message="Loading trackers page..." />;
  }

  if (trackerError) {
    return (
      <PageError
        message={trackerError}
        onRetry={() => {
          fetchTrackers();
        }}
      />
    );
  }

  const tooltipClass =
    "rounded-[var(--radius-md)] border border-[var(--border)] bg-[var(--card)] px-3 py-2 text-xs font-medium text-[var(--text)] shadow-lg";

  const openAddTrackerModal = () => {
    setTrackerModalMode(TrackerModalMode.ADD);
    setSelectedTracker(null);
    setIsTrackerModalOpen(true);
  };

  const openEditTrackerModal = (tracker: TrackerPayload) => {
    setTrackerModalMode(TrackerModalMode.EDIT);
    setSelectedTracker(tracker);
    setIsTrackerModalOpen(true);
  };

  const closeTrackerModal = () => {
    setIsTrackerModalOpen(false);
    setSelectedTracker(null);
  };

  const openDeleteModal = (tracker: TrackerPayload) => {
    setTrackerToDelete(tracker);
    setIsDeleteModalOpen(true);
  };

  const closeDeleteModal = () => {
    setTrackerToDelete(null);
    setIsDeleteModalOpen(false);
  };

  const handleConfirmDeleteTracker = async () => {
    if (!trackerToDelete) return;

    try {
      const response = await removeTracker(trackerToDelete.id);

      if (!response?.success) {
        toast.error(response?.message || "Failed to delete tracker.");
        return;
      }

      posthog.capture("tracker_deleted", {
        tracker_id: trackerToDelete.id,
        company_name: trackerToDelete.company_name,
      });

      await fetchTrackers();
      closeDeleteModal();

      toast.success(
        response?.message ||
          `Tracker "${trackerToDelete.company_name}" deleted successfully.`
      );
    } catch (error) {
      const message =
        error instanceof Error ? error.message : "Failed to delete tracker.";

      toast.error(message);
    }
  };

  const handleSaveTracker = async (payload: {
    company_name: string;
    url: string;
    label?: string;
    status: string;
  }) => {
    try {
      if (trackerModalMode === TrackerModalMode.EDIT && selectedTracker) {
        const response = await modifyTracker(selectedTracker.id, payload);

        if (!response?.success) {
          toast.error(response?.message || "Failed to update tracker.");
          return;
        }

        posthog.capture("tracker_updated", {
          tracker_id: selectedTracker.id,
          company_name: payload.company_name,
          url: payload.url,
          label: payload.label,
        });

        toast.success(
          `Tracker "${payload.company_name}" updated successfully.`
        );
      } else {
        const response = await createTracker(payload);

        if (!response?.success) {
          toast.error(response?.message || "Failed to create tracker.");
          return;
        }

        posthog.capture("tracker_created", {
          company_name: payload.company_name,
          url: payload.url,
          label: payload.label,
        });

        toast.success(
          response?.message ||
            `Tracker "${payload.company_name}" created successfully.`
        );
      }

      await fetchTrackers();

      // close only after success
      closeTrackerModal();
    } catch (error) {
      const message =
        error instanceof Error ? error.message : "Failed to save tracker.";

      toast.error(message);

      // do not close modal
    }
  };

  const handlePauseResumeTracker = async (tracker: TrackerPayload) => {
    try {
      if (tracker.status === TrackerStatusEnum.PAUSED) {
        await resume(tracker.id);
        posthog.capture("tracker_resumed", {
          tracker_id: tracker.id,
          company_name: tracker.company_name,
        });
        toast.success(`Tracker "${tracker.company_name}" resumed successfully.`);
      } else {
        await pause(tracker.id);
        posthog.capture("tracker_paused", {
          tracker_id: tracker.id,
          company_name: tracker.company_name,
        });
        toast.success(`Tracker "${tracker.company_name}" paused successfully.`);
      }

      await fetchTrackers();
    } catch (error) {
      const message =
        error instanceof Error ? error.message : "Failed to update tracker.";

      toast.error(message);
    }
  };

  const isSavingTracker = isCreateLoading || isUpdateLoading;

  return (
    <section className="space-y-8">
      <div className="flex items-center justify-between ">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-[var(--text)] sm:text-4xl">
            Trackers
          </h1>
          <p className="mt-2 max-w-2xl text-sm leading-6 text-[var(--muted)] sm:text-base">
            Manage your career tracker page monitors.
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

      <div className="overflow-hidden rounded-[var(--radius-lg)] border border-[var(--border)] bg-[var(--card)] shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full min-w-[1000px] table-fixed text-left text-sm">
            <thead className="bg-[var(--surface)]  border-b border-[var(--border)] text-xs uppercase tracking-wide text-[var(--muted)]">
              <tr>
                <th className="w-[120px] pl-5 pr-2 py-3 font-semibold">
                  Company
                </th>
                <th className="w-[140px] pl-5 pr-2 py-3 font-semibold">
                  Label
                </th>
                <th className="w-[220px] pl-5 pr-2 py-3 font-semibold">URL</th>
                <th className="w-[130px] pl-5 pr-2 py-3 font-semibold">
                  Last Checked
                </th>
                <th className="w-[130px] pl-5 pr-2 py-3 font-semibold">
                  Last Changed
                </th>
                <th className="w-[100px] pl-5 pr-2 py-3 font-semibold">
                  Status
                </th>
                <th className="w-[80px] pl-2 pr-5 py-3 font-semibold text-right">
                  Actions
                </th>
              </tr>
            </thead>

            <tbody className="divide-y divide-[var(--border)]">
              {trackers.length === 0 ? (
                <tr>
                  <td
                    colSpan={7}
                    className="text-center py-8 text-[var(--muted)]"
                  >
                    No trackers found. Click "Add Tracker" to create one.
                  </td>
                </tr>
              ) : (
                trackers.map((tracker, index) => (
                  <tr
                    key={`${index}`}
                    className="transition hover:bg-[var(--surface-hover)]"
                  >
                    <td className="pl-5 pr-2 py-4 font-medium text-[var(--text)]">
                      {tracker.company_name}
                    </td>
                    <td className="pl-5 pr-2 py-4 font-medium text-[var(--muted)]">
                      {tracker.label}
                    </td>
                    <td className="pl-5 pr-2 py-4 font-medium text-[var(--muted)]">
                      <p className="max-w-[320px] [overflow-wrap:anywhere]">
                        {tracker.url}
                      </p>
                    </td>
                    <td className="pl-5 pr-2 py-4 text-[var(--muted)]">
                      {formatDate(tracker.last_checked_at)}
                    </td>

                    <td className="pl-5 pr-2 py-4 text-[var(--muted)]">
                      {formatDate(tracker.last_changed_at)}
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
                            className="p-2 rounded-[var(--radius-md)] border border-[var(--border)] bg-[var(--card)] shadow-lg flex flex-col gap-2"
                          >
                            <Dropdown.Item
                              id="pause-resume-tracker"
                              textValue="Pause/Resume Tracker"
                              className="flex items-center gap-2 cursor-pointer"
                              aria-label={
                                tracker.status === TrackerStatusEnum.PAUSED
                                  ? "Resume tracker"
                                  : "Pause tracker"
                              }
                              onClick={() => handlePauseResumeTracker(tracker)}
                            >
                              {tracker.status === TrackerStatusEnum.PAUSED ? (
                                <FiPlayCircle size={16} />
                              ) : (
                                <FiPauseCircle size={16} />
                              )}
                              <Label className="text-sm">
                                {tracker.status === TrackerStatusEnum.PAUSED
                                  ? "Pause Tracker"
                                  : "Resume Tracker"}
                              </Label>
                            </Dropdown.Item>
                            <Dropdown.Item
                              id="view-tracker"
                              textValue="View Tracker"
                              className="flex items-center gap-2 cursor-pointer"
                              href={`/trackers/${tracker.id}`}
                            >
                              <FiEye size={16} />
                              <Label className="text-sm">View Tracker</Label>
                            </Dropdown.Item>
                            <Dropdown.Item
                              id="edit-tracker"
                              textValue="Edit Tracker"
                              className="flex items-center gap-2 cursor-pointer"
                              onClick={() => openEditTrackerModal(tracker)}
                              target="_blank"
                              aria-label="Edit Tracker"
                            >
                              <FiEdit2 size={16} />
                              <Label className="text-sm">Edit Tracker</Label>
                            </Dropdown.Item>
                            <Dropdown.Item
                              id="open-career-page"
                              textValue="Open Career Page"
                              className="flex items-center gap-2 cursor-pointer"
                              href={tracker.url}
                              target="_blank"
                              rel="noopener noreferrer"
                              aria-label="Open Tracker URL"
                            >
                              <FiExternalLink size={16} />
                              <Label className="text-sm">Open URL</Label>
                            </Dropdown.Item>
                            <Dropdown.Item
                              id="delete-tracker"
                              textValue="Delete Tracker"
                              className="flex items-center gap-2 cursor-pointer"
                              onClick={() => openDeleteModal(tracker)}
                              target="_blank"
                              aria-label="Delete Tracker"
                            >
                              <FiTrash2 size={16} />
                              <Label className="text-sm">Delete Tracker</Label>
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

      {/* *************************************************************** */}
      <TrackerModal
        isOpen={isTrackerModalOpen}
        mode={trackerModalMode}
        tracker={selectedTracker}
        isLoading={isSavingTracker}
        onClose={closeTrackerModal}
        onSubmit={handleSaveTracker}
      />

      <DeleteTrackerModal
        isOpen={isDeleteModalOpen}
        trackerName={trackerToDelete?.company_name}
        isLoading={isDeleteLoading}
        onClose={closeDeleteModal}
        onConfirm={handleConfirmDeleteTracker}
      />
    </section>
  );
};
