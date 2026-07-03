"use client";

import {
  FaUserShield,
  FaDatabase,
  FaLock,
  FaEnvelopeOpenText,
  FaArrowRight,
  FaChartLine,
} from "react-icons/fa";
import { FaCircleInfo } from "react-icons/fa6";
import { FiRefreshCcw } from "react-icons/fi";
import { Button } from "@heroui/react";
import { useRouter } from "next/navigation";
import posthog from "posthog-js";
import { RouteEnum } from "@/enum/RouteEnum";

const PrivacyItems: {
    icon: React.ReactNode;
    title: string;
    description: string;
}[] = [
  {
    icon: <FaUserShield size={24} />,
    title: "Information We Collect",
    description:
      "We collect information you provide directly, such as your name, email address, and account details. We also collect information related to your trackers and how you use Joborg.",
  },
  {
    icon: <FaCircleInfo size={24} />,
    title: "How We Use Your Information",
    description:
      "We use your information to provide and improve Joborg, manage your account, send tracker alerts, communicate with you, and help keep the platform secure.",
  },
  {
    icon: <FaLock size={24} />,
    title: "Data Storage and Security",
    description:
      "We use reasonable security measures to help protect your information. We do not sell your personal information to third parties.",
  },
  {
    icon: <FaDatabase size={24} />,
    title: "Data Retention",
    description:
      "We keep personal information only for as long as needed to provide Joborg, maintain security, meet legal or operational requirements, and resolve possible disputes.",
  },
  {
    icon: <FaEnvelopeOpenText size={24} />,
    title: "Privacy Questions",
    description:
      "You can contact us with questions about your account or personal information. Some requests may require identity verification and may be limited by security, legal, or operational requirements.",
  },
  {
    icon: <FaChartLine size={24} />,
    title: "Analytics",
    description:
      "We may use analytics tools to understand how users interact with Joborg, improve the platform, and identify issues. Analytics data may include usage events, device information, pages visited, and general interaction patterns.",
  }
];

export default function Privacy() {
  const router = useRouter();

  return (
    <section className="max-w-4xl mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold mb-6">Privacy Policy</h1>

      <p className="text-sm text-[var(--muted)] mb-6">
        Last updated: July 3, 2026
      </p>

      <p className="mb-6">
        Your privacy is important to us. This Privacy Policy explains how we collect, use,
        and protect your information when you use Joborg.
      </p>
      <div className="space-y-8">
        {PrivacyItems.map((item, index) => (
          <div key={index} className="flex items-start space-x-4">
            <div className="text-blue-500">{item.icon}</div>
            <div>
              <h2 className="text-xl font-semibold">{item.title}</h2>
              <p>{item.description}</p>
            </div>
          </div>
        ))}
      </div>

      <div className="flex flex-col md:flex-row justify-between rounded-[var(--radius-lg)] bg-[var(--info-softer)] p-8 my-12">
        <div className="flex gap-8 items-center">
          <div className="bg-[var(--info-soft)] rounded-full p-3">
            <FiRefreshCcw size={28} className="text-blue-600" />
          </div>
          <div className="flex flex-col text-start">
            <h1 className="text-lg font-bold mb-2 text-[var(--text)]">
              Questions about your privacy?
            </h1>
            <p className="text-[var(--muted)] max-w-lg">
              Contact us anytime.
            </p>
          </div>
        </div>

        <Button
          size="lg"
          className="flex items-center justify-center mt-6 rounded-[var(--radius-md)] bg-[var(--primary)] px-6 py-3 text-sm font-medium text-white transition hover:bg-[var(--primary-hover)] cursor-pointer"
          onPress={() => {
            router.push(RouteEnum.CONTACT);
            posthog.capture("privacy_page_contact_us_clicked", {
              location: "Privacy Page",
            });
          }}
        >
          Contact Us <FaArrowRight className="ml-2" />
        </Button>
      </div>
    </section>
  );
}