import { ContactResponse, ContactPayload } from "@/types/contact.type";

const BACKEND_URL = process.env.NEXT_PUBLIC_API_BASE_URL;
if (!BACKEND_URL) {
  throw new Error(
    "NEXT_PUBLIC_API_BASE_URL is not defined in environment variables"
  );
}

export const contactEmail = async (
    payload: ContactPayload
): Promise<ContactResponse> => {
  try {
    const response = await fetch(`${BACKEND_URL}/public/contact-email`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || data.error || "Failed to send contact email");
    }

    return data;
  } catch (error) {
    console.error("Error in send contact API:", error);
    throw error;
  }
};