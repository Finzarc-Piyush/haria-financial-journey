import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Progress } from "@/components/ui/progress";
import {
    TrendingUp,
    Search,
    ArrowRight,
    Users,
    Target,
    BarChart3,
    PieChart,
    DollarSign,
    Zap,
    CheckCircle,
} from "lucide-react";
import { motion } from 'framer-motion';
import ContactPopup from '@/components/ui/ContactPopup';
import { useContactPopup } from '@/hooks/useContactPopup';
import { useNavigate } from 'react-router-dom';
import CTASection from '@/components/CTASection';
import CircularCarousel from '@/components/ui/circular-carousel';

const EquityInvestment = () => {
    const [stockTicker, setStockTicker] = useState(0);
    const [searchQuery, setSearchQuery] = useState("");
    const { isOpen, openPopup, closePopup } = useContactPopup();
    const [marketMood, setMarketMood] = useState("bullish");
    const [portfolioValue] = useState(1000000);
    const [portfolioGain] = useState(125000);
    const navigate = useNavigate();

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
            rate: "Moderate Risk",
            tenure: "3-5 years",
            minAmount: "₹25,000",
            successRate: 85,
            returns: "12-18%",
            features: ["Fundamental analysis", "Long-term focus", "Dividend income", "Risk management"],
            image: "/Equity investment/Value-investing.jpg"
        },
        {
            id: "growth",
            title: "Growth Investing",
            description: "Focus on companies with high growth potential",
            icon: TrendingUp,
            rate: "High Risk",
            tenure: "5-10 years",
            minAmount: "₹50,000",
            successRate: 78,
            returns: "15-25%",
            features: ["High growth potential", "Innovation focus", "Market leadership", "Scalability"],
            image: "/Equity investment/Growth-investing.jpg"
        },
        {
            id: "dividend",
            title: "Dividend Investing",
            description: "Generate regular income through dividend-paying stocks",
            icon: DollarSign,
            rate: "Low Risk",
            tenure: "3+ years",
            minAmount: "₹20,000",
            successRate: 92,
            returns: "8-12%",
            features: ["Regular income", "Stable companies", "Lower volatility", "Tax benefits"],
            image: "/Equity investment/Dividend-investing.jpg"
        },
        {
            id: "momentum",
            title: "Momentum Trading",
            description: "Trade based on price momentum and market trends",
            icon: Zap,
            rate: "Very High Risk",
            tenure: "Short-term",
            minAmount: "₹1,00,000",
            successRate: 65,
            returns: "20-35%",
            features: ["Technical analysis", "Short-term focus", "High frequency", "Trend following"],
            image: "/Equity investment/Momentum-trading.jpg"
        }
    ];

    const advisors = [
        {
            name: "Rajesh Kumar",
            role: "Senior Equity Analyst",
            experience: "15+ years",
            successRate: 89,
            specialization: "Large Cap Stocks",
        },
        {
            name: "Priya Sharma",
            role: "Portfolio Manager",
            experience: "12+ years",
            successRate: 92,
            specialization: "Growth Stocks",
        },
        {
            name: "Amit Patel",
            role: "Technical Analyst",
            experience: "10+ years",
            successRate: 76,
            specialization: "Momentum Trading",
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

    // Handle hash-based scrolling
    useEffect(() => {
        const scrollToHash = () => {
            const hash = window.location.hash.replace('#', '');
            if (!hash) return;
            const el = document.getElementById(hash);
            if (el) {
                setTimeout(() => {
                el.scrollIntoView({ behavior: 'smooth', block: 'start' });
                }, 100);
            }
        };
        scrollToHash();
        window.addEventListener('hashchange', scrollToHash);
        return () => window.removeEventListener('hashchange', scrollToHash);
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

    const scrollToSection = (sectionId: string) => {
        const element = document.getElementById(sectionId);
        if (element) {
            element.scrollIntoView({ behavior: 'smooth' });
        }
    };

    return (
        <div className="min-h-screen bg-background">

            {/* Hero Section - Landing Page Style */}
            <section 
                id="hero"
                className="relative w-full overflow-hidden min-h-screen flex items-center"
            >
                <div className="w-full">
                    <div className="grid grid-cols-1 lg:grid-cols-2 min-h-screen">
                        {/* Left Side - Content */}
                        <div className="relative bg-tertiary px-4 sm:px-6 lg:px-12 py-20 lg:py-0 flex items-center overflow-hidden">
                            {/* Decorative Partial Logo */}
                            <div className="absolute bottom-0 right-0 w-64 h-64 opacity-5 pointer-events-none">
                                <img 
                                    src="/logo-wbg.png" 
                                    alt="" 
                                    className="w-full h-full object-contain transform translate-x-1/3 translate-y-1/3 scale-150"
                                    style={{ filter: 'brightness(0) invert(1)' }}
                                />
                            </div>

                            <div className="relative z-10 max-w-2xl mx-auto lg:mx-0">
                                {/* Label */}
                                <motion.div
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ duration: 0.6 }}
                                    className="mb-6"
                                >
                                    <span className="text-xs md:text-sm font-crimson text-white/70 uppercase tracking-wider">
                                        EQUITY INVESTMENT SERVICES
                                    </span>
                                </motion.div>

                                {/* Main Headline */}
                                <motion.h1 
                                    className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold font-playfair leading-tight text-white mb-6"
                                    initial={{ opacity: 0, y: 30 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ duration: 0.8, delay: 0.2 }}
                                >
                                    Build Wealth Through{' '}
                                    <span className="relative inline-block">
                                        <span className="relative z-10">Strategic Equity</span>
                                        <span className="absolute bottom-0 left-0 w-full h-3 bg-secondary/30 -z-0"></span>
                                    </span>
                    </motion.h1>

                                {/* Description */}
                                <motion.p 
                                    className="text-base md:text-lg font-crimson text-white/90 leading-relaxed mb-8"
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ duration: 0.8, delay: 0.4 }}
                                >
                                    Expert guidance for direct stock investment and portfolio management. Access 5000+ stocks with zero brokerage fees.
                    </motion.p>

                    {/* Live Stock Ticker */}
                                <motion.div
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ duration: 0.8, delay: 0.5 }}
                                    className="bg-white/10 backdrop-blur-sm rounded-lg p-4 mb-8"
                                >
                                    <div className="flex items-center justify-between text-sm mb-2">
                                        <span className="text-white/80 font-crimson">Live Market</span>
                                        <span className={`flex items-center font-crimson ${getMoodColor(marketMood)}`}>
                                {getMoodIcon(marketMood)} {marketMood.toUpperCase()}
                            </span>
                        </div>
                                    <div className="flex items-center justify-between">
                                        <span className="font-semibold text-white font-playfair">{stocks[stockTicker].symbol}</span>
                                        <span className="font-semibold text-white font-playfair">₹{stocks[stockTicker].price.toLocaleString()}</span>
                                        <span className={`font-semibold font-playfair ${stocks[stockTicker].change >= 0 ? 'text-green-400' : 'text-red-400'}`}>
                                {stocks[stockTicker].change >= 0 ? '+' : ''}{stocks[stockTicker].change}%
                            </span>
                        </div>
                    </motion.div>

                                {/* CTA Buttons */}
                                <motion.div 
                                    className="flex flex-col sm:flex-row gap-4"
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ duration: 0.8, delay: 0.6 }}
                                >
                                    <button 
                                        onClick={() => navigate('/contact')}
                                        className="bg-secondary hover:bg-secondary/90 text-white px-8 py-4 rounded-full font-semibold font-crimson transition-all shadow-lg hover:shadow-xl flex items-center justify-center gap-2"
                                    >
                                        <span>Start Investing</span>
                                        <ArrowRight className="w-4 h-4" />
                                    </button>
                                    <button 
                                        onClick={() => scrollToSection('direct-stock-investment')}
                                        className="border-2 border-white/30 hover:bg-white/10 text-white px-8 py-4 rounded-full font-semibold font-crimson transition-all backdrop-blur-sm flex items-center justify-center"
                                    >
                                        Explore Stocks
                                    </button>
                                </motion.div>

                                {/* Trust Badge */}
                                <motion.div
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    transition={{ duration: 0.8, delay: 0.8 }}
                                    className="mt-8 flex items-center gap-2 text-white/60 text-sm font-crimson"
                                >
                                    <div className="flex -space-x-2">
                                        <div className="w-8 h-8 rounded-full bg-secondary border-2 border-tertiary"></div>
                                        <div className="w-8 h-8 rounded-full bg-white/20 border-2 border-tertiary"></div>
                                        <div className="w-8 h-8 rounded-full bg-white/10 border-2 border-tertiary"></div>
                                    </div>
                                    <span>Trusted by families since 1957</span>
                                </motion.div>
                            </div>
                        </div>

                        {/* Right Side - Image */}
                        <div className="relative bg-gray-900 min-h-[400px] lg:min-h-screen overflow-hidden">
                            <img 
                                src="/Hero Section/equity-investment.png" 
                                alt="Equity Investment"
                                className="absolute inset-0 w-full h-full object-cover"
                            />
                            <div className="absolute bottom-0 right-0 w-96 h-96 bg-secondary opacity-20 rounded-full transform translate-x-1/2 translate-y-1/2 z-10"></div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Direct Stock Investment Section */}
            <section id="direct-stock-investment" className="py-16 bg-gradient-to-br from-secondary/10 to-secondary/5">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <motion.div
                        initial={{ opacity: 0, y: 40 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, amount: 0.2 }}
                        transition={{ duration: 0.8 }}
                        className="text-center mb-16"
                    >
                        <p className="text-sm font-crimson text-tertiary/60 uppercase tracking-wider mb-4">
                            DIRECT STOCK INVESTMENT
                        </p>
                        <h2 className="text-4xl md:text-5xl lg:text-6xl font-playfair font-bold text-tertiary mb-4">
                            Build Your Portfolio
                        </h2>
                        <p className="text-lg md:text-xl font-crimson text-tertiary/80 max-w-3xl mx-auto">
                            Invest in carefully selected stocks with expert guidance
                        </p>
                    </motion.div>

                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
                        {/* Stock Search */}
                        <Card>
                            <CardHeader>
                                <CardTitle className="text-2xl font-playfair flex items-center text-tertiary">
                                    <Search className="h-6 w-6 mr-2 text-secondary" />
                                    Find Your Perfect Stock
                                </CardTitle>
                            </CardHeader>
                            <CardContent className="space-y-6">
                                <div>
                                    <Label className="text-base font-crimson font-semibold text-tertiary">Search Stocks</Label>
                                    <div className="relative mt-2">
                                        <Input
                                            placeholder="Enter stock name or symbol..."
                                            value={searchQuery}
                                            onChange={(e) => setSearchQuery(e.target.value)}
                                            className="pl-10 font-crimson"
                                        />
                                        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-tertiary/60" />
                                    </div>
                                </div>

                                <div className="grid grid-cols-2 gap-4">
                                    <div className="text-center p-4 bg-secondary/10 rounded-lg">
                                        <div className="text-2xl font-playfair font-bold text-tertiary">5000+</div>
                                        <div className="text-sm text-tertiary/70 font-crimson">Stocks Available</div>
                                    </div>
                                    <div className="text-center p-4 bg-secondary/10 rounded-lg">
                                        <div className="text-2xl font-playfair font-bold text-secondary">₹0</div>
                                        <div className="text-sm text-tertiary/70 font-crimson">Brokerage Fee</div>
                                    </div>
                                </div>

                                <Button 
                                    className="w-full bg-secondary hover:bg-secondary/90 text-white font-crimson font-semibold" 
                                    onClick={() => navigate('/contact')}
                                >
                                    Explore Stocks
                                    <ArrowRight className="ml-2 h-4 w-4" />
                                </Button>
                            </CardContent>
                        </Card>

                        {/* Portfolio Diversification */}
                        <Card>
                            <CardHeader>
                                <CardTitle className="text-2xl font-playfair flex items-center text-tertiary">
                                    <PieChart className="h-6 w-6 mr-2 text-secondary" />
                                    Portfolio Diversification
                                </CardTitle>
                            </CardHeader>
                            <CardContent>
                                <div className="space-y-4">
                                    {sectors.map((sector) => (
                                        <div key={sector.name} className="flex items-center justify-between">
                                            <div className="flex items-center">
                                                <div className={`w-4 h-4 rounded-full ${sector.color} mr-3`} />
                                                <span className="text-sm font-crimson text-tertiary">{sector.name}</span>
                                            </div>
                                            <div className="flex items-center space-x-2">
                                                <div className="w-24 bg-gray-200 rounded-full h-2">
                                                    <div
                                                        className={`h-2 rounded-full ${sector.color}`}
                                                        style={{ width: `${sector.weight}%` }}
                                                    />
                                                </div>
                                                <span className="text-sm text-tertiary/70 font-crimson w-8">{sector.weight}%</span>
                                            </div>
                                        </div>
                                    ))}
                                </div>

                                <div className="mt-6 p-4 bg-secondary/10 rounded-lg">
                                    <div className="flex justify-between items-center">
                                        <span className="text-sm text-tertiary/70 font-crimson">Portfolio Value</span>
                                        <span className="font-semibold text-tertiary font-playfair">₹{portfolioValue.toLocaleString()}</span>
                                    </div>
                                    <div className="flex justify-between items-center mt-2">
                                        <span className="text-sm text-tertiary/70 font-crimson">Total Gain</span>
                                        <span className="font-semibold text-green-600 font-playfair">+₹{portfolioGain.toLocaleString()}</span>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                    </div>
                </div>
            </section>

            {/* Portfolio Advisory Section */}
            <section id="expert-portfolio-advisory" className="py-16 bg-[#FAFAFA]">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <motion.div
                        initial={{ opacity: 0, y: 40 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, amount: 0.2 }}
                        transition={{ duration: 0.8 }}
                        className="text-center mb-16"
                    >
                        <p className="text-sm font-crimson text-tertiary/60 uppercase tracking-wider mb-4">
                            EXPERT PORTFOLIO ADVISORY
                        </p>
                        <h2 className="text-4xl md:text-5xl lg:text-6xl font-playfair font-bold text-tertiary mb-4">
                            Investment Strategies
                        </h2>
                        <p className="text-lg md:text-xl font-crimson text-tertiary/80 max-w-3xl mx-auto">
                            Get personalized investment strategies from our expert advisors
                        </p>
                    </motion.div>

                    {/* Investment Strategies - Carousel */}
                    <div className="mb-16">
                        <CircularCarousel
                            products={investmentStrategies}
                            autoplay={true}
                            colors={{
                                title: "#1a5f7a",
                                description: "#6b7280",
                                content: "#4b5563",
                            }}
                            fontSizes={{
                                title: "28px",
                                description: "16px",
                                content: "16px",
                            }}
                            onInvestNow={() => navigate('/contact')}
                        />
                    </div>

                    {/* Expert Advisors */}
                    <div className="text-center mb-12">
                        <h3 className="text-3xl md:text-4xl font-playfair font-bold text-tertiary mb-4">
                            Meet Our Expert Advisors
                        </h3>
                        <p className="text-lg font-crimson text-tertiary/80">
                            Get personalized guidance from industry experts
                        </p>
                    </div>

                    <motion.div
                        initial="hidden"
                        whileInView="show"
                        viewport={{ once: true, amount: 0.2 }}
                        variants={{
                            hidden: {},
                            show: { transition: { staggerChildren: 0.1 }}
                        }}
                        className="grid grid-cols-1 md:grid-cols-3 gap-8"
                    >
                        {advisors.map((advisor, index) => (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, y: 40 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true, amount: 0.3 }}
                                transition={{ duration: 0.6, delay: index * 0.1 }}
                                className="flex flex-col items-center"
                            >
                                {/* Circular Icon */}
                                <div className="relative mb-6">
                                    <div className="w-48 h-48 rounded-full overflow-hidden shadow-lg border-4 border-white bg-secondary/20 flex items-center justify-center">
                                        <Users className="w-24 h-24 text-secondary" />
                                    </div>
                                </div>

                                {/* Content */}
                                <div className="text-center mb-6">
                                    <h4 className="text-xl md:text-2xl font-playfair font-bold text-tertiary mb-2">
                                        {advisor.name}
                                    </h4>
                                    <p className="text-base font-crimson text-tertiary/80 mb-1">
                                        {advisor.role}
                                    </p>
                                    <p className="text-sm text-secondary font-semibold font-playfair mb-3">
                                        {advisor.experience}
                                    </p>
                                    <div className="flex items-center justify-center gap-2 mb-2">
                                        <span className="text-sm text-tertiary/70 font-crimson">Success Rate:</span>
                                        <span className="font-semibold text-secondary font-playfair">{advisor.successRate}%</span>
                                    </div>
                                    <p className="text-sm text-tertiary/70 font-crimson">
                                        <span className="font-semibold">Specialization:</span> {advisor.specialization}
                                    </p>
                                </div>

                                {/* Book Consultation Button */}
                                <button
                                    onClick={() => navigate('/contact')}
                                    className="bg-secondary hover:bg-secondary/90 text-white px-6 py-3 rounded-full font-semibold font-crimson transition-all shadow-lg hover:shadow-xl flex items-center gap-2"
                                >
                                    <Users className="w-4 h-4" />
                                    <span>Book Consultation</span>
                                </button>
                            </motion.div>
                        ))}
                    </motion.div>
                </div>
            </section>

            {/* Advanced Features Section */}
            <section className="py-16 bg-gradient-to-br from-secondary/10 to-secondary/5">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <motion.div
                        initial={{ opacity: 0, y: 40 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, amount: 0.2 }}
                        transition={{ duration: 0.8 }}
                        className="text-center mb-16"
                    >
                        <p className="text-sm font-crimson text-tertiary/60 uppercase tracking-wider mb-4">
                            ADVANCED FEATURES
                        </p>
                        <h2 className="text-4xl md:text-5xl lg:text-6xl font-playfair font-bold text-tertiary mb-4">
                            Professional Trading Tools
                        </h2>
                        <p className="text-lg md:text-xl font-crimson text-tertiary/80 max-w-3xl mx-auto">
                            Advanced features for serious investors
                        </p>
                    </motion.div>

                    <motion.div
                        initial="hidden"
                        whileInView="show"
                        viewport={{ once: true, amount: 0.2 }}
                        variants={{
                            hidden: {},
                            show: { transition: { staggerChildren: 0.1 }}
                        }}
                        className="grid grid-cols-1 md:grid-cols-3 gap-8"
                    >
                        {[
                            { title: "Technical Analysis", desc: "Advanced charting tools with 50+ technical indicators", badge: "Pro", image: "/technical-analysis.jpg" },
                            { title: "Risk Assessment", desc: "AI-powered risk analysis and portfolio stress testing", badge: "New", image: "/risk-assessment.jpg" },
                            { title: "Market Insights", desc: "Real-time market analysis and expert recommendations", badge: "Live", image: "/market-insights.jpg" }
                        ].map((feature, index) => (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, y: 40 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true, amount: 0.3 }}
                                transition={{ duration: 0.6 }}
                                className="h-full"
                            >
                                <div className="relative h-full flex flex-col shadow-lg rounded-xl overflow-hidden transition-all duration-300 hover:shadow-2xl group min-h-[350px]">
                                    {/* Background Image */}
                                    <div className="absolute inset-0">
                                        <img 
                                            src={feature.image} 
                                            alt={feature.title}
                                            className="w-full h-full object-cover"
                                        />
                                        {/* Bluish Overlay */}
                                        <div className="absolute inset-0 bg-tertiary/80 group-hover:bg-tertiary/70 transition-all duration-300"></div>
                                    </div>
                                    
                                    {/* Content */}
                                    <div className="relative z-10 flex flex-col flex-grow p-6">
                                        <div className="flex justify-end mb-4">
                                            <Badge className="bg-secondary/90 text-white">{feature.badge}</Badge>
                                        </div>
                                        
                                        <div className="flex-grow flex flex-col justify-center">
                                            <h3 className="text-2xl font-playfair font-bold text-white mb-3">
                                                {feature.title}
                                            </h3>
                                            <p className="text-white/90 mb-6 font-crimson text-base leading-relaxed">
                                                {feature.desc}
                                            </p>
                                        </div>
                                        
                                        <button
                                            onClick={() => navigate('/contact')}
                                            className="bg-secondary hover:bg-secondary/90 text-white px-6 py-3 rounded-full font-semibold font-crimson transition-all shadow-lg hover:shadow-xl flex items-center justify-center gap-2"
                                        >
                                            Explore
                                            <ArrowRight className="w-4 h-4" />
                                        </button>
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                    </motion.div>
                </div>
            </section>

            {/* CTA Section */}
            <CTASection />

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
