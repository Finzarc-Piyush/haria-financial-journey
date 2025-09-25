import { useEffect } from 'react';
import { Badge } from "@/components/ui/badge";
import { Award, GraduationCap, Heart, Users, Building2, Star, Target, Eye } from "lucide-react";
import teamPhoto from "@/assets/team-photo.jpg";
import aboutSectionPhoto from "@/assets/about-section-image.webp";
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
            About Us
          </h2>
          <div className="w-24 h-1 bg-secondary mx-auto"></div>
        </div>

        {/* Block 1: Heritage */}
        <div data-aos="fade-up" data-aos-delay="100" className="mb-20">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="order-2 lg:order-1">
              <img
                src=""
                alt="Haria Investments Legacy"
                className="w-full h-56 sm:h-64 md:h-80 object-cover mx-auto rounded-lg shadow-floating"
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
                Our journey began with Late Shri <strong>Amritlal Devji Haria</strong>,
                who joined LIC at its inception. Over decades of dedicated service, he touched
                thousands of families, retiring as Development Officer and later continuing
                as an agent—laying the foundation of trust we carry forward today.
              </p>
              <p className="font-crimson text-lg leading-relaxed mb-6 text-cream/90">
                His son, <strong>Anil Amritlal Haria</strong>, embraced entrepreneurship and
                expanded the business beyond life insurance into health insurance and financial
                solutions, ensuring our services evolved with client needs.
              </p>
              <p className="font-crimson text-lg leading-relaxed mb-6 text-cream/90">
                Today, the third generation—<strong>Raj, Meet, and Rohan</strong>—continue
                this proud legacy, combining modern expertise with traditional values to
                serve families with integrity, innovation, and care.
              </p>
            </div>
          </div>
        </div>

        {/* Block 2: Our Leaders */}
        <div data-aos="fade-up" data-aos-delay="200" className="mb-20">
          <div className="flex items-center mb-6">
            <Award className="w-6 h-6 text-secondary mr-3" />
            <h3 className="font-playfair text-2xl font-semibold">Our Leaders</h3>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            {/* Raj */}
            <div className="premium-card p-6 bg-cream/10 rounded-xl shadow-floating" data-aos="fade-up" data-aos-delay="0">
              <h4 className="font-playfair text-xl font-semibold mb-3">Raj Haria</h4>
              <p className="font-crimson text-sm text-cream/80 mb-4">
                An MBA graduate from NMIMS, Raj has been expanding the mutual fund business since 2015,
                while building strong expertise in life and general insurance. With a focus on trust
                and long-term growth, he helps clients achieve their financial goals.
              </p>
              <Badge className="bg-secondary text-secondary-foreground">
                MBA – NMIMS
              </Badge>
            </div>

            {/* Meet */}
            <div className="premium-card p-6 bg-cream/10 rounded-xl shadow-floating" data-aos="fade-up" data-aos-delay="100">
              <h4 className="font-playfair text-xl font-semibold mb-3">Meet Savla</h4>
              <p className="font-crimson text-sm text-cream/80 mb-4">
                Since 2017, Meet has specialized in financial markets with a strong focus on
                technical analysis. Over time, he developed expertise in trading precious metals
                such as gold and silver, blending data-driven insights with hands-on experience.
              </p>
              <Badge className="bg-secondary text-secondary-foreground">
                Market Specialist
              </Badge>
            </div>

            {/* Rohan */}
            <div className="premium-card p-6 bg-cream/10 rounded-xl shadow-floating" data-aos="fade-up" data-aos-delay="200">
              <h4 className="font-playfair text-xl font-semibold mb-3">Rohan Haria</h4>
              <p className="font-crimson text-sm text-cream/80 mb-4">
                A Chartered Accountant with 6 years of experience in auditing leading financial
                institutions, particularly mutual funds. His rare behind-the-scenes understanding
                of the investment ecosystem drives his client-first, integrity-led approach.
              </p>
              <Badge className="bg-secondary text-secondary-foreground">
                Chartered Accountant
              </Badge>
            </div>
          </div>
        </div>

        {/* Block 3: Professional Excellence */}
        <div data-aos="fade-up" data-aos-delay="300" className="mb-20">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <div className="flex items-center mb-6">
                <Star className="w-6 h-6 text-secondary mr-3" />
                <h3 className="font-playfair text-2xl font-semibold">Professional Excellence</h3>
              </div>
              <p className="font-crimson text-lg leading-relaxed mb-6 text-cream/90">
                With over six decades of combined expertise, we have guided families through
                market cycles, economic changes, and evolving financial needs. From mutual funds
                and insurance to market trading and audits, our diverse strengths help clients
                protect, grow, and diversify wealth.
              </p>
              <div className="grid grid-cols-2 gap-4">
                <div className="premium-card p-4 text-center bg-cream/10" data-aos="zoom-in" data-aos-delay="0">
                  <div className="font-playfair text-2xl font-bold text-secondary mb-1">1957</div>
                  <div className="font-crimson text-sm text-cream/80">Legacy Since</div>
                </div>
                <div className="premium-card p-4 text-center bg-cream/10" data-aos="zoom-in" data-aos-delay="100">
                  <div className="font-playfair text-2xl font-bold text-secondary mb-1">1000+</div>
                  <div className="font-crimson text-sm text-cream/80">Families Served</div>
                </div>
              </div>
            </div>
            <div>
              <img
                src=""
                alt="Haria Investments Team"
                className="w-full rounded-lg shadow-floating"
                data-aos="fade-left"
                data-aos-delay="200"
              />
            </div>
          </div>
        </div>

        {/* Block 4: Vision & Mission */}
        <div data-aos="fade-up" data-aos-delay="400" className="mb-20">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            <div className="premium-card p-6 bg-cream/10 rounded-xl shadow-floating text-center" data-aos="fade-right">
              <Eye className="w-8 h-8 text-secondary mx-auto mb-4" />
              <h4 className="font-playfair text-xl font-semibold mb-3">Vision</h4>
              <p className="font-crimson text-sm text-cream/80">
                To be recognized as a leading wealth and protection partner that combines
                innovation, integrity, and personalized care—enabling every client to build
                sustainable wealth, safeguard their future, and achieve financial freedom
                across generations.
              </p>
            </div>
            <div className="premium-card p-6 bg-cream/10 rounded-xl shadow-floating text-center" data-aos="fade-left">
              <Target className="w-8 h-8 text-secondary mx-auto mb-4" />
              <h4 className="font-playfair text-xl font-semibold mb-3">Mission</h4>
              <p className="font-crimson text-sm text-cream/80">
                To provide holistic financial solutions that help individuals and families
                protect, grow, and diversify their wealth. Through trusted advice,
                research-driven strategies, and a wide spectrum of offerings, we empower
                clients to achieve financial security, prosperity, and peace of mind.
              </p>
            </div>
          </div>
        </div>

        {/* Block 5: Values & Personal Connection */}
        <div data-aos="fade-up" data-aos-delay="500">
          <div className="text-center max-w-4xl mx-auto">
            <div className="flex items-center justify-center mb-6">
              <Heart className="w-6 h-6 text-secondary mr-3" />
              <h3 className="font-playfair text-2xl font-semibold">Our Commitment</h3>
            </div>

            <p className="font-crimson text-lg leading-relaxed mb-8 text-cream/90">
              Our vision, values, and tireless dedication continue to inspire us as we serve
              our clients today. We are proud to be the second and third generation reaping
              the rewards of our founders’ hard work, and more importantly, carrying forward
              a tradition of trust and service that spans decades.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;