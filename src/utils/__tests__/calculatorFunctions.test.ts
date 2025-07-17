import { calculateSIP, calculateFD, calculateRetirementCorpus, calculateEmergencyFund } from '../calculatorFunctions';

describe('Calculator Functions', () => {
    it('calculates SIP corpus correctly', () => {
        const result = calculateSIP({ monthlyInvestment: 10000, durationYears: 10, expectedReturns: 12, stepUpPercent: 0 });
        expect(result.corpus).toBeGreaterThan(result.invested);
        expect(result.returns).toBeCloseTo(result.corpus - result.invested, 2);
    });

    it('calculates FD maturity correctly', () => {
        const result = calculateFD({ principal: 100000, interestRate: 7, durationYears: 5, compoundingFrequency: 1 });
        expect(result.maturity).toBeGreaterThan(100000);
    });

    it('calculates retirement corpus with inflation', () => {
        const result = calculateRetirementCorpus({
            currentAge: 30,
            retirementAge: 60,
            currentCorpus: 500000,
            monthlyInvestment: 20000,
            expectedReturns: 12,
            postRetirementReturns: 7,
            monthlyExpenses: 50000,
            inflationRate: 6,
        });
        expect(result.corpus).toBeGreaterThan(0);
        expect(result.monthlySIP).toBeGreaterThan(0);
    });

    it('calculates emergency fund with risk multiplier', () => {
        const result = calculateEmergencyFund({ monthlyExpenses: 40000, monthsCovered: 6, lumpSumAvailable: 0 }, 1.5);
        expect(result.recommendedFund).toBeCloseTo(40000 * 6 * 1.5, 2);
        expect(result.shortfall).toBeGreaterThanOrEqual(0);
    });
}); 