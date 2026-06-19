import {
  Hero,
  EverythingYouNeedToKnow,
  ReadyToTrackCTA,
  FinalCTA,
} from "@/components/home/";
import { MainComponent } from "@/components/layout/MainComponent";
import { LayoutVariantEnum } from "@/enum/LayoutVariantEnum";

export default function Home() {
  return (
    <MainComponent variant={LayoutVariantEnum.PUBLIC}>
      <Hero />
      <EverythingYouNeedToKnow />
      {/* <ReadyToTrackCTA /> */}
      <FinalCTA />
    </MainComponent>
  );
}
