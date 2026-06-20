"use client";

import { Button, Card } from "@heroui/react";
import { useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { FaCheckCircle, FaExclamationCircle } from "react-icons/fa";
import { toast } from "react-toastify";
import { RouteEnum } from "@/enum/RouteEnum";
import { useVerifyEmail } from "@/hooks/useVerifyEmail";
import { Spinner } from "@/components/ui/Spinner";

export default function VerifyEmailPage() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const token = searchParams.get("token");

  const { verify, status, message, isLoading, isSuccess, isError } =
    useVerifyEmail();

  useEffect(() => {
    const handleVerifyEmail = async () => {
      if (!token) {
        toast.error("Verification token is missing.");
        return;
      }

      try {
        const response = await verify(token);
        toast.success(response.message || "Email verified successfully.");
      } catch (error) {
        const errorMessage =
          error instanceof Error ? error.message : "Email verification failed.";

        toast.error(errorMessage);
      }
    };

    handleVerifyEmail();
  }, [token, verify]);

  return (
    <section className="flex items-center justify-center px-6 py-2">
      <Card className="w-full min-w-2xl border border-[var(--input-border)] bg-[var(--card)] p-8 text-center shadow-lg">
        <div className="flex flex-col items-center">
          {isLoading && (
            <Spinner size="lg" />
          )}

          {isSuccess && (
            <FaCheckCircle className="mb-6 text-5xl text-green-500" />
          )}

          {isError && (
            <FaExclamationCircle className="mb-6 text-5xl text-red-500" />
          )}

          <h1 className="text-2xl font-semibold text-[var(--text)]">
            {isLoading && "Verifying Email"}
            {isSuccess && "Email Verified"}
            {isError && "Verification Failed"}
            {status === "idle" && "Verify Email"}
          </h1>

          <p className="mt-3 text-sm leading-6 text-[var(--muted)]">
            {message || "Please wait while we verify your email."}
          </p>

          <Button
            className="mt-8 rounded-[var(--radius-md)] bg-[var(--primary)] px-6 py-3 text-sm font-medium text-white transition hover:bg-[var(--primary-hover)] cursor-pointer disabled:cursor-not-allowed disabled:bg-[var(--primary-disabled)]"
            onPress={() => router.push(RouteEnum.LOGIN)}
          >
            Go to Login
          </Button>
        </div>
      </Card>
    </section>
  );
}