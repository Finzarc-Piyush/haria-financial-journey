import { useEffect, useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  TrendingUp,
  FileText,
  Calendar,
  Clock,
  User,
  ArrowRight,
  BarChart3,
  Newspaper,
  BookOpen,
  Mail
} from "lucide-react";
import AOS from 'aos';
import 'aos/dist/aos.css';

const InsightsSection = () => {
  useEffect(() => {
    AOS.init({ duration: 500, once: true });
  }, []);

  const featuredArticles = [
    {
      id: 'market-volatility',
      title: 'Navigating Market Volatility in 2024: Strategies for Indian Investors',
      summary: 'Economic uncertainty requires strategic portfolio adjustments and disciplined rebalancing',
      date: 'March 15, 2024',
      readTime: '5 min read',
      author: 'Rajesh Haria, CFA',
      category: 'Market Analysis',
      keyTakeaways: [
        'Diversification across asset classes remains crucial',
        'Rupee-cost averaging benefits during volatile periods',
        'Tax-loss harvesting opportunities in down markets'
      ],
      icon: TrendingUp
    },
    {
      id: 'tax-changes',
      title: 'New Tax Changes: Impact on Your Investment Strategy',
      summary: 'Recent budget changes affect LTCG taxation and investment planning approaches',
      date: 'February 28, 2024',
      readTime: '7 min read',
      author: 'Rajesh Haria, CFA',
      category: 'Tax Planning',
      keyTakeaways: [
        'Revised LTCG tax rates and implications',
        'Strategic planning for new tax regime',
        'Implementation timeline for changes'
      ],
      icon: FileText
    },
    {
      id: 'retirement-guide',
      title: 'Retirement Planning for Indian Professionals: A Comprehensive Guide',
      summary: 'Systematic approach to retirement planning considering inflation, healthcare costs, and lifestyle goals',
      date: 'January 20, 2024',
      readTime: '10 min read',
      author: 'Rajesh Haria, CFA',
      category: 'Retirement Planning',
      keyTakeaways: [
        'Calculation methods for retirement corpus',
        'Optimal investment vehicles for different life stages',
        'Timeline planning and goal setting strategies'
      ],
      icon: BookOpen
    }
  ];

  const marketCommentary = [
    {
      title: 'Q1 2024 Market Review',
      description: 'Comprehensive analysis of market performance and outlook for remainder of year',
      status: 'Current'
    },
    {
      title: 'Economic Indicators Dashboard',
      description: 'Real-time tracking of key economic metrics affecting Indian markets',
      status: 'Live Data'
    },
    {
      title: 'Investment Recommendations',
      description: 'Sector allocation and stock recommendations based on current market conditions',
      status: 'Updated Weekly'
    }
  ];

  const educationalContent = [
    {
      title: 'Understanding Asset Allocation',
      type: 'Educational Guide',
      description: 'Fundamental principles of portfolio construction and risk management'
    },
    {
      title: 'Tax-Efficient Investing Strategies',
      type: 'Case Study',
      description: 'Real examples of tax optimization through strategic investment planning'
    },
    {
      title: 'Estate Planning Essentials',
      type: 'Webinar Series',
      description: 'Comprehensive guide to wealth transfer and estate planning strategies'
    }
  ];

  return (
    <section id="insights" className="py-20 bg-cream">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div data-aos="fade-in" className="text-center mb-16">
          <h2 className="font-playfair text-4xl md:text-5xl font-bold text-tertiary mb-6">
            Market Insights & Financial Commentary
          </h2>
          <div className="w-24 h-1 bg-secondary mx-auto mb-6"></div>
          <p className="font-crimson text-lg text-tertiary/80 max-w-3xl mx-auto">
            Stay informed with our latest market analysis, investment insights, and
            educational content designed for successful professionals.
          </p>
        </div>

        {/* Featured Articles */}
        <div className="mb-16">
          <div className="flex items-center mb-8">
            <Newspaper className="w-6 h-6 text-secondary mr-3" />
            <h3 className="font-playfair text-2xl font-bold text-tertiary">
              Featured Articles
            </h3>
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {featuredArticles.map((article, index) => (
              <Card
                key={article.id}
                data-aos={index % 2 === 0 ? 'fade-right' : 'fade-left'}
                data-aos-delay={index * 120}
                className="premium-card hover-lift transition-all duration-500 group overflow-hidden"
              >
                {/* Blog Card Image Placeholder (replace with real image if available) */}
                <div className="relative h-40 w-full mb-4 overflow-hidden rounded-lg">
                  <div className="absolute inset-0 bg-secondary/10 group-hover:scale-105 transition-transform duration-400 z-0" />
                  <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 bg-secondary/80 transition-opacity duration-400 z-10">
                    <span className="font-playfair text-lg text-secondary-foreground">Read Article</span>
                  </div>
                </div>
                <CardHeader>
                  <div className="flex items-center justify-between mb-4">
                    <article.icon className="w-6 h-6 text-secondary" />
                    <Badge variant="secondary" className="transition-all duration-300 badge-micro group-hover:scale-110 group-hover:bg-secondary/90 group-hover:shadow-lg">
                      {article.category}
                    </Badge>
                  </div>
                  <CardTitle className="font-playfair text-lg text-tertiary line-clamp-2">
                    {article.title}
                  </CardTitle>
                  <CardDescription className="font-crimson text-tertiary/70">
                    {article.summary}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between text-sm text-tertiary/60">
                      <div className="flex items-center">
                        <Calendar className="w-4 h-4 mr-1" />
                        {article.date}
                      </div>
                      <div className="flex items-center">
                        <Clock className="w-4 h-4 mr-1" />
                        <span className="badge-micro group-hover:bg-secondary/80 group-hover:text-secondary-foreground px-2 py-0.5 rounded transition-all duration-300 cursor-pointer">
                          {article.readTime}
                        </span>
                      </div>
                    </div>
                    <div className="flex items-center text-sm text-tertiary/60">
                      <User className="w-4 h-4 mr-1" />
                      {article.author}
                    </div>
                    <div>
                      <h4 className="font-crimson font-semibold text-tertiary text-sm mb-2">
                        Key Takeaways:
                      </h4>
                      <ul className="space-y-1">
                        {article.keyTakeaways.map((takeaway, i) => (
                          <li key={i} className="font-crimson text-xs text-tertiary/70 flex items-start">
                            <div className="w-1 h-1 bg-secondary rounded-full mr-2 mt-2"></div>
                            {takeaway}
                          </li>
                        ))}
                      </ul>
                    </div>
                    <Button
                      variant="outline"
                      className="w-full border-secondary text-secondary hover:bg-secondary hover:text-secondary-foreground"
                    >
                      Read More
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Market Commentary */}
        <div className="mb-16">
          <div className="flex items-center mb-8">
            <BarChart3 className="w-6 h-6 text-secondary mr-3" />
            <h3 className="font-playfair text-2xl font-bold text-tertiary">
              Current Market Commentary
            </h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {marketCommentary.map((item, index) => (
              <Card
                key={index}
                className="premium-card hover-lift transition-all duration-300"
              >
                <CardHeader className="pb-4">
                  <div className="flex items-center justify-between">
                    <CardTitle className="font-playfair text-lg text-tertiary">
                      {item.title}
                    </CardTitle>
                    <Badge className="bg-secondary text-secondary-foreground text-xs">
                      {item.status}
                    </Badge>
                  </div>
                  <CardDescription className="font-crimson text-tertiary/70">
                    {item.description}
                  </CardDescription>
                </CardHeader>
              </Card>
            ))}
          </div>
        </div>

        {/* Educational Content */}
        <div className="mb-16">
          <div className="flex items-center mb-8">
            <BookOpen className="w-6 h-6 text-secondary mr-3" />
            <h3 className="font-playfair text-2xl font-bold text-tertiary">
              Educational Resources
            </h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {educationalContent.map((item, index) => (
              <Card
                key={index}
                className="premium-card hover-lift transition-all duration-300"
              >
                <CardHeader>
                  <div className="flex items-center justify-between mb-2">
                    <Badge variant="outline" className="border-secondary text-secondary">
                      {item.type}
                    </Badge>
                  </div>
                  <CardTitle className="font-playfair text-lg text-tertiary">
                    {item.title}
                  </CardTitle>
                  <CardDescription className="font-crimson text-tertiary/70">
                    {item.description}
                  </CardDescription>
                </CardHeader>
              </Card>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
};

export default InsightsSection;