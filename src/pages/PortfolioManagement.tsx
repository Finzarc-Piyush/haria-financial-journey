import { useEffect } from "react";
import { motion } from "framer-motion";
import { BarChart3, Award, PieChart, ArrowRight, CheckCircle } from "lucide-react";
import ContactPopup from '@/components/ui/ContactPopup';
import { useContactPopup } from '@/hooks/useContactPopup';
import { useNavigate } from 'react-router-dom';
import CTASection from '@/components/CTASection';
import CircularCarousel from '@/components/ui/circular-carousel';

const pmsTypes = [
    {
        id: "discretionary",
        title: "Discretionary PMS",
        icon: BarChart3,
        description: "Portfolio manager takes investment decisions on your behalf, offering convenience and expertise.",
        rate: "12-18% annually",
        tenure: "3-5 years",
        minAmount: "₹50 Lakhs",
        features: ["Full investment control", "Professional management", "Regular rebalancing", "Tax optimization"],
        image: "/Portfolio Management/Discretionary-PMS.jpg"
    },
    {
        id: "non-discretionary",
        title: "Non-Discretionary PMS",
        icon: PieChart,
        description: "You make the final investment decisions, with research and recommendations from the portfolio manager.",
        rate: "10-16% annually",
        tenure: "3-5 years",
        minAmount: "₹50 Lakhs",
        features: ["Investment recommendations", "Research support", "Portfolio tracking", "Advisory services"],
        image: "/Portfolio Management/Non-Discretionary-PMS.jpg"
    },
    {
        id: "advisory",
        title: "Advisory PMS",
        icon: Award,
        description: "You receive tailored advice and strategies, but execute transactions yourself.",
        rate: "8-14% annually",
        tenure: "2-4 years",
        minAmount: "₹25 Lakhs",
        features: ["Customized strategies", "Expert guidance", "Self-execution", "Lower fees"],
        image: "/Portfolio Management/Advisory-PMS.png"
    },
];

