import { SIPCalculatorInputs, FDCalculatorInputs, RetirementCalculatorInputs, EmergencyFundInputs } from '@/types/calculator.types';

// SIP: compound calc with step-up
export function calculateSIP(inputs: SIPCalculatorInputs) {
    const months = inputs.durationYears * 12;
    let corpus = 0;
    let invested = 0;
    let m = inputs.monthlyInvestment;
    for (let i = 0; i < months; i++) {
        corpus = (corpus + m) * (1 + inputs.expectedReturns / 100 / 12);
        invested += m;
        if ((i + 1) % 12 === 0) m = m * (1 + (inputs.stepUpPercent || 0) / 100);
    }
    return { corpus, invested, returns: corpus - invested };
}

// FD: compounding frequency logic
export function calculateFD(inputs: FDCalculatorInputs) {
    const n = inputs.compoundingFrequency;
    const r = inputs.interestRate / 100;
    const t = inputs.durationYears;
    const maturity = inputs.principal * Math.pow(1 + r / n, n * t);
    const interest = maturity - inputs.principal;
    const annualized = ((Math.pow(maturity / inputs.principal, 1 / t) - 1) * 100) || 0;
    return { maturity, interest, annualized };
}

// Retirement: inflation-adjusted corpus (simple version)
export function calculateRetirementCorpus(inputs: RetirementCalculatorInputs) {
    const yearsToRetire = inputs.retirementAge - inputs.currentAge;
    const inflationFactor = Math.pow(1 + inputs.inflationRate / 100, yearsToRetire);
    const futureExpenses = inputs.monthlyExpenses * inflationFactor;
    const corpus = futureExpenses * 12 * 25; // 25x rule
    const monthlySIP = (corpus - inputs.currentCorpus) / (yearsToRetire * 12);
    return { corpus, monthlySIP, futureExpenses };
}

// Emergency: risk-based multipliers
export function calculateEmergencyFund(inputs: EmergencyFundInputs, riskScore = 1) {
    // riskScore: 1 (low risk, default), 1.5 (moderate), 2 (high risk)
    const baseMonths = inputs.monthsCovered * riskScore;
    const recommendedFund = inputs.monthlyExpenses * baseMonths;
    const shortfall = Math.max(0, recommendedFund - (inputs.lumpSumAvailable || 0));
    const monthlySaving = shortfall > 0 ? shortfall / baseMonths : 0;
    return { recommendedFund, shortfall, monthlySaving, baseMonths };
} 