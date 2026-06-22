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

export type LoginPayload = {
  email: string;
  password: string;
};

export type LoginResponse = {
  message?: string;
  error?: string;
  success?: boolean;
  data?: {
    token: string;
    user?: {
      id: string;
      email: string;
      first_name: string;
      last_name: string;
      is_admin: boolean;
      is_verified: boolean;
    };
  };
};

export type ForgotPasswordPayload = {
  email: string;
};

export type ForgotPasswordResponse = {
  message?: string;
  error?: string;
  success?: boolean;
};

export type ResetPasswordPayload = {
  token: string;
  newPassword: string;
  confirmPassword: string;
};

export type ResetPasswordResponse = {
  message?: string;
  error?: string;
  success?: boolean;
};
