import { cn } from "@/lib/utils";
import {
    IconShieldCheck,
    IconAward,
    IconScale,
    IconBook,
    IconLock,
    IconUsers,
} from "@tabler/icons-react";

const ValueCard = ({
    title,
    description,
    icon,
}: {
    title: string;
    description: string;
    icon: React.ReactNode;
}) => {
    return (
        <div className="flex flex-col py-10 relative group/feature transition">
            {/* Hover gradient overlay */}
            <div className="opacity-0 group-hover/feature:opacity-100 transition duration-300 absolute inset-0 h-full w-full bg-gradient-to-b from-cream/60 to-transparent pointer-events-none" />

            {/* Icon */}
            <div className="mb-6 relative z-10 px-10 text-secondary text-3xl">
                {icon}
            </div>

            {/* Title */}
            <div className="text-2xl font-semibold mb-4 relative z-10 px-10">
                <div className="absolute left-0 inset-y-0 h-6 group-hover/feature:h-8 w-1 rounded-tr-full rounded-br-full bg-cream group-hover/feature:bg-secondary transition-all duration-300" />
                <span className="group-hover/feature:translate-x-2 transition duration-300 inline-block text-tertiary">
                    {title}
                </span>
            </div>

            {/* Description */}
            <p className="text-xl text-tertiary/80 leading-relaxed font-crimson relative z-10 px-10">
                {description}
            </p>
        </div>
    );
};

const CoreValues = () => {
    const values = [
        {
            title: "Objectivity",
            description:
                "We act solely in the best interest of each client, based on sound analysis and without bias, ensuring their satisfaction.",
            icon: <IconShieldCheck size={32} />,
        },
        {
            title: "Integrity",
            description:
                "We hold ourselves to the highest ethical standards in our dealings with clients, prospects and community members.",
            icon: <IconAward size={32} />,
        },
        {
            title: "Fairness",
            description:
                "We treat all clients fairly and with respect. We believe in equal service and treating clients with dignity and empathy.",
            icon: <IconScale size={32} />,
        },
        {
            title: "Competence",
            description:
                "We continuously improve our professional knowledge and skills.",
            icon: <IconBook size={32} />,
        },
        {
            title: "Confidentiality",
            description:
                "We do not disclose any confidential client information without consent.",
            icon: <IconLock size={32} />,
        },
        {
            title: "Professionalism",
            description:
                "We adhere to the highest professional standards in all our work.",
            icon: <IconUsers size={32} />,
        },
    ];

    return (
        <section id="core-values" className=" py-20">
            {/* Section header */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center mb-16">
                <h2 className="font-playfair text-4xl md:text-5xl font-bold text-tertiary mb-6">
                    Our Core Values
                </h2>
                <p className="font-crimson text-xl text-tertiary/80 max-w-3xl mx-auto">
                    At Haria Investments, our values guide every interaction with clients,
                    prospects, and the community. They are the foundation of the trust
                    we’ve built over generations.
                </p>
            </div>

            {/* Grid with inside borders only */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 
                            divide-x divide-y divide-[hsl(var(--border))] 
                            max-w-7xl mx-auto rounded-lg overflow-hidden shadow-sm">
                {values.map((value, index) => (
                    <ValueCard key={value.title} {...value} />
                ))}
            </div>
        </section>
    );
};

export default CoreValues;
