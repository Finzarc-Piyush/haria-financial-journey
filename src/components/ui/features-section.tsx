import { useEffect, useState } from 'react';
import { Award, Users, TrendingUp, Building, HeartHandshake, PiggyBank, Scale, LineChart } from 'lucide-react';

export function FeaturesSection() {
  const currentYear = new Date().getFullYear();
  const [counters, setCounters] = useState({
    year: currentYear,
    aum: 0,
    clients: 0,
    generations: 0
  });

  useEffect(() => {
    // Animate counters on mount (IntersectionObserver)
    const section = document.getElementById('features');
    let triggered = false;
    
    const observer = new window.IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !triggered) {
          triggered = true;
          
          const animateYearCounter = (key: string, startYear: number, endYear: number, duration: number) => {
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
          
          const animateCounter = (key: string, target: number, duration: number) => {
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
  }, [currentYear]);

  const services = [
    {
      icon: HeartHandshake,
      title: "Life & General Insurance",
      description: "Comprehensive coverage for you and your family's financial security"
    },
    {
      icon: PiggyBank,
      title: "Mutual Funds & Equity",
      description: "Strategic investment solutions for long-term wealth creation"
    },
    {
      icon: Scale,
      title: "Fixed Income",
      description: "Stable returns through diversified fixed income instruments"
    },
    {
      icon: LineChart,
      title: "Commodity Derivative Trading",
      description: "Expert guidance in commodity markets and derivatives"
    }
  ];

  const stats = [
    {
      icon: Building,
      value: `Since ${counters.year}`,
      label: "Years of Heritage"
    },
    {
      icon: TrendingUp,
      value: `₹${counters.aum}+ Cr`,
      label: "AUM Managed"
    },
    {
      icon: Users,
      value: `${counters.clients}+`,
      label: "Satisfied Clients"
    },
    {
      icon: Award,
      value: counters.generations.toString(),
      label: "Generations Served"
    }
  ];

  return (
    <section id="features" className="py-16 bg-gradient-to-b from-white to-gray-50">
      <div className="mx-auto max-w-7xl space-y-12 px-4 sm:px-6 lg:px-8 md:space-y-20">
        {/* Header */}
        <div className="relative z-10 mx-auto max-w-4xl space-y-4 text-center">
          <p className="text-sm font-crimson text-tertiary/60 uppercase tracking-wider mb-4">
            OUR SERVICES & EXPERTISE
          </p>
          <h2 className="text-balance text-4xl md:text-5xl lg:text-6xl font-bold font-playfair text-tertiary leading-tight">
            Comprehensive Financial Solutions
          </h2>
          <p className="text-lg md:text-xl font-crimson text-tertiary/80 max-w-3xl mx-auto leading-relaxed">
            Backed by decades of experience and trusted by thousands of families across India
          </p>
        </div>

        {/* Services Grid - First 4 boxes */}
        <div className="relative mx-auto grid max-w-6xl gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {services.map((service, index) => (
            <div
              key={index}
              className="group premium-card p-8 text-center hover-lift rounded-xl shadow-lg border border-gray-100 transition-all duration-300 hover:shadow-2xl hover:border-secondary/30"
            >
              <service.icon className="w-10 h-10 text-secondary mx-auto mb-4 group-hover:scale-110 transition-transform duration-300" />
              <h3 className="text-lg font-semibold font-crimson text-tertiary mb-2">
                {service.title}
              </h3>
              <p className="text-sm font-crimson text-muted-foreground">
                {service.description}
              </p>
            </div>
          ))}
        </div>

        {/* Stats Grid - Last 4 boxes */}
        <div className="relative mx-auto grid max-w-6xl gap-6 sm:grid-cols-2 lg:grid-cols-4 pt-8">
          {stats.map((stat, index) => (
            <div
              key={index}
              className="group premium-card p-8 text-center hover-lift rounded-xl shadow-lg border border-gray-100 transition-all duration-300 hover:shadow-2xl hover:border-secondary/30"
            >
              <stat.icon className="w-10 h-10 text-secondary mx-auto mb-4 group-hover:scale-110 transition-transform duration-300" />
              <div className="font-playfair text-3xl font-bold text-tertiary mb-2">
                {stat.value}
              </div>
              <div className="font-crimson text-base text-muted-foreground">
                {stat.label}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

