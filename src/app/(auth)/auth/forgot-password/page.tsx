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
import { useForgotPassword } from "@/hooks/useForgotPassword";
import { ForgotPasswordPayload } from "@/types/auth.type";
import { Spinner } from "@/components/ui/Spinner";

export default function ResetPassword() {
  const router = useRouter();
  const { forgotPassword, isLoading, setIsLoading } = useForgotPassword();

  const [email, setEmail] = useState("");

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

  // Function vaidates the form
  const isFormValid = () => {
    if (!isEmailValid(email)) return false;

    return true;
  };

  // Disable submit button if any field is empty or terms are not accepted
  const isSubmitDisabled = !email.trim();

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!isFormValid()) {
      return;
    }

    try {
      setIsLoading(true);

      const newUser: ForgotPasswordPayload = {
        email: email,
      };

      const response = await forgotPassword(newUser);

      toast.success(response.message || "Forgot password successful..");

      router.push(RouteEnum.LOGIN);
    } catch (error) {
      const message = error instanceof Error ? error.message : "Forgot password failed";

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
            name="email"
            type="email"
            onChange={(value: string) => {
              setEmail(value);
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
                Send Email <FaArrowRight />
              </p>
            )}
          </Button>
        </Form>
      </Card>
    </section>
  );
}
