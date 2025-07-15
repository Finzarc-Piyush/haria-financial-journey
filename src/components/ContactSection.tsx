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
            <CardContent>
              <form className="flex flex-col gap-6" autoComplete="off" noValidate>
                {/* Name fields */}
                <div className="flex flex-col md:flex-row gap-4">
                  <div className="flex-1">
                    <label htmlFor="firstName" className="block font-crimson text-tertiary mb-1">First Name <span className="text-red-500">*</span></label>
                    <input id="firstName" name="firstName" type="text" required className="w-full rounded-md border border-champagne/60 bg-cream/40 px-4 py-2 font-crimson text-tertiary focus:outline-none focus:ring-2 focus:ring-secondary/40" autoComplete="given-name" />
                  </div>
                  <div className="flex-1">
                    <label htmlFor="lastName" className="block font-crimson text-tertiary mb-1">Last Name <span className="text-red-500">*</span></label>
                    <input id="lastName" name="lastName" type="text" required className="w-full rounded-md border border-champagne/60 bg-cream/40 px-4 py-2 font-crimson text-tertiary focus:outline-none focus:ring-2 focus:ring-secondary/40" autoComplete="family-name" />
                  </div>
                </div>
                {/* Email */}
                <div>
                  <label htmlFor="email" className="block font-crimson text-tertiary mb-1">Email <span className="text-red-500">*</span></label>
                  <input id="email" name="email" type="email" required className="w-full rounded-md border border-champagne/60 bg-cream/40 px-4 py-2 font-crimson text-tertiary focus:outline-none focus:ring-2 focus:ring-secondary/40" autoComplete="email" />
                </div>
                {/* Services checkboxes */}
                <div>
                  <label className="block font-crimson text-tertiary mb-2">Which services are you looking for? <span className="text-red-500">*</span></label>
                  <div className="flex flex-wrap gap-6">
                    <label className="inline-flex items-center gap-2 font-crimson text-tertiary">
                      <input type="checkbox" name="services" value="Insurance" className="accent-secondary w-5 h-5 rounded border-champagne/60 focus:ring-2 focus:ring-secondary/40" /> Insurance
                    </label>
                    <label className="inline-flex items-center gap-2 font-crimson text-tertiary">
                      <input type="checkbox" name="services" value="Mutual Funds" className="accent-secondary w-5 h-5 rounded border-champagne/60 focus:ring-2 focus:ring-secondary/40" /> Mutual Funds
                    </label>
                    <label className="inline-flex items-center gap-2 font-crimson text-tertiary">
                      <input type="checkbox" name="services" value="Equity Broking" className="accent-secondary w-5 h-5 rounded border-champagne/60 focus:ring-2 focus:ring-secondary/40" /> Equity Broking
                    </label>
                  </div>
                </div>
                {/* Comment/Message */}
                <div>
                  <label htmlFor="message" className="block font-crimson text-tertiary mb-1">Comment or Message <span className="text-red-500">*</span></label>
                  <textarea id="message" name="message" required rows={4} className="w-full rounded-md border border-champagne/60 bg-cream/40 px-4 py-2 font-crimson text-tertiary focus:outline-none focus:ring-2 focus:ring-secondary/40 resize-none" />
                </div>
                {/* Submit Button */}
                <div className="pt-2">
                  <Button type="submit" size="lg" className="w-full bg-secondary text-secondary-foreground hover:bg-secondary/90 font-crimson font-semibold px-6 py-3 text-lg transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-secondary/60 focus:ring-offset-2">
                    Submit
                  </Button>
                </div>
              </form>
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