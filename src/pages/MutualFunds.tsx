import { useEffect, useState, useRef } from "react";
import Navigation from "@/components/Navigation";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Slider } from "@/components/ui/slider";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
    TrendingUp,
    Shield,
    Scale,
    Coins,
    Calculator,
    ArrowRight,
    Star,
    Award,
    BarChart3,
    PieChart,
    Target,
    Zap,
    DollarSign,
    Percent,
    Calendar,
    Users
} from "lucide-react";
import { motion, useInView } from 'framer-motion';
import AOS from 'aos';
import 'aos/dist/aos.css';
import ContactPopup from '@/components/ui/ContactPopup';
import { useContactPopup } from '@/hooks/useContactPopup';

// Animation variants
const staggerContainer = {
    hidden: {},
    show: {
        transition: {
            staggerChildren: 0.15,
            delayChildren: 0.1
        }
    }
};
const fadeIn = {
    hidden: { opacity: 0 },
    show: { opacity: 1, transition: { duration: 0.6, ease: [0.42, 0, 0.58, 1] as [number, number, number, number] } }
};
const slideUp = {
    hidden: { opacity: 0, y: 40 },
    show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.42, 0, 0.58, 1] as [number, number, number, number] } }
};
const zoomIn = {
    hidden: { opacity: 0, scale: 0.95 },
    show: { opacity: 1, scale: 1, transition: { duration: 0.6, ease: [0.42, 0, 0.58, 1] as [number, number, number, number] } }
};

