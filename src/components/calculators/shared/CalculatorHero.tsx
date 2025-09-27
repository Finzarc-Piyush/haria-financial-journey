import { ReactNode } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

interface Breadcrumb {
    label: string;
    to?: string;
}

interface CalculatorHeroProps {
    title: string;
    subtitle: string;
    breadcrumbs: Breadcrumb[];
    icon?: ReactNode;
    badges?: ReactNode; // For TrustBadge or custom badges row
}

const CalculatorHero: React.FC<CalculatorHeroProps> = ({
    title,
    subtitle,
    breadcrumbs,
    icon,
    badges,
}) => (
    <div className="w-full min-h-[270px] bg-gradient-to-br from-background via-champagne/30 to-accent/10 flex flex-col items-center justify-center pt-0 pb-10 relative overflow-hidden">
        {/* Subtle SVG Dot Background */}
        <div
            className="absolute inset-0 opacity-20"
            style={{
                backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23228BEA' fill-opacity='0.1'%3E%3Ccircle cx='30' cy='30' r='2'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
            }}
        ></div>

        {/* Main Content */}
        <div className="w-full max-w-6xl mx-auto px-4 relative z-10">
            {/* Breadcrumbs */}
            <motion.nav
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="mb-4 mt-6"
            >
                <ol className="flex items-center space-x-2 text-base text-tertiary font-crimson">
                    {breadcrumbs.map((bc, i) => (
                        <li key={i} className="flex items-center">
                            {bc.to ? (
                                <Link to={bc.to} className="hover:underline">{bc.label}</Link>
                            ) : (
                                <span>{bc.label}</span>
                            )}
                            {i < breadcrumbs.length - 1 && <span className="mx-2">{'>'}</span>}
                        </li>
                    ))}
                </ol>
            </motion.nav>

            {/* Centered Content */}
            <div className="flex flex-col items-center text-center">
                {icon && (
                    <motion.div
                        initial={{ scale: 0.9, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        transition={{
                            duration: 0.8,
                            repeat: Infinity,
                            repeatType: 'reverse',
                            ease: 'easeInOut'
                        }}
                        className="inline-block text-5xl md:text-6xl text-secondary drop-shadow-glow mb-2"
                    >
                        {icon}
                    </motion.div>
                )}
                <motion.h1
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.2 }}
                    className="font-playfair text-3xl md:text-5xl font-bold mb-2 bg-gradient-to-r from-accent to-secondary bg-clip-text text-transparent"
                >
                    {title}
                </motion.h1>
                <motion.p
                    initial={{ opacity: 0, x: 40 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.8, delay: 0.4 }}
                    className="font-crimson text-lg md:text-xl text-tertiary mb-4"
                >
                    {subtitle}
                </motion.p>
                {badges && (
                    <motion.div
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.6, delay: 0.6 }}
                        className="mt-2 mb-2"
                    >
                        {badges}
                    </motion.div>
                )}
            </div>
        </div>
    </div>
);

export default CalculatorHero;