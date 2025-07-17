import { useState, useCallback, useRef } from 'react';
import { getValidationErrors, getWarnings } from '@/utils/validators';

export function useCalculator<TInputs extends Record<string, any>, TResult>(
    defaultInputs: TInputs,
    calculate: (inputs: TInputs) => TResult,
    validationRules: Partial<Record<keyof TInputs, (value: any, values: TInputs) => string | null>> = {}
) {
    const [inputs, setInputs] = useState<TInputs>(defaultInputs);
    const [errors, setErrors] = useState<Record<string, string>>({});
    const [results, setResults] = useState<TResult | null>(null);
    const [loading, setLoading] = useState(false);
    const [warnings, setWarnings] = useState<string[]>([]);
    const [chartReady, setChartReady] = useState(false);
    const debounceRef = useRef<NodeJS.Timeout | null>(null);

    // Validate and calculate on input change
    const updateInputs = useCallback((update: (prev: TInputs) => TInputs) => {
        setInputs(prev => {
            const next = update(prev);
            setErrors(getValidationErrors(next, validationRules));
            setWarnings(getWarnings(next));
            setLoading(true);
            setChartReady(false);
            if (debounceRef.current) clearTimeout(debounceRef.current);
            debounceRef.current = setTimeout(() => {
                setResults(calculate(next));
                setLoading(false);
                setChartReady(true);
            }, 300); // Debounce for mobile performance
            return next;
        });
    }, [calculate, validationRules]);

    // Initial calculation
    useState(() => {
        setResults(calculate(defaultInputs));
    });

    return {
        inputs,
        setInputs: updateInputs,
        errors,
        results,
        loading,
        chartReady,
        warnings,
    };
} 