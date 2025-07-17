import { useMemo } from 'react';
import { useCalculator } from '@/hooks/useCalculator';
import CalculatorHeader from '@/components/calculators/shared/CalculatorHeader';
import CalculatorInput from '@/components/calculators/shared/CalculatorInput';
import ResultsDisplay from '@/components/calculators/shared/ResultsDisplay';
import CalculatorButton from '@/components/calculators/shared/CalculatorButton';
import TrustBadge from '@/components/calculators/shared/TrustBadge';
import { FaVault } from 'react-icons/fa6';
import { FDCalculatorInputs } from '@/types/calculator.types';
import { calculateFD } from '@/utils/calculatorFunctions';
import { validateRange } from '@/utils/validators';
import { PieChart } from 'react-minimal-pie-chart';
import Navigation from '@/components/Navigation';

const compoundingOptions = [
    { label: 'Yearly', value: 1 },
    { label: 'Half-Yearly', value: 2 },
    { label: 'Quarterly', value: 4 },
    { label: 'Monthly', value: 12 },
];

const defaultInputs: FDCalculatorInputs = {
    principal: 100000,
    interestRate: 7,
    durationYears: 5,
    compoundingFrequency: 1,
};

const validationRules = {
    principal: (v: number) => validateRange(v, 10000, 10000000, 'Principal Amount'),
    interestRate: (v: number) => validateRange(v, 5, 10, 'Interest Rate'),
    durationYears: (v: number) => validateRange(v, 1, 10, 'Duration'),
};

const FDCalculator = () => {
    const {
        inputs, setInputs, errors, results, loading, chartReady, warnings
    } = useCalculator(defaultInputs, calculateFD, validationRules);

    const pieData = useMemo(() => results ? [
        { title: 'Principal', value: inputs.principal, color: '#B4A078' },
        { title: 'Interest', value: results.interest, color: '#E6C674' },
    ] : [], [results, inputs.principal]);

    return (
        <>
            <Navigation isTransparent={false} />
            <div className="min-h-screen bg-[#3A3A3A] flex flex-col items-center py-8 pt-20">
                <CalculatorHeader
                    icon={<FaVault className="text-4xl text-[#E6C674] drop-shadow-glow" />}
                    title="Fixed Deposit Calculator"
                    subtitle="Plan your guaranteed growth"
                />
                <div className="w-full max-w-xl mx-auto">
                    <CalculatorInput
                        label="Principal Amount"
                        value={inputs.principal}
                        onChange={v => setInputs(i => ({ ...i, principal: Number(v) }))}
                        min={10000}
                        max={10000000}
                        step={10000}
                        currency
                        error={errors.principal}
                    />
                    <CalculatorInput
                        label="Interest Rate (%)"
                        value={inputs.interestRate}
                        onChange={v => setInputs(i => ({ ...i, interestRate: Number(v) }))}
                        min={5}
                        max={10}
                        step={0.1}
                        error={errors.interestRate}
                    />
                    <CalculatorInput
                        label="Duration (years)"
                        value={inputs.durationYears}
                        onChange={v => setInputs(i => ({ ...i, durationYears: Number(v) }))}
                        min={1}
                        max={10}
                        error={errors.durationYears}
                    />
                    <CalculatorInput
                        label="Compounding Frequency"
                        value={inputs.compoundingFrequency}
                        onChange={v => setInputs(i => ({ ...i, compoundingFrequency: Number(v) }))}
                        type="select"
                        options={compoundingOptions}
                    />
                    {warnings.length > 0 && (
                        <div className="text-yellow-600 text-xs font-crimson mb-2">
                            {warnings.map(w => <div key={w}>{w}</div>)}
                        </div>
                    )}
                </div>
                <div className="w-full max-w-xl mx-auto mt-8">
                    <ResultsDisplay value={Math.round(results?.maturity || 0)} label="Maturity Amount" />
                    <ResultsDisplay value={Math.round(results?.interest || 0)} label="Interest Earned" />
                    <ResultsDisplay value={results?.annualized || 0} label="Annualized Returns (%)" />
                    {chartReady && results && (
                        <div className="w-full max-w-md mx-auto h-40 flex flex-col items-center mb-4">
                            <PieChart
                                data={pieData}
                                animate
                                lineWidth={30}
                                label={({ dataEntry }) => `${dataEntry.title}`}
                                labelStyle={{ fontSize: '6px', fontFamily: 'Crimson Text', fill: '#3A3A3A' }}
                                style={{ height: 120 }}
                            />
                        </div>
                    )}
                </div>
                <CalculatorButton variant="secondary" className="mt-6">Explore our fixed income solutions</CalculatorButton>
                <TrustBadge className="mt-8" />
            </div>
        </>
    );
};

export default FDCalculator; 