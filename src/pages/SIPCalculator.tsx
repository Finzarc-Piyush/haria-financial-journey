import { useMemo } from 'react';
import { useCalculator } from '@/hooks/useCalculator';
import CalculatorHeader from '@/components/calculators/shared/CalculatorHeader';
import CalculatorInput from '@/components/calculators/shared/CalculatorInput';
import ResultsDisplay from '@/components/calculators/shared/ResultsDisplay';
import CalculatorButton from '@/components/calculators/shared/CalculatorButton';
import TrustBadge from '@/components/calculators/shared/TrustBadge';
import { FaRupeeSign } from 'react-icons/fa';
import { SIPCalculatorInputs } from '@/types/calculator.types';
import { calculateSIP } from '@/utils/calculatorFunctions';
import { validateRange } from '@/utils/validators';
import { PieChart } from 'react-minimal-pie-chart';
import Navigation from '@/components/Navigation';
import { Breadcrumb, BreadcrumbList, BreadcrumbItem, BreadcrumbLink, BreadcrumbPage, BreadcrumbSeparator } from '@/components/ui/breadcrumb';
import { motion } from 'framer-motion';
import { Card, CardHeader, CardContent } from '@/components/ui/card';
import { Accordion, AccordionItem, AccordionTrigger, AccordionContent } from '@/components/ui/accordion';

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

