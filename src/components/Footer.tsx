import React from "react";
import logo from "@/assets/logo.png";
import { MapPin, Phone, Mail, Award, Users } from "lucide-react";

const Footer = () => (
    <footer data-aos="fade-up" className="bg-tertiary text-cream pt-12 pb-0">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            {/* Top 4-column layout */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 mb-12">
                {/* Brand Section */}
                <div className="flex flex-col items-start gap-4">
                    <div className="flex items-center gap-3 mb-2">
                        <img src={logo} alt="Haria Investments Logo" className="w-10 h-10 object-contain" />
                        <span className="font-playfair font-bold text-2xl text-cream">Haria Investments</span>
                    </div>
                    <div className="font-crimson text-cream/90 text-base mb-1">
                        Your One Stop Financial Solution!<br />Trusted investment advice since 1957.
                    </div>
                    <div className="flex items-center gap-2 mt-2">
                        <Award className="w-5 h-5 text-secondary" />
                        <span className="font-crimson text-secondary font-semibold">SEBI Registered</span>
                    </div>
                </div>
                {/* Quick Links */}
                <div>
                    <h4 className="font-playfair text-lg font-bold mb-4">Quick Links</h4>
                    <ul className="font-crimson text-cream/80 space-y-2">
                        <li><a href="#hero" className="transition-colors duration-300 hover:text-secondary">Home</a></li>
                        <li><a href="#about" className="transition-colors duration-300 hover:text-secondary">About Us</a></li>
                        <li><a href="#services" className="transition-colors duration-300 hover:text-secondary">Services</a></li>
                        <li><a href="#results" className="transition-colors duration-300 hover:text-secondary">Results</a></li>
                        <li><a href="#insights" className="transition-colors duration-300 hover:text-secondary">Insights</a></li>
                        <li><a href="#process" className="transition-colors duration-300 hover:text-secondary">Process</a></li>
                        <li><a href="#credentials" className="transition-colors duration-300 hover:text-secondary">Credentials</a></li>
                        <li><a href="#contact" className="transition-colors duration-300 hover:text-secondary">Contact Us</a></li>
                    </ul>
                </div>
                {/* Our Services */}
                <div>
                    <h4 className="font-playfair text-lg font-bold mb-4">Our Services</h4>
                    <ul className="font-crimson text-cream/80 space-y-2">
                        <li>Life Insurance</li>
                        <li>Health Insurance</li>
                        <li>Mutual Funds</li>
                        <li>Equity Trading</li>
                        <li>Fixed Income</li>
                        <li>Commodity Trading</li>
                    </ul>
                </div>
                {/* Contact Us */}
                <div>
                    <h4 className="font-playfair text-lg font-bold mb-4">Contact Us</h4>
                    <ul className="font-crimson text-cream/80 space-y-3">
                        <li className="flex items-start gap-2">
                            <MapPin className="w-5 h-5 text-secondary mt-1" />
                            <div>
                                <div className="font-crimson font-semibold text-cream text-base">Office Address</div>
                                <div className="font-crimson text-cream/80 text-sm">
                                    1st Floor, Room No.12, Shree Krishna Niwas,<br />
                                    Above Panshikhar Sweets, Opposite Ajay Shopping Centre,<br />
                                    T.H.Kataria Marg, Matunga West, Mumbai – 400016
                                </div>
                            </div>
                        </li>
                        <li className="flex items-center gap-2"><Phone className="w-5 h-5 text-secondary" /> <a href="tel:+919876543210" className="hover:text-secondary transition-colors duration-200">+91 98765 43210</a></li>
                        <li className="flex items-center gap-2"><Mail className="w-5 h-5 text-secondary" /> <a href="mailto:hariainvestments9@gmail.com" className="hover:text-secondary transition-colors duration-200">hariainvestments9@gmail.com</a></li>
                    </ul>
                    <div className="mt-4">
                        <div className="font-crimson text-cream/80 mb-1">Certifications</div>
                        <div className="flex items-center gap-3 mt-1">
                            <span title="ISO Certified" className="flex items-center gap-1"><Award className="w-5 h-5 text-secondary" /> ISO Certified</span>
                            <span title="65+ Years" className="flex items-center gap-1"><Users className="w-5 h-5 text-secondary" /> 65+ Years</span>
                        </div>
                    </div>
                </div>
            </div>
            {/* Bottom Row */}
            <div className="flex flex-col lg:flex-row gap-8 justify-between items-stretch pb-10 border-t border-cream/20 pt-10">
                {/* Visit Our Office + Map */}
                <div className="w-full lg:w-1/2 mb-8 lg:mb-0 flex flex-col justify-center">
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
                <div className="w-full lg:w-1/2 flex flex-col justify-center items-start mx-auto">
                    <h4 className="font-playfair text-xl font-bold mb-4">Why Choose Us?</h4>
                    <ul className="font-crimson text-cream/90 space-y-2 list-disc pl-5">
                        <li>65+ years of trusted financial expertise</li>
                        <li>SEBI registered and compliant</li>
                        <li>Personalized investment strategies</li>
                        <li>Comprehensive insurance solutions</li>
                        <li>Expert guidance for all life stages</li>
                    </ul>
                </div>
            </div>
            <div className="text-center text-xs text-cream/60 font-crimson py-6">
                &copy; {new Date().getFullYear()} Haria Investments. All rights reserved.
            </div>
        </div>
    </footer>
);

export default Footer; 