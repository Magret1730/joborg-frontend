"use client";

import { FaArrowRight, FaChevronDown } from "react-icons/fa";
import { FiMail } from "react-icons/fi";
import { Button, Accordion } from "@heroui/react";
import { useRouter } from "next/navigation";
import posthog from "posthog-js";
import { RouteEnum } from "@/enum/RouteEnum";

export const FAQQuestions: {
  question: string;
  answer: string;
}[] = [
  {
    question: "What is Joborg?",
    answer:
      "Joborg is a tool that monitor company career pages, detect updates, and stay organized during their job search.",
  },
  {
    question: "Who is Joborg for?",
    answer:
      "Joborg is for job seekers, new graduates, career switchers, and anyone who wants to follow specific companies more intentionally.",
  },
  {
    question: "What is a tracker?",
    answer:
      "A tracker is a saved career page that Joborg monitors for updates.",
  },
  {
    question: "How do I add a tracker?",
    answer:
      "Go to the Trackers page, click Add Tracker, then enter the company name and career page URL you want to monitor.",
  },
  {
    question: "Can I pause a tracker?",
    answer:
      "Yes. Pausing a tracker stops it from being actively monitored until you resume it.",
  },
  {
    question: "Can I edit or delete a tracker?",
    answer:
      "Yes. You can edit tracker details or delete a tracker when you no longer want to monitor that career page.",
  },
  {
    question: "What counts as a change?",
    answer:
      "A change is recorded when Joborg detects that the content of a tracked career page has been updated.",
  },
  {
    question: "Does every change mean a new job was posted?",
    answer:
      "No. A detected change means the page content changed, but you should review it to confirm whether it relates to a new job opportunity.",
  },
  {
    question: "Why is my tracker not working?",
    answer:
      "Some websites block automated checks, load content dynamically, or restrict access. If a tracker fails, confirm that the URL is correct and publicly accessible.",
  },
  {
    question: "How can I contact support?",
    answer:
      "You can use the Contact page to send a question, report an issue, or share feedback.",
  },
];

export default function FAQ() {
  const router = useRouter();

  return (
    <section className="mx-auto max-w-5xl px-4 py-12 sm:px-6 lg:px-8 lg:py-16">
      <div className="mx-auto max-w-3xl text-center">
        <h1 className="text-4xl font-bold tracking-tight text-[var(--text)] sm:text-5xl">
          Frequently asked questions
        </h1>

        <p className="mx-auto mt-4 max-w-2xl text-base leading-7 text-[var(--muted)] sm:text-lg">
          Find answers to common questions about using Joborg to track career
          pages, monitor updates, and stay organized.
        </p>
      </div>

      <div className="mt-12 rounded-[var(--radius-lg)] border border-[var(--border)] bg-[var(--card)] p-3 shadow-sm sm:p-5">
        <Accordion className="w-full space-y-3" variant="surface">
          {FAQQuestions.map((item) => (
            <Accordion.Item
              key={item.question}
              className="overflow-hidden rounded-[var(--radius-md)] border border-[var(--border)] bg-[var(--surface)]"
            >
              <Accordion.Heading>
                <Accordion.Trigger className="flex w-full items-center justify-between gap-4 px-4 py-4 text-left text-sm font-semibold text-[var(--text)] transition hover:bg-[var(--surface-hover)] sm:px-5 cursor-pointer">
                  <span>{item.question}</span>

                  <Accordion.Indicator>
                    <FaChevronDown className="text-xs text-[var(--muted)] transition-transform" />
                  </Accordion.Indicator>
                </Accordion.Trigger>
              </Accordion.Heading>

              <Accordion.Panel>
                <Accordion.Body className="border-t border-[var(--border)] px-4 py-4 text-sm leading-7 text-[var(--muted)] sm:px-5">
                  {item.answer}
                </Accordion.Body>
              </Accordion.Panel>
            </Accordion.Item>
          ))}
        </Accordion>
      </div>

      <div className="mt-12 rounded-[var(--radius-lg)] border border-[var(--border)] bg-[var(--card)] p-6 shadow-sm sm:p-8">
        <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
          <div className="flex gap-4">
            <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-[var(--radius-md)] bg-[var(--surface)] text-[var(--primary)]">
              <FiMail size={24} />
            </div>

            <div>
              <h2 className="text-xl font-bold text-[var(--text)]">
                Still have questions?
              </h2>

              <p className="mt-2 max-w-2xl text-sm leading-6 text-[var(--muted)] sm:text-base">
                Contact us anytime. We’ll help with questions, feedback, or
                issues you run into while using Joborg.
              </p>
            </div>
          </div>

          <Button
            size="lg"
            className="flex items-center justify-center rounded-[var(--radius-md)] bg-[var(--primary)] px-4 py-3 text-sm font-semibold text-white transition hover:bg-[var(--primary-hover)]"
            onPress={() => {
              router.push(RouteEnum.CONTACT);
              posthog.capture("faq_page_contact_us_clicked", {
                location: "FAQ Page",
              });
            }}
          >
            Contact Us <FaArrowRight className="ml-2" />
          </Button>
        </div>
      </div>
    </section>
  );
}