const PortfolioManagement = () => {
    const { isOpen, openPopup, closePopup } = useContactPopup();
    const navigate = useNavigate();

    // Handle hash-based scrolling
    useEffect(() => {
        const scrollToHash = () => {
            const hash = window.location.hash.replace('#', '');
            if (!hash) return;
            const el = document.getElementById(hash);
            if (el) {
                setTimeout(() => {
                    el.scrollIntoView({ behavior: 'smooth', block: 'start' });
                }, 100);
            }
        };
        scrollToHash();
        window.addEventListener('hashchange', scrollToHash);
        return () => window.removeEventListener('hashchange', scrollToHash);
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
                                    loading="lazy"
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
                                        PORTFOLIO MANAGEMENT SERVICES
                                    </span>
                                </motion.div>

                                {/* Main Headline */}
                    <motion.h1
                                    className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold font-playfair leading-tight text-white mb-6"
                                    initial={{ opacity: 0, y: 30 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ duration: 0.8, delay: 0.2 }}
                                >
                                    Professional{' '}
                                    <span className="relative inline-block">
                                        <span className="relative z-10">Portfolio Management</span>
                                        <span className="absolute bottom-0 left-0 w-full h-3 bg-secondary/30 -z-0"></span>
                                    </span>
                    </motion.h1>

                                {/* Description */}
                    <motion.p
                                    className="text-base md:text-lg font-crimson text-white/90 leading-relaxed mb-8"
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ duration: 0.8, delay: 0.4 }}
                                >
                                    Customized wealth management solutions with expert portfolio managers. Get personalized investment strategies tailored to your financial goals.
                    </motion.p>

                                {/* CTA Buttons */}
                                <motion.div 
                                    className="flex flex-col sm:flex-row gap-4"
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ duration: 0.8, delay: 0.6 }}
                                >
                                    <button 
                                        onClick={() => navigate('/contact')}
                                        className="bg-secondary hover:bg-secondary/90 text-white px-8 py-4 rounded-full font-semibold font-crimson transition-all shadow-lg hover:shadow-xl flex items-center justify-center gap-2"
                                    >
                                        <span>Get Started</span>
                                        <ArrowRight className="w-4 h-4" />
                                    </button>
                                    <button 
                                        onClick={() => scrollToSection('pms-types')}
                                        className="border-2 border-white/30 hover:bg-white/10 text-white px-8 py-4 rounded-full font-semibold font-crimson transition-all backdrop-blur-sm flex items-center justify-center"
                                    >
                                        Explore Services
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
                                src="/Hero Section/portfolio-management.png" 
                                alt="Portfolio Management"
                                className="absolute inset-0 w-full h-full object-cover"
                                loading="lazy"
                            />
                            <div className="absolute bottom-0 right-0 w-96 h-96 bg-secondary opacity-20 rounded-full transform translate-x-1/2 translate-y-1/2 z-10"></div>
                        </div>
                    </div>
                </div>
            </section>

            {/* PMS Types Section */}
            <section id="pms-types" className="py-16 bg-gradient-to-br from-secondary/10 to-secondary/5">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <motion.div
                        initial={{ opacity: 0, y: 40 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, amount: 0.2 }}
                        transition={{ duration: 0.8 }}
                        className="text-center mb-16"
                    >
                        <p className="text-sm font-crimson text-tertiary/60 uppercase tracking-wider mb-4">
                            Management Types
                        </p>
                        <h2 className="text-4xl md:text-5xl lg:text-6xl font-playfair font-bold text-tertiary mb-4">
                            Portfolio Management Services
                        </h2>
                        <p className="text-lg md:text-xl font-crimson text-tertiary/80 max-w-3xl mx-auto">
                            Select the portfolio management service that fits your investment approach
                        </p>
                    </motion.div>

                    {/* Portfolio Management Types - Carousel */}
                    <div>
                        <CircularCarousel
                            products={pmsTypes}
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

            {/* Why PMS Section */}
            <section className="py-16 bg-white">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <motion.div
                        initial={{ opacity: 0, y: 40 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, amount: 0.2 }}
                        transition={{ duration: 0.8 }}
                        className="text-center mb-16"
                    >
                        <p className="text-sm font-crimson text-tertiary/60 uppercase tracking-wider mb-4">
                            BENEFITS
                        </p>
                        <h2 className="text-4xl md:text-5xl lg:text-6xl font-playfair font-bold text-tertiary mb-4">
                            Why Choose PMS?
                        </h2>
                        <p className="text-lg md:text-xl font-crimson text-tertiary/80 max-w-3xl mx-auto">
                            Professional management for high-net-worth individuals
                        </p>
                    </motion.div>

                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
                        {/* Left Column - Benefits List */}
                        <div className="space-y-8 md:space-y-10">
                            {/* Benefit 01 */}
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.6 }}
                                className="space-y-3"
                            >
                                <div className="text-5xl md:text-6xl font-bold font-playfair text-tertiary/20">
                                    01
                                </div>
                                <h3 className="text-xl md:text-2xl font-bold font-playfair text-tertiary">
                                    Risk Management
                                </h3>
                                <p className="text-base md:text-lg font-crimson text-tertiary/70 leading-relaxed">
                                    Continuous monitoring and rebalancing to align with your risk profile.
                                </p>
                            </motion.div>

                            {/* Benefit 02 */}
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.6, delay: 0.1 }}
                                className="space-y-3"
                            >
                                <div className="text-5xl md:text-6xl font-bold font-playfair text-tertiary/20">
                                    02
                                </div>
                                <h3 className="text-xl md:text-2xl font-bold font-playfair text-tertiary">
                                    Personalized Service
                                </h3>
                                <p className="text-base md:text-lg font-crimson text-tertiary/70 leading-relaxed">
                                    Dedicated managers and custom strategies for your unique goals.
                                </p>
                            </motion.div>

                            {/* Benefit 03 */}
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.6, delay: 0.2 }}
                                className="space-y-3"
                            >
                                <div className="text-5xl md:text-6xl font-bold font-playfair text-tertiary/20">
                                    03
                                </div>
                                <h3 className="text-xl md:text-2xl font-bold font-playfair text-tertiary">
                                    Expertise
                                </h3>
                                <p className="text-base md:text-lg font-crimson text-tertiary/70 leading-relaxed">
                                    Access to experienced professionals and in-depth research.
                                </p>
                            </motion.div>
                        </div>

                        {/* Right Column - Image */}
                        <motion.div
                            initial={{ opacity: 0, scale: 0.95 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.8 }}
                            className="relative h-[500px] md:h-[600px] lg:h-[700px] rounded-2xl overflow-hidden shadow-2xl"
                        >
                            <img 
                                src="/PMS.jpg" 
                                alt="Portfolio Management Services"
                                className="w-full h-full object-cover"
                                loading="lazy"
                            />
                        </motion.div>
                    </div>
                </div>
            </section>

            {/* CTA Section */}
            <CTASection />

            {/* Contact Popup */}
            <ContactPopup
                isOpen={isOpen}
                onClose={closePopup}
                title="Start Your PMS Journey"
                description="Get expert portfolio management tailored to your wealth goals."
            />
        </div>
    );
};

export default PortfolioManagement; 
