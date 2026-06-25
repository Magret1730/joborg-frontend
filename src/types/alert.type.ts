export type AlertPayload = {
  success: boolean;
  message: string;
  id: number;
  tracker_id: number;
  change_log_id: number | null;
  recipient: string;
  channel: string;
  status: string;
  sent_at: string | null;
  company_name: string;
  label: string;
  url: string;
};

export type AlertResponse = {
  success: boolean;
  message: string;
  data: AlertPayload[];
};
