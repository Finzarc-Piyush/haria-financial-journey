import { useEffect, useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  MessageCircle,
  FileBarChart,
  Settings,
  RefreshCw,
  Clock,
  CheckCircle,
  Users,
  Shield,
  Phone,
  Calendar,
  Smartphone,
  Monitor
} from "lucide-react";
// @ts-ignore: AOS has no types by default
import AOS from 'aos';
import 'aos/dist/aos.css';

const ProcessSection = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    AOS.init({ duration: 500, once: true });
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.2 }
    );
    const element = document.getElementById('process');
    if (element) {
      observer.observe(element);
    }
    return () => observer.disconnect();
  }, []);

  const processSteps = [
    {
      id: 'consultation',
      number: '01',
      icon: MessageCircle,
      title: 'Initial Consultation',
      duration: '30 minutes, complimentary',
      description: 'Comprehensive discussion of your financial goals, current situation, and concerns',
      expectations: [
        'No-pressure environment focused on understanding your needs',
        'Comprehensive discussion of financial goals and timeline',
        'Review of current investment portfolio and strategies',
        'Clear explanation of our services and potential fit'
      ],
      preparation: [
        'Bring recent investment statements',
        'Last 2 years tax returns',
        'List of financial goals with timeline',
        'Current insurance policies summary'
      ],
      outcome: 'Clear understanding of your needs and our potential value-add'
    },
    {
      id: 'analysis',
      number: '02',
      icon: FileBarChart,
      title: 'Comprehensive Financial Analysis',
      duration: '1-2 weeks',
      description: 'Detailed analysis of your current financial position, risk tolerance, and goal feasibility',
      expectations: [
        'Advanced planning software for scenario analysis',
        'Risk tolerance assessment and goal feasibility study',
        'Tax optimization and estate planning review',
        'Written financial plan with specific recommendations'
      ],
      preparation: [
        'Complete financial questionnaire',
        'Provide additional documentation as requested',
        'Schedule 90-minute review meeting'
      ],
      outcome: 'Comprehensive written plan with implementation timeline and cost estimates'
    },
    {
      id: 'implementation',
      number: '03',
      icon: Settings,
      title: 'Implementation & Onboarding',
      duration: '2-4 weeks',
      description: 'Systematic portfolio construction and account setup based on approved plan',
      expectations: [
        'Streamlined account opening with institutional custodians',
        'Systematic investment implementation per approved strategy',
        'Insurance policy reviews and optimizations',
        'Complete documentation and beneficiary coordination'
      ],
      preparation: [
        'Sign investment advisory agreement',
        'Fund new accounts per implementation plan',
        'Complete beneficiary designations'
      ],
      outcome: 'Fully implemented investment strategy with complete documentation'
    },
    {
      id: 'management',
      number: '04',
      icon: RefreshCw,
      title: 'Ongoing Relationship Management',
      duration: 'Ongoing',
      description: 'Proactive portfolio management with regular reviews and strategic adjustments',
      expectations: [
        'Quarterly portfolio reviews and rebalancing',
        'Annual comprehensive plan updates',
        'Proactive market commentary and strategy updates',
        '24/7 secure client portal access'
      ],
      preparation: [
        'Attend scheduled review meetings',
        'Communicate life changes promptly',
        'Review quarterly reports and updates'
      ],
      outcome: 'Consistent progress toward financial goals with ongoing optimization'
    }
  ];

  const communicationStandards = [
    {
      icon: Clock,
      title: 'Response Time',
      description: 'All inquiries answered within 24 hours',
      commitment: '24 Hour Guarantee'
    },
    {
      icon: Calendar,
      title: 'Meeting Frequency',
      description: 'Quarterly reviews, annual planning, ad-hoc as needed',
      commitment: 'Regular Schedule'
    },
    {
      icon: FileBarChart,
      title: 'Reporting',
      description: 'Monthly statements, quarterly performance reports',
      commitment: 'Comprehensive Reporting'
    },
    {
      icon: Smartphone,
      title: 'Technology Access',
      description: 'Secure client portal, mobile app, video conferencing',
      commitment: 'Modern Tools'
    }
  ];


  return (
    <section id="process" className="py-20 min-h-screen bg-champagne flex flex-col justify-center">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div data-aos="fade-up" className={`text-center mb-16 transition-all duration-1000 ${isVisible ? 'animate-fade-in' : 'opacity-0'}`}>
          <h2 className="font-playfair text-4xl md:text-5xl font-bold text-tertiary mb-6">
            Our Client-Focused Process
          </h2>
          <div className="w-24 h-1 bg-secondary mx-auto mb-6"></div>
          <p className="font-crimson text-xl text-tertiary/80 max-w-3xl mx-auto">
            A systematic, transparent approach designed to reduce anxiety and build confidence
            throughout your financial planning journey.
          </p>
        </div>

        {/* Process Steps */}
        <div className="space-y-12">
          {processSteps.map((step, index) => (
            <div key={step.id} data-aos="fade-up" data-aos-delay={index * 120}>
              <Card className="premium-card hover-lift">
                <CardHeader>
                  <div className="flex flex-col md:flex-row items-start gap-6">
                    <div className="flex-shrink-0 flex flex-col items-center">
                      <div className="w-16 h-16 bg-secondary rounded-full flex items-center justify-center">
                        <step.icon className="w-8 h-8 text-secondary-foreground" />
                      </div>
                      <div className="text-center mt-2">
                        <Badge className="bg-tertiary text-lg text-cream font-playfair font-bold">
                          {step.number}
                        </Badge>
                      </div>
                    </div>
                    <div className="flex-1">
                      <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-4">
                        <CardTitle className="font-playfair text-2xl text-tertiary">
                          {step.title}
                        </CardTitle>
                        <Badge variant="outline" className="border-secondary text-md text-secondary w-fit">
                          {step.duration}
                        </Badge>
                      </div>
                      <CardDescription className="font-crimson text-xl text-tertiary/70 mb-6">
                        {step.description}
                      </CardDescription>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                    <div>
                      <h4 className="font-playfair font-semibold text-xl text-tertiary mb-3 flex items-center">
                        <CheckCircle className="w-5 h-5 text-secondary mr-2" />
                        What to Expect:
                      </h4>
                      <ul className="space-y-2">
                        {step.expectations.map((expectation, i) => (
                          <li key={i} className="font-crimson text-lg text-tertiary/70 flex items-start">
                            <div className="w-1.5 h-1.5 bg-secondary rounded-full mr-2 mt-2"></div>
                            {expectation}
                          </li>
                        ))}
                      </ul>
                    </div>
                    <div>
                      <h4 className="font-playfair font-semibold text-xl text-tertiary mb-3 flex items-center">
                        <Users className="w-5 h-5 text-secondary mr-2" />
                        Your Preparation:
                      </h4>
                      <ul className="space-y-2">
                        {step.preparation.map((prep, i) => (
                          <li key={i} className="font-crimson text-lg text-tertiary/70 flex items-start">
                            <div className="w-1.5 h-1.5 bg-secondary rounded-full mr-2 mt-2"></div>
                            {prep}
                          </li>
                        ))}
                      </ul>
                    </div>
                    <div>
                      <h4 className="font-playfair font-semibold text-xl text-tertiary mb-3 flex items-center">
                        <Shield className="w-5 h-5 text-secondary mr-2" />
                        Outcome:
                      </h4>
                      <div className="p-4 bg-champagne/20 rounded-lg">
                        <p className="font-crimson text-lg text-tertiary/80">
                          {step.outcome}
                        </p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          ))}
        </div>

        {/* Communication Standards */}
        <div data-aos="fade-up" data-aos-delay="400" className={`mb-16 mt-16 transition-all duration-1000 delay-600 ${isVisible ? 'animate-slide-up' : 'opacity-0'}`}>
          <div className="text-center mb-8">
            <h3 className="font-playfair text-3xl font-bold text-tertiary mb-4">
              Our Communication Standards
            </h3>
            <p className="font-crimson text-xl text-tertiary/70">
              Clear expectations for responsive, professional service
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {communicationStandards.map((standard, index) => (
              <Card
                key={index}
                className={`premium-card hover-lift text-center transition-all duration-300`}
                data-aos="fade-up"
                data-aos-delay={index * 100}
              >
                <CardHeader>
                  <standard.icon className="w-8 h-8 text-secondary mx-auto mb-4" />
                  <CardTitle className="font-playfair text-2xl text-tertiary">
                    {standard.title}
                  </CardTitle>
                  <CardDescription className="font-crimson text-lg text-tertiary/70">
                    {standard.description}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <Badge className="bg-secondary text-md text-secondary-foreground">
                    {standard.commitment}
                  </Badge>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
};

export default ProcessSection;