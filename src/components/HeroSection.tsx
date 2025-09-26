import { useEffect, useState, useRef } from 'react';
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ChevronDown, Award, Users, TrendingUp, Building, HeartHandshake, PiggyBank, Scale, LineChart } from "lucide-react"; // Import new icons
import heroBackground from "@/assets/hero-office-background.jpg";
import advisorHeadshot from "@/assets/advisor-headshot.jpg";
import AOS from 'aos';
import 'aos/dist/aos.css';
import gsap from 'gsap';
import { motion } from 'framer-motion';

const HeroSection = () => {
  const currentYear = new Date().getFullYear();
  const [counters, setCounters] = useState({
    year: currentYear,
    aum: 0,
    clients: 0,
    generations: 0
  });
  const [isVisible, setIsVisible] = useState(false);
  const headlineRef = useRef(null);
  const bgRef = useRef(null);

  // Define your services with appropriate icons
  const services = [
    { name: "Life & General Insurance", icon: HeartHandshake },
    { name: "Mutual Funds & Equity", icon: PiggyBank },
    { name: "Fixed Income", icon: Scale }, // Changed from LineChart for a slightly different feel
    { name: "Commodity Derivative Trading", icon: LineChart }, // Changed from LineChart to distinguish
  ];

  useEffect(() => {
    AOS.init({ duration: 500, once: true });
    setIsVisible(true);

    // Typewriter effect for headline
    if (headlineRef.current) {
      const el = headlineRef.current;
      const text = 'Comprehensive Financial Planning';
      el.textContent = '';
      let i = 0;
      const type = () => {
        if (i < text.length) {
          el.textContent += text.charAt(i);
          i++;
          setTimeout(type, 40);
        }
      };
      type();
    }

    // Parallax/zoom-in background
    if (bgRef.current) {
      gsap.fromTo(bgRef.current, { scale: 1.08, opacity: 0.7 }, { scale: 1, opacity: 1, duration: 1.2, ease: 'power2.out' });
    }

    // Animate counters on scroll (IntersectionObserver)
    const section = document.getElementById('hero');
    let triggered = false;
    const observer = new window.IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !triggered) {
          triggered = true;
          const animateYearCounter = (key, startYear, endYear, duration) => {
            let current = startYear;
            const step = (startYear - endYear) / (duration / 16);
            const timer = setInterval(() => {
              current -= step;
              if (current <= endYear) {
                current = endYear;
                clearInterval(timer);
              }
              setCounters(prev => ({ ...prev, [key]: Math.floor(current) }));
            }, 16);
          };
          const animateCounter = (key, target, duration) => {
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
          animateYearCounter('year', currentYear, 1957, 2000);
          animateCounter('aum', 100, 2500);
          animateCounter('clients', 1000, 2000);
          animateCounter('generations', 4, 1500);
        }
      },
      { threshold: 0.3 }
    );
    if (section) observer.observe(section);
    return () => observer.disconnect();
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
        backgroundImage: `linear-gradient(rgba(245,241,232,0.7), rgba(0,0,0,0.18)), url(${heroBackground})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundAttachment: 'fixed'
      }}
    >
      <div ref={bgRef} className="absolute inset-0 w-full h-full z-0" aria-hidden="true" />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 relative z-10">
        <div className="text-center">
          {/* Professional Headshot */}
          <div className={`mb-8 transition-all duration-1000 ${isVisible ? 'animate-scale-in' : 'opacity-0'}`}
            data-aos="fade-in">
            <div className="relative inline-block">
              <img
                src=""
                alt="Professional Financial Advisor"
                className="w-32 h-32 rounded-full mx-auto border-4 border-secondary shadow-elegant"
              />
              <div className="absolute -bottom-2 -right-2 bg-secondary text-secondary-foreground rounded-full p-2">
                <Award className="w-4 h-4" />
              </div>
            </div>
          </div>

          {/* Main Headline with Typewriter Effect */}
          <div className={`mb-6 transition-all duration-1000 delay-300 ${isVisible ? 'animate-fade-in' : 'opacity-0'}`}
            data-aos="fade-up"
            style={{ position: 'relative' }}>
            {/* Ghost headline to reserve space and prevent layout shift */}
            <h1
              aria-hidden="true"
              className="font-playfair text-4xl md:text-6xl lg:text-7xl font-bold mb-4 leading-tight invisible select-none pointer-events-none"
              style={{
                color: '#f8fafc',
                textShadow: '0 2px 8px rgba(0,0,0,0.32), 2px 2px 6px rgba(0,0,0,0.7)',
                letterSpacing: '-0.5px',
                minHeight: '2.5em',
                display: 'inline-block',
                position: 'absolute',
                top: 0,
                left: 0,
                width: '100%',
                zIndex: 0,
              }}
            >
              Comprehensive Financial Planning
              <br />
              <span className="text-secondary" style={{ textShadow: '0 2px 8px rgba(0,0,0,0.22)' }}>for Successful Professionals</span>
            </h1>
            {/* Actual animated headline */}
            <h1 ref={headlineRef} className="font-playfair text-4xl md:text-6xl lg:text-7xl font-bold mb-4 leading-tight relative z-10"
              style={{
                color: '#f8fafc',
                textShadow: '0 2px 8px rgba(0,0,0,0.32), 2px 2px 6px rgba(0,0,0,0.7)',
                letterSpacing: '-0.5px',
                minHeight: '2.5em',
                display: 'inline-block',
              }}
            >
              {/* Typewriter text will be injected here */}
              Comprehensive Financial Planning
              <br />
              <span className="text-secondary" style={{ textShadow: '0 2px 8px rgba(0,0,0,0.22)' }}>for Successful Professionals</span>
            </h1>
          </div>

          {/* Strategic Subtitle */}
          <motion.div
            className="mb-8"
            initial={{ opacity: 0, y: 48 }}
            animate={isVisible ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 1.2, delay: 0.25, ease: [0.22, 0.61, 0.36, 1] }}
          >
            <p className="font-crimson text-xl md:text-2xl max-w-4xl mx-auto leading-relaxed"
              style={{
                color: '#f3f4f6',
                textShadow: '0 1px 6px rgba(0,0,0,0.22), 1px 1px 3px rgba(0,0,0,0.5)',
                fontWeight: 500,
              }}
            >
              Insurance, Investments, and Wealth Solutions—All in One Place
            </p>
          </motion.div>

          {/* New: Services Grid */}
          <motion.div
            className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-5xl mx-auto mb-12 min-h-[120px]"
            initial={{ opacity: 0, y: 48 }}
            animate={isVisible ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 1.2, delay: 0.25, ease: [0.22, 0.61, 0.36, 1] }}
          >
            {services.map((service) => (
              <div
                key={service.name}
                className="flex flex-col items-center justify-center p-4 bg-white/10 backdrop-blur-sm rounded-lg shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1"
              >
                <service.icon className="w-10 h-10 text-secondary mb-2" />
                <span className="text-white text-center text-sm sm:text-base font-crimson font-semibold">{service.name}</span>
              </div>
            ))}
          </motion.div>


          {/* Trust Indicators (Badges) */}
          <div className="flex flex-wrap justify-center gap-3" data-aos="fade-up" data-aos-delay="400">
            {["CFA Charter Holder", "CFP Certified", "Fiduciary Advisor"].map((badge, i) => (
              <Badge key={badge} variant="secondary" className="font-crimson" data-aos="zoom-in" data-aos-delay={i * 120}>
                {badge}
              </Badge>
            ))}
          </div>

          {/* Counters */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-4xl mx-auto mt-12" data-aos="fade-up" data-aos-delay="200">
            <div className="premium-card p-6 text-center hover-lift">
              <Building className="w-8 h-8 text-secondary mx-auto mb-3" />
              <div className="font-playfair text-3xl font-bold text-tertiary mb-1">
                Since {counters.year}
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

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mt-12" data-aos="fade-up" data-aos-delay="600">
            <Button
              onClick={() => scrollToSection('contact')}
              size="lg"
              className="bg-secondary text-secondary-foreground hover:bg-secondary/90 font-crimson font-semibold px-8 py-3 text-lg"
            >
              Schedule Consultation
            </Button>
            <Button
              onClick={() => scrollToSection('about')}
              variant="outline"
              size="lg"
              className="border-secondary text-secondary hover:bg-secondary hover:text-secondary-foreground font-crimson font-semibold px-8 py-3 text-lg"
            >
              Learn More
            </Button>
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