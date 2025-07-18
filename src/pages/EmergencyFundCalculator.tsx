import { useEffect } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { useCalculator } from '@/hooks';
import { calculateEmergencyFund, validateRange } from '@/utils';
import {
    CalculatorInput,
    ResultsDisplay,
    TrustBadge,
} from '@/components/calculators/shared';
import Navigation from '@/components/Navigation';
import { Card, CardHeader, CardContent } from '@/components/ui/card';
import {
    Breadcrumb,
    BreadcrumbList,
    BreadcrumbItem,
    BreadcrumbLink,
    BreadcrumbPage,
    BreadcrumbSeparator
} from '@/components/ui/breadcrumb';
import {
    Accordion,
    AccordionItem,
    AccordionTrigger,
    AccordionContent
} from '@/components/ui/accordion';
import { FaHeartbeat } from 'react-icons/fa';
import EmergencyFundBarChart from '@/components/calculators/shared/EmergencyFundBarChart';

const defaultInputs = {
    monthlyExpenses: 50000,
    monthsCovered: 6
};

const validationRules = {
    monthlyExpenses: (v) => validateRange(v, 10000, 500000, 'Monthly Expense'),
    monthsCovered: (v) => validateRange(v, 3, 12, 'Months Coverage')
};

const EmergencyFundCalculator = () => {
    useEffect(() => { window.scrollTo(0, 0); }, []);
    const { inputs, setInputs, errors, results, warnings } = useCalculator(defaultInputs, calculateEmergencyFund, validationRules);
    const fund = results?.recommendedFund || 0;

    return (
        <div className="bg-[#F5F5F5] min-h-screen">
            <Navigation isTransparent={false} />

            <div className="w-full min-h-[340px] bg-gradient-to-br from-[#F5F1E8] via-[#E6C674]/30 to-[#E7BBA3]/60 flex flex-col items-center justify-center pt-24 pb-10 relative overflow-hidden">
                <div className="absolute inset-0 opacity-20" style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' ... ")` }}></div>
                <div className="w-full max-w-6xl mx-auto px-4 relative z-10">
                    <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }} viewport={{ once: true }} className="mb-4">
                        <Breadcrumb>
                            <BreadcrumbList>
                                <BreadcrumbItem><BreadcrumbLink href="/">Home</BreadcrumbLink></BreadcrumbItem>
                                <BreadcrumbSeparator />
                                <BreadcrumbItem><BreadcrumbPage>Emergency Fund Calculator</BreadcrumbPage></BreadcrumbItem>
                            </BreadcrumbList>
                        </Breadcrumb>
                    </motion.div>

                    <div className="flex flex-col items-center text-center">
                        <motion.span initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} transition={{ duration: 0.8, repeat: Infinity, repeatType: 'reverse', ease: 'easeInOut' }} className="inline-block text-5xl md:text-6xl text-secondary drop-shadow-glow mb-2">
                            <FaHeartbeat />
                        </motion.span>
                        <motion.h1 initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.2 }} className="font-playfair text-3xl md:text-5xl font-bold mb-2 bg-gradient-to-r from-[#B4A078] to-[#8B7355] bg-clip-text text-transparent">
                            Emergency Fund Calculator
                        </motion.h1>
                        <motion.p initial={{ opacity: 0, x: 40 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.8, delay: 0.4 }} className="font-crimson text-lg md:text-xl text-tertiary mb-4">
                            Plan your financial safety net
                        </motion.p>
                        <motion.div initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.6, delay: 0.6 }} className="mt-2 mb-2">
                            <TrustBadge />
                        </motion.div>
                    </div>
                </div>
            </div>

            <motion.div className="max-w-7xl mx-auto grid grid-cols-12 gap-8 py-12 px-4 items-stretch" initial="hidden" animate="visible" variants={{ visible: { transition: { staggerChildren: 0.1, delayChildren: 0.2 } } }}>
                <motion.div className="col-span-12 lg:col-span-6 flex items-center" initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
                    <Card className="w-full max-w-xl mx-auto h-full bg-white/80 backdrop-blur-lg shadow-xl rounded-2xl border border-[#E6C674]/30 overflow-hidden">
                        <CardHeader className="pb-6 bg-gradient-to-r from-[#F5F1E8] to-[#E6C674]/20">
                            <div className="flex items-center gap-3">
                                <FaHeartbeat className="text-[#B4A078] text-xl" />
                                <div>
                                    <h2 className="font-playfair text-2xl font-bold text-secondary">Emergency Fund Details</h2>
                                    <p className="font-crimson text-base text-tertiary">Enter your emergency fund details below</p>
                                </div>
                            </div>
                        </CardHeader>
                        <CardContent className="p-8 space-y-6">
                            <CalculatorInput label="Monthly Expense (₹)" value={inputs.monthlyExpenses} onChange={v => setInputs(i => ({ ...i, monthlyExpenses: Number(v) }))} min={10000} max={500000} step={1000} currency error={errors.monthlyExpenses} />
                            <CalculatorInput label="Months of Coverage" value={inputs.monthsCovered} onChange={v => setInputs(i => ({ ...i, monthsCovered: Number(v) }))} min={3} max={12} error={errors.monthsCovered} />
                            <AnimatePresence>
                                {warnings.length > 0 && (
                                    <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} exit={{ opacity: 0, height: 0 }} className="bg-yellow-50 border border-yellow-200 rounded-lg p-3">
                                        <div className="text-yellow-800 text-sm font-crimson">
                                            {warnings.map((w, index) => (
                                                <motion.div key={w} initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: index * 0.1 }}>{w}</motion.div>
                                            ))}
                                        </div>
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </CardContent>
                    </Card>
                </motion.div>

                <motion.div className="col-span-12 lg:col-span-6 flex items-center" initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
                    <Card className="w-full max-w-xl mx-auto h-full bg-gradient-to-br from-[#F5F1E8]/90 to-white/80 backdrop-blur-lg rounded-2xl shadow-xl border border-[#E6C674]/30 overflow-hidden">
                        <CardHeader className="pb-6 bg-gradient-to-r from-[#E6C674]/10 to-[#E7BBA3]/10">
                            <div className="text-center">
                                <h2 className="font-playfair text-2xl font-bold text-secondary mb-1">Emergency Fund Summary</h2>
                                <p className="font-crimson text-sm text-tertiary">Your emergency fund projection</p>
                            </div>
                        </CardHeader>
                        <CardContent className="p-8 space-y-6">
                            <div className="grid grid-cols-2 gap-4">
                                <ResultsDisplay value={Math.round(fund)} label="Total Fund Needed" currency={true} />
                                <ResultsDisplay value={Math.round(inputs.monthlyExpenses)} label="Monthly Expense" currency={true} />
                                <ResultsDisplay value={inputs.monthsCovered} label="Months Coverage" currency={false} />
                            </div>
                            <div className="w-full flex flex-col items-center mt-8">
                                <EmergencyFundBarChart monthlyExpense={inputs.monthlyExpenses} monthsCovered={inputs.monthsCovered} />
                            </div>
                        </CardContent>
                    </Card>
                </motion.div>
            </motion.div>

            <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }} viewport={{ once: true }} className="max-w-4xl mx-auto px-4 py-12">
                <div className="bg-[#f9f5ef] rounded-2xl shadow-lg p-8 md:p-12">
                    <div className="text-center mb-8">
                        <h2 className="font-playfair text-2xl md:text-3xl font-semibold text-[#7b5e3e] mb-2">Frequently Asked Questions</h2>
                        <p className="font-crimson text-base md:text-lg text-[#b6a48a]">Everything you need to know about emergency funds</p>
                    </div>
                    <Accordion type="single" collapsible className="w-full divide-y divide-[#e8e1d7]">
                        {[{
                            value: 'how-emergency-fund-works',
                            question: 'How does the Emergency Fund Calculator work?',
                            answer: 'The calculator multiplies your monthly expenses by the number of months you want to cover to estimate your recommended emergency fund.'
                        }, {
                            value: 'how-much-fund',
                            question: 'How much emergency fund should I have?',
                            answer: 'Most experts recommend 6-12 months of living expenses as an emergency fund.'
                        }, {
                            value: 'where-to-keep',
                            question: 'Where should I keep my emergency fund?',
                            answer: 'Keep your emergency fund in a liquid, low-risk account such as a savings account or liquid mutual fund.'
                        }].map((item) => (
                            <AccordionItem key={item.value} value={item.value} className="group border-none">
                                <AccordionTrigger className="flex items-center justify-between w-full py-4 px-6 font-playfair text-[1.1rem] font-medium text-[#7b5e3e]">
                                    <span className="flex-1 text-left">{item.question}</span>
                                </AccordionTrigger>
                                <AccordionContent className="font-crimson text-[0.95rem] text-[#7b5e3e]/80 bg-[#fcf9f5] rounded-xl px-6 pb-4 mt-1" style={{ lineHeight: 1.7 }}>
                                    {item.answer}
                                </AccordionContent>
                            </AccordionItem>
                        ))}
                    </Accordion>
                </div>
            </motion.div>
        </div>
    );
};

export default EmergencyFundCalculator;