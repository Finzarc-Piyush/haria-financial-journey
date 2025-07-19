import { useEffect, useState, useRef } from "react";
import Navigation from "@/components/Navigation";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { CheckCircle, Shield, TrendingUp, PiggyBank, Users, Star, Award, Clock, ArrowRight } from "lucide-react";

const LifeInsurance = () => {
    const [heroInView, setHeroInView] = useState(true);
    const [typewriterText, setTypewriterText] = useState("");
    const [subtitleVisible, setSubtitleVisible] = useState(false);
    const [counterValue, setCounterValue] = useState(0);
    const [currentStep, setCurrentStep] = useState(0);
    const [testimonialIndex, setTestimonialIndex] = useState(0);

    const fullText = "Secure Your Family's Future with Life Insurance";
    const targetCounter = 500;

    const testimonials = [
        {
            name: "Priya Sharma",
            role: "Software Engineer",
            text: "Haria helped me choose the perfect term insurance plan. The claims process was incredibly smooth.",
            rating: 5
        },
        {
            name: "Rajesh Kumar",
            role: "Business Owner",
            text: "The whole life policy has been a great investment for my family's future security.",
            rating: 5
        },
        {
            name: "Anita Patel",
            role: "Doctor",
            text: "Excellent service and comprehensive coverage. Highly recommend for family protection.",
            rating: 5
        }
    ];

    const products = [
        {
            title: "Term Insurance",
            description: "Pure protection, high coverage, low premium",
            icon: Shield,
            coverage: "₹1 Crore - ₹10 Crore",
            premium: "Starting ₹500/month",
            features: ["High coverage", "Low premium", "Flexible terms", "Easy claims"]
        },
        {
            title: "Whole Life Insurance",
            description: "Lifelong coverage with cash value building",
            icon: TrendingUp,
            coverage: "₹50 Lakhs - ₹5 Crore",
            premium: "Starting ₹2,000/month",
            features: ["Lifelong coverage", "Cash value", "Dividend options", "Premium flexibility"]
        },
        {
            title: "Endowment Plans",
            description: "Savings + insurance combination",
            icon: PiggyBank,
            coverage: "₹25 Lakhs - ₹2 Crore",
            premium: "Starting ₹1,500/month",
            features: ["Guaranteed returns", "Maturity benefit", "Death benefit", "Tax savings"]
        },
        {
            title: "ULIP Plans",
            description: "Market-linked returns with life cover",
            icon: TrendingUp,
            coverage: "₹10 Lakhs - ₹1 Crore",
            premium: "Starting ₹1,000/month",
            features: ["Market returns", "Life cover", "Fund switching", "Tax benefits"]
        }
    ];

    const processSteps = [
        {
            title: "Assessment",
            description: "We analyze your financial needs and family requirements",
            icon: Users
        },
        {
            title: "Recommendation",
            description: "Customized plan selection based on your profile",
            icon: Star
        },
        {
            title: "Application",
            description: "Smooth application process with expert guidance",
            icon: CheckCircle
        },
        {
            title: "Activation",
            description: "Quick policy activation and documentation",
            icon: Award
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

    // Typewriter effect
    useEffect(() => {
        let index = 0;
        const timer = setInterval(() => {
            if (index <= fullText.length) {
                setTypewriterText(fullText.slice(0, index));
                index++;
            } else {
                clearInterval(timer);
                setTimeout(() => setSubtitleVisible(true), 500);
            }
        }, 100);
        return () => clearInterval(timer);
    }, []);

    // Counter animation
    useEffect(() => {
        const timer = setInterval(() => {
            setCounterValue(prev => {
                if (prev < targetCounter) {
                    return prev + 10;
                }
                clearInterval(timer);
                return targetCounter;
            });
        }, 50);
        return () => clearInterval(timer);
    }, []);

    // Testimonial carousel
    useEffect(() => {
        const timer = setInterval(() => {
            setTestimonialIndex(prev => (prev + 1) % testimonials.length);
        }, 5000);
        return () => clearInterval(timer);
    }, []);

    // Process steps animation
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

        const steps = document.querySelectorAll('.process-step');
        steps.forEach(step => observer.observe(step));
        return () => observer.disconnect();
    }, []);

    return (
        <div className="min-h-screen bg-background">
            <Navigation isTransparent={heroInView} />

            {/* Hero Section */}
            <section id="hero" className="relative min-h-screen flex items-center justify-center overflow-hidden">
                {/* Background Image with Parallax */}
                <div
                    className="absolute inset-0 bg-cover bg-center bg-no-repeat"
                    style={{
                        backgroundImage: "url('/src/assets/family-portrait.jpg')",
                        transform: "translateZ(0)",
                        willChange: "transform"
                    }}
                />
                <div className="absolute inset-0 bg-gradient-to-r from-primary/90 to-secondary/80" />

                <div className="relative z-10 text-center text-white px-4 max-w-4xl mx-auto">
                    <h1 className="text-5xl md:text-7xl font-playfair font-bold mb-6 overflow-hidden">
                        <span className="inline-block animate-typewriter">
                            {typewriterText}
                            <span className="animate-pulse">|</span>
                        </span>
                    </h1>

                    <p className={`text-xl md:text-2xl font-crimson mb-8 transition-all duration-1000 ${subtitleVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
                        }`}>
                        Comprehensive protection plans tailored to your life stage
                    </p>

                    <Button
                        size="lg"
                        className="bg-accent hover:bg-accent/90 text-accent-foreground font-semibold px-8 py-4 text-lg animate-pulse hover:animate-none transition-all duration-300 hover:scale-105"
                    >
                        Get Free Consultation
                        <ArrowRight className="ml-2 h-5 w-5" />
                    </Button>
                </div>
            </section>

            {/* Product Cards Section */}
            <section className="py-20 px-4 bg-gradient-premium">
                <div className="max-w-7xl mx-auto">
                    <div className="text-center mb-16">
                        <h2 className="text-4xl md:text-5xl font-playfair font-bold text-foreground mb-4">
                            Choose Your Protection Plan
                        </h2>
                        <p className="text-xl font-crimson text-muted-foreground">
                            Tailored solutions for every life stage and financial goal
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                        {products.map((product, index) => (
                            <Card
                                key={index}
                                className="group premium-card hover:scale-105 transition-all duration-500 cursor-pointer border-2 border-transparent hover:border-accent/50 overflow-hidden"
                                style={{
                                    animationDelay: `${index * 0.1}s`
                                }}
                            >
                                <div className="absolute inset-0 bg-gradient-to-br from-accent/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                                <CardHeader className="relative z-10">
                                    <div className="flex items-center justify-between mb-4">
                                        <product.icon className="h-12 w-12 text-accent group-hover:scale-110 transition-transform duration-300" />
                                        <Badge className="bg-accent/20 text-accent border-accent/30">
                                            Popular
                                        </Badge>
                                    </div>
                                    <CardTitle className="text-2xl font-playfair text-foreground group-hover:text-accent transition-colors duration-300">
                                        {product.title}
                                    </CardTitle>
                                </CardHeader>

                                <CardContent className="relative z-10">
                                    <p className="text-muted-foreground mb-6 font-crimson">
                                        {product.description}
                                    </p>

                                    <div className="space-y-4">
                                        <div className="flex justify-between items-center">
                                            <span className="text-sm text-muted-foreground">Coverage</span>
                                            <span className="font-semibold text-foreground">{product.coverage}</span>
                                        </div>
                                        <div className="flex justify-between items-center">
                                            <span className="text-sm text-muted-foreground">Premium</span>
                                            <span className="font-semibold text-accent">{product.premium}</span>
                                        </div>
                                    </div>

                                    <div className="mt-6 space-y-2">
                                        {product.features.map((feature, idx) => (
                                            <div key={idx} className="flex items-center text-sm">
                                                <CheckCircle className="h-4 w-4 text-accent mr-2 flex-shrink-0" />
                                                <span className="text-muted-foreground">{feature}</span>
                                            </div>
                                        ))}
                                    </div>

                                    <Button className="w-full mt-6 bg-accent hover:bg-accent/90 text-accent-foreground group-hover:scale-105 transition-all duration-300">
                                        Learn More
                                        <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                                    </Button>
                                </CardContent>
                            </Card>
                        ))}
                    </div>
                </div>
            </section>

            {/* Trust Elements Section */}
            <section className="py-20 px-4 bg-background">
                <div className="max-w-7xl mx-auto">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
                        {/* Animated Counter */}
                        <div className="text-center">
                            <div className="text-4xl md:text-6xl font-playfair font-bold text-accent mb-2">
                                ₹{counterValue}+ Crores
                            </div>
                            <p className="text-lg font-crimson text-muted-foreground">
                                Claims Settled
                            </p>
                        </div>

                        {/* IRDAI Badge */}
                        <div className="text-center">
                            <div className="inline-flex items-center justify-center w-20 h-20 bg-accent/20 rounded-full mb-4 mx-auto">
                                <Award className="h-10 w-10 text-accent" />
                            </div>
                            <div className="text-xl font-playfair font-bold text-foreground mb-2">
                                IRDAI Registered
                            </div>
                            <p className="text-sm font-crimson text-muted-foreground">
                                License No: 123456
                            </p>
                        </div>

                        {/* Client Satisfaction */}
                        <div className="text-center">
                            <div className="text-4xl md:text-6xl font-playfair font-bold text-accent mb-2">
                                99.8%
                            </div>
                            <p className="text-lg font-crimson text-muted-foreground">
                                Client Satisfaction
                            </p>
                        </div>
                    </div>

                    {/* Testimonials Carousel */}
                    <div className="relative overflow-hidden rounded-2xl bg-gradient-premium p-8">
                        <div className="flex transition-transform duration-500 ease-in-out" style={{
                            transform: `translateX(-${testimonialIndex * 100}%)`
                        }}>
                            {testimonials.map((testimonial, index) => (
                                <div key={index} className="w-full flex-shrink-0 text-center">
                                    <div className="flex justify-center mb-4">
                                        {[...Array(testimonial.rating)].map((_, i) => (
                                            <Star key={i} className="h-6 w-6 text-accent fill-current" />
                                        ))}
                                    </div>
                                    <p className="text-xl font-crimson text-foreground mb-6 italic">
                                        "{testimonial.text}"
                                    </p>
                                    <div>
                                        <div className="font-playfair font-semibold text-foreground">
                                            {testimonial.name}
                                        </div>
                                        <div className="text-sm text-muted-foreground">
                                            {testimonial.role}
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>

                        {/* Carousel Indicators */}
                        <div className="flex justify-center mt-6 space-x-2">
                            {testimonials.map((_, index) => (
                                <button
                                    key={index}
                                    className={`w-3 h-3 rounded-full transition-all duration-300 ${index === testimonialIndex ? 'bg-accent' : 'bg-muted'
                                        }`}
                                    onClick={() => setTestimonialIndex(index)}
                                />
                            ))}
                        </div>
                    </div>
                </div>
            </section>

            {/* Process Flow Section */}
            <section className="py-20 px-4 bg-gradient-accent">
                <div className="max-w-6xl mx-auto">
                    <div className="text-center mb-16">
                        <h2 className="text-4xl md:text-5xl font-playfair font-bold text-white mb-4">
                            Simple 4-Step Process
                        </h2>
                        <p className="text-xl font-crimson text-white/80">
                            Get your life insurance policy in just 4 easy steps
                        </p>
                    </div>

                    <div className="relative">
                        {/* Connecting Lines */}
                        <div className="absolute top-1/2 left-0 right-0 h-0.5 bg-white/30 transform -translate-y-1/2 hidden lg:block" />

                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                            {processSteps.map((step, index) => (
                                <div
                                    key={index}
                                    className={`process-step text-center relative ${index <= currentStep ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
                                        } transition-all duration-700`}
                                    style={{ transitionDelay: `${index * 200}ms` }}
                                >
                                    <div className="relative z-10">
                                        <div className="inline-flex items-center justify-center w-16 h-16 bg-white rounded-full mb-6 mx-auto shadow-lg">
                                            <step.icon className="h-8 w-8 text-accent" />
                                        </div>
                                        <h3 className="text-xl font-playfair font-bold text-white mb-3">
                                            {step.title}
                                        </h3>
                                        <p className="text-white/80 font-crimson">
                                            {step.description}
                                        </p>
                                    </div>

                                    {/* Step Number */}
                                    <div className="absolute -top-2 -right-2 w-8 h-8 bg-accent rounded-full flex items-center justify-center text-white font-bold text-sm">
                                        {index + 1}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </section>

            {/* CTA Section */}
            <section className="py-20 px-4 bg-background">
                <div className="max-w-4xl mx-auto text-center">
                    <h2 className="text-4xl md:text-5xl font-playfair font-bold text-foreground mb-6">
                        Ready to Secure Your Family's Future?
                    </h2>
                    <p className="text-xl font-crimson text-muted-foreground mb-8">
                        Get a free consultation and personalized quote today
                    </p>
                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                        <Button size="lg" className="bg-accent hover:bg-accent/90 text-accent-foreground font-semibold px-8 py-4 text-lg">
                            Get Free Quote
                        </Button>
                        <Button size="lg" variant="outline" className="border-accent text-accent hover:bg-accent hover:text-accent-foreground font-semibold px-8 py-4 text-lg">
                            Schedule Consultation
                        </Button>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default LifeInsurance; 