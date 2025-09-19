import React from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

interface Partner {
  name: string;
  logo?: string;
  position: {
    orbit: number; // Which orbit circle (1, 2, 3, etc.)
    angle: number; // Position on the orbit
  };
}

interface PartnerShowcaseProps {
  category: 'life' | 'health';
  className?: string;
}

const lifeInsurancePartners: Partner[] = [
  { name: 'LIC', position: { orbit: 1, angle: 0 } },
  { name: 'BAJAJ', position: { orbit: 2, angle: 90 } },
  { name: 'HDFC', position: { orbit: 3, angle: 180 } },
  { name: 'ICICI', position: { orbit: 2, angle: 270 } },
  { name: 'Aditya Birla', position: { orbit: 1, angle: 180 } },
];

const healthInsurancePartners: Partner[] = [
  { name: 'Oriental', position: { orbit: 1, angle: 0 } },
  { name: 'Star Health', position: { orbit: 2, angle: 45 } },
  { name: 'HDFC Ergo', position: { orbit: 3, angle: 90 } },
  { name: 'Bajaj Allianz', position: { orbit: 1, angle: 120 } },
  { name: 'Future Generali', position: { orbit: 2, angle: 180 } },
  { name: 'Niva Bupa', position: { orbit: 3, angle: 225 } },
  { name: 'TATA AIG', position: { orbit: 1, angle: 240 } },
  { name: 'Go Digit', position: { orbit: 2, angle: 315 } },
];

// Define orbit radii
const orbitRadii = {
  1: 120,
  2: 160,
  3: 200,
};

const getPartnerPosition = (angle: number, orbitRadius: number, containerSize: number) => {
  const radian = (angle * Math.PI) / 180;
  const x = Math.cos(radian) * orbitRadius + containerSize / 2;
  const y = Math.sin(radian) * orbitRadius + containerSize / 2;
  return { x, y };
};

// Simple logo component with partner name and colored background
const PartnerLogo: React.FC<{ partner: Partner; containerSize: number; index: number }> = ({
  partner,
  containerSize,
  index,
}) => {
  const orbitRadius = orbitRadii[partner.position.orbit as keyof typeof orbitRadii];
  const { x, y } = getPartnerPosition(partner.position.angle, orbitRadius, containerSize);

  // Color mapping for different companies
  const getCompanyColors = (name: string) => {
    const colorMap: Record<string, { bg: string; text: string }> = {
      'LIC': { bg: 'bg-red-600', text: 'text-white' },
      'BAJAJ': { bg: 'bg-blue-600', text: 'text-white' },
      'HDFC': { bg: 'bg-red-500', text: 'text-white' },
      'ICICI': { bg: 'bg-orange-500', text: 'text-white' },
      'Aditya Birla': { bg: 'bg-blue-800', text: 'text-white' },
      'Oriental': { bg: 'bg-green-600', text: 'text-white' },
      'Star Health': { bg: 'bg-red-700', text: 'text-white' },
      'HDFC Ergo': { bg: 'bg-red-500', text: 'text-white' },
      'Bajaj Allianz': { bg: 'bg-blue-600', text: 'text-white' },
      'Future Generali': { bg: 'bg-green-700', text: 'text-white' },
      'Niva Bupa': { bg: 'bg-blue-500', text: 'text-white' },
      'TATA AIG': { bg: 'bg-blue-800', text: 'text-white' },
      'Go Digit': { bg: 'bg-orange-600', text: 'text-white' },
    };
    return colorMap[name] || { bg: 'bg-gray-600', text: 'text-white' };
  };

  const colors = getCompanyColors(partner.name);

  return (
    <motion.div
      className="absolute w-16 h-16 md:w-20 md:h-20 -translate-x-1/2 -translate-y-1/2"
      style={{ left: x, top: y }}
      initial={{ opacity: 0, scale: 0.5 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{
        duration: 0.5,
        delay: index * 0.15,
        ease: 'easeOut',
      }}
      whileHover={{ scale: 1.2, y: y - 8 }}
    >
      <div className={cn(
        "w-full h-full flex items-center justify-center rounded-full shadow-lg border-2 border-white",
        "hover:shadow-xl transition-all duration-300",
        colors.bg, colors.text
      )}>
        <span className="font-bold text-xs md:text-sm text-center px-1 leading-tight">
          {partner.name === 'Aditya Birla' ? 'AB' : 
           partner.name === 'Future Generali' ? 'FG' :
           partner.name === 'Bajaj Allianz' ? 'BA' :
           partner.name === 'Star Health' ? 'SH' :
           partner.name === 'Niva Bupa' ? 'NB' :
           partner.name === 'HDFC Ergo' ? 'HE' :
           partner.name === 'TATA AIG' ? 'TA' :
           partner.name === 'Go Digit' ? 'GD' :
           partner.name}
        </span>
      </div>
    </motion.div>
  );
};

// Component to render solid orbit circles
const OrbitCircles: React.FC<{ containerSize: number; category: 'life' | 'health' }> = ({
  containerSize,
  category,
}) => {
  const orbits = category === 'life' ? [1, 2, 3] : [1, 2, 3];
  
  return (
    <div className="absolute inset-0">
      {orbits.map((orbitNumber, index) => {
        const radius = orbitRadii[orbitNumber as keyof typeof orbitRadii];
        return (
          <motion.div
            key={orbitNumber}
            className="absolute border-2 border-secondary/60 rounded-full"
            style={{
              width: radius * 2,
              height: radius * 2,
              left: containerSize / 2 - radius,
              top: containerSize / 2 - radius,
            }}
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ 
              duration: 0.8, 
              delay: index * 0.2,
              ease: 'easeOut' 
            }}
          />
        );
      })}
      
      {/* Center element */}
      <motion.div
        className="absolute w-16 h-16 md:w-20 md:h-20 bg-secondary/30 border-3 border-secondary rounded-full flex items-center justify-center shadow-lg"
        style={{
          left: containerSize / 2 - 32,
          top: containerSize / 2 - 32,
        }}
        initial={{ opacity: 0, scale: 0 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.6, delay: 0.8, ease: 'easeOut' }}
      >
        <div className="text-secondary font-bold text-xs text-center leading-tight">
          Insurance<br/>Network
        </div>
      </motion.div>
    </div>
  );
};

