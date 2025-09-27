import { useEffect, useState } from "react";
import HeroSection from "@/components/HeroSection";
import AboutSection from "@/components/AboutSection";
import ServicesSection from "@/components/ServicesSection";
import ProcessSection from "@/components/ProcessSection";
import ContactSection from "@/components/ContactSection";
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
    text: "Haria's disciplined approach helped me start a long-term SIP confidently. Their team provided clear guidance on asset allocation and helped me understand the importance of staying invested during market volatility. The personalized attention and regular portfolio reviews have been exceptional. I've seen consistent growth in my investments over the past 3 years, and I'm confident about my financial future.",
    href: "https://twitter.com/aarav_fin",
  },
  {
    author: {
      name: "Isha Patel",
      handle: "@isha_invests",
      avatar: "https://images.unsplash.com/photo-1524504388940-b1c1722653e1?w=150&h=150&fit=crop&crop=faces",
    },
    text: "Clear, unbiased guidance tailored to my family's financial goals. The team at Haria took time to understand our unique situation - planning for our children's education, our retirement, and managing our existing investments. Their comprehensive approach covered everything from insurance needs to tax-efficient investment strategies. The transparency in their recommendations and the regular communication has built tremendous trust.",
    href: "https://twitter.com/isha_invests",
  },
  {
    author: {
      name: "Rohit Verma",
      handle: "@rohitv",
      avatar: "https://images.unsplash.com/photo-1547425260-76bcadfb4f2c?w=150&h=150&fit=crop&crop=faces",
    },
    text: "Their portfolio strategy balanced growth and stability perfectly for me. As someone who was new to investing, I was initially overwhelmed by the options available. Haria's team simplified everything and created a diversified portfolio that matched my risk appetite and financial goals. The educational sessions they provided helped me understand market dynamics better. Today, I feel confident making informed decisions about my investments.",
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
      <ProcessSection />
      <ContactSection />
    </div>
  );
};

export default Index;
