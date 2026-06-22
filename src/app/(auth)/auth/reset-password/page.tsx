"use client";

import {
  Button,
  Form,
  Input,
  Label,
  TextField,
  Card,
} from "@heroui/react";
import { useState } from "react";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";
import { RouteEnum } from "@/enum/RouteEnum";
import { FaArrowRight } from "react-icons/fa6";
import { useResetPassword } from "@/hooks/useResetPassword";
import { ResetPasswordPayload } from "@/types/auth.type";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { Spinner } from "@/components/ui/Spinner";
import { useSearchParams } from "next/navigation";

export default function ResetPassword() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const token = searchParams.get("token");

  const { resetPassword, isLoading, setIsLoading } = useResetPassword();

  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

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
    if (!isPasswordValid(newPassword)) return false;
    if (!isPasswordValid(confirmPassword)) return false;

    return true;
  };

  // Disable submit button if any field is empty or terms are not accepted
  const isSubmitDisabled = !newPassword.trim() || !confirmPassword.trim();

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!isFormValid()) {
      return;
    }

    try {
      setIsLoading(true);

      if (newPassword !== confirmPassword) {
        toast.error("Passwords do not match");
        return;
      }

      const user: ResetPasswordPayload = {
        token: token || "",
        newPassword: newPassword,
        confirmPassword: confirmPassword
      };

      const response = await resetPassword(user);

      toast.success(response.message || "Reset Password successful. Please login with your new password.");

      router.push(RouteEnum.LOGIN);
    } catch (error) {
      const message = error instanceof Error ? error.message : "Reset Password failed";

      toast.error(message);
    } finally {
      setIsLoading(false);
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
            minLength={8}
            name="newPassword"
            type={showPassword ? "text" : "password"}
            onChange={(value: string) => {
              setNewPassword(value);
            }}
            value={newPassword}
          >
            <Label className="text-sm font-medium text-[var(--text)]">
              New Password
            </Label>

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

          <TextField
            isRequired
            minLength={8}
            name="confirmPassword"
            type={showPassword ? "text" : "password"}
            onChange={(value: string) => {
              setConfirmPassword(value);
            }}
            value={confirmPassword}
          >
            <Label className="text-sm font-medium text-[var(--text)]">
              Confirm Password
            </Label>

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
                Confirm <FaArrowRight />
              </p>
            )}
          </Button>
        </Form>
      </Card>
    </section>
  );
}
