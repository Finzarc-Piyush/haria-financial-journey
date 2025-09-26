import React, { useState, useRef, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { X } from "lucide-react";
import { motion, AnimatePresence } from 'framer-motion';
import emailjs from '@emailjs/browser';

// EmailJS configuration 
const EMAILJS_SERVICE_ID = import.meta.env.VITE_EMAILJS_SERVICE_ID;
const EMAILJS_TEMPLATE_ID = import.meta.env.VITE_EMAILJS_TEMPLATE_ID;
const EMAILJS_PUBLIC_KEY = import.meta.env.VITE_EMAILJS_PUBLIC_KEY;

// GOOGLE_SCRIPT_URL 
const GOOGLE_SCRIPT_URL = import.meta.env.VITE_GOOGLE_SCRIPT_URL;

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
            // Message field is optional - no validation required
            return '';
        case 'services':
            if (!Array.isArray(value) || value.length === 0) return 'Select at least one.';
            return '';
        default:
            return '';
    }
}

interface ContactPopupProps {
    isOpen: boolean;
    onClose: () => void;
    title?: string;
    description?: string;
}

const ContactPopup: React.FC<ContactPopupProps> = ({
    isOpen,
    onClose,
    title = "Get Free Consultation",
    description = "We're here to help you take the next confident step in your financial journey."
}) => {
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

    // Initialize EmailJS
    useEffect(() => {
        if (EMAILJS_PUBLIC_KEY) {
            emailjs.init(EMAILJS_PUBLIC_KEY);
        }
    }, []);

    // Function to send confirmation email
    const sendConfirmationEmail = async (formData: any) => {
        try {
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
        setIsFormValid(
            Object.values(errors).every((err) => !err) &&
            Object.values(touched).every((t) => t)
        );
    }, [formValues, touched]);

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
        setTouched({ firstName: true, lastName: true, email: true, message: true, services: true });
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

        await sendConfirmationEmail(data);

        setFormValues({ firstName: '', lastName: '', email: '', message: '', services: [] });
        setTouched({ firstName: false, lastName: false, email: false, message: false, services: false });
        setIsSubmitting(false);
        onClose();
    };

    // Close on escape key
    useEffect(() => {
        const handleEscape = (e: KeyboardEvent) => {
            if (e.key === 'Escape') {
                onClose();
            }
        };

        if (isOpen) {
            document.addEventListener('keydown', handleEscape);
            document.body.style.overflow = 'hidden';
        }

        return () => {
            document.removeEventListener('keydown', handleEscape);
            document.body.style.overflow = 'unset';
        };
    }, [isOpen, onClose]);

    return (
        <AnimatePresence>
            {isOpen && (
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="fixed inset-0 z-50 flex items-center justify-center p-4"
                    onClick={(e) => {
                        if (e.target === e.currentTarget) {
                            onClose();
                        }
                    }}
                >
                    {/* Backdrop */}
                    <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" />

                    {/* Modal Content */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95, y: 20 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.95, y: 20 }}
                        transition={{ duration: 0.3, ease: [0.42, 0, 0.58, 1] }}
                        className="relative w-full max-w-4xl max-h-[90vh] overflow-y-auto"
                    >
                        <Card className="premium-card shadow-2xl border border-champagne/60 rounded-2xl">
                            {/* Header */}
                            <CardHeader className="relative">
                                <Button
                                    variant="ghost"
                                    size="sm"
                                    className="absolute right-4 top-4 h-8 w-8 p-0 hover:bg-muted rounded-lg"
                                    onClick={onClose}
                                >
                                    <X className="h-4 w-4" />
                                </Button>
                                <CardTitle className="font-playfair text-3xl md:text-4xl font-bold text-tertiary mb-2 pr-8">
                                    {title}
                                </CardTitle>
                                <p className="font-crimson text-xl md:text-2xl text-tertiary/80">
                                    {description}
                                </p>
                            </CardHeader>

                            <CardContent className="p-6">
                                {/* Contact Form */}
                                <div className="max-w-md mx-auto">
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
                                                <input id="firstName" name="firstName" type="text" required className={`w-full rounded-lg border ${touched.firstName && formErrors.firstName ? 'border-red-500' : 'border-champagne/60'} bg-cream/40 px-4 py-3 font-crimson text-tertiary text-xl focus:outline-none focus:ring-2 focus:ring-secondary/40`} autoComplete="given-name" value={formValues.firstName} onChange={handleInputChange} onBlur={handleBlur} />
                                                {touched.firstName && formErrors.firstName && <div className="text-red-500 text-base mt-1 transition-all duration-200">{formErrors.firstName}</div>}
                                            </div>
                                            <div className="flex-1">
                                                <label htmlFor="lastName" className="block font-crimson text-tertiary mb-1 text-xl">Last Name <span className="text-red-500">*</span></label>
                                                <input id="lastName" name="lastName" type="text" required className={`w-full rounded-lg border ${touched.lastName && formErrors.lastName ? 'border-red-500' : 'border-champagne/60'} bg-cream/40 px-4 py-3 font-crimson text-tertiary text-xl focus:outline-none focus:ring-2 focus:ring-secondary/40`} autoComplete="family-name" value={formValues.lastName} onChange={handleInputChange} onBlur={handleBlur} />
                                                {touched.lastName && formErrors.lastName && <div className="text-red-500 text-base mt-1 transition-all duration-200">{formErrors.lastName}</div>}
                                            </div>
                                        </div>

                                        {/* Email */}
                                        <div>
                                            <label htmlFor="email" className="block font-crimson text-tertiary mb-1 text-xl">Email <span className="text-red-500">*</span></label>
                                            <input id="email" name="email" type="email" required className={`w-full rounded-lg border ${touched.email && formErrors.email ? 'border-red-500' : 'border-champagne/60'} bg-cream/40 px-4 py-3 font-crimson text-tertiary text-xl focus:outline-none focus:ring-2 focus:ring-secondary/40`} autoComplete="email" value={formValues.email} onChange={handleInputChange} onBlur={handleBlur} />
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
                                            <textarea id="message" name="message" rows={4} className={`w-full rounded-lg border ${touched.message && formErrors.message ? 'border-red-500' : 'border-champagne/60'} bg-cream/40 px-4 py-3 font-crimson text-tertiary text-xl focus:outline-none focus:ring-2 focus:ring-secondary/40 resize-none`} value={formValues.message} onChange={handleInputChange} onBlur={handleBlur} />
                                            {touched.message && formErrors.message && <div className="text-red-500 text-base mt-1 transition-all duration-200">{formErrors.message}</div>}
                                        </div>

                                        {/* Submit Button */}
                                        <div className="pt-2">
                                            <Button
                                                type="submit"
                                                className="w-full bg-secondary text-secondary-foreground hover:bg-secondary/90 font-crimson font-semibold px-6 py-3 text-xl transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-secondary/60 focus:ring-offset-2 rounded-lg"
                                                disabled={isSubmitting || !isFormValid}
                                            >
                                                {isSubmitting ? (
                                                    <span className="flex items-center justify-center gap-2">
                                                        <span className="animate-spin rounded-full border-2 border-gray-300 border-t-2 border-t-secondary h-5 w-5 mr-2"></span>
                                                        Submitting…
                                                    </span>
                                                ) : 'Submit'}
                                            </Button>
                                        </div>
                                    </form>
                                </div>
                            </CardContent>
                        </Card>
                    </motion.div>
                </motion.div>
            )}
        </AnimatePresence >
    );
};

export default ContactPopup;
