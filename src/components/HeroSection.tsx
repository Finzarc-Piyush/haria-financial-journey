import { useEffect, useState } from 'react';
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ChevronDown, Award, Users, TrendingUp, Building } from "lucide-react";
import heroBackground from "@/assets/hero-office-background.jpg";
import advisorHeadshot from "@/assets/advisor-headshot.jpg";

const HeroSection = () => {
  const [counters, setCounters] = useState({
    years: 0,
    aum: 0,
    clients: 0,
    generations: 0
  });

  const trustIndicators = [
    { value: 'Since 1957', label: 'Years of Heritage' },
    { value: '₹500+ Crores', label: 'AUM Managed' },
    { value: '1000+', label: 'Satisfied Clients' },
    { value: 'Three', label: 'Generations Served' }
  ];

  useEffect(() => {
    // Animate counters when component mounts
    const animateCounter = (key: keyof typeof counters, target: number, duration: number) => {
      let start = 0;
      const increment = target / (duration / 16);
      
      const timer = setInterval(() => {
        start += increment;
        if (start >= target) {
          start = target;
          clearInterval(timer);
        }
        setCounters(prev => ({ ...prev, [key]: Math.floor(start) }));
      }, 16);
    };

    setTimeout(() => {
      animateCounter('years', 67, 2000); // 1957 to 2024
      animateCounter('aum', 500, 2500);
      animateCounter('clients', 1000, 2000);
      animateCounter('generations', 3, 1500);
    }, 1000);
  }, []);

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section id="hero" className="relative">
      <div className="min-h-screen relative bg-gradient-to-br from-tertiary via-tertiary/95 to-deep-charcoal overflow-hidden">
        {/* Background Image with Overlay */}
        <div className="absolute inset-0" data-aos="fade-in" data-aos-duration="1200">
          <img 
            src={heroBackground}
            alt="Luxury financial advisory office"
            className="w-full h-full object-cover transform scale-105 transition-transform duration-20000 hover:scale-110"
          />
          <div className="absolute inset-0 bg-primary/70"></div>
        </div>

        {/* Content */}
        <div className="relative z-10 flex items-center justify-center min-h-screen px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-4xl mx-auto">
            {/* Professional Headshot */}
            <div className="mb-8" data-aos="fade-up" data-aos-delay="200">
              <div className="w-32 h-32 mx-auto mb-6 relative group">
                <img 
                  src={advisorHeadshot}
                  alt="Rajesh Haria - Financial Advisor"
                  className="w-full h-full rounded-full object-cover border-4 border-secondary shadow-elegant transition-transform duration-300 group-hover:scale-105"
                />
                <div className="absolute inset-0 rounded-full border-2 border-champagne animate-pulse"></div>
              </div>
            </div>

            {/* Main Headline with Typewriter Effect */}
            <div className="mb-6" data-aos="fade-up" data-aos-delay="400">
              <h1 className="font-playfair text-4xl md:text-6xl font-bold text-tertiary mb-4 leading-tight">
                <span className="inline-block overflow-hidden border-r-2 border-secondary animate-typewriter">
                  Comprehensive Financial Planning
                </span>
                <br />
                <span className="text-secondary">for Successful Professionals</span>
              </h1>
            </div>

            {/* Subtitle */}
            <div className="mb-8" data-aos="fade-up" data-aos-delay="600">
              <p className="font-crimson text-xl md:text-2xl text-tertiary/80 mb-4">
                Fiduciary-focused wealth management with tax-efficient strategies
              </p>
              <p className="font-crimson text-lg text-tertiary/70 max-w-3xl mx-auto">
                Embrace a future of financial excellence with HARIA INVESTMENTS. Our commitment goes 
                beyond traditional financial services; we're your partners in every step of your financial journey.
              </p>
            </div>

            {/* Trust Indicators with Animated Counters */}
            <div className="mb-10" data-aos="fade-up" data-aos-delay="800">
              <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
                {trustIndicators.map((indicator, index) => (
                  <div key={index} className="text-center group">
                    <div className="mb-2">
                      <span className="font-playfair text-3xl md:text-4xl font-bold text-secondary transition-all duration-300 group-hover:scale-110 inline-block">
                        {indicator.value}
                      </span>
                    </div>
                    <p className="font-crimson text-sm text-tertiary/70 transition-colors duration-300 group-hover:text-tertiary">
                      {indicator.label}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center" data-aos="fade-up" data-aos-delay="1000">
              <Button 
                size="lg" 
                className="bg-secondary text-secondary-foreground hover:bg-secondary/90 font-crimson font-semibold px-8 py-4 text-lg shadow-elegant hover:shadow-floating transition-all duration-300 hover:scale-105 active:scale-95 relative overflow-hidden group"
                onClick={() => scrollToSection('contact')}
              >
                <span className="relative z-10">Schedule Consultation</span>
                <div className="absolute inset-0 bg-gradient-to-r from-secondary to-tertiary opacity-0 group-hover:opacity-20 transition-opacity duration-300"></div>
              </Button>
              <Button 
                size="lg" 
                variant="outline" 
                className="border-2 border-secondary text-secondary hover:bg-secondary hover:text-secondary-foreground font-crimson font-semibold px-8 py-4 text-lg transition-all duration-300 hover:scale-105 active:scale-95"
                onClick={() => scrollToSection('about')}
              >
                Learn More
              </Button>
            </div>

            {/* Professional Badges */}
            <div className="mt-8" data-aos="fade-up" data-aos-delay="1200">
              <div className="flex flex-wrap justify-center gap-3">
                <Badge variant="secondary" className="font-crimson transition-transform duration-300 hover:scale-105">
                  CFA Charter Holder
                </Badge>
                <Badge variant="secondary" className="font-crimson transition-transform duration-300 hover:scale-105">
                  CFP Certified
                </Badge>
                <Badge variant="secondary" className="font-crimson transition-transform duration-300 hover:scale-105">
                  SEBI Registered
                </Badge>
                <Badge variant="secondary" className="font-crimson transition-transform duration-300 hover:scale-105">
                  Fiduciary Advisor
                </Badge>
              </div>
            </div>
          </div>

          {/* Scroll Indicator */}
          <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
            <button
              onClick={() => scrollToSection('about')}
              className="text-tertiary/60 hover:text-secondary transition-colors duration-300"
            >
              <ChevronDown className="w-8 h-8" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;