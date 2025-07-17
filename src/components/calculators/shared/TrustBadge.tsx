import React, { useEffect, useState } from 'react';

interface TrustBadgeProps {
    heritage?: string;
    certifications?: string[];
    sebi?: string;
    testimonials?: string | number;
    className?: string;
}

const TrustBadge: React.FC<TrustBadgeProps> = ({
    heritage = 'Since 1957',
    certifications = ['CFA', 'CFP'],
    sebi = 'SEBI Registered',
    testimonials = '1000+ Satisfied Clients',
    className = '',
}) => {
    const [visible, setVisible] = useState(false);
    useEffect(() => {
        setTimeout(() => setVisible(true), 100);
    }, []);
    return (
        <div className={`flex flex-wrap items-center justify-center gap-3 py-2 px-4 rounded-xl bg-[#F5F1E8] shadow transition-all duration-700 ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'} ${className}`}>
            <span className="font-playfair text-xs md:text-sm text-tertiary bg-secondary/80 rounded-full px-3 py-1 shadow">{heritage}</span>
            {certifications.map(cert => (
                <span key={cert} className="font-crimson text-xs md:text-sm bg-[#E6C674]/80 text-[#3A3A3A] rounded-full px-3 py-1 shadow animate-fade-in">{cert}</span>
            ))}
            <span className="font-crimson text-xs md:text-sm bg-green-100 text-green-800 rounded-full px-3 py-1 shadow animate-fade-in">{sebi}</span>
            <span className="font-crimson text-xs md:text-sm bg-secondary/60 text-tertiary rounded-full px-3 py-1 shadow animate-fade-in">{testimonials}</span>
        </div>
    );
};

export default TrustBadge; 