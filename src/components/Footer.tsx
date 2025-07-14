import React from "react";

const Footer = () => (
    <footer data-aos="fade-up" className="bg-tertiary text-cream py-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-8 mb-8">
                <div className="text-center lg:text-left">
                    <h4 className="footer-col-title font-playfair text-lg font-bold mb-4">Navigate</h4>
                    <ul className="font-crimson text-cream/80 space-y-2">
                        <li><a href="#hero" className="hover:underline">Home</a></li>
                        <li><a href="#about" className="hover:underline">About</a></li>
                        <li><a href="#services" className="hover:underline">Services</a></li>
                        <li><a href="#results" className="hover:underline">Results</a></li>
                        <li><a href="#insights" className="hover:underline">Insights</a></li>
                        <li><a href="#process" className="hover:underline">Process</a></li>
                        <li><a href="#credentials" className="hover:underline">Credentials</a></li>
                        <li><a href="#contact" className="hover:underline">Contact</a></li>
                    </ul>
                </div>
                <div className="text-center lg:text-left">
                    <h4 className="footer-col-title font-playfair text-lg font-bold mb-4">About Us</h4>
                    <ul className="font-crimson text-cream/80 space-y-2">
                        <li>Our Heritage</li>
                        <li>Team</li>
                        <li>Values</li>
                    </ul>
                </div>
                <div className="text-center lg:text-left">
                    <h4 className="footer-col-title font-playfair text-lg font-bold mb-4">Services</h4>
                    <ul className="font-crimson text-cream/80 space-y-2">
                        <li>Wealth Management</li>
                        <li>Tax Planning</li>
                        <li>Retirement</li>
                        <li>Estate Planning</li>
                    </ul>
                </div>
                <div className="text-center lg:text-left">
                    <h4 className="footer-col-title font-playfair text-lg font-bold mb-4">Resources</h4>
                    <ul className="font-crimson text-cream/80 space-y-2">
                        <li>Blog</li>
                        <li>FAQs</li>
                        <li>Client Stories</li>
                    </ul>
                </div>
                <div className="text-center lg:text-left flex flex-col items-center lg:items-start">
                    <h4 className="footer-col-title font-playfair text-lg font-bold mb-4">Newsletter</h4>
                    <form className="flex flex-col gap-3 w-full max-w-xs sm:max-w-sm md:max-w-none">
                        <input
                            type="email"
                            placeholder="Your email address"
                            className="footer-newsletter-input px-4 py-2 rounded-lg border border-champagne focus:outline-none focus:ring-2 focus:ring-champagne focus:border-champagne font-crimson w-full"
                        />
                        <button type="submit" className="btn-glow bg-secondary text-secondary-foreground font-crimson rounded-lg py-2 mt-2 hover:bg-secondary/90 transition-all w-full">
                            Subscribe
                        </button>
                    </form>
                </div>
            </div>
            <div className="text-center text-xs text-cream/60 font-crimson mt-8">
                &copy; {new Date().getFullYear()} Haria Investments. All rights reserved.
            </div>
        </div>
    </footer>
);

export default Footer; 