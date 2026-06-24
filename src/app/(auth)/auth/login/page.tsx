"use client";

import { Button, Form, Input, Label, TextField, Card } from "@heroui/react";
import { useState } from "react";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";
import { RouteEnum } from "@/enum/RouteEnum";
import { FaArrowRight } from "react-icons/fa6";
import { useLogin } from "@/hooks/useLogin";
import { LoginPayload } from "@/types/auth.type";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { Spinner } from "@/components/ui/Spinner";
import { useResendVerification } from "@/hooks/useResendVerification";

export default function Login() {
  const router = useRouter();
  const {
    login,
    isLoading,
    setIsLoading,
    showResendVerification,
    setVerificationEmailSent,
    verificationEmailSent,
    isResendingVerification,
    setIsResendingVerification,
  } = useLogin();
  const { resendVerification } = useResendVerification();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  // Validate email
  const isEmailValid = (Email: string) => {
    const emailRegex =
      /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

    if (!Email) {
      toast.error("Email is required");
      return false;
    } else if (!emailRegex.test(Email)) {
      toast.error(
        "Invalid email address. Please use a valid format, e.g., user@example.com."
      );
      return false;
    } else {
      return true;
    }
  };

  // Validate email
  const isPasswordValid = (Password: string) => {
    const passwordRegex = /^(?=.*[a-zA-Z])(?=.*\d).{8,}$/;

    if (!Password) {
      toast.error("Password is required");
      return false;
    } else if (!passwordRegex.test(Password)) {
      toast.error(
        "Password should contain at least one letter and one number, and be at least 8 characters long"
      );
      return false;
    } else {
      return true;
    }
  };

  // Function vaidates the form
  const isFormValid = () => {
    if (!isEmailValid(email)) return false;
    if (!isPasswordValid(password)) return false;

    return true;
  };

  // Disable submit button if any field is empty or terms are not accepted
  const isSubmitDisabled = !email.trim() || !password.trim();

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    setVerificationEmailSent(false);

    if (!isFormValid()) {
      toast.error("Please fill in all required fields correctly.");
      return;
    }

    try {
      setIsLoading(true);

      const newUser: LoginPayload = {
        email: email,
        password: password,
      };

      const response = await login(newUser);

      toast.success(response.message || "Login successful..");

      router.push(RouteEnum.DASHBOARD);
    } catch (error) {
      const message = error instanceof Error ? error.message : "Login failed";

      toast.error(message);
    } finally {
      setIsLoading(false);
    }
  };

  const handleResendVerification = async () => {
    try {
      setIsResendingVerification(true);
      const result = await resendVerification(email);
      if (result.success) {
        setVerificationEmailSent(true);
      }
      toast.success(result.message || "Verification email resent successfully");
      setIsResendingVerification(false);
    } catch (error) {
      const message =
        error instanceof Error
          ? error.message
          : "Failed to resend verification email";

      toast.error(message);
    } finally {
      setIsResendingVerification(false);
    }
  };

  return (
    <section className="max-w-md mx-auto my-12 p-6 rounded-[var(--radius-md)] shadow-lg">
      <div className="flex flex-col items-center text-center">
        <h1 className="text-4xl md:text-4xl font-semibold">Welcome back</h1>
        <p className="max-w-2xl text-base md:text-lg text-[var(--muted)] my-2">
          Sign in to your account to continue
        </p>
      </div>

      <Card className="mx-auto mt-8 w-full p-6 border border-[var(--input-border)] rounded-[var(--radius-md)] shadow-lg border">
        <Form className="flex w-full flex-col gap-6" onSubmit={onSubmit}>
          <TextField
            isRequired
            name="email"
            type="email"
            onChange={(value: string) => {
              setEmail(value);
              setVerificationEmailSent(false); // Reset verification email sent state when email changes
            }}
            value={email}
          >
            <Label className="text-sm font-medium text-[var(--text)]">
              Email
            </Label>
            <Input
              placeholder="john@example.com"
              className="mt-1 block w-full rounded-md border border-[var(--input-border)] bg-transparent px-3 py-2 text-sm shadow-sm placeholder:text-[var(--muted)] focus:border-[var(--primary)] focus:outline-none focus:ring-1 focus:ring-[var(--primary)] disabled:cursor-not-allowed disabled:opacity-50"
            />
          </TextField>

          <TextField
            isRequired
            minLength={8}
            name="password"
            type={showPassword ? "text" : "password"}
            onChange={(value: string) => {
              setPassword(value);
            }}
            value={password}
          >
            <div className="flex justify-between items-center">
              <Label className="text-sm font-medium text-[var(--text)]">
                Password
              </Label>
              <span
                className="text-xs text-[var(--primary)] cursor-pointer hover:underline"
                onClick={() => {
                  router.push(RouteEnum.FORGOT_PASSWORD);
                }}
              >
                Forgot password?
              </span>
            </div>

            <div className="relative mt-1">
              <Input
                placeholder="Enter your password"
                className="block w-full rounded-md border border-[var(--input-border)] bg-transparent px-3 py-2 pr-10 text-sm shadow-sm placeholder:text-[var(--muted)] focus:border-[var(--primary)] focus:outline-none focus:ring-1 focus:ring-[var(--primary)] disabled:cursor-not-allowed disabled:opacity-50"
              />

              <Button
                type="button"
                onClick={() => setShowPassword((prev) => !prev)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-[var(--muted)] hover:text-[var(--primary)]"
                aria-label={showPassword ? "Hide password" : "Show password"}
              >
                {showPassword ? <FaEyeSlash /> : <FaEye />}
              </Button>
            </div>
          </TextField>

          <Button
            type="submit"
            size="lg"
            isDisabled={isSubmitDisabled || isLoading}
            className={`flex justify-center items-center rounded-[var(--radius-md)] px-6 py-3 text-sm font-medium text-white transition ${
              isSubmitDisabled
                ? "bg-slate-500 cursor-not-allowed opacity-60"
                : "bg-[var(--primary)] hover:bg-[var(--primary-hover)] cursor-pointer"
            }`}
          >
            {isLoading ? (
              <Spinner size="sm" />
            ) : (
              <p className="text-sm flex justify-center items-center gap-2">
                Sign In <FaArrowRight />
              </p>
            )}
          </Button>

          <p className="text-sm text-[var(--muted)] flex justify-center items-center gap-1">
            Don't have an account?{" "}
            <span
              className="text-[var(--primary)] cursor-pointer hover:underline"
              onClick={() => {
                router.push(RouteEnum.DASHBOARD);
              }}
            >
              Create one
            </span>
          </p>

          {showResendVerification && !verificationEmailSent && (
            <div className="flex text-sm mt-2 text-center text-[var(--danger)] gap-2">
              Your email is not verified.{"  "}
              <span
                className="text-[var(--primary)] cursor-pointer hover:underline"
                onClick={handleResendVerification}
              >
                {isResendingVerification ? (
                  <span className="inline-flex items-center gap-2">
                    <Spinner size="sm" />
                    Sending...
                  </span>
                ) : (
                  <p className="text-sm flex justify-center items-center gap-2">
                    Resend verification email
                  </p>
                )}
              </span>
            </div>
          )}
        </Form>
      </Card>
    </section>
  );
}
