import React, { useEffect } from "react";
import logo from "@/assets/logo.png";
import { MapPin, Phone, Mail, Award, Users } from "lucide-react";
import AOS from 'aos';
import 'aos/dist/aos.css';
import gsap from 'gsap';
import { Link } from 'react-router-dom';

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
                        <div className="flex gap-4 mt-2">
                            <a href="https://www.instagram.com/" target="_blank" rel="noopener noreferrer" aria-label="Instagram" className="hover:text-secondary transition-colors duration-300">
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" width="24" height="24" className="w-6 h-6" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M7.5 3.75h9a3.75 3.75 0 0 1 3.75 3.75v9a3.75 3.75 0 0 1-3.75 3.75h-9A3.75 3.75 0 0 1 3.75 16.5v-9A3.75 3.75 0 0 1 7.5 3.75Zm0 0V3a.75.75 0 0 1 .75-.75h7.5a.75.75 0 0 1 .75.75v.75m-9 0h9m-9 0A3.75 3.75 0 0 0 3.75 7.5v9A3.75 3.75 0 0 0 7.5 20.25h9A3.75 3.75 0 0 0 20.25 16.5v-9A3.75 3.75 0 0 0 16.5 3.75h-9Zm4.5 3.75a4.5 4.5 0 1 1 0 9 4.5 4.5 0 0 1 0-9Zm6.375-.375a.375.375 0 1 1 0 .75.375.375 0 0 1 0-.75Z" /></svg>
                            </a>
                            <a href="https://wa.me/919876543210" target="_blank" rel="noopener noreferrer" aria-label="WhatsApp" className="hover:text-secondary transition-colors duration-300">
                                <svg width="24" height="24" viewBox="0 0 32 32" fill="none" className="w-6 h-6" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M16 3C9.373 3 4 8.373 4 15c0 2.385.832 4.68 2.344 6.625L4 29l7.625-2.312A12.93 12.93 0 0 0 16 27c6.627 0 12-5.373 12-12S22.627 3 16 3zm0 22.917c-2.042 0-4.042-.604-5.75-1.75l-.406-.26-4.542 1.375 1.396-4.438-.266-.417C5.646 18.042 5 16.542 5 15c0-6.065 4.935-11 11-11s11 4.935 11 11-4.935 11-11 11zm6.104-7.25c-.333-.167-1.979-.979-2.292-1.094-.312-.115-.542-.167-.771.167-.229.333-.885 1.094-1.085 1.323-.198.229-.365.26-.698.093-.333-.167-1.406-.518-2.68-1.65-.99-.883-1.66-1.97-1.857-2.303-.198-.333-.021-.513.146-.68.151-.15.333-.386.5-.583.167-.198.229-.344.344-.573.115-.229.057-.427.021-.573-.036-.146-.333-1.094-.458-1.5-.12-.386-.25-.333-.344-.339l-.292-.006c-.094 0-.25.036-.385.177-.135.141-.521.521-.521 1.271 0 .75.547 1.477.623 1.583.073.104 1.073 1.646 2.604 2.241.364.126.646.201.865.257.364.093.697.08.96.049.293-.035.904-.369 1.032-.727.128-.358.128-.666.09-.727-.04-.062-.128-.099-.267-.167z" fill="currentColor" />
                                </svg>
                            </a>
                        </div>
                        <div className="flex items-center gap-2 mt-2">
                            <Award className="w-5 h-5 text-secondary footer-animate-icon" />
                            <span className="font-crimson text-secondary font-semibold">SEBI Registered</span>
                        </div>
                    </div>
                    {/* Quick Links */}
                    <div data-aos="fade-up" data-aos-delay="150">
                        <h4 className="font-playfair text-lg font-bold mb-4">Quick Links</h4>
                        <ul className="font-crimson text-cream/80 space-y-2">
                            {[
                                { label: 'Motilal Oswal Demat Account Open', href: 'https://mosl.co/OWxY3P3cRN' },
                                { label: 'Motilal Oswal Client Login', href: 'https://invest.motilaloswal.com/' },
                                { label: 'Mutual Fund Client Login', href: 'https://users.madosx.co.in/pages/auth/login' },
                                { label: 'Check Mutual Fund KYC', href: 'https://www.cvlkra.com/' },
                                { label: 'NSE India', href: 'https://www.nseindia.com/' },
                                { label: 'BSE India', href: 'https://www.bseindia.com/' },
                            ].map((item, i) => (
                                <li key={item.label} data-aos="fade-up" data-aos-delay={160 + i * 60}>
                                    <a href={item.href} target="_blank" rel="noopener noreferrer" className="hover:text-secondary transition-colors duration-300">
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
                                { label: 'Life Insurance', to: '/life-insurance' },
                                { label: 'General Insurance', to: '/general-insurance' },
                                { label: 'Mutual Funds', to: '/mutual-funds' },
                                { label: 'Equity Trading', to: '/equity-investment' },
                                { label: 'Fixed Income', to: '/fixed-income' },
                                { label: 'Commodity Trading', to: '/commodity-trading' },
                            ].map((item, i) => (
                                <li key={item.label} data-aos="fade-up" data-aos-delay={250 + i * 60}>
                                    <Link to={item.to} className="hover:text-secondary transition-colors duration-300">
                                        {item.label}
                                    </Link>
                                </li>
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