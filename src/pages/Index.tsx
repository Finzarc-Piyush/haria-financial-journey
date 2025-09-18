import { useEffect, useState } from "react";
import HeroSection from "@/components/HeroSection";
import AboutSection from "@/components/AboutSection";
import ServicesSection from "@/components/ServicesSection";
import ResultsSection from "@/components/ResultsSection";
import InsightsSection from "@/components/InsightsSection";
import ProcessSection from "@/components/ProcessSection";
import CredentialsSection from "@/components/CredentialsSection";
import ContactSection from "@/components/ContactSection";
import PartnerShowcase from "@/components/PartnerShowcase";
import Footer from "@/components/Footer";
import PortfolioManagement from './PortfolioManagement';

const Index = () => {
  const [heroInView, setHeroInView] = useState(true);

  useEffect(() => {
    const hero = document.getElementById("hero");
    if (!hero) return;
    const observer = new window.IntersectionObserver(
      ([entry]) => setHeroInView(entry.isIntersecting),
      { threshold: 0.3 }
    );
    observer.observe(hero);
    return () => observer.disconnect();
  }, []);

  return (
    <div className="min-h-screen">
      <HeroSection />
      <AboutSection />
      <ServicesSection />
      <ResultsSection />
      <PartnerShowcase category="life" className="bg-background" />
      <PartnerShowcase category="health" className="bg-muted/30" />
      <InsightsSection />
      <ProcessSection />
      <CredentialsSection />
      <ContactSection />
    </div>
  );
};

export default Index;
