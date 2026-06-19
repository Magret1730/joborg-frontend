"use client";

import Link from "next/link";
import { FaArrowRight } from "react-icons/fa";
import { useRouter } from "next/navigation";
import { Button } from "@heroui/react";
import { RouteEnum } from "@/enum/RouteEnum";

export const FinalCTA = () => {
  const router = useRouter();

  return (
    <section className="border-t border-[var(--border)] bg-[var(--background)] px-6 py-20 md:py-24">
      <div className="mx-auto flex max-w-4xl flex-col items-center text-center">
        <h2 className="text-4xl font-bold tracking-tight text-[var(--foreground)] md:text-5xl">
          Ready to Track Your Dream Job?
        </h2>

        <p className="mt-6 max-w-2xl text-lg leading-8 text-[var(--muted)] md:text-xl">
          Join hundreds of job seekers who are staying ahead with automated
          career page monitoring.
        </p>

        <Button
          size="lg"
          className="flex items-center mt-6 rounded-[var(--radius-md)] bg-[var(--primary)] px-6 py-3 text-sm font-medium text-white transition hover:bg-[var(--primary-hover)] cursor-pointer"
          onPress={() => {
            router.push(RouteEnum.REGISTER);
          }}
        >
          Create Free Account <FaArrowRight className="ml-2" />
        </Button>
      </div>
    </section>
  );
};
