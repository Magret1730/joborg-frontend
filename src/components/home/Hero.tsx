"use client";

import { Button } from "@heroui/react";
import { useRouter } from "next/navigation";
import { RouteEnum } from "@/enum/RouteEnum";
import { FaArrowRight } from "react-icons/fa6";

export const Hero = () => {
  const router = useRouter();

  return (
    <section className="flex flex-col items-center justify-center gap-4 px-6 py-24 text-center">
      <div>
        <p className="text-4xl md:text-7xl font-semibold">
          Never Miss a Job
        </p>
        <p className="text-4xl md:text-7xl font-bold text-[var(--primary)]">
          Opportunity
        </p>
      </div>

      <p className="max-w-2xl text-base md:text-xl text-[var(--muted)] mt-4">
        Track company career pages and job boards.
        Get instant alerts when new positions match your keywords. Stay ahead in your job search.
      </p>

      <div className="flex flex-col md:flex-row">
        <Button
          size="lg"
          className="flex items-center mt-6 rounded-[var(--radius-md)] bg-[var(--primary)] px-6 py-3 text-sm font-medium text-white transition hover:bg-[var(--primary-hover)] cursor-pointer"
          onPress={() => {
            router.push(RouteEnum.REGISTER);
          }}
        >
          Start Tracking Free <FaArrowRight className="ml-2" />
        </Button>

        <Button
          size="lg"
          className="ml-4 mt-6 rounded-[var(--radius-md)] border border-[var(--input-border)] px-6 py-3 text-sm font-medium text-[var(--text)] transition hover:border-[var(--primary)] cursor-pointer"
          onPress={() => {
            router.push(RouteEnum.LOGIN);
          }}
        >
          Sign In
        </Button>
      </div>
    </section>
  )
}