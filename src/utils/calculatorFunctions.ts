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

// SWP calculation - FIXED
export function calculateSWP(
    principal: number,
    monthlyWithdrawal: number,
    years: number,
    annualReturn: number
) {
    const monthlyRate = annualReturn / (12 * 100);
    let balance = principal;
    let totalWithdrawn = 0;
    let totalReturns = 0;

    for (let month = 1; month <= years * 12; month++) {
        // Calculate monthly interest on current balance
        const monthlyInterest = balance * monthlyRate;
        totalReturns += monthlyInterest;

        // Add interest to balance first
        balance += monthlyInterest;

        // Then subtract withdrawal
        if (balance >= monthlyWithdrawal) {
            balance -= monthlyWithdrawal;
            totalWithdrawn += monthlyWithdrawal;
        } else {
            // If insufficient balance, withdraw whatever is left
            totalWithdrawn += balance;
            balance = 0;
            break;
        }
    }

    return {
        maturityCorpus: Math.round(balance),
        totalWithdrawn: Math.round(totalWithdrawn),
        returns: Math.round(totalReturns)
    };
}