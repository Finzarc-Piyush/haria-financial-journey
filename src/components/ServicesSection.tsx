import { useEffect, useState, useCallback, useRef } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  TrendingUp,
  Shield,
  Calculator,
  PiggyBank,
  FileText,
  Building,
  Heart,
  Users,
  ChevronRight,
  DollarSign
} from "lucide-react";
import AOS from 'aos';
import 'aos/dist/aos.css';

// Improved ExpandableCardContent for smooth expand/collapse (including collapse)
const ExpandableCardContent = ({ expanded, children }) => {
  const contentRef = useRef(null);
  const [maxHeight, setMaxHeight] = useState(0);

  useEffect(() => {
    if (expanded && contentRef.current) {
      setMaxHeight(contentRef.current.scrollHeight);
    } else if (!expanded && contentRef.current) {
      setMaxHeight(contentRef.current.scrollHeight);
      requestAnimationFrame(() => {
        setMaxHeight(0);
      });
    }
  }, [expanded, children]);

  return (
    <div style={{ overflow: 'hidden', transition: 'max-height 0.5s cubic-bezier(0.4,0,0.2,1)', maxHeight }}>
      <div ref={contentRef} aria-hidden={!expanded} style={!expanded ? { pointerEvents: 'none', opacity: 0 } : {}}>
        {children}
      </div>
    </div>
  );
};