const MutualFunds = () => {
    const [heroInView, setHeroInView] = useState(true);
    const [morphingText, setMorphingText] = useState("");
    const [typewriterIndex, setTypewriterIndex] = useState(0);
    const [typewriterChar, setTypewriterChar] = useState(0);
    const [isDeleting, setIsDeleting] = useState(false);
    const [isPaused, setIsPaused] = useState(false);
    const [sipAmount, setSipAmount] = useState(5000);
    const [sipDuration, setSipDuration] = useState(10);
    const [expectedReturn, setExpectedReturn] = useState(12);
    const [totalInvestment, setTotalInvestment] = useState(0);
    const [totalValue, setTotalValue] = useState(0);
    const [totalGain, setTotalGain] = useState(0);
    const [riskLevel, setRiskLevel] = useState(3);
    const { isOpen, openPopup, closePopup } = useContactPopup();
    const [selectedFund, setSelectedFund] = useState<string | null>(null);

    const morphingTexts = ["Grow", "Prosper", "Achieve"];
    const morphingIndex = Math.floor((Date.now() / 2000) % 3);

    useEffect(() => {
        let timeout: NodeJS.Timeout | undefined;
        const currentWord = morphingTexts[typewriterIndex];
        if (!isDeleting && typewriterChar < currentWord.length) {
            timeout = setTimeout(() => {
                setMorphingText(currentWord.slice(0, typewriterChar + 1));
                setTypewriterChar(typewriterChar + 1);
            }, 90);
        } else if (!isDeleting && typewriterChar === currentWord.length) {
            timeout = setTimeout(() => setIsDeleting(true), 300); // increased pause
        } else if (isDeleting && typewriterChar > 0) {
            timeout = setTimeout(() => {
                setMorphingText(currentWord.slice(0, typewriterChar - 1));
                setTypewriterChar(typewriterChar - 1);
            }, 90);
        } else if (isDeleting && typewriterChar === 0) {
            setIsDeleting(false);
            setTypewriterIndex((prev) => (prev + 1) % morphingTexts.length);
        }
        return () => {
            if (timeout) clearTimeout(timeout);
        };
    }, [typewriterChar, isDeleting, typewriterIndex, morphingTexts]);

    // Reset typewriterChar and morphingText when typewriterIndex changes
    useEffect(() => {
        setTypewriterChar(0);
        setMorphingText("");
    }, [typewriterIndex]);

    const fundTypes = [
        {
            id: "equity",
            title: "Equity Funds",
            description: "High growth potential with market-linked returns",
            icon: TrendingUp,
            color: "from-green-500 to-emerald-500",
            risk: "High",
            returns: "12-18%",
            features: ["Market growth", "High returns", "Long-term focus", "Diversification"],
            animation: "bull-market"
        },
        {
            id: "debt",
            title: "Debt Funds",
            description: "Stable returns with lower risk profile",
            icon: Shield,
            color: "from-blue-500 to-cyan-500",
            risk: "Low",
            returns: "6-9%",
            features: ["Stable returns", "Lower risk", "Regular income", "Capital preservation"],
            animation: "bond-floating"
        },
        {
            id: "hybrid",
            title: "Hybrid Funds",
            description: "Balanced approach with equity and debt mix",
            icon: Scale,
            color: "from-purple-500 to-indigo-500",
            risk: "Moderate",
            returns: "8-12%",
            features: ["Balanced risk", "Moderate returns", "Flexible allocation", "Tax efficiency"],
            animation: "balance-scale"
        },
        {
            id: "elss",
            title: "ELSS Funds",
            description: "Tax-saving equity funds with lock-in period",
            icon: Coins,
            color: "from-orange-500 to-red-500",
            risk: "High",
            returns: "12-16%",
            features: ["Tax benefits", "Equity exposure", "3-year lock-in", "Section 80C"],
            animation: "tax-savings"
        }
    ];

    const topFunds = [
        {
            name: "Haria Equity Growth Fund",
            category: "Large Cap",
            nav: "₹45.67",
            returns: "+15.8%",
            rating: 4.5,
            risk: "Moderate"
        },
        {
            name: "Haria Balanced Advantage Fund",
            category: "Hybrid",
            nav: "₹32.45",
            returns: "+12.3%",
            rating: 4.3,
            risk: "Moderate"
        },
        {
            name: "Haria Tax Saver Fund",
            category: "ELSS",
            nav: "₹28.91",
            returns: "+14.2%",
            rating: 4.4,
            risk: "High"
        }
    ];

    useEffect(() => {
        const hero = document.getElementById("hero");
        if (!hero) return;
        const observer = new window.IntersectionObserver(
            ([entry]) => setHeroInView(entry.isIntersecting),
            { threshold: 0.3 }
        );
        observer.observe(hero);
        return () => observer.disconnect();
    }, []);

    // Handle hash-based scrolling to sections
    useEffect(() => {
        const scrollToHash = () => {
            const hash = window.location.hash.replace('#', '');
            if (!hash) return;
            const el = document.getElementById(hash);
            if (el) {
                el.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }
        };
        // initial after mount
        const t = setTimeout(scrollToHash, 50);
        // on hash changes
        window.addEventListener('hashchange', scrollToHash);
        return () => { clearTimeout(t); window.removeEventListener('hashchange', scrollToHash); };
    }, []);

    // Morphing text effect
    useEffect(() => {
        const timer = setInterval(() => {
            setMorphingText(morphingTexts[morphingIndex]);
        }, 2000);
        return () => clearInterval(timer);
    }, [morphingIndex]);

    // SIP Calculator
    useEffect(() => {
        const monthlyInvestment = sipAmount;
        const months = sipDuration * 12;
        const monthlyRate = expectedReturn / 12 / 100;

        const totalInvested = monthlyInvestment * months;
        const futureValue = monthlyInvestment * ((Math.pow(1 + monthlyRate, months) - 1) / monthlyRate) * (1 + monthlyRate);
        const totalGainAmount = futureValue - totalInvested;

        setTotalInvestment(totalInvested);
        setTotalValue(futureValue);
        setTotalGain(totalGainAmount);
    }, [sipAmount, sipDuration, expectedReturn]);

    // Initialize AOS
    useEffect(() => {
        AOS.init({ duration: 600, once: true });
    }, []);

    // Risk meter color
    const getRiskColor = (level: number) => {
        if (level <= 2) return "text-green-500";
        if (level <= 3) return "text-yellow-500";
        return "text-red-500";
    };

    // --- HERO SECTION ---
    const heroHeadingRef = useRef(null);
    const heroHeadingInView = useInView(heroHeadingRef, { once: true, amount: 0.3 });
    const heroPRef = useRef(null);
    const heroPInView = useInView(heroPRef, { once: true, amount: 0.3 });

    // --- SIP CALCULATOR SECTION ---
    const sipHeadingRef = useRef(null);
    const sipHeadingInView = useInView(sipHeadingRef, { once: true, amount: 0.3 });
    const sipPRef = useRef(null);
    const sipPInView = useInView(sipPRef, { once: true, amount: 0.3 });

    // --- FUND TYPES SECTION ---
    const fundTypesHeadingRef = useRef(null);
    const fundTypesHeadingInView = useInView(fundTypesHeadingRef, { once: true, amount: 0.3 });
    const fundTypesPRef = useRef(null);
    const fundTypesPInView = useInView(fundTypesPRef, { once: true, amount: 0.3 });
    const fundTypesGridRef = useRef(null);
    const fundTypesGridInView = useInView(fundTypesGridRef, { once: true, amount: 0.3 });

    // --- TOP FUNDS SECTION ---
    const topFundsHeadingRef = useRef(null);
    const topFundsHeadingInView = useInView(topFundsHeadingRef, { once: true, amount: 0.3 });
    const topFundsPRef = useRef(null);
    const topFundsPInView = useInView(topFundsPRef, { once: true, amount: 0.3 });
    const topFundsGridRef = useRef(null);
    const topFundsGridInView = useInView(topFundsGridRef, { once: true, amount: 0.3 });

    // --- CTA SECTION ---
    const ctaHeadingRef = useRef(null);
    const ctaHeadingInView = useInView(ctaHeadingRef, { once: true, amount: 0.3 });
    const ctaPRef = useRef(null);
    const ctaPInView = useInView(ctaPRef, { once: true, amount: 0.3 });

    return (
        <div className="min-h-screen bg-background">
            <Navigation isTransparent={heroInView} />

            {/* Hero Section */}
            <section id="hero" className="relative min-h-[60vh] md:min-h-screen flex items-center justify-center overflow-hidden px-4 md:px-8">
                {/* Background Image */}
                <div
                    className="absolute inset-0 bg-cover bg-center"
                    style={{ backgroundImage: "url('/hero-mutual-funds.webp')" }}
                />
                <div className="absolute inset-0 bg-black/40" />

                <div className="relative z-10 text-center text-white w-full max-w-3xl mx-auto py-12 md:py-24">
                    <motion.h1
                        ref={heroHeadingRef}
                        variants={slideUp}
                        initial="hidden"
                        animate={heroHeadingInView ? "show" : "hidden"}
                        className="text-3xl sm:text-5xl md:text-7xl font-playfair font-bold mb-6"
                    >
                        <span className="inline-block mr-4">Grow</span>
                        <span className="inline-block mr-4 text-accent">→</span>
                        <span className="inline-block mr-4">Prosper</span>
                        <span className="inline-block mr-4 text-accent">→</span>
                        <span className="inline-block text-accent animate-pulse">
                            {morphingText}
                        </span>
                    </motion.h1>

                    <motion.p
                        ref={heroPRef}
                        variants={fadeIn}
                        initial="hidden"
                        animate={heroPInView ? "show" : "hidden"}
                        className="text-xl sm:text-2xl md:text-3xl font-crimson mb-8 text-white/90"
                    >
                        Build wealth through systematic investment in mutual funds
                    </motion.p>

                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                        <Button
                            size="lg"
                            className="bg-accent hover:bg-accent/90 text-accent-foreground font-semibold px-8 py-4 text-xl"
                            onClick={openPopup}
                        >
                            Start SIP
                            <ArrowRight className="ml-2 h-5 w-5" />
                        </Button>
                        <Button
                            size="lg"
                            variant="outline"
                            className="border-white text-white hover:bg-white hover:text-accent font-semibold px-8 py-4 text-xl"
                            onClick={openPopup}
                        >
                            Explore Funds
                        </Button>
                    </div>
                </div>
            </section>

            {/* SIP Calculator Section */}
            <section className="py-20 px-4 bg-gradient-premium">
                <div className="max-w-6xl mx-auto">
                    <motion.div
                        ref={sipHeadingRef}
                        variants={slideUp}
                        initial="hidden"
                        animate={sipHeadingInView ? "show" : "hidden"}
                        className="text-center mb-16"
                    >
                        <h2 className="text-4xl md:text-5xl font-playfair font-bold text-foreground mb-4">
                            SIP Calculator
                        </h2>
                        <p className="text-2xl font-crimson text-muted-foreground">
                            Plan your investments and see the power of compounding
                        </p>
                    </motion.div>

                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
                        {/* Calculator Inputs */}
                        <Card className="premium-card">
                            <CardHeader>
                                <CardTitle className="text-2xl font-playfair flex items-center">
                                    <Calculator className="h-6 w-6 mr-2 text-accent" />
                                    Calculate Your Returns
                                </CardTitle>
                            </CardHeader>
                            <CardContent className="space-y-6">
                                <div>
                                    <Label className="text-lg font-semibold text-foreground">Monthly Investment (₹)</Label>
                                    <div className="flex items-center space-x-4 mt-2">
                                        <Slider
                                            value={[sipAmount]}
                                            onValueChange={(value) => setSipAmount(value[0])}
                                            max={50000}
                                            min={1000}
                                            step={1000}
                                            className="flex-1"
                                        />
                                        <Input
                                            value={sipAmount.toLocaleString()}
                                            onChange={(e) => setSipAmount(parseInt(e.target.value.replace(/,/g, '')) || 0)}
                                            className="w-24 text-center"
                                        />
                                    </div>
                                </div>

                                <div>
                                    <Label className="text-lg font-semibold text-foreground">Investment Duration (Years)</Label>
                                    <div className="flex items-center space-x-4 mt-2">
                                        <Slider
                                            value={[sipDuration]}
                                            onValueChange={(value) => setSipDuration(value[0])}
                                            max={30}
                                            min={1}
                                            step={1}
                                            className="flex-1"
                                        />
                                        <Input
                                            value={sipDuration}
                                            onChange={(e) => setSipDuration(parseInt(e.target.value) || 0)}
                                            className="w-16 text-center"
                                        />
                                    </div>
                                </div>

                                <div>
                                    <Label className="text-lg font-semibold text-foreground">Expected Return (%)</Label>
                                    <div className="flex items-center space-x-4 mt-2">
                                        <Slider
                                            value={[expectedReturn]}
                                            onValueChange={(value) => setExpectedReturn(value[0])}
                                            max={20}
                                            min={6}
                                            step={1}
                                            className="flex-1"
                                        />
                                        <Input
                                            value={expectedReturn}
                                            onChange={(e) => setExpectedReturn(parseInt(e.target.value) || 0)}
                                            className="w-16 text-center"
                                        />
                                    </div>
                                </div>
                            </CardContent>
                        </Card>

                        {/* Results Display */}
                        <div className="space-y-6">
                            <Card className="premium-card bg-gradient-to-br from-accent/10 to-transparent border-accent/20">
                                <CardContent className="p-6">
                                    <div className="text-center">
                                        <div className="text-3xl font-playfair font-bold text-accent mb-2">
                                            ₹{totalValue.toLocaleString('en-IN', { maximumFractionDigits: 0 })}
                                        </div>
                                        <p className="text-muted-foreground font-crimson">Total Value</p>
                                    </div>
                                </CardContent>
                            </Card>

                            <div className="grid grid-cols-2 gap-4">
                                <Card className="premium-card">
                                    <CardContent className="p-4 text-center">
                                        <div className="text-xl font-playfair font-bold text-foreground mb-1">
                                            ₹{totalInvestment.toLocaleString('en-IN', { maximumFractionDigits: 0 })}
                                        </div>
                                        <p className="text-lg text-muted-foreground">Total Investment</p>
                                    </CardContent>
                                </Card>

                                <Card className="premium-card">
                                    <CardContent className="p-4 text-center">
                                        <div className="text-xl font-playfair font-bold text-green-600 mb-1">
                                            ₹{totalGain.toLocaleString('en-IN', { maximumFractionDigits: 0 })}
                                        </div>
                                        <p className="text-lg text-muted-foreground">Total Gain</p>
                                    </CardContent>
                                </Card>
                            </div>

                            {/* Risk Meter */}
                            <Card className="premium-card">
                                <CardContent className="p-6">
                                    <div className="flex items-center justify-between mb-4">
                                        <Label className="text-lg font-semibold text-foreground">Risk Profile</Label>
                                        <span className={`text-lg font-semibold ${getRiskColor(riskLevel)}`}>
                                            {riskLevel <= 2 ? 'Conservative' : riskLevel <= 3 ? 'Moderate' : 'Aggressive'}
                                        </span>
                                    </div>
                                    <div className="w-full bg-muted rounded-full h-2">
                                        <div
                                            className={`h-2 rounded-full transition-all duration-500 ${riskLevel <= 2 ? 'bg-green-500' : riskLevel <= 3 ? 'bg-yellow-500' : 'bg-red-500'
                                                }`}
                                            style={{ width: `${(riskLevel / 5) * 100}%` }}
                                        />
                                    </div>
                                </CardContent>
                            </Card>
                        </div>
                    </div>
                </div>
            </section>

            {/* Fund Types Section */}
            <section id="investment-categories" className="py-20 px-4 bg-background">
                <div className="max-w-7xl mx-auto">
                    <motion.div
                        ref={fundTypesHeadingRef}
                        variants={slideUp}
                        initial="hidden"
                        animate={fundTypesHeadingInView ? "show" : "hidden"}
                        className="text-center mb-16"
                    >
                        <h2 className="text-4xl md:text-5xl font-playfair font-bold text-foreground mb-4">
                            Investment Categories
                        </h2>
                        <p className="text-2xl font-crimson text-muted-foreground">
                            Choose the right fund type based on your goals and risk appetite
                        </p>
                    </motion.div>

                    <motion.div
                        ref={fundTypesGridRef}
                        variants={staggerContainer}
                        initial="hidden"
                        animate={fundTypesGridInView ? "show" : "hidden"}
                        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8"
                    >
                        {fundTypes.map((fund, index) => (
                            <motion.div key={fund.id} variants={zoomIn}>
                                <Card
                                    className={`group premium-card hover:scale-105 transition-all duration-500 cursor-pointer border-2 border-transparent hover:border-accent/50 overflow-hidden ${selectedFund === fund.id ? 'border-accent/50 bg-accent/5' : ''
                                        }`}
                                    onClick={() => setSelectedFund(fund.id)}
                                    style={{
                                        animationDelay: `${index * 0.1}s`
                                    }}
                                >
                                    <div className={`absolute inset-0 bg-gradient-to-br ${fund.color} opacity-0 group-hover:opacity-10 transition-opacity duration-500`} />

                                    <CardHeader className="relative z-10">
                                        <div className="flex items-center justify-between mb-4">
                                            <fund.icon className="h-12 w-12 text-accent group-hover:scale-110 transition-transform duration-300" />
                                            <Badge className={`${fund.risk === 'High' ? 'bg-red-500/20 text-red-600' :
                                                fund.risk === 'Moderate' ? 'bg-yellow-500/20 text-yellow-600' :
                                                    'bg-green-500/20 text-green-600'
                                                }`}>
                                                {fund.risk} Risk
                                            </Badge>
                                        </div>
                                        <CardTitle className="text-xl font-playfair text-foreground group-hover:text-accent transition-colors duration-300">
                                            {fund.title}
                                        </CardTitle>
                                    </CardHeader>

                                    <CardContent className="relative z-10">
                                        <p className="text-muted-foreground mb-4 font-crimson text-sm">
                                            {fund.description}
                                        </p>

                                        <div className="mb-4">
                                            <div className="flex justify-between items-center mb-2">
                                                <span className="text-sm text-muted-foreground">Expected Returns</span>
                                                <span className="font-semibold text-accent">{fund.returns}</span>
                                            </div>
                                        </div>

                                        <div className="space-y-2 mb-6">
                                            {fund.features.map((feature, idx) => (
                                                <div key={idx} className="flex items-center text-sm">
                                                    <div className="w-1.5 h-1.5 bg-accent rounded-full mr-2 flex-shrink-0" />
                                                    <span className="text-muted-foreground">{feature}</span>
                                                </div>
                                            ))}
                                        </div>

                                        <Button className="w-full bg-accent hover:bg-accent/90 text-accent-foreground" onClick={openPopup}>
                                            Explore Funds
                                            <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                                        </Button>
                                    </CardContent>
                                </Card>
                            </motion.div>
                        ))}
                    </motion.div>
                </div>
            </section>

            {/* Top Performing Funds */}
            <section id="top-funds" className="py-20 px-4 bg-gradient-premium">
                <div className="max-w-7xl mx-auto">
                    <motion.div
                        ref={topFundsHeadingRef}
                        variants={slideUp}
                        initial="hidden"
                        animate={topFundsHeadingInView ? "show" : "hidden"}
                        className="text-center mb-16"
                    >
                        <h2 className="text-4xl md:text-5xl font-playfair font-bold text-foreground mb-4">
                            Top Performing Funds
                        </h2>
                        <p className="text-xl font-crimson text-muted-foreground">
                            Our best-performing mutual fund schemes
                        </p>
                    </motion.div>

                    <motion.div
                        ref={topFundsGridRef}
                        variants={staggerContainer}
                        initial="hidden"
                        animate={topFundsGridInView ? "show" : "hidden"}
                        className="grid grid-cols-1 md:grid-cols-3 gap-8"
                    >
                        {topFunds.map((fund, index) => (
                            <motion.div key={index} variants={zoomIn}>
                                <Card
                                    className="group premium-card hover:scale-105 transition-all duration-500 cursor-pointer"
                                    style={{
                                        animationDelay: `${index * 0.1}s`
                                    }}
                                >
                                    <CardHeader>
                                        <div className="flex items-center justify-between mb-2">
                                            <Badge className="bg-accent/20 text-accent border-accent/30">
                                                {fund.category}
                                            </Badge>
                                            <div className="flex items-center">
                                                <Star className="h-4 w-4 text-yellow-500 fill-current mr-1" />
                                                <span className="text-sm font-semibold">{fund.rating}</span>
                                            </div>
                                        </div>
                                        <CardTitle className="text-lg font-playfair text-foreground">
                                            {fund.name}
                                        </CardTitle>
                                    </CardHeader>

                                    <CardContent>
                                        <div className="space-y-4">
                                            <div className="flex justify-between items-center">
                                                <span className="text-sm text-muted-foreground">NAV</span>
                                                <span className="font-semibold text-foreground">{fund.nav}</span>
                                            </div>
                                            <div className="flex justify-between items-center">
                                                <span className="text-sm text-muted-foreground">1 Year Returns</span>
                                                <span className="font-semibold text-green-600">{fund.returns}</span>
                                            </div>
                                            <div className="flex justify-between items-center">
                                                <span className="text-sm text-muted-foreground">Risk Level</span>
                                                <Badge variant="secondary" className={
                                                    fund.risk === 'High' ? 'bg-red-500/20 text-red-600' :
                                                        fund.risk === 'Moderate' ? 'bg-yellow-500/20 text-yellow-600' :
                                                            'bg-green-500/20 text-green-600'
                                                }>
                                                    {fund.risk}
                                                </Badge>
                                            </div>
                                        </div>

                                        <Button className="w-full mt-6 bg-accent hover:bg-accent/90 text-accent-foreground">
                                            Invest Now
                                            <ArrowRight className="ml-2 h-4 w-4" />
                                        </Button>
                                    </CardContent>
                                </Card>
                            </motion.div>
                        ))}
                    </motion.div>
                </div>
            </section>

            {/* CTA Section */}
            <section className="py-20 px-4 bg-gradient-accent">
                <div className="max-w-4xl mx-auto text-center">
                    <motion.h2
                        ref={ctaHeadingRef}
                        variants={slideUp}
                        initial="hidden"
                        animate={ctaHeadingInView ? "show" : "hidden"}
                        className="text-4xl md:text-5xl font-playfair font-bold text-white mb-6"
                    >
                        Start Your Investment Journey Today
                    </motion.h2>
                    <motion.p
                        ref={ctaPRef}
                        variants={fadeIn}
                        initial="hidden"
                        animate={ctaPInView ? "show" : "hidden"}
                        className="text-xl font-crimson text-white/80 mb-8"
                    >
                        Begin with as little as ₹500 and watch your wealth grow
                    </motion.p>
                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                        <Button size="lg" className="bg-white text-accent hover:bg-white/90 font-semibold px-8 py-4 text-lg" onClick={openPopup}>
                            Start SIP
                        </Button>
                        <Button size="lg" variant="outline" className="border-white text-white hover:bg-white hover:text-accent font-semibold px-8 py-4 text-lg" onClick={openPopup}>
                            Get Expert Advice
                        </Button>
                    </div>
                    <div className="flex flex-wrap gap-3 justify-center mt-6">
                        <a href="https://users.madosx.co.in/pages/auth/login" target="_blank" rel="noopener noreferrer" className="text-white underline hover:text-secondary text-base font-crimson">Mutual Fund Client Login</a>
                        <a href="https://www.cvlkra.com/" target="_blank" rel="noopener noreferrer" className="text-white underline hover:text-secondary text-base font-crimson">Check Mutual Fund KYC</a>
                        <a href="https://www.nseindia.com/" target="_blank" rel="noopener noreferrer" className="text-white underline hover:text-secondary text-base font-crimson">NSE India</a>
                        <a href="https://www.bseindia.com/" target="_blank" rel="noopener noreferrer" className="text-white underline hover:text-secondary text-base font-crimson">BSE India</a>
                    </div>
                </div>
            </section>

            {/* Contact Popup */}
            <ContactPopup
                isOpen={isOpen}
                onClose={closePopup}
                title="Start Your Mutual Fund Journey"
                description="Get expert guidance on SIP investments and fund selection tailored to your goals."
            />
        </div>
    );
};

export default MutualFunds; 