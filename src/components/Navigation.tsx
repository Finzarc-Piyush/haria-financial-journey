import { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { Menu, X, Phone } from "lucide-react";

const Navigation = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
      setIsMobileMenuOpen(false);
    }
  };

  const navItems = [
    { name: 'Home', id: 'hero' },
    { name: 'About Us', id: 'about' },
    { name: 'Services', id: 'services' },
    { name: 'Results', id: 'results' },
    { name: 'Insights', id: 'insights' },
    { name: 'Process', id: 'process' },
    { name: 'Credentials', id: 'credentials' },
    { name: 'Contact', id: 'contact' }
  ];

  return (
    <nav className={`fixed top-0 w-full z-50 transition-all duration-500 ${
      isScrolled ? 'bg-background/95 backdrop-blur-md shadow-elegant' : 'bg-transparent'
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center py-4">
          {/* Logo */}
          <div className="flex-shrink-0">
            <div className="font-playfair font-bold text-2xl text-tertiary">
              HARIA INVESTMENTS
            </div>
            <div className="text-xs text-muted-foreground font-crimson">
              Your trusted financial partner since 1957
            </div>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center space-x-8">
            {navItems.map((item) => (
              <button
                key={item.name}
                onClick={() => scrollToSection(item.id)}
                className="text-tertiary hover:text-secondary transition-colors duration-300 font-crimson font-medium"
              >
                {item.name}
              </button>
            ))}
          </div>

          {/* Desktop CTA */}
          <div className="hidden lg:flex items-center space-x-4">
            <a
              href="tel:+919876543210"
              className="flex items-center text-tertiary hover:text-secondary transition-colors duration-300"
            >
              <Phone className="w-4 h-4 mr-2" />
              <span className="font-crimson">+91 98765 43210</span>
            </a>
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
          <div className="lg:hidden bg-background/95 backdrop-blur-md rounded-lg mt-2 p-4 shadow-elegant">
            <div className="flex flex-col space-y-4">
              {navItems.map((item) => (
                <button
                  key={item.name}
                  onClick={() => scrollToSection(item.id)}
                  className="text-left text-tertiary hover:text-secondary transition-colors duration-300 font-crimson font-medium py-2"
                >
                  {item.name}
                </button>
              ))}
              <div className="pt-4 border-t border-muted">
                <a
                  href="tel:+919876543210"
                  className="flex items-center text-tertiary hover:text-secondary transition-colors duration-300 mb-4"
                >
                  <Phone className="w-4 h-4 mr-2" />
                  <span className="font-crimson">+91 98765 43210</span>
                </a>
                <Button
                  onClick={() => scrollToSection('contact')}
                  className="w-full bg-secondary text-secondary-foreground hover:bg-secondary/90 font-crimson font-semibold"
                >
                  Schedule Consultation
                </Button>
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navigation;