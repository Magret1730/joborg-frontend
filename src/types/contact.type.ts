export type ContactPayload = {
  first_name: string;
  last_name: string;
  email: string;
  subject: string;
  message: string;
};

export type ContactResponse = {
  message?: string;
  error?: string;
  success?: boolean;
  data?: {
    first_name: string;
    last_name: string;
    email: string;
    subject: string;
    message: string;
  }
};
