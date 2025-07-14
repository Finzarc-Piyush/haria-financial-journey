import { useEffect, useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Award, GraduationCap, Shield, Users, Star, Building } from "lucide-react";

const CredentialsSection = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.3 }
    );

    const element = document.getElementById('credentials');
    if (element) {
      observer.observe(element);
    }

    return () => observer.disconnect();
  }, []);

  const certifications = [
    { name: 'CFA Charter', year: '2018', org: 'CFA Institute' },
    { name: 'CFP Certification', year: '2020', org: 'CFP Board' },
    { name: 'FRM Certification', year: '2019', org: 'GARP' },
    { name: 'SEBI Registration', year: 'Current', org: 'SEBI' }
  ];

  const education = [
    { degree: 'MBA Finance', institution: 'Mumbai University', year: '2015', honor: 'First Class Honors' },
    { degree: 'B.Com', institution: 'St. Xavier\'s College', year: '2013', honor: 'Distinction' }
  ];

  const recognition = [
    { title: 'Top Financial Advisor Mumbai 2023', org: 'Economic Times' },
    { title: 'Excellence in Client Service Award 2022', org: 'Financial Planning Magazine' },
    { title: 'Rising Star in Wealth Management 2021', org: 'Business Today' },
    { title: 'Ethical Advisor Recognition 2020', org: 'CFA Institute Mumbai' }
  ];

  return (
    <section id="credentials" className="py-20 bg-tertiary text-cream">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className={`text-center mb-16 transition-all duration-1000 ${isVisible ? 'animate-fade-in' : 'opacity-0'}`}>
          <h2 className="font-playfair text-4xl md:text-5xl font-bold mb-6">
            Professional Credentials & Regulatory Compliance
          </h2>
          <div className="w-24 h-1 bg-secondary mx-auto"></div>
        </div>

        <div className={`grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 transition-all duration-1000 delay-200 ${isVisible ? 'animate-slide-up' : 'opacity-0'}`}>
          <Card className="premium-card bg-cream/10">
            <CardHeader className="text-center">
              <Award className="w-8 h-8 text-secondary mx-auto mb-4" />
              <CardTitle className="font-playfair text-lg text-cream">Certifications</CardTitle>
            </CardHeader>
            <CardContent>
              {certifications.map((cert, i) => (
                <div key={i} className="mb-3">
                  <Badge className="bg-secondary text-secondary-foreground mb-1">{cert.name}</Badge>
                  <div className="font-crimson text-xs text-cream/70">{cert.org} - {cert.year}</div>
                </div>
              ))}
            </CardContent>
          </Card>

          <Card className="premium-card bg-cream/10">
            <CardHeader className="text-center">
              <GraduationCap className="w-8 h-8 text-secondary mx-auto mb-4" />
              <CardTitle className="font-playfair text-lg text-cream">Education</CardTitle>
            </CardHeader>
            <CardContent>
              {education.map((edu, i) => (
                <div key={i} className="mb-3">
                  <div className="font-crimson font-semibold text-cream text-sm">{edu.degree}</div>
                  <div className="font-crimson text-xs text-cream/70">{edu.institution} - {edu.year}</div>
                  <Badge variant="outline" className="text-xs border-secondary text-secondary">{edu.honor}</Badge>
                </div>
              ))}
            </CardContent>
          </Card>

          <Card className="premium-card bg-cream/10">
            <CardHeader className="text-center">
              <Shield className="w-8 h-8 text-secondary mx-auto mb-4" />
              <CardTitle className="font-playfair text-lg text-cream">Compliance</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3 text-center">
                <Badge className="bg-secondary text-secondary-foreground">SEBI Registered</Badge>
                <Badge className="bg-secondary text-secondary-foreground">IRDA Licensed</Badge>
                <Badge className="bg-secondary text-secondary-foreground">Fiduciary Duty</Badge>
                <Badge className="bg-secondary text-secondary-foreground">₹5Cr Insurance</Badge>
              </div>
            </CardContent>
          </Card>

          <Card className="premium-card bg-cream/10">
            <CardHeader className="text-center">
              <Star className="w-8 h-8 text-secondary mx-auto mb-4" />
              <CardTitle className="font-playfair text-lg text-cream">Recognition</CardTitle>
            </CardHeader>
            <CardContent>
              {recognition.map((award, i) => (
                <div key={i} className="mb-2">
                  <div className="font-crimson text-xs text-secondary font-semibold">{award.title}</div>
                  <div className="font-crimson text-xs text-cream/70">{award.org}</div>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
};

export default CredentialsSection;