import { useEffect } from 'react';
import AOS from 'aos';
import 'aos/dist/aos.css';
import { useCalculator } from '@/hooks';
import { calculateRetirementCorpus } from '@/utils';
import { validateRange } from '@/utils';
import { CalculatorInput, ResultsDisplay, CalculatorButton, TrustBadge } from '@/components/calculators/shared';
import Navigation from '@/components/Navigation';
import { Card, CardHeader, CardContent } from '@/components/ui/card';
import { FaUserTie } from 'react-icons/fa';
import { Breadcrumb, BreadcrumbList, BreadcrumbItem, BreadcrumbLink, BreadcrumbPage, BreadcrumbSeparator } from '@/components/ui/breadcrumb';

const defaultInputs = {
    currentCorpus: 500000,
    monthlyInvestment: 20000,
    postRetirementReturns: 7,
    monthlyExpenses: 50000,
    inflationRate: 6,
    retirementAge: 60,
    currentAge: 30,
    expectedReturns: 12,
};

const validationRules = {
    currentAge: (v: number) => validateRange(v, 18, 70, 'Current Age'),
    retirementAge: (v: number) => validateRange(v, 45, 80, 'Retirement Age'),
    monthlyExpense: (v: number) => validateRange(v, 10000, 500000, 'Monthly Expense'),
    currentCorpus: (v: number) => validateRange(v, 0, 10000000, 'Current Savings'),
    expectedReturns: (v: number) => validateRange(v, 6, 15, 'Expected Returns'),
};

