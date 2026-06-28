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
} from "react-icons/fi";
import { Button, Tooltip } from "@heroui/react";
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
    removeTracker,
    isLoading: isDeleteLoading,
    error: deleteError,
  } = useDeleteTracker();

  const {
    createTracker,
    isLoading: isCreateLoading,
    error: createError,
  } = usePostTracker();

  const {
    modifyTracker,
    isLoading: isUpdateLoading,
    error: updateError,
  } = useUpdateTracker();

  useEffect(() => {
    fetchTrackers();
  }, []);

  if (isTrackerLoading) {
    return <PageLoader message="Loading trackers page..." />;
  }

  if (isPauseLoading || isResumeLoading) {
    return <PageLoader message="Updating tracker status..." />;
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

  if (pauseError) {
    return (
      <PageError
        message={pauseError}
        onRetry={() => {
          fetchTrackers();
        }}
      />
    );
  }

  if (resumeError) {
    return (
      <PageError
        message={resumeError}
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

    await removeTracker(trackerToDelete.id);
    await fetchTrackers();
    closeDeleteModal();
  };

  const handleSaveTracker = async (payload: {
    company_name: string;
    url: string;
    label?: string;
    status: string;
  }) => {
    if (trackerModalMode === TrackerModalMode.EDIT && selectedTracker) {
      await modifyTracker(selectedTracker.id, payload);
    } else {
      await createTracker(payload);
    }

    await fetchTrackers();
    closeTrackerModal();
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
                <th className="w-[200px] pl-5 pr-2 py-3 font-semibold">URL</th>
                <th className="w-[120px] pl-5 pr-2 py-3 font-semibold">
                  Last Checked
                </th>
                <th className="w-[120px] pl-5 pr-2 py-3 font-semibold">
                  Last Changed
                </th>
                <th className="w-[100px] pl-5 pr-2 py-3 font-semibold">
                  Status
                </th>
                <th className="w-[140px] pl-2 pr-5 py-3 font-semibold">
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
                      <div className="flex items-center gap-2">
                        <Tooltip delay={0}>
                          <Button
                            type="button"
                            isIconOnly
                            aria-label={
                              tracker.status === TrackerStatusEnum.PAUSED
                                ? "Resume tracker"
                                : "Pause tracker"
                            }
                            className="h-9 w-9 min-w-0 p-0 text-[var(--muted)] transition hover:text-[var(--primary)] cursor-pointer"
                            onClick={async () => {
                              if (tracker.status === TrackerStatusEnum.PAUSED) {
                                await resume(tracker.id);
                              } else {
                                await pause(tracker.id);
                              }
                              await fetchTrackers();
                            }}
                          >
                            {tracker.status === TrackerStatusEnum.PAUSED ? (
                              <FiPlayCircle size={16} />
                            ) : (
                              <FiPauseCircle size={16} />
                            )}
                          </Button>

                          <Tooltip.Content className={tooltipClass}>
                            <p>
                              {tracker.status === TrackerStatusEnum.PAUSED
                                ? "Resume tracker"
                                : "Pause tracker"}
                            </p>
                          </Tooltip.Content>
                        </Tooltip>

                        <Tooltip delay={0}>
                          <Link
                            href={`/trackers/${tracker.id}`}
                            type="button"
                            // isIconOnly
                            aria-label="View tracker"
                            className="h-9 w-9 min-w-0 flex items-center justify-center p-0 text-[var(--muted)] transition hover:text-[var(--primary)] cursor-pointer"
                          >
                            <FiEye size={16} />
                          </Link>

                          <Tooltip.Content className={tooltipClass}>
                            <p>View tracker</p>
                          </Tooltip.Content>
                        </Tooltip>

                        <Tooltip delay={0}>
                          <Button
                            type="button"
                            isIconOnly
                            aria-label="Edit tracker"
                            className="h-9 w-9 min-w-0 p-0 text-[var(--muted)] transition hover:text-[var(--primary)] cursor-pointer"
                            onClick={() => openEditTrackerModal(tracker)}
                          >
                            <FiEdit2 size={16} />
                          </Button>

                          <Tooltip.Content className={tooltipClass}>
                            <p>Edit tracker</p>
                          </Tooltip.Content>
                        </Tooltip>

                        {/* // Fix this not showing */}
                        <Tooltip delay={0}>
                          <Link
                            href={tracker.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            aria-label="Open tracker URL"
                            className="h-9 w-9 min-w-0 flex items-center justify-center p-0 text-[var(--muted)] transition hover:text-[var(--primary)]"
                          >
                            <FiExternalLink size={16} />
                          </Link>

                          <Tooltip.Content className="z-50 rounded-[var(--radius-md)] border border-[var(--border)] bg-[var(--card)] px-3 py-2 text-xs font-medium text-[var(--text)] shadow-lg">
                            Open career page
                          </Tooltip.Content>
                        </Tooltip>

                        <Tooltip delay={0}>
                          <Button
                            type="button"
                            isIconOnly
                            aria-label="Delete tracker"
                            className="h-9 w-9 min-w-0 p-0 text-red-500 transition hover:text-red-600"
                            onClick={() => openDeleteModal(tracker)}
                          >
                            <FiTrash2 size={16} />
                          </Button>

                          <Tooltip.Content className="rounded-[var(--radius-md)] border border-[var(--border)] bg-[var(--card)] px-3 py-2 text-xs font-medium text-[var(--text)] shadow-lg">
                            Delete tracker
                          </Tooltip.Content>
                        </Tooltip>
                      </div>
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
