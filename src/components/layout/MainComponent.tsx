import { ReactNode } from "react";
import { Header } from "@/components/layout/PublicHeader";
import { Footer } from "@/components/layout/Footer";
import { Sidebar } from "@/components/layout/Sidebar";
import { LayoutVariantEnum } from "@/enum/LayoutVariantEnum";

type MainComponentProps = {
  children: ReactNode;
  variant?: LayoutVariantEnum;
};

export const MainComponent = ({
  children,
  variant = LayoutVariantEnum.PUBLIC,
}: MainComponentProps) => {
  if (variant === LayoutVariantEnum.APP) {
    return (
      <div className="min-h-screen bg-[var(--bg)] text-[var(--text)]">
        <div className="flex min-h-screen">
          <Sidebar />

          <div className="flex min-h-screen flex-1 flex-col">
            <Header variant={LayoutVariantEnum.APP} />

            <main className="flex-1 px-6 py-6">{children}</main>
          </div>
        </div>
      </div>
    );
  }

  if (variant === LayoutVariantEnum.AUTH) {
    return (
      <div className="min-h-screen bg-[var(--bg)] text-[var(--text)]">
        <Header variant={LayoutVariantEnum.AUTH} />

        <main className="flex min-h-[calc(100vh-73px)] items-center justify-center px-4 py-10">
          {children}
        </main>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[var(--bg)] text-[var(--text)]">
      <Header variant={LayoutVariantEnum.PUBLIC} />

      <main>{children}</main>

      <Footer />
    </div>
  );
};