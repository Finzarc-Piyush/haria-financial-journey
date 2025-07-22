import React from "react";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import Footer from "@/components/Footer";
import ScrollToTop from "@/components/ScrollToTop";
import SIPCalculator from "./pages/SIPCalculator";
import SWPCalculator from "./pages/SWPCalculator";
import LifeInsurance from "./pages/LifeInsurance";
import GeneralInsurance from "./pages/GeneralInsurance";
import MutualFunds from "./pages/MutualFunds";
import EquityInvestment from "./pages/EquityInvestment";
import FixedIncome from "./pages/FixedIncome";
import CommodityTrading from "./pages/CommodityTrading";
import LumpsumCalculator from "./pages/LumpsumCalculator";
import CAGRCalculator from "./pages/CAGRCalculator";

// ErrorBoundary component
class ErrorBoundary extends React.Component<{ children: React.ReactNode; }, { hasError: boolean; }> {
  constructor(props: any) {
    super(props);
    this.state = { hasError: false };
  }
  static getDerivedStateFromError() { return { hasError: true }; }
  componentDidCatch(error: any, info: any) { console.error(error, info); }
  render() {
    if (this.state.hasError) {
      return <div className="w-full text-center py-16 text-lg font-playfair text-red-600">Something went wrong. Please refresh the page.</div>;
    }
    return this.props.children;
  }
}

// Analytics integration placeholder
if (typeof window !== 'undefined') {
  // Example: window.gtag('config', 'GA_MEASUREMENT_ID');
  // Or Segment analytics.load('SEGMENT_WRITE_KEY');
}

const queryClient = new QueryClient();

const App = () => (
  <ErrorBoundary>
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <ScrollToTop />
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/sip-calculator" element={<SIPCalculator />} />
            <Route path="/swp-calculator" element={<SWPCalculator />} />
            <Route path="/life-insurance" element={<LifeInsurance />} />
            <Route path="/general-insurance" element={<GeneralInsurance />} />
            <Route path="/mutual-funds" element={<MutualFunds />} />
            <Route path="/equity-investment" element={<EquityInvestment />} />
            <Route path="/fixed-income" element={<FixedIncome />} />
            <Route path="/commodity-trading" element={<CommodityTrading />} />
            <Route path="/lumpsum-calculator" element={<LumpsumCalculator />} />
            <Route path="/cagr-calculator" element={<CAGRCalculator />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
          <Footer />
        </BrowserRouter>
      </TooltipProvider>
    </QueryClientProvider>
  </ErrorBoundary>
);

export default App;
