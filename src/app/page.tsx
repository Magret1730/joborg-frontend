import { PublicHeader } from "@/components/layout/PublicHeader";
import { Footer } from "@/components/layout/Footer";
import { MainComponent } from "@/components/layout/MainComponent";
import { LayoutVariantEnum } from "@/enum/LayoutVariantEnum";

export default function Home() {
  return (
    <MainComponent variant={LayoutVariantEnum.PUBLIC}>
      <h1 className="text-4xl font-bold">Welcome to JobOrg</h1>
      <p className="mt-4 text-lg">Your one-stop solution for job management.</p>
    </MainComponent>
  );
}
