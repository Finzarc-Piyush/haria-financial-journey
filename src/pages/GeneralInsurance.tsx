import { useEffect, useState, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
    Car,
    Home,
    Heart,
    Plane,
    Shield,
    CheckCircle,
    Star,
    ArrowRight,
    Users,
    Building,
    Flame,
    Globe,
    MapPin,
    Clock,
    Award,
    TrendingUp
} from "lucide-react";
import { motion } from 'framer-motion';

const GeneralInsurance = () => {
    const [heroInView, setHeroInView] = useState(true);
    const [selectedService, setSelectedService] = useState("car");
    const [animatedText, setAnimatedText] = useState("");
    const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
    const [hoveredCard, setHoveredCard] = useState<string | null>(null);
    const [activeTabRect, setActiveTabRect] = useState({ left: 0, width: 0 });
    const tabsListRef = useRef<HTMLDivElement>(null);
    const tabRefs = useRef<Record<string, HTMLButtonElement | null>>({});

    const fullText = "Complete Protection for Your Assets";

    const services = [
        {
            id: "car",
            title: "Car Insurance",
            icon: Car,
            description: "Comprehensive protection for your vehicle",
            color: "from-blue-500 to-cyan-500",
            subCategories: [
                {
                    name: "Comprehensive",
                    description: "Complete coverage including own damage",
                    badge: "99% claims settled",
                    icon: Shield
                },
                {
                    name: "Third Party",
                    description: "Legal compliance coverage",
                    badge: "Mandatory",
                    icon: CheckCircle
                },
                {
                    name: "Zero Depreciation",
                    description: "New car value guarantee",
                    badge: "Premium",
                    icon: Star
                }
            ]
        },
        {
            id: "property",
            title: "Property Insurance",
            icon: Home,
            description: "Protect your home and commercial properties",
            color: "from-green-500 to-emerald-500",
            subCategories: [
                {
                    name: "Home Insurance",
                    description: "Complete home protection",
                    badge: "Shield protection",
                    icon: Shield
                },
                {
                    name: "Commercial Property",
                    description: "Business property coverage",
                    badge: "Building blocks",
                    icon: Building
                },
                {
                    name: "Fire Insurance",
                    description: "Fire and allied perils",
                    badge: "Fire protection",
                    icon: Flame
                }
            ]
        },
        {
            id: "fire",
            title: "Fire Insurance",
            icon: Flame,
            description: "Fire damage protection for assets and property",
            color: "from-orange-500 to-red-500",
            subCategories: [
                {
                    name: "Fire & Allied Perils",
                    description: "Covers loss due to fire, lightning, explosion etc.",
                    badge: "Essential",
                    icon: Flame
                },
                {
                    name: "Electrical Fire",
                    description: "Protects from fire due to electrical faults",
                    badge: "Sensitive zones",
                    icon: Shield
                },
                {
                    name: "Natural Calamity Fire",
                    description: "Covers fire caused by natural calamities",
                    badge: "Disaster coverage",
                    icon: Globe
                }
            ]
        },
        {
            id: "travel",
            title: "Travel Insurance",
            icon: Plane,
            description: "Global travel protection and assistance",
            color: "from-purple-500 to-indigo-500",
            subCategories: [
                {
                    name: "Domestic Travel",
                    description: "In-country travel protection",
                    badge: "Local coverage",
                    icon: MapPin
                },
                {
                    name: "International Travel",
                    description: "Global travel coverage",
                    badge: "Worldwide",
                    icon: Globe
                },
                {
                    name: "Business Travel",
                    description: "Corporate travel protection",
                    badge: "Business",
                    icon: Building
                }
            ]
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

    // Animated text effect
    useEffect(() => {
        let index = 0;
        const timer = setInterval(() => {
            if (index <= fullText.length) {
                setAnimatedText(fullText.slice(0, index));
                index++;
            } else {
                clearInterval(timer);
            }
        }, 50);
        return () => clearInterval(timer);
    }, []);

    // Mouse tracking for magnetic effect
    useEffect(() => {
        const handleMouseMove = (e: MouseEvent) => {
            setMousePosition({ x: e.clientX, y: e.clientY });
        };
        window.addEventListener('mousemove', handleMouseMove);
        return () => window.removeEventListener('mousemove', handleMouseMove);
    }, []);

    // Update active tab indicator position on tab change or resize
    useEffect(() => {
        function updateIndicator() {
            const activeTab = tabRefs.current[selectedService];
            const list = tabsListRef.current;
            if (activeTab && list) {
                const tabRect = activeTab.getBoundingClientRect();
                const listRect = list.getBoundingClientRect();
                setActiveTabRect({ left: tabRect.left - listRect.left, width: tabRect.width });
            }
        }
        updateIndicator();
        window.addEventListener('resize', updateIndicator);
        return () => window.removeEventListener('resize', updateIndicator);
    }, [selectedService]);

    const currentService = services.find(s => s.id === selectedService);

    return (
        <div className="min-h-screen bg-background">
            {/* Hero Section */}
            <section id="hero" className="relative min-h-screen flex items-center justify-center overflow-hidden">
                {/* Background Image */}
                <div
                    className="absolute inset-0 bg-cover bg-center"
                    style={{ backgroundImage: "url('/hero-general-insurance.webp')" }}
                />
                <div className="absolute inset-0 bg-black/40" />

                <div className="relative z-10 text-center text-white w-full max-w-3xl mx-auto py-12 md:py-24">
                    <motion.h1
                        className="text-3xl sm:text-5xl md:text-7xl font-playfair font-bold mb-6 overflow-hidden"
                        initial={{ opacity: 0, y: 40 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, amount: 0.3 }}
                        transition={{ duration: 0.6, ease: [0.42, 0, 0.58, 1] }}
                    >
                        <span className="inline-block animate-typewriter">
                            {animatedText}
                            <span className="animate-pulse">|</span>
                        </span>
                    </motion.h1>
                    <motion.p
                        className="text-base sm:text-lg md:text-2xl font-crimson mb-8 text-white/90"
                        initial={{ opacity: 0, y: 40 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, amount: 0.3 }}
                        transition={{ duration: 0.6, delay: 0.1, ease: [0.42, 0, 0.58, 1] }}
                    >
                        Comprehensive insurance solutions for all your assets and needs
                    </motion.p>
                    <motion.div
                        className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-4xl mx-auto mb-12"
                        initial="hidden"
                        whileInView="show"
                        viewport={{ once: true, amount: 0.3 }}
                        variants={{
                            hidden: {},
                            show: {
                                transition: {
                                    staggerChildren: 0.12,
                                    delayChildren: 0.1
                                }
                            }
                        }}
                    >
                        {services.map((service, index) => (
                            <motion.button
                                key={service.id}
                                onClick={() => setSelectedService(service.id)}
                                className={`group relative p-6 rounded-2xl transition-all duration-500 transform w-full ${selectedService === service.id
                                    ? 'bg-white/20 backdrop-blur-sm border-2 border-white/50'
                                    : 'bg-white/10 backdrop-blur-sm border-2 border-transparent hover:border-white/30'
                                    }`}
                                style={{
                                    transform: hoveredCard === service.id ? 'scale(1.05) translateY(-5px)' : 'scale(1)',
                                    transition: 'all 0.3s cubic-bezier(0.25, 0.46, 0.45, 0.94)'
                                }}
                                onMouseEnter={() => setHoveredCard(service.id)}
                                onMouseLeave={() => setHoveredCard(null)}
                                initial={{ opacity: 0, y: 40 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true, amount: 0.3 }}
                                transition={{ duration: 0.6, ease: [0.42, 0, 0.58, 1] }}
                                whileHover={{ scale: 1.05, transition: { duration: 0.01 } }}
                                whileTap={{ scale: 0.98, transition: { duration: 0.01 } }}
                            >
                                <div>
                                    <service.icon className="h-8 w-8 mx-auto mb-3 text-white group-hover:scale-110 transition-transform duration-300" />
                                </div>
                                <div>
                                    <div className="text-sm font-semibold text-white truncate" style={{ width: '8.5rem', display: 'inline-block' }}>{service.title}</div>
                                </div>
                            </motion.button>
                        ))}
                    </motion.div>
                    <Button
                        asChild
                        className="bg-accent hover:bg-accent/90 text-accent-foreground font-semibold px-8 py-4 text-lg hover:scale-105"
                    >
                        <motion.button
                            initial={{ opacity: 0, y: 40 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true, amount: 0.3 }}
                            transition={{ duration: 0.7, delay: 0.2 }}
                            whileHover={{ scale: 1.05, transition: { duration: 0.01 } }}
                            whileTap={{ scale: 0.98, transition: { duration: 0.01 } }}
                        >
                            Get Instant Quote
                            <ArrowRight className="ml-2 h-5 w-5" />
                        </motion.button>
                    </Button>
                </div>
            </section>

            {/* Service Details Section */}
            <section className="py-20 px-4 bg-gradient-premium">
                <div className="max-w-7xl mx-auto">
                    <div className="text-center mb-16">
                        <motion.h2
                            className="text-4xl md:text-5xl font-playfair font-bold text-foreground mb-4"
                            initial={{ opacity: 0, y: 40 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true, amount: 0.3 }}
                            transition={{ duration: 0.6, ease: [0.42, 0, 0.58, 1] }}
                        >
                            {currentService?.title}
                        </motion.h2>
                        <motion.p
                            className="text-xl font-crimson text-muted-foreground"
                            initial={{ opacity: 0, y: 40 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true, amount: 0.3 }}
                            transition={{ duration: 0.6, delay: 0.1, ease: [0.42, 0, 0.58, 1] }}
                        >
                            {currentService?.description}
                        </motion.p>
                    </div>

                    {/* Service Cards with Advanced Animations */}
                    <motion.div
                        className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16 items-stretch"
                        initial="hidden"
                        whileInView="show"
                        viewport={{ once: true, amount: 0.3 }}
                        variants={{
                            hidden: {},
                            show: {
                                transition: {
                                    staggerChildren: 0.12,
                                    delayChildren: 0.1
                                }
                            }
                        }}
                    >
                        {currentService?.subCategories.map((subCategory, index) => (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, y: 40 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true, amount: 0.3 }}
                                transition={{ duration: 0.6, ease: [0.42, 0, 0.58, 1] }}
                                className="h-full"
                            >
                                <Card
                                    key={index}
                                    className="group premium-card hover:scale-105 transition-all duration-500 cursor-pointer border-2 border-transparent hover:border-accent/50 overflow-hidden relative h-full"
                                    style={{
                                        animationDelay: `${index * 0.1}s`,
                                        transform: hoveredCard === `${currentService.id}-${index}` ? 'scale(1.05) rotateY(5deg)' : 'scale(1) rotateY(0deg)',
                                        transition: 'all 0.5s cubic-bezier(0.25, 0.46, 0.45, 0.94)'
                                    }}
                                    onMouseEnter={() => setHoveredCard(`${currentService.id}-${index}`)}
                                    onMouseLeave={() => setHoveredCard(null)}
                                >
                                    {/* Animated Background Gradient */}
                                    <div className={`absolute inset-0 bg-gradient-to-br ${currentService.color} opacity-0 group-hover:opacity-10 transition-opacity duration-500`} />

                                    <CardHeader className="relative z-10">
                                        <div className="flex items-center justify-between mb-4">
                                            <div className="relative">
                                                <subCategory.icon className="h-12 w-12 text-accent group-hover:scale-110 transition-transform duration-300" />
                                                {subCategory.badge === "99% claims settled" && (
                                                    <div className="absolute -top-2 -right-2 w-6 h-6 bg-green-500 rounded-full flex items-center justify-center">
                                                        <CheckCircle className="h-3 w-3 text-white" />
                                                    </div>
                                                )}
                                            </div>
                                            <Badge className="bg-accent/20 text-accent border-accent/30 animate-pulse">
                                                {subCategory.badge}
                                            </Badge>
                                        </div>
                                        <CardTitle className="text-2xl font-playfair text-foreground group-hover:text-accent transition-colors duration-300">
                                            {subCategory.name}
                                        </CardTitle>
                                    </CardHeader>

                                    <CardContent className="relative z-10">
                                        <p className="text-muted-foreground mb-6 font-crimson">
                                            {subCategory.description}
                                        </p>

                                        {/* Animated Progress Bar for Claims Settlement */}
                                        {subCategory.badge === "99% claims settled" && (
                                            <div className="mb-6">
                                                <div className="flex justify-between text-sm mb-2">
                                                    <span className="text-muted-foreground">Claims Settlement Rate</span>
                                                    <span className="font-semibold text-accent">99%</span>
                                                </div>
                                                <div className="w-full bg-muted rounded-full h-2">
                                                    <div
                                                        className="bg-gradient-to-r from-green-500 to-accent h-2 rounded-full transition-all duration-1000 ease-out"
                                                        style={{ width: '99%' }}
                                                    />
                                                </div>
                                            </div>
                                        )}

                                        <Button className="w-full bg-accent hover:bg-accent/90 text-accent-foreground">
                                            Get Quote
                                            <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                                        </Button>
                                    </CardContent>
                                </Card>
                            </motion.div>
                        ))}
                    </motion.div>

                    {/* Service-specific Features */}
                    <motion.div
                        className="bg-white/50 backdrop-blur-sm rounded-2xl p-8"
                        initial={{ opacity: 0, y: 40 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, amount: 0.3 }}
                        transition={{ duration: 0.6, ease: [0.42, 0, 0.58, 1] }}
                    >
                        <motion.h3
                            className="text-2xl font-playfair font-bold text-foreground mb-6 text-center"
                            initial={{ opacity: 0, y: 40 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true, amount: 0.3 }}
                            transition={{ duration: 0.6, ease: [0.42, 0, 0.58, 1] }}
                        >
                            Why Choose Our {currentService?.title}?
                        </motion.h3>
                        <motion.div
                            className="grid grid-cols-1 md:grid-cols-3 gap-6"
                            initial="hidden"
                            whileInView="show"
                            viewport={{ once: true, amount: 0.3 }}
                            variants={{
                                hidden: {},
                                show: {
                                    transition: {
                                        staggerChildren: 0.12,
                                        delayChildren: 0.1
                                    }
                                }
                            }}
                        >
                            {[0, 1, 2].map((i) => (
                                <motion.div
                                    key={i}
                                    initial={{ opacity: 0, y: 40 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true, amount: 0.3 }}
                                    transition={{ duration: 0.6, ease: [0.42, 0, 0.58, 1] }}
                                >
                                    <div className="text-center">
                                        <div className="inline-flex items-center justify-center w-16 h-16 bg-accent/20 rounded-full mb-4">
                                            <Shield className="h-8 w-8 text-accent" />
                                        </div>
                                        <h4 className="font-playfair font-semibold text-foreground mb-2">Comprehensive Coverage</h4>
                                        <p className="text-sm text-muted-foreground font-crimson">
                                            Complete protection with extensive coverage options
                                        </p>
                                    </div>
                                </motion.div>
                            ))}
                        </motion.div>
                    </motion.div>
                </div>
            </section>

            {/* All Services Overview */}
            <section className="py-20 px-4 bg-background">
                <div className="max-w-7xl mx-auto">
                    <div className="text-center mb-16">
                        <motion.h2
                            className="text-4xl md:text-5xl font-playfair font-bold text-foreground mb-4"
                            initial={{ opacity: 0, y: 40 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true, amount: 0.3 }}
                            transition={{ duration: 0.6, ease: [0.42, 0, 0.58, 1] }}
                        >
                            All Insurance Services
                        </motion.h2>
                        <motion.p
                            className="text-xl font-crimson text-muted-foreground"
                            initial={{ opacity: 0, y: 40 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true, amount: 0.3 }}
                            transition={{ duration: 0.6, delay: 0.1, ease: [0.42, 0, 0.58, 1] }}
                        >
                            Complete protection for every aspect of your life
                        </motion.p>
                    </div>

                    <Tabs value={selectedService} onValueChange={setSelectedService} className="w-full">
                        <TabsList ref={tabsListRef} className="grid w-full grid-cols-4 bg-muted/50 relative overflow-hidden">
                            {/* Sliding indicator */}
                            <motion.div
                                className="absolute top-0 left-0 h-full rounded-md bg-accent z-0 transition-colors"
                                animate={{ left: activeTabRect.left, width: activeTabRect.width }}
                                transition={{ type: 'tween', duration: 0.45, ease: [0.42, 0, 0.58, 1] }}
                                style={{ pointerEvents: 'none' }}
                            />
                            {services.map((service) => (
                                <TabsTrigger
                                    key={service.id}
                                    value={service.id}
                                    ref={el => (tabRefs.current[service.id] = el)}
                                    className="data-[state=active]:bg-transparent data-[state=active]:text-accent-foreground data-[state=active]:z-10 relative transition-colors"
                                >
                                    <service.icon className="h-4 w-4 mr-2" />
                                    <span className="md:hidden">{service.title.split(' ')[0]}</span>
                                    <span className="hidden md:inline">{service.title}</span>
                                </TabsTrigger>
                            ))}
                        </TabsList>

                        {services.map((service) => (
                            <TabsContent key={service.id} value={service.id} className="mt-8">
                                <motion.div
                                    className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
                                    initial="hidden"
                                    whileInView="show"
                                    viewport={{ once: true, amount: 0.3 }}
                                    variants={{
                                        hidden: {},
                                        show: {
                                            transition: {
                                                staggerChildren: 0.12,
                                                delayChildren: 0.1
                                            }
                                        }
                                    }}
                                >
                                    {service.subCategories.map((subCategory, index) => (
                                        <motion.div
                                            key={index}
                                            initial={{ opacity: 0, y: 40 }}
                                            whileInView={{ opacity: 1, y: 0 }}
                                            viewport={{ once: true, amount: 0.3 }}
                                            transition={{ duration: 0.6, ease: [0.42, 0, 0.58, 1] }}
                                        >
                                            <Card
                                                key={index}
                                                className="group premium-card hover:scale-105 transition-all duration-500 cursor-pointer"
                                            >
                                                <CardHeader>
                                                    <div className="flex items-center justify-between">
                                                        <subCategory.icon className="h-8 w-8 text-accent" />
                                                        <Badge variant="secondary">{subCategory.badge}</Badge>
                                                    </div>
                                                    <CardTitle className="text-lg font-playfair">{subCategory.name}</CardTitle>
                                                </CardHeader>
                                                <CardContent>
                                                    <p className="text-sm text-muted-foreground font-crimson mb-4">
                                                        {subCategory.description}
                                                    </p>
                                                    <Button size="sm" className="w-full bg-accent hover:bg-accent/90 text-accent-foreground">
                                                        Learn More
                                                        <ArrowRight className="ml-2 h-3 w-3" />
                                                    </Button>
                                                </CardContent>
                                            </Card>
                                        </motion.div>
                                    ))}
                                </motion.div>
                            </TabsContent>
                        ))}
                    </Tabs>
                </div>
            </section>

            {/* CTA Section */}
            <section className="py-20 px-4 bg-gradient-accent">
                <div className="max-w-4xl mx-auto text-center">
                    <motion.h2
                        className="text-4xl md:text-5xl font-playfair font-bold text-white mb-6"
                        initial={{ opacity: 0, y: 40 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, amount: 0.3 }}
                        transition={{ duration: 0.6, ease: [0.42, 0, 0.58, 1] }}
                    >
                        Get Protected Today
                    </motion.h2>
                    <motion.p
                        className="text-xl font-crimson text-white/80 mb-8"
                        initial={{ opacity: 0, y: 40 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, amount: 0.3 }}
                        transition={{ duration: 0.6, delay: 0.1, ease: [0.42, 0, 0.58, 1] }}
                    >
                        Choose the right insurance plan for your needs and get instant quotes
                    </motion.p>
                    <motion.div
                        className="flex flex-col sm:flex-row gap-4 justify-center"
                        initial="hidden"
                        whileInView="show"
                        viewport={{ once: true, amount: 0.3 }}
                        variants={{
                            hidden: {},
                            show: {
                                transition: {
                                    staggerChildren: 0.12,
                                    delayChildren: 0.1
                                }
                            }
                        }}
                    >
                        <motion.div
                            initial={{ opacity: 0, y: 40 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true, amount: 0.3 }}
                            transition={{ duration: 0.6, ease: [0.42, 0, 0.58, 1] }}
                        >
                            <Button size="lg" className="bg-white text-accent hover:bg-white/90 font-semibold px-8 py-4 text-lg">
                                Get Instant Quote
                            </Button>
                        </motion.div>
                        <motion.div
                            initial={{ opacity: 0, y: 40 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true, amount: 0.3 }}
                            transition={{ duration: 0.6, ease: [0.42, 0, 0.58, 1] }}
                        >
                            <Button size="lg" variant="outline" className="border-white text-white hover:bg-white hover:text-accent font-semibold px-8 py-4 text-lg">
                                Talk to Expert
                            </Button>
                        </motion.div>
                    </motion.div>
                </div>
            </section>
        </div>
    );
};

export default GeneralInsurance; 