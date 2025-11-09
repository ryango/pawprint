
import React, { useState } from 'react';
import { loadStripe } from '@stripe/stripe-js';

interface PaymentModalProps {
    isOpen: boolean;
    onClose: () => void;
    onPaymentSuccess: () => void;
}

// Replace with your actual Stripe publishable key
const STRIPE_PUBLISHABLE_KEY = import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY || 'pk_test_YOUR_KEY_HERE';

const PaymentModal: React.FC<PaymentModalProps> = ({ isOpen, onClose, onPaymentSuccess }) => {
    const [isProcessing, setIsProcessing] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const handlePayment = async () => {
        setIsProcessing(true);
        setError(null);

        try {
            // In a real implementation, you would:
            // 1. Call your backend to create a Stripe Checkout Session
            // 2. Redirect to Stripe Checkout
            // Example:
            // const response = await fetch('/api/create-checkout-session', {
            //     method: 'POST',
            //     headers: { 'Content-Type': 'application/json' },
            //     body: JSON.stringify({ priceId: 'price_xxx' })
            // });
            // const { sessionId } = await response.json();
            // const stripe = await loadStripe(STRIPE_PUBLISHABLE_KEY);
            // await stripe?.redirectToCheckout({ sessionId });

            // For demo purposes, simulate a payment
            await new Promise(resolve => setTimeout(resolve, 2000));

            // Simulate successful payment
            onPaymentSuccess();
            onClose();
        } catch (err) {
            setError('Payment failed. Please try again.');
        } finally {
            setIsProcessing(false);
        }
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50 p-4">
            <div className="bg-slate-800 rounded-lg shadow-2xl max-w-md w-full p-8 relative animate-fade-in">
                <button
                    onClick={onClose}
                    className="absolute top-4 right-4 text-slate-400 hover:text-white transition-colors"
                    disabled={isProcessing}
                >
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path>
                    </svg>
                </button>

                <div className="text-center mb-6">
                    <div className="bg-gradient-to-r from-pink-500 to-purple-500 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                        <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                        </svg>
                    </div>
                    <h2 className="text-2xl font-bold text-white mb-2">Unlock Your Pet Pics!</h2>
                    <p className="text-slate-300">Download your hilarious AI-generated pet images</p>
                </div>

                <div className="bg-slate-900 rounded-lg p-6 mb-6">
                    <div className="flex justify-between items-center mb-4">
                        <span className="text-slate-300">4 AI-Generated Images</span>
                        <span className="text-white font-bold">$4.99</span>
                    </div>
                    <div className="border-t border-slate-700 pt-4">
                        <div className="flex justify-between items-center">
                            <span className="text-lg font-semibold text-white">Total</span>
                            <span className="text-2xl font-bold text-pink-500">$4.99</span>
                        </div>
                    </div>
                </div>

                {error && (
                    <div className="bg-red-900/50 border border-red-700 text-red-300 p-3 rounded-lg mb-4">
                        {error}
                    </div>
                )}

                <button
                    onClick={handlePayment}
                    disabled={isProcessing}
                    className="w-full bg-gradient-to-r from-pink-600 to-purple-600 text-white font-bold py-4 px-6 rounded-lg hover:from-pink-700 hover:to-purple-700 transition-all transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none flex items-center justify-center gap-2"
                >
                    {isProcessing ? (
                        <>
                            <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                            </svg>
                            Processing...
                        </>
                    ) : (
                        <>
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z"></path>
                            </svg>
                            Pay with Stripe
                        </>
                    )}
                </button>

                <p className="text-slate-400 text-xs text-center mt-4">
                    Secure payment powered by Stripe. Your payment info is never stored.
                </p>
            </div>
        </div>
    );
};

export default PaymentModal;
