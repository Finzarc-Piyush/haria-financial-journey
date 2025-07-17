import { useEffect, useMemo } from 'react';
import AOS from 'aos';
import 'aos/dist/aos.css';
import { useCalculator } from '@/hooks';
import { calculateSIP } from '@/utils';
import { validateRange } from '@/utils';
import { SIPCalculatorInputs } from '@/types';
import {
    CalculatorInput,
    ResultsDisplay,
    CalculatorButton,
    TrustBadge,
    SIPDonutChart
} from '@/components/calculators/shared';
import { FaRupeeSign, FaChartPie, FaCalculator } from 'react-icons/fa';
import { PieChart } from 'react-minimal-pie-chart';
import Navigation from '@/components/Navigation';
import { Breadcrumb, BreadcrumbList, BreadcrumbItem, BreadcrumbLink, BreadcrumbPage, BreadcrumbSeparator } from '@/components/ui/breadcrumb';
import { motion, AnimatePresence } from 'framer-motion';
import { Card, CardHeader, CardContent } from '@/components/ui/card';
import { Accordion, AccordionItem, AccordionTrigger, AccordionContent } from '@/components/ui/accordion';
import { useAnimatedValue } from '@/components/calculators/shared/SIPDonutChart';

const defaultInputs: SIPCalculatorInputs = {
    monthlyInvestment: 10000,
    durationYears: 10,
    expectedReturns: 12,
    stepUpPercent: 0,
};

const validationRules = {
    monthlyInvestment: (v: number) => validateRange(v, 500, 500000, 'Monthly Amount'),
    durationYears: (v: number) => validateRange(v, 1, 30, 'Duration'),
    expectedReturns: (v: number) => validateRange(v, 8, 15, 'Expected Returns'),
    stepUpPercent: (v: number) => validateRange(v, 0, 10, 'Step-Up'),
};

// Enhanced animation variants
const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: {
            staggerChildren: 0.1,
            delayChildren: 0.2
        }
    }
};

const itemVariants = {
    hidden: { opacity: 0, y: 30, scale: 0.9 },
    visible: {
        opacity: 1,
        y: 0,
        scale: 1,
        transition: {
            type: "spring",
            stiffness: 100,
            damping: 12
        }
    }
};

