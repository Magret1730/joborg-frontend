"use client";

import {
  Button,
  Description,
  Form,
  Input,
  Label,
  TextField,
  Card,
  Checkbox,
} from "@heroui/react";
import { useState, useEffect } from "react";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";
import { RouteEnum } from "@/enum/RouteEnum";
import { FaArrowRight } from "react-icons/fa6";
import { useRegister } from "@/hooks/auth/useRegister";
import { RegisterPayload } from "@/types/auth.type";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { Spinner } from "@/components/ui/Spinner";

export default function Register() {
  const router = useRouter();
  const { register, isLoading, setIsLoading } = useRegister();

  const [first_name, setFirstName] = useState("");
  const [last_name, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [acceptedTerms, setAcceptedTerms] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  // Validate firstName
  const isFirstNameValid = (first_name: string) => {
    const firstNameRegex = /^[a-zA-Z\s\-'.]+$/;

    if (!first_name) {
      toast.error("First Name is required");
      return false;
    } else if (!firstNameRegex.test(first_name)) {
      toast.error(
        "Invalid first name. Use only letters, spaces, and these symbols: - . '"
      );
      return false;
    } else {
      return true;
    }
  };

  // Validate firstName
  const isLastNameValid = (last_name: string) => {
    const lastNameRegex = /^[a-zA-Z\s\-'.]+$/;

    if (!last_name) {
      toast.error("Last Name is required");
      return false;
    } else if (!lastNameRegex.test(last_name)) {
      toast.error(
        "Invalid last name. Use only letters, spaces, and these symbols: - . '"
      );
      return false;
    } else {
      return true;
    }
  };

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
    if (!isFirstNameValid(first_name)) return false;
    if (!isLastNameValid(last_name)) return false;
    if (!isEmailValid(email)) return false;
    if (!isPasswordValid(password)) return false;

    if (!acceptedTerms) {
      toast.error("Please accept the terms of service and privacy policy");
      return false;
    }

    return true;
  };

  // Disable submit button if any field is empty or terms are not accepted
  const isSubmitDisabled =
    !first_name.trim() ||
    !last_name.trim() ||
    !email.trim() ||
    !password.trim() ||
    !acceptedTerms;

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!isFormValid()) {
      return;
    }

    try {
      setIsLoading(true);

      const newUser: RegisterPayload = {
        first_name: first_name,
        last_name: last_name,
        email: email,
        password: password,
      };

      const response = await register(newUser);

      toast.success(
        response.message ||
          "Registration successful. Kindly Check your email to proceed."
      );

      router.push(RouteEnum.LOGIN);
    } catch (error) {
      const message =
        error instanceof Error ? error.message : "Registration failed";

      toast.error(message);
    } finally {
      setIsLoading(false);
    }
  };
  return (
    <section className="max-w-xl mx-auto px-4 py-12">
      <div className="flex flex-col items-center text-center">
        <h1 className="text-4xl md:text-4xl font-semibold">
          Create an account
        </h1>
        <p className="max-w-2xl text-base md:text-lg text-[var(--muted)] my-2">
          Start tracking career pages and job opportunities
        </p>
      </div>

      <Card className="mx-auto mt-8 flex items-center justify-center p-6 border border-[var(--input-border)] rounded-[var(--radius-md)] shadow-lg">
        <Form className="flex flex-col gap-4" onSubmit={onSubmit}>
          <TextField
            isRequired
            name="first_name"
            type="text"
            // id="firstName"
            onChange={(value: string) => {
              setFirstName(value);
            }}
            value={first_name}
          >
            <Label className="block text-sm font-medium text-[var(--text)]">
              First Name
            </Label>
            <Input
              placeholder="Enter your first name"
              className="mt-1 block w-full rounded-md border border-[var(--input-border)] bg-transparent px-3 py-2 text-sm shadow-sm placeholder:text-[var(--muted)] focus:border-[var(--primary)] focus:outline-none focus:ring-1 focus:ring-[var(--primary)] disabled:cursor-not-allowed disabled:opacity-50"
            />
          </TextField>

          <TextField
            isRequired
            name="last_name"
            type="text"
            onChange={(value: string) => {
              setLastName(value);
            }}
            value={last_name}
          >
            <Label className="block text-sm font-medium text-[var(--text)]">
              Last Name
            </Label>
            <Input
              placeholder="Enter your last name"
              className="mt-1 block w-full rounded-md border border-[var(--input-border)] bg-transparent px-3 py-2 text-sm shadow-sm placeholder:text-[var(--muted)] focus:border-[var(--primary)] focus:outline-none focus:ring-1 focus:ring-[var(--primary)] disabled:cursor-not-allowed disabled:opacity-50"
            />
          </TextField>

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
            <Label className="text-sm font-medium text-[var(--text)]">
              Password
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

            <Description className="text-sm text-[var(--muted)]">
              Must be at least one letter and one number, and be at least 8
              characters long
            </Description>
          </TextField>

          <Checkbox
            id="acceptedTerms"
            isSelected={acceptedTerms}
            onChange={setAcceptedTerms}
          >
            <Checkbox.Content className="flex items-baseline justify-start gap-3 text-sm text-[var(--text)]">
              <Checkbox.Control className="mt-1 flex h-4 w-4 shrink-0 items-center justify-center rounded border border-[var(--input-border)] data-[selected=true]:border-[var(--primary)] data-[selected=true]:bg-[var(--primary)]">
                <Checkbox.Indicator className="h-3 w-3 text-blue-500" />
              </Checkbox.Control>
              <span>
                I accept the{" "}
                <span
                  className="font-medium text-[var(--primary)] cursor-pointer hover:underline"
                  onClick={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    router.push(RouteEnum.TERMS);
                  }}
                >
                  terms of service
                </span>{" "}
                and{" "}
                <span
                  className="font-medium text-[var(--primary)] cursor-pointer hover:underline"
                  onClick={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    router.push(RouteEnum.PRIVACY);
                  }}
                >
                  privacy policy
                </span>
              </span>
            </Checkbox.Content>
          </Checkbox>

          <Button
            type="submit"
            size="lg"
            isDisabled={isSubmitDisabled || isLoading}
            className={`flex justify-center items-center mt-6 rounded-[var(--radius-md)] px-6 py-3 text-sm font-medium text-white transition ${
              isSubmitDisabled
                ? "bg-slate-500 cursor-not-allowed opacity-60"
                : "bg-[var(--primary)] hover:bg-[var(--primary-hover)] cursor-pointer"
            }`}
          >
            {isLoading ? (
              // <p className="text-sm flex justify-center items-center gap-2">
                <Spinner size="sm" />
              // </p>
            ) : (
              <p className="text-sm flex justify-center items-center gap-2">
                Create Account <FaArrowRight />
              </p>
            )}
          </Button>

          <p className="text-sm text-[var(--muted)] flex justify-center items-center gap-1">
            Already have an account?{" "}
            <span
              className="text-[var(--primary)] cursor-pointer hover:underline"
              onClick={() => {
                router.push(RouteEnum.LOGIN);
              }}
            >
              Sign In
            </span>
          </p>
        </Form>
      </Card>
    </section>
  );
}
