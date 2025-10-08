import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Cookie, X, Shield, BarChart3 } from 'lucide-react';

interface CookieConsentProps {
    onAccept: () => void;
    onDecline: () => void;
}

const CookieConsent: React.FC<CookieConsentProps> = ({ onAccept, onDecline }) => {
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        // Check if user has already made a choice
        const consent = localStorage.getItem('analytics_consent');
        if (!consent) {
            setIsVisible(true);
        }
    }, []);

    const handleAccept = () => {
        localStorage.setItem('analytics_consent', 'accepted');
        setIsVisible(false);
        onAccept();
    };

    const handleDecline = () => {
        localStorage.setItem('analytics_consent', 'declined');
        setIsVisible(false);
        onDecline();
    };

    if (!isVisible) return null;

    return (
        <div className="fixed bottom-4 left-4 right-4 z-50 md:left-auto md:right-4 md:max-w-md">
            <Card className="border-2 border-blue-200 shadow-lg">
                <CardHeader className="pb-3">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-2">
                            <Cookie className="h-5 w-5 text-blue-600" />
                            <CardTitle className="text-lg font-playfair">Cookie Consent</CardTitle>
                        </div>
                        <Button
                            variant="ghost"
                            size="sm"
                            onClick={handleDecline}
                            className="h-6 w-6 p-0"
                        >
                            <X className="h-4 w-4" />
                        </Button>
                    </div>
                </CardHeader>
                <CardContent className="space-y-4">
                    <CardDescription className="text-sm text-gray-600">
                        We use analytics cookies to understand how visitors interact with our website.
                        This helps us improve your experience and our services.
                    </CardDescription>

                    <div className="space-y-2">
                        <div className="flex items-center space-x-2 text-sm">
                            <BarChart3 className="h-4 w-4 text-green-600" />
                            <span>Track page views and user behavior</span>
                        </div>
                        <div className="flex items-center space-x-2 text-sm">
                            <Shield className="h-4 w-4 text-blue-600" />
                            <span>Anonymous data only - no personal information</span>
                        </div>
                    </div>

                    <div className="flex space-x-2">
                        <Button
                            onClick={handleAccept}
                            className="flex-1 bg-blue-600 hover:bg-blue-700"
                        >
                            Accept All
                        </Button>
                        <Button
                            onClick={handleDecline}
                            variant="outline"
                            className="flex-1"
                        >
                            Decline
                        </Button>
                    </div>

                    <p className="text-xs text-gray-500">
                        You can change your preferences anytime in your browser settings.
                    </p>
                </CardContent>
            </Card>
        </div>
    );
};

export default CookieConsent;
