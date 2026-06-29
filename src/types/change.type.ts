export type ChangePayload = {
  success: boolean;
  message: string;
  id: number;
  tracker_id: number;
  old_hash: string;
  new_hash: string;
  detected_at: string;
  notification_sent: boolean;
  created_at: string;
  updated_at: string;
  company_name: string;
  label: string;
  url: string;
  status: string;
};

export type ChangesResponse = {
  success: boolean;
  message: string;
  data: ChangePayload[];
};

export type ChangeResponse = {
  success: boolean;
  message: string;
  data: ChangePayload[];
};
