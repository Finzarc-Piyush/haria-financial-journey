import { useMemo } from 'react';
import { FaUserClock } from 'react-icons/fa';
import { useCalculator } from '@/hooks/useCalculator';
import { validateRange } from '@/utils/validators';
import CalculatorPageLayout from '@/components/calculators/shared/CalculatorPageLayout';
import CalculatorHero from '@/components/calculators/shared/CalculatorHero';
import CalculatorFormCard from '@/components/calculators/shared/CalculatorFormCard';
import CalculatorResultCard from '@/components/calculators/shared/CalculatorResultCard';
import ChartWrapper from '@/components/calculators/shared/ChartWrapper';
import FAQSection from '@/components/calculators/shared/FAQSection';
import CalculatorInput from '@/components/calculators/shared/CalculatorInput';
import SWPBarChart from '@/components/calculators/shared/SWPBarChart';

const defaultInputs = {
    corpus: 2000000,
    withdrawalAmount: 20000,
    durationYears: 10,
    expectedReturns: 8,
};

const validationRules = {
    corpus: (v: number) => validateRange(v, 100000, 100000000, 'Corpus Amount') || null,
    withdrawalAmount: (v: number) => validateRange(v, 1000, 1000000, 'Withdrawal Amount') || null,
    durationYears: (v: number) => validateRange(v, 1, 30, 'Duration') || null,
    expectedReturns: (v: number) => validateRange(v, 4, 15, 'Expected Returns') || null,
};

const faqList = [
    {
        question: 'What is an SWP?',
        answer: 'A Systematic Withdrawal Plan (SWP) allows you to withdraw a fixed amount regularly from your investment corpus.'
    },
    {
        question: 'How is the SWP calculated?',
        answer: 'SWP calculation is based on your initial corpus, withdrawal amount, duration, and expected returns.'
    },
    {
        question: 'Can I change my withdrawal amount later?',
        answer: 'Yes, you can adjust your withdrawal amount as per your needs.'
    },
    {
        question: 'Are SWP returns guaranteed?',
        answer: 'No, SWP returns depend on the performance of your underlying investments.'
    },
];

function formatINR(num: number) {
    return num.toLocaleString('en-IN', { style: 'currency', currency: 'INR', maximumFractionDigits: 0 });
}

const SWPCalculator = () => {
    // Placeholder for SWP calculation logic. Replace with actual calculation as needed.
    const { inputs, setInputs, errors, results, warnings } = useCalculator(
        defaultInputs,
        (inputs) => ({
            maturityCorpus: Math.max(0, inputs.corpus - (inputs.withdrawalAmount * 12 * inputs.durationYears)),
            totalWithdrawn: inputs.withdrawalAmount * 12 * inputs.durationYears,
            returns: Math.max(0, (inputs.corpus * (inputs.expectedReturns / 100) * inputs.durationYears)),
        }),
        validationRules
    );

    const metrics = useMemo(() => [
        { label: 'Corpus Used', value: Math.round(inputs.corpus), currency: true },
        { label: 'Total Withdrawn', value: Math.round(results.totalWithdrawn || 0), currency: true },
        { label: 'Returns Earned', value: Math.round(results.returns || 0), currency: true },
        { label: 'Corpus Left', value: Math.round(results.maturityCorpus || 0), currency: true },
    ], [inputs.corpus, results]);

    const explanations = useMemo(() => [
        {
            label: 'Corpus Used',
            value: formatINR(inputs.corpus),
            description: 'Initial investment corpus for SWP.'
        },
        {
            label: 'Total Withdrawn',
            value: formatINR(results.totalWithdrawn || 0),
            description: 'Total money withdrawn over the SWP period.'
        },
        {
            label: 'Returns Earned',
            value: formatINR(results.returns || 0),
            description: 'Estimated profit earned on your corpus.'
        },
        {
            label: 'Corpus Left',
            value: formatINR(results.maturityCorpus || 0),
            description: 'Corpus remaining at the end of the SWP period.'
        },
    ], [inputs.corpus, results]);

    const handleInputChange = (key) => (value) => {
        setInputs((prev) => ({ ...prev, [key]: value }));
    };

    return (
        <CalculatorPageLayout>
            <CalculatorHero
                title="SWP Calculator"
                subtitle="Plan your regular withdrawals with confidence"
                breadcrumbs={[
                    { label: 'Invest Smart', to: '/' },
                    { label: 'SWP Calculator' }
                ]}
                icon={<FaUserClock />}
            />
            <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-8 py-12 px-4 items-stretch">
                {/* Left: Form */}
                <div className="col-span-1 flex items-center">
                    <CalculatorFormCard
                        title="SWP Details"
                        subtitle="Enter your withdrawal plan details below"
                    >
                        <CalculatorInput
                            label="Corpus Amount (₹)"
                            value={inputs.corpus}
                            onChange={handleInputChange('corpus')}
                            min={100000}
                            max={100000000}
                            step={10000}
                            currency
                            error={errors.corpus}
                        />
                        <CalculatorInput
                            label="Withdrawal Amount (₹/month)"
                            value={inputs.withdrawalAmount}
                            onChange={handleInputChange('withdrawalAmount')}
                            min={1000}
                            max={1000000}
                            step={1000}
                            currency
                            error={errors.withdrawalAmount}
                        />
                        <CalculatorInput
                            label="Duration (years)"
                            value={inputs.durationYears}
                            onChange={handleInputChange('durationYears')}
                            min={1}
                            max={30}
                            error={errors.durationYears}
                        />
                        <CalculatorInput
                            label="Expected Returns (%)"
                            value={inputs.expectedReturns}
                            onChange={handleInputChange('expectedReturns')}
                            min={4}
                            max={15}
                            step={0.1}
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
                        title="SWP Summary"
                        subtitle="Your SWP projection"
                        metrics={metrics}
                        chart={
                            <ChartWrapper>
                                <SWPBarChart corpus={inputs.corpus} withdrawn={results.totalWithdrawn || 0} returns={results.returns || 0} corpusLeft={results.maturityCorpus || 0} />
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

export default SWPCalculator; 