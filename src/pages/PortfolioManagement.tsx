import { useEffect, useRef, useState } from "react";
import Navigation from "@/components/Navigation";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { motion, useInView } from "framer-motion";
import { BarChart3, Award, Users, PieChart, Shield } from "lucide-react";
import AOS from 'aos';
import 'aos/dist/aos.css';
import ContactPopup from '@/components/ui/ContactPopup';
import { useContactPopup } from '@/hooks/useContactPopup';

const slideUp = {
    hidden: { opacity: 0, y: 40 },
    show: { opacity: 1, y: 0, transition: { duration: 0.6 } },
};
const fadeIn = {
    hidden: { opacity: 0 },
    show: { opacity: 1, transition: { duration: 0.6 } },
};

const pmsTypes = [
    {
        title: "Discretionary PMS",
        icon: BarChart3,
        description: "Portfolio manager takes investment decisions on your behalf, offering convenience and expertise.",
    },
    {
        title: "Non-Discretionary PMS",
        icon: PieChart,
        description: "You make the final investment decisions, with research and recommendations from the portfolio manager.",
    },
    {
        title: "Advisory PMS",
        icon: Award,
        description: "You receive tailored advice and strategies, but execute transactions yourself.",
    },
];

const features = [
    {
        icon: Shield,
        title: "Risk Management",
        description: "Continuous monitoring and rebalancing to align with your risk profile.",
    },
    {
        icon: Users,
        title: "Personalized Service",
        description: "Dedicated managers and custom strategies for your unique goals.",
    },
    {
        icon: Award,
        title: "Expertise",
        description: "Access to experienced professionals and in-depth research.",
    },
];

