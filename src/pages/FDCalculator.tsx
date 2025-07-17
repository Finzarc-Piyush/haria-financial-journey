import { useEffect } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { useCalculator } from '@/hooks';
import { validateRange } from '@/utils';
import { CalculatorInput, ResultsDisplay, CalculatorButton, TrustBadge } from '@/components/calculators/shared';
import Navigation from '@/components/Navigation';
import { Card, CardHeader, CardContent } from '@/components/ui/card';
import { Breadcrumb, BreadcrumbList, BreadcrumbItem, BreadcrumbLink, BreadcrumbPage, BreadcrumbSeparator } from '@/components/ui/breadcrumb';
import { Accordion, AccordionItem, AccordionTrigger, AccordionContent } from '@/components/ui/accordion';
import { FaRegBuilding, FaUniversity } from 'react-icons/fa';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from 'recharts';

const defaultInputs = {
    principal: 100000,
    durationYears: 5,
    interestRate: 7.5,
};

// Fixed FD calculation function
const calculateFD = (inputs) => {
    const { principal, durationYears, interestRate } = inputs;

    // Simple Interest calculation (most common for FDs)
    const simpleInterest = (principal * interestRate * durationYears) / 100;
    const maturityValue = principal + simpleInterest;

    // Compound Interest calculation (for comparison)
    const compoundInterest = principal * Math.pow(1 + interestRate / 100, durationYears) - principal;
    const compoundMaturity = principal + compoundInterest;

    // Monthly breakdown for chart
    const monthlyBreakdown = [];
    for (let year = 1; year <= durationYears; year++) {
        const yearlyInterest = (principal * interestRate * year) / 100;
        const yearlyMaturity = principal + yearlyInterest;
        monthlyBreakdown.push({
            year: `Year ${year}`,
            principal: principal,
            interest: yearlyInterest,
            maturity: yearlyMaturity
        });
    }

    return {
        maturity: maturityValue,
        interest: simpleInterest,
        compoundMaturity: compoundMaturity,
        compoundInterest: compoundInterest,
        monthlyBreakdown: monthlyBreakdown,
        effectiveRate: (simpleInterest / principal) * 100,
        totalReturn: ((maturityValue - principal) / principal) * 100
    };
};

