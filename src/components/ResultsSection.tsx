import { useEffect, useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  TrendingUp,
  Building,
  Users,
  Star,
  Quote,
  ArrowRight,
  CheckCircle
} from "lucide-react";
import AOS from 'aos';
import 'aos/dist/aos.css';
import gsap from 'gsap';
import { useRef } from 'react';

const ResultsSection = () => {
  const [selectedCase, setSelectedCase] = useState<string | null>(null);
  const bgRef = useRef(null);
  useEffect(() => {
    AOS.init({ duration: 500, once: true });
    if (bgRef.current) {
      gsap.fromTo(bgRef.current, { y: 40, opacity: 0.7 }, { y: 0, opacity: 1, duration: 1.2, ease: 'power2.out' });
    }
  }, []);

  const caseStudies = [
    {
      id: 'executive',
      icon: TrendingUp,
      title: 'Multi-Generational Wealth Building',
      clientProfile: 'Senior Executive, Age 45, Mumbai-based IT Professional',
      challenge: 'Needed comprehensive financial plan for early retirement and children\'s education',
      strategy: [
        'Diversified portfolio allocation: 60% equity, 30% fixed income, 10% alternatives',
        'Tax-efficient investment vehicles including ELSS and NPS',
        'Education funding through systematic investment plans',
        'Estate planning and insurance optimization'
      ],
      results: '25% portfolio growth over 3 years, on track for retirement at 55',
      testimonial: 'Haria Investments transformed our financial future. Their systematic approach and personal attention made all the difference.',
      client: 'R.K., IT Executive',
      metrics: [
        { label: 'Portfolio Growth', value: '25%', period: '3 Years' },
        { label: 'Tax Savings', value: '₹2.5L', period: 'Annual' },
        { label: 'Goal Achievement', value: '95%', period: 'On Track' }
      ]
    },
    {
      id: 'business',
      icon: Building,
      title: 'Business Owner Succession Planning',
      clientProfile: 'Manufacturing Business Owner, Age 48, Family Business',
      challenge: 'Succession planning while maintaining family financial security',
      strategy: [
        'Business valuation and succession timeline development',
        'Key person insurance and buy-sell agreements',
        'Diversification of family wealth beyond business assets',
        'Tax-efficient ownership transfer strategies'
      ],
      results: 'Successful transition to next generation, 40% wealth diversification achieved',
      testimonial: 'Their expertise in business succession planning preserved our family legacy while securing our financial future.',
      client: 'S.P., Business Owner',
      metrics: [
        { label: 'Wealth Diversification', value: '40%', period: 'Achieved' },
        { label: 'Tax Efficiency', value: '60%', period: 'Savings' },
        { label: 'Transition Success', value: '100%', period: 'Complete' }
      ]
    },
    {
      id: 'retirement',
      icon: Users,
      title: 'Retirement Income Planning Success',
      clientProfile: 'Retired Couple, Ages 62 & 58, Government Employees',
      challenge: 'Creating sustainable retirement income stream from accumulated savings',
      strategy: [
        'Systematic withdrawal plan with tax optimization',
        'Healthcare cost planning and insurance coordination',
        'Estate planning for wealth transfer to children',
        'Inflation-protected income strategies'
      ],
      results: 'Sustainable 8% annual income with inflation protection',
      testimonial: 'Thanks to Haria Investments, our retirement is financially secure and stress-free. We can focus on enjoying life.',
      client: 'M.G., Retired Couple',
      metrics: [
        { label: 'Annual Income', value: '8%', period: 'Sustainable' },
        { label: 'Inflation Protection', value: '100%', period: 'Secured' },
        { label: 'Peace of Mind', value: 'Priceless', period: 'Achieved' }
      ]
    }
  ];

  const performanceMetrics = [
    { label: 'Average Client Portfolio Performance', value: '12.5%', comparison: 'vs. 8.2% market average' },
    { label: 'Tax Savings Achieved', value: '18%', comparison: 'Average reduction in tax liability' },
    { label: 'Client Retention Rate', value: '95%', comparison: 'vs. 78% industry average' },
    { label: 'Average Relationship Duration', value: '12 Years', comparison: 'Long-term partnerships' },
    { label: 'AUM Growth Rate', value: '25%', comparison: 'Annual growth' }
  ];

  return (
    <section id="results" className="py-20 bg-tertiary text-cream relative overflow-hidden">
      <div ref={bgRef} className="absolute inset-0 w-full h-full z-0" aria-hidden="true" />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div data-aos="fade-in" className="text-center mb-16">
          <h2 className="font-playfair text-4xl md:text-5xl font-bold mb-6">
            Proven Results & Client Success Stories
          </h2>
          <div className="w-24 h-1 bg-secondary mx-auto mb-6"></div>
          <p className="font-crimson text-lg text-cream/80 max-w-3xl mx-auto">
            Real clients, real results. See how our comprehensive approach has transformed
            the financial futures of professionals just like you.
          </p>
        </div>

        {/* Case Studies */}
        <div className="mb-16">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {caseStudies.map((study, index) => (
              <div
                key={study.id}
                data-aos={index % 2 === 0 ? 'fade-right' : 'fade-left'}
                data-aos-delay={index * 120}
                className="relative"
              >
                <Card
                  className={`premium-card hover-lift cursor-pointer transition-all duration-500 bg-cream/10 border-secondary/20 group`}
                  onClick={() => setSelectedCase(selectedCase === study.id ? null : study.id)}
                  tabIndex={0}
                  aria-label={`Open details for ${study.title}`}
                >
                  <CardHeader>
                    <div className="flex items-center mb-4">
                      <study.icon className="w-8 h-8 text-secondary mr-3" />
                      <Badge className="bg-secondary text-secondary-foreground">
                        Case Study {index + 1}
                      </Badge>
                    </div>
                    <CardTitle className="font-playfair text-xl text-cream">
                      {study.title}
                    </CardTitle>
                    <CardDescription className="font-crimson text-cream/70">
                      {study.clientProfile}
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div>
                        <h4 className="font-playfair font-semibold text-cream mb-2 flex items-center">
                          <ArrowRight className="w-4 h-4 mr-2 text-secondary" />
                          Challenge:
                        </h4>
                        <p className="font-crimson text-sm text-cream/80">
                          {study.challenge}
                        </p>
                      </div>
                      {selectedCase === study.id && (
                        <div className="space-y-4 animate-fade-in">
                          <div>
                            <h4 className="font-playfair font-semibold text-cream mb-2 flex items-center">
                              <CheckCircle className="w-4 h-4 mr-2 text-secondary" />
                              Strategy Implementation:
                            </h4>
                            <ul className="space-y-1">
                              {study.strategy.map((item, i) => (
                                <li key={i} className="font-crimson text-sm text-cream/80 flex items-start">
                                  <div className="w-1.5 h-1.5 bg-secondary rounded-full mr-2 mt-2"></div>
                                  {item}
                                </li>
                              ))}
                            </ul>
                          </div>
                          <div className="grid grid-cols-3 gap-4">
                            {study.metrics.map((metric, i) => (
                              <div key={i} className="text-center p-3 bg-cream/5 rounded">
                                <div className="font-playfair text-lg font-bold text-secondary">
                                  {metric.value}
                                </div>
                                <div className="font-crimson text-xs text-cream/70">
                                  {metric.label}
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>
                      )}
                      <div>
                        <h4 className="font-playfair font-semibold text-cream mb-2 flex items-center">
                          <Star className="w-4 h-4 mr-2 text-secondary" />
                          Results:
                        </h4>
                        <p className="font-crimson text-sm text-secondary font-medium">
                          {study.results}
                        </p>
                      </div>
                    </div>
                  </CardContent>
                  {/* Testimonial Overlay on hover */}
                  <div className="absolute inset-0 flex items-center justify-center bg-tertiary/90 text-cream text-center px-6 opacity-0 group-hover:opacity-100 transition-opacity duration-400 z-10 pointer-events-none">
                    <div>
                      <Quote className="w-8 h-8 mx-auto mb-2 text-secondary" />
                      <div className="font-crimson text-lg italic mb-2">“{study.testimonial}”</div>
                      <div className="font-crimson text-sm text-secondary">— {study.client}</div>
                    </div>
                  </div>
                </Card>
              </div>
            ))}
          </div>
        </div>

        {/* Performance Metrics */}
        <div data-aos="fade-in" className="transition-all duration-1000 delay-600">
          <Card className="premium-card bg-champagne/10 border-secondary/20">
            <CardHeader className="text-center">
              <CardTitle className="font-playfair text-3xl text-cream mb-4">
                Quantifiable Results
              </CardTitle>
              <CardDescription className="font-crimson text-cream/80">
                Our commitment to excellence is reflected in measurable outcomes
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6">
                {performanceMetrics.map((metric, index) => (
                  <div
                    key={index}
                    className={`text-center p-6 bg-cream/5 rounded-lg hover-lift transition-all duration-300 delay-${index * 100}`}
                  >
                    <div className="font-playfair text-3xl font-bold text-secondary mb-2">
                      {metric.value}
                    </div>
                    <div className="font-crimson text-sm text-cream font-medium mb-2">
                      {metric.label}
                    </div>
                    <div className="font-crimson text-xs text-cream/60">
                      {metric.comparison}
                    </div>
                  </div>
                ))}
              </div>

              <div className="mt-8 text-center">
                <p className="font-crimson text-cream/80 max-w-2xl mx-auto">
                  These results represent actual client outcomes and demonstrate our commitment
                  to delivering measurable value through disciplined investment management and
                  comprehensive financial planning.
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
};

export default ResultsSection;