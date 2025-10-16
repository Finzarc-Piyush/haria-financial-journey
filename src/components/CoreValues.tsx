import {
    IconShieldCheck,
    IconAward,
    IconScale,
    IconBook,
    IconLock,
    IconUsers,
} from "@tabler/icons-react";
import { motion } from "framer-motion";

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
        <section id="core-values" className="py-16 bg-white">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* Section header */}
                <div className="text-center mb-16">
                    <p className="text-sm font-crimson text-tertiary/60 uppercase tracking-wider mb-4">
                        OUR VALUES
                    </p>
                    <h2 className="font-playfair text-4xl md:text-5xl lg:text-6xl font-bold text-tertiary mb-6 leading-tight">
                        Guided by Integrity and Excellence
                    </h2>
                    <p className="font-crimson text-lg md:text-xl text-tertiary/80 max-w-4xl mx-auto leading-relaxed">
                        At Haria Investments, our values guide every interaction with clients,
                        prospects, and the community. They are the foundation of the trust
                        we've built over generations.
                    </p>
                </div>

                {/* Values Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    {values.map((value, index) => (
                        <motion.div
                            key={value.title}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.5, delay: index * 0.1 }}
                            className="bg-gradient-to-br from-secondary/10 to-secondary/5 rounded-3xl p-8 hover:shadow-xl transition-all duration-300 group"
                        >
                            {/* Icon */}
                            <div className="w-16 h-16 bg-secondary rounded-full flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                                <div className="text-white">
                                    {value.icon}
                                </div>
                            </div>

                            {/* Title */}
                            <h3 className="font-playfair text-2xl md:text-3xl font-bold text-tertiary mb-4">
                                {value.title}
                            </h3>

                            {/* Description */}
                            <p className="font-crimson text-base md:text-lg text-tertiary/80 leading-relaxed">
                                {value.description}
                            </p>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default CoreValues;