const SIPCalculator = () => {
    const {
        inputs, setInputs, errors, results, loading, chartReady, warnings
    } = useCalculator(defaultInputs, calculateSIP, validationRules);

    const pieData = useMemo(() => {
        if (!results) return [];
        let invested = results.invested;
        let returns = results.returns;
        // Debug log
        console.log('PieChart values:', { invested, returns });
        // Add epsilon if values are visually equal or sum is zero
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

    return (
        <>
            <Navigation isTransparent={false} />
            {/* Hero/Header Section */}
            <div className="w-full min-h-[340px] bg-gradient-to-br from-[#F5F1E8] via-[#E6C674]/30 to-[#E7BBA3]/60 flex flex-col items-center justify-center pt-24 pb-10 relative">
                <div className="w-full max-w-6xl mx-auto px-4">
                    {/* Breadcrumb */}
                    <Breadcrumb className="mb-4">
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
                    <div className="flex flex-col items-center text-center">
                        <motion.span
                            initial={{ scale: 0.9, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            transition={{ duration: 0.8, repeat: Infinity, repeatType: 'reverse', ease: 'easeInOut' }}
                            className="inline-block text-5xl md:text-6xl text-secondary drop-shadow-glow mb-2"
                        >
                            <FaRupeeSign />
                        </motion.span>
                        <motion.h1
                            initial={{ opacity: 0, y: 30 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.8, delay: 0.2 }}
                            className="font-playfair text-3xl md:text-5xl font-bold mb-2"
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
                        {/* TrustBadge placeholder for animation, will move up in later steps */}
                        <div className="mt-2 mb-2">
                            <TrustBadge />
                        </div>
                    </div>
                </div>
            </div>
            {/* Main Content Grid Layout (placeholder) */}
            <div className="max-w-7xl mx-auto grid grid-cols-12 gap-8 py-12 px-4">
                {/* Left: Input Form (col-span-12 md:col-span-6) */}
                <div className="col-span-12 md:col-span-6 flex items-center">
                    <Card className="w-full max-w-xl mx-auto bg-white/70 backdrop-blur-md shadow-lg rounded-xl p-8">
                        <CardHeader className="pb-4">
                            <h2 className="font-playfair text-2xl font-bold mb-1">SIP Details</h2>
                            <p className="font-crimson text-base text-tertiary">Enter your investment details below</p>
                        </CardHeader>
                        <CardContent className="space-y-4">
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
                            <CalculatorInput
                                label="Duration (years)"
                                value={inputs.durationYears}
                                onChange={v => setInputs(i => ({ ...i, durationYears: Number(v) }))}
                                min={1}
                                max={30}
                                error={errors.durationYears}
                            />
                            <CalculatorInput
                                label="Expected Returns (%)"
                                value={inputs.expectedReturns}
                                onChange={v => setInputs(i => ({ ...i, expectedReturns: Number(v) }))}
                                min={8}
                                max={15}
                                step={0.1}
                                error={errors.expectedReturns}
                            />
                            <CalculatorInput
                                label="Step-Up (%)"
                                value={inputs.stepUpPercent || 0}
                                onChange={v => setInputs(i => ({ ...i, stepUpPercent: Number(v) }))}
                                min={0}
                                max={10}
                                step={0.1}
                                error={errors.stepUpPercent}
                            />
                            {warnings.length > 0 && (
                                <div className="text-yellow-600 text-xs font-crimson mb-2 animate-fade-in">
                                    {warnings.map(w => <div key={w}>{w}</div>)}
                                </div>
                            )}
                        </CardContent>
                    </Card>
                </div>
                {/* Vertical Separator */}
                <div className="hidden md:block col-span-1 border-l-2 border-[#E6C674]/40" />
                {/* Right: Results/Chart (col-span-12 md:col-span-5) */}
                <div className="col-span-12 md:col-span-5 flex items-center">
                    <Card className="w-full max-w-xl mx-auto bg-[#F5F1E8]/80 rounded-xl shadow-md border border-[#E6C674]/20 p-8">
                        <CardHeader className="pb-4">
                            <h2 className="font-playfair text-2xl font-bold mb-1">Your Investment Summary</h2>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <motion.div
                                initial="hidden"
                                animate="visible"
                                variants={{
                                    visible: { transition: { staggerChildren: 0.2 } },
                                }}
                                className="flex flex-col gap-4"
                            >
                                <motion.div
                                    variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0 } }}
                                >
                                    <ResultsDisplay
                                        value={Math.round(results?.corpus || 0)}
                                        label="Final Corpus"
                                    />
                                </motion.div>
                                <motion.div
                                    variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0 } }}
                                >
                                    <ResultsDisplay
                                        value={Math.round(results?.invested || 0)}
                                        label="Total Invested"
                                    />
                                </motion.div>
                                <motion.div
                                    variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0 } }}
                                >
                                    <ResultsDisplay
                                        value={Math.round(results?.returns || 0)}
                                        label="Returns Earned"
                                    />
                                </motion.div>
                            </motion.div>
                            {chartReady && results && (
                                <motion.div
                                    initial={{ opacity: 0, scale: 0.95 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    transition={{ duration: 0.7, delay: 0.5 }}
                                    className="w-full max-w-md mx-auto flex flex-col items-center mb-4 ring-4 ring-[#E6C674]/30 rounded-full bg-white/80"
                                    style={{ height: 200, padding: 8 }}
                                >
                                    <PieChart
                                        data={pieData}
                                        animate
                                        lineWidth={45}
                                        label={({ dataEntry }) => dataEntry.value > 0 ? dataEntry.title : ''}
                                        labelPosition={60}
                                        segmentsShift={() => 1}
                                        segmentsStyle={{ transition: 'stroke .3s', cursor: 'pointer' }}
                                        labelStyle={{
                                            fontSize: '12px',
                                            fontFamily: 'Crimson Text',
                                            fill: '#3A3A3A',
                                            fontWeight: 'bold',
                                            pointerEvents: 'none',
                                        }}
                                        style={{ height: 200 }}
                                    />
                                </motion.div>
                            )}
                            {/* FAQ/Quick Tip Accordion placeholder */}
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.7, delay: 1 }}
                                className="mt-6"
                            >
                                <Accordion type="single" collapsible className="w-full bg-white/60 rounded-lg shadow-sm">
                                    <AccordionItem value="stepup">
                                        <AccordionTrigger className="font-playfair text-base md:text-lg text-secondary">
                                            How does Step-Up SIP work?
                                        </AccordionTrigger>
                                        <AccordionContent className="font-crimson text-sm md:text-base text-tertiary">
                                            Step-Up SIP allows you to increase your monthly investment amount by a fixed percentage every year. This helps you grow your investments faster and keep up with inflation or rising income. For example, a 5% step-up means your SIP amount will increase by 5% each year.
                                        </AccordionContent>
                                    </AccordionItem>
                                    <AccordionItem value="whatis">
                                        <AccordionTrigger className="font-playfair text-base md:text-lg text-secondary">
                                            What is a SIP?
                                        </AccordionTrigger>
                                        <AccordionContent className="font-crimson text-sm md:text-base text-tertiary">
                                            SIP stands for Systematic Investment Plan. It is a disciplined way to invest a fixed amount regularly in mutual funds, helping you build wealth over time through the power of compounding and rupee cost averaging.
                                        </AccordionContent>
                                    </AccordionItem>
                                    <AccordionItem value="corpus">
                                        <AccordionTrigger className="font-playfair text-base md:text-lg text-secondary">
                                            How is the final corpus calculated?
                                        </AccordionTrigger>
                                        <AccordionContent className="font-crimson text-sm md:text-base text-tertiary">
                                            The final corpus is calculated based on your monthly investment, the duration, expected annual returns, and any step-up percentage. The calculator uses the compound interest formula to estimate your maturity amount.
                                        </AccordionContent>
                                    </AccordionItem>
                                    <AccordionItem value="changeamount">
                                        <AccordionTrigger className="font-playfair text-base md:text-lg text-secondary">
                                            Can I change my SIP amount later?
                                        </AccordionTrigger>
                                        <AccordionContent className="font-crimson text-sm md:text-base text-tertiary">
                                            Yes, you can increase, decrease, or stop your SIP at any time. Many mutual funds allow you to modify your SIP instructions online or through your advisor. Step-Up SIP is a popular way to increase your investment automatically each year.
                                        </AccordionContent>
                                    </AccordionItem>
                                </Accordion>
                            </motion.div>
                        </CardContent>
                    </Card>
                </div>
            </div>
            {/* Persistent CTA Footer */}
            <motion.div
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: 1.2 }}
                className="fixed bottom-0 left-0 w-full z-40 flex justify-center pointer-events-none"
            >
                <div className="pointer-events-auto w-full max-w-2xl mx-auto bg-white/90 shadow-2xl rounded-t-2xl flex flex-col items-center py-4 px-6 mb-0 md:mb-4 border-t border-[#E6C674]/30">
                    <CalculatorButton className="w-full max-w-xs text-lg font-playfair shadow-md">
                        Discuss SIP strategy with our advisors
                    </CalculatorButton>
                </div>
            </motion.div>
        </>
    );
};

export default SIPCalculator; 