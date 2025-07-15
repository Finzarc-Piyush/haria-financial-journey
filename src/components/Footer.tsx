import React, { useEffect } from "react";
import logo from "@/assets/logo.png";
import { MapPin, Phone, Mail, Award, Users } from "lucide-react";
import AOS from 'aos';
import 'aos/dist/aos.css';
import gsap from 'gsap';

const Footer = () => {
    useEffect(() => {
        AOS.init({ duration: 600, once: true });
        // GSAP icon entrance animation
        gsap.fromTo('.footer-animate-icon', { y: 16, opacity: 0 }, { y: 0, opacity: 1, duration: 0.7, stagger: 0.15, ease: 'power2.out' });
    }, []);

    return (
        <footer data-aos="fade-up" className="bg-tertiary text-cream pt-12 pb-0">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* Top 4-column layout */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 mb-12">
                    {/* Brand Section */}
                    <div className="flex flex-col items-start gap-4" data-aos="fade-right" data-aos-delay="0">
                        <div className="flex items-center gap-3 mb-2">
                            <img src={logo} alt="Haria Investments Logo" className="w-10 h-10 object-contain" />
                            <span className="font-playfair font-bold text-2xl text-cream">Haria Investments</span>
                        </div>
                        <div className="font-crimson text-cream/90 text-base mb-1">
                            Your One Stop Financial Solution!<br />Trusted investment advice since 1957.
                        </div>
                        <div className="flex items-center gap-2 mt-2">
                            <Award className="w-5 h-5 text-secondary footer-animate-icon" />
                            <span className="font-crimson text-secondary font-semibold">SEBI Registered</span>
                        </div>
                    </div>
                    {/* Quick Links */}
                    <div data-aos="fade-up" data-aos-delay="100">
                        <h4 className="font-playfair text-lg font-bold mb-4">Quick Links</h4>
                        <ul className="font-crimson text-cream/80 space-y-2">
                            {[
                                { label: 'Home', href: '#hero' },
                                { label: 'About Us', href: '#about' },
                                { label: 'Services', href: '#services' },
                                { label: 'Results', href: '#results' },
                                { label: 'Insights', href: '#insights' },
                                { label: 'Process', href: '#process' },
                                { label: 'Credentials', href: '#credentials' },
                                { label: 'Contact Us', href: '#contact' },
                            ].map((item, i) => (
                                <li key={item.label} data-aos="fade-up" data-aos-delay={150 + i * 60}>
                                    <a href={item.href} className="transition-colors duration-300 hover:text-secondary">
                                        {item.label}
                                    </a>
                                </li>
                            ))}
                        </ul>
                    </div>
                    {/* Our Services */}
                    <div data-aos="fade-up" data-aos-delay="200">
                        <h4 className="font-playfair text-lg font-bold mb-4">Our Services</h4>
                        <ul className="font-crimson text-cream/80 space-y-2">
                            {[
                                'Life Insurance',
                                'Health Insurance',
                                'Mutual Funds',
                                'Equity Trading',
                                'Fixed Income',
                                'Commodity Trading',
                            ].map((item, i) => (
                                <li key={item} data-aos="fade-up" data-aos-delay={250 + i * 60}>{item}</li>
                            ))}
                        </ul>
                    </div>
                    {/* Contact Us */}
                    <div data-aos="fade-up" data-aos-delay="300">
                        <h4 className="font-playfair text-lg font-bold mb-4">Contact Us</h4>
                        <ul className="font-crimson text-cream/80 space-y-3">
                            <li className="flex items-start gap-2" data-aos="fade-up" data-aos-delay="350">
                                <MapPin className="w-5 h-5 text-secondary mt-1 footer-animate-icon" />
                                <div>
                                    <div className="font-crimson font-semibold text-cream text-base">Office Address</div>
                                    <div className="font-crimson text-cream/80 text-sm">
                                        1st Floor, Room No.12, Shree Krishna Niwas,<br />
                                        Above Panshikhar Sweets, Opposite Ajay Shopping Centre,<br />
                                        T.H.Kataria Marg, Matunga West, Mumbai – 400016
                                    </div>
                                </div>
                            </li>
                            <li className="flex items-center gap-2" data-aos="fade-up" data-aos-delay="400">
                                <Phone className="w-5 h-5 text-secondary footer-animate-icon" /> <a href="tel:+919876543210" className="hover:text-secondary transition-colors duration-200">+91 98765 43210</a>
                            </li>
                            <li className="flex items-center gap-2" data-aos="fade-up" data-aos-delay="450">
                                <Mail className="w-5 h-5 text-secondary footer-animate-icon" /> <a href="mailto:hariainvestments9@gmail.com" className="hover:text-secondary transition-colors duration-200">hariainvestments9@gmail.com</a>
                            </li>
                        </ul>
                        <div className="mt-4">
                            <div className="font-crimson text-cream/80 mb-1">Certifications</div>
                            <div className="flex items-center gap-3 mt-1">
                                <span title="ISO Certified" className="flex items-center gap-1"><Award className="w-5 h-5 text-secondary footer-animate-icon" /> ISO Certified</span>
                                <span title="65+ Years" className="flex items-center gap-1"><Users className="w-5 h-5 text-secondary footer-animate-icon" /> 65+ Years</span>
                            </div>
                        </div>
                    </div>
                </div>
                {/* Bottom Row */}
                <div className="flex flex-col lg:flex-row gap-8 justify-between items-stretch pb-10 border-t border-cream/20 pt-10">
                    {/* Visit Our Office + Map */}
                    <div className="w-full lg:w-1/2 mb-8 lg:mb-0 flex flex-col justify-center" data-aos="zoom-in" data-aos-delay="100">
                        <h4 className="font-playfair text-xl font-bold mb-4">Visit Our Office</h4>
                        <div className="rounded-2xl shadow-lg overflow-hidden bg-cream/10">
                            <iframe
                                title="Haria Investments Office Location"
                                src="https://www.google.com/maps?q=1st+Floor,+Room+No.12,+Shree+Krishna+Niwas,+T.H.Kataria+Marg,+Matunga+West,+Mumbai+400016&output=embed"
                                width="100%"
                                height="220"
                                style={{ border: 0, minWidth: '220px' }}
                                allowFullScreen
                                loading="lazy"
                                referrerPolicy="no-referrer-when-downgrade"
                            ></iframe>
                        </div>
                    </div>
                    {/* Why Choose Us */}
                    <div className="w-full lg:w-1/2 flex flex-col justify-center items-start mx-auto" data-aos="fade-left" data-aos-delay="200">
                        <h4 className="font-playfair text-xl font-bold mb-4">Why Choose Us?</h4>
                        <ul className="font-crimson text-cream/90 space-y-2 list-disc pl-5">
                            {[
                                '65+ years of trusted financial expertise',
                                'SEBI registered and compliant',
                                'Personalized investment strategies',
                                'Comprehensive insurance solutions',
                                'Expert guidance for all life stages',
                            ].map((item, i) => (
                                <li key={item} data-aos="fade-up" data-aos-delay={250 + i * 60}>{item}</li>
                            ))}
                        </ul>
                    </div>
                </div>
                <div className="text-center text-xs text-cream/60 font-crimson py-6" data-aos="fade-in" data-aos-delay="300">
                    &copy; {new Date().getFullYear()} Haria Investments. All rights reserved.
                </div>
            </div>
        </footer>
    );
};

export default Footer; 