import { useEffect, useState, useCallback, useRef } from 'react';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  TrendingUp,
  Shield,
  Calculator,
  PiggyBank,
  FileText,
  Building,
  Heart,
  ChevronRight,
  DollarSign
} from "lucide-react";
import AOS from 'aos';
import 'aos/dist/aos.css';

// --- ExpandableCardContent ---
const ExpandableCardContent = ({ expanded, children }) => {
  const contentRef = useRef(null);
  const [maxHeight, setMaxHeight] = useState(0);
  const [opacity, setOpacity] = useState(0);
  const [rendered, setRendered] = useState(expanded);
  const collapseTimeout = useRef<number | null>(null);

  useEffect(() => {
    if (expanded) {
      setRendered(true);
      setTimeout(() => {
        if (contentRef.current) {
          setMaxHeight(contentRef.current.scrollHeight);
          setOpacity(1);
        }
      }, 0);
    } else {
      setOpacity(0);
      if (contentRef.current) {
        collapseTimeout.current = window.setTimeout(() => {
          setMaxHeight(0);
          setTimeout(() => setRendered(false), 500);
        }, 30);
      }
    }

    return () => {
      if (collapseTimeout.current !== null) {
        clearTimeout(collapseTimeout.current);
        collapseTimeout.current = null;
      }
    };
  }, [expanded]);

  return (
    <div
      style={{
        overflow: 'hidden',
        transition: 'max-height 0.5s cubic-bezier(0.4,0,0.2,1), opacity 0.3s ease',
        maxHeight: expanded ? maxHeight : 0,
        opacity: expanded ? 1 : 0,
      }}
    >
      <div
        ref={contentRef}
        aria-hidden={!expanded}
        className={`transition-all duration-300 ease-in-out ${expanded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-2'}`}
        style={{
          opacity: opacity,
          transform: expanded ? 'translateY(0px)' : 'translateY(8px)',
          pointerEvents: expanded ? 'auto' : 'none',
        }}
      >
        {rendered ? children : null}
      </div>
    </div>
  );
};

