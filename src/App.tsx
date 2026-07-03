import { GlobalBackground } from "@/components/background/GlobalBackground";
import { CustomCursor } from "@/components/layout/CustomCursor";
import { SmoothScroll } from "@/components/layout/SmoothScroll";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { Experience } from "@/components/sections/Experience";
import { LiveDashboard } from "@/components/sections/LiveDashboard";
import { WhoWeHelp } from "@/components/sections/WhoWeHelp";
import { ProblemSection } from "@/components/sections/ProblemSection";
import { HowWeWork } from "@/components/sections/HowWeWork";
import { Services } from "@/components/sections/Services";
import { OperatingSystem } from "@/components/sections/OperatingSystem";
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
        <Experience />
        <LiveDashboard />
        <WhoWeHelp />
        <ProblemSection />
        <HowWeWork />
        <Services />
        <OperatingSystem />
        <RealResults />
        <Testimonials />
        <Contact />
      </main>

      <Footer />
    </SmoothScroll>
  );
}
