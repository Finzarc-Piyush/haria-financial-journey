import { useEffect, useState, useRef } from "react";
import Navigation from "@/components/Navigation";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Slider } from "@/components/ui/slider";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Progress } from "@/components/ui/progress";
import {
    TrendingUp,
    Shield,
    Building,
    Award,
    ArrowRight,
    Star,
    CheckCircle,
    DollarSign,
    Percent,
    Calendar,
    Lock,
    Flag,
    Building2,
    PiggyBank,
    Target,
    Zap,
    Users,
    Clock,
    BarChart3
} from "lucide-react";
import { motion } from 'framer-motion';
import AOS from 'aos';
import 'aos/dist/aos.css';
import ContactPopup from '@/components/ui/ContactPopup';
import { useContactPopup } from '@/hooks/useContactPopup';

const FixedIncome = () => {
    const [heroInView, setHeroInView] = useState(true);
    const [investmentAmount, setInvestmentAmount] = useState(100000);
    const [tenure, setTenure] = useState(5);
    const [interestRate, setInterestRate] = useState(7.5);
    const [maturityValue, setMaturityValue] = useState(0);
    const [totalInterest, setTotalInterest] = useState(0);
    const { isOpen, openPopup, closePopup } = useContactPopup();
    const [selectedProduct, setSelectedProduct] = useState<string | null>(null);
    const [currentStep, setCurrentStep] = useState(0);

    const products = [
        {
            id: "fd",
            title: "Fixed Deposits",
            description: "Guaranteed returns with capital protection",
            icon: PiggyBank,
            color: "from-green-500 to-emerald-500",
            rate: "6.5-8.5%",
            tenure: "7 days - 10 years",
            minAmount: "₹10,000",
            features: ["Guaranteed returns", "Capital protection", "Flexible tenure", "Quarterly interest"],
            animation: "vault-opening"
        },
        {
            id: "bonds",
            title: "Corporate Bonds",
            description: "Higher returns from corporate debt instruments",
            icon: Building,
            color: "from-blue-500 to-cyan-500",
            rate: "8-12%",
            tenure: "3-10 years",
            minAmount: "₹10,000",
            features: ["Higher returns", "Regular income", "Credit rating", "Liquidity"],
            animation: "certificate-unrolling"
        },
        {
            id: "gsec",
            title: "Government Securities",
            description: "Sovereign guarantee with stable returns",
            icon: Flag,
            color: "from-purple-500 to-indigo-500",
            rate: "6-7.5%",
            tenure: "1-30 years",
            minAmount: "₹10,000",
            features: ["Sovereign guarantee", "Zero default risk", "Tax benefits", "Liquidity"],
            animation: "flag-waving"
        },
        {
            id: "ncd",
            title: "NCDs",
            description: "Non-convertible debentures for higher yields",
            icon: Building2,
            color: "from-orange-500 to-red-500",
            rate: "9-14%",
            tenure: "1-7 years",
            minAmount: "₹10,000",
            features: ["Higher yields", "Credit rating", "Regular interest", "Listing benefits"],
            animation: "logo-verification"
        },
        {
            id: "cgb",
            title: "Capital Gain Bonds",
            description: "Save tax on long-term capital gains under Section 54EC",
            icon: Award, // Or any suitable icon like BarChart3
            color: "from-yellow-500 to-amber-500",
            rate: "5.25% (approx)",
            tenure: "5 years (locked-in)",
            minAmount: "₹10,000",
            features: ["Tax exemption", "RBI approved", "Safe returns", "No premature exit"],
            animation: "tax-saving"
        }

    ];

    const ladderingStrategies = [
        {
            year: 1,
            amount: 200000,
            rate: 7.2,
            maturity: 2025
        },
        {
            year: 2,
            amount: 200000,
            rate: 7.5,
            maturity: 2026
        },
        {
            year: 3,
            amount: 200000,
            rate: 7.8,
            maturity: 2027
        },
        {
            year: 4,
            amount: 200000,
            rate: 8.0,
            maturity: 2028
        },
        {
            year: 5,
            amount: 200000,
            rate: 8.2,
            maturity: 2029
        }
    ];

    const topBanks = [
        {
            name: "HDFC Bank",
            rate: "7.75%",
            rating: "AAA",
            minAmount: "₹10,000",
            tenure: "1-10 years"
        },
        {
            name: "ICICI Bank",
            rate: "7.50%",
            rating: "AAA",
            minAmount: "₹10,000",
            tenure: "1-10 years"
        },
        {
            name: "SBI",
            rate: "7.25%",
            rating: "AAA",
            minAmount: "₹10,000",
            tenure: "1-10 years"
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

    // Handle hash-based scrolling
    useEffect(() => {
        const scrollToHash = () => {
            const hash = window.location.hash.replace('#', '');
            if (!hash) return;
            const el = document.getElementById(hash);
            if (el) {
                el.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }
        };
        const t = setTimeout(scrollToHash, 50);
        window.addEventListener('hashchange', scrollToHash);
        return () => { clearTimeout(t); window.removeEventListener('hashchange', scrollToHash); };
    }, []);

    // Fixed deposit calculator
    useEffect(() => {
        const principal = investmentAmount;
        const rate = interestRate / 100;
        const time = tenure;

        const maturityAmount = principal * Math.pow(1 + rate, time);
        const totalInterestEarned = maturityAmount - principal;

        setMaturityValue(maturityAmount);
        setTotalInterest(totalInterestEarned);
    }, [investmentAmount, tenure, interestRate]);

    // Initialize AOS
    useEffect(() => {
        AOS.init({ duration: 600, once: true });
    }, []);

    // Laddering animation
    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry, index) => {
                    if (entry.isIntersecting) {
                        setTimeout(() => setCurrentStep(index), index * 200);
                    }
                });
            },
            { threshold: 0.5 }
        );

        const steps = document.querySelectorAll('.ladder-step');
        steps.forEach(step => observer.observe(step));
        return () => observer.disconnect();
    }, []);

    // Animation variants for scroll-based reveal
    const fadeSlideUp = {
        hidden: { opacity: 0, y: 40 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.7 } }
    };

    return (
        <div className="min-h-screen bg-background">
            <Navigation isTransparent={heroInView} />

            {/* Hero Section */}
            <section id="hero" className="relative min-h-[60vh] md:min-h-screen flex items-center justify-center overflow-hidden px-4 md:px-8">
                {/* Background Image */}
                <div
                    className="absolute inset-0 bg-cover bg-center"
                    style={{ backgroundImage: "url('/hero-fixed-income.webp')" }}
                />
                <div className="absolute inset-0 bg-black/40" />

                <div className="relative z-10 text-center text-white w-full max-w-3xl mx-auto py-12 md:py-24">
                    <motion.h1 variants={fadeSlideUp} initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.3 }} className="text-3xl sm:text-5xl md:text-7xl font-playfair font-bold mb-6">
                        <span className="inline-block mr-4">Steady Returns,</span>
                        <br />
                        <span className="inline-block text-accent animate-pulse">Guaranteed Security</span>
                    </motion.h1>

                    <motion.p variants={fadeSlideUp} initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.3 }} className="text-base sm:text-lg md:text-2xl font-crimson mb-8 text-white/90">
                        Build wealth with stable, predictable returns through fixed income investments
                    </motion.p>

                    {/* Trust Seal Animation */}
                    <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6 mb-8 max-w-2xl mx-auto">
                        <div className="flex items-center justify-center space-x-4">
                            <div className="w-12 h-12 bg-accent/20 rounded-full flex items-center justify-center animate-pulse">
                                <Shield className="h-6 w-6 text-accent" />
                            </div>
                            <div className="text-left">
                                <div className="font-semibold text-white">Capital Protection</div>
                                <div className="text-sm text-white/80">Guaranteed by RBI regulations</div>
                            </div>
                        </div>
                    </div>

                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                        <Button
                            size="lg"
                            className="bg-accent hover:bg-accent/90 text-accent-foreground font-semibold px-8 py-4 text-lg"
                            onClick={openPopup}
                        >
                            Invest Now
                            <ArrowRight className="ml-2 h-5 w-5" />
                        </Button>
                        <Button
                            size="lg"
                            variant="outline"
                            className="border-white text-white hover:bg-white hover:text-accent font-semibold px-8 py-4 text-lg"
                        >
                            Compare Rates
                        </Button>
                    </div>
                </div>
            </section>

            {/* Product Showcase Section */}
            <section id="products" className="py-20 px-4 bg-gradient-premium">
                <div className="max-w-7xl mx-auto">
                    <motion.div variants={fadeSlideUp} initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.3 }} className="text-center mb-16">
                        <h2 className="text-4xl md:text-5xl font-playfair font-bold text-foreground mb-4">
                            Fixed Income Products
                        </h2>
                        <p className="text-xl font-crimson text-muted-foreground">
                            Choose from a range of secure investment options
                        </p>
                    </motion.div>

                    <motion.div variants={fadeSlideUp} initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.3 }} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
                        {products.map((product, index) => (
                            <motion.div
                                key={product.id}
                                className={`group premium-card hover:scale-105 transition-all duration-500 cursor-pointer border-2 border-transparent hover:border-accent/50 overflow-hidden ${selectedProduct === product.id ? 'border-accent/50 bg-accent/5' : ''
                                    }`}
                                onClick={() => setSelectedProduct(product.id)}
                                style={{
                                    animationDelay: `${index * 0.1}s`
                                }}
                            >
                                <div className={`absolute inset-0 bg-gradient-to-br ${product.color} opacity-0 group-hover:opacity-10 transition-opacity duration-500`} />

                                <CardHeader className="relative z-10">
                                    <div className="flex items-center justify-between mb-4">
                                        <product.icon className="h-12 w-12 text-accent group-hover:scale-110 transition-transform duration-300" />
                                        <Badge className="bg-accent/20 text-accent border-accent/30">
                                            {product.rate}
                                        </Badge>
                                    </div>
                                    <CardTitle className="text-xl font-playfair text-foreground group-hover:text-accent transition-colors duration-300">
                                        {product.title}
                                    </CardTitle>
                                </CardHeader>

                                <CardContent className="relative z-10">
                                    <p className="text-muted-foreground mb-4 font-crimson text-sm">
                                        {product.description}
                                    </p>

                                    <div className="space-y-3 mb-6">
                                        <div className="flex justify-between items-center">
                                            <span className="text-sm text-muted-foreground">Tenure</span>
                                            <span className="font-semibold text-foreground">{product.tenure}</span>
                                        </div>
                                        <div className="flex justify-between items-center">
                                            <span className="text-sm text-muted-foreground">Min Amount</span>
                                            <span className="font-semibold text-accent">{product.minAmount}</span>
                                        </div>
                                    </div>

                                    <div className="space-y-2 mb-6">
                                        {product.features.map((feature, idx) => (
                                            <div key={idx} className="flex items-center text-sm">
                                                <CheckCircle className="h-4 w-4 text-accent mr-2 flex-shrink-0" />
                                                <span className="text-muted-foreground">{feature}</span>
                                            </div>
                                        ))}
                                    </div>

                                    <Button className="w-full bg-accent hover:bg-accent/90 text-accent-foreground" onClick={openPopup}>
                                        Invest Now
                                        <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                                    </Button>
                                </CardContent>
                            </motion.div>
                        ))}
                    </motion.div>
                </div>
            </section>

            {/* FD Calculator Section */}
            <section className="py-20 px-4 bg-background">
                <div className="max-w-6xl mx-auto">
                    <motion.div variants={fadeSlideUp} initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.3 }} className="text-center mb-16">
                        <h2 className="text-4xl md:text-5xl font-playfair font-bold text-foreground mb-4">
                            Fixed Deposit Calculator
                        </h2>
                        <p className="text-xl font-crimson text-muted-foreground">
                            Calculate your returns and plan your investments
                        </p>
                    </motion.div>

                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
                        {/* Calculator Inputs */}
                        <Card className="premium-card">
                            <CardHeader>
                                <CardTitle className="text-2xl font-playfair flex items-center">
                                    <Target className="h-6 w-6 mr-2 text-accent" />
                                    Calculate Your Returns
                                </CardTitle>
                            </CardHeader>
                            <CardContent className="space-y-6">
                                <div>
                                    <Label className="text-sm font-semibold text-foreground">Investment Amount (₹)</Label>
                                    <div className="flex items-center space-x-4 mt-2">
                                        <Slider
                                            value={[investmentAmount]}
                                            onValueChange={(value) => setInvestmentAmount(value[0])}
                                            max={10000000}
                                            min={10000}
                                            step={10000}
                                            className="flex-1"
                                        />
                                        <Input
                                            value={investmentAmount.toLocaleString()}
                                            onChange={(e) => setInvestmentAmount(parseInt(e.target.value.replace(/,/g, '')) || 0)}
                                            className="w-32 text-center"
                                        />
                                    </div>
                                </div>

                                <div>
                                    <Label className="text-sm font-semibold text-foreground">Tenure (Years)</Label>
                                    <div className="flex items-center space-x-4 mt-2">
                                        <Slider
                                            value={[tenure]}
                                            onValueChange={(value) => setTenure(value[0])}
                                            max={10}
                                            min={1}
                                            step={1}
                                            className="flex-1"
                                        />
                                        <Input
                                            value={tenure}
                                            onChange={(e) => setTenure(parseInt(e.target.value) || 0)}
                                            className="w-16 text-center"
                                        />
                                    </div>
                                </div>

                                <div>
                                    <Label className="text-sm font-semibold text-foreground">Interest Rate (%)</Label>
                                    <div className="flex items-center space-x-4 mt-2">
                                        <Slider
                                            value={[interestRate]}
                                            onValueChange={(value) => setInterestRate(value[0])}
                                            max={12}
                                            min={5}
                                            step={0.1}
                                            className="flex-1"
                                        />
                                        <Input
                                            value={interestRate}
                                            onChange={(e) => setInterestRate(parseFloat(e.target.value) || 0)}
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
                                            ₹{maturityValue.toLocaleString('en-IN', { maximumFractionDigits: 0 })}
                                        </div>
                                        <p className="text-muted-foreground font-crimson">Maturity Value</p>
                                    </div>
                                </CardContent>
                            </Card>

                            <div className="grid grid-cols-2 gap-4">
                                <Card className="premium-card">
                                    <CardContent className="p-4 text-center">
                                        <div className="text-xl font-playfair font-bold text-foreground mb-1">
                                            ₹{investmentAmount.toLocaleString('en-IN', { maximumFractionDigits: 0 })}
                                        </div>
                                        <p className="text-sm text-muted-foreground">Principal Amount</p>
                                    </CardContent>
                                </Card>

                                <Card className="premium-card">
                                    <CardContent className="p-4 text-center">
                                        <div className="text-xl font-playfair font-bold text-green-600 mb-1">
                                            ₹{totalInterest.toLocaleString('en-IN', { maximumFractionDigits: 0 })}
                                        </div>
                                        <p className="text-sm text-muted-foreground">Total Interest</p>
                                    </CardContent>
                                </Card>
                            </div>

                            {/* Tax Calculation */}
                            <Card className="premium-card">
                                <CardContent className="p-6">
                                    <h4 className="font-semibold text-foreground mb-4">Tax Implications</h4>
                                    <div className="space-y-3">
                                        <div className="flex justify-between items-center">
                                            <span className="text-sm text-muted-foreground">Interest Income</span>
                                            <span className="font-semibold text-foreground">₹{totalInterest.toLocaleString()}</span>
                                        </div>
                                        <div className="flex justify-between items-center">
                                            <span className="text-sm text-muted-foreground">Tax Rate (30%)</span>
                                            <span className="font-semibold text-red-600">₹{(totalInterest * 0.3).toLocaleString()}</span>
                                        </div>
                                        <div className="flex justify-between items-center border-t pt-2">
                                            <span className="text-sm font-semibold text-foreground">Net Returns</span>
                                            <span className="font-semibold text-green-600">₹{(totalInterest * 0.7).toLocaleString()}</span>
                                        </div>
                                    </div>
                                </CardContent>
                            </Card>
                        </div>
                    </div>
                </div>
            </section>

            {/* Laddering Strategy Section */}
            <section id="laddering-strategy" className="py-20 px-4 bg-gradient-premium">
                <div className="max-w-7xl mx-auto">
                    <motion.div variants={fadeSlideUp} initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.3 }} className="text-center mb-16">
                        <h2 className="text-4xl md:text-5xl font-playfair font-bold text-foreground mb-4">
                            Laddering Strategy
                        </h2>
                        <p className="text-xl font-crimson text-muted-foreground">
                            Optimize your returns with systematic investment laddering
                        </p>
                    </motion.div>

                    <div className="relative">
                        {/* Connecting Timeline */}
                        <div className="absolute top-1/2 left-0 right-0 h-0.5 bg-accent/30 transform -translate-y-1/2 hidden lg:block" />

                        <motion.div variants={fadeSlideUp} initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.3 }} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6">
                            {ladderingStrategies.map((strategy, index) => (
                                <motion.div
                                    key={index}
                                    className={`ladder-step text-center relative ${index <= currentStep ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
                                        } transition-all duration-700`}
                                    style={{ transitionDelay: `${index * 200}ms` }}
                                >
                                    <Card className="premium-card">
                                        <CardContent className="p-6">
                                            <div className="text-3xl font-playfair font-bold text-accent mb-2">
                                                Year {strategy.year}
                                            </div>
                                            <div className="space-y-3">
                                                <div>
                                                    <div className="text-sm text-muted-foreground">Amount</div>
                                                    <div className="font-semibold text-foreground">₹{strategy.amount.toLocaleString()}</div>
                                                </div>
                                                <div>
                                                    <div className="text-sm text-muted-foreground">Rate</div>
                                                    <div className="font-semibold text-accent">{strategy.rate}%</div>
                                                </div>
                                                <div>
                                                    <div className="text-sm text-muted-foreground">Maturity</div>
                                                    <div className="font-semibold text-foreground">{strategy.maturity}</div>
                                                </div>
                                            </div>
                                        </CardContent>
                                    </Card>

                                    {/* Year Badge */}
                                    <div className="absolute -top-2 -right-2 w-8 h-8 bg-accent rounded-full flex items-center justify-center text-white font-bold text-sm">
                                        {strategy.year}
                                    </div>
                                </motion.div>
                            ))}
                        </motion.div>
                    </div>

                    <motion.div variants={fadeSlideUp} initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.3 }} className="text-center mt-12">
                        <div className="bg-white/50 backdrop-blur-sm rounded-2xl p-8 max-w-2xl mx-auto">
                            <h3 className="text-2xl font-playfair font-bold text-foreground mb-4">
                                Benefits of Laddering
                            </h3>
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                                <div className="text-center">
                                    <div className="w-12 h-12 mx-auto mb-3 bg-accent/20 rounded-full flex items-center justify-center">
                                        <TrendingUp className="h-6 w-6 text-accent" />
                                    </div>
                                    <div className="font-semibold text-foreground">Higher Returns</div>
                                    <div className="text-sm text-muted-foreground">Lock in better rates</div>
                                </div>
                                <div className="text-center">
                                    <div className="w-12 h-12 mx-auto mb-3 bg-accent/20 rounded-full flex items-center justify-center">
                                        <Shield className="h-6 w-6 text-accent" />
                                    </div>
                                    <div className="font-semibold text-foreground">Risk Management</div>
                                    <div className="text-sm text-muted-foreground">Spread maturity dates</div>
                                </div>
                                <div className="text-center">
                                    <div className="w-12 h-12 mx-auto mb-3 bg-accent/20 rounded-full flex items-center justify-center">
                                        <DollarSign className="h-6 w-6 text-accent" />
                                    </div>
                                    <div className="font-semibold text-foreground">Regular Income</div>
                                    <div className="text-sm text-muted-foreground">Quarterly interest</div>
                                </div>
                            </div>
                        </div>
                    </motion.div>
                </div>
            </section>

            {/* Top Banks Section */}
            <section id="top-bank-fds" className="py-20 px-4 bg-background">
                <div className="max-w-7xl mx-auto">
                    <motion.div variants={fadeSlideUp} initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.3 }} className="text-center mb-16">
                        <h2 className="text-4xl md:text-5xl font-playfair font-bold text-foreground mb-4">
                            Top Bank FDs
                        </h2>
                        <p className="text-xl font-crimson text-muted-foreground">
                            Compare rates from leading banks
                        </p>
                    </motion.div>

                    <motion.div variants={fadeSlideUp} initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.3 }} className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {topBanks.map((bank, index) => (
                            <Card
                                key={index}
                                className="group premium-card hover:scale-105 transition-all duration-500 cursor-pointer"
                                style={{
                                    animationDelay: `${index * 0.1}s`
                                }}
                            >
                                <CardHeader>
                                    <div className="flex items-center justify-between mb-4">
                                        <div className="w-12 h-12 bg-accent/20 rounded-full flex items-center justify-center">
                                            <Building className="h-6 w-6 text-accent" />
                                        </div>
                                        <Badge className="bg-green-500/20 text-green-600 border-green-500/30">
                                            {bank.rating}
                                        </Badge>
                                    </div>
                                    <CardTitle className="text-xl font-playfair text-foreground">
                                        {bank.name}
                                    </CardTitle>
                                </CardHeader>

                                <CardContent>
                                    <div className="space-y-4">
                                        <div className="flex justify-between items-center">
                                            <span className="text-sm text-muted-foreground">Interest Rate</span>
                                            <span className="font-semibold text-accent">{bank.rate}</span>
                                        </div>
                                        <div className="flex justify-between items-center">
                                            <span className="text-sm text-muted-foreground">Min Amount</span>
                                            <span className="font-semibold text-foreground">{bank.minAmount}</span>
                                        </div>
                                        <div className="flex justify-between items-center">
                                            <span className="text-sm text-muted-foreground">Tenure</span>
                                            <span className="font-semibold text-foreground">{bank.tenure}</span>
                                        </div>
                                    </div>

                                    <Button className="w-full mt-6 bg-accent hover:bg-accent/90 text-accent-foreground" onClick={openPopup}>
                                        Invest Now
                                        <ArrowRight className="ml-2 h-4 w-4" />
                                    </Button>
                                </CardContent>
                            </Card>
                        ))}
                    </motion.div>
                </div>
            </section>

            {/* CTA Section */}
            <section className="py-20 px-4 bg-gradient-accent">
                <div className="max-w-4xl mx-auto text-center">
                    <motion.h2 variants={fadeSlideUp} initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.3 }} className="text-4xl md:text-5xl font-playfair font-bold text-white mb-6">
                        Start Your Fixed Income Journey
                    </motion.h2>
                    <motion.p variants={fadeSlideUp} initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.3 }} className="text-xl font-crimson text-white/80 mb-8">
                        Secure your future with guaranteed returns and capital protection
                    </motion.p>
                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                        <Button size="lg" asChild className="bg-white text-accent hover:bg-white/90 font-semibold px-8 py-4 text-lg">
                            <a href="https://mosl.co/OWxY3P3cRN" target="_blank" rel="noopener noreferrer">Open FD Account</a>
                        </Button>
                        <Button size="lg" variant="outline" className="border-white text-white hover:bg-white hover:text-accent font-semibold px-8 py-4 text-lg">
                            Get Expert Advice
                        </Button>
                    </div>
                </div>
            </section>

            {/* Contact Popup */}
            <ContactPopup
                isOpen={isOpen}
                onClose={closePopup}
                title="Start Your Fixed Income Investment"
                description="Secure your future with stable returns through fixed income investments."
            />
        </div>
    );
};

export default FixedIncome; 