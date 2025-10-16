import { useEffect, useState } from 'react';
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import amritlalDevjiHaria from "@/assets/Amritlal-Haria.jpg";
import anilAmritlalHaria from "@/assets/Anil-Haria.jpg";
import rohanHaria from "@/assets/Rohan-Haria.jpg";
import rajHaria from "@/assets/Raj-Haria.jpg";
import meetSavla from "@/assets/Meet-Savla.jpg";
import teamPhoto from "@/assets/Team-photo.png";
import { AnimatedTooltip, TooltipItem } from "@/components/ui/animated-tooltip";
import { 
  FeaturesSectionWithBentoGrid, 
  SkeletonOne, 
  SkeletonPlaceholder, 
  SkeletonStats, 
  SkeletonGlobe,
  BentoFeature 
} from "@/components/ui/feature-section-with-bento-grid";
import { motion } from "framer-motion";
import AOS from 'aos';
import 'aos/dist/aos.css';

// Team members data
const teamMembers: TooltipItem[] = [
  {
    id: 1,
    name: "Amritlal Devji Haria",
    designation: "Founder",
    image: amritlalDevjiHaria,
    bio: "Our journey began with Late Shri Amritlal Devji Haria. Being a graduate, he joined LIC right from its inception. Over the decades, he dedicated his entire career to serving people through insurance, retiring as a Development Officer and later continuing as an agent. His unwavering commitment touched the lives of thousands of families, laying a strong foundation for the generations to come."
  },
  {
    id: 2,
    name: "Anil Amritlal Haria",
    designation: "Director",
    image: anilAmritlalHaria,
    bio: "Carrying this legacy forward, Mr. Anil Amritlal Haria embraced entrepreneurship early on. After beginning his career in the textile business, he chose to dedicate himself fully to the insurance profession to honor his father's vision. He expanded the family business beyond life insurance into health insurance and broader financial solutions, ensuring that our services evolved with the needs of our clients."
  },
  {
    id: 3,
    name: "Rohan Haria",
    designation: "Chartered Accountant",
    image: rohanHaria,
    bio: "A Chartered Accountant with 6 years of specialised experience in the financial services sector, having worked with two of India's most respected firms. During this time, he has developed deep expertise in auditing leading financial institutions, with a particular focus on mutual fund audits. This experience gave more than just technical knowledge—it provided a rare, behind-the-scenes understanding of how the investment ecosystem truly operates. From regulatory compliance to operational excellence, he has seen firsthand what it takes to protect and grow investor wealth. Today, he combines this professional insight with a client-first approach, offering advice that is transparent, precise, and driven by integrity."
  },
  {
    id: 4,
    name: "Raj Haria",
    designation: "MBA – NMIMS",
    image: rajHaria,
    bio: "Raj Haria, an MBA graduate from NMIMS, has been carrying forward his grandfather's legacy. Since 2015, he has expanded into mutual fund business while building strong expertise in life and general insurance. With a focus on trust and long term growth, he help clients achieve their financial goals one after the other."
  },
  {
    id: 5,
    name: "Meet Savla",
    designation: "Technical Specialist",
    image: meetSavla,
    bio: "Since 2017, He has been actively engaged in the financial markets, with a strong focus on technical analysis, and over time, he specialized in trading precious metals such as gold and silver. His approach blends data-driven insights with hands-on market experience, enabling him to identify opportunities, manage risk effectively, and navigate dynamic market conditions with discipline."
  }
];

