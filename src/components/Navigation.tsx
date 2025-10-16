import { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { Menu, X, ChevronDown, Shield, BarChart3, PiggyBank, Zap, Calculator, Heart, Umbrella, TrendingUp, PieChart, Plus, Minus, Coins, LineChart, Gem, PackageSearch, ArrowRight } from "lucide-react";
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { FaRupeeSign, FaUserClock } from 'react-icons/fa';
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
  const [hoveredInsuranceParent, setHoveredInsuranceParent] = useState<string | null>(null);
  const [hoveredInvestmentParent, setHoveredInvestmentParent] = useState<string | null>(null);
  
  const navigate = useNavigate();
  const location = useLocation();

  // Simple scroll detection
  useEffect(() => {
    const handleScroll = () => {
      const scrolled = window.scrollY > 50;
      setIsScrolled(scrolled);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Handle hash navigation (for #contact links)
  useEffect(() => {
    if (location.hash === '#contact') {
      const timer = setTimeout(() => {
        const contactElement = document.getElementById('contact');
        if (contactElement) {
          contactElement.scrollIntoView({ behavior: 'smooth' });
        }
      }, 100);
      return () => clearTimeout(timer);
    }
  }, [location.hash]);

  // Disable body scroll when mobile menu is open
  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = 'hidden';
      document.documentElement.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
      document.documentElement.style.overflow = '';
    }

    return () => {
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

  const handleScheduleConsultation = () => {
    setIsMobileMenuOpen(false);
    
    // If we're on the landing page, scroll to contact section
    if (location.pathname === '/') {
      const contactElement = document.getElementById('contact');
      if (contactElement) {
        contactElement.scrollIntoView({ behavior: 'smooth' });
      }
    } else {
      // If we're on any other page, navigate to landing page contact section
      navigate('/#contact');
      // Small delay to ensure navigation completes before scrolling
      setTimeout(() => {
        const contactElement = document.getElementById('contact');
        if (contactElement) {
          contactElement.scrollIntoView({ behavior: 'smooth' });
        }
      }, 100);
    }
  };

  const insuranceLinks = [
    {
      label: 'Life Insurance',
      to: '/life-insurance',
      icon: <Heart className="text-secondary w-5 h-5 mr-2" />,
      children: [
        { label: 'Term Insurance', to: '/life-insurance#term-insurance' },
        { label: 'Whole Life Insurance', to: '/life-insurance#whole-life-insurance' },
        { label: 'Endowment Plans', to: '/life-insurance#endowment-plans' },
        { label: 'ULIP Plans', to: '/life-insurance#ulip-plans' },
        { label: 'Money-Back Plans', to: '/life-insurance#money-back-plans' },
        { label: 'Pension Plans', to: '/life-insurance#pension-plans' },
      ]
    },
    {
      label: 'General Insurance',
      to: '/general-insurance',
      icon: <Umbrella className="text-secondary w-5 h-5 mr-2" />,
      children: [
        { label: 'Car Insurance', to: '/general-insurance#car' },
        { label: 'Property Insurance', to: '/general-insurance#property' },
        { label: 'Fire Insurance', to: '/general-insurance#fire' },
        { label: 'Travel Insurance', to: '/general-insurance#travel' },
      ]
    },
  ];

  const investmentLinks = [
    {
      label: 'Mutual Funds',
      to: '/mutual-funds',
      icon: <TrendingUp className="text-secondary w-5 h-5 mr-2" />,
      children: [
        { label: 'Investment Categories', to: '/mutual-funds#investment-categories' },
        { label: 'Top Performing Funds', to: '/mutual-funds#top-funds' },
      ]
    },
    {
      label: 'Equity Investment',
      to: '/equity-investment',
      icon: <PieChart className="text-secondary w-5 h-5 mr-2" />,
      children: [
        { label: 'Direct Stock Investment', to: '/equity-investment#direct-stock-investment' },
        { label: 'Expert Portfolio Advisory', to: '/equity-investment#expert-portfolio-advisory' },
      ]
    },
    {
      label: 'PMS',
      to: '/portfolio-management',
      icon: <BarChart3 className="text-secondary w-5 h-5 mr-2" />,
    },
  ];

  const calculatorLinks = [
    {
      label: 'SIP Calculator',
      to: '/sip-calculator',
      icon: <FaRupeeSign className="text-secondary w-5 h-5 mr-2" />,
    },
    {
      label: 'SWP Calculator',
      to: '/swp-calculator',
      icon: <FaUserClock className="text-secondary w-5 h-5 mr-2" />,
    },
    {
      label: 'Lumpsum Calculator',
      to: '/lumpsum-calculator',
      icon: <Coins className="text-secondary w-5 h-5 mr-2" />,
    },
    {
      label: 'CAGR Calculator',
      to: '/cagr-calculator',
      icon: <LineChart className="text-secondary w-5 h-5 mr-2" />,
    },
  ];

  const commodityLinks = [
    {
      label: 'Commodity Overview',
      to: '/commodity-trading',
      icon: <Zap className="text-secondary w-5 h-5 mr-2" />,
    },
    {
      label: 'Gold & Silver',
      to: '/gold-silver',
      icon: <Gem className="text-secondary w-5 h-5 mr-2" />,
    },
    {
      label: 'Other Derivatives',
      to: '/other-derivatives',
      icon: <PackageSearch className="text-secondary w-5 h-5 mr-2" />,
    },
  ];

  return (
    <>
      {/* Simple, reliable navbar */}
      <header 
        className={`fixed top-0 left-0 w-full z-[9999] transition-all duration-300 ${
          isScrolled 
            ? 'bg-white/95 backdrop-blur-xl shadow-lg border-b border-white/20' 
            : 'bg-gradient-to-b from-white/95 via-white/90 to-white/85 backdrop-blur-lg shadow-md'
        }`}
        style={{
          background: isScrolled 
            ? 'linear-gradient(135deg, rgba(255,255,255,0.98) 0%, rgba(255,255,255,0.95) 100%)' 
            : 'linear-gradient(135deg, rgba(255,255,255,0.95) 0%, rgba(255,255,255,0.90) 50%, rgba(255,255,255,0.85) 100%)',
          backdropFilter: 'blur(20px) saturate(180%)',
          WebkitBackdropFilter: 'blur(20px) saturate(180%)',
          borderBottom: isScrolled ? '1px solid rgba(255,255,255,0.3)' : '1px solid rgba(255,255,255,0.2)'
        }}
      >
        <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-20">
            {/* Logo */}
            <button 
              onClick={() => {
                if (location.pathname === '/') {
                  // Already on landing page, scroll to hero
                  const heroElement = document.getElementById('hero');
                  if (heroElement) {
                    heroElement.scrollIntoView({ behavior: 'smooth' });
                  }
                } else {
                  // Navigate to landing page then scroll to hero
                  navigate('/');
                  setTimeout(() => {
                    const heroElement = document.getElementById('hero');
                    if (heroElement) {
                      heroElement.scrollIntoView({ behavior: 'smooth' });
                    }
                  }, 100);
                }
              }}
              className="flex items-center gap-3 hover:opacity-80 transition-opacity cursor-pointer"
            >
              <img src={logo} alt="Haria Investments Logo" className="w-12 h-12 object-contain" />
              <div>
                <div className="font-playfair font-bold text-2xl text-tertiary" style={{ 
                  textShadow: '0 1px 3px rgba(255,255,255,0.9), 0 0 10px rgba(255,255,255,0.4)' 
                }}>
                  Haria Investments
                </div>
                <div className="text-sm font-semibold font-crimson text-tertiary/80" style={{ 
                  textShadow: '0 1px 2px rgba(255,255,255,0.8)' 
                }}>
                  since 1957
                </div>
              </div>
            </button>

            {/* Desktop Navigation */}
            <div className="hidden lg:flex items-center space-x-8">
              {/* Insurance Dropdown */}
              <div
                className="relative"
                onMouseEnter={() => setIsInsuranceDropdownOpen(true)}
                onMouseLeave={() => setIsInsuranceDropdownOpen(false)}
              >
                <button className="text-tertiary hover:text-secondary transition-colors font-crimson font-semibold text-lg flex items-center gap-1" style={{ 
                  textShadow: '0 1px 2px rgba(255,255,255,0.8), 0 0 6px rgba(255,255,255,0.3)' 
                }}>
                  Insurance
                  <ChevronDown className={`w-4 h-4 transition-transform ${isInsuranceDropdownOpen ? 'rotate-180' : ''}`} />
                </button>
                <AnimatePresence>
                  {isInsuranceDropdownOpen && (
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 10 }}
                      className="absolute left-1/2 -translate-x-1/2 mt-2 w-64 bg-white shadow-xl rounded-lg p-4 border border-gray-100"
                    >
                      {insuranceLinks.map(link => (
                        <div
                          key={link.to}
                          className="relative"
                          onMouseEnter={() => setHoveredInsuranceParent(link.label)}
                          onMouseLeave={() => setHoveredInsuranceParent(null)}
                        >
                          <Link
                            to={link.to}
                            className="flex items-center justify-between px-3 py-2 rounded-lg text-tertiary hover:bg-gray-50 transition-colors font-crimson"
                          >
                            <div className="flex items-center">
                              {link.icon}
                              {link.label}
                            </div>
                            {link.children && <ChevronDown className="w-4 h-4 opacity-60" />}
                          </Link>
                          {link.children && hoveredInsuranceParent === link.label && (
                            <div className="absolute left-full top-0 ml-2">
                              <div className="w-56 bg-white shadow-xl rounded-lg p-3 border border-gray-100">
                                {link.children.map(child => (
                                  <Link 
                                    key={child.to} 
                                    to={child.to} 
                                    className="block px-3 py-2 rounded-lg text-tertiary hover:bg-gray-50 transition-colors font-crimson text-sm"
                                  >
                                    {child.label}
                                  </Link>
                                ))}
                              </div>
                            </div>
                          )}
                        </div>
                      ))}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              {/* Investment Dropdown */}
              <div
                className="relative"
                onMouseEnter={() => setIsInvestmentDropdownOpen(true)}
                onMouseLeave={() => { setIsInvestmentDropdownOpen(false); setHoveredInvestmentParent(null); }}
              >
                <button className="text-tertiary hover:text-secondary transition-colors font-crimson font-semibold text-lg flex items-center gap-1" style={{ 
                  textShadow: '0 1px 2px rgba(255,255,255,0.8), 0 0 6px rgba(255,255,255,0.3)' 
                }}>
                  Investment
                  <ChevronDown className={`w-4 h-4 transition-transform ${isInvestmentDropdownOpen ? 'rotate-180' : ''}`} />
                </button>
                <AnimatePresence>
                  {isInvestmentDropdownOpen && (
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 10 }}
                      className="absolute left-1/2 -translate-x-1/2 mt-2 w-64 bg-white shadow-xl rounded-lg p-4 border border-gray-100"
                    >
                      {investmentLinks.map(link => (
                        <div
                          key={link.to}
                          className="relative"
                          onMouseEnter={() => setHoveredInvestmentParent(link.label)}
                          onMouseLeave={() => setHoveredInvestmentParent(null)}
                        >
                          <Link
                            to={link.to}
                            className="flex items-center justify-between px-3 py-2 rounded-lg text-tertiary hover:bg-gray-50 transition-colors font-crimson"
                          >
                            <div className="flex items-center">
                              {link.icon}
                              {link.label}
                            </div>
                            {link.children && <ChevronDown className="w-4 h-4 opacity-60" />}
                          </Link>
                          {link.children && hoveredInvestmentParent === link.label && (
                            <div className="absolute left-full top-0 ml-2">
                              <div className="w-64 bg-white shadow-xl rounded-lg p-3 border border-gray-100">
                                {link.children.map(child => (
                                  <Link 
                                    key={child.to} 
                                    to={child.to} 
                                    className="block px-3 py-2 rounded-lg text-tertiary hover:bg-gray-50 transition-colors font-crimson text-sm"
                                  >
                                    {child.label}
                                  </Link>
                                ))}
                              </div>
                            </div>
                          )}
                        </div>
                      ))}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              {/* Fixed Income */}
              <div
                className="relative"
                onMouseEnter={() => setOpenDropdown('fixed-income')}
                onMouseLeave={() => setOpenDropdown(null)}
              >
                <button className="text-tertiary hover:text-secondary transition-colors font-crimson font-semibold text-lg flex items-center gap-1" style={{ 
                  textShadow: '0 1px 2px rgba(255,255,255,0.8), 0 0 6px rgba(255,255,255,0.3)' 
                }}>
                  Fixed Income
                  <ChevronDown className={`w-4 h-4 transition-transform ${openDropdown === 'fixed-income' ? 'rotate-180' : ''}`} />
                </button>
                <AnimatePresence>
                  {openDropdown === 'fixed-income' && (
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 10 }}
                      className="absolute left-1/2 -translate-x-1/2 mt-2 w-64 bg-white shadow-xl rounded-lg p-4 border border-gray-100"
                    >
                      <Link to="/fixed-income#products" className="block px-3 py-2 rounded-lg text-tertiary hover:bg-gray-50 transition-colors font-crimson">Products</Link>
                      <Link to="/fixed-income#laddering-strategy" className="block px-3 py-2 rounded-lg text-tertiary hover:bg-gray-50 transition-colors font-crimson">Laddering Strategy</Link>
                      <Link to="/fixed-income#top-bank-fds" className="block px-3 py-2 rounded-lg text-tertiary hover:bg-gray-50 transition-colors font-crimson">Top Bank FDs</Link>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              {/* Commodities */}
              <div
                className="relative"
                onMouseEnter={() => setOpenDropdown('commodities')}
                onMouseLeave={() => setOpenDropdown(null)}
              >
                <button className="text-tertiary hover:text-secondary transition-colors font-crimson font-semibold text-lg flex items-center gap-1" style={{ 
                  textShadow: '0 1px 2px rgba(255,255,255,0.8), 0 0 6px rgba(255,255,255,0.3)' 
                }}>
                  Commodities
                  <ChevronDown className={`w-4 h-4 transition-transform ${openDropdown === 'commodities' ? 'rotate-180' : ''}`} />
                </button>
                <AnimatePresence>
                  {openDropdown === 'commodities' && (
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 10 }}
                      className="absolute left-1/2 -translate-x-1/2 mt-2 w-64 bg-white shadow-xl rounded-lg p-4 border border-gray-100"
                    >
                      {commodityLinks.map(link => (
                        <Link
                          key={link.to}
                          to={link.to}
                          className="flex items-center px-3 py-2 rounded-lg text-tertiary hover:bg-gray-50 transition-colors font-crimson"
                        >
                          {link.icon}
                          {link.label}
                        </Link>
                      ))}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              {/* Calculator */}
              <div
                className="relative"
                onMouseEnter={() => setIsCalcDropdownOpen(true)}
                onMouseLeave={() => setIsCalcDropdownOpen(false)}
              >
                <button className="text-tertiary hover:text-secondary transition-colors font-crimson font-semibold text-lg flex items-center gap-1" style={{ 
                  textShadow: '0 1px 2px rgba(255,255,255,0.8), 0 0 6px rgba(255,255,255,0.3)' 
                }}>
                  Calculator
                  <ChevronDown className={`w-4 h-4 transition-transform ${isCalcDropdownOpen ? 'rotate-180' : ''}`} />
                </button>
                <AnimatePresence>
                  {isCalcDropdownOpen && (
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 10 }}
                      className="absolute left-1/2 -translate-x-1/2 mt-2 w-64 bg-white shadow-xl rounded-lg p-4 border border-gray-100"
                    >
                      {calculatorLinks.map(link => (
                        <Link
                          key={link.to}
                          to={link.to}
                          className="flex items-center px-3 py-2 rounded-lg text-tertiary hover:bg-gray-50 transition-colors font-crimson"
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

            {/* CTA Button */}
            <div className="hidden lg:flex">
              <button 
                onClick={handleScheduleConsultation}
                className="bg-secondary hover:bg-secondary/90 text-white px-6 py-2.5 rounded-full font-semibold font-crimson transition-all shadow-lg hover:shadow-xl flex items-center gap-2"
              >
                <span>Schedule Consultation</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>

            {/* Mobile Menu Button */}
            <div className="lg:hidden">
              <button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="text-tertiary hover:text-secondary transition-colors p-2"
                aria-label={isMobileMenuOpen ? "Close menu" : "Open menu"}
              >
                {isMobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
              </button>
            </div>
          </div>

          {/* Mobile Menu */}
          <AnimatePresence>
            {isMobileMenuOpen && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                className="lg:hidden bg-white border-t border-gray-200 py-4"
              >
                <div className="space-y-4">
                  {/* Mobile Insurance */}
                  <div>
                    <button
                      onClick={() => setOpenDropdown(openDropdown === 'insurance' ? null : 'insurance')}
                      className="flex items-center justify-between w-full text-tertiary font-crimson font-semibold text-lg py-2"
                    >
                      <span className="flex items-center">
                        <Shield className="w-5 h-5 mr-3" />
                        Insurance
                      </span>
                      {openDropdown === 'insurance' ? <Minus className="w-5 h-5" /> : <Plus className="w-5 h-5" />}
                    </button>
                    {openDropdown === 'insurance' && (
                      <div className="mt-2 pl-8 space-y-1">
                        {insuranceLinks.map(link => (
                          <div key={link.to}>
                            <Link
                              to={link.to}
                              className="flex items-center py-2 text-tertiary font-crimson"
                              onClick={() => setIsMobileMenuOpen(false)}
                            >
                              {link.icon}
                              {link.label}
                            </Link>
                            {link.children && (
                              <div className="pl-6 space-y-1">
                                {link.children.map(child => (
                                  <Link
                                    key={child.to}
                                    to={child.to}
                                    className="block py-1 text-tertiary/80 font-crimson text-sm"
                                    onClick={() => setIsMobileMenuOpen(false)}
                                  >
                                    {child.label}
                                  </Link>
                                ))}
                              </div>
                            )}
                          </div>
                        ))}
                      </div>
                    )}
                  </div>

                  {/* Mobile Investment */}
                  <div>
                    <button
                      onClick={() => setOpenDropdown(openDropdown === 'investment' ? null : 'investment')}
                      className="flex items-center justify-between w-full text-tertiary font-crimson font-semibold text-lg py-2"
                    >
                      <span className="flex items-center">
                        <BarChart3 className="w-5 h-5 mr-3" />
                        Investment
                      </span>
                      {openDropdown === 'investment' ? <Minus className="w-5 h-5" /> : <Plus className="w-5 h-5" />}
                    </button>
                    {openDropdown === 'investment' && (
                      <div className="mt-2 pl-8 space-y-1">
                        {investmentLinks.map(link => (
                          <div key={link.to}>
                            <Link
                              to={link.to}
                              className="flex items-center py-2 text-tertiary font-crimson"
                              onClick={() => setIsMobileMenuOpen(false)}
                            >
                              {link.icon}
                              {link.label}
                            </Link>
                            {link.children && (
                              <div className="pl-6 space-y-1">
                                {link.children.map(child => (
                                  <Link
                                    key={child.to}
                                    to={child.to}
                                    className="block py-1 text-tertiary/80 font-crimson text-sm"
                                    onClick={() => setIsMobileMenuOpen(false)}
                                  >
                                    {child.label}
                                  </Link>
                                ))}
                              </div>
                            )}
                          </div>
                        ))}
                      </div>
                    )}
                  </div>

                  {/* Mobile Fixed Income */}
                  <div>
                    <button
                      onClick={() => setOpenDropdown(openDropdown === 'fixed-income' ? null : 'fixed-income')}
                      className="flex items-center justify-between w-full text-tertiary font-crimson font-semibold text-lg py-2"
                    >
                      <span className="flex items-center">
                        <PiggyBank className="w-5 h-5 mr-3" />
                        Fixed Income
                      </span>
                      {openDropdown === 'fixed-income' ? <Minus className="w-5 h-5" /> : <Plus className="w-5 h-5" />}
                    </button>
                    {openDropdown === 'fixed-income' && (
                      <div className="mt-2 pl-8 space-y-1">
                        <Link to="/fixed-income#products" className="block py-1 text-tertiary font-crimson" onClick={() => setIsMobileMenuOpen(false)}>Products</Link>
                        <Link to="/fixed-income#laddering-strategy" className="block py-1 text-tertiary font-crimson" onClick={() => setIsMobileMenuOpen(false)}>Laddering Strategy</Link>
                        <Link to="/fixed-income#top-bank-fds" className="block py-1 text-tertiary font-crimson" onClick={() => setIsMobileMenuOpen(false)}>Top Bank FDs</Link>
                      </div>
                    )}
                  </div>

                  {/* Mobile Commodities */}
                  <div>
                    <button
                      onClick={() => setOpenDropdown(openDropdown === 'commodities' ? null : 'commodities')}
                      className="flex items-center justify-between w-full text-tertiary font-crimson font-semibold text-lg py-2"
                    >
                      <span className="flex items-center">
                        <Zap className="w-5 h-5 mr-3" />
                        Commodities
                      </span>
                      {openDropdown === 'commodities' ? <Minus className="w-5 h-5" /> : <Plus className="w-5 h-5" />}
                    </button>
                    {openDropdown === 'commodities' && (
                      <div className="mt-2 pl-8 space-y-1">
                        {commodityLinks.map(link => (
                          <Link
                            key={link.to}
                            to={link.to}
                            className="flex items-center py-2 text-tertiary font-crimson"
                            onClick={() => setIsMobileMenuOpen(false)}
                          >
                            {link.icon}
                            {link.label}
                          </Link>
                        ))}
                      </div>
                    )}
                  </div>

                  {/* Mobile Calculator */}
                  <div>
                    <button
                      onClick={() => setOpenDropdown(openDropdown === 'calculator' ? null : 'calculator')}
                      className="flex items-center justify-between w-full text-tertiary font-crimson font-semibold text-lg py-2"
                    >
                      <span className="flex items-center">
                        <Calculator className="w-5 h-5 mr-3" />
                        Calculator
                      </span>
                      {openDropdown === 'calculator' ? <Minus className="w-5 h-5" /> : <Plus className="w-5 h-5" />}
                    </button>
                    {openDropdown === 'calculator' && (
                      <div className="mt-2 pl-8 space-y-1">
                        {calculatorLinks.map(link => (
                          <Link
                            key={link.to}
                            to={link.to}
                            className="flex items-center py-2 text-tertiary font-crimson"
                            onClick={() => setIsMobileMenuOpen(false)}
                          >
                            {link.icon}
                            {link.label}
                          </Link>
                        ))}
                      </div>
                    )}
                  </div>

                  <div className="pt-4">
                    <button 
                      onClick={handleScheduleConsultation}
                      className="w-full bg-secondary hover:bg-secondary/90 text-white px-6 py-3 rounded-full font-semibold font-crimson transition-all shadow-lg hover:shadow-xl flex items-center justify-center gap-2"
                    >
                      <span>Schedule Consultation</span>
                      <ArrowRight className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </nav>
      </header>
    </>
  );
};

export default Navigation;