import { CtaSection } from "./CtaSection";
import { FeaturesGrid } from "./FeaturesGrid";
import { Footer } from "./Footer";
import { HeroSection } from "./HeroSection";
import { TopNavBar } from "./TopNavBar";

export function LandingPage() {
  return (
    <div className="min-h-screen">
      <TopNavBar />

      <main>
        <HeroSection />
        <FeaturesGrid />
        <CtaSection />
      </main>

      <Footer />
    </div>
  );
}
