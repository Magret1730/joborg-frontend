"use client";

import Image from "next/image";
import { FaArrowRight } from "react-icons/fa";
import {
  FiTarget,
  FiBell,
  FiClock,
  FiLink,
  FiRefreshCcw,
} from "react-icons/fi";
import { RouteEnum } from "@/enum/RouteEnum";
import posthog from "posthog-js";
import { Button } from "@heroui/react";
import { useRouter } from "next/navigation";

const AboutItems: {
  icon: React.ReactNode;
  title: string;
  description: string;
}[] = [
  {
    icon: <FiBell size={28} className="text-blue-600" />,
    title: "Simple Tracking",
    description: "Save and organize importatnt career pages in one place.",
  },
  {
    icon: <FiClock size={28} className="text-blue-600" />,
    title: "Clear Updates",
    description: "See when a page changes with easy-to-understand updates.",
  },
  {
    icon: <FiLink size={28} className="text-blue-600" />,
    title: "Less Manual Work",
    description: "Spend less time refreshing pages and more time applying",
  },
];

export default function About() {
  const router = useRouter();

  return (
    <section className="max-w-7xl mx-auto px-4 py-12 sm:px-6 lg:px-8 lg:py-16">
      <div className="grid items-center gap-10 lg:grid-cols-2 lg:gap-14">
        <div className="">
          <div className="pt-8">
            <h1 className="text-5xl font-bold mb-4 text-[var(--text)]">
              About Joborg
            </h1>
            <p className="text-lg max-w-xl text-[var(--muted)]">
              Joborg was created to help job seekers spend less time manually
              checking career pages and more time preparing and applying.
            </p>
          </div>

          <div className="my-8 flex items-center max-w-lg rounded-lg p-8 bg-[var(--info-softer)]">
            <div className="bg-[var(--info-soft)] rounded-full p-3 mr-4">
              <FiTarget size={40} className="text-blue-600" />
            </div>
            <div>
              <h1 className="text-lg font-bold mb-2">Our mission</h1>
              <p className="text-lg max-w-lg text-[var(--muted)]">
                To make job searching more organized, transparent and less time
                consuming by tracking career page updates that matter.
              </p>
            </div>
          </div>

          <div>
            <h1 className="text-2xl font-bold mb-2">Why Joborg exists</h1>
            <p className="text-[var(--muted)] max-w-xl">
              Many job seekers repeatedly check the same company job pages,
              hoping not to miss opportunities. Joborg takes care of the
              monitoring so you can focus on what moves your career forward.
            </p>
          </div>
        </div>
        <div className="">
          <Image
            src="/undraw_job-hunt_5umi.svg"
            alt="About Us"
            width={800}
            height={500}
            className="rounded-lg"
          />
        </div>
      </div>

      <div className="my-16 grid gap-4 md:grid-cols-3">
        {AboutItems.map((item, index) => (
          <div
            key={index}
            className="rounded-[var(--radius-lg)] bg-[var(--card)] p-5"
          >
            <div className="mb-2 flex h-12 w-12 items-center justify-center rounded-full bg-[var(--info-soft)] text-[var(--primary)]">
              {item.icon}
            </div>

            <h2 className="text-lg font-bold text-[var(--text)]">
              {item.title}
            </h2>

            <p className="mt-2 text-base leading-6 text-[var(--muted)]">
              {item.description}
            </p>
          </div>
        ))}
      </div>

      <div className="flex flex-col md:flex-row justify-between rounded-[var(--radius-lg)] bg-[var(--info-softer)] p-8">
        <div className="flex gap-8 items-center">
          <div className="bg-[var(--info-soft)] rounded-full p-3">
            <FiRefreshCcw size={28} className="text-blue-600" />
          </div>
          <div className="flex flex-col text-start">
            <h1 className="text-lg font-bold mb-2 text-[var(--text)]">
              Built for job seekers like you
            </h1>
            <p className="text-[var(--muted)] max-w-lg">
              Whether you're a student, recent graduate, or career switcher,
              Joborg is here to help you stay informed and ready.
            </p>
          </div>
        </div>

        <Button
          size="lg"
          className="flex items-center justify-center mt-6 rounded-[var(--radius-md)] bg-[var(--primary)] px-6 py-3 text-sm font-medium text-white transition hover:bg-[var(--primary-hover)] cursor-pointer"
          onPress={() => {
            router.push(RouteEnum.REGISTER);
            posthog.capture("about_page_get_started_clicked", {
              location: "About Page",
            });
          }}
        >
          Get Started <FaArrowRight className="ml-2" />
        </Button>
      </div>
    </section>
  );
}
