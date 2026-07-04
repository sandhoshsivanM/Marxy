import { GlobalBackground } from "@/components/background/GlobalBackground";
import { CustomCursor } from "@/components/layout/CustomCursor";
import { SmoothScroll } from "@/components/layout/SmoothScroll";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { Hero } from "@/components/sections/Hero";
import { LiveDashboard } from "@/components/sections/LiveDashboard";
import { WhoWeHelp } from "@/components/sections/WhoWeHelp";
import { ProblemSection } from "@/components/sections/ProblemSection";
import { HowWeWork } from "@/components/sections/HowWeWork";
import { Services } from "@/components/sections/Services";
import { GrowthSystem } from "@/components/sections/GrowthSystem";
import { RealResults } from "@/components/sections/RealResults";
import { Testimonials } from "@/components/sections/Testimonials";
import { Contact } from "@/components/sections/Contact";
import { useReducedMotion } from "@/hooks/useReducedMotion";

export default function App() {
  useReducedMotion();

  return (
    <SmoothScroll>
      <GlobalBackground />
      <CustomCursor />
      <Navbar />

      <main id="top" className="relative">
        <Hero />
        <LiveDashboard />
        <WhoWeHelp />
        <ProblemSection />
        <HowWeWork />
        <Services />
        <GrowthSystem />
        <RealResults />
        <Testimonials />
        <Contact />
      </main>

      <Footer />
    </SmoothScroll>
  );
}
