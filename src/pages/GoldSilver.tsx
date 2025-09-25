import { motion } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Shield, TrendingUp, Layers, ArrowRight, Gem, LineChart, CheckCircle } from 'lucide-react';

const GoldSilver = () => {
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
                        Gold & Silver Strategies
                    </motion.h1>
                    <motion.p
                        initial={{ opacity: 0, y: 40 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, amount: 0.2 }}
                        transition={{ duration: 0.6, delay: 0.1 }}
                        className="text-base sm:text-lg md:text-2xl font-crimson mb-8 text-white/90"
                    >
                        Precision-driven bullion exposure with disciplined risk management
                    </motion.p>

                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                        <Button size="lg" className="bg-accent hover:bg-accent/90 text-accent-foreground font-semibold px-8 py-4 text-lg">
                            Talk to Advisor
                            <ArrowRight className="ml-2 h-5 w-5" />
                        </Button>
                        <Button size="lg" variant="outline" className="border-white text-white hover:bg-white hover:text-accent font-semibold px-8 py-4 text-lg">
                            Explore Commodities
                        </Button>
                    </div>
                </div>
            </section>

            {/* Offerings Section (cards) */}
            <section className="py-20 px-4 bg-gradient-premium">
                <div className="max-w-7xl mx-auto">
                    <motion.div
                        initial={{ opacity: 0, y: 40 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, amount: 0.3 }}
                        transition={{ duration: 0.6 }}
                        className="text-center mb-16"
                    >
                        <h2 className="text-4xl md:text-5xl font-playfair font-bold text-foreground mb-4">Bullion Offerings</h2>
                        <p className="text-xl font-crimson text-muted-foreground">Institutional frameworks adapted for individual investors</p>
                    </motion.div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {[{
                            title: 'Bullion Futures', desc: 'Participate in Gold & Silver price moves with prudent position sizing.', icon: LineChart, badge: 'Risk Managed'
                        }, {
                            title: 'Hedging Solutions', desc: 'Protect manufacturer and jeweller inventory against volatility.', icon: Shield, badge: 'Business'
                        }, {
                            title: 'Systematic Exposure', desc: 'Rule-based entries/exits to smooth volatility over cycles.', icon: Layers, badge: 'Discipline'
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

            {/* Why Us Section */}
            <section className="py-20 px-4 bg-background">
                <div className="max-w-7xl mx-auto">
                    <motion.div
                        initial={{ opacity: 0, y: 40 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, amount: 0.3 }}
                        transition={{ duration: 0.6 }}
                        className="rounded-2xl bg-white/50 backdrop-blur-sm p-8"
                    >
                        <h2 className="text-3xl md:text-4xl font-playfair font-bold text-foreground mb-6 text-center">Why Bullion with Haria</h2>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-muted-foreground">
                            {["SEBI-registered partner network and compliant execution", "Clear frameworks for position sizing and stop-losses", "Transparent costs and reporting", "Dedicated advisor for ongoing guidance"].map((point, idx) => (
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
                        Add Bullion to Your Portfolio
                    </motion.h2>
                    <motion.p
                        initial={{ opacity: 0, y: 40 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, amount: 0.3 }}
                        transition={{ duration: 0.6, delay: 0.1 }}
                        className="text-xl font-crimson text-white/80 mb-8"
                    >
                        Balanced exposure to Gold and Silver with risk-first design
                    </motion.p>
                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                        <Button size="lg" className="bg-white text-accent hover:bg-white/90 font-semibold px-8 py-4 text-lg">
                            Get Started
                        </Button>
                        <Button size="lg" variant="outline" className="border-white text-white hover:bg-white hover:text-accent font-semibold px-8 py-4 text-lg">
                            Schedule Consultation
                        </Button>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default GoldSilver;


