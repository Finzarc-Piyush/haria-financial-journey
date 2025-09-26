import { motion } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Globe, Coins, Activity, Layers, ArrowRight, Shield, CheckCircle } from 'lucide-react';
import AOS from 'aos';
import 'aos/dist/aos.css';
import ContactPopup from '@/components/ui/ContactPopup';
import { useContactPopup } from '@/hooks/useContactPopup';

const OtherDerivatives = () => {
    const { isOpen, openPopup, closePopup } = useContactPopup();

    return (
        <div className="min-h-screen bg-background text-foreground">
            {/* Hero Section (matches other pages) */}
            <section id="hero" className="relative min-h-[60vh] md:min-h-screen flex items-center justify-center overflow-hidden px-4 md:px-8">
                <div
                    className="absolute inset-0 bg-cover bg-center"
                    style={{ backgroundImage: "url('/hero-commodity-trading.webp')" }}
                />
                <div className="absolute inset-0 bg-black/40" />

                <div className="relative z-10 text-center text-white w-full max-w-3xl mx-auto py-12 md:py-24">
                    <motion.h1
                        initial={{ opacity: 0, y: 40 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, amount: 0.2 }}
                        transition={{ duration: 0.8 }}
                        className="text-3xl sm:text-5xl md:text-7xl font-playfair font-bold mb-6"
                    >
                        Other Derivatives
                    </motion.h1>
                    <motion.p
                        initial={{ opacity: 0, y: 40 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, amount: 0.2 }}
                        transition={{ duration: 0.6, delay: 0.1 }}
                        className="text-base sm:text-lg md:text-2xl font-crimson mb-8 text-white/90"
                    >
                        Currency, energy, agri and index-linked exposures with risk-first design
                    </motion.p>

                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                        <Button size="lg" className="bg-accent hover:bg-accent/90 text-accent-foreground font-semibold px-8 py-4 text-lg">
                            Talk to Advisor
                            <ArrowRight className="ml-2 h-5 w-5" />
                        </Button>
                        <Button size="lg" variant="outline" className="border-white text-white hover:bg-white hover:text-accent font-semibold px-8 py-4 text-lg">
                            Explore Derivatives
                        </Button>
                    </div>
                </div>
            </section>

            {/* Offerings Section */}
            <section className="py-20 px-4 bg-gradient-premium">
                <div className="max-w-7xl mx-auto">
                    <motion.div
                        initial={{ opacity: 0, y: 40 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, amount: 0.3 }}
                        transition={{ duration: 0.6 }}
                        className="text-center mb-16"
                    >
                        <h2 className="text-4xl md:text-5xl font-playfair font-bold text-foreground mb-4">Derivatives Offerings</h2>
                        <p className="text-xl font-crimson text-muted-foreground">Purpose-built frameworks across asset classes</p>
                    </motion.div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {[{
                            title: 'Currency Futures & Options', desc: 'INR hedging for importers/exporters and tactical views.', icon: Globe, badge: 'FX'
                        }, {
                            title: 'Energy & Agri', desc: 'Exposure frameworks for crude, natural gas, and select agri.', icon: Activity, badge: 'Commodities'
                        }, {
                            title: 'Index Derivatives', desc: 'Defined-risk spreads and tactical positioning on indices.', icon: Layers, badge: 'Equity'
                        }].map((item, i) => (
                            <motion.div
                                key={item.title}
                                initial={{ opacity: 0, y: 40 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true, amount: 0.3 }}
                                transition={{ duration: 0.6, delay: i * 0.05 }}
                            >
                                <Card className="group premium-card hover:scale-105 transition-all duration-500 cursor-pointer border-2 border-transparent hover:border-accent/50 overflow-hidden">
                                    <CardHeader>
                                        <div className="flex items-center justify-between mb-3">
                                            <item.icon className="h-10 w-10 text-accent" />
                                            <Badge className="bg-accent/20 text-accent border-accent/30">{item.badge}</Badge>
                                        </div>
                                        <CardTitle className="text-2xl font-playfair text-foreground group-hover:text-accent transition-colors duration-300">
                                            {item.title}
                                        </CardTitle>
                                    </CardHeader>
                                    <CardContent>
                                        <p className="text-muted-foreground font-crimson">{item.desc}</p>
                                    </CardContent>
                                </Card>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* How We Operate */}
            <section className="py-20 px-4 bg-background">
                <div className="max-w-7xl mx-auto">
                    <motion.div
                        initial={{ opacity: 0, y: 40 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, amount: 0.3 }}
                        transition={{ duration: 0.6 }}
                        className="rounded-2xl bg-white/50 backdrop-blur-sm p-8"
                    >
                        <h2 className="text-3xl md:text-4xl font-playfair font-bold text-foreground mb-6 text-center">How We Operate</h2>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-muted-foreground">
                            {["Eligibility and suitability assessment before onboarding", "Playbooks for entries, exits and max loss per trade", "Real-time risk monitoring and prudent leverage", "Periodic reviews and structured reporting"].map((point, idx) => (
                                <div key={idx} className="flex items-start">
                                    <CheckCircle className="h-5 w-5 text-accent mr-2 mt-0.5" />
                                    <span>{point}</span>
                                </div>
                            ))}
                        </div>
                    </motion.div>
                </div>
            </section>

            {/* CTA Section */}
            <section className="py-20 px-4 bg-gradient-accent">
                <div className="max-w-4xl mx-auto text-center">
                    <motion.h2
                        initial={{ opacity: 0, y: 40 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, amount: 0.3 }}
                        transition={{ duration: 0.6 }}
                        className="text-4xl md:text-5xl font-playfair font-bold text-white mb-6"
                    >
                        Trade with Confidence
                    </motion.h2>
                    <motion.p
                        initial={{ opacity: 0, y: 40 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, amount: 0.3 }}
                        transition={{ duration: 0.6, delay: 0.1 }}
                        className="text-xl font-crimson text-white/80 mb-8"
                    >
                        Structured risk, disciplined execution, transparent reporting
                    </motion.p>
                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                        <Button size="lg" className="bg-white text-accent hover:bg-white/90 font-semibold px-8 py-4 text-lg" onClick={openPopup}>
                            Get Started
                        </Button>
                        <Button size="lg" variant="outline" className="border-white text-white hover:bg-white hover:text-accent font-semibold px-8 py-4 text-lg" onClick={openPopup}>
                            Schedule Consultation
                        </Button>
                    </div>
                </div>
            </section>

            {/* Contact Popup */}
            <ContactPopup
                isOpen={isOpen}
                onClose={closePopup}
                title="Start Your Derivatives Trading"
                description="Trade derivatives with expert guidance and advanced risk management strategies."
            />
        </div>
    );
};

export default OtherDerivatives;


