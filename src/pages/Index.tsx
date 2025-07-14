import Navigation from "@/components/Navigation";
import HeroSection from "@/components/HeroSection";
import AboutSection from "@/components/AboutSection";
import ServicesSection from "@/components/ServicesSection";
import ResultsSection from "@/components/ResultsSection";
import InsightsSection from "@/components/InsightsSection";
import ProcessSection from "@/components/ProcessSection";
import CredentialsSection from "@/components/CredentialsSection";
import ContactSection from "@/components/ContactSection";

const Index = () => {
  return (
    <div className="min-h-screen">
      <Navigation />
      <HeroSection />
      <AboutSection />
      <ServicesSection />
      <ResultsSection />
      <InsightsSection />
      <ProcessSection />
      <CredentialsSection />
      <ContactSection />
    </div>
  );
};

export default Index;
