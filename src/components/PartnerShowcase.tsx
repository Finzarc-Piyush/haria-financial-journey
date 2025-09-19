import React from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

interface Partner {
  name: string;
  logo?: string; // path to the logo image
  position: {
    orbit: number;
    angle: number;
  };
}

interface PartnerShowcaseProps {
  category: 'life' | 'health';
  className?: string;
}

const lifeInsurancePartners: Partner[] = [
  { name: 'LIC', logo: '/logos/lic.png', position: { orbit: 1, angle: 0 } },
  { name: 'BAJAJ', logo: '/logos/bajaj.png', position: { orbit: 2, angle: 90 } },
  { name: 'HDFC', logo: '/logos/hdfc.png', position: { orbit: 3, angle: 180 } },
  { name: 'ICICI', logo: '/logos/icici.png', position: { orbit: 2, angle: 270 } },
  { name: 'Aditya Birla', logo: '/logos/aditya-birla.png', position: { orbit: 1, angle: 180 } },
];

const healthInsurancePartners: Partner[] = [
  { name: 'Oriental', logo: '/logos/oriental.png', position: { orbit: 1, angle: 0 } },
  { name: 'Star Health', logo: '/logos/star-health.png', position: { orbit: 2, angle: 45 } },
  { name: 'HDFC Ergo', logo: '/logos/hdfc-ergo.png', position: { orbit: 3, angle: 90 } },
  { name: 'Bajaj Allianz', logo: '/logos/bajaj-allianz.png', position: { orbit: 1, angle: 120 } },
  { name: 'Future Generali', logo: '/logos/future-generali.png', position: { orbit: 2, angle: 180 } },
  { name: 'Niva Bupa', logo: '/logos/niva-bupa.png', position: { orbit: 3, angle: 225 } },
  { name: 'TATA AIG', logo: '/logos/tata-aig.png', position: { orbit: 1, angle: 240 } },
  { name: 'Go Digit', logo: '/logos/go-digit.png', position: { orbit: 2, angle: 315 } },
];

const orbitRadii = { 1: 120, 2: 170, 3: 220 };

const getPartnerPosition = (angle: number, orbitRadius: number, containerSize: number) => {
  const radian = (angle * Math.PI) / 180;
  const x = Math.cos(radian) * orbitRadius + containerSize / 2;
  const y = Math.sin(radian) * orbitRadius + containerSize / 2;
  return { x, y };
};

const PartnerLogo: React.FC<{ partner: Partner; containerSize: number; index: number; }> = ({
  partner,
  containerSize,
  index,
}) => {
  const orbitRadius = orbitRadii[partner.position.orbit as keyof typeof orbitRadii];
  const { x, y } = getPartnerPosition(partner.position.angle, orbitRadius, containerSize);

  return (
    <motion.div
      className="absolute w-12 h-12 md:w-16 md:h-16 -translate-x-1/2 -translate-y-1/2"
      style={{ left: x, top: y }}
      initial={{ opacity: 0, scale: 0.5 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5, delay: index * 0.15, ease: 'easeOut' }}
      whileHover={{ scale: 1.2 }}
    >
      <div className="w-full h-full flex items-center justify-center rounded-full bg-background border-2 border-white shadow-md overflow-hidden">
        {partner.logo ? (
          <img src={partner.logo} alt={partner.name} className="w-3/4 h-3/4 object-contain" />
        ) : (
          <span className="text-xs font-bold text-center">{partner.name}</span>
        )}
      </div>
    </motion.div>
  );
};

const OrbitCircles: React.FC<{ containerSize: number; category: 'life' | 'health'; }> = ({
  containerSize,
  category,
}) => {
  const orbits = [1, 2, 3];
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
            transition={{ duration: 0.8, delay: index * 0.2, ease: 'easeOut' }}
          />
        );
      })}
    </div>
  );
};

const PartnerShowcase: React.FC<PartnerShowcaseProps> = ({ className }) => {
  const containerSize = 600;
  const content = {
    life: {
      title: 'For Life Insurance',
      subtitle: 'Trusted by India’s top life insurance providers to safeguard your family’s future.',
      cta: 'Explore Life Insurance',
    },
    health: {
      title: 'For Health Insurance',
      subtitle:
        'Partnering with leading health insurers to bring you quality care and wide hospital networks.',
      cta: 'Explore Health Insurance',
    },
  };

  return (
    <section className={cn('w-full py-2 lg:py-6', className)}>
      <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-center mb-8 font-playfair text-foreground">
        Our Trusted Insurance Partners
      </h1>
      <div className="container mx-auto px-4">
        {/* Life Insurance Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-10 items-center mb-12">
          {/* Orbit section */}
          <motion.div
            className="flex justify-center items-center order-2 lg:order-1"
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-20%' }}
            transition={{ duration: 0.8, ease: 'easeOut' }}
          >
            <div
              className="relative"
              style={{ width: containerSize, height: containerSize, maxWidth: '90vw', maxHeight: '90vw' }}
            >
              <OrbitCircles containerSize={containerSize} category="life" />
              {lifeInsurancePartners.map((partner, index) => (
                <PartnerLogo key={partner.name} partner={partner} containerSize={containerSize} index={index} />
              ))}
            </div>
          </motion.div>

          {/* Text content */}
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
              {content.life.title}
            </motion.h2>
            <motion.p
              className="font-crimson text-lg md:text-xl text-muted-foreground leading-relaxed"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.6 }}
            >
              {content.life.subtitle}
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
                {content.life.cta}
              </Button>
            </motion.div>
          </motion.div>
        </div>

        {/* Health Insurance Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-10 items-center">
          {/* Text content */}
          <motion.div
            className="space-y-6 order-1 lg:order-1"
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-20%' }}
            transition={{ duration: 0.8, ease: 'easeOut' }}
          >
            <motion.h2
              className="font-playfair text-3xl md:text-4xl lg:text-5xl font-bold text-foreground leading-tight"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.4 }}
            >
              {content.health.title}
            </motion.h2>
            <motion.p
              className="font-crimson text-lg md:text-xl text-muted-foreground leading-relaxed"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.6 }}
            >
              {content.health.subtitle}
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
                {content.health.cta}
              </Button>
            </motion.div>
          </motion.div>

          {/* Orbit section */}
          <motion.div
            className="flex justify-center items-center order-2 lg:order-2"
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-20%' }}
            transition={{ duration: 0.8, ease: 'easeOut' }}
          >
            <div
              className="relative"
              style={{ width: containerSize, height: containerSize, maxWidth: '90vw', maxHeight: '90vw' }}
            >
              <OrbitCircles containerSize={containerSize} category="health" />
              {healthInsurancePartners.map((partner, index) => (
                <PartnerLogo key={partner.name} partner={partner} containerSize={containerSize} index={index} />
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default PartnerShowcase;