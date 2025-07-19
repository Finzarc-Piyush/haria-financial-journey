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

const MutualFunds = () => {
    const [heroInView, setHeroInView] = useState(true);
    const [morphingText, setMorphingText] = useState("Grow");
    const [sipAmount, setSipAmount] = useState(5000);
    const [sipDuration, setSipDuration] = useState(10);
    const [expectedReturn, setExpectedReturn] = useState(12);
    const [totalInvestment, setTotalInvestment] = useState(0);
    const [totalValue, setTotalValue] = useState(0);
    const [totalGain, setTotalGain] = useState(0);
    const [riskLevel, setRiskLevel] = useState(3);
    const [selectedFund, setSelectedFund] = useState<string | null>(null);

    const morphingTexts = ["Grow", "Prosper", "Achieve"];
    const morphingIndex = Math.floor((Date.now() / 2000) % 3);

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

    // Risk meter color
    const getRiskColor = (level: number) => {
        if (level <= 2) return "text-green-500";
        if (level <= 3) return "text-yellow-500";
        return "text-red-500";
    };

    return (
        <div className="min-h-screen bg-background">
            <Navigation isTransparent={heroInView} />

            {/* Hero Section */}
            <section id="hero" className="relative min-h-screen flex items-center justify-center overflow-hidden">
                {/* Animated Growth Chart Background */}
                <div className="absolute inset-0 bg-gradient-to-br from-primary via-secondary to-tertiary">
                    <div className="absolute inset-0 opacity-20">
                        {/* Animated Chart Lines */}
                        <svg className="w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
                            <path
                                d="M0,80 Q20,60 40,50 T80,30 T100,20"
                                stroke="white"
                                strokeWidth="0.5"
                                fill="none"
                                className="animate-pulse"
                            />
                            <path
                                d="M0,85 Q25,65 50,45 T100,25"
                                stroke="white"
                                strokeWidth="0.3"
                                fill="none"
                                className="animate-pulse"
                                style={{ animationDelay: '1s' }}
                            />
                        </svg>
                    </div>
                </div>

                <div className="relative z-10 text-center text-white px-4 max-w-6xl mx-auto">
                    <h1 className="text-5xl md:text-7xl font-playfair font-bold mb-6">
                        <span className="inline-block mr-4">Grow</span>
                        <span className="inline-block mr-4 text-accent">→</span>
                        <span className="inline-block mr-4">Prosper</span>
                        <span className="inline-block mr-4 text-accent">→</span>
                        <span className="inline-block text-accent animate-pulse">
                            {morphingText}
                        </span>
                    </h1>

                    <p className="text-xl md:text-2xl font-crimson mb-8 text-white/90">
                        Build wealth through systematic investment in mutual funds
                    </p>

                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                        <Button
                            size="lg"
                            className="bg-accent hover:bg-accent/90 text-accent-foreground font-semibold px-8 py-4 text-lg"
                        >
                            Start SIP
                            <ArrowRight className="ml-2 h-5 w-5" />
                        </Button>
                        <Button
                            size="lg"
                            variant="outline"
                            className="border-white text-white hover:bg-white hover:text-accent font-semibold px-8 py-4 text-lg"
                        >
                            Explore Funds
                        </Button>
                    </div>
                </div>
            </section>

            {/* SIP Calculator Section */}
            <section className="py-20 px-4 bg-gradient-premium">
                <div className="max-w-6xl mx-auto">
                    <div className="text-center mb-16">
                        <h2 className="text-4xl md:text-5xl font-playfair font-bold text-foreground mb-4">
                            SIP Calculator
                        </h2>
                        <p className="text-xl font-crimson text-muted-foreground">
                            Plan your investments and see the power of compounding
                        </p>
                    </div>

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
                                    <Label className="text-sm font-semibold text-foreground">Monthly Investment (₹)</Label>
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
                                    <Label className="text-sm font-semibold text-foreground">Investment Duration (Years)</Label>
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
                                    <Label className="text-sm font-semibold text-foreground">Expected Return (%)</Label>
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
                                        <p className="text-sm text-muted-foreground">Total Investment</p>
                                    </CardContent>
                                </Card>

                                <Card className="premium-card">
                                    <CardContent className="p-4 text-center">
                                        <div className="text-xl font-playfair font-bold text-green-600 mb-1">
                                            ₹{totalGain.toLocaleString('en-IN', { maximumFractionDigits: 0 })}
                                        </div>
                                        <p className="text-sm text-muted-foreground">Total Gain</p>
                                    </CardContent>
                                </Card>
                            </div>

                            {/* Risk Meter */}
                            <Card className="premium-card">
                                <CardContent className="p-6">
                                    <div className="flex items-center justify-between mb-4">
                                        <Label className="text-sm font-semibold text-foreground">Risk Profile</Label>
                                        <span className={`text-sm font-semibold ${getRiskColor(riskLevel)}`}>
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
            <section className="py-20 px-4 bg-background">
                <div className="max-w-7xl mx-auto">
                    <div className="text-center mb-16">
                        <h2 className="text-4xl md:text-5xl font-playfair font-bold text-foreground mb-4">
                            Investment Categories
                        </h2>
                        <p className="text-xl font-crimson text-muted-foreground">
                            Choose the right fund type based on your goals and risk appetite
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                        {fundTypes.map((fund, index) => (
                            <Card
                                key={fund.id}
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

                                    <Button className="w-full bg-accent hover:bg-accent/90 text-accent-foreground group-hover:scale-105 transition-all duration-300">
                                        Explore Funds
                                        <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                                    </Button>
                                </CardContent>
                            </Card>
                        ))}
                    </div>
                </div>
            </section>

            {/* Top Performing Funds */}
            <section className="py-20 px-4 bg-gradient-premium">
                <div className="max-w-7xl mx-auto">
                    <div className="text-center mb-16">
                        <h2 className="text-4xl md:text-5xl font-playfair font-bold text-foreground mb-4">
                            Top Performing Funds
                        </h2>
                        <p className="text-xl font-crimson text-muted-foreground">
                            Our best-performing mutual fund schemes
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {topFunds.map((fund, index) => (
                            <Card
                                key={index}
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
                        ))}
                    </div>
                </div>
            </section>

            {/* CTA Section */}
            <section className="py-20 px-4 bg-gradient-accent">
                <div className="max-w-4xl mx-auto text-center">
                    <h2 className="text-4xl md:text-5xl font-playfair font-bold text-white mb-6">
                        Start Your Investment Journey Today
                    </h2>
                    <p className="text-xl font-crimson text-white/80 mb-8">
                        Begin with as little as ₹500 and watch your wealth grow
                    </p>
                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                        <Button size="lg" className="bg-white text-accent hover:bg-white/90 font-semibold px-8 py-4 text-lg">
                            Start SIP
                        </Button>
                        <Button size="lg" variant="outline" className="border-white text-white hover:bg-white hover:text-accent font-semibold px-8 py-4 text-lg">
                            Get Expert Advice
                        </Button>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default MutualFunds; 