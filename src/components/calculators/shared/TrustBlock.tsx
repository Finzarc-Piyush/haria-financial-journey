import React, { useEffect, useState } from 'react';

interface TrustBlockProps {
    certifications?: string[];
    testimonials?: string[];
    compliance?: string;
    story?: string;
}

const defaultTestimonials = [
    '“Professional, transparent, and always available.”',
    '“Helped me achieve my financial goals with confidence.”',
    '“Trusted by my family for generations.”',
];

const TrustBlock: React.FC<TrustBlockProps> = ({
    certifications = ['SEBI Registered', 'CFA', 'CFP'],
    testimonials = defaultTestimonials,
    compliance = 'SEBI Reg. No. INZ000000000 | Investments are subject to market risks. Read all scheme related documents carefully.',
    story = 'How we helped 1000+ clients achieve their financial dreams through personalized, compliant, and ethical advice.',
}) => {
    const [testimonialIdx, setTestimonialIdx] = useState(0);
    useEffect(() => {
        const interval = setInterval(() => {
            setTestimonialIdx(idx => (idx + 1) % testimonials.length);
        }, 4000);
        return () => clearInterval(interval);
    }, [testimonials.length]);

    return (
        <section className="w-full max-w-2xl mx-auto bg-[#F5F1E8] rounded-xl shadow-lg p-6 md:p-10 mt-8 flex flex-col items-center animate-fade-in">
            <span className="inline-block bg-secondary text-secondary-foreground rounded-full px-4 py-1 text-xs md:text-sm font-semibold shadow font-crimson mb-3">
                Since 1957
            </span>
            <div className="flex flex-wrap gap-2 justify-center mb-4">
                {certifications.map(cert => (
                    <span key={cert} className="font-crimson text-xs md:text-sm bg-[#E6C674]/80 text-[#3A3A3A] rounded-full px-3 py-1 shadow animate-fade-in">
                        {cert}
                    </span>
                ))}
            </div>
            <div className="w-full text-center mb-4 min-h-[2.5em]">
                <span className="font-playfair text-base md:text-lg text-tertiary transition-opacity duration-700 block" style={{ opacity: 1 }}>
                    {testimonials[testimonialIdx]}
                </span>
            </div>
            <div className="w-full text-xs text-gray-500 text-center mb-4 font-crimson">
                {compliance}
            </div>
            <div className="w-full bg-white rounded-lg p-4 shadow-md text-center font-crimson text-sm md:text-base animate-float-up">
                <strong className="font-playfair block mb-1 text-tertiary">Our Story</strong>
                {story}
            </div>
        </section>
    );
};

export default TrustBlock; 