const PortfolioManagement = () => {
    const { isOpen, openPopup, closePopup } = useContactPopup();
    const [heroInView, setHeroInView] = useState(true);
    const heroHeadingRef = useRef(null);
    const heroHeadingInView = useInView(heroHeadingRef, { once: true, amount: 0.3 });
    const heroPRef = useRef(null);
    const heroPInView = useInView(heroPRef, { once: true, amount: 0.3 });

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

    return (
        <div className="min-h-screen bg-background">
            <Navigation isTransparent={heroInView} />

            {/* Hero Section */}
            <section id="hero" className="relative min-h-[60vh] md:min-h-screen flex items-center justify-center overflow-hidden px-4 md:px-8">
                {/* Background Image */}
                <div
                    className="absolute inset-0 bg-cover bg-center"
                    style={{ backgroundImage: "url('/hero-pms.webp')" }}
                />
                <div className="absolute inset-0 bg-black/40" />

                <div className="relative z-10 text-center text-white w-full max-w-3xl mx-auto py-12 md:py-24">
                    <motion.h1
                        ref={heroHeadingRef}
                        variants={slideUp}
                        initial="hidden"
                        animate={heroHeadingInView ? "show" : "hidden"}
                        className="text-3xl sm:text-5xl md:text-7xl font-playfair font-bold mb-6"
                    >
                        <span className="inline-block mr-4">Professional</span>
                        <span className="inline-block text-secondary animate-pulse">Portfolio</span>
                        <br />
                        <span className="inline-block text-secondary">Management Services</span>
                    </motion.h1>

                    <motion.p
                        ref={heroPRef}
                        variants={fadeIn}
                        initial="hidden"
                        animate={heroPInView ? "show" : "hidden"}
                        className="text-xl sm:text-2xl md:text-3xl font-crimson mb-8 text-white/90"
                    >
                        Achieve your financial goals with personalized, expert-driven portfolio management tailored to your needs.
                    </motion.p>

                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                        <Button
                            size="lg"
                            className="bg-secondary hover:bg-secondary/90 text-secondary-foreground font-crimson font-semibold px-8 py-4 text-lg"
                            onClick={openPopup}
                        >
                            Get Started
                        </Button>
                        <Button
                            size="lg"
                            variant="outline"
                            className="border-white text-secondary hover:bg-white hover:text-secondary font-crimson font-semibold px-8 py-4 text-lg"
                            onClick={openPopup}
                        >
                            Schedule Consultation
                        </Button>
                    </div>
                </div>
            </section>

            {/* Features Section */}
            <section className="py-20 px-4 bg-gradient-premium">
                <div className="max-w-6xl mx-auto">
                    <motion.div
                        variants={slideUp}
                        initial="hidden"
                        whileInView="show"
                        viewport={{ once: true, amount: 0.3 }}
                        className="text-center mb-16"
                    >
                        <h2 className="text-4xl md:text-5xl font-playfair font-bold text-foreground mb-4">
                            Why Choose Our PMS?
                        </h2>
                        <p className="text-2xl font-crimson text-muted-foreground">
                            Experience the benefits of professional management, transparency, and tailored strategies.
                        </p>
                    </motion.div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {features.map((feature, idx) => (
                            <Card className="premium-card" key={feature.title}>
                                <CardHeader>
                                    <CardTitle className="text-3xl font-playfair flex items-center">
                                        <feature.icon className="h-8 w-8 mr-3 text-secondary" />
                                        {feature.title}
                                    </CardTitle>
                                </CardHeader>
                                <CardContent>
                                    <p className="text-lg font-crimson text-muted-foreground">{feature.description}</p>
                                </CardContent>
                            </Card>
                        ))}
                    </div>
                </div>
            </section>

            {/* PMS Types Section */}
            <section className="py-20 px-4">
                <div className="max-w-6xl mx-auto">
                    <motion.div
                        variants={slideUp}
                        initial="hidden"
                        whileInView="show"
                        viewport={{ once: true, amount: 0.3 }}
                        className="text-center mb-16"
                    >
                        <h2 className="text-4xl md:text-5xl font-playfair font-bold text-foreground mb-4">
                            Types of Portfolio Management Services
                        </h2>
                        <p className="text-2xl font-crimson text-muted-foreground">
                            Choose the PMS model that best fits your investment style and preferences.
                        </p>
                    </motion.div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {pmsTypes.map((type) => (
                            <Card className="premium-card" key={type.title}>
                                <CardHeader>
                                    <CardTitle className="text-3xl font-playfair flex items-center">
                                        <type.icon className="h-8 w-8 mr-3 text-secondary" />
                                        {type.title}
                                    </CardTitle>
                                </CardHeader>
                                <CardContent>
                                    <p className="text-lg font-crimson text-muted-foreground">{type.description}</p>
                                </CardContent>
                            </Card>
                        ))}
                    </div>
                </div>
            </section>

            {/* CTA Section */}
            <section className="py-20 px-4 bg-gradient-to-br from-secondary to-tertiary">
                <div className="max-w-3xl mx-auto text-center">
                    <motion.h2
                        variants={slideUp}
                        initial="hidden"
                        whileInView="show"
                        viewport={{ once: true, amount: 0.3 }}
                        className="text-3xl md:text-5xl font-playfair font-bold text-white mb-6"
                    >
                        Ready to Optimize Your Portfolio?
                    </motion.h2>
                    <motion.p
                        variants={fadeIn}
                        initial="hidden"
                        whileInView="show"
                        viewport={{ once: true, amount: 0.3 }}
                        className="text-2xl font-crimson text-white/90 mb-8"
                    >
                        Contact our experts for a personalized consultation and take the first step towards financial growth.
                    </motion.p>
                    <Button size="lg" className="bg-white text-secondary font-crimson font-semibold px-8 py-4 text-lg hover:bg-gray-100" onClick={openPopup}>
                        Schedule Consultation
                    </Button>
                </div>
            </section>

            {/* Contact Popup */}
            <ContactPopup
                isOpen={isOpen}
                onClose={closePopup}
                title="Start Your Portfolio Management Journey"
                description="Get personalized portfolio management services tailored to your financial goals."
            />
        </div>
    );
};

export default PortfolioManagement; 