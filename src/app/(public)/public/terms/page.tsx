"use client";

import {
  FaUserShield,
  FaLock,
  FaEnvelopeOpenText,
  FaArrowRight,
  FaBell,
  FaBan,
  FaExternalLinkAlt,
  FaTools,
  FaFileContract,
  FaExclamationTriangle,
} from "react-icons/fa";
import { FaCircleInfo } from "react-icons/fa6";
import { FiRefreshCcw } from "react-icons/fi";
import { Button } from "@heroui/react";
import { useRouter } from "next/navigation";
import posthog from "posthog-js";
import { RouteEnum } from "@/enum/RouteEnum";

const TermsItems: {
  icon: React.ReactNode;
  title: string;
  description: string;
}[] = [
  {
    icon: <FaFileContract size={24} />,
    title: "Acceptance of Terms",
    description:
      "By creating an account or using Joborg, you agree to these Terms of Use. If you do not agree with these terms, you should not use the platform.",
  },
  {
    icon: <FaCircleInfo size={24} />,
    title: "About Joborg",
    description:
      "Joborg helps users save and monitor career pages or job-related pages for changes. The platform is designed to support job tracking, but it does not guarantee that every change, job posting, or update will be detected.",
  },
  {
    icon: <FaUserShield size={24} />,
    title: "Account Responsibility",
    description:
      "You are responsible for keeping your login details secure and for all activity that happens under your account. You should provide accurate information and notify us if you believe your account has been accessed without permission.",
  },
  {
    icon: <FaBell size={24} />,
    title: "Trackers and Alerts",
    description:
      "Joborg may send alerts when tracked pages appear to change. Alerts are provided for convenience only and may not always be accurate, complete, or delivered on time. You are still responsible for checking important career pages directly.",
  },
  {
    icon: <FaBan size={24} />,
    title: "Acceptable Use",
    description:
      "You agree not to misuse Joborg, overload the service, track unlawful or harmful content, attempt to bypass security controls, interfere with other users, or use the platform in a way that violates applicable laws or third-party rights.",
  },
  {
    icon: <FaExternalLinkAlt size={24} />,
    title: "Third-Party Websites",
    description:
      "Joborg may help you monitor pages owned by third parties. We do not control those websites and are not responsible for their content, availability, accuracy, policies, or changes.",
  },
  {
    icon: <FaTools size={24} />,
    title: "Service Changes and Limits",
    description:
      "We may update, limit, suspend, or discontinue parts of Joborg at any time. Some features may have usage limits to protect the platform, improve performance, or prevent misuse.",
  },
  {
    icon: <FaLock size={24} />,
    title: "Privacy and Data",
    description:
      "Your use of Joborg is also covered by our Privacy Policy, which explains how we collect, use, store, and protect information related to your account and use of the platform.",
  },
  {
    icon: <FaExclamationTriangle size={24} />,
    title: "No Guarantees",
    description:
      "Joborg is provided as is and as available. We do not guarantee uninterrupted service, error-free tracking, complete change detection, or that the platform will meet every user need.",
  },
  {
    icon: <FaEnvelopeOpenText size={24} />,
    title: "Questions",
    description:
      "If you have questions about these terms or your use of Joborg, you can contact us through the contact page.",
  },
];

export default function Terms() {
  const router = useRouter();

  return (
    <section className="max-w-4xl mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold mb-3">Terms of Use</h1>

      <p className="text-sm text-[var(--muted)] mb-6">
        Last updated: July 3, 2026
      </p>

      <p className="mb-6">
        These Terms of Use explain the rules for using Joborg. Please read them
        carefully before using the platform.
      </p>

      <div className="space-y-8">
        {TermsItems.map((item, index) => (
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
              Questions about these terms?
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
            posthog.capture("terms_page_contact_us_clicked", {
              location: "Terms Page",
            });
          }}
        >
          Contact Us <FaArrowRight className="ml-2" />
        </Button>
      </div>
    </section>
  );
}