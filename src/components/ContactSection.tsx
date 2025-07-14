import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Phone, Mail, MapPin, Clock, Calendar } from "lucide-react";

const ContactSection = () => {
  return (
    <section id="contact" className="py-20 bg-cream">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16" data-aos="fade-down">
          <h2 className="font-playfair text-4xl md:text-5xl font-bold text-tertiary mb-6">
            Schedule Your Consultation
          </h2>
          <div className="w-24 h-1 bg-secondary mx-auto mb-6" data-aos="fade-right" data-aos-delay="200"></div>
          <p className="font-crimson text-lg text-tertiary/80 max-w-3xl mx-auto">
            Ready to take the next step? Contact us today for your complimentary consultation.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Contact Information */}
          <div className="space-y-8" data-aos="fade-right">
            <div>
              <h3 className="font-playfair text-3xl font-bold text-tertiary mb-6">
                Get in Touch
              </h3>
              <p className="font-crimson text-lg text-tertiary/80 mb-8">
                Ready to start your financial journey? Let's discuss your goals and create a plan 
                that works for you.
              </p>
            </div>

            <Card className="premium-card hover-lift">
              <CardHeader>
                <CardTitle className="font-playfair text-2xl text-tertiary flex items-center">
                  <Calendar className="w-6 h-6 text-secondary mr-3" />
                  Contact Information
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="flex items-start group">
                  <Phone className="w-5 h-5 text-secondary mr-3 mt-1 transition-transform duration-300 group-hover:scale-110" />
                  <div>
                    <div className="font-crimson font-semibold text-tertiary">Phone</div>
                    <a href="tel:+919876543210" className="font-crimson text-tertiary/70 hover:text-secondary transition-colors duration-300">
                      +91 98765 43210
                    </a>
                  </div>
                </div>
                
                <div className="flex items-start group">
                  <Mail className="w-5 h-5 text-secondary mr-3 mt-1 transition-transform duration-300 group-hover:scale-110" />
                  <div>
                    <div className="font-crimson font-semibold text-tertiary">Email</div>
                    <a href="mailto:hariainvestments9@gmail.com" className="font-crimson text-tertiary/70 hover:text-secondary transition-colors duration-300">
                      hariainvestments9@gmail.com
                    </a>
                  </div>
                </div>
                
                <div className="flex items-start group">
                  <MapPin className="w-5 h-5 text-secondary mr-3 mt-1 transition-transform duration-300 group-hover:scale-110" />
                  <div>
                    <div className="font-crimson font-semibold text-tertiary">Office Address</div>
                    <div className="font-crimson text-tertiary/70">
                      1st Floor, Room No.12, Shree Krishna Niwas,<br />
                      Above Panshikhar Sweets, Opposite Ajay Shopping Centre,<br />
                      T.H.Kataria Marg, Matunga West, Mumbai – 400016
                    </div>
                  </div>
                </div>
                
                <div className="flex items-start group">
                  <Clock className="w-5 h-5 text-secondary mr-3 mt-1 transition-transform duration-300 group-hover:scale-110" />
                  <div>
                    <div className="font-crimson font-semibold text-tertiary">Office Hours</div>
                    <div className="font-crimson text-tertiary/70">
                      Monday-Friday: 9:00 AM - 6:00 PM<br />
                      Saturday: 9:00 AM - 2:00 PM
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Consultation Booking */}
          <div data-aos="fade-left" data-aos-delay="200">
            <Card className="premium-card border-secondary group">
              <CardHeader className="text-center">
                <Calendar className="w-12 h-12 text-secondary mx-auto mb-4 transition-transform duration-300 group-hover:scale-110" />
                <CardTitle className="font-playfair text-2xl text-tertiary">
                  Schedule Your Consultation
                </CardTitle>
                <CardDescription className="font-crimson text-tertiary/70">
                  Book a complimentary 30-minute consultation to discuss your financial goals
                </CardDescription>
              </CardHeader>
              <CardContent className="text-center">
                <Button 
                  size="lg"
                  className="w-full bg-secondary text-secondary-foreground hover:bg-secondary/90 font-crimson font-semibold mb-4 shadow-elegant hover:shadow-floating transition-all duration-300 hover:scale-105 active:scale-95 relative overflow-hidden group"
                >
                  <span className="relative z-10">Book Online Consultation</span>
                  <div className="absolute inset-0 bg-gradient-to-r from-secondary to-tertiary opacity-0 group-hover:opacity-20 transition-opacity duration-300"></div>
                </Button>
                <p className="font-crimson text-sm text-tertiary/60">
                  Or call us directly at{' '}
                  <a 
                    href="tel:+919876543210" 
                    className="text-secondary hover:text-secondary/80 font-semibold transition-colors duration-300 hover:underline"
                  >
                    +91 98765 43210
                  </a>
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;