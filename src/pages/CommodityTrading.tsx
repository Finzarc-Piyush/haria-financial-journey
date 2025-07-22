import { useEffect, useState, useRef } from "react";
import Navigation from "@/components/Navigation";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Label } from "@/components/ui/label";
import {
    TrendingUp,
    TrendingDown,
    Shield,
    ArrowRight,
    Star,
    Award,
    BarChart3,
    Zap,
    DollarSign,
    Percent,
    Calendar,
    Clock,
    Target,
    Users,
    Building,
    Car,
    Heart,
    Plane,
    Globe,
    Activity,
    AlertTriangle,
    CheckCircle,
    XCircle
} from "lucide-react";

const CommodityTrading = () => {
    const [heroInView, setHeroInView] = useState(true);
    const [commodityTicker, setCommodityTicker] = useState(0);
    const [selectedTab, setSelectedTab] = useState("futures");
    const [pnlValue, setPnlValue] = useState(12500);
    const [riskLevel, setRiskLevel] = useState(65);
    const [volatilityIndex, setVolatilityIndex] = useState(28);

    // Mock commodity data for ticker
    const commodities = [
        { name: "Gold", price: 62450, change: +1.2, unit: "per 10g" },
        { name: "Silver", price: 78900, change: -0.8, unit: "per kg" },
        { name: "Crude Oil", price: 6789, change: +2.1, unit: "per barrel" },
        { name: "Copper", price: 845, change: +0.5, unit: "per kg" },
        { name: "Natural Gas", price: 234, change: -1.5, unit: "per MMBtu" }
    ];

    const tradingProducts = [
        {
            id: "futures",
            title: "Futures Trading",
            description: "Trade standardized contracts with leverage",
            icon: Calendar,
            color: "from-blue-500 to-cyan-500",
            features: ["High leverage", "Standardized contracts", "Liquidity", "Hedging"],
            examples: ["Gold Futures", "Crude Oil Futures", "Agricultural Futures"]
        },
        {
            id: "options",
            title: "Options Trading",
            description: "Advanced derivatives with limited risk",
            icon: Target,
            color: "from-purple-500 to-indigo-500",
            features: ["Limited risk", "Unlimited profit", "Flexibility", "Strategies"],
            examples: ["Call Options", "Put Options", "Straddle", "Strangle"]
        },
        {
            id: "commodities",
            title: "Commodity Trading",
            description: "Direct trading in physical commodities",
            icon: Globe,
            color: "from-green-500 to-emerald-500",
            features: ["Physical delivery", "Spot trading", "Diversification", "Inflation hedge"],
            examples: ["Gold", "Silver", "Crude Oil", "Agricultural"]
        }
    ];

    const tradingStrategies = [
        {
            name: "Trend Following",
            description: "Follow market momentum and trends",
            successRate: 75,
            risk: "Moderate",
            returns: "15-25%",
            icon: TrendingUp
        },
        {
            name: "Mean Reversion",
            description: "Trade against extreme price movements",
            successRate: 68,
            risk: "High",
            returns: "20-30%",
            icon: TrendingDown
        },
        {
            name: "Arbitrage",
            description: "Profit from price differences",
            successRate: 85,
            risk: "Low",
            returns: "8-12%",
            icon: Zap
        },
        {
            name: "Hedging",
            description: "Protect against price fluctuations",
            successRate: 92,
            risk: "Very Low",
            returns: "5-8%",
            icon: Shield
        }
    ];

    const riskManagement = [
        {
            title: "Position Sizing",
            description: "Never risk more than 2% of capital per trade",
            icon: Target,
            status: "active"
        },
        {
            title: "Stop Loss",
            description: "Automatic exit at predetermined loss levels",
            icon: AlertTriangle,
            status: "active"
        },
        {
            title: "Diversification",
            description: "Spread risk across multiple commodities",
            icon: Globe,
            status: "active"
        },
        {
            title: "Leverage Control",
            description: "Maintain conservative leverage ratios",
            icon: Shield,
            status: "warning"
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

    // Commodity ticker animation
    useEffect(() => {
        const timer = setInterval(() => {
            setCommodityTicker(prev => (prev + 1) % commodities.length);
        }, 4000);
        return () => clearInterval(timer);
    }, []);

    // P&L animation
    useEffect(() => {
        const timer = setInterval(() => {
            setPnlValue(prev => prev + (Math.random() > 0.5 ? 100 : -100));
        }, 3000);
        return () => clearInterval(timer);
    }, []);

    // Volatility animation
    useEffect(() => {
        const timer = setInterval(() => {
            setVolatilityIndex(prev => Math.max(20, Math.min(40, prev + (Math.random() > 0.5 ? 1 : -1))));
        }, 2000);
        return () => clearInterval(timer);
    }, []);

    const getRiskColor = (level: number) => {
        if (level <= 30) return "text-green-500";
        if (level <= 60) return "text-yellow-500";
        return "text-red-500";
    };

    const getVolatilityColor = (level: number) => {
        if (level <= 25) return "text-green-500";
        if (level <= 35) return "text-yellow-500";
        return "text-red-500";
    };

    return (
        <div className="min-h-screen bg-background">
            <Navigation isTransparent={heroInView} />

            {/* Hero Section */}
            <section id="hero" className="relative min-h-screen flex items-center justify-center overflow-hidden">
                {/* Trading Floor Background */}
                <div className="absolute inset-0 bg-gradient-to-br from-primary via-secondary to-tertiary">
                    <div className="absolute inset-0 opacity-20">
                        {/* Trading Floor Atmosphere */}
                        <div className="absolute top-10 left-10 w-32 h-32 border-2 border-white/20 rounded-full animate-pulse" />
                        <div className="absolute top-40 right-20 w-24 h-24 border-2 border-white/20 rounded-lg animate-pulse" style={{ animationDelay: '1s' }} />
                        <div className="absolute bottom-20 left-1/4 w-40 h-40 border-2 border-white/20 rounded-full animate-pulse" style={{ animationDelay: '2s' }} />
                        <div className="absolute bottom-40 right-1/3 w-16 h-16 border-2 border-white/20 rounded-lg animate-pulse" style={{ animationDelay: '0.5s' }} />
                    </div>
                </div>

                <div className="relative z-10 text-center text-white px-4 max-w-6xl mx-auto">
                    <h1 className="text-5xl md:text-7xl font-playfair font-bold mb-6">
                        <span className="inline-block mr-4">Trade Smart,</span>
                        <br />
                        <span className="inline-block text-accent animate-pulse">Trade Secure</span>
                    </h1>

                    <p className="text-xl md:text-2xl font-crimson mb-8 text-white/90">
                        Professional commodity and derivative trading platform
                    </p>

                    {/* Live Commodity Ticker */}
                    <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6 mb-8 max-w-3xl mx-auto">
                        <div className="flex items-center justify-between text-sm mb-4">
                            <span className="text-white/80">Live Commodity Prices</span>
                            <div className="flex items-center space-x-4">
                                <span className="flex items-center text-green-400">
                                    <Activity className="h-4 w-4 mr-1" />
                                    LIVE
                                </span>
                                <span className={`flex items-center ${getVolatilityColor(volatilityIndex)}`}>
                                    VIX: {volatilityIndex}
                                </span>
                            </div>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                            {commodities.slice(commodityTicker, commodityTicker + 3).map((commodity, index) => (
                                <div key={index} className="flex items-center justify-between p-3 bg-white/5 rounded-lg">
                                    <div>
                                        <div className="font-semibold">{commodity.name}</div>
                                        <div className="text-sm text-white/70">{commodity.unit}</div>
                                    </div>
                                    <div className="text-right">
                                        <div className="font-semibold">₹{commodity.price.toLocaleString()}</div>
                                        <div className={`text-sm ${commodity.change >= 0 ? 'text-green-400' : 'text-red-400'}`}>
                                            {commodity.change >= 0 ? '+' : ''}{commodity.change}%
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                        <Button
                            size="lg"
                            className="bg-accent hover:bg-accent/90 text-accent-foreground font-semibold px-8 py-4 text-lg"
                        >
                            Start Trading
                            <ArrowRight className="ml-2 h-5 w-5" />
                        </Button>
                        <Button
                            size="lg"
                            variant="outline"
                            className="border-white text-white hover:bg-white hover:text-accent font-semibold px-8 py-4 text-lg"
                        >
                            Demo Account
                        </Button>
                    </div>
                </div>
            </section>

            {/* Trading Products Section */}
            <section className="py-20 px-4 bg-gradient-premium">
                <div className="max-w-7xl mx-auto">
                    <div className="text-center mb-16">
                        <h2 className="text-4xl md:text-5xl font-playfair font-bold text-foreground mb-4">
                            Trading Products
                        </h2>
                        <p className="text-xl font-crimson text-muted-foreground">
                            Choose from our comprehensive range of trading instruments
                        </p>
                    </div>

                    <Tabs value={selectedTab} onValueChange={setSelectedTab} className="w-full">
                        <TabsList className="grid w-full grid-cols-3 bg-muted/50">
                            {tradingProducts.map((product) => (
                                <TabsTrigger
                                    key={product.id}
                                    value={product.id}
                                    className="data-[state=active]:bg-accent data-[state=active]:text-accent-foreground"
                                >
                                    <product.icon className="h-4 w-4 mr-2" />
                                    {product.title}
                                </TabsTrigger>
                            ))}
                        </TabsList>

                        {tradingProducts.map((product) => (
                            <TabsContent key={product.id} value={product.id} className="mt-8">
                                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
                                    <div>
                                        <h3 className="text-3xl font-playfair font-bold text-foreground mb-6">
                                            {product.title}
                                        </h3>
                                        <p className="text-lg font-crimson text-muted-foreground mb-8">
                                            {product.description}
                                        </p>

                                        <div className="space-y-4 mb-8">
                                            {product.features.map((feature, index) => (
                                                <div key={index} className="flex items-center">
                                                    <CheckCircle className="h-5 w-5 text-accent mr-3 flex-shrink-0" />
                                                    <span className="text-foreground">{feature}</span>
                                                </div>
                                            ))}
                                        </div>

                                        <div className="space-y-3">
                                            <h4 className="font-semibold text-foreground">Popular Examples:</h4>
                                            <div className="flex flex-wrap gap-2">
                                                {product.examples.map((example, index) => (
                                                    <Badge key={index} variant="secondary" className="bg-accent/20 text-accent border-accent/30">
                                                        {example}
                                                    </Badge>
                                                ))}
                                            </div>
                                        </div>
                                    </div>

                                    <Card className="premium-card">
                                        <CardHeader>
                                            <CardTitle className="text-2xl font-playfair flex items-center">
                                                <product.icon className="h-6 w-6 mr-2 text-accent" />
                                                {product.title} Calculator
                                            </CardTitle>
                                        </CardHeader>
                                        <CardContent className="space-y-6">
                                            <div className="grid grid-cols-2 gap-4">
                                                <div className="text-center p-4 bg-muted/50 rounded-lg">
                                                    <div className="text-2xl font-playfair font-bold text-foreground">₹0</div>
                                                    <div className="text-sm text-muted-foreground">Brokerage</div>
                                                </div>
                                                <div className="text-center p-4 bg-muted/50 rounded-lg">
                                                    <div className="text-2xl font-playfair font-bold text-accent">24/7</div>
                                                    <div className="text-sm text-muted-foreground">Trading</div>
                                                </div>
                                            </div>

                                            <div className="space-y-4">
                                                <div>
                                                    <Label className="text-sm font-semibold text-foreground">Margin Required</Label>
                                                    <div className="text-lg font-semibold text-accent mt-1">5-20%</div>
                                                </div>
                                                <div>
                                                    <Label className="text-sm font-semibold text-foreground">Settlement</Label>
                                                    <div className="text-lg font-semibold text-foreground mt-1">T+1</div>
                                                </div>
                                            </div>

                                            <Button className="w-full bg-accent hover:bg-accent/90 text-accent-foreground">
                                                Start Trading {product.title}
                                                <ArrowRight className="ml-2 h-4 w-4" />
                                            </Button>
                                        </CardContent>
                                    </Card>
                                </div>
                            </TabsContent>
                        ))}
                    </Tabs>
                </div>
            </section>

            {/* Trading Strategies Section */}
            <section className="py-20 px-4 bg-background">
                <div className="max-w-7xl mx-auto">
                    <div className="text-center mb-16">
                        <h2 className="text-4xl md:text-5xl font-playfair font-bold text-foreground mb-4">
                            Trading Strategies
                        </h2>
                        <p className="text-xl font-crimson text-muted-foreground">
                            Proven strategies for successful commodity trading
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                        {tradingStrategies.map((strategy, index) => (
                            <Card
                                key={index}
                                className="group premium-card hover:scale-105 transition-all duration-500 cursor-pointer"
                                style={{
                                    animationDelay: `${index * 0.1}s`
                                }}
                            >
                                <CardHeader>
                                    <div className="flex items-center justify-between mb-4">
                                        <strategy.icon className="h-12 w-12 text-accent group-hover:scale-110 transition-transform duration-300" />
                                        <Badge className={`${strategy.risk === 'Very Low' ? 'bg-green-500/20 text-green-600' :
                                            strategy.risk === 'Low' ? 'bg-blue-500/20 text-blue-600' :
                                                strategy.risk === 'Moderate' ? 'bg-yellow-500/20 text-yellow-600' :
                                                    strategy.risk === 'High' ? 'bg-orange-500/20 text-orange-600' :
                                                        'bg-red-500/20 text-red-600'
                                            }`}>
                                            {strategy.risk}
                                        </Badge>
                                    </div>
                                    <CardTitle className="text-xl font-playfair text-foreground group-hover:text-accent transition-colors duration-300">
                                        {strategy.name}
                                    </CardTitle>
                                </CardHeader>

                                <CardContent>
                                    <p className="text-muted-foreground mb-4 font-crimson text-sm">
                                        {strategy.description}
                                    </p>

                                    <div className="space-y-3 mb-6">
                                        <div className="flex justify-between items-center">
                                            <span className="text-sm text-muted-foreground">Success Rate</span>
                                            <span className="font-semibold text-accent">{strategy.successRate}%</span>
                                        </div>
                                        <Progress value={strategy.successRate} className="h-2" />

                                        <div className="flex justify-between items-center">
                                            <span className="text-sm text-muted-foreground">Expected Returns</span>
                                            <span className="font-semibold text-green-600">{strategy.returns}</span>
                                        </div>
                                    </div>

                                    <Button className="w-full bg-accent hover:bg-accent/90 text-accent-foreground group-hover:scale-105 transition-all duration-300">
                                        Learn Strategy
                                        <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                                    </Button>
                                </CardContent>
                            </Card>
                        ))}
                    </div>
                </div>
            </section>

            {/* Advanced Trading Features */}
            <section className="py-20 px-4 bg-gradient-premium">
                <div className="max-w-7xl mx-auto">
                    <div className="text-center mb-16">
                        <h2 className="text-4xl md:text-5xl font-playfair font-bold text-foreground mb-4">
                            Advanced Trading Features
                        </h2>
                        <p className="text-xl font-crimson text-muted-foreground">
                            Professional tools for serious traders
                        </p>
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
                        {/* Real-time P&L Calculator */}
                        <Card className="premium-card">
                            <CardHeader>
                                <CardTitle className="text-2xl font-playfair flex items-center">
                                    <BarChart3 className="h-6 w-6 mr-2 text-accent" />
                                    Real-time P&L Calculator
                                </CardTitle>
                            </CardHeader>
                            <CardContent>
                                <div className="space-y-6">
                                    <div className="text-center p-6 bg-gradient-to-br from-accent/10 to-transparent rounded-lg">
                                        <div className="text-3xl font-playfair font-bold text-accent mb-2">
                                            ₹{pnlValue.toLocaleString()}
                                        </div>
                                        <p className="text-muted-foreground">Current P&L</p>
                                    </div>

                                    <div className="grid grid-cols-2 gap-4">
                                        <div className="text-center p-4 bg-muted/50 rounded-lg">
                                            <div className="text-lg font-semibold text-foreground">₹50,000</div>
                                            <div className="text-sm text-muted-foreground">Initial Capital</div>
                                        </div>
                                        <div className="text-center p-4 bg-muted/50 rounded-lg">
                                            <div className="text-lg font-semibold text-green-600">+25%</div>
                                            <div className="text-sm text-muted-foreground">ROI</div>
                                        </div>
                                    </div>

                                    <div className="space-y-3">
                                        <div className="flex justify-between items-center">
                                            <span className="text-sm text-muted-foreground">Risk Level</span>
                                            <span className={`font-semibold ${getRiskColor(riskLevel)}`}>
                                                {riskLevel <= 30 ? 'Low' : riskLevel <= 60 ? 'Moderate' : 'High'}
                                            </span>
                                        </div>
                                        <Progress value={riskLevel} className="h-2" />
                                    </div>
                                </div>
                            </CardContent>
                        </Card>

                        {/* Risk Management */}
                        <Card className="premium-card">
                            <CardHeader>
                                <CardTitle className="text-2xl font-playfair flex items-center">
                                    <Shield className="h-6 w-6 mr-2 text-accent" />
                                    Risk Management
                                </CardTitle>
                            </CardHeader>
                            <CardContent>
                                <div className="space-y-4">
                                    {riskManagement.map((item, index) => (
                                        <div key={index} className="flex items-start space-x-3 p-3 bg-muted/30 rounded-lg">
                                            <div className={`w-8 h-8 rounded-full flex items-center justify-center ${item.status === 'active' ? 'bg-green-500/20' :
                                                item.status === 'warning' ? 'bg-yellow-500/20' : 'bg-red-500/20'
                                                }`}>
                                                {item.status === 'active' ? (
                                                    <CheckCircle className="h-4 w-4 text-green-600" />
                                                ) : item.status === 'warning' ? (
                                                    <AlertTriangle className="h-4 w-4 text-yellow-600" />
                                                ) : (
                                                    <XCircle className="h-4 w-4 text-red-600" />
                                                )}
                                            </div>
                                            <div className="flex-1">
                                                <div className="font-semibold text-foreground">{item.title}</div>
                                                <div className="text-sm text-muted-foreground">{item.description}</div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </CardContent>
                        </Card>
                    </div>
                </div>
            </section>

            {/* Market Insights */}
            <section className="py-20 px-4 bg-background">
                <div className="max-w-7xl mx-auto">
                    <div className="text-center mb-16">
                        <h2 className="text-4xl md:text-5xl font-playfair font-bold text-foreground mb-4">
                            Market Insights
                        </h2>
                        <p className="text-xl font-crimson text-muted-foreground">
                            Stay ahead with expert analysis and market updates
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        <Card className="premium-card">
                            <CardHeader>
                                <div className="flex items-center justify-between">
                                    <TrendingUp className="h-8 w-8 text-accent" />
                                    <Badge className="bg-accent/20 text-accent">Live</Badge>
                                </div>
                                <CardTitle className="text-xl font-playfair">Technical Analysis</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <p className="text-muted-foreground mb-4">
                                    Advanced charting with 50+ technical indicators
                                </p>
                                <Button className="w-full bg-accent hover:bg-accent/90 text-accent-foreground">
                                    View Charts
                                </Button>
                            </CardContent>
                        </Card>

                        <Card className="premium-card">
                            <CardHeader>
                                <div className="flex items-center justify-between">
                                    <Globe className="h-8 w-8 text-accent" />
                                    <Badge className="bg-accent/20 text-accent">Daily</Badge>
                                </div>
                                <CardTitle className="text-xl font-playfair">Market Reports</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <p className="text-muted-foreground mb-4">
                                    Daily market analysis and expert recommendations
                                </p>
                                <Button className="w-full bg-accent hover:bg-accent/90 text-accent-foreground">
                                    Read Reports
                                </Button>
                            </CardContent>
                        </Card>

                        <Card className="premium-card">
                            <CardHeader>
                                <div className="flex items-center justify-between">
                                    <Users className="h-8 w-8 text-accent" />
                                    <Badge className="bg-accent/20 text-accent">Expert</Badge>
                                </div>
                                <CardTitle className="text-xl font-playfair">Trading Signals</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <p className="text-muted-foreground mb-4">
                                    AI-powered trading signals and alerts
                                </p>
                                <Button className="w-full bg-accent hover:bg-accent/90 text-accent-foreground">
                                    Get Signals
                                </Button>
                            </CardContent>
                        </Card>
                    </div>
                </div>
            </section>

            {/* CTA Section */}
            <section className="py-20 px-4 bg-gradient-accent">
                <div className="max-w-4xl mx-auto text-center">
                    <h2 className="text-4xl md:text-5xl font-playfair font-bold text-white mb-6">
                        Start Your Trading Journey
                    </h2>
                    <p className="text-xl font-crimson text-white/80 mb-8">
                        Join thousands of successful traders in the commodity markets
                    </p>
                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                        <Button size="lg" asChild className="bg-white text-accent hover:bg-white/90 font-semibold px-8 py-4 text-lg">
                            <a href="https://mosl.co/OWxY3P3cRN" target="_blank" rel="noopener noreferrer">Open Trading Account</a>
                        </Button>
                        <Button size="lg" asChild variant="outline" className="border-white text-white hover:bg-white hover:text-accent font-semibold px-8 py-4 text-lg">
                            <a href="https://invest.motilaloswal.com/" target="_blank" rel="noopener noreferrer">Motilal Oswal Client Login</a>
                        </Button>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default CommodityTrading; 