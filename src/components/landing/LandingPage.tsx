import { HeroSection } from "./HeroSection";
import { StatsSection } from "./StatsSection";
import { FeaturesSection } from "./FeaturesSection";
import { HowItWorksSection } from "./HowItWorksSection";
import { DemoItemsSection } from "./DemoItemsSection";
import { WhyLostXSection } from "./WhyLostXSection";
import { CtaSection } from "./CtaSection";

export function LandingPage() {
  return (
    <main className="overflow-x-hidden">
      <HeroSection />
      <StatsSection />
      <HowItWorksSection />
      <FeaturesSection />
      <DemoItemsSection />
      <WhyLostXSection />
      <CtaSection />
    </main>
  );
}
