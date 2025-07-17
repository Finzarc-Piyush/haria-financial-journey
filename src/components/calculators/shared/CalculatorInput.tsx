import React from 'react';

interface CalculatorInputProps {
    label: string;
    value: number | string;
    onChange: (value: number | string) => void;
    type?: 'number' | 'range' | 'select';
    min?: number;
    max?: number;
    step?: number;
    options?: { label: string; value: string | number; }[];
    error?: string;
    currency?: boolean;
    name?: string;
    disabled?: boolean;
}

const GOLD = '#E6C674';

const formatCurrency = (val: number | string) => {
    if (typeof val !== 'number') val = Number(val);
    return val.toLocaleString('en-IN', { style: 'currency', currency: 'INR', maximumFractionDigits: 0 });
};

const CalculatorInput: React.FC<CalculatorInputProps> = ({
    label,
    value,
    onChange,
    type = 'number',
    min,
    max,
    step,
    options = [],
    error,
    currency,
    name,
    disabled,
}) => {
    return (
        <div className="w-full max-w-xl mx-auto mb-6 flex flex-col">
            <label
                htmlFor={name}
                className="block mb-2 font-playfair text-base md:text-lg text-tertiary px-1"
            >
                {label}
            </label>
            {type === 'select' ? (
                <select
                    id={name}
                    name={name}
                    value={value}
                    onChange={e => onChange(e.target.value)}
                    className={`w-full px-3 py-3 bg-white font-crimson text-lg rounded border-2 transition-colors duration-300
            border-gray-300 focus:outline-none focus:border-[#E6C674] ${error ? 'border-red-500' : ''}`}
                    disabled={disabled}
                >
                    <option value="" disabled hidden>
                        {label}
                    </option>
                    {options.map(opt => (
                        <option key={opt.value} value={opt.value}>{opt.label}</option>
                    ))}
                </select>
            ) : (
                <div className="relative flex items-center">
                    <input
                        id={name}
                        name={name}
                        type={type}
                        value={value}
                        min={min}
                        max={max}
                        step={step}
                        onChange={e => onChange(type === 'range' ? Number(e.target.value) : e.target.value)}
                        className={`w-full px-3 py-3 bg-white font-crimson text-lg rounded border-2 transition-colors duration-300
              border-gray-300 focus:outline-none focus:border-[#E6C674] ${error ? 'border-red-500' : ''}`}
                        disabled={disabled}
                        aria-invalid={!!error}
                        aria-describedby={error ? `${name}-error` : undefined}
                    />
                    {currency && type === 'number' && (
                        <span className="absolute right-3 top-1/2 -translate-y-1/2 font-crimson text-base text-gray-500 select-none pointer-events-none">
                            {formatCurrency(value)}
                        </span>
                    )}
                </div>
            )}
            {error && <div id={`${name}-error`} className="text-red-500 text-xs mt-1 font-crimson">{error}</div>}
        </div>
    );
};

export default CalculatorInput; 