const PartnerShowcase: React.FC<PartnerShowcaseProps> = ({ category, className }) => {
  const partners = category === 'life' ? lifeInsurancePartners : healthInsurancePartners;
  const containerSize = 450; // Increased size to accommodate more orbits
  
  const content = {
    life: {
      title: 'Get access to 40+ Life Insurance Partners.',
      subtitle: 'Comprehensive life insurance solutions tailored to protect your family\'s financial future with competitive premiums and extensive coverage options.',
      cta: 'Explore Life Insurance',
    },
    health: {
      title: 'Get access to 40+ Health Insurance Partners.',
      subtitle: 'Complete healthcare protection with extensive network coverage, cashless facilities, and comprehensive medical expense coverage for you and your family.',
      cta: 'Explore Health Insurance',
    },
  };

  return (
    <div className={cn('w-full py-16 lg:py-24', className)}>
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Orbit Section - Left on desktop, top on mobile */}
          <motion.div
            className="flex justify-center items-center order-2 lg:order-1"
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-20%' }}
            transition={{ duration: 0.8, ease: 'easeOut' }}
          >
            <div
              className="relative"
              style={{
                width: containerSize,
                height: containerSize,
                maxWidth: '90vw',
                maxHeight: '90vw',
              }}
            >
              {/* Orbit circles */}
              <OrbitCircles containerSize={containerSize} category={category} />
              
              {/* Partner logos */}
              {partners.map((partner, index) => (
                <PartnerLogo
                  key={partner.name}
                  partner={partner}
                  containerSize={containerSize}
                  index={index}
                />
              ))}
            </div>
          </motion.div>

          {/* Text Content - Right on desktop, bottom on mobile */}
          <motion.div
            className="space-y-6 order-1 lg:order-2"
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-20%' }}
            transition={{ duration: 0.8, delay: 0.2, ease: 'easeOut' }}
          >
            <motion.h2
              className="font-playfair text-3xl md:text-4xl lg:text-5xl font-bold text-foreground leading-tight"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.4 }}
            >
              {content[category].title}
            </motion.h2>
            
            <motion.p
              className="font-crimson text-lg md:text-xl text-muted-foreground leading-relaxed"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.6 }}
            >
              {content[category].subtitle}
            </motion.p>
            
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.8 }}
            >
              <Button
                variant="secondary"
                size="lg"
                className="btn-glow font-playfair text-lg px-8 py-3 bg-secondary text-secondary-foreground hover:bg-secondary/90 transition-all duration-300"
              >
                {content[category].cta}
              </Button>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default PartnerShowcase;