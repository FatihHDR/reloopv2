import { useState } from 'react';
import { ChevronLeft, CreditCard, Plus, Trash2, Check, Home, ShoppingBag, PackageSearch, Info, Star, Shield } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from './button';
import { NavBar } from './tubelight-navbar';
import { Component as Footer } from "../footer-taped-design";

const navItems = [
    { name: "Home", url: "/", icon: Home },
    { name: "Shop", url: "#shop", icon: ShoppingBag },
    { name: "Categories", url: "#categories", icon: PackageSearch },
    { name: "About", url: "/about", icon: Info },
];

interface PaymentMethod {
    id: string;
    type: 'card' | 'bank';
    cardNumber?: string;
    cardHolder?: string;
    expiryDate?: string;
    bankName?: string;
    accountNumber?: string;
    accountHolder?: string;
    isPrimary: boolean;
}

const mockPaymentMethods: PaymentMethod[] = [
    {
        id: '1',
        type: 'card',
        cardNumber: '•••• •••• •••• 4242',
        cardHolder: 'Sarah Johnson',
        expiryDate: '12/28',
        isPrimary: true
    },
    {
        id: '2',
        type: 'bank',
        bankName: 'Bank Mandiri',
        accountNumber: '1234567890',
        accountHolder: 'Sarah Johnson',
        isPrimary: false
    }
];

