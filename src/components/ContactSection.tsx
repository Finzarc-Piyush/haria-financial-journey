import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Phone, Mail, MapPin, Clock, Calendar } from "lucide-react";
import AOS from 'aos';
import 'aos/dist/aos.css';
import { useEffect } from 'react';

function isMobile() {
  if (typeof window === 'undefined') return false;
  return window.innerWidth < 768;
}

const ContactSection = () => {
  useEffect(() => {
    const offset = isMobile() ? 120 : 40;
    AOS.init({ duration: 500, once: true, offset });
  }, []);

  return (
    <section id="contact" className="py-20 bg-cream">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div data-aos="fade-up" className="text-center mb-16">
          <h2 className="font-playfair text-4xl md:text-5xl font-bold text-tertiary mb-4">
            Let's Connect
          </h2>
          <div className="w-24 h-1 bg-secondary mx-auto mb-6"></div>
          <p className="font-crimson text-xl md:text-2xl text-tertiary/80 max-w-3xl mx-auto">
            We're here to help you take the next confident step in your financial journey. Reach out for a complimentary consultation or visit us in person.
          </p>
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Contact Info Card */}
          <Card data-aos="fade-up" data-aos-delay="100" className="premium-card shadow-lg border border-champagne/60">
            <CardHeader>
              <CardTitle className="font-playfair text-2xl text-tertiary flex items-center gap-2">
                <Calendar className="w-6 h-6 text-secondary" /> Contact Information
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-8">
              {/* Phone */}
              <div className="flex items-start group">
                <Phone className="w-6 h-6 text-secondary mr-4 mt-1" />
                <div>
                  <div className="font-crimson font-semibold text-tertiary text-lg">Phone</div>
                  <a
                    href="tel:+919876543210"
                    className="font-crimson text-tertiary/80 text-lg underline-offset-4 transition-colors duration-200 group-hover:text-secondary group-hover:underline focus:text-secondary"
                    tabIndex={0}
                    title="Tap to call directly"
                  >
                    +91 98765 43210
                  </a>
                </div>
              </div>
              {/* Email */}
              <div className="flex items-start group">
                <Mail className="w-6 h-6 text-secondary mr-4 mt-1" />
                <div>
                  <div className="font-crimson font-semibold text-tertiary text-lg">Email</div>
                  <a
                    href="mailto:hariainvestments9@gmail.com"
                    className="font-crimson text-tertiary/80 text-lg underline-offset-4 transition-colors duration-200 group-hover:text-secondary group-hover:underline focus:text-secondary"
                  >
                    hariainvestments9@gmail.com
                  </a>
                </div>
              </div>
              {/* Address */}
              <div className="flex items-start">
                <MapPin className="w-6 h-6 text-secondary mr-4 mt-1" />
                <div>
                  <div className="font-crimson font-semibold text-tertiary text-lg">Office Address</div>
                  <div className="font-crimson text-tertiary/70 text-lg">
                    1st Floor, Room No.12, Shree Krishna Niwas,<br />
                    Above Panshikhar Sweets, Opposite Ajay Shopping Centre,<br />
                    T.H.Kataria Marg, Matunga West, Mumbai – 400016
                  </div>
                </div>
              </div>
              {/* Hours */}
              <div className="flex items-start">
                <Clock className="w-6 h-6 text-secondary mr-4 mt-1" />
                <div>
                  <div className="font-crimson font-semibold text-tertiary text-lg">Office Hours</div>
                  <div className="font-crimson text-tertiary/70 text-lg">
                    Monday-Friday: 9:00 AM - 6:00 PM<br />
                    Saturday: 9:00 AM - 2:00 PM
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
          {/* Booking Card */}
          <Card data-aos="fade-up" data-aos-delay="200" className="premium-card shadow-lg border border-champagne/60 bg-champagne flex flex-col justify-between">
            <CardHeader>
              <CardTitle className="font-playfair text-2xl text-tertiary">
                Book a Free Consultation
              </CardTitle>
            </CardHeader>
            <CardContent className="flex flex-col gap-6">
              <Button
                size="lg"
                className="w-full bg-secondary text-secondary-foreground hover:bg-secondary/90 font-crimson font-semibold btn-glow transform transition-transform duration-200 hover:scale-105 focus:scale-105"
                style={{ boxShadow: '0 0 0 0 rgba(212,165,116,0.5)', transition: 'box-shadow 0.3s' }}
                onMouseDown={e => {
                  const btn = e.currentTarget;
                  btn.style.boxShadow = '0 0 0 8px rgba(212,165,116,0.25)';
                  setTimeout(() => { btn.style.boxShadow = '0 0 0 0 rgba(212,165,116,0.5)'; }, 400);
                }}
              >
                Book Online Appointment
              </Button>
              <div className="relative group w-full">
                <Button
                  variant="outline"
                  size="lg"
                  className="w-full border-secondary text-secondary hover:bg-secondary hover:text-secondary-foreground font-crimson btn-glow transform transition-transform duration-200 hover:scale-105 focus:scale-105"
                  style={{ boxShadow: '0 0 0 0 rgba(212,165,116,0.5)', transition: 'box-shadow 0.3s' }}
                  onMouseDown={e => {
                    const btn = e.currentTarget;
                    btn.style.boxShadow = '0 0 0 8px rgba(212,165,116,0.25)';
                    setTimeout(() => { btn.style.boxShadow = '0 0 0 0 rgba(212,165,116,0.5)'; }, 400);
                  }}
                  tabIndex={0}
                >
                  Call Now: +91 98765 43210
                </Button>
                <span className="absolute left-1/2 -bottom-7 -translate-x-1/2 bg-tertiary text-cream text-xs rounded px-3 py-1 shadow-md opacity-0 group-hover:opacity-100 group-focus-within:opacity-100 transition-opacity duration-200 z-10">
                  Tap to call directly
                </span>
              </div>
              <div className="text-center text-base text-tertiary/80 font-crimson mt-2">
                Initial 30-minute consultation is complimentary
              </div>
            </CardContent>
          </Card>
        </div>
        {/* Google Map Card */}
        <div data-aos="zoom-in" className="mt-16 flex justify-center">
          <Card className="w-full max-w-2xl rounded-2xl shadow-lg border border-champagne/60 overflow-hidden">
            <CardHeader>
              <CardTitle className="font-playfair text-xl text-tertiary mb-2">Visit Us</CardTitle>
            </CardHeader>
            <CardContent className="p-0">
              <iframe
                title="Haria Investments Office Location"
                src="https://www.google.com/maps?q=1st+Floor,+Room+No.12,+Shree+Krishna+Niwas,+T.H.Kataria+Marg,+Matunga+West,+Mumbai+400016&output=embed"
                width="100%"
                height="350"
                style={{ border: 0, borderRadius: '0 0 1rem 1rem', minWidth: '280px' }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              ></iframe>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;