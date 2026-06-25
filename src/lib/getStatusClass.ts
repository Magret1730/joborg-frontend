import { TrackerStatusEnum } from "@/enum/TrackerEnum";

export const getStatusClass = (status: string) => {
  switch (status?.toLowerCase()) {
    case TrackerStatusEnum.ACTIVE.toLowerCase():
      return "bg-blue-100 text-blue-700 dark:bg-blue-500/15 dark:text-blue-300";
    case TrackerStatusEnum.PAUSED.toLowerCase():
      return "bg-slate-100 text-slate-700 dark:bg-slate-700/60 dark:text-slate-300";
    case TrackerStatusEnum.INVALID.toLowerCase():
      return "bg-emerald-100 text-emerald-700 dark:bg-emerald-500/15 dark:text-emerald-300";
    case TrackerStatusEnum.ERROR:
      return "bg-red-100 text-red-700 dark:bg-red-500/15 dark:text-red-300";
    default:
      return "bg-slate-100 text-slate-700 dark:bg-slate-700/60 dark:text-slate-300";
  }
};