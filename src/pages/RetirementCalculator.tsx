import { useState } from 'react';
import CalculatorHeader from '@/components/calculators/shared/CalculatorHeader';
import CalculatorInput from '@/components/calculators/shared/CalculatorInput';
import ResultsDisplay from '@/components/calculators/shared/ResultsDisplay';
import CalculatorButton from '@/components/calculators/shared/CalculatorButton';
import TrustBadge from '@/components/calculators/shared/TrustBadge';
import { FaHourglassHalf } from 'react-icons/fa';
import { RetirementCalculatorInputs } from '@/types/calculator.types';
import Navigation from '@/components/Navigation';

const defaultInputs: RetirementCalculatorInputs = {
    currentAge: 30,
    retirementAge: 60,
    currentCorpus: 500000,
    monthlyInvestment: 20000,
    expectedReturns: 12,
    postRetirementReturns: 7,
    monthlyExpenses: 50000,
    inflationRate: 6,
};

const RetirementCalculator = () => {
    const [inputs, setInputs] = useState<RetirementCalculatorInputs>(defaultInputs);

    // Retirement calculation logic (simplified)
    const yearsToRetire = inputs.retirementAge - inputs.currentAge;
    const retirementCorpus = inputs.monthlyExpenses * 12 * 25; // Placeholder: 25x rule
    const monthlySIP = (retirementCorpus - inputs.currentCorpus) / (yearsToRetire * 12);

    return (
        <>
            <Navigation isTransparent={false} />
            <div className="min-h-screen bg-gradient-to-br from-[#FFE5B4] via-[#FFD6E0] to-[#B4E1FF] flex flex-col items-center py-8 pt-20">
                <CalculatorHeader
                    icon={<FaHourglassHalf className="text-4xl text-tertiary drop-shadow-glow" />}
                    title="Retirement Calculator"
                    subtitle="Plan your golden years with confidence"
                />
                <div className="w-full max-w-xl mx-auto">
                    <CalculatorInput
                        label="Current Age"
                        value={inputs.currentAge}
                        onChange={v => setInputs(i => ({ ...i, currentAge: Number(v) }))}
                        min={18}
                        max={70}
                    />
                    <CalculatorInput
                        label="Retirement Age"
                        value={inputs.retirementAge}
                        onChange={v => setInputs(i => ({ ...i, retirementAge: Number(v) }))}
                        min={inputs.currentAge + 1}
                        max={80}
                    />
                    <CalculatorInput
                        label="Current Savings"
                        value={inputs.currentCorpus}
                        onChange={v => setInputs(i => ({ ...i, currentCorpus: Number(v) }))}
                        min={0}
                        currency
                    />
                    <CalculatorInput
                        label="Monthly Investment"
                        value={inputs.monthlyInvestment}
                        onChange={v => setInputs(i => ({ ...i, monthlyInvestment: Number(v) }))}
                        min={0}
                        currency
                    />
                    <CalculatorInput
                        label="Expected Returns (%)"
                        value={inputs.expectedReturns}
                        onChange={v => setInputs(i => ({ ...i, expectedReturns: Number(v) }))}
                        min={6}
                        max={15}
                        step={0.1}
                    />
                    <CalculatorInput
                        label="Post Retirement Returns (%)"
                        value={inputs.postRetirementReturns}
                        onChange={v => setInputs(i => ({ ...i, postRetirementReturns: Number(v) }))}
                        min={4}
                        max={10}
                        step={0.1}
                    />
                    <CalculatorInput
                        label="Monthly Expenses"
                        value={inputs.monthlyExpenses}
                        onChange={v => setInputs(i => ({ ...i, monthlyExpenses: Number(v) }))}
                        min={0}
                        currency
                    />
                    <CalculatorInput
                        label="Inflation Rate (%)"
                        value={inputs.inflationRate}
                        onChange={v => setInputs(i => ({ ...i, inflationRate: Number(v) }))}
                        min={0}
                        max={12}
                        step={0.1}
                    />
                </div>
                <div className="w-full max-w-xl mx-auto mt-8">
                    <ResultsDisplay value={Math.round(retirementCorpus)} label="Required Corpus" />
                    <ResultsDisplay value={Math.round(monthlySIP)} label="Monthly SIP Needed" />
                    {/* Lifestyle Projection placeholder */}
                </div>
                <CalculatorButton className="mt-6">Get personalized retirement roadmap</CalculatorButton>
                <TrustBadge className="mt-8" />
            </div>
        </>
    );
};

export default RetirementCalculator; 