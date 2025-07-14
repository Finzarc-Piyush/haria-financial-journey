import { useEffect, useState } from 'react';
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

const ServicesSection = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [expandedService, setExpandedService] = useState<string | null>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.3 }
    );

    const element = document.getElementById('services');
    if (element) {
      observer.observe(element);
    }

    return () => observer.disconnect();
  }, []);

  const wealthServices = [
    {
      id: 'portfolio',
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
      id: 'retirement',
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
      id: 'tax',
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
      id: 'life',
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
      id: 'health',
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
      id: 'estate',
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

  return (
    <section id="services" className="py-20 bg-primary">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16" data-aos="fade-down">
          <h2 className="font-playfair text-4xl md:text-5xl font-bold text-tertiary mb-6">
            Our Comprehensive Financial Services
          </h2>
          <div className="w-24 h-1 bg-secondary mx-auto mb-6" data-aos="fade-right" data-aos-delay="200"></div>
          <p className="font-crimson text-lg text-tertiary/80 max-w-3xl mx-auto">
            Transparent, fee-only financial planning with fiduciary responsibility
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
          
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {wealthServices.map((service, index) => (
              <Card key={index} className="premium-card hover-lift group" data-aos="fade-up" data-aos-delay={index * 100}>
                <CardHeader>
                  <service.icon className="w-8 h-8 text-secondary mb-4 transition-transform duration-300 group-hover:scale-110" />
                  <CardTitle className="font-playfair text-xl text-tertiary">
                    {service.title}
                  </CardTitle>
                  <CardDescription className="font-crimson text-tertiary/70">
                    {service.description}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3 mb-4">
                    {service.process.map((step, i) => (
                      <div key={i} className="flex items-start">
                        <div className="w-1.5 h-1.5 bg-secondary rounded-full mr-2 mt-2"></div>
                        <span className="font-crimson text-sm text-tertiary/80">{step}</span>
                      </div>
                    ))}
                  </div>
                  <Badge className="bg-secondary text-secondary-foreground transition-transform duration-300 group-hover:scale-105">
                    {service.specializations[0]}
                  </Badge>
                </CardContent>
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
          
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {insuranceServices.map((service, index) => (
              <Card key={index} className="premium-card hover-lift group" data-aos="fade-up" data-aos-delay={index * 100}>
                <CardHeader>
                  <service.icon className="w-8 h-8 text-secondary mb-4 transition-transform duration-300 group-hover:scale-110" />
                  <CardTitle className="font-playfair text-xl text-tertiary">
                    {service.title}
                  </CardTitle>
                  <CardDescription className="font-crimson text-tertiary/70">
                    {service.description}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3 mb-4">
                    {service.process.map((step, i) => (
                      <div key={i} className="flex items-start">
                        <div className="w-1.5 h-1.5 bg-secondary rounded-full mr-2 mt-2"></div>
                        <span className="font-crimson text-sm text-tertiary/80">{step}</span>
                      </div>
                    ))}
                  </div>
                  <Badge className="bg-secondary text-secondary-foreground transition-transform duration-300 group-hover:scale-105">
                    {service.specializations[0]}
                  </Badge>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Fee Transparency Section */}
        <div data-aos="fade-up" data-aos-delay="600">
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
                <div className="text-center group">
                  <div className="font-playfair text-2xl font-bold text-secondary mb-2 transition-transform duration-300 group-hover:scale-110">1.25%</div>
                  <div className="font-crimson text-sm text-tertiary/70">
                    Annual fee on AUM
                  </div>
                </div>
                <div className="text-center group">
                  <div className="font-playfair text-2xl font-bold text-secondary mb-2 transition-transform duration-300 group-hover:scale-110">1%</div>
                  <div className="font-crimson text-sm text-tertiary/70">
                    For accounts over ₹2 Cr
                  </div>
                </div>
                <div className="text-center group">
                  <div className="font-playfair text-2xl font-bold text-secondary mb-2 transition-transform duration-300 group-hover:scale-110">2-3%</div>
                  <div className="font-crimson text-sm text-tertiary/70">
                    Typical annual return improvement
                  </div>
                </div>
                <div className="text-center group">
                  <div className="font-playfair text-2xl font-bold text-secondary mb-2 transition-transform duration-300 group-hover:scale-110">100%</div>
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