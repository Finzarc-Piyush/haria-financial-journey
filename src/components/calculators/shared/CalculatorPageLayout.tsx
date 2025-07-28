import { ReactNode } from 'react';
import { motion } from 'framer-motion';

interface CalculatorPageLayoutProps {
    children: ReactNode;
}

const CalculatorPageLayout: React.FC<CalculatorPageLayoutProps> = ({ children }) => (
    <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.5 }}
        className="min-h-screen bg-gradient-to-br from-[#F5F1E8] to-white"
    >
        <main className="pt-20 pb-10">{children}</main>
    </motion.div>
);

export default CalculatorPageLayout; 