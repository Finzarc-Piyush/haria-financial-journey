import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Phone, Mail, MapPin, Clock, Calendar } from "lucide-react";
import AOS from 'aos';
import 'aos/dist/aos.css';
import { useEffect, useState, useRef } from 'react';
import { motion } from 'framer-motion';
import emailjs from '@emailjs/browser';
import ConfirmationModal from './ui/ConfirmationModal';

function isMobile() {
  if (typeof window === 'undefined') return false;
  return window.innerWidth < 768;
}

// GOOGLE_SCRIPT_URL 
const GOOGLE_SCRIPT_URL = import.meta.env.VITE_GOOGLE_SCRIPT_URL;

// EmailJS configuration 
const EMAILJS_SERVICE_ID = import.meta.env.VITE_EMAILJS_SERVICE_ID;
const EMAILJS_TEMPLATE_ID = import.meta.env.VITE_EMAILJS_TEMPLATE_ID;
const EMAILJS_PUBLIC_KEY = import.meta.env.VITE_EMAILJS_PUBLIC_KEY;

function validate(field: string, value: string | string[]) {
  switch (field) {
    case 'firstName':
    case 'lastName':
      if (!value || (typeof value === 'string' && value.trim().length === 0)) return 'Required.';
      if (typeof value === 'string' && value.trim().length < 3) return 'Must be at least 3 characters.';
      return '';
    case 'email':
      if (!value || (typeof value === 'string' && value.trim().length === 0)) return 'Required.';
      if (typeof value === 'string' && !/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(value)) return 'Invalid email.';
      return '';
    case 'message':
      // Message field is now optional - no validation required
      return '';
    case 'services':
      if (!Array.isArray(value) || value.length === 0) return 'Select at least one.';
      return '';
    default:
      return '';
  }
}

