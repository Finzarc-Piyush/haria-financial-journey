import { motion } from 'framer-motion';
import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Globe, Coins, Activity, Layers, ArrowRight, Shield, CheckCircle } from 'lucide-react';
import ContactPopup from '@/components/ui/ContactPopup';
import { useContactPopup } from '@/hooks/useContactPopup';

const OtherDerivatives = () => {
    const [hoveredCard, setHoveredCard] = useState<string | null>(null);
    const { isOpen, openPopup, closePopup } = useContactPopup();

    return (
        <div className="min-h-screen bg-background text-foreground">
            {/* Hero Section (matches other pages) */}
            <section id="hero" className="relative min-h-[60vh] md:min-h-screen flex items-center justify-center overflow-hidden px-4 md:px-8 pt-20 md:pt-0">
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
                        className="text-xl sm:text-2xl md:text-3xl font-crimson mb-8 text-white/90"
                    >
                        Currency, energy, agri and index-linked exposures with risk-first design
                    </motion.p>

                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                        <Button size="lg" className="bg-secondary hover:bg-secondary/90 text-secondary-foreground font-semibold px-8 py-4 text-lg" onClick={openPopup}>
                            Talk to Advisor
                            <ArrowRight className="ml-2 h-5 w-5" />
                        </Button>
                        <Button size="lg" variant="outline" className="border-white text-secondary hover:bg-white hover:text-secondary font-semibold px-8 py-4 text-lg" onClick={openPopup}>
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
                        <p className="text-2xl font-crimson text-muted-foreground">Purpose-built frameworks across asset classes</p>
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
                                className="h-full"
                            >
                                <Card
                                    className="group premium-card cursor-pointer border-2 border-transparent hover:border-secondary/50 overflow-hidden hover:shadow-lg hover:shadow-secondary/30 hover:ring-2 hover:ring-secondary/30 relative h-full flex flex-col transition-all duration-300 ease-out"
                                    style={{
                                        minHeight: '220px',
                                        transform: hoveredCard === `derivatives-${i}` ? 'scale(1.05) rotateY(5deg)' : 'scale(1) rotateY(0deg)',
                                        transition: 'all 0.5s cubic-bezier(0.25, 0.46, 0.45, 0.94)'
                                    }}
                                    onMouseEnter={() => setHoveredCard(`derivatives-${i}`)}
                                    onMouseLeave={() => setHoveredCard(null)}
                                >
                                    <CardHeader>
                                        <div className="flex items-center justify-between mb-3">
                                            <item.icon className="h-10 w-10 text-secondary" />
                                            <Badge className="bg-secondary/20 text-secondary border-secondary/30">{item.badge}</Badge>
                                        </div>
                                        <CardTitle className="text-2xl font-playfair text-foreground">
                                            {item.title}
                                        </CardTitle>
                                    </CardHeader>
                                    <CardContent className="flex flex-col flex-grow">
                                        <div className="flex-grow flex flex-col justify-center">
                                            <p className="text-muted-foreground font-crimson text-base">{item.desc}</p>
                                        </div>
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
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-muted-foreground text-base max-w-4xl mx-auto">
                            {["Eligibility and suitability assessment before onboarding", "Playbooks for entries, exits and max loss per trade", "Real-time risk monitoring and prudent leverage", "Periodic reviews and structured reporting"].map((point, idx) => (
                                <div key={idx} className="flex items-start justify-center md:justify-start">
                                    <CheckCircle className="h-5 w-5 text-secondary mr-2 mt-0.5 flex-shrink-0" />
                                    <span className="text-center md:text-left">{point}</span>
                                </div>
                            ))}
                        </div>
                    </motion.div>
                </div>
            </section>

            {/* CTA Section */}
            <section className="py-20 px-4 bg-gradient-to-br from-secondary to-tertiary">
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
                        <Button size="lg" className="bg-white text-secondary hover:bg-white/90 font-semibold px-8 py-4 text-xl" onClick={openPopup}>
                            Get Started
                        </Button>
                        <Button size="lg" className="bg-secondary text-secondary-foreground hover:bg-secondary/90 font-crimson font-semibold px-8 py-4 text-xl" onClick={openPopup}>
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