export default function PaymentMethodsPage() {
    const navigate = useNavigate();
    const [paymentMethods, setPaymentMethods] = useState<PaymentMethod[]>(mockPaymentMethods);

    const handleSetPrimary = (id: string) => {
        setPaymentMethods(methods =>
            methods.map(method => ({
                ...method,
                isPrimary: method.id === id
            }))
        );
    };

    const handleDelete = (id: string) => {
        if (window.confirm('Are you sure you want to remove this payment method?')) {
            setPaymentMethods(methods => methods.filter(method => method.id !== id));
        }
    };

    return (
        <div className="min-h-screen bg-gradient-to-b from-muted/30 to-background">
            <NavBar items={navItems} />

            <div className="container px-4 md:px-6 mx-auto max-w-4xl py-6 md:py-10 pt-24 md:pt-28">
                {/* Breadcrumb */}
                <nav className="flex items-center gap-2 text-sm text-muted-foreground mb-6">
                    <Link to="/" className="hover:text-primary transition-colors">Home</Link>
                    <span>/</span>
                    <Link to="/profile" className="hover:text-primary transition-colors">My Account</Link>
                    <span>/</span>
                    <span className="text-foreground font-medium">Payment Methods</span>
                </nav>

                {/* Header */}
                <motion.div
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="flex items-center justify-between mb-8"
                >
                    <div className="flex items-center gap-4">
                        <button
                            onClick={() => navigate('/profile')}
                            className="w-11 h-11 rounded-xl border border-border bg-card flex items-center justify-center hover:bg-muted transition-all hover:scale-105 active:scale-95"
                        >
                            <ChevronLeft size={20} />
                        </button>
                        <div>
                            <h1 className="text-2xl md:text-3xl font-bold tracking-tight">Payment Methods</h1>
                            <p className="text-sm text-muted-foreground mt-1">
                                Manage your payment methods
                            </p>
                        </div>
                    </div>
                    <Button onClick={() => navigate('/profile/address')} className="rounded-xl hidden md:flex">
                        <Plus size={16} className="mr-2" />
                        Add Payment
                    </Button>
                </motion.div>

                {/* Security Info */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="bg-blue-50 dark:bg-blue-950/20 border border-blue-200 dark:border-blue-900 rounded-2xl p-4 mb-6"
                >
                    <div className="flex gap-3">
                        <Shield className="text-blue-500 flex-shrink-0 mt-0.5" size={20} />
                        <div className="text-sm">
                            <p className="font-medium text-blue-900 dark:text-blue-100 mb-1">Secure Payment Information</p>
                            <p className="text-blue-800 dark:text-blue-200">
                                Your payment information is encrypted and secure. We never store your full card details.
                            </p>
                        </div>
                    </div>
                </motion.div>

                {/* Payment Methods List */}
                <div className="space-y-4">
                    <AnimatePresence mode="popLayout">
                        {paymentMethods.length === 0 ? (
                            <motion.div
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                exit={{ opacity: 0 }}
                                className="bg-card border border-border rounded-2xl p-12 text-center"
                            >
                                <CreditCard className="mx-auto mb-4 text-muted-foreground" size={48} />
                                <h3 className="text-lg font-semibold mb-2">No payment methods</h3>
                                <p className="text-muted-foreground mb-6">
                                    Add a payment method to make checkout faster
                                </p>
                                <Button onClick={() => navigate('/profile/address')}>
                                    <Plus size={16} className="mr-2" />
                                    Add Payment Method
                                </Button>
                            </motion.div>
                        ) : (
                            paymentMethods.map((method, index) => (
                                <motion.div
                                    key={method.id}
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    exit={{ opacity: 0, scale: 0.9 }}
                                    transition={{ delay: index * 0.1 }}
                                    className={`bg-card border-2 rounded-2xl p-6 shadow-sm hover:shadow-md transition-all ${method.isPrimary ? 'border-primary bg-primary/5' : 'border-border'
                                        }`}
                                >
                                    <div className="flex items-start justify-between">
                                        <div className="flex-1">
                                            {method.type === 'card' ? (
                                                <>
                                                    <div className="flex items-center gap-3 mb-4">
                                                        <div className="p-3 bg-gradient-to-br from-primary to-primary/70 rounded-xl">
                                                            <CreditCard className="text-white" size={24} />
                                                        </div>
                                                        <div>
                                                            <p className="text-sm text-muted-foreground">Credit/Debit Card</p>
                                                            <p className="font-semibold text-lg">{method.cardNumber}</p>
                                                        </div>
                                                    </div>
                                                    <div className="grid grid-cols-2 gap-4 text-sm">
                                                        <div>
                                                            <p className="text-muted-foreground mb-1">Cardholder</p>
                                                            <p className="font-medium">{method.cardHolder}</p>
                                                        </div>
                                                        <div>
                                                            <p className="text-muted-foreground mb-1">Expires</p>
                                                            <p className="font-medium">{method.expiryDate}</p>
                                                        </div>
                                                    </div>
                                                </>
                                            ) : (
                                                <>
                                                    <div className="flex items-center gap-3 mb-4">
                                                        <div className="p-3 bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl">
                                                            <CreditCard className="text-white" size={24} />
                                                        </div>
                                                        <div>
                                                            <p className="text-sm text-muted-foreground">Bank Account</p>
                                                            <p className="font-semibold text-lg">{method.bankName}</p>
                                                        </div>
                                                    </div>
                                                    <div className="grid grid-cols-2 gap-4 text-sm">
                                                        <div>
                                                            <p className="text-muted-foreground mb-1">Account Number</p>
                                                            <p className="font-medium">{method.accountNumber}</p>
                                                        </div>
                                                        <div>
                                                            <p className="text-muted-foreground mb-1">Account Holder</p>
                                                            <p className="font-medium">{method.accountHolder}</p>
                                                        </div>
                                                    </div>
                                                </>
                                            )}

                                            {method.isPrimary && (
                                                <motion.div
                                                    initial={{ opacity: 0 }}
                                                    animate={{ opacity: 1 }}
                                                    className="flex items-center gap-2 mt-4 text-primary"
                                                >
                                                    <Star size={16} fill="currentColor" />
                                                    <span className="text-sm font-medium">Primary Payment Method</span>
                                                </motion.div>
                                            )}
                                        </div>

                                        <div className="flex flex-col gap-2">
                                            {!method.isPrimary && (
                                                <Button
                                                    variant="outline"
                                                    size="sm"
                                                    onClick={() => handleSetPrimary(method.id)}
                                                    className="rounded-lg"
                                                >
                                                    <Check size={14} className="mr-1" />
                                                    Set Primary
                                                </Button>
                                            )}
                                            <Button
                                                variant="outline"
                                                size="sm"
                                                onClick={() => handleDelete(method.id)}
                                                className="rounded-lg text-red-600 hover:text-red-700 hover:bg-red-50"
                                            >
                                                <Trash2 size={14} className="mr-1" />
                                                Remove
                                            </Button>
                                        </div>
                                    </div>
                                </motion.div>
                            ))
                        )}
                    </AnimatePresence>
                </div>

                {/* Add Button - Mobile */}
                {paymentMethods.length > 0 && (
                    <Button
                        onClick={() => navigate('/profile/address')}
                        className="w-full rounded-xl py-6 mt-6 md:hidden text-base font-semibold"
                    >
                        <Plus size={18} className="mr-2" />
                        Add Payment Method
                    </Button>
                )}
            </div>

            <Footer />
        </div>
    );
}
