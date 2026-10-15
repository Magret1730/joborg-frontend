import {
  FaSearch,
  FaExchangeAlt,
  FaRegEnvelope,
  FaRegClock,
} from "react-icons/fa";
import { Card } from "@heroui/react";

const EVERYTHING_YOU_NEED_TO_KNOW_ITEMS: {
  icon: React.ReactNode;
  title: string;
  description: string;
}[] = [
  {
    icon: <FaSearch />,
    title: "Career Page Tracking",
    description: "Add any company career page and we'll monitor it for changes.",
  },
  {
    icon: <FaExchangeAlt />,
    title: "Change Detection",
    description:
      "We check pages regularly and detect any content changes automatically.",
  },
  {
    icon: <FaRegEnvelope />,
    title: "Email Alerts",
    description: "Get notified instantly when changes are detected.",
  },
  {
    icon: <FaRegClock />,
    title: "History & Logs",
    description: "View change history and all alerts in one place.",
  },
];

export const EverythingYouNeedToKnow = () => {
  return (
    <section className="border-t border-[var(--border)] py-16 md:py-20">
      <div className="mx-auto flex w-full max-w-6xl flex-col items-center px-6 text-center">
        <div className="max-w-6xl">
          <p className="text-lg font-semibold tracking-tight text-[var(--foreground)] md:text-xl lg:text-5xl">
            Everything you need to stay ahead
          </p>

          <p className="mx-auto mt-5 max-w-2xl text-lg leading-8 text-[var(--muted)] md:text-xl">
            Powerful features to monitor career pages and get notified about
            relevant opportunities.
          </p>
        </div>

        <div className="mt-14 grid w-full grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {EVERYTHING_YOU_NEED_TO_KNOW_ITEMS.map((item, index) => (
            <Card
              key={index}
              className="group h-full rounded-[var(--radius-lg)] border border-[var(--input-border)] p-6 shadow-sm"
            >
              <div className="flex h-full flex-col items-start text-left">
                <div className="mb-6 flex h-12 w-12 items-center justify-center rounded-xl bg-[var(--primary)]/10 text-2xl text-[var(--primary)]">
                  {item.icon}
                </div>

                <p className="text-xl font-semibold leading-snug text-[var(--foreground)]">
                  {item.title}
                </p>

                <p className="mt-3 text-base leading-7 text-[var(--muted)]">
                  {item.description}
                </p>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};