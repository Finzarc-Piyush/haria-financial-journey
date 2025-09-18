import React, { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

interface Partner {
  name: string;
  logo?: string;
  position: {
    angle: number;
    radius: number;
  };
}

interface PartnerShowcaseProps {
  category: 'life' | 'health';
  className?: string;
}

const lifeInsurancePartners: Partner[] = [
  { name: 'LIC', position: { angle: 0, radius: 180 } },
  { name: 'BAJAJ', position: { angle: 72, radius: 180 } },
  { name: 'HDFC', position: { angle: 144, radius: 180 } },
  { name: 'ICICI', position: { angle: 216, radius: 180 } },
  { name: 'Aditya Birla', position: { angle: 288, radius: 180 } },
];

const healthInsurancePartners: Partner[] = [
  { name: 'Oriental', position: { angle: 0, radius: 200 } },
  { name: 'Star Health', position: { angle: 45, radius: 200 } },
  { name: 'HDFC Ergo', position: { angle: 90, radius: 200 } },
  { name: 'Bajaj Allianz', position: { angle: 135, radius: 200 } },
  { name: 'Future Generali', position: { angle: 180, radius: 200 } },
  { name: 'Niva Bupa', position: { angle: 225, radius: 200 } },
  { name: 'TATA AIG', position: { angle: 270, radius: 200 } },
  { name: 'Go Digit', position: { angle: 315, radius: 200 } },
];

const getPartnerPosition = (angle: number, radius: number, containerSize: number) => {
  const radian = (angle * Math.PI) / 180;
  const x = Math.cos(radian) * radius + containerSize / 2;
  const y = Math.sin(radian) * radius + containerSize / 2;
  return { x, y };
};

const PartnerLogo: React.FC<{ partner: Partner; containerSize: number; index: number }> = ({
  partner,
  containerSize,
  index,
}) => {
  const { x, y } = getPartnerPosition(partner.position.angle, partner.position.radius, containerSize);

  return (
    <motion.div
      className="absolute w-16 h-16 md:w-20 md:h-20 -translate-x-1/2 -translate-y-1/2"
      style={{ left: x, top: y }}
      initial={{ opacity: 0, scale: 0.5 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{
        duration: 0.5,
        delay: index * 0.1,
        ease: 'easeOut',
      }}
      whileHover={{ scale: 1.1, y: y - 4 }}
    >
      <div className="premium-card hover-lift w-full h-full flex items-center justify-center bg-white shadow-card rounded-lg border border-muted/20">
        <span className="font-playfair text-xs md:text-sm font-semibold text-foreground text-center px-1">
          {partner.name}
        </span>
      </div>
    </motion.div>
  );
};

const OrbitCircles: React.FC<{ containerSize: number; category: 'life' | 'health' }> = ({
  containerSize,
  category,
}) => {
  const radius = category === 'life' ? 180 : 200;
  
  return (
    <div className="absolute inset-0">
      {/* Outer orbit circle */}
      <motion.div
        className="absolute border border-muted/30 rounded-full"
        style={{
          width: radius * 2,
          height: radius * 2,
          left: containerSize / 2 - radius,
          top: containerSize / 2 - radius,
        }}
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8, ease: 'easeOut' }}
      />
      
      {/* Inner orbit circle */}
      <motion.div
        className="absolute border border-muted/20 rounded-full"
        style={{
          width: (radius - 60) * 2,
          height: (radius - 60) * 2,
          left: containerSize / 2 - (radius - 60),
          top: containerSize / 2 - (radius - 60),
        }}
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8, delay: 0.2, ease: 'easeOut' }}
      />
      
      {/* Center logo placeholder */}
      <motion.div
        className="absolute w-16 h-16 md:w-20 md:h-20 bg-secondary/10 border-2 border-secondary/30 rounded-full flex items-center justify-center"
        style={{
          left: containerSize / 2 - 32,
          top: containerSize / 2 - 32,
        }}
        initial={{ opacity: 0, scale: 0 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.6, delay: 0.4, ease: 'easeOut' }}
      >
        <div className="w-8 h-8 md:w-10 md:h-10 bg-secondary rounded-full"></div>
      </motion.div>
    </div>
  );
};

const PartnerShowcase: React.FC<PartnerShowcaseProps> = ({ category, className }) => {
  const partners = category === 'life' ? lifeInsurancePartners : healthInsurancePartners;
  const containerSize = 400; // Fixed container size for consistent layout
  
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