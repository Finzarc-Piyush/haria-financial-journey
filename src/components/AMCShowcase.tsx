import React from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import partnersImage from '@/assets/partners.png';

const AMCShowcase: React.FC = () => {
    return (
        <section className="w-full py-10 md:py-16 bg-white">
            <div className="container mx-auto px-4 grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
                {/* Image only (no orbits) */}
                <motion.div
                    className="order-2 lg:order-1 flex justify-center"
                    initial={{ opacity: 0, x: -30 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true, margin: '-20%' }}
                    transition={{ duration: 0.6 }}
                >
                    <img
                        src={partnersImage}
                        alt="Partner AMCs"
                        className="w-full max-w-xl h-auto drop-shadow-sm"
                    />
                </motion.div>

                {/* Text side */}
                <motion.div
                    className="order-1 lg:order-2 space-y-6"
                    initial={{ opacity: 0, x: 30 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true, margin: '-20%' }}
                    transition={{ duration: 0.6 }}
                >
                    <h2 className="text-4xl md:text-5xl font-bold text-foreground font-playfair leading-tight">
                        Invest with 45+ Trusted AMCs
                    </h2>
                    <p className="text-lg md:text-xl text-muted-foreground font-crimson max-w-prose">
                        Haria Financial Journey helps you access a curated universe of mutual funds and
                        portfolios from India’s leading Asset Management Companies — all in one place.
                    </p>
                </motion.div>
            </div>
        </section>
    );
};

export default AMCShowcase;