const SIPCalculator = () => {
    useEffect(() => {
        AOS.init({ duration: 600, easing: 'ease-out-cubic', once: true });
        AOS.refresh();
    }, []);

    const {
        inputs, setInputs, errors, results, loading, chartReady, warnings
    } = useCalculator(defaultInputs, calculateSIP, validationRules);

    const pieData = useMemo(() => {
        if (!results) return [];
        let invested = results.invested;
        let returns = results.returns;

        const epsilon = 0.01;
        if (invested === returns) {
            returns += epsilon;
        }
        if (invested + returns === 0) {
            invested = epsilon;
            returns = epsilon;
        }
        return [
            { title: 'Invested', value: invested, color: '#B4A078' },
            { title: 'Returns', value: returns, color: '#E6C674' },
        ];
    }, [results]);

    // Calculate percentage growth for animations
    const growthPercentage = useMemo(() => {
        if (!results?.invested || !results?.returns) return 0;
        return ((results.returns / results.invested) * 100).toFixed(1);
    }, [results]);

    // Animated summary values
    const animatedCorpus = useAnimatedValue(results?.corpus || 0);
    const animatedInvested = useAnimatedValue(results?.invested || 0);
    const animatedReturns = useAnimatedValue(results?.returns || 0);
    const animatedReturnsPct = useAnimatedValue(
        results?.invested && results?.returns ? (results.returns / results.invested) * 100 : 0
    );

    return (
        <>
            <Navigation isTransparent={false} />
            {/* Enhanced Hero Section with better animations */}
            <div className="w-full min-h-[340px] bg-gradient-to-br from-[#F5F1E8] via-[#E6C674]/30 to-[#E7BBA3]/60 flex flex-col items-center justify-center pt-24 pb-10 relative overflow-hidden">
                {/* Subtle background pattern */}
                <div
                    className="absolute inset-0 opacity-20"
                    style={{
                        backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23E6C674' fill-opacity='0.1'%3E%3Ccircle cx='30' cy='30' r='2'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`
                    }}
                ></div>

                <div className="w-full max-w-6xl mx-auto px-4 relative z-10">
                    <Breadcrumb className="mb-4" data-aos="fade-down" data-aos-duration="600" data-aos-easing="ease-out-cubic">
                        <BreadcrumbList>
                            <BreadcrumbItem>
                                <BreadcrumbLink href="/">Invest Smart</BreadcrumbLink>
                            </BreadcrumbItem>
                            <BreadcrumbSeparator />
                            <BreadcrumbItem>
                                <BreadcrumbPage>SIP Calculator</BreadcrumbPage>
                            </BreadcrumbItem>
                        </BreadcrumbList>
                    </Breadcrumb>

                    <div className="flex flex-col items-center text-center" data-aos="fade-up" data-aos-duration="600" data-aos-easing="ease-out-cubic">
                        <motion.span
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
                            <FaRupeeSign />
                        </motion.span>

                        <motion.h1
                            initial={{ opacity: 0, y: 30 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.8, delay: 0.2 }}
                            className="font-playfair text-3xl md:text-5xl font-bold mb-2 bg-gradient-to-r from-[#B4A078] to-[#8B7355] bg-clip-text text-transparent"
                        >
                            Systematic Investment Plan
                        </motion.h1>

                        <motion.p
                            initial={{ opacity: 0, x: 40 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.8, delay: 0.4 }}
                            className="font-crimson text-lg md:text-xl text-tertiary mb-4"
                        >
                            Grow your wealth with disciplined investing
                        </motion.p>

                        <motion.div
                            initial={{ opacity: 0, scale: 0.8 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ duration: 0.6, delay: 0.6 }}
                            className="mt-2 mb-2"
                        >
                            <TrustBadge />
                        </motion.div>
                    </div>
                </div>
            </div>

            {/* Enhanced Main Content with better layout and animations */}
            <motion.div
                className="max-w-7xl mx-auto grid grid-cols-12 gap-8 py-12 px-4 items-stretch"
                initial="hidden"
                animate="visible"
                variants={containerVariants}
            >
                {/* Left: Enhanced Input Form */}
                <motion.div
                    className="col-span-12 lg:col-span-6 flex items-center"
                    initial="hidden"
                    animate="visible"
                    variants={itemVariants as any}
                    data-aos="fade-up"
                    data-aos-duration="600"
                    data-aos-easing="ease-out-cubic"
                >
                    <Card className="w-full max-w-xl mx-auto h-full bg-white/80 backdrop-blur-lg shadow-xl rounded-2xl border border-[#E6C674]/30 overflow-hidden">
                        {/* Card Header with Icon */}
                        <CardHeader className="pb-6 bg-gradient-to-r from-[#F5F1E8] to-[#E6C674]/20">
                            <div className="flex items-center gap-3">
                                <motion.div
                                    whileHover={{ scale: 1.1, rotate: 5 }}
                                    className="p-2 rounded-full bg-[#E6C674]/20"
                                >
                                    <FaCalculator className="text-[#B4A078] text-xl" />
                                </motion.div>
                                <div>
                                    <h2 className="font-playfair text-2xl font-bold text-secondary">SIP Details</h2>
                                    <p className="font-crimson text-base text-tertiary">Enter your investment details below</p>
                                </div>
                            </div>
                        </CardHeader>

                        <CardContent className="p-8 space-y-6">
                            {/* Enhanced Input Fields with micro-animations */}
                            <motion.div
                                whileHover={{ scale: 1.02 }}
                                transition={{ type: "spring", stiffness: 400, damping: 10 }}
                                data-aos="fade-up"
                                data-aos-delay="0"
                            >
                                <CalculatorInput
                                    label="Monthly Amount"
                                    value={inputs.monthlyInvestment}
                                    onChange={v => setInputs(i => ({ ...i, monthlyInvestment: Number(v) }))}
                                    min={500}
                                    max={500000}
                                    step={500}
                                    currency
                                    error={errors.monthlyInvestment}
                                />
                            </motion.div>

                            <motion.div
                                whileHover={{ scale: 1.02 }}
                                transition={{ type: "spring", stiffness: 400, damping: 10 }}
                                data-aos="fade-up"
                                data-aos-delay="100"
                            >
                                <CalculatorInput
                                    label="Duration (years)"
                                    value={inputs.durationYears}
                                    onChange={v => setInputs(i => ({ ...i, durationYears: Number(v) }))}
                                    min={1}
                                    max={30}
                                    error={errors.durationYears}
                                />
                            </motion.div>

                            <motion.div
                                whileHover={{ scale: 1.02 }}
                                transition={{ type: "spring", stiffness: 400, damping: 10 }}
                                data-aos="fade-up"
                                data-aos-delay="200"
                            >
                                <CalculatorInput
                                    label="Expected Returns (%)"
                                    value={inputs.expectedReturns}
                                    onChange={v => setInputs(i => ({ ...i, expectedReturns: Number(v) }))}
                                    min={8}
                                    max={15}
                                    step={0.1}
                                    error={errors.expectedReturns}
                                />
                            </motion.div>

                            <motion.div
                                whileHover={{ scale: 1.02 }}
                                transition={{ type: "spring", stiffness: 400, damping: 10 }}
                                data-aos="fade-up"
                                data-aos-delay="300"
                            >
                                <CalculatorInput
                                    label="Step-Up (%)"
                                    value={inputs.stepUpPercent || 0}
                                    onChange={v => setInputs(i => ({ ...i, stepUpPercent: Number(v) }))}
                                    min={0}
                                    max={10}
                                    step={0.1}
                                    error={errors.stepUpPercent}
                                />
                            </motion.div>

                            <AnimatePresence>
                                {warnings.length > 0 && (
                                    <motion.div
                                        initial={{ opacity: 0, height: 0 }}
                                        animate={{ opacity: 1, height: "auto" }}
                                        exit={{ opacity: 0, height: 0 }}
                                        className="bg-yellow-50 border border-yellow-200 rounded-lg p-3"
                                    >
                                        <div className="text-yellow-800 text-sm font-crimson">
                                            {warnings.map((w, index) => (
                                                <motion.div
                                                    key={w}
                                                    initial={{ opacity: 0, x: -20 }}
                                                    animate={{ opacity: 1, x: 0 }}
                                                    transition={{ delay: index * 0.1 }}
                                                >
                                                    {w}
                                                </motion.div>
                                            ))}
                                        </div>
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </CardContent>
                    </Card>
                </motion.div>

                {/* Enhanced Vertical Separator with gradient */}
                <motion.div
                    className="hidden lg:block col-span-1"
                    initial={{ opacity: 0, y: 20, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    transition={{ type: "spring", stiffness: 400, damping: 30 }}
                >
                    <div className="h-full w-px bg-gradient-to-b from-transparent via-[#E6C674]/60 to-transparent mx-auto"></div>
                </motion.div>

                {/* Right: Enhanced Results Section */}
                <motion.div
                    className="col-span-12 lg:col-span-5 flex items-center"
                    initial={{ opacity: 0, y: 20, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    transition={{ type: "spring" as const, stiffness: 400, damping: 30 }}
                    data-aos="fade-up"
                    data-aos-duration="600"
                    data-aos-easing="ease-out-cubic"
                >
                    <Card className="w-full max-w-xl mx-auto h-full bg-gradient-to-br from-[#F5F1E8]/90 to-white/80 backdrop-blur-lg rounded-2xl shadow-xl border border-[#E6C674]/30 overflow-hidden">
                        {/* Enhanced Header */}
                        <CardHeader className="pb-6 bg-gradient-to-r from-[#E6C674]/10 to-[#E7BBA3]/10">
                            <div className="text-center">
                                <h2 className="font-playfair text-2xl font-bold text-secondary mb-1">Investment Summary</h2>
                                <p className="font-crimson text-sm text-tertiary">Your wealth projection</p>
                            </div>
                        </CardHeader>

                        <CardContent className="p-8 space-y-6">
                            {/* 2x2 Grid of Metric Cards */}
                            <div className="grid grid-cols-2 gap-4">
                                <motion.div
                                    variants={{
                                        hidden: { opacity: 0, y: 20, scale: 0.9 },
                                        visible: { opacity: 1, y: 0, scale: 1 }
                                    }}
                                    whileHover={{ scale: 1.05, y: -2 }}
                                    className="p-4 rounded-xl bg-gradient-to-br from-[#E6C674]/20 to-[#E7BBA3]/20 border border-[#E6C674]/30 text-center"
                                    data-aos="fade-up"
                                    data-aos-delay="0"
                                >
                                    <div className="font-playfair text-lg text-secondary mb-1">Maturity Value</div>
                                    <div className="font-playfair text-xl font-bold text-secondary">
                                        ₹{Math.round(animatedCorpus).toLocaleString('en-IN')}
                                    </div>
                                </motion.div>

                                <motion.div
                                    variants={{
                                        hidden: { opacity: 0, y: 20, scale: 0.9 },
                                        visible: { opacity: 1, y: 0, scale: 1 }
                                    }}
                                    whileHover={{ scale: 1.05, y: -2 }}
                                    className="p-4 rounded-xl bg-gradient-to-br from-[#B4A078]/20 to-[#8B7355]/20 border border-[#B4A078]/30 text-center"
                                    data-aos="fade-up"
                                    data-aos-delay="100"
                                >
                                    <div className="font-playfair text-lg text-secondary mb-1">Amount Invested</div>
                                    <div className="font-playfair text-xl font-bold text-secondary">
                                        ₹{Math.round(animatedInvested).toLocaleString('en-IN')}
                                    </div>
                                </motion.div>

                                <motion.div
                                    variants={{
                                        hidden: { opacity: 0, y: 20, scale: 0.9 },
                                        visible: { opacity: 1, y: 0, scale: 1 }
                                    }}
                                    whileHover={{ scale: 1.05, y: -2 }}
                                    className="p-4 rounded-xl bg-gradient-to-br from-green-100 to-green-50 border border-green-200 text-center"
                                    data-aos="fade-up"
                                    data-aos-delay="200"
                                >
                                    <div className="font-playfair text-lg text-secondary mb-1">Wealth Gained</div>
                                    <div className="font-playfair text-xl font-bold text-green-700">
                                        ₹{Math.round(animatedReturns).toLocaleString('en-IN')}
                                    </div>
                                </motion.div>

                                <motion.div
                                    variants={{
                                        hidden: { opacity: 0, y: 20, scale: 0.9 },
                                        visible: { opacity: 1, y: 0, scale: 1 }
                                    }}
                                    whileHover={{ scale: 1.05, y: -2 }}
                                    className="p-4 rounded-xl bg-gradient-to-br from-blue-100 to-blue-50 border border-blue-200 text-center"
                                    data-aos="fade-up"
                                    data-aos-delay="300"
                                >
                                    <div className="font-playfair text-lg text-secondary mb-1">Returns (%)</div>
                                    <div className="font-playfair text-xl font-bold text-blue-700">
                                        {Math.round(animatedReturnsPct)}%
                                    </div>
                                </motion.div>
                            </div>

                            {/* Enhanced Pie Chart */}
                            <div className="w-full flex flex-col items-center" data-aos="fade-up" data-aos-delay="400">
                                <SIPDonutChart invested={results?.invested || 0} returns={results?.returns || 0} />
                            </div>
                        </CardContent>
                    </Card>
                </motion.div>
            </motion.div>

            {/* FAQ Section - Outside Grid Layout */}
            <section
                className="max-w-4xl mx-auto px-4 py-12"
                data-aos="fade-up"
                data-aos-duration="600"
                data-aos-easing="ease-out-cubic"
            >
                <div className="bg-[#f9f5ef] rounded-2xl shadow-lg p-8 md:p-12">
                    <div className="text-center mb-8">
                        <h2 className="font-playfair text-2xl md:text-3xl font-semibold text-[#7b5e3e] mb-2">Frequently Asked Questions</h2>
                        <p className="font-crimson text-base md:text-lg text-[#b6a48a]">Everything you need to know about SIP investments</p>
                    </div>
                    <Accordion
                        type="single"
                        collapsible
                        className="w-full divide-y divide-[#e8e1d7]"
                    >
                        <AccordionItem value="stepup" className="group border-none">
                            <AccordionTrigger
                                className="flex items-center justify-between w-full py-4 px-6 font-playfair text-[1.1rem] font-medium text-[#7b5e3e] bg-transparent transition-colors duration-300 rounded-xl group-hover:bg-[#f2ebe3] group-hover:shadow-md focus:outline-none focus-visible:ring-2 focus-visible:ring-[#c69c72]"
                                style={{ lineHeight: 1.5 }}
                            >
                                <span className="flex-1 text-left">How does Step-Up SIP work?</span>
                            </AccordionTrigger>
                            <AccordionContent className="font-crimson text-[0.95rem] text-[#7b5e3e]/80 bg-[#fcf9f5] rounded-xl px-6 pb-4 mt-1" style={{ lineHeight: 1.7 }}>
                                Step-Up SIP allows you to increase your monthly investment amount by a fixed percentage every year. This helps you grow your investments faster and keep up with inflation or rising income. For example, a 5% step-up means your SIP amount will increase by 5% each year.
                            </AccordionContent>
                        </AccordionItem>
                        <AccordionItem value="whatis" className="group border-none">
                            <AccordionTrigger
                                className="flex items-center justify-between w-full py-4 px-6 font-playfair text-[1.1rem] font-medium text-[#7b5e3e] bg-transparent transition-colors duration-300 rounded-xl group-hover:bg-[#f2ebe3] group-hover:shadow-md focus:outline-none focus-visible:ring-2 focus-visible:ring-[#c69c72]"
                                style={{ lineHeight: 1.5 }}
                            >
                                <span className="flex-1 text-left">What is a SIP?</span>
                            </AccordionTrigger>
                            <AccordionContent className="font-crimson text-[0.95rem] text-[#7b5e3e]/80 bg-[#fcf9f5] rounded-xl px-6 pb-4 mt-1" style={{ lineHeight: 1.7 }}>
                                SIP stands for Systematic Investment Plan. It is a disciplined way to invest a fixed amount regularly in mutual funds, helping you build wealth over time through the power of compounding and rupee cost averaging.
                            </AccordionContent>
                        </AccordionItem>
                        <AccordionItem value="corpus" className="group border-none">
                            <AccordionTrigger
                                className="flex items-center justify-between w-full py-4 px-6 font-playfair text-[1.1rem] font-medium text-[#7b5e3e] bg-transparent transition-colors duration-300 rounded-xl group-hover:bg-[#f2ebe3] group-hover:shadow-md focus:outline-none focus-visible:ring-2 focus-visible:ring-[#c69c72]"
                                style={{ lineHeight: 1.5 }}
                            >
                                <span className="flex-1 text-left">How is the final corpus calculated?</span>
                            </AccordionTrigger>
                            <AccordionContent className="font-crimson text-[0.95rem] text-[#7b5e3e]/80 bg-[#fcf9f5] rounded-xl px-6 pb-4 mt-1" style={{ lineHeight: 1.7 }}>
                                The final corpus is calculated based on your monthly investment, the duration, expected annual returns, and any step-up percentage. The calculator uses the compound interest formula to estimate your maturity amount.
                            </AccordionContent>
                        </AccordionItem>
                        <AccordionItem value="changeamount" className="group border-none">
                            <AccordionTrigger
                                className="flex items-center justify-between w-full py-4 px-6 font-playfair text-[1.1rem] font-medium text-[#7b5e3e] bg-transparent transition-colors duration-300 rounded-xl group-hover:bg-[#f2ebe3] group-hover:shadow-md focus:outline-none focus-visible:ring-2 focus-visible:ring-[#c69c72]"
                                style={{ lineHeight: 1.5 }}
                            >
                                <span className="flex-1 text-left">Can I change my SIP amount later?</span>
                            </AccordionTrigger>
                            <AccordionContent className="font-crimson text-[0.95rem] text-[#7b5e3e]/80 bg-[#fcf9f5] rounded-xl px-6 pb-4 mt-1" style={{ lineHeight: 1.7 }}>
                                Yes, you can increase, decrease, or stop your SIP at any time. Many mutual funds allow you to modify your SIP instructions online or through your advisor. Step-Up SIP is a popular way to increase your investment automatically each year.
                            </AccordionContent>
                        </AccordionItem>
                    </Accordion>
                </div>
            </section>
        </>
    );
};

export default SIPCalculator;