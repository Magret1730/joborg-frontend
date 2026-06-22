// talks to backend
import {
  RegisterPayload,
  RegisterResponse,
  VerifyEmailResponse,
  LoginPayload,
  LoginResponse,
} from "@/types/auth.type";

const BACKEND_URL = process.env.NEXT_PUBLIC_API_BASE_URL;
if (!BACKEND_URL) {
  throw new Error(
    "NEXT_PUBLIC_API_BASE_URL is not defined in environment variables"
  );
}

export const registerUser = async (
  payload: RegisterPayload
): Promise<RegisterResponse> => {
  try {
    const response = await fetch(`${BACKEND_URL}/auth/register`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || "Registration failed");
    }

    return data;
  } catch (error) {
    console.error("Error in registerUser:", error);
    throw error;
  }
};

export const verifyEmail = async (
  token: string
): Promise<VerifyEmailResponse> => {
  const response = await fetch(`${BACKEND_URL}/auth/verify-email`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ token }),
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || data.error || "Email verification failed");
  }

  return data;
};

export const loginUser = async (
  payload: LoginPayload
): Promise<LoginResponse> => {
  try {
    const response = await fetch(`${BACKEND_URL}/auth/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || data.error || "Login failed");
    }

    return data;
  } catch (error) {
    console.error("Error in registerUser:", error);
    throw error;
  }
};

export const resendVerificationLink = async (email: string) => {
  try {
    const response = await fetch(`${BACKEND_URL}/auth/resend-verification`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email }),
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || "Failed to resend verification email");
    }

    return data;
  } catch (error) {
    console.error("Error in handleResendVerification:", error);
    throw error;
  }
};