const ServicesSection = () => {
  const [expandedService, setExpandedService] = useState<string | null>(null);
  useEffect(() => {
    AOS.init({ duration: 500, once: true });
  }, []);

  const wealthServices = [
    {
      id: 'wealth-portfolio',
      icon: TrendingUp,
      title: 'Investment Portfolio Management',
      description: 'Customized portfolio construction using modern portfolio theory and tactical asset allocation',
      process: [
        'Initial risk assessment',
        'Strategic allocation',
        'Implementation',
        'Ongoing monitoring',
        'Quarterly reviews'
      ],
      details: 'As your fiduciary, we are legally bound to act in your best interest at all times. Ideal for professionals with ₹50 lakhs+ investable assets.',
      specializations: ['Equity portfolio management', 'Fixed income strategies', 'Alternative investments']
    },
    {
      id: 'wealth-retirement',
      icon: PiggyBank,
      title: 'Retirement Planning',
      description: 'Comprehensive approach including PF optimization, pension planning, and retirement income strategies',
      process: [
        'Current analysis',
        'Goal setting',
        'Gap analysis',
        'Strategy implementation',
        'Annual reviews'
      ],
      details: 'Specializing in early retirement planning, executive compensation, and tax-efficient withdrawal strategies.',
      specializations: ['Early retirement planning', 'Executive compensation', 'Tax-efficient withdrawals']
    },
    {
      id: 'wealth-tax',
      icon: Calculator,
      title: 'Tax Optimization Strategies',
      description: 'Tax-loss harvesting, charitable giving strategies, and estate planning coordination',
      process: [
        'Annual tax planning meetings',
        'Strategy implementation',
        'Year-end reviews',
        'Next year planning'
      ],
      details: 'Typically save clients 15-25% in annual tax obligations through strategic planning.',
      specializations: ['Tax-loss harvesting', 'ELSS planning', 'Section 80C optimization']
    }
  ];

  const insuranceServices = [
    {
      id: 'insurance-life',
      icon: Shield,
      title: 'Life Insurance Analysis',
      description: 'Comprehensive review of term vs. permanent insurance, beneficiary optimization, estate planning integration',
      process: [
        'Needs analysis',
        'Product comparison',
        'Implementation',
        'Annual reviews'
      ],
      details: 'Specializing in executive life insurance, key person coverage, and business succession planning.',
      specializations: ['Executive life insurance', 'Key person coverage', 'Business succession']
    },
    {
      id: 'insurance-health',
      icon: Heart,
      title: 'Health & Disability Insurance',
      description: 'Group benefits optimization, supplemental coverage analysis, disability income planning',
      process: [
        'Current coverage review',
        'Gap analysis',
        'Recommendations',
        'Implementation support'
      ],
      details: 'Professionals requiring comprehensive health coverage and income protection strategies.',
      specializations: ['Group benefits optimization', 'Supplemental coverage', 'Disability planning']
    },
    {
      id: 'insurance-estate',
      icon: FileText,
      title: 'Estate Planning Coordination',
      description: 'Will and trust review, beneficiary coordination, tax-efficient wealth transfer',
      process: [
        'Estate analysis',
        'Attorney coordination',
        'Implementation',
        'Regular updates'
      ],
      details: 'Comprehensive estate planning to ensure smooth wealth transfer and minimize tax implications.',
      specializations: ['Will optimization', 'Trust structures', 'Beneficiary planning']
    }
  ];

  const handleServiceClick = useCallback((serviceId) => {
    setExpandedService(prev => {
      const newValue = prev === serviceId ? null : serviceId;
      setTimeout(() => { AOS.refresh(); }, 0);
      return newValue;
    });
  }, []);

  return (
    <section id="services" className="py-20 bg-primary">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div data-aos="fade-down" className="text-center mb-16">
          <h2 className="font-playfair text-4xl md:text-5xl font-bold text-tertiary mb-6">
            Our Comprehensive Financial Services
          </h2>
          <div className="w-24 h-1 bg-secondary mx-auto mb-6 underline-animate"></div>
          <p className="font-crimson text-lg text-tertiary/80 max-w-3xl mx-auto">
            Transparent, comprehensive financial planning with clear fee structure and proven results
          </p>
        </div>

        {/* Wealth Management Services */}
        <div className="mb-16">
          <div className="text-center mb-12">
            <h3 className="font-playfair text-3xl font-bold text-tertiary mb-4">
              Wealth Management Services
            </h3>
            <div className="flex items-center justify-center">
              <Building className="w-6 h-6 text-secondary mr-2" />
              <span className="font-crimson text-tertiary/70">Comprehensive Portfolio Solutions</span>
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {wealthServices.map((service, index) => (
              <Card
                key={service.id}
                data-aos="fade-up"
                data-aos-delay={index * 120}
                className={`premium-card cursor-pointer transition-all duration-500 group hover:shadow-lg hover:shadow-secondary/40 hover:border-secondary focus:outline-none focus:ring-2 focus:ring-secondary/60 focus:ring-offset-2 ${expandedService === service.id ? 'border-2 border-secondary shadow-secondary/40' : ''}`}
                style={{ boxShadow: expandedService === service.id ? '0 0 0 4px rgba(212,165,116,0.18)' : undefined }}
                onClick={() => handleServiceClick(service.id)}
              >
                <CardHeader>
                  <div className="flex items-center justify-between mb-4">
                    <service.icon className="w-8 h-8 text-secondary group-hover:animate-pulse group-hover:text-secondary cursor-pointer transition-all duration-300" />
                    <ChevronRight className={`w-5 h-5 text-tertiary/60 transition-transform duration-300 ${expandedService === service.id ? 'rotate-90' : ''}`} />
                  </div>
                  <CardTitle className="font-playfair text-xl text-tertiary">
                    {service.title}
                  </CardTitle>
                  <CardDescription className="font-crimson text-tertiary/70">
                    {service.description}
                  </CardDescription>
                </CardHeader>
                <ExpandableCardContent expanded={expandedService === service.id}>
                  <CardContent className="pt-0">
                    <div className="space-y-4">
                      <div>
                        <h4 className="font-playfair font-semibold text-tertiary mb-2">Process Overview:</h4>
                        <ul className="space-y-1">
                          {service.process.map((step, i) => (
                            <li key={i} className="font-crimson text-sm text-tertiary/70 flex items-center">
                              <div className="w-1.5 h-1.5 bg-secondary rounded-full mr-2"></div>
                              {step}
                            </li>
                          ))}
                        </ul>
                      </div>
                      <div>
                        <p className="font-crimson text-sm text-tertiary/70 mb-3">
                          {service.details}
                        </p>
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
            ))}
          </div>
        </div>

        {/* Insurance & Protection Services */}
        <div className="mb-16">
          <div className="text-center mb-12">
            <h3 className="font-playfair text-3xl font-bold text-tertiary mb-4">
              Insurance & Protection Services
            </h3>
            <div className="flex items-center justify-center">
              <Shield className="w-6 h-6 text-secondary mr-2" />
              <span className="font-crimson text-tertiary/70">Comprehensive Risk Management</span>
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {insuranceServices.map((service, index) => (
              <Card
                key={service.id}
                data-aos="fade-up"
                data-aos-delay={index * 120 + 100}
                className={`premium-card cursor-pointer transition-all duration-500 group hover:shadow-lg hover:shadow-secondary/40 hover:border-secondary focus:outline-none focus:ring-2 focus:ring-secondary/60 focus:ring-offset-2 ${expandedService === service.id ? 'border-2 border-secondary shadow-secondary/40' : ''}`}
                style={{ boxShadow: expandedService === service.id ? '0 0 0 4px rgba(212,165,116,0.18)' : undefined }}
                onClick={() => handleServiceClick(service.id)}
              >
                <CardHeader>
                  <div className="flex items-center justify-between mb-4">
                    <service.icon className="w-8 h-8 text-secondary group-hover:animate-pulse group-hover:text-secondary cursor-pointer transition-all duration-300" />
                    <ChevronRight className={`w-5 h-5 text-tertiary/60 transition-transform duration-300 ${expandedService === service.id ? 'rotate-90' : ''}`} />
                  </div>
                  <CardTitle className="font-playfair text-xl text-tertiary">
                    {service.title}
                  </CardTitle>
                  <CardDescription className="font-crimson text-tertiary/70">
                    {service.description}
                  </CardDescription>
                </CardHeader>
                <ExpandableCardContent expanded={expandedService === service.id}>
                  <CardContent className="pt-0">
                    <div className="space-y-4">
                      <div>
                        <h4 className="font-playfair font-semibold text-tertiary mb-2">Process Overview:</h4>
                        <ul className="space-y-1">
                          {service.process.map((step, i) => (
                            <li key={i} className="font-crimson text-sm text-tertiary/70 flex items-center">
                              <div className="w-1.5 h-1.5 bg-secondary rounded-full mr-2"></div>
                              {step}
                            </li>
                          ))}
                        </ul>
                      </div>
                      <div>
                        <p className="font-crimson text-sm text-tertiary/70 mb-3">
                          {service.details}
                        </p>
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
            ))}
          </div>
        </div>

        {/* Fee Transparency Section */}
        <div data-aos="fade-up" data-aos-delay="600" className="transition-all duration-1000 delay-600">
          <Card className="premium-card bg-champagne border-secondary">
            <CardHeader className="text-center">
              <div className="flex items-center justify-center mb-4">
                <DollarSign className="w-8 h-8 text-secondary" />
              </div>
              <CardTitle className="font-playfair text-2xl text-tertiary">
                Complete Fee Transparency
              </CardTitle>
              <CardDescription className="font-crimson text-tertiary/70">
                No hidden fees, no commissions that create conflicts of interest
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <div className="text-center">
                  <div className="font-playfair text-2xl font-bold text-secondary mb-2">1.25%</div>
                  <div className="font-crimson text-sm text-tertiary/70">
                    Annual fee on AUM
                  </div>
                </div>
                <div className="text-center">
                  <div className="font-playfair text-2xl font-bold text-secondary mb-2">1%</div>
                  <div className="font-crimson text-sm text-tertiary/70">
                    For accounts over ₹2 Cr
                  </div>
                </div>
                <div className="text-center">
                  <div className="font-playfair text-2xl font-bold text-secondary mb-2">2-3%</div>
                  <div className="font-crimson text-sm text-tertiary/70">
                    Typical annual return improvement
                  </div>
                </div>
                <div className="text-center">
                  <div className="font-playfair text-2xl font-bold text-secondary mb-2">100%</div>
                  <div className="font-crimson text-sm text-tertiary/70">
                    Cost disclosure upfront
                  </div>
                </div>
              </div>

              <div className="mt-6 p-4 bg-primary/50 rounded-lg">
                <p className="font-crimson text-center text-tertiary/80">
                  <strong>Value Proposition:</strong> Our fee structure is competitive with industry standards
                  while providing superior service and fiduciary commitment. Most clients see significant
                  value through tax optimization and strategic portfolio management.
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
};

export default ServicesSection;