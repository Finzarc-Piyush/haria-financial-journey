import { useEffect, useState, useRef } from "react";
import Navigation from "@/components/Navigation";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Progress } from "@/components/ui/progress";
import {
    TrendingUp,
    TrendingDown,
    Search,
    ArrowRight,
    Star,
    Award,
    Users,
    Target,
    BarChart3,
    PieChart,
    DollarSign,
    Percent,
    Calendar,
    Zap,
    Shield,
    Globe,
    Building,
    Car,
    Heart,
    Plane
} from "lucide-react";
import { motion } from 'framer-motion';
import AOS from 'aos';
import 'aos/dist/aos.css';
import ContactPopup from '@/components/ui/ContactPopup';
import { useContactPopup } from '@/hooks/useContactPopup';

const EquityInvestment = () => {
    const [heroInView, setHeroInView] = useState(true);
    const [stockTicker, setStockTicker] = useState(0);
    const [searchQuery, setSearchQuery] = useState("");
    const { isOpen, openPopup, closePopup } = useContactPopup();
    const [selectedStrategy, setSelectedStrategy] = useState<string | null>(null);
    const [marketMood, setMarketMood] = useState("bullish");
    const [portfolioValue, setPortfolioValue] = useState(1000000);
    const [portfolioGain, setPortfolioGain] = useState(125000);

    // Mock stock data for ticker
    const stocks = [
        { symbol: "RELIANCE", price: 2456.78, change: +2.34 },
        { symbol: "TCS", price: 3890.45, change: -1.23 },
        { symbol: "HDFC", price: 1678.90, change: +0.89 },
        { symbol: "INFY", price: 1456.23, change: +1.67 },
        { symbol: "ITC", price: 456.78, change: -0.45 }
    ];

    const investmentStrategies = [
        {
            id: "value",
            title: "Value Investing",
            description: "Invest in undervalued stocks with strong fundamentals",
            icon: Target,
            successRate: 85,
            risk: "Moderate",
            returns: "12-18%",
            features: ["Fundamental analysis", "Long-term focus", "Dividend income", "Risk management"]
        },
        {
            id: "growth",
            title: "Growth Investing",
            description: "Focus on companies with high growth potential",
            icon: TrendingUp,
            successRate: 78,
            risk: "High",
            returns: "15-25%",
            features: ["High growth potential", "Innovation focus", "Market leadership", "Scalability"]
        },
        {
            id: "dividend",
            title: "Dividend Investing",
            description: "Generate regular income through dividend-paying stocks",
            icon: DollarSign,
            successRate: 92,
            risk: "Low",
            returns: "8-12%",
            features: ["Regular income", "Stable companies", "Lower volatility", "Tax benefits"]
        },
        {
            id: "momentum",
            title: "Momentum Trading",
            description: "Trade based on price momentum and market trends",
            icon: Zap,
            successRate: 65,
            risk: "Very High",
            returns: "20-35%",
            features: ["Technical analysis", "Short-term focus", "High frequency", "Trend following"]
        }
    ];

    const advisors = [
        {
            name: "Rajesh Kumar",
            role: "Senior Equity Analyst",
            experience: "15+ years",
            successRate: 89,
            specialization: "Large Cap Stocks",
            image: "/src/assets/advisor-headshot.jpg"
        },
        {
            name: "Priya Sharma",
            role: "Portfolio Manager",
            experience: "12+ years",
            successRate: 92,
            specialization: "Growth Stocks",
            image: "/src/assets/advisor-headshot.jpg"
        },
        {
            name: "Amit Patel",
            role: "Technical Analyst",
            experience: "10+ years",
            successRate: 76,
            specialization: "Momentum Trading",
            image: "/src/assets/advisor-headshot.jpg"
        }
    ];

    const sectors = [
        { name: "Technology", weight: 25, color: "bg-blue-500" },
        { name: "Banking", weight: 20, color: "bg-green-500" },
        { name: "Healthcare", weight: 15, color: "bg-red-500" },
        { name: "Consumer Goods", weight: 12, color: "bg-yellow-500" },
        { name: "Energy", weight: 10, color: "bg-purple-500" },
        { name: "Others", weight: 18, color: "bg-gray-500" }
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

    // Stock ticker animation
    useEffect(() => {
        const timer = setInterval(() => {
            setStockTicker(prev => (prev + 1) % stocks.length);
        }, 3000);
        return () => clearInterval(timer);
    }, []);

    // Market mood animation
    useEffect(() => {
        const timer = setInterval(() => {
            setMarketMood(prev => prev === "bullish" ? "neutral" : prev === "neutral" ? "bearish" : "bullish");
        }, 5000);
        return () => clearInterval(timer);
    }, []);

    // Initialize AOS
    useEffect(() => {
        AOS.init({ duration: 600, once: true });
    }, []);

    const getMoodIcon = (mood: string) => {
        switch (mood) {
            case "bullish": return "📈";
            case "bearish": return "📉";
            default: return "➡️";
        }
    };

    const getMoodColor = (mood: string) => {
        switch (mood) {
            case "bullish": return "text-green-500";
            case "bearish": return "text-red-500";
            default: return "text-yellow-500";
        }
    };

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
                    style={{ backgroundImage: "url('/hero-equity-investments.webp')" }}
                />
                <div className="absolute inset-0 bg-black/40" />

                <div className="relative z-10 text-center text-white w-full max-w-3xl mx-auto py-12 md:py-24">
                    <motion.h1 variants={fadeSlideUp} initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.3 }} className="text-3xl sm:text-5xl md:text-7xl font-playfair font-bold mb-6">
                        <span className="inline-block mr-4">Build Wealth Through</span>
                        <span className="inline-block text-accent animate-pulse">Strategic</span>
                        <br />
                        <span className="inline-block text-accent">Equity Investment</span>
                    </motion.h1>

                    <motion.p variants={fadeSlideUp} initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.3 }} className="text-xl sm:text-2xl md:text-3xl font-crimson mb-8 text-white/90">
                        Expert guidance for direct stock investment and portfolio management
                    </motion.p>

                    {/* Live Stock Ticker */}
                    <motion.div variants={fadeSlideUp} initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.3 }} className="bg-white/10 backdrop-blur-sm rounded-lg p-4 mb-8 max-w-2xl mx-auto">
                        <div className="flex items-center justify-between text-lg">
                            <span className="text-white/80">Live Market</span>
                            <span className={`flex items-center ${getMoodColor(marketMood)}`}>
                                {getMoodIcon(marketMood)} {marketMood.toUpperCase()}
                            </span>
                        </div>
                        <div className="flex items-center justify-between mt-2">
                            <span className="font-semibold">{stocks[stockTicker].symbol}</span>
                            <span className="font-semibold">₹{stocks[stockTicker].price.toLocaleString()}</span>
                            <span className={`font-semibold ${stocks[stockTicker].change >= 0 ? 'text-green-400' : 'text-red-400'}`}>
                                {stocks[stockTicker].change >= 0 ? '+' : ''}{stocks[stockTicker].change}%
                            </span>
                        </div>
                    </motion.div>

                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                        <Button
                            size="lg"
                            className="bg-accent hover:bg-accent/90 text-accent-foreground font-semibold px-8 py-4 text-xl"
                            onClick={openPopup}
                        >
                            Start Investing
                            <ArrowRight className="ml-2 h-5 w-5" />
                        </Button>
                        <Button
                            size="lg"
                            variant="outline"
                            className="border-white text-white hover:bg-white hover:text-accent font-semibold px-8 py-4 text-xl"
                            onClick={openPopup}
                        >
                            Get Portfolio Review
                        </Button>
                    </div>
                </div>
            </section>

            {/* Direct Stock Investment Section */}
            <section id="direct-stock-investment" className="py-20 px-4 bg-gradient-premium">
                <div className="max-w-7xl mx-auto">
                    <motion.div variants={fadeSlideUp} initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.3 }} className="text-center mb-16">
                        <motion.h2 variants={fadeSlideUp} initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.3 }} className="text-4xl md:text-5xl font-playfair font-bold text-foreground mb-4">
                            Direct Stock Investment
                        </motion.h2>
                        <motion.p variants={fadeSlideUp} initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.3 }} className="text-2xl font-crimson text-muted-foreground">
                            Build your portfolio with carefully selected stocks
                        </motion.p>
                    </motion.div>

                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
                        {/* Stock Search */}
                        <Card className="premium-card">
                            <CardHeader>
                                <CardTitle className="text-2xl font-playfair flex items-center">
                                    <Search className="h-6 w-6 mr-2 text-accent" />
                                    Find Your Perfect Stock
                                </CardTitle>
                            </CardHeader>
                            <CardContent className="space-y-6">
                                <div>
                                    <Label className="text-lg font-semibold text-foreground">Search Stocks</Label>
                                    <div className="relative mt-2">
                                        <Input
                                            placeholder="Enter stock name or symbol..."
                                            value={searchQuery}
                                            onChange={(e) => setSearchQuery(e.target.value)}
                                            className="pl-10"
                                        />
                                        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                                    </div>
                                </div>

                                <div className="grid grid-cols-2 gap-4">
                                    <div className="text-center p-4 bg-muted/50 rounded-lg">
                                        <div className="text-2xl font-playfair font-bold text-foreground">5000+</div>
                                        <div className="text-lg text-muted-foreground">Stocks Available</div>
                                    </div>
                                    <div className="text-center p-4 bg-muted/50 rounded-lg">
                                        <div className="text-2xl font-playfair font-bold text-accent">₹0</div>
                                        <div className="text-lg text-muted-foreground">Brokerage Fee</div>
                                    </div>
                                </div>

                                <Button className="w-full bg-accent hover:bg-accent/90 text-accent-foreground">
                                    Explore Stocks
                                    <ArrowRight className="ml-2 h-4 w-4" />
                                </Button>
                            </CardContent>
                        </Card>

                        {/* Portfolio Diversification */}
                        <Card className="premium-card">
                            <CardHeader>
                                <CardTitle className="text-2xl font-playfair flex items-center">
                                    <PieChart className="h-6 w-6 mr-2 text-accent" />
                                    Portfolio Diversification
                                </CardTitle>
                            </CardHeader>
                            <CardContent>
                                <div className="space-y-4">
                                    {sectors.map((sector, index) => (
                                        <div key={sector.name} className="flex items-center justify-between">
                                            <div className="flex items-center">
                                                <div className={`w-4 h-4 rounded-full ${sector.color} mr-3`} />
                                                <span className="text-lg font-medium text-foreground">{sector.name}</span>
                                            </div>
                                            <div className="flex items-center space-x-2">
                                                <div className="w-24 bg-muted rounded-full h-2">
                                                    <div
                                                        className={`h-2 rounded-full ${sector.color.replace('bg-', 'bg-')}`}
                                                        style={{ width: `${sector.weight}%` }}
                                                    />
                                                </div>
                                                <span className="text-sm text-muted-foreground w-8">{sector.weight}%</span>
                                            </div>
                                        </div>
                                    ))}
                                </div>

                                <div className="mt-6 p-4 bg-accent/10 rounded-lg">
                                    <div className="flex justify-between items-center">
                                        <span className="text-sm text-muted-foreground">Portfolio Value</span>
                                        <span className="font-semibold text-foreground">₹{portfolioValue.toLocaleString()}</span>
                                    </div>
                                    <div className="flex justify-between items-center mt-2">
                                        <span className="text-sm text-muted-foreground">Total Gain</span>
                                        <span className="font-semibold text-green-600">+₹{portfolioGain.toLocaleString()}</span>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                    </div>
                </div>
            </section>

            {/* Portfolio Advisory Section */}
            <section id="expert-portfolio-advisory" className="py-20 px-4 bg-background">
                <div className="max-w-7xl mx-auto">
                    <motion.div variants={fadeSlideUp} initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.3 }} className="text-center mb-16">
                        <motion.h2 variants={fadeSlideUp} initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.3 }} className="text-4xl md:text-5xl font-playfair font-bold text-foreground mb-4">
                            Expert Portfolio Advisory
                        </motion.h2>
                        <motion.p variants={fadeSlideUp} initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.3 }} className="text-xl font-crimson text-muted-foreground">
                            Get personalized investment strategies from our expert advisors
                        </motion.p>
                    </motion.div>

                    {/* Investment Strategies */}
                    <motion.div variants={fadeSlideUp} initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.3 }} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
                        {investmentStrategies.map((strategy, index) => (
                            <Card
                                key={strategy.id}
                                className={`group premium-card hover:scale-105 transition-all duration-500 cursor-pointer border-2 border-transparent hover:border-accent/50 overflow-hidden ${selectedStrategy === strategy.id ? 'border-accent/50 bg-accent/5' : ''
                                    }`}
                                onClick={() => setSelectedStrategy(strategy.id)}
                                style={{
                                    animationDelay: `${index * 0.1}s`
                                }}
                            >
                                <CardHeader className="relative z-10">
                                    <div className="flex items-center justify-between mb-4">
                                        <strategy.icon className="h-12 w-12 text-accent group-hover:scale-110 transition-transform duration-300" />
                                        <Badge className={`${strategy.risk === 'Very High' ? 'bg-red-500/20 text-red-600' :
                                            strategy.risk === 'High' ? 'bg-orange-500/20 text-orange-600' :
                                                strategy.risk === 'Moderate' ? 'bg-yellow-500/20 text-yellow-600' :
                                                    'bg-green-500/20 text-green-600'
                                            }`}>
                                            {strategy.risk}
                                        </Badge>
                                    </div>
                                    <CardTitle className="text-xl font-playfair text-foreground group-hover:text-accent transition-colors duration-300">
                                        {strategy.title}
                                    </CardTitle>
                                </CardHeader>

                                <CardContent className="relative z-10">
                                    <p className="text-muted-foreground mb-4 font-crimson text-sm">
                                        {strategy.description}
                                    </p>

                                    <div className="mb-4">
                                        <div className="flex justify-between items-center mb-2">
                                            <span className="text-sm text-muted-foreground">Success Rate</span>
                                            <span className="font-semibold text-accent">{strategy.successRate}%</span>
                                        </div>
                                        <Progress value={strategy.successRate} className="h-2" />
                                    </div>

                                    <div className="mb-4">
                                        <div className="flex justify-between items-center">
                                            <span className="text-sm text-muted-foreground">Expected Returns</span>
                                            <span className="font-semibold text-green-600">{strategy.returns}</span>
                                        </div>
                                    </div>

                                    <div className="space-y-2 mb-6">
                                        {strategy.features.map((feature, idx) => (
                                            <div key={idx} className="flex items-center text-sm">
                                                <div className="w-1.5 h-1.5 bg-accent rounded-full mr-2 flex-shrink-0" />
                                                <span className="text-muted-foreground">{feature}</span>
                                            </div>
                                        ))}
                                    </div>

                                    <Button className="w-full bg-accent hover:bg-accent/90 text-accent-foreground">
                                        Learn More
                                        <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                                    </Button>
                                </CardContent>
                            </Card>
                        ))}
                    </motion.div>

                    {/* Expert Advisors */}
                    <motion.div variants={fadeSlideUp} initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.3 }} className="text-center mb-12">
                        <motion.h3 variants={fadeSlideUp} initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.3 }} className="text-3xl font-playfair font-bold text-foreground mb-4">
                            Meet Our Expert Advisors
                        </motion.h3>
                        <motion.p variants={fadeSlideUp} initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.3 }} className="text-lg font-crimson text-muted-foreground">
                            Get personalized guidance from industry experts
                        </motion.p>
                    </motion.div>

                    <motion.div variants={fadeSlideUp} initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.3 }} className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {advisors.map((advisor, index) => (
                            <Card
                                key={index}
                                className="group premium-card hover:scale-105 transition-all duration-500 cursor-pointer"
                                style={{
                                    animationDelay: `${index * 0.1}s`
                                }}
                            >
                                <CardHeader className="text-center">
                                    <div className="w-20 h-20 mx-auto mb-4 rounded-full bg-accent/20 flex items-center justify-center">
                                        <Users className="h-10 w-10 text-accent" />
                                    </div>
                                    <CardTitle className="text-xl font-playfair text-foreground">
                                        {advisor.name}
                                    </CardTitle>
                                    <p className="text-muted-foreground">{advisor.role}</p>
                                    <p className="text-sm text-accent font-semibold">{advisor.experience}</p>
                                </CardHeader>

                                <CardContent className="text-center">
                                    <div className="space-y-4">
                                        <div>
                                            <div className="flex justify-between items-center mb-2">
                                                <span className="text-sm text-muted-foreground">Success Rate</span>
                                                <span className="font-semibold text-accent">{advisor.successRate}%</span>
                                            </div>
                                            <Progress value={advisor.successRate} className="h-2" />
                                        </div>

                                        <div>
                                            <span className="text-sm text-muted-foreground">Specialization</span>
                                            <p className="font-semibold text-foreground">{advisor.specialization}</p>
                                        </div>
                                    </div>

                                    <Button className="w-full mt-6 bg-accent hover:bg-accent/90 text-accent-foreground">
                                        Book Consultation
                                        <ArrowRight className="ml-2 h-4 w-4" />
                                    </Button>
                                </CardContent>
                            </Card>
                        ))}
                    </motion.div>
                </div>
            </section>

            {/* Advanced Features Section */}
            <section className="py-20 px-4 bg-gradient-premium">
                <div className="max-w-7xl mx-auto">
                    <motion.div variants={fadeSlideUp} initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.3 }} className="text-center mb-16">
                        <motion.h2 variants={fadeSlideUp} initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.3 }} className="text-4xl md:text-5xl font-playfair font-bold text-foreground mb-4">
                            Advanced Trading Features
                        </motion.h2>
                        <motion.p variants={fadeSlideUp} initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.3 }} className="text-xl font-crimson text-muted-foreground">
                            Professional tools for serious investors
                        </motion.p>
                    </motion.div>

                    <motion.div variants={fadeSlideUp} initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.3 }} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        <Card className="premium-card">
                            <CardHeader>
                                <div className="flex items-center justify-between">
                                    <BarChart3 className="h-8 w-8 text-accent" />
                                    <Badge className="bg-accent/20 text-accent">Pro</Badge>
                                </div>
                                <CardTitle className="text-xl font-playfair">Technical Analysis</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <p className="text-muted-foreground mb-4">
                                    Advanced charting tools with 50+ technical indicators
                                </p>
                                <Button className="w-full bg-accent hover:bg-accent/90 text-accent-foreground">
                                    Explore Tools
                                </Button>
                            </CardContent>
                        </Card>

                        <Card className="premium-card">
                            <CardHeader>
                                <div className="flex items-center justify-between">
                                    <Target className="h-8 w-8 text-accent" />
                                    <Badge className="bg-accent/20 text-accent">New</Badge>
                                </div>
                                <CardTitle className="text-xl font-playfair">Risk Assessment</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <p className="text-muted-foreground mb-4">
                                    AI-powered risk analysis and portfolio stress testing
                                </p>
                                <Button className="w-full bg-accent hover:bg-accent/90 text-accent-foreground">
                                    Assess Risk
                                </Button>
                            </CardContent>
                        </Card>

                        <Card className="premium-card">
                            <CardHeader>
                                <div className="flex items-center justify-between">
                                    <Zap className="h-8 w-8 text-accent" />
                                    <Badge className="bg-accent/20 text-accent">Live</Badge>
                                </div>
                                <CardTitle className="text-xl font-playfair">Market Insights</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <p className="text-muted-foreground mb-4">
                                    Real-time market analysis and expert recommendations
                                </p>
                                <Button className="w-full bg-accent hover:bg-accent/90 text-accent-foreground">
                                    Get Insights
                                </Button>
                            </CardContent>
                        </Card>
                    </motion.div>
                </div>
            </section>

            {/* CTA Section */}
            <section className="py-20 px-4 bg-gradient-accent">
                <div className="max-w-4xl mx-auto text-center">
                    <motion.h2 variants={fadeSlideUp} initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.3 }} className="text-4xl md:text-5xl font-playfair font-bold text-white mb-6">
                        Start Your Equity Investment Journey
                    </motion.h2>
                    <motion.p variants={fadeSlideUp} initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.3 }} className="text-xl font-crimson text-white/80 mb-8">
                        Join thousands of successful investors building wealth through stocks
                    </motion.p>
                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                        <Button size="lg" asChild className="bg-white text-accent hover:bg-white/90 font-semibold px-8 py-4 text-lg">
                            <a href="https://mosl.co/OWxY3P3cRN" target="_blank" rel="noopener noreferrer">Open Demat Account</a>
                        </Button>
                        <Button size="lg" asChild variant="outline" className="border-white text-white hover:bg-white hover:text-accent font-semibold px-8 py-4 text-lg">
                            <a href="https://invest.motilaloswal.com/" target="_blank" rel="noopener noreferrer">Motilal Oswal Client Login</a>
                        </Button>
                        <Button size="lg" asChild variant="outline" className="border-white text-white hover:bg-white hover:text-accent font-semibold px-8 py-4 text-lg">
                            <a href="https://users.madosx.co.in/pages/auth/login" target="_blank" rel="noopener noreferrer">Mutual Fund Client Login</a>
                        </Button>
                    </div>
                </div>
            </section>

            {/* Contact Popup */}
            <ContactPopup
                isOpen={isOpen}
                onClose={closePopup}
                title="Start Your Equity Investment Journey"
                description="Get expert guidance on stock selection and portfolio management strategies."
            />
        </div>
    );
};

export default EquityInvestment; 