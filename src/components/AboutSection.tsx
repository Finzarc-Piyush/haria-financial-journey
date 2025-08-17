import { useEffect } from 'react';
import { Badge } from "@/components/ui/badge";
import { Award, GraduationCap, Heart, Users, Building2, Star } from "lucide-react";
import teamPhoto from "@/assets/team-photo.jpg";
import advisorHeadshot from "@/assets/advisor-headshot.jpg";
import advisor from "@/assets/advisor.jpg";
import AOS from 'aos';
import 'aos/dist/aos.css';

const AboutSection = () => {
  useEffect(() => {
    AOS.init({ duration: 500, once: true });
  }, []);

  return (
    <section id="about" className="py-20 bg-tertiary text-cream">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div data-aos="fade-up" className="text-center mb-16">
          <h2 className="font-playfair text-4xl md:text-5xl font-bold mb-6">
            Personal Connection & Deep Expertise
          </h2>
          <div className="w-24 h-1 bg-secondary mx-auto"></div>
        </div>

        {/* Block 1: Professional Biography */}
        <div data-aos="fade-up" data-aos-delay="100" className="mb-20">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="order-2 lg:order-1">
              <img
                src={advisor}
                alt="Meet Savla, Financial Advisor"
                className="w-full max-w-md mx-auto rounded-lg shadow-floating"
                data-aos="fade-right"
                data-aos-delay="100"
              />
            </div>
            <div className="order-1 lg:order-2">
              <div className="flex items-center mb-6">
                <Building2 className="w-6 h-6 text-secondary mr-3" />
                <h3 className="font-playfair text-2xl font-semibold">Our Heritage</h3>
              </div>
              <p className="font-crimson text-lg leading-relaxed mb-6 text-cream/90">
                At Haria Investments, we've been providing trusted investment advice since 1957.
                Founded by Late Shri Ramesh Haria, our firm has evolved from a small family office
                to a comprehensive wealth management practice serving multiple generations of clients.
              </p>
              <p className="font-crimson text-lg leading-relaxed mb-6 text-cream/90">
                We believe in building lasting relationships through transparency, expertise, and
                unwavering commitment to our clients' financial success. Our approach combines
                time-tested investment principles with modern portfolio management techniques.
              </p>
              <div className="flex flex-wrap gap-3">
                <Badge className="bg-secondary text-secondary-foreground" data-aos="zoom-in" data-aos-delay="0" title="MBA in Finance from Mumbai University">
                  <GraduationCap className="w-4 h-4 mr-2" />
                  MBA Finance
                </Badge>
                <Badge className="bg-secondary text-secondary-foreground" data-aos="zoom-in" data-aos-delay="100" title="CFA Charter Holder since 2018">
                  <Award className="w-4 h-4 mr-2" />
                  CFA Charter
                </Badge>
                <Badge className="bg-secondary text-secondary-foreground" data-aos="zoom-in" data-aos-delay="200" title="CFP Certification awarded in 2020">
                  <Star className="w-4 h-4 mr-2" />
                  CFP Certification
                </Badge>
              </div>
            </div>
          </div>
        </div>

        {/* Block 2: Professional Credentials */}
        <div data-aos="fade-up" data-aos-delay="200" className="mb-20">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <div className="flex items-center mb-6">
                <Award className="w-6 h-6 text-secondary mr-3" />
                <h3 className="font-playfair text-2xl font-semibold">Professional Excellence</h3>
              </div>
              <p className="font-crimson text-lg leading-relaxed mb-6 text-cream/90">
                With over 65 years of combined experience, our team has guided clients through
                multiple market cycles, economic downturns, and periods of growth. We bring
                institutional-quality investment management to individual and family clients.
              </p>

              <div className="space-y-4 mb-6">
                <div className="flex items-center" data-aos="fade-right" data-aos-delay="0" title="MBA Finance from Mumbai University">
                  <div className="w-2 h-2 bg-secondary rounded-full mr-4"></div>
                  <span className="font-crimson text-cream/90">MBA Finance from Mumbai University</span>
                </div>
                <div className="flex items-center" data-aos="fade-left" data-aos-delay="100" title="CFA Charter Holder since 2018">
                  <div className="w-2 h-2 bg-secondary rounded-full mr-4"></div>
                  <span className="font-crimson text-cream/90">CFA Charter Holder since 2018</span>
                </div>
                <div className="flex items-center" data-aos="fade-right" data-aos-delay="200" title="CFP Certification - 2020">
                  <div className="w-2 h-2 bg-secondary rounded-full mr-4"></div>
                  <span className="font-crimson text-cream/90">CFP Certification - 2020</span>
                </div>
                <div className="flex items-center" data-aos="fade-left" data-aos-delay="300" title="Member, CFA Institute & FPA India">
                  <div className="w-2 h-2 bg-secondary rounded-full mr-4"></div>
                  <span className="font-crimson text-cream/90">Member, CFA Institute & FPA India</span>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="premium-card p-4 text-center bg-cream/10" data-aos="zoom-in" data-aos-delay="0" title="99% client retention rate">
                  <div className="font-playfair text-2xl font-bold text-secondary mb-1">99%</div>
                  <div className="font-crimson text-sm text-cream/80">Client Retention</div>
                </div>
                <div className="premium-card p-4 text-center bg-cream/10" data-aos="zoom-in" data-aos-delay="100" title="12 years average client relationship">
                  <div className="font-playfair text-2xl font-bold text-secondary mb-1">12 Yrs</div>
                  <div className="font-crimson text-sm text-cream/80">Avg Relationship</div>
                </div>
              </div>
            </div>
            <div>
              <img
                src={teamPhoto}
                alt="Haria Investments Team"
                className="w-full rounded-lg shadow-floating"
                data-aos="fade-left"
                data-aos-delay="200"
              />
            </div>
          </div>
        </div>

        {/* Block 3: Personal Touch */}
        <div data-aos="fade-up" data-aos-delay="300">
          <div className="text-center max-w-4xl mx-auto">
            <div className="flex items-center justify-center mb-6">
              <Heart className="w-6 h-6 text-secondary mr-3" />
              <h3 className="font-playfair text-2xl font-semibold">Personal Connection</h3>
            </div>

            <p className="font-crimson text-lg leading-relaxed mb-8 text-cream/90">
              Born and raised in Mumbai, I understand the unique financial challenges and
              opportunities facing Indian professionals and families. As a father of two and
              someone planning for my own family's future, I bring personal understanding to
              every client relationship.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="premium-card p-6 text-center bg-cream/10" data-aos="zoom-in" data-aos-delay="0" title="Active Rotary Club Mumbai member, volunteer financial literacy educator">
                <Users className="w-8 h-8 text-secondary mx-auto mb-4" />
                <h4 className="font-playfair text-lg font-semibold mb-2">Community Leader</h4>
                <p className="font-crimson text-sm text-cream/80">
                  Active Rotary Club Mumbai member, volunteer financial literacy educator
                </p>
              </div>

              <div className="premium-card p-6 text-center bg-cream/10" data-aos="zoom-in" data-aos-delay="100" title="Personal understanding of family financial planning and generational wealth">
                <Heart className="w-8 h-8 text-secondary mx-auto mb-4" />
                <h4 className="font-playfair text-lg font-semibold mb-2">Family Values</h4>
                <p className="font-crimson text-sm text-cream/80">
                  Personal understanding of family financial planning and generational wealth
                </p>
              </div>

              <div className="premium-card p-6 text-center bg-cream/10" data-aos="zoom-in" data-aos-delay="200" title="Mumbai's Top Financial Advisor 2023, Excellence in Client Service Award">
                <Star className="w-8 h-8 text-secondary mx-auto mb-4" />
                <h4 className="font-playfair text-lg font-semibold mb-2">Recognition</h4>
                <p className="font-crimson text-sm text-cream/80">
                  Mumbai's Top Financial Advisor 2023, Excellence in Client Service Award
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;