import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface FAQ {
    question: string;
    answer: string;
}

interface FAQSectionProps {
    faqs: FAQ[];
    delay?: number;
}

const FAQSection: React.FC<FAQSectionProps> = ({ faqs, delay = 0 }) => {
    const [openIdx, setOpenIdx] = useState<number | null>(null);

    return (
        <section className="max-w-3xl mx-auto my-10">
            <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay }}
                className="bg-white/80 rounded-xl shadow p-6"
            >
                <h2 className="font-playfair text-2xl text-secondary mb-6 text-center">Frequently Asked Questions</h2>
                <div className="space-y-4">
                    {faqs.map((faq, i) => (
                        <motion.div
                            key={i}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5, delay: delay + i * 0.08 }}
                            className="border-b border-gray-200 pb-2"
                        >
                            <button
                                className="w-full text-left flex justify-between items-center font-crimson text-lg text-tertiary focus:outline-none"
                                onClick={() => setOpenIdx(openIdx === i ? null : i)}
                            >
                                <span>{faq.question}</span>
                                <svg className={`w-5 h-5 ml-2 transition-transform duration-200 ${openIdx === i ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" /></svg>
                            </button>
                            <AnimatePresence initial={false}>
                                {openIdx === i && (
                                    <motion.div
                                        key="content"
                                        initial={{ height: 0, opacity: 0 }}
                                        animate={{ height: 'auto', opacity: 1 }}
                                        exit={{ height: 0, opacity: 0 }}
                                        transition={{ duration: 0.3 }}
                                        className="overflow-hidden"
                                    >
                                        <div className="pt-2 pb-2 text-tertiary/80 text-base font-crimson">
                                            {faq.answer}
                                        </div>
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </motion.div>
                    ))}
                </div>
            </motion.div>
        </section>
    );
};

export default FAQSection; 