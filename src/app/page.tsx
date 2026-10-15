import {
  Hero,
  EverythingYouNeedToKnow,
  ReadyToTrackCTA,
  FinalCTA,
} from "@/components/home/";
import { MainComponent } from "@/components/layout/MainComponent";
import { LayoutVariantEnum } from "@/enum/LayoutVariantEnum";
import { GuestOnlyRoute } from "@/components/auth/GuestOnlyRoute";

export default function Home() {
  return (
    <GuestOnlyRoute>
      <MainComponent variant={LayoutVariantEnum.PUBLIC}>
        <Hero />
        <EverythingYouNeedToKnow />
        {/* <ReadyToTrackCTA /> */}
        <FinalCTA />
      </MainComponent>
    </GuestOnlyRoute>
  );
}
