export type TrackerPayload = {
  success: boolean;
  message: string;
  id: string;
  company_name: string;
  label: string;
  url: string;
  status: string;
  last_hash: string;
  last_checked_at: string;
  last_changed_at: string;
  scraper_type: string;
};

export type TrackersResponse = {
  success: boolean;
  message: string;
  data: TrackerPayload[];
};

export type TrackerResponse = {
  success: boolean;
  message: string;
  data: TrackerPayload;
};
