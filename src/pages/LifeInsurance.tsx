import { useEffect, useState } from "react";
import { Badge } from "@/components/ui/badge";
import { CheckCircle, Shield, TrendingUp, PiggyBank, Star, Clock, ArrowRight, Phone } from "lucide-react";
import { motion } from 'framer-motion';
import ContactPopup from '@/components/ui/ContactPopup';
import { useContactPopup } from '@/hooks/useContactPopup';
import { useNavigate } from 'react-router-dom';
import CTASection from '@/components/CTASection';
import CircularCarousel from '@/components/ui/circular-carousel';

interface Product {
    id: string;
    title: string;
    description: string;
    icon: React.ElementType;
    coverage: string;
    premium: string;
    features: string[];
    rate: string;
    tenure: string;
    minAmount: string;
    image: string;
}

const LifeInsurance = () => {
    const [testimonialIndex, setTestimonialIndex] = useState(0);
    const { isOpen, openPopup, closePopup } = useContactPopup();
    const navigate = useNavigate();

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

    const products: Product[] = [
        {
            id: "term-insurance",
            title: "Term Insurance",
            description: "Pure protection, high coverage, low premium",
            icon: Shield,
            coverage: "₹1 Crore - ₹10 Crore",
            premium: "Starting ₹500/month",
            features: ["High coverage", "Low premium", "Flexible terms", "Easy claims"],
            rate: "₹500/month",
            tenure: "10-30 years",
            minAmount: "₹1 Crore",
            image: "/Life insurance/term-insurance.jpg"
        },
        {
            id: "whole-life-insurance",
            title: "Whole Life Insurance",
            description: "Lifelong coverage with cash value building",
            icon: TrendingUp,
            coverage: "₹50 Lakhs - ₹5 Crore",
            premium: "Starting ₹2,000/month",
            features: ["Lifelong coverage", "Cash value", "Dividend options", "Premium flexibility"],
            rate: "₹2,000/month",
            tenure: "Lifelong",
            minAmount: "₹50 Lakhs",
            image: "/Life insurance/life-insurance.jpg"
        },
        {
            id: "endowment-plans",
            title: "Endowment Plans",
            description: "Savings + insurance combination",
            icon: PiggyBank,
            coverage: "₹25 Lakhs - ₹2 Crore",
            premium: "Starting ₹1,500/month",
            features: ["Guaranteed returns", "Maturity benefit", "Death benefit", "Tax savings"],
            rate: "₹1,500/month",
            tenure: "10-25 years",
            minAmount: "₹25 Lakhs",
            image: "/Life insurance/endowment-plans.jpg"
        },
        {
            id: "ulip-plans",
            title: "ULIP Plans",
            description: "Market-linked returns with life cover",
            icon: TrendingUp,
            coverage: "₹10 Lakhs - ₹1 Crore",
            premium: "Starting ₹1,000/month",
            features: ["Market returns", "Life cover", "Fund switching", "Tax benefits"],
            rate: "₹1,000/month",
            tenure: "5-15 years",
            minAmount: "₹10 Lakhs",
            image: "/Life insurance/ULIP-plans.jpg"
        },
        {
            id: "money-back-plans",
            title: "Money-Back Plans",
            description: "Periodic payouts during the policy term + life cover",
            icon: Clock,
            coverage: "₹10 Lakhs - ₹1 Crore",
            premium: "Starting ₹1,200/month",
            features: ["Survival benefits", "Maturity returns", "Life cover", "Bonus payout"],
            rate: "₹1,200/month",
            tenure: "10-20 years",
            minAmount: "₹10 Lakhs",
            image: "/Life insurance/money-back-plans.jpg"
        },
        {
            id: "pension-plans",
            title: "Pension Plans",
            description: "Secure your retirement with regular annuity payouts",
            icon: PiggyBank,
            coverage: "₹5 Lakhs - ₹2 Crore",
            premium: "Starting ₹2,000/month",
            features: ["Retirement income", "Deferred/Immediate annuity", "Tax benefits", "Optional life cover"],
            rate: "₹2,000/month",
            tenure: "Retirement age",
            minAmount: "₹5 Lakhs",
            image: "/Life insurance/pension-plans.jpg"
        }
    ];

    const processSteps = [
        {
            id: 1,
            title: "Assessment",
            description: "We analyze your financial needs and family requirements",
            image: "/Commitment/Meetings.jpg"
        },
        {
            id: 2,
            title: "Recommendation",
            description: "Customized plan selection based on your profile",
            image: "/Commitment/Response-Time.png"
        },
        {
            id: 3,
            title: "Application",
            description: "Smooth application process with expert guidance",
            image: "/Commitment/Reporting.jpg"
        },
        {
            id: 4,
            title: "Activation",
            description: "Quick policy activation and documentation",
            image: "/Commitment/Technology-Access.jpg"
        }
    ];

    // Testimonial carousel
    useEffect(() => {
        const timer = setInterval(() => {
            setTestimonialIndex(prev => (prev + 1) % testimonials.length);
        }, 5000);
        return () => clearInterval(timer);
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

    const scrollToSection = (sectionId: string) => {
        const element = document.getElementById(sectionId);
        if (element) {
            element.scrollIntoView({ behavior: 'smooth' });
        }
    };

    return (
        <div className="min-h-screen bg-background">

            {/* Hero Section - Landing Page Style */}
            <section
                id="hero"
                className="relative w-full overflow-hidden min-h-screen flex items-center"
            >
                <div className="w-full">
                    <div className="grid grid-cols-1 lg:grid-cols-2 min-h-screen">
                        {/* Left Side - Content */}
                        <div className="relative bg-tertiary px-4 sm:px-6 lg:px-12 py-20 lg:py-0 flex items-center overflow-hidden">
                            {/* Decorative Partial Logo */}
                            <div className="absolute bottom-0 right-0 w-64 h-64 opacity-5 pointer-events-none">
                                <img 
                                    src="/logo-wbg.png" 
                                    alt="" 
                                    className="w-full h-full object-contain transform translate-x-1/3 translate-y-1/3 scale-150"
                                    style={{ filter: 'brightness(0) invert(1)' }}
                                />
                            </div>

                            <div className="relative z-10 max-w-2xl mx-auto lg:mx-0">
                                {/* Label */}
                <motion.div
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ duration: 0.6 }}
                                    className="mb-6"
                                >
                                    <span className="text-xs md:text-sm font-crimson text-white/70 uppercase tracking-wider">
                                        INSURANCE SOLUTIONS
                        </span>
                                </motion.div>

                                {/* Main Headline */}
                                <motion.h1 
                                    className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold font-playfair leading-tight text-white mb-6"
                                    initial={{ opacity: 0, y: 30 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ duration: 0.8, delay: 0.2 }}
                                >
                                    Comprehensive Life Insurance Solutions
                                </motion.h1>

                                {/* Description */}
                                <motion.p 
                                    className="text-base md:text-lg font-crimson text-white/90 leading-relaxed mb-8"
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ duration: 0.8, delay: 0.4 }}
                                >
                                    Protect your family's financial future with tailored life insurance plans. From term insurance to comprehensive coverage, find the perfect solution for your needs.
                                </motion.p>

                                {/* CTA Buttons */}
                                <motion.div 
                                    className="flex flex-col sm:flex-row gap-4"
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ duration: 0.8, delay: 0.6 }}
                                >
                                    <button 
                                        onClick={() => scrollToSection('products')}
                                        className="bg-secondary hover:bg-secondary/90 text-white px-8 py-4 rounded-full font-semibold font-crimson transition-all shadow-lg hover:shadow-xl flex items-center justify-center gap-2"
                                    >
                                        <span>View Plans</span>
                                        <ArrowRight className="w-4 h-4" />
                                    </button>
                                    <button 
                                        onClick={() => navigate('/contact')}
                                        className="border-2 border-white/30 hover:bg-white/10 text-white px-8 py-4 rounded-full font-semibold font-crimson transition-all backdrop-blur-sm flex items-center justify-center"
                                    >
                                        Get Expert Advice
                                    </button>
                                </motion.div>

                                {/* Trust Badge */}
                                <motion.div
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    transition={{ duration: 0.8, delay: 0.8 }}
                                    className="mt-8 flex items-center gap-2 text-white/60 text-sm font-crimson"
                                >
                                    <div className="flex -space-x-2">
                                        <div className="w-8 h-8 rounded-full bg-secondary border-2 border-tertiary"></div>
                                        <div className="w-8 h-8 rounded-full bg-white/20 border-2 border-tertiary"></div>
                                        <div className="w-8 h-8 rounded-full bg-white/10 border-2 border-tertiary"></div>
                                    </div>
                                    <span>Trusted by families since 1957</span>
                </motion.div>
                            </div>
                        </div>

                        {/* Right Side - Image */}
                        <div className="relative bg-gray-900 min-h-[400px] lg:min-h-screen overflow-hidden">
                            <img 
                                src="/Hero Section/life-insurance.png" 
                                alt="Life Insurance"
                                className="absolute inset-0 w-full h-full object-cover"
                            />
                            <div className="absolute bottom-0 right-0 w-96 h-96 bg-secondary opacity-20 rounded-full transform translate-x-1/2 translate-y-1/2 z-10"></div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Product Cards Section */}
            <section
                id="products"
                className="py-16 bg-gradient-to-br from-secondary/10 to-secondary/5"
            >
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <motion.div
                        initial={{ opacity: 0, y: 40 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, amount: 0.2 }}
                        transition={{ duration: 0.8 }}
                        className="text-center mb-16"
                    >
                        <p className="text-sm font-crimson text-tertiary/60 uppercase tracking-wider mb-4">
                            OUR PROTECTION PLANS
                        </p>
                        <h2 className="text-4xl md:text-5xl lg:text-6xl font-playfair font-bold text-tertiary mb-4">
                            Choose Your Protection Plan
                        </h2>
                        <p className="text-lg md:text-xl font-crimson text-tertiary/80 max-w-3xl mx-auto">
                            Tailored solutions for every life stage and financial goal
                        </p>
                    </motion.div>

                    {/* Protection Plans - Carousel */}
                    <div>
                        <CircularCarousel
                            products={products}
                            autoplay={true}
                            colors={{
                                title: "#1a5f7a",
                                description: "#6b7280",
                                content: "#4b5563",
                            }}
                            fontSizes={{
                                title: "28px",
                                description: "16px",
                                content: "16px",
                            }}
                            onInvestNow={() => navigate('/contact')}
                        />
                    </div>
                </div>
            </section>

            {/* Testimonials Section */}
            <section className="py-16 bg-[#FAFAFA]">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <motion.div
                        initial={{ opacity: 0, y: 40 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, amount: 0.2 }}
                        transition={{ duration: 0.8 }}
                        className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-secondary/10 to-secondary/5 p-8 md:p-12"
                    >
                        <div className="w-full overflow-hidden">
                            <div className="flex transition-transform duration-500" style={{
                                transform: `translateX(-${testimonialIndex * 100}%)`
                            }}>
                                {testimonials.map((testimonial, index) => (
                                    <div key={index} className="w-full flex-shrink-0 text-center px-4">
                                        <div className="flex justify-center mb-4">
                                            {[...Array(testimonial.rating)].map((_, i) => (
                                                <Star key={i} className="h-6 w-6 text-secondary fill-current" />
                                            ))}
                                        </div>
                                        <p className="text-xl md:text-2xl font-crimson text-tertiary mb-6 italic">
                                            "{testimonial.text}"
                                        </p>
                                        <div>
                                            <div className="font-playfair font-semibold text-tertiary text-lg">
                                                {testimonial.name}
                                            </div>
                                            <div className="text-base text-tertiary/60 font-crimson">
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
                                    className={`w-3 h-3 rounded-full transition-all ${index === testimonialIndex ? 'bg-secondary w-8' : 'bg-tertiary/30'
                                        }`}
                                    onClick={() => setTestimonialIndex(index)}
                                />
                            ))}
                        </div>
                    </motion.div>
                </div>
            </section>

            {/* Process Flow Section */}
            <section className="py-16 bg-gradient-to-br from-secondary/10 to-secondary/5">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <motion.div
                        initial={{ opacity: 0, y: 40 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, amount: 0.2 }}
                        transition={{ duration: 0.8 }}
                        className="text-center mb-16"
                    >
                        <p className="text-sm font-crimson text-tertiary/60 uppercase tracking-wider mb-4">
                            HOW IT WORKS
                        </p>
                        <h2 className="text-4xl md:text-5xl lg:text-6xl font-playfair font-bold text-tertiary mb-4">
                            Simple 4-Step Process
                        </h2>
                        <p className="text-lg md:text-xl font-crimson text-tertiary/80 max-w-3xl mx-auto">
                            Get your life insurance policy in just 4 easy steps
                        </p>
                    </motion.div>

                    {/* Process Cards Grid */}
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                        {processSteps.map((step, index) => (
                            <motion.div
                                key={step.id}
                                initial={{ opacity: 0, y: 40 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true, amount: 0.3 }}
                                transition={{ duration: 0.6, delay: index * 0.1 }}
                                className="flex flex-col items-center"
                            >
                                {/* Circular Image with Number Badge */}
                                <div className="relative mb-6">
                                    <div className="w-48 h-48 rounded-full overflow-hidden shadow-lg border-4 border-white">
                                        <img 
                                            src={step.image} 
                                            alt={step.title}
                                            className="w-full h-full object-cover"
                                        />
                                    </div>
                                    {/* Number Badge */}
                                    <div className="absolute -bottom-4 left-1/2 transform -translate-x-1/2">
                                        <div className="w-16 h-16 rounded-full bg-tertiary flex items-center justify-center shadow-xl border-4 border-white">
                                            <span className="text-2xl font-playfair font-bold text-white">
                                                {String(step.id).padStart(2, '0')}
                                            </span>
                                        </div>
                                    </div>
                                </div>

                                {/* Content */}
                                <div className="text-center mt-4 mb-6">
                                    <h3 className="text-xl md:text-2xl font-playfair font-bold text-tertiary mb-3">
                                        {step.title}
                                    </h3>
                                    <p className="text-base font-crimson text-tertiary/70 leading-relaxed px-2">
                                        {step.description}
                                    </p>
                                </div>

                                {/* Call Now Button */}
                                <button
                                    onClick={() => navigate('/contact')}
                                    className="bg-secondary hover:bg-secondary/90 text-white px-6 py-3 rounded-full font-semibold font-crimson transition-all shadow-lg hover:shadow-xl flex items-center gap-2"
                                >
                                    <Phone className="w-4 h-4" />
                                    <span>Schedule Now</span>
                                </button>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* CTA Section */}
            <CTASection />

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
