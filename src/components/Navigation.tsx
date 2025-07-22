import { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { Menu, X, ChevronDown, Shield, BarChart3, PiggyBank, Zap, Home, Calculator, Heart, Umbrella, TrendingUp, PieChart, Plus, Minus } from "lucide-react";
import { Link } from 'react-router-dom';
import { FaRupeeSign, FaUniversity, FaUserClock, FaHeartbeat } from 'react-icons/fa';
import { motion, AnimatePresence } from 'framer-motion';
import logo from '@/assets/logo.png';

interface NavigationProps {
  isTransparent?: boolean;
}

const Navigation: React.FC<NavigationProps> = ({ isTransparent = false }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isInsuranceDropdownOpen, setIsInsuranceDropdownOpen] = useState(false);
  const [isInvestmentDropdownOpen, setIsInvestmentDropdownOpen] = useState(false);
  const [isCalcDropdownOpen, setIsCalcDropdownOpen] = useState(false);
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Disable body scroll when mobile menu is open
  useEffect(() => {
    if (isMobileMenuOpen) {
      // Disable scrolling on body and html
      document.body.style.overflow = 'hidden';
      document.documentElement.style.overflow = 'hidden';
    } else {
      // Re-enable scrolling
      document.body.style.overflow = '';
      document.documentElement.style.overflow = '';
    }

    return () => {
      // Cleanup on unmount
      document.body.style.overflow = '';
      document.documentElement.style.overflow = '';
    };
  }, [isMobileMenuOpen]);

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
      setIsMobileMenuOpen(false);
    }
  };

  const insuranceLinks = [
    {
      label: 'Life Insurance',
      to: '/life-insurance',
      icon: <Heart className="text-secondary w-5 h-5 mr-2" />,
    },
    {
      label: 'General Insurance',
      to: '/general-insurance',
      icon: <Umbrella className="text-secondary w-5 h-5 mr-2" />,
    },
  ];

  const investmentLinks = [
    {
      label: 'Mutual Funds',
      to: '/mutual-funds',
      icon: <TrendingUp className="text-secondary w-5 h-5 mr-2" />,
    },
    {
      label: 'Equity Investment',
      to: '/equity-investment',
      icon: <PieChart className="text-secondary w-5 h-5 mr-2" />,
    },
  ];

  const calculatorLinks = [
    {
      label: 'SIP Calculator',
      to: '/sip-calculator',
      icon: <FaRupeeSign className="text-secondary w-5 h-5 mr-2" />,
    },
    {
      label: 'FD Calculator',
      to: '/fd-calculator',
      icon: <FaUniversity className="text-secondary w-5 h-5 mr-2" />,
    },
    {
      label: 'Retirement Calculator',
      to: '/retirement-calculator',
      icon: <FaUserClock className="text-secondary w-5 h-5 mr-2" />,
    },
    {
      label: 'Emergency Fund Calculator',
      to: '/emergency-fund-calculator',
      icon: <FaHeartbeat className="text-secondary w-5 h-5 mr-2" />,
    },
  ];

  const navbarClass = isTransparent && !isScrolled
    ? 'bg-transparent'
    : 'bg-background/95 backdrop-blur-md shadow-elegant';

  return (
    <>
      {/* Navbar */}
      <nav className={`fixed top-0 w-full z-50 transition-all duration-500 ${navbarClass}`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            {/* Logo */}
            <div className="flex-shrink-0 flex items-center gap-3">
              <img src={logo} alt="Haria Investments Logo" className="w-10 h-10 object-contain" />
              <div>
                <div className="font-playfair font-bold text-2xl text-tertiary">
                  HARIA INVESTMENTS
                </div>
                <div className="text-xs text-muted-foreground font-crimson">
                  Your trusted financial partner since 1957
                </div>
              </div>
            </div>

            {/* Desktop Navigation */}
            <div className="flex-1 hidden lg:flex items-center justify-center space-x-6">
              {/* Home Link */}
              <Link
                to="/"
                className="text-tertiary hover:text-secondary transition-colors duration-300 font-crimson font-medium flex items-center gap-1"
              >
                <Home className="w-4 h-4" />
                Home
              </Link>

              {/* Insurance Dropdown */}
              <div
                className="relative"
                onMouseEnter={() => setIsInsuranceDropdownOpen(true)}
                onMouseLeave={() => setIsInsuranceDropdownOpen(false)}
              >
                <button
                  className="text-tertiary hover:text-secondary transition-colors duration-300 font-crimson font-medium flex items-center gap-1"
                  type="button"
                >
                  <Shield className="w-4 h-4" />
                  Insurance
                  <ChevronDown className={`ml-1 w-4 h-4 transition-transform duration-200 ${isInsuranceDropdownOpen ? 'rotate-180' : ''}`} />
                </button>
                <AnimatePresence>
                  {isInsuranceDropdownOpen && (
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 10 }}
                      transition={{ duration: 0.18 }}
                      className="absolute left-1/2 -translate-x-1/2 mt-2 w-56 bg-white shadow-lg rounded-xl p-4 z-50"
                    >
                      {insuranceLinks.map(link => (
                        <Link
                          key={link.to}
                          to={link.to}
                          className="flex items-center px-3 py-2 rounded-lg text-tertiary hover:bg-gray-100 transition-colors font-crimson text-base"
                        >
                          {link.icon}
                          {link.label}
                        </Link>
                      ))}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              {/* Investment Dropdown */}
              <div
                className="relative"
                onMouseEnter={() => setIsInvestmentDropdownOpen(true)}
                onMouseLeave={() => setIsInvestmentDropdownOpen(false)}
              >
                <button
                  className="text-tertiary hover:text-secondary transition-colors duration-300 font-crimson font-medium flex items-center gap-1"
                  type="button"
                >
                  <BarChart3 className="w-4 h-4" />
                  Investment
                  <ChevronDown className={`ml-1 w-4 h-4 transition-transform duration-200 ${isInvestmentDropdownOpen ? 'rotate-180' : ''}`} />
                </button>
                <AnimatePresence>
                  {isInvestmentDropdownOpen && (
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 10 }}
                      transition={{ duration: 0.18 }}
                      className="absolute left-1/2 -translate-x-1/2 mt-2 w-56 bg-white shadow-lg rounded-xl p-4 z-50"
                    >
                      {investmentLinks.map(link => (
                        <Link
                          key={link.to}
                          to={link.to}
                          className="flex items-center px-3 py-2 rounded-lg text-tertiary hover:bg-gray-100 transition-colors font-crimson text-base"
                        >
                          {link.icon}
                          {link.label}
                        </Link>
                      ))}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              {/* Fixed Income */}
              <Link
                to="/fixed-income"
                className="text-tertiary hover:text-secondary transition-colors duration-300 font-crimson font-medium flex items-center gap-1"
              >
                <PiggyBank className="w-4 h-4" />
                Fixed Income
              </Link>

              {/* Commodity Trading */}
              <Link
                to="/commodity-trading"
                className="text-tertiary hover:text-secondary transition-colors duration-300 font-crimson font-medium flex items-center gap-1"
              >
                <Zap className="w-4 h-4" />
                CDT
              </Link>

              {/* Calculators Dropdown */}
              <div
                className="relative"
                onMouseEnter={() => setIsCalcDropdownOpen(true)}
                onMouseLeave={() => setIsCalcDropdownOpen(false)}
              >
                <button
                  className="text-tertiary hover:text-secondary transition-colors duration-300 font-crimson font-medium flex items-center gap-1"
                  type="button"
                >
                  <Calculator className="w-4 h-4" />
                  Calculator
                  <ChevronDown className={`ml-1 w-4 h-4 transition-transform duration-200 ${isCalcDropdownOpen ? 'rotate-180' : ''}`} />
                </button>
                <AnimatePresence>
                  {isCalcDropdownOpen && (
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 10 }}
                      transition={{ duration: 0.18 }}
                      className="absolute left-1/2 -translate-x-1/2 mt-2 w-64 bg-white shadow-lg rounded-xl p-4 z-50"
                    >
                      {calculatorLinks.map(link => (
                        <Link
                          key={link.to}
                          to={link.to}
                          className="flex items-center px-3 py-2 rounded-lg text-tertiary hover:bg-gray-100 transition-colors font-crimson text-base"
                        >
                          {link.icon}
                          {link.label}
                        </Link>
                      ))}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </div>

            {/* Desktop CTA */}
            <div className="hidden lg:flex items-center" style={{ marginLeft: 'auto' }}>
              <Button
                onClick={() => scrollToSection('contact')}
                className="bg-secondary text-secondary-foreground hover:bg-secondary/90 font-crimson font-semibold px-6"
              >
                Schedule Consultation
              </Button>
            </div>

            {/* Mobile Menu Button */}
            <div className="lg:hidden">
              <button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="text-tertiary hover:text-secondary transition-colors duration-300"
              >
                {isMobileMenuOpen ? (
                  <X className="h-6 w-6" />
                ) : (
                  <Menu className="h-6 w-6" />
                )}
              </button>
            </div>
          </div>

          {/* Mobile Menu */}
          {isMobileMenuOpen && (
            <div className="lg:hidden fixed top-0 left-0 w-full h-screen bg-background rounded-none shadow-elegant z-[100] animate-slide-down flex flex-col">
              <div className="flex flex-col flex-1 overflow-y-auto px-4 pt-16 pb-4">
                {/* Home Link */}
                <Link
                  to="/"
                  className="flex items-center text-tertiary hover:text-secondary transition-colors duration-300 font-crimson font-medium text-xl py-4 w-full text-left"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  <Home className="w-5 h-5 mr-3" />
                  Home
                </Link>
                <hr className="border-gray-400 my-3" />

                {/* Insurance Dropdown (Mobile) */}
                <div>
                  <button
                    onClick={() => setOpenDropdown(openDropdown === 'insurance' ? null : 'insurance')}
                    className="flex items-center justify-between w-full text-tertiary hover:text-secondary transition-colors duration-300 font-crimson font-medium text-xl py-4"
                  >
                    <span className="flex items-center">
                      <Shield className="w-5 h-5 mr-3" />
                      Insurance
                    </span>
                    {openDropdown === 'insurance' ? (
                      <Minus className="ml-2 w-5 h-5 transition-transform duration-200" />
                    ) : (
                      <Plus className="ml-2 w-5 h-5 transition-transform duration-200" />
                    )}
                  </button>
                  <AnimatePresence>
                    {openDropdown === 'insurance' && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.18 }}
                        className="pl-8 pr-2 pt-2 pb-2 space-y-2"
                      >
                        {insuranceLinks.map(link => (
                          <Link
                            key={link.to}
                            to={link.to}
                            className="flex items-center px-3 py-2 rounded-lg text-tertiary hover:bg-gray-100 transition-colors font-crimson text-base"
                            onClick={() => setIsMobileMenuOpen(false)}
                          >
                            {link.icon}
                            {link.label}
                          </Link>
                        ))}
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
                <hr className="border-gray-400 my-3" />

                {/* Investment Dropdown (Mobile) */}
                <div>
                  <button
                    onClick={() => setOpenDropdown(openDropdown === 'investment' ? null : 'investment')}
                    className="flex items-center justify-between w-full text-tertiary hover:text-secondary transition-colors duration-300 font-crimson font-medium text-xl py-4"
                  >
                    <span className="flex items-center">
                      <BarChart3 className="w-5 h-5 mr-3" />
                      Investment
                    </span>
                    {openDropdown === 'investment' ? (
                      <Minus className="ml-2 w-5 h-5 transition-transform duration-200" />
                    ) : (
                      <Plus className="ml-2 w-5 h-5 transition-transform duration-200" />
                    )}
                  </button>
                  <AnimatePresence>
                    {openDropdown === 'investment' && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.18 }}
                        className="pl-8 pr-2 pt-2 pb-2 space-y-2"
                      >
                        {investmentLinks.map(link => (
                          <Link
                            key={link.to}
                            to={link.to}
                            className="flex items-center px-3 py-2 rounded-lg text-tertiary hover:bg-gray-100 transition-colors font-crimson text-base"
                            onClick={() => setIsMobileMenuOpen(false)}
                          >
                            {link.icon}
                            {link.label}
                          </Link>
                        ))}
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
                <hr className="border-gray-400 my-3" />

                {/* Fixed Income */}
                <Link
                  to="/fixed-income"
                  className="flex items-center text-tertiary hover:text-secondary transition-colors duration-300 font-crimson font-medium text-xl py-4 w-full text-left"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  <PiggyBank className="w-5 h-5 mr-3" />
                  Fixed Income
                </Link>
                <hr className="border-gray-400 my-3" />

                {/* Commodity Trading */}
                <Link
                  to="/commodity-trading"
                  className="flex items-center text-tertiary hover:text-secondary transition-colors duration-300 font-crimson font-medium text-xl py-4 w-full text-left"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  <Zap className="w-5 h-5 mr-3" />
                  Commodity Derivatives Trading
                </Link>
                <hr className="border-gray-400 my-3" />

                {/* Calculators Dropdown (Mobile) */}
                <div>
                  <button
                    onClick={() => setOpenDropdown(openDropdown === 'calculator' ? null : 'calculator')}
                    className="flex items-center justify-between w-full text-tertiary hover:text-secondary transition-colors duration-300 font-crimson font-medium text-xl py-4"
                  >
                    <span className="flex items-center">
                      <Calculator className="w-5 h-5 mr-3" />
                      Calculator
                    </span>
                    {openDropdown === 'calculator' ? (
                      <Minus className="ml-2 w-5 h-5 transition-transform duration-200" />
                    ) : (
                      <Plus className="ml-2 w-5 h-5 transition-transform duration-200" />
                    )}
                  </button>
                  <AnimatePresence>
                    {openDropdown === 'calculator' && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.18 }}
                        className="pl-8 pr-2 pt-2 pb-2 space-y-2"
                      >
                        {calculatorLinks.map(link => (
                          <Link
                            key={link.to}
                            to={link.to}
                            className="flex items-center px-3 py-2 rounded-lg text-tertiary hover:bg-gray-100 transition-colors font-crimson text-base"
                            onClick={() => setIsMobileMenuOpen(false)}
                          >
                            {link.icon}
                            {link.label}
                          </Link>
                        ))}
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
                <hr className="border-gray-400 my-3" />

                <div className="pt-6 pb-4">
                  <Button
                    onClick={() => scrollToSection('contact')}
                    className="w-full bg-secondary text-secondary-foreground hover:bg-secondary/90 font-crimson font-semibold text-lg py-4"
                    style={{ minHeight: '48px' }}
                  >
                    Schedule Consultation
                  </Button>
                </div>
              </div>
              {/* Keep hamburger/X always visible */}
              <button
                onClick={() => setIsMobileMenuOpen(false)}
                className="absolute top-6 right-6 text-tertiary hover:text-secondary transition-colors duration-300 z-[101] bg-background/80 rounded-full p-2 shadow"
                aria-label="Close menu"
              >
                <X className="h-8 w-8" />
              </button>
            </div>
          )}
        </div>
      </nav>

    </>
  );
};

export default Navigation;
