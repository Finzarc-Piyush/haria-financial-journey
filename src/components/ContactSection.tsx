import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Phone, Mail, MapPin, Clock, Calendar } from "lucide-react";
import AOS from 'aos';
import 'aos/dist/aos.css';
import { useEffect, useState, useRef } from 'react';
import { motion } from 'framer-motion';
import rightTick from '@/assets/right-tick.png';
import emailjs from '@emailjs/browser';

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
      if (!value || (typeof value === 'string' && value.trim().length === 0)) return 'Required.';
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
  const [startTick, setStartTick] = useState(false);
  const [spinTick, setSpinTick] = useState(false);
  const [showFinalTick, setShowFinalTick] = useState(false);
  const [drawDone, setDrawDone] = useState(false);

  // Initialize EmailJS
  useEffect(() => {
    if (EMAILJS_PUBLIC_KEY) {
      emailjs.init(EMAILJS_PUBLIC_KEY);
    }
  }, []);

  // FIXED: Reset animation state function
  const resetAnimationState = () => {
    setStartTick(false);
    setSpinTick(false);
    setShowFinalTick(false);
    setDrawDone(false);
  };
  // FIXED: Updated openConfirmation function
  const openConfirmation = () => {
    resetAnimationState();
    setShowConfirmation(true);
    // Start the animation sequence after a small delay to ensure state is reset
    setTimeout(() => {
      setStartTick(true);
    }, 100);
  };

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
    openConfirmation();
  };

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
                    +91 77386 86126
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
                    <label htmlFor="firstName" className="block font-crimson text-tertiary mb-1">First Name <span className="text-red-500">*</span></label>
                    <input id="firstName" name="firstName" type="text" required className={`w-full rounded-md border ${touched.firstName && formErrors.firstName ? 'border-red-500' : 'border-champagne/60'} bg-cream/40 px-4 py-2 font-crimson text-tertiary focus:outline-none focus:ring-2 focus:ring-secondary/40`} autoComplete="given-name" value={formValues.firstName} onChange={handleInputChange} onBlur={handleBlur} />
                    {touched.firstName && formErrors.firstName && <div className="text-red-500 text-xs mt-1 transition-all duration-200">{formErrors.firstName}</div>}
                  </div>
                  <div className="flex-1">
                    <label htmlFor="lastName" className="block font-crimson text-tertiary mb-1">Last Name <span className="text-red-500">*</span></label>
                    <input id="lastName" name="lastName" type="text" required className={`w-full rounded-md border ${touched.lastName && formErrors.lastName ? 'border-red-500' : 'border-champagne/60'} bg-cream/40 px-4 py-2 font-crimson text-tertiary focus:outline-none focus:ring-2 focus:ring-secondary/40`} autoComplete="family-name" value={formValues.lastName} onChange={handleInputChange} onBlur={handleBlur} />
                    {touched.lastName && formErrors.lastName && <div className="text-red-500 text-xs mt-1 transition-all duration-200">{formErrors.lastName}</div>}
                  </div>
                </div>
                {/* Email */}
                <div>
                  <label htmlFor="email" className="block font-crimson text-tertiary mb-1">Email <span className="text-red-500">*</span></label>
                  <input id="email" name="email" type="email" required className={`w-full rounded-md border ${touched.email && formErrors.email ? 'border-red-500' : 'border-champagne/60'} bg-cream/40 px-4 py-2 font-crimson text-tertiary focus:outline-none focus:ring-2 focus:ring-secondary/40`} autoComplete="email" value={formValues.email} onChange={handleInputChange} onBlur={handleBlur} />
                  {touched.email && formErrors.email && <div className="text-red-500 text-xs mt-1 transition-all duration-200">{formErrors.email}</div>}
                </div>
                {/* Services checkboxes */}
                <div>
                  <label className="block font-crimson text-tertiary mb-2">Which services are you looking for? <span className="text-red-500">*</span></label>
                  <div className="flex flex-wrap gap-6">
                    <label className="inline-flex items-center gap-2 font-crimson text-tertiary">
                      <input type="checkbox" name="services" value="Insurance" className="accent-secondary w-5 h-5 rounded border-champagne/60 focus:ring-2 focus:ring-secondary/40" checked={formValues.services.includes('Insurance')} onChange={handleInputChange} onBlur={handleBlur} /> Insurance
                    </label>
                    <label className="inline-flex items-center gap-2 font-crimson text-tertiary">
                      <input type="checkbox" name="services" value="Mutual Funds" className="accent-secondary w-5 h-5 rounded border-champagne/60 focus:ring-2 focus:ring-secondary/40" checked={formValues.services.includes('Mutual Funds')} onChange={handleInputChange} onBlur={handleBlur} /> Mutual Funds
                    </label>
                    <label className="inline-flex items-center gap-2 font-crimson text-tertiary">
                      <input type="checkbox" name="services" value="Equity Broking" className="accent-secondary w-5 h-5 rounded border-champagne/60 focus:ring-2 focus:ring-secondary/40" checked={formValues.services.includes('Equity Broking')} onChange={handleInputChange} onBlur={handleBlur} /> Equity Broking
                    </label>
                  </div>
                  {touched.services && formErrors.services && <div className="text-red-500 text-xs mt-1 transition-all duration-200">{formErrors.services}</div>}
                </div>
                {/* Comment/Message */}
                <div>
                  <label htmlFor="message" className="block font-crimson text-tertiary mb-1">Comment or Message <span className="text-red-500">*</span></label>
                  <textarea id="message" name="message" required rows={4} className={`w-full rounded-md border ${touched.message && formErrors.message ? 'border-red-500' : 'border-champagne/60'} bg-cream/40 px-4 py-2 font-crimson text-tertiary focus:outline-none focus:ring-2 focus:ring-secondary/40 resize-none`} value={formValues.message} onChange={handleInputChange} onBlur={handleBlur} />
                  {touched.message && formErrors.message && <div className="text-red-500 text-xs mt-1 transition-all duration-200">{formErrors.message}</div>}
                </div>
                {/* Submit Button */}
                <div className="pt-2">
                  <Button
                    asChild
                    className="w-full bg-secondary text-secondary-foreground hover:bg-secondary/90 font-crimson font-semibold px-6 py-3 text-lg transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-secondary/60 focus:ring-offset-2"
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

      {/* Confirmation Dialog Overlay - moved outside the grid for true viewport centering */}

      {showConfirmation && (
        <motion.div
          key="confirmation-modal"
          initial={{ opacity: 0, scale: 0.95, y: 40 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 40 }}
          transition={{ duration: 0.5, ease: [0.42, 0, 0.58, 1] }}
          className="fixed inset-0 z-50 flex items-center justify-center"
          style={{ pointerEvents: 'auto' }}
        // REMOVED: onAnimationComplete that was causing issues
        >
          {/* Backdrop */}
          <div className="fixed inset-0 bg-black/40 backdrop-blur-sm z-40" aria-hidden="true" />
          {/* Modal Content */}
          <div className="relative z-50 mx-4 w-full max-w-lg">
            <div className="bg-cream/90 rounded-2xl shadow-xl p-8 flex flex-col items-center text-center border border-gold/30">
              {/* FIXED: Cinematic checkmark animation */}
              <div className="relative mb-4 flex items-center justify-center" style={{ width: 56, height: 56 }}>
                <>
                  {/* SVG checkmark: draw, then horizontal flip, then fade out */}
                  <motion.div
                    className="absolute left-0 top-0 w-14 h-14 flex items-center justify-center"
                    style={{ pointerEvents: 'none', zIndex: 3, perspective: 400 }}
                    animate={spinTick && !showFinalTick ? { rotateY: 360 } : { rotateY: 0 }}
                    transition={{ duration: 0.8, ease: 'easeInOut' }}
                    onAnimationComplete={() => {
                      if (spinTick) {
                        setSpinTick(false);
                        setTimeout(() => setShowFinalTick(true), 100);
                      }
                    }}
                  >
                    <motion.svg
                      width="56" height="56" viewBox="0 0 56 56" fill="none" xmlns="http://www.w3.org/2000/svg"
                      style={{ position: 'relative', zIndex: 2 }}
                      initial="hidden"
                      animate={startTick && !showFinalTick ? "visible" : "hidden"}
                      variants={{
                        hidden: { opacity: 0 },
                        visible: { opacity: 1 }
                      }}
                    >
                      <motion.path
                        d="M16 29L25 38L40 20"
                        stroke="#43A047"
                        strokeWidth="7"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        fill="none"
                        variants={{
                          hidden: { pathLength: 0 },
                          visible: { pathLength: 1, transition: { duration: 0.7, ease: 'easeInOut' } }
                        }}
                        onAnimationComplete={() => {
                          setDrawDone(true);
                          setTimeout(() => {
                            setSpinTick(true);
                          }, 100);
                        }}
                      />
                    </motion.svg>
                  </motion.div>
                  {/* Fade in the static image after spin */}
                  <motion.img
                    src={rightTick}
                    alt="Success"
                    className="w-14 h-14 absolute left-0 top-0"
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={showFinalTick ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.9 }}
                    transition={{ duration: 0.5, ease: 'easeOut' }}
                    style={{ zIndex: 4 }}
                  />
                </>
              </div>

              <h2 className="font-playfair text-2xl md:text-3xl font-bold text-charcoal mb-2">
                🎉 Thank You, {submittedFirstName || 'Friend'}!
              </h2>
              <p className="font-crimson text-lg text-charcoal/90 mb-2">
                Your request has been received. We'll be in touch soon.
              </p>
              <p className="font-crimson text-base text-charcoal/70 mb-4">
                We're excited to help you on your financial journey. Keep an eye on your inbox!
              </p>
              <Button
                asChild
                className="mt-2 px-6 py-2 rounded-lg bg-secondary text-secondary-foreground hover:bg-secondary/90 font-crimson font-semibold shadow-gold/20 transition-all w-full text-lg focus:outline-none focus:ring-2 focus:ring-secondary/60 focus:ring-offset-2"
              >
                <button
                  onClick={() => {
                    setShowConfirmation(false);
                    setTimeout(() => {
                      setFormSubmitted(false);
                      resetAnimationState(); // Reset for next time
                    }, 400);
                  }}
                  style={{ width: '100%' }}
                  type="button"
                >
                  Back to Home
                </button>
              </Button>
            </div>
          </div>
        </motion.div>
      )}
    </section>
  );
};

export default ContactSection;