// Bento grid features configuration
const bentoFeatures: BentoFeature[] = [
  {
    title: "Professional Achievements",
    description:
      "With over six decades of combined expertise, we have guided families through market cycles, economic changes, and evolving financial needs. From mutual funds and insurance to market trading and audits, our diverse strengths help clients protect, grow, and diversify wealth.",
    skeleton: <SkeletonOne imageSrc={teamPhoto} />,
    className:
      "col-span-1 md:col-span-4 lg:col-span-4 border-b md:border-r border-white/20",
  },
  {
    title: "Our Legacy",
    description:
      "Building trust since 1957, serving over 1000+ satisfied families across generations.",
    skeleton: <SkeletonStats stat1={{ value: "1957", label: "Legacy Since" }} stat2={{ value: "1000+", label: "Families Served" }} />,
    className: "col-span-1 md:col-span-2 lg:col-span-2 border-b border-white/20",
  },
  {
    title: "Vision",
    description:
      "To be recognized as a leading wealth and protection partner that combines innovation, integrity, and personalized care—enabling every client to build sustainable wealth, safeguard their future, and achieve financial freedom across generations.",
    skeleton: (
      <div className="relative flex py-8 px-2 gap-10 h-full">
        <div className="w-full mx-auto bg-white/10 backdrop-blur-sm shadow-2xl group h-full rounded-lg overflow-hidden">
          <img 
            src="/Commitment/Vision.jpg" 
            alt="Vision" 
            className="w-full h-full object-cover"
          />
        </div>
      </div>
    ),
    className:
      "col-span-1 md:col-span-3 lg:col-span-3 border-b md:border-r border-white/20",
  },
  {
    title: "Mission",
    description:
      "To provide holistic financial solutions that help individuals and families protect, grow, and diversify their wealth. Through trusted advice, research-driven strategies, and a wide spectrum of offerings, we empower clients to achieve financial security, prosperity, and peace of mind.",
    skeleton: (
      <div className="relative flex py-8 px-2 gap-10 h-full items-center justify-center">
        <div className="w-full max-w-md mx-auto bg-white/10 backdrop-blur-sm shadow-2xl rounded-lg overflow-hidden">
          <video 
            autoPlay 
            loop 
            muted 
            playsInline
            className="w-full h-full object-cover"
          >
            <source src="/Commitment/Mission.mp4" type="video/mp4" />
          </video>
        </div>
      </div>
    ),
    className: "col-span-1 md:col-span-3 lg:col-span-3 border-b md:border-r border-white/20",
  },
  {
    title: "Our Commitment",
    description:
      "Our vision, values, and tireless dedication continue to inspire us as we serve our clients today. We are proud to be the second and third generation reaping the rewards of our founders' hard work, and more importantly, carrying forward a tradition of trust and service that spans decades.",
    skeleton: (
      <div className="relative flex py-8 px-2 gap-10 h-full">
        <div className="w-full mx-auto bg-white/10 backdrop-blur-sm shadow-2xl group h-full rounded-lg overflow-hidden">
          <img 
            src="/Commitment/commit.png" 
            alt="Our Commitment" 
            className="w-full h-full object-cover"
          />
        </div>
      </div>
    ),
    className: "col-span-1 md:col-span-6 lg:col-span-6 border-b md:border-none",
  },
];

const AboutSection = () => {
  const [selectedMember, setSelectedMember] = useState<TooltipItem | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  useEffect(() => {
    AOS.init({ duration: 500, once: true });
  }, []);

  const handleMemberClick = (member: TooltipItem) => {
    setSelectedMember(member);
    setIsDialogOpen(true);
  };

  return (
    <section id="about" className="py-16 bg-tertiary text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div data-aos="fade-up" className="text-center mb-16">
          <p className="text-sm font-crimson text-white/70 uppercase tracking-wider mb-4">
            OUR TEAM
          </p>
          <h2 className="font-playfair text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight">
            Meet Our Team
          </h2>
          <p className="font-crimson text-lg md:text-xl text-white/90 max-w-4xl mx-auto leading-relaxed">
            Our legacy spans generations of financial expertise and dedication to client success.
          </p>
        </div>

        {/* Animated Team Member Avatars */}
        <motion.div 
          className="flex justify-center mb-20"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <AnimatedTooltip items={teamMembers} onItemClick={handleMemberClick} />
        </motion.div>

        {/* Bento Grid Section */}
        <FeaturesSectionWithBentoGrid
          title=""
          description=""
          features={bentoFeatures}
        />

        {/* Member Details Dialog */}
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto bg-white">
            {selectedMember && (
              <div className="space-y-6">
                <div className="flex flex-col md:flex-row gap-6 items-start">
                  <motion.img
                    src={selectedMember.image}
                    alt={selectedMember.name}
                    className="w-full md:w-48 h-64 object-cover object-top rounded-lg shadow-lg"
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.3 }}
                  />
                  <div className="flex-1">
                    <DialogHeader>
                      <DialogTitle className="text-3xl font-playfair text-tertiary mb-2">
                        {selectedMember.name}
                      </DialogTitle>
                      <Badge className="bg-secondary text-white w-fit mb-4">
                        {selectedMember.designation}
                      </Badge>
                    </DialogHeader>
                    <DialogDescription className="text-base font-crimson text-gray-700 leading-relaxed">
                      {selectedMember.bio}
                    </DialogDescription>
                  </div>
                </div>
              </div>
            )}
          </DialogContent>
        </Dialog>
      </div>
    </section>
  );
};

export default AboutSection;