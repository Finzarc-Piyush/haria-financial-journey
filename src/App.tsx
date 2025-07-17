import React from "react";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Suspense, lazy } from "react";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import Footer from "@/components/Footer";

const SIPCalculator = lazy(() => import("./pages/SIPCalculator"));
const FDCalculator = lazy(() => import("./pages/FDCalculator"));
const RetirementCalculator = lazy(() => import("./pages/RetirementCalculator"));
const EmergencyFundCalculator = lazy(() => import("./pages/EmergencyFundCalculator"));

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
          <Suspense fallback={<div className="w-full text-center py-16 text-lg font-playfair">Loading calculator...</div>}>
            <Routes>
              <Route path="/" element={<Index />} />
              <Route path="/sip-calculator" element={<SIPCalculator />} />
              <Route path="/fd-calculator" element={<FDCalculator />} />
              <Route path="/retirement-calculator" element={<RetirementCalculator />} />
              <Route path="/emergency-fund-calculator" element={<EmergencyFundCalculator />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </Suspense>
          <Footer />
        </BrowserRouter>
      </TooltipProvider>
    </QueryClientProvider>
  </ErrorBoundary>
);

export default App;