const RetirementCalculator = () => {
    useEffect(() => {
        AOS.init({ duration: 600, easing: 'ease-out-cubic', once: true });
        AOS.refresh();
    }, []);

    const { inputs, setInputs, errors, results, warnings } = useCalculator(
        defaultInputs,
        calculateRetirementCorpus,
        validationRules
    );

    type RetirementResults = {
        corpus: number;
        invested: number;
        returns: number;
    };

    const safeResults = (results ?? {}) as RetirementResults;

    const corpus = safeResults.corpus || 0;
    const invested = safeResults.invested || 0;
    const returns = safeResults.returns || 0;

    return (
        <>
            <Navigation isTransparent={false} />
            <div className="pt-20">
                {/* Breadcrumb Navigation */}
                <div className="w-full max-w-6xl mx-auto px-4 mb-8" data-aos="fade-down" data-aos-duration="600" data-aos-easing="ease-out-cubic">
                    <Breadcrumb>
                        <BreadcrumbList>
                            <BreadcrumbItem>
                                <BreadcrumbLink href="/">Home</BreadcrumbLink>
                            </BreadcrumbItem>
                            <BreadcrumbSeparator />
                            <BreadcrumbItem>
                                <BreadcrumbPage>Retirement Calculator</BreadcrumbPage>
                            </BreadcrumbItem>
                        </BreadcrumbList>
                    </Breadcrumb>
                </div>
                <div className="max-w-7xl mx-auto grid grid-cols-12 gap-8 py-12 px-4 items-stretch">
                    {/* Input Section */}
                    <div className="col-span-12 lg:col-span-6 flex items-center" data-aos="fade-up" data-aos-duration="600" data-aos-easing="ease-out-cubic">
                        <Card className="w-full max-w-xl mx-auto h-full bg-white/80 backdrop-blur-lg shadow-xl rounded-2xl border border-[#E6C674]/30 overflow-hidden">
                            <CardHeader className="pb-6 bg-gradient-to-r from-[#F5F1E8] to-[#E6C674]/20">
                                <div className="flex items-center gap-3">
                                    <FaUserTie className="text-2xl text-[#E6C674]" />
                                    <div>
                                        <h2 className="font-playfair text-2xl font-bold text-secondary">Retirement Details</h2>
                                        <p className="font-crimson text-base text-tertiary">Enter your retirement planning details below</p>
                                    </div>
                                </div>
                            </CardHeader>
                            <CardContent className="p-8 space-y-6">
                                <div data-aos="fade-up" data-aos-delay="0">
                                    <CalculatorInput
                                        label="Current Age"
                                        value={inputs.currentAge}
                                        onChange={v => setInputs(i => ({ ...i, currentAge: Number(v) }))}
                                        min={18}
                                        max={70}
                                        error={errors.currentAge}
                                    />
                                </div>
                                <div data-aos="fade-up" data-aos-delay="100">
                                    <CalculatorInput
                                        label="Retirement Age"
                                        value={inputs.retirementAge}
                                        onChange={v => setInputs(i => ({ ...i, retirementAge: Number(v) }))}
                                        min={45}
                                        max={80}
                                        error={errors.retirementAge}
                                    />
                                </div>
                                <div data-aos="fade-up" data-aos-delay="200">
                                    <CalculatorInput
                                        label="Monthly Expense (₹)"
                                        value={inputs.monthlyExpenses}
                                        onChange={v => setInputs(i => ({ ...i, monthlyExpenses: Number(v) }))}
                                        min={10000}
                                        max={500000}
                                        step={1000}
                                        currency
                                        error={errors.monthlyExpense}
                                    />
                                </div>
                                <div data-aos="fade-up" data-aos-delay="300">
                                    <CalculatorInput
                                        label="Current Savings (₹)"
                                        value={inputs.currentCorpus}
                                        onChange={v => setInputs(i => ({ ...i, currentCorpus: Number(v) }))}
                                        min={0}
                                        max={10000000}
                                        step={10000}
                                        currency
                                        error={errors.currentCorpus}
                                    />
                                </div>
                                <div data-aos="fade-up" data-aos-delay="400">
                                    <CalculatorInput
                                        label="Expected Returns (%)"
                                        value={inputs.expectedReturns}
                                        onChange={v => setInputs(i => ({ ...i, expectedReturns: Number(v) }))}
                                        min={6}
                                        max={15}
                                        step={0.5}
                                        error={errors.expectedReturns}
                                    />
                                </div>
                                {warnings.length > 0 && (
                                    <div className="text-yellow-600 text-xs font-crimson mb-2 animate-fade-in">
                                        {warnings.map(w => <div key={w}>{w}</div>)}
                                    </div>
                                )}
                            </CardContent>
                        </Card>
                    </div>
                    {/* Results Section */}
                    <div className="col-span-12 lg:col-span-5 flex items-center" data-aos="fade-up" data-aos-duration="600" data-aos-easing="ease-out-cubic">
                        <Card className="w-full max-w-xl mx-auto h-full bg-gradient-to-br from-[#F5F1E8]/90 to-white/80 backdrop-blur-lg rounded-2xl shadow-xl border border-[#E6C674]/30 overflow-hidden">
                            <CardHeader className="pb-6 bg-gradient-to-r from-[#E6C674]/10 to-[#E7BBA3]/10">
                                <div className="text-center">
                                    <h2 className="font-playfair text-2xl font-bold text-secondary mb-1">Retirement Summary</h2>
                                    <p className="font-crimson text-sm text-tertiary">Your retirement projection</p>
                                </div>
                            </CardHeader>
                            <CardContent className="p-8 space-y-6">
                                <div className="grid grid-cols-2 gap-4">
                                    <div data-aos="fade-up" data-aos-delay="0">
                                        <ResultsDisplay value={Math.round(corpus)} label="Corpus Needed" currency={true} />
                                    </div>
                                    <div data-aos="fade-up" data-aos-delay="100">
                                        <ResultsDisplay value={Math.round(invested)} label="Total Invested" currency={true} />
                                    </div>
                                    <div data-aos="fade-up" data-aos-delay="200">
                                        <ResultsDisplay value={Math.round(returns)} label="Returns Earned" currency={true} />
                                    </div>
                                    <div data-aos="fade-up" data-aos-delay="300">
                                        <ResultsDisplay value={Math.round(inputs.expectedReturns)} label="Expected Returns (%)" currency={false} />
                                    </div>
                                </div>
                                {/* You can add a donut/pie chart here if desired, matching SIP style */}
                            </CardContent>
                        </Card>
                    </div>
                </div>
                {/* How this calculator works section */}
                <section className="max-w-4xl mx-auto my-12 bg-[#f9f5ef] rounded-2xl shadow p-8 md:p-12" data-aos="fade-up" data-aos-duration="600" data-aos-easing="ease-out-cubic">
                    <h3 className="font-playfair text-xl md:text-2xl font-semibold text-[#7b5e3e] mb-2">How this calculator works</h3>
                    <p className="font-crimson text-base md:text-lg text-[#7b5e3e]/80">The Retirement Calculator estimates the corpus you’ll need for retirement based on your current age, retirement age, monthly expenses, savings, and expected returns. Adjust the inputs to see how your plan changes.</p>
                </section>
                {/* FAQ Section */}
                <section className="max-w-4xl mx-auto px-4 py-12" data-aos="fade-up" data-aos-duration="600" data-aos-easing="ease-out-cubic">
                    <div className="bg-[#f9f5ef] rounded-2xl shadow-lg p-8 md:p-12">
                        <div className="text-center mb-8">
                            <h2 className="font-playfair text-2xl md:text-3xl font-semibold text-[#7b5e3e] mb-2">Frequently Asked Questions</h2>
                            <p className="font-crimson text-base md:text-lg text-[#b6a48a]">Everything you need to know about retirement planning</p>
                        </div>
                        {/* Use the same Accordion/FAQ structure as SIPCalculator */}
                    </div>
                </section>
                <CalculatorButton className="mt-6">Get personalized retirement roadmap</CalculatorButton>
                <TrustBadge className="mt-8" />
                {/* Disclaimer (if present in SIP) */}
                <div className="max-w-4xl mx-auto text-xs text-[#7b5e3e]/70 mt-8 text-center">*Disclaimer: The results provided by this calculator are for informational purposes only and do not constitute financial advice. Please consult a qualified advisor for personalized recommendations.</div>
            </div>
        </>
    );
};

export default RetirementCalculator; 