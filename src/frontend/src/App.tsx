import { AboutSection } from "@/components/AboutSection";
import { CarSection } from "@/components/CarSection";
import { ContactSection } from "@/components/ContactSection";
import { F1LoadingScreen } from "@/components/F1LoadingScreen";
import { HeroSection } from "@/components/HeroSection";
import { Layout } from "@/components/Layout";
import { SponsorsSection } from "@/components/SponsorsSection";
import { TeamSection } from "@/components/TeamSection";
import { useCallback, useState } from "react";

export default function App() {
  const [loaded, setLoaded] = useState(false);

  const handleLoadComplete = useCallback(() => {
    setLoaded(true);
  }, []);

  return (
    <>
      {!loaded && <F1LoadingScreen onComplete={handleLoadComplete} />}
      <div
        className={`transition-opacity duration-700 ${loaded ? "opacity-100" : "opacity-0"}`}
        aria-hidden={!loaded}
      >
        <Layout>
          <HeroSection />
          <AboutSection />
          <CarSection />
          <TeamSection />
          <SponsorsSection />
          <ContactSection />
        </Layout>
      </div>
    </>
  );
}
