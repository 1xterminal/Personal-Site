import { Header } from "@/app/components/layout/Header";
import { Footer } from "@/app/components/layout/Footer";
import { HeroSection } from "@/app/components/home/HeroSection";
import { ThingsSection } from "@/app/components/home/ThingsSection";
import { InterestsSection } from "@/app/components/home/InterestsSection";
import { AboutSection } from "@/app/components/home/AboutSection";
import { ThemeToggle } from "@/app/components/ui/ThemeToggle";
import { ScrollProgress } from "@/app/components/ui/ScrollProgress";
import { BackToTop } from "@/app/components/ui/BackToTop";
import { ScrollBackground } from "@/app/components/animations/ScrollBackground";

export default function Home() {
  return (
    <ScrollBackground>
      {/* UI Enhancements */}
      <ScrollProgress />
      <BackToTop />

      {/* Viewport Border Glow Effect */}
      <div className="viewport-glow" aria-hidden="true" />

      <ThemeToggle />

      {/* Header & Hero */}
      <div className="relative flex flex-col w-full max-w-[1440px] mx-auto px-6 md:px-12 lg:px-20">
        <Header />
        <HeroSection />
      </div>

      {/* Things */}
      <ThingsSection />

      {/* Interests */}
      <InterestsSection />

      {/* About */}
      <AboutSection />

      {/* Footer */}
      <div className="w-full max-w-[1440px] mx-auto px-6 md:px-12 lg:px-20">
        <Footer />
      </div>
    </ScrollBackground>
  );
}
