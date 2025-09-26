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
import CoreValues from "@/components/CoreValues";
import { TestimonialsSection } from "@/components/ui/testimonials-with-marquee";
import AMCShowcase from "@/components/AMCShowcase";

const testimonials = [
  {
    author: {
      name: "Aarav Sharma",
      handle: "@aarav_fin",
      avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150&h=150&fit=crop&crop=faces",
    },
    text: "Haria's disciplined approach helped me start a long-term SIP confidently.",
    href: "https://twitter.com/aarav_fin",
  },
  {
    author: {
      name: "Isha Patel",
      handle: "@isha_invests",
      avatar: "https://images.unsplash.com/photo-1524504388940-b1c1722653e1?w=150&h=150&fit=crop&crop=faces",
    },
    text: "Clear, unbiased guidance tailored to my family's financial goals.",
    href: "https://twitter.com/isha_invests",
  },
  {
    author: {
      name: "Rohit Verma",
      handle: "@rohitv",
      avatar: "https://images.unsplash.com/photo-1547425260-76bcadfb4f2c?w=150&h=150&fit=crop&crop=faces",
    },
    text: "Their portfolio strategy balanced growth and stability perfectly for me.",
  },
];

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
      <TestimonialsSection
        title="Trusted by families across India"
        description="Thoughtful financial planning and consistent execution for long-term wealth creation."
        testimonials={testimonials}
      />
      <AMCShowcase />
      <AboutSection />
      <CoreValues />
      <ServicesSection />
      {/* <ResultsSection /> */}
      {/* <PartnerShowcase category="life" className="bg-background" /> */}
      <InsightsSection />
      <ProcessSection />
      <CredentialsSection />
      <ContactSection />
    </div>
  );
};

export default Index;
