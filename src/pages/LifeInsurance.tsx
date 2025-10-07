import { useEffect, useState, useRef } from "react";
import Navigation from "@/components/Navigation";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { CheckCircle, Shield, TrendingUp, PiggyBank, Users, Star, Award, Clock, ArrowRight } from "lucide-react";
import { motion } from 'framer-motion';
import AOS from 'aos';
import 'aos/dist/aos.css';
import ContactPopup from '@/components/ui/ContactPopup';
import { useContactPopup } from '@/hooks/useContactPopup';

const LifeInsurance = () => {
    const [heroInView, setHeroInView] = useState(true);
    const [typewriterText, setTypewriterText] = useState("");
    const [subtitleVisible, setSubtitleVisible] = useState(false);
    const [counterValue, setCounterValue] = useState(0);
    const [currentStep, setCurrentStep] = useState(0);
    const [testimonialIndex, setTestimonialIndex] = useState(0);
    const { isOpen, openPopup, closePopup } = useContactPopup();

    const fullText = "Secure Your Family's Future with Life Insurance";
    const targetCounter = 100;

    const testimonials = [
        {
            name: "Priya Sharma",
            role: "Software Engineer",
            text: "Haria helped me choose the perfect term insurance plan. The claims process was incredibly smooth.",
            rating: 5
        },
        {
            name: "Rajesh Kumar",
            role: "Business Owner",
            text: "The whole life policy has been a great investment for my family's future security.",
            rating: 5
        },
        {
            name: "Anita Patel",
            role: "Doctor",
            text: "Excellent service and comprehensive coverage. Highly recommend for family protection.",
            rating: 5
        }
    ];

    const products = [
        {
            id: "term-insurance",
            title: "Term Insurance",
            description: "Pure protection, high coverage, low premium",
            icon: Shield,
            coverage: "₹1 Crore - ₹10 Crore",
            premium: "Starting ₹500/month",
            features: ["High coverage", "Low premium", "Flexible terms", "Easy claims"]
        },
        {
            id: "whole-life-insurance",
            title: "Whole Life Insurance",
            description: "Lifelong coverage with cash value building",
            icon: TrendingUp,
            coverage: "₹50 Lakhs - ₹5 Crore",
            premium: "Starting ₹2,000/month",
            features: ["Lifelong coverage", "Cash value", "Dividend options", "Premium flexibility"]
        },
        {
            id: "endowment-plans",
            title: "Endowment Plans",
            description: "Savings + insurance combination",
            icon: PiggyBank,
            coverage: "₹25 Lakhs - ₹2 Crore",
            premium: "Starting ₹1,500/month",
            features: ["Guaranteed returns", "Maturity benefit", "Death benefit", "Tax savings"]
        },
        {
            id: "ulip-plans",
            title: "ULIP Plans",
            description: "Market-linked returns with life cover",
            icon: TrendingUp,
            coverage: "₹10 Lakhs - ₹1 Crore",
            premium: "Starting ₹1,000/month",
            features: ["Market returns", "Life cover", "Fund switching", "Tax benefits"]
        },
        {
            id: "money-back-plans",
            title: "Money-Back Plans",
            description: "Periodic payouts during the policy term + life cover",
            icon: Clock,
            coverage: "₹10 Lakhs - ₹1 Crore",
            premium: "Starting ₹1,200/month",
            features: ["Survival benefits", "Maturity returns", "Life cover", "Bonus payout"]
        },
        {
            id: "pension-plans",
            title: "Pension Plans",
            description: "Secure your retirement with regular annuity payouts",
            icon: PiggyBank,
            coverage: "₹5 Lakhs - ₹2 Crore",
            premium: "Starting ₹2,000/month",
            features: ["Retirement income", "Deferred/Immediate annuity", "Tax benefits", "Optional life cover"]
        }
    ];

    const processSteps = [
        {
            title: "Assessment",
            description: "We analyze your financial needs and family requirements",
            icon: Users
        },
        {
            title: "Recommendation",
            description: "Customized plan selection based on your profile",
            icon: Star
        },
        {
            title: "Application",
            description: "Smooth application process with expert guidance",
            icon: CheckCircle
        },
        {
            title: "Activation",
            description: "Quick policy activation and documentation",
            icon: Award
        }
    ];

    useEffect(() => {
        const hero = document.getElementById("hero");
        if (!hero) return;
        const observer = new window.IntersectionObserver(
            ([entry]) => setHeroInView(entry.isIntersecting),
            { threshold: 0.3 }
        );
        observer.observe(hero);
        return () => observer.disconnect();
    }, []);

    // Typewriter effect
    useEffect(() => {
        let index = 0;
        const timer = setInterval(() => {
            if (index <= fullText.length) {
                setTypewriterText(fullText.slice(0, index));
                index++;
            } else {
                clearInterval(timer);
                setTimeout(() => setSubtitleVisible(true), 500);
            }
        }, 60);
        return () => clearInterval(timer);
    }, []);

    // Counter animation
    useEffect(() => {
        const timer = setInterval(() => {
            setCounterValue(prev => {
                if (prev < targetCounter) {
                    return prev + 10;
                }
                clearInterval(timer);
                return targetCounter;
            });
        }, 50);
        return () => clearInterval(timer);
    }, []);

    // Testimonial carousel
    useEffect(() => {
        const timer = setInterval(() => {
            setTestimonialIndex(prev => (prev + 1) % testimonials.length);
        }, 5000);
        return () => clearInterval(timer);
    }, []);

    // Process steps animation
    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry, index) => {
                    if (entry.isIntersecting) {
                        setTimeout(() => setCurrentStep(index), index * 200);
                    }
                });
            },
            { threshold: 0.5 }
        );

        const steps = document.querySelectorAll('.process-step');
        steps.forEach(step => observer.observe(step));
        return () => observer.disconnect();
    }, []);

    useEffect(() => {
        const applyHash = () => {
            const hash = window.location.hash.replace('#', '');
            const el = hash ? document.getElementById(hash) : null;
            if (el) {
                el.scrollIntoView({ behavior: 'smooth' });
            }
        };
        applyHash();
        window.addEventListener('hashchange', applyHash);
        return () => window.removeEventListener('hashchange', applyHash);
    }, []);

    // Initialize AOS
    useEffect(() => {
        AOS.init({ duration: 600, once: true });
    }, []);

    return (
        <div className="min-h-screen bg-background">
            <Navigation isTransparent={heroInView} />

            {/* Hero Section */}
            <section
                id="hero"
                className="relative min-h-[60vh] md:min-h-screen flex items-center justify-center overflow-hidden px-4 md:px-8 pt-20 md:pt-0"
                style={{ transition: 'opacity 0.8s cubic-bezier(0.4,0,0.2,1), transform 0.8s cubic-bezier(0.4,0,0.2,1)' }}
            >
                {/* Background Image */}
                <div
                    className="absolute inset-0 bg-cover bg-center"
                    style={{ backgroundImage: "url('/hero-life-insurance.webp')" }}
                />
                <div className="absolute inset-0 bg-black/40" />

                <motion.div
                    initial={{ opacity: 0, y: 40 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, amount: 0.2 }}
                    transition={{ duration: 0.8 }}
                    className="relative z-10 text-center text-white w-full max-w-3xl mx-auto py-12 md:py-24"
                >
                    <h1 className="text-3xl sm:text-5xl md:text-7xl font-playfair font-bold mb-6 overflow-hidden">
                        <span className="inline-block animate-typewriter">
                            {typewriterText}
                            <span className="animate-pulse">|</span>
                        </span>
                    </h1>

                    <p className={`text-xl sm:text-2xl md:text-3xl font-crimson mb-8 text-white/90 transition-all duration-1000 ${subtitleVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
                        }`}>
                        Comprehensive protection plans tailored to your life stage
                    </p>

                    <Button
                        size="lg"
                        className="bg-secondary text-secondary-foreground hover:bg-secondary/90 font-crimson font-semibold px-8 py-4 text-xl transition-all duration-300 hover:scale-105 hover:shadow-lg hover:-translate-y-1"
                        onClick={openPopup}
                    >
                        Get Free Consultation
                        <ArrowRight className="ml-2 h-5 w-5" />
                    </Button>
                </motion.div>
            </section>

            {/* Product Cards Section */}
            <section
                id="products"
                className="py-20 px-4 bg-gradient-premium"
                style={{ transition: 'opacity 0.8s cubic-bezier(0.4,0,0.2,1), transform 0.8s cubic-bezier(0.4,0,0.2,1)' }}
            >
                <div className="max-w-7xl mx-auto">
                    <motion.div
                        initial={{ opacity: 0, y: 40 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, amount: 0.2 }}
                        transition={{ duration: 0.8 }}
                        className="text-center mb-16"
                    >
                        <motion.h2
                            initial={{ opacity: 0, y: 40 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6 }}
                            viewport={{ once: true, amount: 0.3 }}
                            className="text-4xl md:text-5xl font-playfair font-bold text-foreground mb-4"
                        >
                            Choose Your Protection Plan
                        </motion.h2>
                        <motion.p
                            initial={{ opacity: 0, y: 40 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6, delay: 0.1 }}
                            viewport={{ once: true, amount: 0.3 }}
                            className="text-2xl font-crimson text-muted-foreground"
                        >
                            Tailored solutions for every life stage and financial goal
                        </motion.p>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, y: 40 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, amount: 0.2 }}
                        transition={{ duration: 0.8, delay: 0.1 }}
                        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10"
                    >
                        {products.map((product, index) => (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, y: 40 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true, amount: 0.3 }}
                                transition={{ duration: 0.6, delay: index * 0.12 }}
                                className="group premium-card cursor-pointer border-2 border-transparent overflow-hidden transition-all duration-300 hover:shadow-lg hover:shadow-secondary/30 hover:scale-105 hover:ring-2 hover:ring-secondary/30"
                                style={{ animationDelay: `${index * 0.1}s` }}
                            >
                                <div className="absolute inset-0 bg-gradient-to-br from-secondary/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                                <CardHeader id={product.id}
                                    className="relative z-10"
                                >
                                    <div className="flex items-center justify-between mb-4">
                                        <product.icon className="h-12 w-12 text-secondary group-hover:scale-110 transition-transform duration-300" />
                                        <Badge className="bg-secondary text-secondary-foreground border-secondary/30">
                                            Popular
                                        </Badge>
                                    </div>
                                    <CardTitle className="text-2xl font-playfair text-foreground group-hover:text-secondary transition-colors duration-300">
                                        {product.title}
                                    </CardTitle>
                                </CardHeader>

                                <CardContent className="relative z-10">
                                    <p className="text-muted-foreground mb-6 font-crimson text-lg">
                                        {product.description}
                                    </p>

                                    <div className="space-y-4">
                                        <div className="flex justify-between items-center">
                                            <span className="text-lg text-muted-foreground">Coverage</span>
                                            <span className="font-semibold text-foreground text-lg">{product.coverage}</span>
                                        </div>
                                        <div className="flex justify-between items-center">
                                            <span className="text-lg text-muted-foreground">Premium</span>
                                            <span className="font-semibold text-secondary text-lg">{product.premium}</span>
                                        </div>
                                    </div>

                                    <div className="mt-6 space-y-2">
                                        {product.features.map((feature, idx) => (
                                            <div key={idx} className="flex items-center text-lg">
                                                <CheckCircle className="h-5 w-5 text-secondary mr-2 flex-shrink-0" />
                                                <span className="text-muted-foreground">{feature}</span>
                                            </div>
                                        ))}
                                    </div>

                                    <Button className="w-full mt-6 bg-secondary hover:bg-secondary/90 text-secondary-foreground font-crimson font-semibold text-lg" onClick={openPopup}>
                                        Learn More
                                        <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
                                    </Button>
                                </CardContent>
                            </motion.div>
                        ))}
                    </motion.div>
                </div>
            </section>

            {/* Trust Elements Section */}
            <section
                className="py-20 px-4 bg-background"
                style={{ transition: 'opacity 0.8s cubic-bezier(0.4,0,0.2,1), transform 0.8s cubic-bezier(0.4,0,0.2,1)' }}
            >
                <div className="max-w-7xl mx-auto">

                    {/* Testimonials Carousel */}
                    <motion.div
                        initial={{ opacity: 0, y: 40 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, amount: 0.2 }}
                        transition={{ duration: 0.8 }}
                        className="relative overflow-hidden rounded-2xl bg-gradient-premium p-4 md:p-8"
                    >
                        <div className="w-full overflow-hidden">
                            <div className="flex transition-transform duration-500 ease-in-out" style={{
                                transform: `translateX(-${testimonialIndex * 100}%)`
                            }}>
                                {testimonials.map((testimonial, index) => (
                                    <div key={index} className="w-full flex-shrink-0 text-center px-4">
                                        <div className="flex justify-center mb-4">
                                            {[...Array(testimonial.rating)].map((_, i) => (
                                                <Star key={i} className="h-6 w-6 text-secondary fill-current" />
                                            ))}
                                        </div>
                                        <p className="text-xl md:text-2xl font-crimson text-foreground mb-6 italic">
                                            "{testimonial.text}"
                                        </p>
                                        <div>
                                            <div className="font-playfair font-semibold text-foreground text-lg">
                                                {testimonial.name}
                                            </div>
                                            <div className="text-lg text-muted-foreground">
                                                {testimonial.role}
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Carousel Indicators */}
                        <div className="flex justify-center mt-6 space-x-2">
                            {testimonials.map((_, index) => (
                                <button
                                    key={index}
                                    className={`w-3 h-3 rounded-full transition-all duration-300 ${index === testimonialIndex ? 'bg-secondary' : 'bg-muted'
                                        }`}
                                    onClick={() => setTestimonialIndex(index)}
                                />
                            ))}
                        </div>
                    </motion.div>
                </div>
            </section>

            {/* Process Flow Section */}
            <section
                className="py-20 px-4 bg-gradient-to-br from-secondary to-tertiary"
                style={{ transition: 'opacity 0.8s cubic-bezier(0.4,0,0.2,1), transform 0.8s cubic-bezier(0.4,0,0.2,1)' }}
            >
                <div className="max-w-6xl mx-auto">
                    <motion.div
                        initial={{ opacity: 0, y: 40 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, amount: 0.2 }}
                        transition={{ duration: 0.8 }}
                        className="text-center mb-16"
                    >
                        <h2 className="text-4xl md:text-5xl font-playfair font-bold text-white mb-4">
                            Simple 4-Step Process
                        </h2>
                        <p className="text-2xl font-crimson text-white/80">
                            Get your life insurance policy in just 4 easy steps
                        </p>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, y: 40 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, amount: 0.2 }}
                        transition={{ duration: 0.8, delay: 0.1 }}
                        className="relative grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8"
                    >
                        {processSteps.map((step, index) => (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, scale: 0.95 }}
                                whileInView={{ opacity: 1, scale: 1 }}
                                viewport={{ once: true, amount: 0.2 }}
                                transition={{ duration: 0.6, delay: index * 0.15 }}
                                className="process-step text-center relative opacity-100 translate-y-0 transition-all duration-700"
                                style={{ transitionDelay: `${index * 100}ms` }}
                            >
                                <div className="relative z-10">
                                    <div className="inline-flex items-center justify-center w-16 h-16 bg-white rounded-full mb-6 mx-auto shadow-lg">
                                        <step.icon className="h-8 w-8 text-secondary" />
                                    </div>
                                    <h3 className="text-xl font-playfair font-bold text-white mb-3">
                                        {step.title}
                                    </h3>
                                    <p className="text-white/80 font-crimson text-lg">
                                        {step.description}
                                    </p>
                                </div>

                                {/* Step Number */}
                                <div className="absolute -top-2 -right-2 w-8 h-8 bg-secondary rounded-full flex items-center justify-center text-white font-bold text-sm">
                                    {index + 1}
                                </div>
                            </motion.div>
                        ))}
                    </motion.div>
                </div>
            </section>

            {/* CTA Section */}
            <section
                className="py-20 px-4 bg-background"
                style={{ transition: 'opacity 0.8s cubic-bezier(0.4,0,0.2,1), transform 0.8s cubic-bezier(0.4,0,0.2,1)' }}
            >
                <div className="max-w-4xl mx-auto text-center">
                    <motion.div
                        initial={{ opacity: 0, y: 40 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, amount: 0.2 }}
                        transition={{ duration: 0.8 }}
                    >
                        <h2 className="text-4xl md:text-5xl font-playfair font-bold text-foreground mb-6">
                            Ready to Secure Your Family's Future?
                        </h2>
                        <p className="text-2xl font-crimson text-muted-foreground mb-8">
                            Get a free consultation and personalized quote today
                        </p>
                        <div className="flex flex-col sm:flex-row gap-4 justify-center">
                            <Button size="lg" className="bg-secondary hover:bg-secondary/90 text-secondary-foreground font-crimson font-semibold px-8 py-4 text-xl" onClick={openPopup}>
                                Get Free Quote
                            </Button>
                            <Button size="lg" variant="outline" className="border-secondary text-secondary hover:bg-secondary hover:text-secondary-foreground font-crimson font-semibold px-8 py-4 text-xl" onClick={openPopup}>
                                Schedule Consultation
                            </Button>
                        </div>
                    </motion.div>
                </div>
            </section>

            {/* Contact Popup */}
            <ContactPopup
                isOpen={isOpen}
                onClose={closePopup}
                title="Get Free Life Insurance Consultation"
                description="Secure your family's future with expert guidance on life insurance plans."
            />
        </div>
    );
};

export default LifeInsurance; 