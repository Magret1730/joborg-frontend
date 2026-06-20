// defines request and response shapes

export type RegisterPayload = {
  first_name: string;
  last_name: string;
  email: string;
  password: string;
};

export type RegisterResponse = {
  message?: string;
  error?: string;
  success?: boolean;
  user?: {
    id: string;
    email: string;
    first_name: string;
    last_name: string;
  };
};

export type VerifyEmailResponse = {
  success: boolean;
  message: string;
};
