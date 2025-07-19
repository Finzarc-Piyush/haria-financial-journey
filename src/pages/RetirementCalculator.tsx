import { useMemo } from 'react';
import { FaUserTie } from 'react-icons/fa';
import { useCalculator } from '@/hooks/useCalculator';
import { calculateRetirementCorpus } from '@/utils';
import { validateRange } from '@/utils/validators';
import CalculatorPageLayout from '@/components/calculators/shared/CalculatorPageLayout';
import CalculatorHero from '@/components/calculators/shared/CalculatorHero';
import CalculatorFormCard from '@/components/calculators/shared/CalculatorFormCard';
import CalculatorResultCard from '@/components/calculators/shared/CalculatorResultCard';
import ChartWrapper from '@/components/calculators/shared/ChartWrapper';
import CalculatorInput from '@/components/calculators/shared/CalculatorInput';
import FAQSection from '@/components/calculators/shared/FAQSection';
import TrustBadge from '@/components/calculators/shared/TrustBadge';
import CalculatorButton from '@/components/calculators/shared/CalculatorButton';
import RetirementBarChart from '@/components/calculators/shared/RetirementBarChart';

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
    currentAge: (v: number) => validateRange(v, 18, 70, 'Current Age') || null,
    retirementAge: (v: number) => validateRange(v, 45, 80, 'Retirement Age') || null,
    monthlyExpenses: (v: number) => validateRange(v, 10000, 500000, 'Monthly Expense') || null,
    currentCorpus: (v: number) => validateRange(v, 0, 10000000, 'Current Savings') || null,
    expectedReturns: (v: number) => validateRange(v, 6, 15, 'Expected Returns') || null,
};

const faqList = [
    { question: 'How is the retirement corpus calculated?', answer: 'The calculator estimates the corpus you’ll need for retirement based on your current age, retirement age, monthly expenses, savings, and expected returns.' },
    { question: 'What is the 25x rule?', answer: 'The 25x rule is a guideline suggesting you need 25 times your annual expenses saved to retire comfortably.' },
    { question: 'Can I change my retirement age later?', answer: 'Yes, you can adjust your retirement age and see how it affects your required corpus.' },
    { question: 'Are the results guaranteed?', answer: 'No, results are estimates and actual needs may vary based on inflation, lifestyle, and market returns.' },
];

function formatINR(num: number) {
    return num.toLocaleString('en-IN', { style: 'currency', currency: 'INR', maximumFractionDigits: 0 });
}

const RetirementCalculator = () => {
    const { inputs, setInputs, errors, results, warnings } = useCalculator(
        defaultInputs,
        calculateRetirementCorpus,
        validationRules
    );

    const corpus = results?.corpus || 0;
    // Fallback to 0 if not present, since results may not have these properties
    const invested = (results && 'invested' in results) ? (results as any).invested || 0 : 0;
    const returns = (results && 'returns' in results) ? (results as any).returns || 0 : 0;

    const metrics = useMemo(() => [
        { label: 'Corpus Needed', value: Math.round(corpus), currency: true },
        { label: 'Total Invested', value: Math.round(invested), currency: true },
        { label: 'Returns Earned', value: Math.round(returns), currency: true },
        { label: 'Expected Returns (%)', value: inputs.expectedReturns, currency: false },
    ], [corpus, invested, returns, inputs.expectedReturns]);

    const explanations = useMemo(() => [
        {
            label: 'Corpus Needed',
            value: formatINR(corpus),
            description: 'Estimated amount you need at retirement to cover your expenses.'
        },
        {
            label: 'Total Invested',
            value: formatINR(invested),
            description: 'Total money you will invest until retirement.'
        },
        {
            label: 'Returns Earned',
            value: formatINR(returns),
            description: 'Estimated profit earned on your investments.'
        },
        {
            label: 'Expected Returns (%)',
            value: inputs.expectedReturns + '%',
            description: 'Annual rate of return assumed for your investments.'
        },
    ], [corpus, invested, returns, inputs.expectedReturns]);

    const handleInputChange = (key) => (value) => {
        setInputs((prev) => ({ ...prev, [key]: value }));
    };

    return (
        <CalculatorPageLayout>
            <CalculatorHero
                title="Retirement Calculator"
                subtitle="Plan your financial freedom with confidence"
                breadcrumbs={[
                    { label: 'Invest Smart', to: '/' },
                    { label: 'Retirement Calculator' }
                ]}
                icon={<FaUserTie />}
            />
            <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-8 py-12 px-4 items-stretch">
                {/* Left: Form */}
                <div className="col-span-1 flex items-center">
                    <CalculatorFormCard
                        title="Retirement Details"
                        subtitle="Enter your retirement planning details below"
                    >
                        <CalculatorInput
                            label="Current Age"
                            value={inputs.currentAge}
                            onChange={handleInputChange('currentAge')}
                            min={18}
                            max={70}
                            error={errors.currentAge}
                        />
                        <CalculatorInput
                            label="Retirement Age"
                            value={inputs.retirementAge}
                            onChange={handleInputChange('retirementAge')}
                            min={45}
                            max={80}
                            error={errors.retirementAge}
                        />
                        <CalculatorInput
                            label="Monthly Expense (₹)"
                            value={inputs.monthlyExpenses}
                            onChange={handleInputChange('monthlyExpenses')}
                            min={10000}
                            max={500000}
                            step={1000}
                            currency
                            error={errors.monthlyExpenses}
                        />
                        <CalculatorInput
                            label="Current Savings (₹)"
                            value={inputs.currentCorpus}
                            onChange={handleInputChange('currentCorpus')}
                            min={0}
                            max={10000000}
                            step={10000}
                            currency
                            error={errors.currentCorpus}
                        />
                        <CalculatorInput
                            label="Expected Returns (%)"
                            value={inputs.expectedReturns}
                            onChange={handleInputChange('expectedReturns')}
                            min={6}
                            max={15}
                            step={0.5}
                            error={errors.expectedReturns}
                        />
                        {warnings.length > 0 && (
                            <div className="text-yellow-600 text-xs font-crimson mb-2 animate-fade-in">
                                {warnings.map((w, i) => <div key={i}>{w}</div>)}
                            </div>
                        )}
                    </CalculatorFormCard>
                </div>
                {/* Right: Results/Chart */}
                <div className="col-span-1 flex items-center">
                    <CalculatorResultCard
                        title="Retirement Summary"
                        subtitle="Your retirement projection"
                        metrics={metrics}
                        chart={
                            <ChartWrapper>
                                <RetirementBarChart corpus={corpus} invested={invested} returns={returns} />
                            </ChartWrapper>
                        }
                        explanations={explanations}
                    />
                </div>
            </div>
            <FAQSection faqs={faqList} />
        </CalculatorPageLayout>
    );
};

export default RetirementCalculator; 