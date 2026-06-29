import Link from "next/link";
import { AppLogo } from "@/components/ui/AppLogo";
import { RouteEnum } from "@/enum/RouteEnum";

const FOOTER_LINKS: {
  title: string;
  links: { label: string; href: string }[];
}[] = [
  {
    title: "Product",
    links: [
      { label: "Features", href: "#features" },
      { label: "How it Works", href: "#how-it-works" },
      { label: "Pricing", href: "#pricing" },
      { label: "Integrations", href: "#integrations" },
    ],
  },
  {
    title: "Resources",
    links: [
      { label: "FAQ", href: "#faq" },
      { label: "Help Center", href: "#help-center" },
      { label: "Feedback", href: "#feedback" },
      { label: "API", href: "#api" },
    ],
  },
  {
    title: "Company",
    links: [
      { label: "About Us", href: RouteEnum.ABOUT },
      { label: "Privacy Policy", href: RouteEnum.PRIVACY },
      { label: "Terms of Service", href: RouteEnum.TERMS },
      { label: "Contact", href: RouteEnum.CONTACT },
    ],
  },
];

export const Footer = () => {
  return (
    <footer className="border-t border-[var(--border)] px-6 py-12">
      <div className="mx-auto w-full max-w-6xl">
        <div className="grid gap-10 md:grid-cols-[1.4fr_1fr_1fr_1fr]">
          <div>
            <Link href={RouteEnum.HOME} className="flex items-center gap-2">
              <AppLogo />
            </Link>

            <p className="mt-5 max-w-xs text-base leading-7 text-[var(--muted)]">
              Track career pages. <br />
              Catch changes early.
            </p>
          </div>

          {FOOTER_LINKS.map((column) => (
            <div key={column.title}>
              <h3 className="font-semibold text-[var(--foreground)]">
                {column.title}
              </h3>

              <ul className="mt-4 space-y-3">
                {column.links.map((link) => (
                  <li key={link.label}>
                    <Link
                      href={link.href}
                      className="text-sm text-[var(--muted)] transition hover:text-[var(--primary)]"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <p className="mt-12 text-center text-sm text-[var(--muted)]">
          &copy; {new Date().getFullYear()} Joborg. All rights reserved.
        </p>
      </div>
    </footer>
  );
};
