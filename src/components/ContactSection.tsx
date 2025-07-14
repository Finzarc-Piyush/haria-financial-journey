import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Phone, Mail, MapPin, Clock, Calendar } from "lucide-react";

const ContactSection = () => {
  return (
    <section id="contact" className="py-20 bg-cream">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="font-playfair text-4xl md:text-5xl font-bold text-tertiary mb-6">
            Schedule Your Consultation
          </h2>
          <div className="w-24 h-1 bg-secondary mx-auto mb-6"></div>
          <p className="font-crimson text-lg text-tertiary/80 max-w-3xl mx-auto">
            Ready to take the next step? Contact us today for your complimentary consultation.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          <Card className="premium-card">
            <CardHeader>
              <CardTitle className="font-playfair text-2xl text-tertiary flex items-center">
                <Calendar className="w-6 h-6 text-secondary mr-3" />
                Contact Information
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex items-start">
                <Phone className="w-5 h-5 text-secondary mr-3 mt-1" />
                <div>
                  <div className="font-crimson font-semibold text-tertiary">Phone</div>
                  <div className="font-crimson text-tertiary/70">+91 98765 43210</div>
                </div>
              </div>
              
              <div className="flex items-start">
                <Mail className="w-5 h-5 text-secondary mr-3 mt-1" />
                <div>
                  <div className="font-crimson font-semibold text-tertiary">Email</div>
                  <div className="font-crimson text-tertiary/70">hariainvestments9@gmail.com</div>
                </div>
              </div>
              
              <div className="flex items-start">
                <MapPin className="w-5 h-5 text-secondary mr-3 mt-1" />
                <div>
                  <div className="font-crimson font-semibold text-tertiary">Office Address</div>
                  <div className="font-crimson text-tertiary/70">
                    1st Floor, Room No.12, Shree Krishna Niwas,<br />
                    Above Panshikhar Sweets, Opposite Ajay Shopping Centre,<br />
                    T.H.Kataria Marg, Matunga West, Mumbai – 400016
                  </div>
                </div>
              </div>
              
              <div className="flex items-start">
                <Clock className="w-5 h-5 text-secondary mr-3 mt-1" />
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

          <Card className="premium-card bg-champagne">
            <CardHeader>
              <CardTitle className="font-playfair text-2xl text-tertiary">
                Schedule Your Free Consultation
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <Button 
                  size="lg" 
                  className="w-full bg-secondary text-secondary-foreground hover:bg-secondary/90 font-crimson font-semibold"
                >
                  Book Online Appointment
                </Button>
                <Button 
                  variant="outline" 
                  size="lg" 
                  className="w-full border-secondary text-secondary hover:bg-secondary hover:text-secondary-foreground font-crimson"
                >
                  Call Now: +91 98765 43210
                </Button>
                <div className="text-center text-sm text-tertiary/70 font-crimson">
                  Initial 30-minute consultation is complimentary
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;