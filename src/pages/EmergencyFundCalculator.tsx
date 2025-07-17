import { useEffect } from 'react';
import { motion } from 'framer-motion';
import { useCalculator } from '@/hooks';
import { calculateEmergencyFund } from '@/utils';
import { validateRange } from '@/utils';
import { CalculatorInput, ResultsDisplay, CalculatorButton, TrustBadge, SIPDonutChart } from '@/components/calculators/shared';
import Navigation from '@/components/Navigation';
import { Card, CardHeader, CardContent } from '@/components/ui/card';
import { Breadcrumb, BreadcrumbList, BreadcrumbItem, BreadcrumbLink, BreadcrumbPage, BreadcrumbSeparator } from '@/components/ui/breadcrumb';
import { Accordion, AccordionItem, AccordionTrigger, AccordionContent } from '@/components/ui/accordion';
import { FaUmbrella } from 'react-icons/fa';

const defaultInputs = {
    monthlyExpenses: 50000,
    monthsCovered: 6,
};

const validationRules = {
    monthlyExpenses: (v: number) => validateRange(v, 10000, 500000, 'Monthly Expense'),
    monthsCovered: (v: number) => validateRange(v, 3, 12, 'Months Coverage'),
};

const EmergencyFundCalculator = () => {
    useEffect(() => { window.scrollTo(0, 0); }, []);
    const { inputs, setInputs, errors, results, warnings } = useCalculator(defaultInputs, calculateEmergencyFund, validationRules);
    const fund = results?.recommendedFund || 0;

    return (
        <div className="bg-[#F5F5F5] min-h-screen">
            <Navigation isTransparent={false} />
            <div className="pt-20">
                {/* Breadcrumb Navigation */}
                <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }} viewport={{ once: true }} className="w-full max-w-6xl mx-auto px-4 mb-8">
                    <Breadcrumb>
                        <BreadcrumbList>
                            <BreadcrumbItem>
                                <BreadcrumbLink href="/">Home</BreadcrumbLink>
                            </BreadcrumbItem>
                            <BreadcrumbSeparator />
                            <BreadcrumbItem>
                                <BreadcrumbLink href="/">Calculators</BreadcrumbLink>
                            </BreadcrumbItem>
                            <BreadcrumbSeparator />
                            <BreadcrumbItem>
                                <BreadcrumbPage>Emergency Fund Calculator</BreadcrumbPage>
                            </BreadcrumbItem>
                        </BreadcrumbList>
                    </Breadcrumb>
                </motion.div>
                {/* Main Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-10 px-4 md:px-12 py-8 md:py-16">
                    {/* Left: Inputs */}
                    <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }} viewport={{ once: true }}>
                        <Card className="w-full max-w-xl mx-auto h-full bg-white/80 backdrop-blur-lg shadow-xl rounded-2xl border border-[#E6C674]/30 overflow-hidden">
                            <CardHeader className="pb-6 bg-gradient-to-r from-[#F5F1E8] to-[#E6C674]/20">
                                <div className="flex items-center gap-3">
                                    <FaUmbrella className="text-2xl text-blue-400" />
                                    <div>
                                        <h2 className="font-playfair text-2xl font-bold text-secondary">Emergency Fund Details</h2>
                                        <p className="font-crimson text-base text-tertiary">Enter your emergency fund details below</p>
                                    </div>
                                </div>
                            </CardHeader>
                            <CardContent className="p-8 space-y-6">
                                <CalculatorInput
                                    label="Monthly Expense (₹)"
                                    value={inputs.monthlyExpenses}
                                    onChange={v => setInputs(i => ({ ...i, monthlyExpenses: Number(v) }))}
                                    min={10000}
                                    max={500000}
                                    step={1000}
                                    currency
                                    error={errors.monthlyExpenses}
                                />
                                <CalculatorInput
                                    label="Months of Coverage"
                                    value={inputs.monthsCovered}
                                    onChange={v => setInputs(i => ({ ...i, monthsCovered: Number(v) }))}
                                    min={3}
                                    max={12}
                                    error={errors.monthsCovered}
                                />
                                {warnings.length > 0 && (
                                    <div className="text-yellow-600 text-xs font-crimson mb-2 animate-fade-in">
                                        {warnings.map(w => <div key={w}>{w}</div>)}
                                    </div>
                                )}
                            </CardContent>
                        </Card>
                    </motion.div>
                    {/* Right: Results/Chart */}
                    <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }} viewport={{ once: true }}>
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
                                    <ResultsDisplay value={Math.round(inputs.monthsCovered)} label="Months Coverage" currency={false} />
                                </div>
                                <div className="w-full flex flex-col items-center mt-8">
                                    <SIPDonutChart invested={inputs.monthlyExpenses * inputs.monthsCovered} returns={0} />
                                </div>
                            </CardContent>
                        </Card>
                    </motion.div>
                </div>
                {/* How this calculator works */}
                <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }} viewport={{ once: true }} className="max-w-4xl mx-auto my-12 bg-[#f9f5ef] rounded-2xl shadow p-8 md:p-12">
                    <h3 className="font-playfair text-xl md:text-2xl font-semibold text-[#7b5e3e] mb-2">How this calculator works</h3>
                    <p className="font-crimson text-base md:text-lg text-[#7b5e3e]/80">The Emergency Fund Calculator helps you estimate the total fund you should set aside for emergencies, based on your monthly expenses and the number of months you want to cover. Adjust the inputs to see your recommended fund.</p>
                </motion.div>
                {/* FAQ Section */}
                <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }} viewport={{ once: true }} className="max-w-4xl mx-auto px-4 py-12">
                    <div className="bg-[#f9f5ef] rounded-2xl shadow-lg p-8 md:p-12">
                        <div className="text-center mb-8">
                            <h2 className="font-playfair text-2xl md:text-3xl font-semibold text-[#7b5e3e] mb-2">Frequently Asked Questions</h2>
                            <p className="font-crimson text-base md:text-lg text-[#b6a48a]">Everything you need to know about emergency funds</p>
                        </div>
                        <Accordion type="single" collapsible className="w-full divide-y divide-[#e8e1d7]">
                            <AccordionItem value="how-emergency-fund-works" className="group border-none">
                                <AccordionTrigger className="flex items-center justify-between w-full py-4 px-6 font-playfair text-[1.1rem] font-medium text-[#7b5e3e] bg-transparent transition-colors duration-300 rounded-xl group-hover:bg-[#f2ebe3] group-hover:shadow-md focus:outline-none focus-visible:ring-2 focus-visible:ring-[#c69c72]">
                                    <span className="flex-1 text-left">How does the Emergency Fund Calculator work?</span>
                                </AccordionTrigger>
                                <AccordionContent className="font-crimson text-[0.95rem] text-[#7b5e3e]/80 bg-[#fcf9f5] rounded-xl px-6 pb-4 mt-1" style={{ lineHeight: 1.7 }}>
                                    The calculator multiplies your monthly expenses by the number of months you want to cover to estimate your recommended emergency fund.
                                </AccordionContent>
                            </AccordionItem>
                            <AccordionItem value="how-much-fund" className="group border-none">
                                <AccordionTrigger className="flex items-center justify-between w-full py-4 px-6 font-playfair text-[1.1rem] font-medium text-[#7b5e3e] bg-transparent transition-colors duration-300 rounded-xl group-hover:bg-[#f2ebe3] group-hover:shadow-md focus:outline-none focus-visible:ring-2 focus-visible:ring-[#c69c72]">
                                    <span className="flex-1 text-left">How much emergency fund should I have?</span>
                                </AccordionTrigger>
                                <AccordionContent className="font-crimson text-[0.95rem] text-[#7b5e3e]/80 bg-[#fcf9f5] rounded-xl px-6 pb-4 mt-1" style={{ lineHeight: 1.7 }}>
                                    Most experts recommend 6-12 months of living expenses as an emergency fund.
                                </AccordionContent>
                            </AccordionItem>
                            <AccordionItem value="where-to-keep" className="group border-none">
                                <AccordionTrigger className="flex items-center justify-between w-full py-4 px-6 font-playfair text-[1.1rem] font-medium text-[#7b5e3e] bg-transparent transition-colors duration-300 rounded-xl group-hover:bg-[#f2ebe3] group-hover:shadow-md focus:outline-none focus-visible:ring-2 focus-visible:ring-[#c69c72]">
                                    <span className="flex-1 text-left">Where should I keep my emergency fund?</span>
                                </AccordionTrigger>
                                <AccordionContent className="font-crimson text-[0.95rem] text-[#7b5e3e]/80 bg-[#fcf9f5] rounded-xl px-6 pb-4 mt-1" style={{ lineHeight: 1.7 }}>
                                    Keep your emergency fund in a liquid, low-risk account such as a savings account or liquid mutual fund.
                                </AccordionContent>
                            </AccordionItem>
                        </Accordion>
                    </div>
                </motion.div>
                <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }} viewport={{ once: true }} className="max-w-4xl mx-auto mt-10">
                    <CalculatorButton className="w-full max-w-xs mx-auto">Discuss emergency planning with our advisors</CalculatorButton>
                    <TrustBadge className="mt-8" />
                    <div className="text-xs text-[#7b5e3e]/70 mt-8 text-center">*Disclaimer: The results provided by this calculator are for informational purposes only and do not constitute financial advice. Please consult a qualified advisor for personalized recommendations.</div>
                </motion.div>
            </div>
        </div>
    );
};

export default EmergencyFundCalculator; 