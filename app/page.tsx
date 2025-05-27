import { HeroSection } from "../components/HeroSection";
import { AboutSection } from "../components/AboutSection";
import { TechStackSection } from "../components/TechStackSection";

export default function Home() {
  return (
    <main className="min-h-screen">
      <HeroSection />
      <AboutSection />
      <TechStackSection />
    </main>
  );
}