const ContactSection = () => {
  const [formValues, setFormValues] = useState({
    firstName: '',
    lastName: '',
    email: '',
    message: '',
    services: [] as string[],
  });
  const [formErrors, setFormErrors] = useState({
    firstName: '',
    lastName: '',
    email: '',
    message: '',
    services: '',
  });
  const [touched, setTouched] = useState({
    firstName: false,
    lastName: false,
    email: false,
    message: false,
    services: false,
  });
  const [isFormValid, setIsFormValid] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const formRef = useRef<HTMLFormElement>(null);
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [submittedFirstName, setSubmittedFirstName] = useState<string | null>(null);

  // Initialize EmailJS
  useEffect(() => {
    if (EMAILJS_PUBLIC_KEY) {
      emailjs.init(EMAILJS_PUBLIC_KEY);
    }
  }, []);


  // Function to send confirmation email
  const sendConfirmationEmail = async (formData: any) => {
    try {
      // Template parameters that will be sent to EmailJS
      const templateParams = {
        name: formData.firstName,
        email: formData.email,
      };

      const response = await emailjs.send(
        EMAILJS_SERVICE_ID,
        EMAILJS_TEMPLATE_ID,
        templateParams
      );

      return { success: true, response };
    } catch (error) {
      return { success: false, error };
    }
  };

  // Validate all fields and update errors
  useEffect(() => {
    const errors: any = {};
    Object.keys(formValues).forEach((field) => {
      errors[field] = validate(field, (formValues as any)[field]);
    });
    setFormErrors(errors);
    // Form is valid if all fields are touched and all errors are empty
    setIsFormValid(
      Object.values(errors).every((err) => !err) &&
      Object.values(touched).every((t) => t)
    );
  }, [formValues, touched]);

  // In handleInputChange, set touched to true on first change
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const target = e.target as HTMLInputElement;
    const { name, value, type } = target;
    setTouched((prev) => ({ ...prev, [name]: true }));
    if (type === 'checkbox') {
      setFormValues((prev) => {
        const arr = new Set(prev.services as string[]);
        if (target.checked) arr.add(value);
        else arr.delete(value);
        return { ...prev, services: Array.from(arr) };
      });
    } else {
      setFormValues((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleBlur = (e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name } = e.target;
    setTouched((prev) => ({ ...prev, [name]: true }));
  };

  const scrollToFirstError = () => {
    for (const field of Object.keys(formErrors)) {
      if (formErrors[field] && touched[field]) {
        const el = document.getElementsByName(field)[0];
        if (el) el.scrollIntoView({ behavior: 'smooth', block: 'center' });
        break;
      }
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // Mark all as touched
    setTouched({ firstName: true, lastName: true, email: true, message: true, services: true });
    // If not valid, scroll to first error
    if (!isFormValid) {
      scrollToFirstError();
      return;
    }
    setIsSubmitting(true);
    const data = {
      firstName: formValues.firstName,
      lastName: formValues.lastName,
      email: formValues.email,
      services: (formValues.services as string[]).join(", "),
      message: formValues.message,
      date: new Date().toISOString().slice(0, 10).replace(/-/g, "/"),
    };
    await fetch(GOOGLE_SCRIPT_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });

    // Send confirmation email to user
    await sendConfirmationEmail(data);

    setSubmittedFirstName(formValues.firstName);
    setFormValues({ firstName: '', lastName: '', email: '', message: '', services: [] });
    setTouched({ firstName: false, lastName: false, email: false, message: false, services: false });
    setIsSubmitting(false);
    setFormSubmitted(true);
    setShowConfirmation(true);
  };

  useEffect(() => {
    const offset = isMobile() ? 120 : 40;
    AOS.init({ duration: 500, once: true, offset });
  }, []);


  return (
    <section id="contact" className="py-20 bg-white">
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
          <Card data-aos="fade-up" data-aos-delay="100" className="premium-card shadow-floating border border-champagne/60">
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
                  <div className="font-crimson font-semibold text-tertiary text-xl">Phone</div>
                  <a
                    href="tel:+917738686126"
                    className="font-crimson text-tertiary/80 text-xl underline-offset-4 transition-colors duration-200 group-hover:text-secondary group-hover:underline focus:text-secondary"
                    tabIndex={0}
                    title="Tap to call directly"
                  >
                    +91 77386 86126
                  </a>
                </div>
              </div>
              {/* Email */}
              <div className="flex items-start group">
                <Mail className="w-6 h-6 text-secondary mr-4 mt-1" />
                <div>
                  <div className="font-crimson font-semibold text-tertiary text-xl">Email</div>
                  <a
                    href="mailto:hariainvestments9@gmail.com"
                    className="font-crimson text-tertiary/80 text-xl underline-offset-4 transition-colors duration-200 group-hover:text-secondary group-hover:underline focus:text-secondary"
                  >
                    hariainvestments9@gmail.com
                  </a>
                </div>
              </div>
              {/* Address */}
              <div className="flex items-start">
                <MapPin className="w-6 h-6 text-secondary mr-4 mt-1" />
                <div>
                  <div className="font-crimson font-semibold text-tertiary text-xl">Office Address</div>
                  <div className="font-crimson text-tertiary/70 text-xl">
                    1st Floor, Shree Krishna Niwas,<br />
                    Above Panshikhar Sweets, Opposite Ajay Shopping Centre,<br />
                    T.H.Kataria Marg, Matunga West, Mumbai – 400016
                  </div>
                </div>
              </div>
              {/* Hours */}
              <div className="flex items-start">
                <Clock className="w-6 h-6 text-secondary mr-4 mt-1" />
                <div>
                  <div className="font-crimson font-semibold text-tertiary text-xl">Office Hours</div>
                  <div className="font-crimson text-tertiary/70 text-xl">
                    Monday-Friday: 9:00 AM - 7:00 PM<br />
                    Saturday: 11:00 AM - 6:00 PM
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
          {/* Booking Card */}
          <Card data-aos="fade-up" data-aos-delay="200" className="premium-card shadow-floating border border-champagne/60 bg-champagne/20 flex flex-col justify-between">
            <CardHeader>
              <CardTitle className="font-playfair text-2xl text-tertiary">
                Book a Free Consultation
              </CardTitle>
            </CardHeader>
            <CardContent>
              {/* Always show the form, even when confirmation is showing */}
              <form
                ref={formRef}
                className="flex flex-col gap-6"
                autoComplete="off"
                noValidate
                onSubmit={handleSubmit}
              >
                {/* Name fields */}
                <div className="flex flex-col md:flex-row gap-4">
                  <div className="flex-1">
                    <label htmlFor="firstName" className="block font-crimson text-tertiary mb-1 text-xl">First Name <span className="text-red-500">*</span></label>
                    <input id="firstName" name="firstName" type="text" required className={`w-full rounded-md border ${touched.firstName && formErrors.firstName ? 'border-red-500' : 'border-champagne/60'} bg-white/40 px-4 py-3 font-crimson text-tertiary text-xl focus:outline-none focus:ring-2 focus:ring-secondary/40`} autoComplete="given-name" value={formValues.firstName} onChange={handleInputChange} onBlur={handleBlur} />
                    {touched.firstName && formErrors.firstName && <div className="text-red-500 text-base mt-1 transition-all duration-200">{formErrors.firstName}</div>}
                  </div>
                  <div className="flex-1">
                    <label htmlFor="lastName" className="block font-crimson text-tertiary mb-1 text-xl">Last Name <span className="text-red-500">*</span></label>
                    <input id="lastName" name="lastName" type="text" required className={`w-full rounded-md border ${touched.lastName && formErrors.lastName ? 'border-red-500' : 'border-champagne/60'} bg-white/40 px-4 py-3 font-crimson text-tertiary text-xl focus:outline-none focus:ring-2 focus:ring-secondary/40`} autoComplete="family-name" value={formValues.lastName} onChange={handleInputChange} onBlur={handleBlur} />
                    {touched.lastName && formErrors.lastName && <div className="text-red-500 text-base mt-1 transition-all duration-200">{formErrors.lastName}</div>}
                  </div>
                </div>
                {/* Email */}
                <div>
                  <label htmlFor="email" className="block font-crimson text-tertiary mb-1 text-xl">Email <span className="text-red-500">*</span></label>
                  <input id="email" name="email" type="email" required className={`w-full rounded-md border ${touched.email && formErrors.email ? 'border-red-500' : 'border-champagne/60'} bg-white/40 px-4 py-3 font-crimson text-tertiary text-xl focus:outline-none focus:ring-2 focus:ring-secondary/40`} autoComplete="email" value={formValues.email} onChange={handleInputChange} onBlur={handleBlur} />
                  {touched.email && formErrors.email && <div className="text-red-500 text-base mt-1 transition-all duration-200">{formErrors.email}</div>}
                </div>
                {/* Services checkboxes */}
                <div>
                  <label className="block font-crimson text-tertiary mb-2 text-xl">Which services are you looking for? <span className="text-red-500">*</span></label>
                  <div className="flex flex-wrap gap-6">
                    <label className="inline-flex items-center gap-2 font-crimson text-tertiary text-xl">
                      <input type="checkbox" name="services" value="Insurance" className="accent-secondary w-6 h-6 rounded border-champagne/60 focus:ring-2 focus:ring-secondary/40" checked={formValues.services.includes('Insurance')} onChange={handleInputChange} onBlur={handleBlur} /> Insurance
                    </label>
                    <label className="inline-flex items-center gap-2 font-crimson text-tertiary text-xl">
                      <input type="checkbox" name="services" value="Mutual Funds" className="accent-secondary w-6 h-6 rounded border-champagne/60 focus:ring-2 focus:ring-secondary/40" checked={formValues.services.includes('Mutual Funds')} onChange={handleInputChange} onBlur={handleBlur} /> Mutual Funds
                    </label>
                    <label className="inline-flex items-center gap-2 font-crimson text-tertiary text-xl">
                      <input type="checkbox" name="services" value="Equity" className="accent-secondary w-6 h-6 rounded border-champagne/60 focus:ring-2 focus:ring-secondary/40" checked={formValues.services.includes('Equity')} onChange={handleInputChange} onBlur={handleBlur} /> Equity
                    </label>
                    <label className="inline-flex items-center gap-2 font-crimson text-tertiary text-xl">
                      <input type="checkbox" name="services" value="Fixed Income" className="accent-secondary w-6 h-6 rounded border-champagne/60 focus:ring-2 focus:ring-secondary/40" checked={formValues.services.includes('Fixed Income')} onChange={handleInputChange} onBlur={handleBlur} /> Fixed Income
                    </label>
                  </div>
                  {touched.services && formErrors.services && <div className="text-red-500 text-base mt-1 transition-all duration-200">{formErrors.services}</div>}
                </div>
                {/* Comment/Message */}
                <div>
                  <label htmlFor="message" className="block font-crimson text-tertiary mb-1 text-xl">Comment or Message</label>
                  <textarea id="message" name="message" rows={4} className={`w-full rounded-md border ${touched.message && formErrors.message ? 'border-red-500' : 'border-champagne/60'} bg-white/40 px-4 py-3 font-crimson text-tertiary text-xl focus:outline-none focus:ring-2 focus:ring-secondary/40 resize-none`} value={formValues.message} onChange={handleInputChange} onBlur={handleBlur} />
                  {touched.message && formErrors.message && <div className="text-red-500 text-base mt-1 transition-all duration-200">{formErrors.message}</div>}
                </div>
                {/* Submit Button */}
                <div className="pt-2">
                  <Button
                    asChild
                    className="w-full bg-secondary text-secondary-foreground hover:bg-secondary/90 font-crimson font-semibold px-6 py-3 text-xl transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-secondary/60 focus:ring-offset-2"
                    disabled={isSubmitting || !isFormValid}
                  >
                    <motion.button
                      type="submit"
                      whileTap={{ scale: 0.97 }}
                      animate={isSubmitting ? { scale: [1, 1.05, 1], boxShadow: '0 0 0 4px #FFD70044' } : {}}
                      transition={{ duration: 0.5, repeat: isSubmitting ? Infinity : 0, repeatType: 'reverse' }}
                      style={{ width: '100%' }}
                    >
                      {isSubmitting ? (
                        <span className="flex items-center justify-center gap-2">
                          <span className="animate-spin rounded-full border-2 border-gray-300 border-t-2 border-t-secondary h-5 w-5 mr-2"></span>
                          Submitting…
                        </span>
                      ) : 'Submit'}
                    </motion.button>
                  </Button>
                </div>
              </form>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Confirmation Modal */}
      <ConfirmationModal
        isOpen={showConfirmation}
        onClose={() => {
          setShowConfirmation(false);
          setTimeout(() => {
            setFormSubmitted(false);
          }, 400);
        }}
        firstName={submittedFirstName}
      />
    </section>
  );
};

export default ContactSection;