// Enhanced FD Bar Chart Component
const FDBarChart = ({ data, principal }) => {
    const colors = ['#E6C674', '#B4A078', '#8B7355'];

    const CustomTooltip = ({ active, payload, label }) => {
        if (active && payload && payload.length) {
            return (
                <div className="bg-white p-3 border border-[#E6C674]/30 rounded-lg shadow-lg">
                    <p className="font-semibold text-[#7b5e3e]">{label}</p>
                    <p className="text-[#B4A078]">Principal: ₹{payload[0].payload.principal.toLocaleString()}</p>
                    <p className="text-[#E6C674]">Interest: ₹{payload[0].payload.interest.toLocaleString()}</p>
                    <p className="text-[#8B7355] font-semibold">Maturity: ₹{payload[0].payload.maturity.toLocaleString()}</p>
                </div>
            );
        }
        return null;
    };

    return (
        <div className="w-full h-64">
            <ResponsiveContainer width="100%" height="100%">
                <BarChart data={data} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#E6C674/20" />
                    <XAxis
                        dataKey="year"
                        tick={{ fill: '#7b5e3e', fontSize: 12 }}
                        axisLine={{ stroke: '#E6C674' }}
                    />
                    <YAxis
                        tick={{ fill: '#7b5e3e', fontSize: 12 }}
                        axisLine={{ stroke: '#E6C674' }}
                        tickFormatter={(value: number) => `₹${(value / 1000).toFixed(0)}K`}
                    />
                    <Tooltip content={CustomTooltip} />
                    <Bar dataKey="principal" stackId="a" fill="#B4A078" name="Principal" />
                    <Bar dataKey="interest" stackId="a" fill="#E6C674" name="Interest" />
                </BarChart>
            </ResponsiveContainer>
        </div>
    );
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

const validationRules = {
    principal: (v: number) => validateRange(v, 1000, 10000000, 'Principal'),
    durationYears: (v: number) => validateRange(v, 1, 10, 'Duration'),
    interestRate: (v: number) => validateRange(v, 5, 12, 'Interest Rate'),
};

const FDCalculator = () => {
    useEffect(() => { window.scrollTo(0, 0); }, []);
    const { inputs, setInputs, errors, results, warnings } = useCalculator(defaultInputs, calculateFD, validationRules);

    const maturity = results?.maturity || 0;
    const interest = results?.interest || 0;
    const totalReturn = results?.totalReturn || 0;
    const monthlyBreakdown = results?.monthlyBreakdown || [];

    return (
        <div className="bg-[#F5F5F5] min-h-screen">
            <Navigation isTransparent={false} />
            {/* Breadcrumb Navigation */}
            <div className="w-full min-h-[340px] bg-gradient-to-br from-[#F5F1E8] via-[#E6C674]/30 to-[#E7BBA3]/60 flex flex-col items-center justify-center pt-24 pb-10 relative overflow-hidden">
                {/* Subtle background pattern */}
                <div
                    className="absolute inset-0 opacity-20"
                    style={{
                        backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23E6C674' fill-opacity='0.1'%3E%3Ccircle cx='30' cy='30' r='2'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
                    }}
                ></div>

                <div className="w-full max-w-6xl mx-auto px-4 relative z-10">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5 }}
                        viewport={{ once: true }}
                        className="mb-4"
                    >
                        <Breadcrumb>
                            <BreadcrumbList>
                                <BreadcrumbItem>
                                    <BreadcrumbLink href="/">Invest Smart</BreadcrumbLink>
                                </BreadcrumbItem>
                                <BreadcrumbSeparator />
                                <BreadcrumbItem>
                                    <BreadcrumbPage>FD Calculator</BreadcrumbPage>
                                </BreadcrumbItem>
                            </BreadcrumbList>
                        </Breadcrumb>
                    </motion.div>

                    {/* Optional FD Hero Heading and Subtitle (to match SIP layout) */}
                    <div
                        className="flex flex-col items-center text-center"
                        data-aos="fade-up"
                        data-aos-duration="600"
                        data-aos-easing="ease-out-cubic"
                    >
                        <motion.span
                            initial={{ scale: 0.9, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            transition={{
                                duration: 0.8,
                                repeat: Infinity,
                                repeatType: "reverse",
                                ease: "easeInOut",
                            }}
                            className="inline-block text-5xl md:text-6xl text-secondary drop-shadow-glow mb-2"
                        >
                            <FaUniversity />
                        </motion.span>
                        <motion.h1
                            initial={{ opacity: 0, y: 30 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.8, delay: 0.2 }}
                            className="font-playfair text-3xl md:text-5xl font-bold mb-2 bg-gradient-to-r from-[#B4A078] to-[#8B7355] bg-clip-text text-transparent"
                        >
                            Fixed Deposit Calculator
                        </motion.h1>

                        <motion.p
                            initial={{ opacity: 0, x: 40 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.8, delay: 0.4 }}
                            className="font-crimson text-lg md:text-xl text-tertiary mb-4"
                        >
                            Plan your guaranteed savings with FD
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

            {/* Main Grid */}
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
                        <CardHeader className="pb-6 bg-gradient-to-r from-[#F5F1E8] to-[#E6C674]/20">
                            <div className="flex items-center gap-3">
                                <motion.div whileHover={{ scale: 1.1, rotate: 5 }} className="p-2 rounded-full bg-[#E6C674]/20">
                                    <FaRegBuilding className="text-[#B4A078] text-xl" />
                                </motion.div>
                                <div>
                                    <h2 className="font-playfair text-2xl font-bold text-secondary">FD Details</h2>
                                    <p className="font-crimson text-base text-tertiary">Enter your fixed deposit details below</p>
                                </div>
                            </div>
                        </CardHeader>

                        <CardContent className="p-8 space-y-6">
                            <motion.div
                                whileHover={{ scale: 1.02 }}
                                transition={{ type: "spring", stiffness: 400, damping: 10 }}
                                data-aos="fade-up"
                                data-aos-delay="0"
                            >
                                <CalculatorInput
                                    label="Principal Amount"
                                    value={inputs.principal}
                                    onChange={v => setInputs(i => ({ ...i, principal: Number(v) }))}
                                    min={1000}
                                    max={10000000}
                                    step={1000}
                                    currency
                                    error={errors.principal}
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
                                    max={10}
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
                                    label="Interest Rate (%)"
                                    value={inputs.interestRate}
                                    onChange={v => setInputs(i => ({ ...i, interestRate: Number(v) }))}
                                    min={5}
                                    max={12}
                                    step={0.1}
                                    error={errors.interestRate}
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

                {/* Enhanced Vertical Separator */}
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
                    transition={{ type: "spring", stiffness: 400, damping: 30 }}
                    data-aos="fade-up"
                    data-aos-duration="600"
                    data-aos-easing="ease-out-cubic"
                >
                    <Card className="w-full max-w-xl mx-auto h-full bg-gradient-to-br from-[#F5F1E8]/90 to-white/80 backdrop-blur-lg rounded-2xl shadow-xl border border-[#E6C674]/30 overflow-hidden">
                        <CardHeader className="pb-6 bg-gradient-to-r from-[#E6C674]/10 to-[#E7BBA3]/10">
                            <div className="text-center">
                                <h2 className="font-playfair text-2xl font-bold text-secondary mb-1">FD Summary</h2>
                                <p className="font-crimson text-sm text-tertiary">Your fixed deposit projection</p>
                            </div>
                        </CardHeader>
                        <CardContent className="p-8 space-y-6">
                            <div className="grid grid-cols-2 gap-4">
                                <ResultsDisplay value={Math.round(maturity)} label="Maturity Value" currency={true} />
                                <ResultsDisplay value={Math.round(interest)} label="Interest Earned" currency={true} />
                                <ResultsDisplay value={Math.round(totalReturn)} label="Total Return (%)" currency={false} />
                                <ResultsDisplay value={Math.round(inputs.durationYears)} label="Duration (Years)" currency={false} />
                            </div>
                            <div className="w-full flex flex-col items-center mt-8" data-aos="fade-up" data-aos-delay="300">
                                <div className="w-full">
                                    <h3 className="font-playfair text-lg font-semibold text-[#7b5e3e] mb-4 text-center">
                                        Growth Over Time
                                    </h3>
                                    <FDBarChart data={monthlyBreakdown} principal={inputs.principal} />
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                </motion.div>
            </motion.div>


            {/* FAQ Section */}
            <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                viewport={{ once: true }}
                className="max-w-4xl mx-auto px-4 py-12"
                data-aos="fade-up"
                data-aos-duration="600"
            >
                <div className="bg-[#f9f5ef] rounded-2xl shadow-lg p-8 md:p-12">
                    <div className="text-center mb-8">
                        <h2 className="font-playfair text-2xl md:text-3xl font-semibold text-[#7b5e3e] mb-2">Frequently Asked Questions</h2>
                        <p className="font-crimson text-base md:text-lg text-[#b6a48a]">Everything you need to know about fixed deposit investments</p>
                    </div>
                    <motion.div
                        variants={{ visible: { transition: { staggerChildren: 0.15 } } }}
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true }}
                    >
                        <Accordion type="single" collapsible className="w-full divide-y divide-[#e8e1d7]">
                            {[{
                                value: 'how-fd-works',
                                question: 'How does an FD calculator work?',
                                answer: 'The FD calculator uses the simple interest formula to estimate your maturity value and interest earned based on your principal, duration, and interest rate.'
                            }, {
                                value: 'fd-tax',
                                question: 'Is the interest earned on FD taxable?',
                                answer: 'Yes, the interest earned on fixed deposits is taxable as per your income tax slab.'
                            }, {
                                value: 'fd-premature',
                                question: 'Can I break my FD before maturity?',
                                answer: 'Yes, you can break your FD before maturity, but you may incur a penalty and earn a lower interest rate.'
                            }].map((item, i) => (
                                <motion.div key={item.value} variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0 } }}>
                                    <AccordionItem value={item.value} className="group border-none transition-transform duration-200 hover:scale-[1.02] hover:shadow-lg">
                                        <AccordionTrigger className="flex items-center justify-between w-full py-4 px-6 font-playfair text-[1.1rem] font-medium text-[#7b5e3e] bg-transparent transition-colors duration-300 rounded-xl group-hover:bg-[#f2ebe3] group-hover:shadow-md focus:outline-none focus-visible:ring-2 focus-visible:ring-[#c69c72]">
                                            <span className="flex-1 text-left">{item.question}</span>

                                        </AccordionTrigger>
                                        <AccordionContent className="font-crimson text-[0.95rem] text-[#7b5e3e]/80 bg-[#fcf9f5] rounded-xl px-6 pb-4 mt-1" style={{ lineHeight: 1.7 }}>
                                            {item.answer}
                                        </AccordionContent>
                                    </AccordionItem>
                                </motion.div>
                            ))}
                        </Accordion>
                    </motion.div>
                </div>
            </motion.div>

        </div>
    );
};

export default FDCalculator;