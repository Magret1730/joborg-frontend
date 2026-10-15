"use client";

import {
  Button,
  Form,
  Input,
  Label,
  TextField,
  Card,
  TextArea,
} from "@heroui/react";
import { useState } from "react";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";
import { RouteEnum } from "@/enum/RouteEnum";
import { FaArrowRight } from "react-icons/fa6";
import { useContactEmail } from "@/hooks/public/useContactEmail";
import { ContactPayload } from "@/types/contact.type";
import { Spinner } from "@/components/ui/Spinner";
import posthog from "posthog-js";

export default function Contact() {
  const router = useRouter();
  const { contact, isLoading, setIsLoading } = useContactEmail();

  const [first_name, setFirstName] = useState("");
  const [last_name, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [subject, setSubject] = useState("");

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

  // Validate subject
  const isSubjectValid = (subject: string) => {
    if (!subject) {
      toast.error("Subject is required");
      return false;
    } else if (subject.length < 5 || subject.length > 100) {
      toast.error("Subject must be between 5 and 100 characters");
      return false;
    } else {
      return true;
    }
  };

  const isMessageValid = (message: string) => {
    if (!message) {
      toast.error("Message is required");
      return false;
    } else if (message.length < 10 || message.length > 10000) {
      toast.error("Message must be between 10 and 10000 characters");
      return false;
    } else {
      return true;
    }
  };

  // Function vaidates the form
  const isFormValid = () => {
    if (!isEmailValid(email)) return false;
    if (!isFirstNameValid(first_name)) return false;
    if (!isLastNameValid(last_name)) return false;
    if (!isSubjectValid(subject)) return false;
    if (!isMessageValid(message)) return false;

    return true;
  };

  // Disable submit button if any field is empty or terms are not accepted
  const isSubmitDisabled =
    !email.trim() ||
    !first_name.trim() ||
    !last_name.trim() ||
    !subject.trim() ||
    !message.trim();

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!isFormValid()) {
      toast.error("Please fill in all required fields correctly.");
      return;
    }

    try {
      setIsLoading(true);

      const newMessage: ContactPayload = {
        first_name: first_name,
        last_name: last_name,
        email: email,
        message: message,
        subject: subject,
      };

      const response = await contact(newMessage);

      posthog.capture("user_sent_contact_message", {
        email,
        first_name,
        last_name,
      });

      toast.success(response.message || "Message sent successful..");

      router.push(RouteEnum.HOME);
    } catch (error) {
      const message =
        error instanceof Error ? error.message : "Send Contact Email failed";

      toast.error(message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <section className="max-w-2xl mx-auto my-12 p-6 rounded-[var(--radius-md)] shadow-lg">
      <div className="flex flex-col items-center text-center">
        <h1 className="text-4xl md:text-4xl font-semibold">Contact Joborg</h1>
        <p className="max-w-2xl text-base md:text-lg text-[var(--muted)] my-2">
          Have a question, feedback, or need help with Joborg? Send us a message
          and we’ll get back to you as soon as we can.
        </p>
      </div>

      <Card className="mx-auto mt-8 w-full p-6 border border-[var(--input-border)] rounded-[var(--radius-md)] shadow-lg border">
        <Form className="flex w-full flex-col gap-6" onSubmit={onSubmit}>
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
            name="subject"
            type="text"
            onChange={(value: string) => {
              setSubject(value);
            }}
            value={subject}
          >
            <Label className="text-sm font-medium text-[var(--text)]">
              Subject
            </Label>
            <Input
              placeholder="Enter your subject"
              className="mt-1 block w-full rounded-md border border-[var(--input-border)] bg-transparent px-3 py-2 text-sm shadow-sm placeholder:text-[var(--muted)] focus:border-[var(--primary)] focus:outline-none focus:ring-1 focus:ring-[var(--primary)] disabled:cursor-not-allowed disabled:opacity-50"
            />
          </TextField>

          <TextField
            className="w-full"
            isRequired
            name="message"
            type="text"
            onChange={(value: string) => {
              setMessage(value);
            }}
            value={message}
          >
            <Label className="text-sm font-medium text-[var(--text)]">
              Message
            </Label>
            <TextArea
              placeholder="Enter your message"
              className="block min-h-32 w-full resize-y rounded-[var(--radius-md)] border border-[var(--input-border)] bg-transparent px-3 py-2 text-sm shadow-sm placeholder:text-[var(--muted)] focus:border-[var(--primary)] focus:outline-none focus:ring-1 focus:ring-[var(--primary)] disabled:cursor-not-allowed disabled:opacity-50"
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
                Submit <FaArrowRight />
              </p>
            )}
          </Button>
        </Form>
      </Card>
    </section>
  );
}
