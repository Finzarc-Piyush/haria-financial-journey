import { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { Menu, X, ChevronDown, Shield, BarChart3, PiggyBank, Zap, Calculator, Heart, Umbrella, TrendingUp, PieChart, Plus, Minus, Coins, LineChart, Gem, PackageSearch } from "lucide-react";
import { Link } from 'react-router-dom';
import { FaRupeeSign, FaUniversity, FaUserClock, FaHeartbeat } from 'react-icons/fa';
import { motion, AnimatePresence, useScroll, useMotionValueEvent } from 'framer-motion';
import logo from '@/assets/logo.png';

interface NavigationProps {
  isTransparent?: boolean;
}

const Navigation: React.FC<NavigationProps> = ({ isTransparent = false }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isInsuranceDropdownOpen, setIsInsuranceDropdownOpen] = useState(false);
  const [isInvestmentDropdownOpen, setIsInvestmentDropdownOpen] = useState(false);
  const [isCalcDropdownOpen, setIsCalcDropdownOpen] = useState(false);
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);
  const [hoveredInsuranceParent, setHoveredInsuranceParent] = useState<string | null>(null);
  const [hoveredInvestmentParent, setHoveredInvestmentParent] = useState<string | null>(null);

  // Framer Motion scroll detection
  const { scrollY } = useScroll();

  useMotionValueEvent(scrollY, "change", (latest) => {
    const scrolled = latest > 100;
    const visible = latest > 100;

    setIsScrolled(scrolled);
    setIsVisible(visible);
  });

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
      {/* Navbar */}
      <motion.div
        className="fixed z-50 overflow-visible"
        style={{
          top: isVisible ? 0 : 8, // top-2 (8px) to top-0
          borderRadius: '50px',
        }}
        initial={{
          opacity: 0,
          y: 0,
          width: '100%',
          left: '0%',
          backdropFilter: 'blur(12px) saturate(180%)',
          backgroundColor: 'rgba(255, 255, 255, 0.10)',
          border: '1px solid rgba(255, 255, 255, 0.15)',
          boxShadow: 'none',
        }}
        animate={{
          opacity: 1,
          y: isVisible ? 20 : 0, // Move down 20px when visible
          width: isVisible ? (window.innerWidth >= 1024 ? '75%' : '90%') : '100%',
          left: isVisible ? (window.innerWidth >= 1024 ? '12.5%' : '5%') : '0%',
          backdropFilter: isVisible ? 'blur(20px) saturate(180%)' : 'blur(12px) saturate(180%)',
          backgroundColor: isVisible ? 'rgba(255, 255, 255, 0.18)' : 'rgba(255, 255, 255, 0.10)',
          border: isVisible ? '1px solid rgba(255, 255, 255, 0.22)' : '1px solid rgba(255, 255, 255, 0.15)',
          boxShadow: isVisible
            ? '0 25px 50px -12px rgba(0, 0, 0, 0.18), 0 0 0 1px rgba(255, 255, 255, 0.10), inset 0 1px 0 rgba(255, 255, 255, 0.18)'
            : '0 2px 8px rgba(0, 0, 0, 0.05)',
        }}
        transition={{
          type: "tween",
          duration: 1.2,
          ease: [0.25, 1, 0.5, 1],
        }}
      >
        <nav className="w-full transition-all duration-500 rounded-full">
          <div className="max-w-8xl mx-auto px-0 sm:px-2 lg:px-4">
            <div className="flex items-center justify-between py-2">
              {/* Logo */}
              <Link to="/" className="flex-shrink sm:flex-shrink-0 flex items-center gap-2 cursor-pointer hover:opacity-80 transition-opacity duration-300 pl-2">
                <img src={logo} alt="Haria Investments Logo" className="w-10 h-10 lg:w-14 lg:h-14 object-contain" />
                <div>
                  <div style={{ textShadow: 'none' }} className="font-playfair font-bold text-2xl lg:text-3xl text-tertiary">
                    Haria Investments
                  </div>
                  <div className="text-base lg:text-lg font-semibold font-crimson text-center">
                    since 1957
                  </div>
                </div>
              </Link>

              {/* Desktop Navigation */}
              <div className="hidden lg:flex items-center justify-center space-x-4 flex-1 min-w-0">
                {/* Insurance Dropdown */}
                <div
                  className="relative"
                  onMouseEnter={() => setIsInsuranceDropdownOpen(true)}
                  onMouseLeave={() => setIsInsuranceDropdownOpen(false)}
                >
                  <button
                    style={{ textShadow: 'none' }}
                    className="text-tertiary text-xl hover:text-secondary transition-colors duration-300 font-crimson font-bold flex items-center gap-1"
                    type="button"
                  >
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
                        className="absolute left-1/2 -translate-x-1/2 mt-2 w-56 bg-white shadow-lg rounded-xl p-4 z-[9999]"
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
                              className="flex items-center justify-between px-3 py-2 rounded-lg text-tertiary hover:bg-gray-100 transition-colors font-crimson text-xl"
                            >
                              <div className="flex items-center">
                                {link.icon}
                                {link.label}
                              </div>
                              {link.children ? (
                                <ChevronDown className="w-4 h-4 opacity-60 transition" />
                              ) : null}
                            </Link>
                            {link.children && hoveredInsuranceParent === link.label && (
                              <div className="absolute left-full top-0 ml-2">
                                <div className="mt-0 w-56 bg-white shadow-lg rounded-xl p-3">
                                  {link.children.map(child => (
                                    <Link key={child.to} to={child.to} className="block px-3 py-2 rounded-lg text-tertiary hover:bg-gray-100 transition-colors font-crimson text-xl">
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
                  <button
                    style={{ textShadow: 'none' }}
                    className="text-tertiary text-xl hover:text-secondary transition-colors duration-300 font-crimson font-bold flex items-center gap-1"
                    type="button"
                  >
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
                        className="absolute left-1/2 -translate-x-1/2 mt-2 w-56 bg-white shadow-lg rounded-xl p-4 z-[9999]"
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
                              className="flex items-center justify-between px-3 py-2 rounded-lg text-tertiary hover:bg-gray-100 transition-colors font-crimson text-xl"
                            >
                              <div className="flex items-center">
                                {link.icon}
                                {link.label}
                              </div>
                              {link.children ? (
                                <ChevronDown className="w-4 h-4 opacity-60 transition" />
                              ) : null}
                            </Link>
                            {link.children && hoveredInvestmentParent === link.label && (
                              <div className="absolute left-full top-0 ml-2">
                                <div className="mt-0 w-64 bg-white shadow-lg rounded-xl p-3">
                                  {link.children.map(child => (
                                    <Link key={child.to} to={child.to} className="block px-3 py-2 rounded-lg text-tertiary hover:bg-gray-100 transition-colors font-crimson text-xl">
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

                {/* Fixed Income with submenu */}
                <div
                  className="relative"
                  onMouseEnter={() => setOpenDropdown('fixed-income')}
                  onMouseLeave={() => setOpenDropdown(null)}
                >
                  <button
                    style={{ textShadow: 'none' }}
                    className="text-tertiary text-xl hover:text-secondary transition-colors duration-300 font-crimson font-bold flex items-center gap-1"
                    type="button"
                  >
                    Fixed Income
                    <ChevronDown className={`ml-1 w-4 h-4 transition-transform duration-200 ${openDropdown === 'fixed-income' ? 'rotate-180' : ''}`} />
                  </button>
                  <AnimatePresence>
                    {openDropdown === 'fixed-income' && (
                      <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 10 }}
                        transition={{ duration: 0.18 }}
                        className="absolute left-1/2 -translate-x-1/2 mt-2 w-64 bg-white shadow-lg rounded-xl p-4 z-[9999]"
                      >
                        <Link to="/fixed-income#products" className="block px-3 py-2 rounded-lg text-tertiary hover:bg-gray-100 transition-colors font-crimson text-lg">Products</Link>
                        <Link to="/fixed-income#laddering-strategy" className="block px-3 py-2 rounded-lg text-tertiary hover:bg-gray-100 transition-colors font-crimson text-lg">Laddering Strategy</Link>
                        <Link to="/fixed-income#top-bank-fds" className="block px-3 py-2 rounded-lg text-tertiary hover:bg-gray-100 transition-colors font-crimson text-lg">Top Bank FDs</Link>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>

                {/* Commodities Dropdown */}
                <div
                  className="relative"
                  onMouseEnter={() => setOpenDropdown('commodities')}
                  onMouseLeave={() => setOpenDropdown(null)}
                >
                  <button
                    style={{ textShadow: 'none' }}
                    className="text-tertiary text-xl hover:text-secondary transition-colors duration-300 font-crimson font-bold flex items-center gap-1"
                    type="button"
                  >
                    Commodities
                    <ChevronDown className={`ml-1 w-4 h-4 transition-transform duration-200 ${openDropdown === 'commodities' ? 'rotate-180' : ''}`} />
                  </button>
                  <AnimatePresence>
                    {openDropdown === 'commodities' && (
                      <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 10 }}
                        transition={{ duration: 0.18 }}
                        className="absolute left-1/2 -translate-x-1/2 mt-2 w-64 bg-white shadow-lg rounded-xl p-4 z-[9999]"
                      >
                        {commodityLinks.map(link => (
                          <Link
                            key={link.to}
                            to={link.to}
                            className="flex items-center px-3 py-2 rounded-lg text-tertiary hover:bg-gray-100 transition-colors font-crimson text-lg"
                          >
                            {link.icon}
                            {link.label}
                          </Link>
                        ))}
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>

                {/* Calculators Dropdown */}
                <div
                  className="relative"
                  onMouseEnter={() => setIsCalcDropdownOpen(true)}
                  onMouseLeave={() => setIsCalcDropdownOpen(false)}
                >
                  <button
                    style={{ textShadow: 'none' }}
                    className="text-tertiary text-xl hover:text-secondary transition-colors duration-300 font-crimson font-bold flex items-center gap-1"
                    type="button"
                  >
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
                        className="absolute left-1/2 -translate-x-1/2 mt-2 w-64 bg-white shadow-lg rounded-xl p-4 z-[9999]"
                      >
                        {calculatorLinks.map(link => (
                          <Link
                            key={link.to}
                            to={link.to}
                            className="flex items-center px-3 py-2 rounded-lg text-tertiary hover:bg-gray-100 transition-colors font-crimson text-lg"
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
              <div className="hidden lg:flex items-center ml-auto shrink sm:shrink-0 pr-2">
                <Button
                  onClick={() => scrollToSection('contact')}
                  className="bg-secondary text-secondary-foreground hover:bg-secondary/90 font-crimson font-semibold text-xl px-6"
                >
                  Schedule Consultation
                </Button>
              </div>

              {/* Mobile Menu Button */}
              <div className="lg:hidden flex items-center pr-2">
                <button
                  onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                  className="text-tertiary hover:text-secondary transition-colors duration-300 p-3 rounded-full hover:bg-white/10"
                  aria-label={isMobileMenuOpen ? "Close menu" : "Open menu"}
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
            <AnimatePresence>
              {isMobileMenuOpen && (
                <motion.div
                  className="lg:hidden fixed top-0 left-0 w-full h-screen bg-white/95 backdrop-blur-md rounded-none shadow-elegant z-[100] flex flex-col"
                  initial={{ opacity: 0, y: -20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.3, ease: "easeOut" }}
                >
                  <div className="flex flex-col flex-1 overflow-y-auto px-6 pt-20 pb-6">
                    {/* Insurance Dropdown (Mobile) */}
                    <div>
                      <button
                        onClick={() => setOpenDropdown(openDropdown === 'insurance' ? null : 'insurance')}
                        className="flex items-center justify-between w-full text-tertiary hover:text-secondary transition-colors duration-300 font-crimson font-bold text-xl py-4 px-2 rounded-lg hover:bg-gray-50"
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
                              <div key={link.to}>
                                <Link
                                  to={link.to}
                                  className="flex items-center px-4 py-3 rounded-lg text-tertiary hover:bg-gray-100 transition-colors font-crimson text-lg min-h-[48px]"
                                  onClick={() => setIsMobileMenuOpen(false)}
                                >
                                  {link.icon}
                                  {link.label}
                                </Link>
                                {link.children && (
                                  <div className="pl-6 mt-1 space-y-1">
                                    {link.children.map(child => (
                                      <Link
                                        key={child.to}
                                        to={child.to}
                                        className="flex items-center px-4 py-2.5 rounded-lg text-tertiary/90 hover:bg-gray-100 transition-colors font-crimson text-lg min-h-[44px]"
                                        onClick={() => setIsMobileMenuOpen(false)}
                                      >
                                        {child.label}
                                      </Link>
                                    ))}
                                  </div>
                                )}
                              </div>
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
                        className="flex items-center justify-between w-full text-tertiary hover:text-secondary transition-colors duration-300 font-crimson font-bold text-xl py-4 px-2 rounded-lg hover:bg-gray-50"
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
                              <div key={link.to}>
                                <Link
                                  to={link.to}
                                  className="flex items-center px-4 py-3 rounded-lg text-tertiary hover:bg-gray-100 transition-colors font-crimson text-lg min-h-[48px]"
                                  onClick={() => setIsMobileMenuOpen(false)}
                                >
                                  {link.icon}
                                  {link.label}
                                </Link>
                                {link.children && (
                                  <div className="pl-6 mt-1 space-y-1">
                                    {link.children.map(child => (
                                      <Link
                                        key={child.to}
                                        to={child.to}
                                        className="flex items-center px-4 py-2.5 rounded-lg text-tertiary/90 hover:bg-gray-100 transition-colors font-crimson text-lg min-h-[44px]"
                                        onClick={() => setIsMobileMenuOpen(false)}
                                      >
                                        {child.label}
                                      </Link>
                                    ))}
                                  </div>
                                )}
                              </div>
                            ))}
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                    <hr className="border-gray-400 my-3" />

                    {/* Fixed Income (Mobile) */}
                    <div>
                      <button
                        onClick={() => setOpenDropdown(openDropdown === 'fixed-income' ? null : 'fixed-income')}
                        className="flex items-center justify-between w-full text-tertiary hover:text-secondary transition-colors duration-300 font-crimson font-bold text-xl py-4 px-2 rounded-lg hover:bg-gray-50"
                      >
                        <span className="flex items-center">
                          <PiggyBank className="w-5 h-5 mr-3" />
                          Fixed Income
                        </span>
                        {openDropdown === 'fixed-income' ? (
                          <Minus className="ml-2 w-5 h-5 transition-transform duration-200" />
                        ) : (
                          <Plus className="ml-2 w-5 h-5 transition-transform duration-200" />
                        )}
                      </button>
                      <AnimatePresence>
                        {openDropdown === 'fixed-income' && (
                          <motion.div
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: 'auto' }}
                            exit={{ opacity: 0, height: 0 }}
                            transition={{ duration: 0.18 }}
                            className="pl-8 pr-2 pt-2 pb-2 space-y-2"
                          >
                            <div className="space-y-1">
                              <Link
                                to="/fixed-income#products"
                                className="flex items-center px-4 py-2.5 rounded-lg text-tertiary/90 hover:bg-gray-100 transition-colors font-crimson text-lg min-h-[44px]"
                                onClick={() => setIsMobileMenuOpen(false)}
                              >
                                Products
                              </Link>
                              <Link
                                to="/fixed-income#laddering-strategy"
                                className="flex items-center px-4 py-2.5 rounded-lg text-tertiary/90 hover:bg-gray-100 transition-colors font-crimson text-lg min-h-[44px]"
                                onClick={() => setIsMobileMenuOpen(false)}
                              >
                                Laddering Strategy
                              </Link>
                              <Link
                                to="/fixed-income#top-bank-fds"
                                className="flex items-center px-4 py-2.5 rounded-lg text-tertiary/90 hover:bg-gray-100 transition-colors font-crimson text-lg min-h-[44px]"
                                onClick={() => setIsMobileMenuOpen(false)}
                              >
                                Top Bank FDs
                              </Link>
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                    <hr className="border-gray-400 my-3" />

                    {/* Commodities (Mobile) */}
                    <div>
                      <button
                        onClick={() => setOpenDropdown(openDropdown === 'commodities' ? null : 'commodities')}
                        className="flex items-center justify-between w-full text-tertiary hover:text-secondary transition-colors duration-300 font-crimson font-bold text-xl py-4 px-2 rounded-lg hover:bg-gray-50"
                      >
                        <span className="flex items-center">
                          <Zap className="w-5 h-5 mr-3" />
                          Commodities
                        </span>
                        {openDropdown === 'commodities' ? (
                          <Minus className="ml-2 w-5 h-5 transition-transform duration-200" />
                        ) : (
                          <Plus className="ml-2 w-5 h-5 transition-transform duration-200" />
                        )}
                      </button>
                      <AnimatePresence>
                        {openDropdown === 'commodities' && (
                          <motion.div
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: 'auto' }}
                            exit={{ opacity: 0, height: 0 }}
                            transition={{ duration: 0.18 }}
                            className="pl-8 pr-2 pt-2 pb-2 space-y-2"
                          >
                            {commodityLinks.map(link => (
                              <Link
                                key={link.to}
                                to={link.to}
                                className="flex items-center px-4 py-3 rounded-lg text-tertiary hover:bg-gray-100 transition-colors font-crimson text-lg min-h-[48px]"
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

                    {/* Calculators Dropdown (Mobile) */}
                    <div>
                      <button
                        onClick={() => setOpenDropdown(openDropdown === 'calculator' ? null : 'calculator')}
                        className="flex items-center justify-between w-full text-tertiary hover:text-secondary transition-colors duration-300 font-crimson font-bold text-xl py-4 px-2 rounded-lg hover:bg-gray-50"
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
                                className="flex items-center px-4 py-3 rounded-lg text-tertiary hover:bg-gray-100 transition-colors font-crimson text-lg min-h-[48px]"
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

                    <div className="pt-6 pb-4 px-2">
                      <Button
                        onClick={() => scrollToSection('contact')}
                        className="w-full bg-secondary text-secondary-foreground hover:bg-secondary/90 font-crimson font-semibold text-lg py-4 rounded-xl shadow-lg"
                        style={{ minHeight: '56px' }}
                      >
                        Schedule Consultation
                      </Button>
                    </div>
                  </div>
                  {/* Keep hamburger/X always visible */}
                  <button
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="absolute top-6 right-6 text-tertiary hover:text-secondary transition-colors duration-300 z-[101] bg-white/80 backdrop-blur-sm rounded-full p-2 shadow-lg"
                    aria-label="Close menu"
                  >
                    <X className="h-8 w-8" />
                  </button>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </nav>
      </motion.div>
    </>
  );
};

export default Navigation;
