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
  
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
    
    // Animate counters
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
    }, 500);
  }, []);

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section 
      id="hero" 
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
      style={{
        backgroundImage: `linear-gradient(rgba(245, 241, 232, 0.7), rgba(245, 241, 232, 0.7)), url(${heroBackground})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundAttachment: 'fixed'
      }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="text-center">
          {/* Professional Headshot */}
          <div className={`mb-8 transition-all duration-1000 ${isVisible ? 'animate-scale-in' : 'opacity-0'}`}>
            <div className="relative inline-block">
              <img
                src={advisorHeadshot}
                alt="Professional Financial Advisor"
                className="w-32 h-32 rounded-full mx-auto border-4 border-secondary shadow-elegant"
              />
              <div className="absolute -bottom-2 -right-2 bg-secondary text-secondary-foreground rounded-full p-2">
                <Award className="w-4 h-4" />
              </div>
            </div>
          </div>

          {/* Main Headline with Typewriter Effect */}
          <div className={`mb-6 transition-all duration-1000 delay-300 ${isVisible ? 'animate-fade-in' : 'opacity-0'}`}>
            <h1 className="font-playfair text-4xl md:text-6xl lg:text-7xl font-bold text-tertiary mb-4 leading-tight">
              Comprehensive Financial Planning
              <br />
              <span className="text-secondary">for Successful Professionals</span>
            </h1>
          </div>

          {/* Strategic Subtitle */}
          <div className={`mb-8 transition-all duration-1000 delay-500 ${isVisible ? 'animate-slide-up' : 'opacity-0'}`}>
            <p className="font-crimson text-xl md:text-2xl text-tertiary/80 max-w-4xl mx-auto leading-relaxed">
              Fiduciary-focused wealth management with tax-efficient strategies
            </p>
          </div>

          {/* Engaging Description */}
          <div className={`mb-12 transition-all duration-1000 delay-700 ${isVisible ? 'animate-slide-up' : 'opacity-0'}`}>
            <p className="font-crimson text-lg text-tertiary/70 max-w-3xl mx-auto leading-relaxed">
              Embrace a future of financial excellence with HARIA INVESTMENTS. Our commitment goes beyond 
              traditional financial services; we're your partners in every step of your financial journey.
            </p>
          </div>

          {/* Trust Indicators */}
          <div className={`mb-12 transition-all duration-1000 delay-900 ${isVisible ? 'animate-fade-in' : 'opacity-0'}`}>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-4xl mx-auto">
              <div className="premium-card p-6 text-center hover-lift">
                <Building className="w-8 h-8 text-secondary mx-auto mb-3" />
                <div className="font-playfair text-3xl font-bold text-tertiary mb-1">
                  Since {2024 - counters.years}
                </div>
                <div className="font-crimson text-sm text-muted-foreground">
                  Years of Heritage
                </div>
              </div>
              
              <div className="premium-card p-6 text-center hover-lift">
                <TrendingUp className="w-8 h-8 text-secondary mx-auto mb-3" />
                <div className="font-playfair text-3xl font-bold text-tertiary mb-1">
                  ₹{counters.aum}+ Cr
                </div>
                <div className="font-crimson text-sm text-muted-foreground">
                  AUM Managed
                </div>
              </div>
              
              <div className="premium-card p-6 text-center hover-lift">
                <Users className="w-8 h-8 text-secondary mx-auto mb-3" />
                <div className="font-playfair text-3xl font-bold text-tertiary mb-1">
                  {counters.clients}+
                </div>
                <div className="font-crimson text-sm text-muted-foreground">
                  Satisfied Clients
                </div>
              </div>
              
              <div className="premium-card p-6 text-center hover-lift">
                <Award className="w-8 h-8 text-secondary mx-auto mb-3" />
                <div className="font-playfair text-3xl font-bold text-tertiary mb-1">
                  {counters.generations}
                </div>
                <div className="font-crimson text-sm text-muted-foreground">
                  Generations Served
                </div>
              </div>
            </div>
          </div>

          {/* CTA Buttons */}
          <div className={`mb-12 transition-all duration-1000 delay-1100 ${isVisible ? 'animate-fade-in' : 'opacity-0'}`}>
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Button
                onClick={() => scrollToSection('contact')}
                size="lg"
                className="bg-secondary text-secondary-foreground hover:bg-secondary/90 font-crimson font-semibold px-8 py-3 text-lg shadow-elegant hover:shadow-floating transition-all duration-300"
              >
                Schedule Consultation
              </Button>
              <Button
                onClick={() => scrollToSection('about')}
                variant="outline"
                size="lg"
                className="border-secondary text-secondary hover:bg-secondary hover:text-secondary-foreground font-crimson font-semibold px-8 py-3 text-lg transition-all duration-300"
              >
                Learn More
              </Button>
            </div>
          </div>

          {/* Professional Badges */}
          <div className={`transition-all duration-1000 delay-1300 ${isVisible ? 'animate-fade-in' : 'opacity-0'}`}>
            <div className="flex flex-wrap justify-center gap-3">
              <Badge variant="secondary" className="font-crimson">
                CFA Charter Holder
              </Badge>
              <Badge variant="secondary" className="font-crimson">
                CFP Certified
              </Badge>
              <Badge variant="secondary" className="font-crimson">
                SEBI Registered
              </Badge>
              <Badge variant="secondary" className="font-crimson">
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
    </section>
  );
};

export default HeroSection;