import React from "react";
import { motion } from "framer-motion";

interface ColorChangeCardsProps {
  cards: {
    heading: string;
    description: string;
    imgSrc: string;
    badge: string;
  }[];
}

const ColorChangeCards = ({ cards }: ColorChangeCardsProps) => {
  return (
    <div className="w-full">
      <div className="mx-auto grid w-full max-w-7xl grid-cols-1 gap-8 md:grid-cols-2">
        {cards.map((card, index) => (
          <Card
            key={index}
            heading={card.heading}
            description={card.description}
            imgSrc={card.imgSrc}
            badge={card.badge}
            index={index}
          />
        ))}
      </div>
    </div>
  );
};

// --- Card Component ---
interface CardProps {
  heading: string;
  description: string;
  imgSrc: string;
  badge: string;
  index: number;
}

const Card = ({ heading, description, imgSrc, badge, index }: CardProps) => {
  React.useEffect(() => {
    console.log(`Card "${heading}" - Image src:`, imgSrc);
    console.log(`Type of imgSrc:`, typeof imgSrc);
  }, [heading, imgSrc]);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className="group bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300"
    >
      {/* Image Section */}
      <div className="relative h-64 w-full overflow-hidden bg-gray-100">
        <img
          src={imgSrc}
          alt={heading}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
          onLoad={() => {
            console.log(`✅ Image loaded successfully for "${heading}":`, imgSrc);
          }}
          onError={(e) => {
            console.error(`❌ Failed to load image for "${heading}":`, imgSrc);
            console.error('Error event:', e);
            // Set a placeholder background color if image fails
            (e.target as HTMLImageElement).style.display = 'none';
          }}
        />
      </div>

      {/* Content Section */}
      <div className="p-6 md:p-8">
        <h3 className="font-playfair text-2xl md:text-3xl font-bold text-tertiary mb-3">
          {heading}
        </h3>
        <p className="font-crimson text-base md:text-lg text-tertiary/80 mb-5 leading-relaxed">
          {description}
        </p>
        <span className="inline-block bg-secondary text-white px-5 py-2 rounded-full text-sm font-crimson font-semibold">
          {badge}
        </span>
      </div>
    </motion.div>
  );
};

export default ColorChangeCards;