// --- ServicesSection Component ---
const ServicesSection = () => {
  const [expandedService, setExpandedService] = useState<string | null>(null);

  useEffect(() => {
    AOS.init({ duration: 500, once: true });
  }, []);

  const handleServiceClick = useCallback((serviceId) => {
    setExpandedService(prev => {
      const newValue = prev === serviceId ? null : serviceId;
      setTimeout(() => AOS.refresh(), 0);
      return newValue;
    });
  }, []);

  const wealthServices = [
    {
      id: 'portfolio',
      icon: TrendingUp,
      title: 'Investment Portfolio Management',
      description: 'Customized portfolio construction using modern portfolio theory and tactical asset allocation',
      process: ['Initial risk assessment', 'Strategic allocation', 'Implementation', 'Ongoing monitoring', 'Quarterly reviews'],
      details: 'As your fiduciary, we are legally bound to act in your best interest at all times.',
      specializations: ['Equity portfolio management', 'Fixed income strategies', 'Alternative investments']
    },
    {
      id: 'swp',
      icon: PiggyBank,
      title: 'SWP Calculator',
      description: 'Plan your regular withdrawals with a Systematic Withdrawal Plan (SWP) for steady income.',
      process: ['Current analysis', 'Goal setting', 'Gap analysis', 'Strategy implementation', 'Annual reviews'],
      details: 'Specializing in SWP strategies and tax-efficient withdrawal planning.',
      specializations: ['Systematic Withdrawal Plan', 'Retirement income', 'Tax-efficient withdrawals']
    },
    {
      id: 'tax',
      icon: Calculator,
      title: 'Tax Optimization Strategies',
      description: 'Tax-loss harvesting, charitable giving strategies, and estate planning coordination',
      process: ['Annual tax planning', 'Strategy implementation', 'Year-end reviews', 'Next year planning'],
      details: 'Typically save clients 15–25% in annual tax obligations.',
      specializations: ['Tax-loss harvesting', 'ELSS planning', 'Section 80C optimization']
    }
  ];

  const insuranceServices = [
    {
      id: 'life',
      icon: Shield,
      title: 'Life Insurance Analysis',
      description: 'Comprehensive review of term vs. permanent insurance, estate planning integration',
      process: ['Needs analysis', 'Product comparison', 'Implementation', 'Annual reviews'],
      details: 'Specializing in key person coverage and business succession planning.',
      specializations: ['Executive life insurance', 'Key person coverage', 'Business succession']
    },
    {
      id: 'health',
      icon: Heart,
      title: 'Health & Disability Insurance',
      description: 'Group benefits optimization, supplemental coverage analysis, disability income planning',
      process: ['Current coverage review', 'Gap analysis', 'Recommendations', 'Implementation support'],
      details: 'For professionals requiring comprehensive coverage and income protection.',
      specializations: ['Group benefits optimization', 'Supplemental coverage', 'Disability planning']
    },
    {
      id: 'estate',
      icon: FileText,
      title: 'Estate Planning Coordination',
      description: 'Will and trust review, beneficiary coordination, tax-efficient wealth transfer',
      process: ['Estate analysis', 'Attorney coordination', 'Implementation', 'Regular updates'],
      details: 'Comprehensive estate planning to ensure smooth wealth transfer.',
      specializations: ['Will optimization', 'Trust structures', 'Beneficiary planning']
    }
  ];

  const renderServiceCard = (service, index, section) => {
    const uniqueId = `${section}-${service.id}`;
    const isExpanded = expandedService === uniqueId;

    return (
      <Card
        key={uniqueId}
        data-aos="fade-up"
        data-aos-delay={index * 120}
        className={`premium-card cursor-pointer transition-all duration-500 group hover:shadow-lg hover:border-secondary focus:outline-none focus:ring-2 focus:ring-secondary/60 focus:ring-offset-2 ${isExpanded ? 'border-2 border-secondary shadow-secondary/40' : ''}`}
        style={{ boxShadow: isExpanded ? '0 0 0 4px rgba(212,165,116,0.18)' : undefined }}
        onClick={() => handleServiceClick(uniqueId)}
      >
        <CardHeader>
          <div className="flex items-center justify-between mb-4">
            <service.icon className="w-8 h-8 text-secondary group-hover:animate-pulse transition-all duration-300" />
            <ChevronRight className={`w-5 h-5 text-tertiary/60 transition-transform duration-300 ${isExpanded ? 'rotate-90' : ''}`} />
          </div>
          <CardTitle className="font-playfair text-2xl text-tertiary">
            {service.title}
          </CardTitle>
          <CardDescription className="font-crimson text-lg text-tertiary/70">
            {service.description}
          </CardDescription>
        </CardHeader>
        <ExpandableCardContent expanded={isExpanded}>
          <CardContent className="pt-0">
            <div className="space-y-4">
              <div>
                <h4 className="font-playfair font-semibold text-tertiary mb-2">Process Overview:</h4>
                <ul className="space-y-1">
                  {service.process.map((step, i) => (
                    <li key={i} className="font-crimson text-sm text-tertiary/70 flex items-center">
                      <div className="w-1.5 h-1.5 bg-secondary rounded-full mr-2" />
                      {step}
                    </li>
                  ))}
                </ul>
              </div>
              <div>
                <p className="font-crimson text-sm text-tertiary/70 mb-3">{service.details}</p>
                <div className="flex flex-wrap gap-2">
                  {service.specializations.map((spec, i) => (
                    <Badge key={i} variant="secondary" className="text-xs">
                      {spec}
                    </Badge>
                  ))}
                </div>
              </div>
            </div>
          </CardContent>
        </ExpandableCardContent>
      </Card>
    );
  };

  return (
    <section id="services" className="py-20 bg-cream">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Section Title */}
        <div data-aos="fade-down" className="text-center mb-16">
          <h2 className="font-playfair text-4xl md:text-5xl font-bold text-tertiary mb-6">
            Our Comprehensive Financial Services
          </h2>
          <div className="w-24 h-1 bg-secondary mx-auto mb-6 underline-animate"></div>
          <p className="font-crimson text-2xl text-tertiary/80 max-w-3xl mx-auto">
            Transparent, comprehensive financial planning with clear fee structure and proven results
          </p>
        </div>

        {/* Wealth Services */}
        <div className="mb-16">
          <div className="text-center mb-12">
            <h3 className="font-playfair text-3xl font-bold text-tertiary mb-4">Wealth Management Services</h3>
            <div className="flex items-center justify-center">
              <Building className="w-6 h-6 text-secondary mr-2" />
              <span className="font-crimson text-xl text-tertiary/70">Comprehensive Portfolio Solutions</span>
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {wealthServices.map((service, index) => renderServiceCard(service, index, 'wealth'))}
          </div>
        </div>

        {/* Insurance Services */}
        <div className="mb-16">
          <div className="text-center mb-12">
            <h3 className="font-playfair text-3xl font-bold text-tertiary mb-4">Insurance & Protection Services</h3>
            <div className="flex items-center justify-center">
              <Shield className="w-6 h-6 text-secondary mr-2" />
              <span className="font-crimson text-xl text-tertiary/70">Comprehensive Risk Management</span>
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {insuranceServices.map((service, index) => renderServiceCard(service, index, 'insurance'))}
          </div>
        </div>

      </div>
    </section>
  );
};

export default ServicesSection;