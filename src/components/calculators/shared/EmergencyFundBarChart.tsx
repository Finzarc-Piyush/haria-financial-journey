import { useEffect, useRef, useState } from 'react';
import {
    BarChart,
    Bar,
    XAxis,
    YAxis,
    Tooltip,
    ResponsiveContainer,
    LabelList,
} from 'recharts';
import { motion } from 'framer-motion';

function formatINR(num: number) {
    return num.toLocaleString('en-IN', {
        style: 'currency',
        currency: 'INR',
        maximumFractionDigits: 0,
    });
}

// Custom hook for animated value
function useAnimatedValue(target: number, duration = 600) {
    const [value, setValue] = useState(target);
    const raf = useRef<number | null>(null);
    const prev = useRef(target);

    useEffect(() => {
        if (prev.current === target) return;

        const start = prev.current;
        const change = target - start;
        const startTime = performance.now();

        function animate(now: number) {
            const elapsed = now - startTime;
            const progress = Math.min(elapsed / duration, 1);
            setValue(start + change * progress);

            if (progress < 1) {
                raf.current = requestAnimationFrame(animate);
            } else {
                setValue(target);
                prev.current = target;
            }
        }

        raf.current && cancelAnimationFrame(raf.current);
        raf.current = requestAnimationFrame(animate);

        return () => raf.current && cancelAnimationFrame(raf.current);
    }, [target, duration]);

    return value;
}

interface EmergencyFundBarChartProps {
    monthlyExpense: number;
    monthsCovered: number;
}

export default function EmergencyFundBarChart({
    monthlyExpense,
    monthsCovered,
}: EmergencyFundBarChartProps) {
    const animatedExpense = useAnimatedValue(monthlyExpense);
    const animatedMonths = useAnimatedValue(monthsCovered);
    const animatedTotal = useAnimatedValue(monthlyExpense * monthsCovered);

    const data = [
        { name: 'Monthly Expense', value: animatedExpense },
        { name: 'Months Covered', value: animatedMonths },
        { name: 'Total Fund Needed', value: animatedTotal },
    ];

    return (
        <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="w-full h-64"
        >
            <ResponsiveContainer width="100%" height="100%">
                <BarChart
                    data={data}
                    layout="vertical"
                    margin={{ top: 20, right: 30, left: 40, bottom: 5 }}
                >
                    <XAxis type="number" hide />
                    <YAxis
                        type="category"
                        dataKey="name"
                        tick={{ fontSize: 14, fill: '#8B7355' }}
                    />
                    <Tooltip
                        formatter={(value: number) => formatINR(value)}
                        contentStyle={{
                            backgroundColor: 'white',
                            borderColor: '#E6C674',
                            borderRadius: '8px',
                            fontFamily: 'Crimson Text, serif',
                        }}
                    />
                    <Bar dataKey="value" fill="#B4A078" radius={[6, 6, 6, 6]}>
                        <LabelList
                            dataKey="value"
                            position="right"
                            formatter={(v) => formatINR(v)}
                            style={{
                                fill: '#8B7355',
                                fontFamily: 'Playfair Display, serif',
                                fontWeight: 600,
                            }}
                        />
                    </Bar>
                </BarChart>
            </ResponsiveContainer>
        </motion.div>
    );
};
