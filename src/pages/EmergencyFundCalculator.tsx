import { useState } from 'react';
import CalculatorHeader from '@/components/calculators/shared/CalculatorHeader';
import CalculatorInput from '@/components/calculators/shared/CalculatorInput';
import ResultsDisplay from '@/components/calculators/shared/ResultsDisplay';
import CalculatorButton from '@/components/calculators/shared/CalculatorButton';
import TrustBadge from '@/components/calculators/shared/TrustBadge';
import { FaUmbrella } from 'react-icons/fa';
import { EmergencyFundInputs } from '@/types/calculator.types';
import Navigation from '@/components/Navigation';

const defaultInputs: EmergencyFundInputs = {
    monthlyExpenses: 40000,
    monthsCovered: 6,
    lumpSumAvailable: 0,
};

const EmergencyFundCalculator = () => {
    const [inputs, setInputs] = useState<EmergencyFundInputs>(defaultInputs);

    // Emergency fund logic (simplified)
    const recommendedFund = inputs.monthlyExpenses * inputs.monthsCovered;
    const shortfall = Math.max(0, recommendedFund - (inputs.lumpSumAvailable || 0));
    const monthlySaving = shortfall > 0 ? shortfall / inputs.monthsCovered : 0;

    return (
        <>
            <Navigation isTransparent={false} />
            <div className="min-h-screen bg-gradient-to-br from-[#23272F] via-[#2B3A67] to-[#1B263B] flex flex-col items-center py-8 pt-20">
                <CalculatorHeader
                    icon={<FaUmbrella className="text-4xl text-blue-400 drop-shadow-glow" />}
                    title="Emergency Fund Calculator"
                    subtitle="Prepare for life's uncertainties"
                />
                <div className="w-full max-w-xl mx-auto">
                    <CalculatorInput
                        label="Monthly Expenses"
                        value={inputs.monthlyExpenses}
                        onChange={v => setInputs(i => ({ ...i, monthlyExpenses: Number(v) }))}
                        min={0}
                        currency
                    />
                    <CalculatorInput
                        label="Months of Coverage"
                        value={inputs.monthsCovered}
                        onChange={v => setInputs(i => ({ ...i, monthsCovered: Number(v) }))}
                        min={1}
                        max={24}
                    />
                    <CalculatorInput
                        label="Current Emergency Fund"
                        value={inputs.lumpSumAvailable || 0}
                        onChange={v => setInputs(i => ({ ...i, lumpSumAvailable: Number(v) }))}
                        min={0}
                        currency
                    />
                </div>
                <div className="w-full max-w-xl mx-auto mt-8">
                    <ResultsDisplay value={Math.round(recommendedFund)} label="Recommended Fund" />
                    <ResultsDisplay value={inputs.monthsCovered} label="Coverage Months" />
                    <ResultsDisplay value={Math.round(shortfall)} label="Shortfall" />
                    <ResultsDisplay value={Math.round(monthlySaving)} label="Monthly Saving Needed" />
                    {/* Animation placeholder: Umbrella open, ripple shield */}
                </div>
                <CalculatorButton variant="secondary" className="mt-6">Discuss financial security plan</CalculatorButton>
                <TrustBadge className="mt-8" />
            </div>
        </>
    );
};

export default EmergencyFundCalculator; 