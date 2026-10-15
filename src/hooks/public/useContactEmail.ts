"use client";
// manages loading, error, and response state for user registration
import { useState } from "react";
import { contactEmail } from "@/api/publicApi";
import { ContactPayload, ContactResponse } from "@/types/contact.type";

export const useContactEmail = () => {
  const [data, setData] = useState<ContactResponse | null>(null);
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const contact = async (payload: ContactPayload) => {
    try {
      setIsLoading(true);
      setError("");

      const response = await contactEmail(payload);

      setData(response);
      return response;
    } catch (err) {
      const message =
        err instanceof Error ? err.message : "Something went wrong";

      setError(message);
      throw err;
    } finally {
      setIsLoading(false);
    }
  };

  return {
    contact,
    data,
    error,
    isLoading,
    setIsLoading,
  };
};