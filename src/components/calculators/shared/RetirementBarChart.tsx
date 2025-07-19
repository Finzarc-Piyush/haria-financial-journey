import { motion } from 'framer-motion';

interface RetirementBarChartProps {
    corpus: number;
    invested: number;
    returns: number;
}

const COLORS = {
    corpus: '#B4A078',
    invested: '#E6C674',
    returns: '#8B7355',
};

function formatINR(num: number) {
    return num.toLocaleString('en-IN', { style: 'currency', currency: 'INR', maximumFractionDigits: 0 });
}

const RetirementBarChart: React.FC<RetirementBarChartProps> = ({ corpus, invested, returns }) => {
    // Find the max value for scaling
    const max = Math.max(corpus, invested, returns, 1);
    const data = [
        { label: 'Corpus Needed', value: corpus, color: COLORS.corpus },
        { label: 'Total Invested', value: invested, color: COLORS.invested },
        { label: 'Returns Earned', value: returns, color: COLORS.returns },
    ];

    return (
        <div className="w-full flex flex-col gap-4 items-center">
            {data.map((d, i) => (
                <div key={d.label} className="w-full flex flex-col">
                    <div className="flex justify-between mb-1">
                        <span className="font-crimson text-sm text-tertiary">{d.label}</span>
                        <span className="font-crimson text-sm text-tertiary font-bold">{formatINR(Math.round(d.value))}</span>
                    </div>
                    <div className="w-full h-5 bg-[#f5e7d6] rounded-full overflow-hidden">
                        <motion.div
                            initial={{ width: 0 }}
                            animate={{ width: `${Math.max(5, (d.value / max) * 100)}%` }}
                            transition={{ duration: 0.8, delay: i * 0.15 }}
                            className="h-5 rounded-full shadow"
                            style={{ background: d.color }}
                        />
                    </div>
                </div>
            ))}
        </div>
    );
};

export default RetirementBarChart; 