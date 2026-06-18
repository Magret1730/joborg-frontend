import { Hero } from "@/components/home/Hero";
import { MainComponent } from "@/components/layout/MainComponent";
import { LayoutVariantEnum } from "@/enum/LayoutVariantEnum";

export default function Home() {
  return (
    <MainComponent variant={LayoutVariantEnum.PUBLIC}>
      <Hero />
    </MainComponent>
  );
}
