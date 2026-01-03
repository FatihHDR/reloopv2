import React, { useState } from 'react';
import { ChevronLeft, Settings as SettingsIcon, Globe, Moon, Sun, Monitor, Languages, Home, ShoppingBag, PackageSearch, Info, Check, Loader2 } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Button } from './button';
import { NavBar } from './tubelight-navbar';
import { Component as Footer } from "../footer-taped-design";

const navItems = [
    { name: "Home", url: "/", icon: Home },
    { name: "Shop", url: "#shop", icon: ShoppingBag },
    { name: "Categories", url: "#categories", icon: PackageSearch },
    { name: "About", url: "/about", icon: Info },
];

type Theme = 'light' | 'dark' | 'system';
type Language = 'en' | 'id';
type Currency = 'IDR' | 'USD';

export default function SettingsPage() {
    const navigate = useNavigate();
    const [isSaving, setIsSaving] = useState(false);

    const [settings, setSettings] = useState({
        theme: 'system' as Theme,
        language: 'id' as Language,
        currency: 'IDR' as Currency,
        emailMarketing: true,
        orderReminders: true,
        productRecommendations: true,
    });

    const handleSave = async () => {
        setIsSaving(true);
        await new Promise(resolve => setTimeout(resolve, 1000));
        setIsSaving(false);
    };

    const themeOptions = [
        { value: 'light' as Theme, icon: Sun, label: 'Light', description: 'Light mode' },
        { value: 'dark' as Theme, icon: Moon, label: 'Dark', description: 'Dark mode' },
        { value: 'system' as Theme, icon: Monitor, label: 'System', description: 'Auto' }
    ];

    const languageOptions = [
        { value: 'id' as Language, label: 'Bahasa Indonesia', flag: '🇮🇩' },
        { value: 'en' as Language, label: 'English', flag: '🇺🇸' }
    ];

    const currencyOptions = [
        { value: 'IDR' as Currency, label: 'Indonesian Rupiah (IDR)', symbol: 'Rp' },
        { value: 'USD' as Currency, label: 'US Dollar (USD)', symbol: '$' }
    ];

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
                    <span className="text-foreground font-medium">Settings</span>
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
                            <h1 className="text-2xl md:text-3xl font-bold tracking-tight">Settings</h1>
                            <p className="text-sm text-muted-foreground mt-1">
                                Customize your experience
                            </p>
                        </div>
                    </div>
                    <Button onClick={handleSave} disabled={isSaving} className="rounded-xl hidden md:flex">
                        {isSaving ? (
                            <>
                                <Loader2 size={16} className="mr-2 animate-spin" />
                                Saving...
                            </>
                        ) : (
                            <>
                                <Check size={16} className="mr-2" />
                                Save Changes
                            </>
                        )}
                    </Button>
                </motion.div>

                <div className="space-y-6">
                    {/* Appearance */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="bg-card border border-border rounded-2xl p-6 shadow-sm"
                    >
                        <div className="flex items-center gap-3 mb-5">
                            <div className="p-3 bg-primary/10 rounded-xl">
                                <Monitor className="text-primary" size={24} />
                            </div>
                            <div>
                                <h3 className="font-semibold text-lg">Appearance</h3>
                                <p className="text-sm text-muted-foreground">Customize how the app looks</p>
                            </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                            {themeOptions.map(option => {
                                const Icon = option.icon;
                                const isSelected = settings.theme === option.value;
                                return (
                                    <button
                                        key={option.value}
                                        onClick={() => setSettings({ ...settings, theme: option.value })}
                                        className={`group relative flex flex-col items-center gap-3 p-4 rounded-xl border-2 transition-all ${isSelected
                                            ? 'border-primary bg-primary/5 shadow-md'
                                            : 'border-border hover:border-primary/50'
                                            }`}
                                    >
                                        <div className={`p-3 rounded-lg transition-colors ${isSelected ? 'bg-primary/10' : 'bg-muted group-hover:bg-primary/5'
                                            }`}>
                                            <Icon size={24} className={isSelected ? 'text-primary' : 'text-muted-foreground'} />
                                        </div>
                                        <div className="text-center">
                                            <span className={`font-semibold block ${isSelected ? 'text-primary' : ''}`}>
                                                {option.label}
                                            </span>
                                            <span className="text-xs text-muted-foreground">
                                                {option.description}
                                            </span>
                                        </div>
                                        {isSelected && (
                                            <motion.div
                                                initial={{ scale: 0 }}
                                                animate={{ scale: 1 }}
                                                className="absolute -top-2 -right-2 w-6 h-6 bg-primary rounded-full flex items-center justify-center shadow-lg"
                                            >
                                                <Check size={14} className="text-white" />
                                            </motion.div>
                                        )}
                                    </button>
                                );
                            })}
                        </div>
                    </motion.div>

                    {/* Language & Region */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.1 }}
                        className="bg-card border border-border rounded-2xl p-6 shadow-sm"
                    >
                        <div className="flex items-center gap-3 mb-5">
                            <div className="p-3 bg-primary/10 rounded-xl">
                                <Globe className="text-primary" size={24} />
                            </div>
                            <div>
                                <h3 className="font-semibold text-lg">Language & Region</h3>
                                <p className="text-sm text-muted-foreground">Set your preferred language and currency</p>
                            </div>
                        </div>

                        <div className="space-y-4">
                            {/* Language */}
                            <div>
                                <label className="block text-sm font-medium mb-3">Language</label>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                                    {languageOptions.map(option => {
                                        const isSelected = settings.language === option.value;
                                        return (
                                            <button
                                                key={option.value}
                                                onClick={() => setSettings({ ...settings, language: option.value })}
                                                className={`flex items-center justify-between p-4 rounded-xl border-2 transition-all ${isSelected
                                                    ? 'border-primary bg-primary/5'
                                                    : 'border-border hover:border-primary/50'
                                                    }`}
                                            >
                                                <div className="flex items-center gap-3">
                                                    <span className="text-2xl">{option.flag}</span>
                                                    <span className={`font-medium ${isSelected ? 'text-primary' : ''}`}>
                                                        {option.label}
                                                    </span>
                                                </div>
                                                {isSelected && <Check size={18} className="text-primary" />}
                                            </button>
                                        );
                                    })}
                                </div>
                            </div>

                            {/* Currency */}
                            <div>
                                <label className="block text-sm font-medium mb-3">Currency</label>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                                    {currencyOptions.map(option => {
                                        const isSelected = settings.currency === option.value;
                                        return (
                                            <button
                                                key={option.value}
                                                onClick={() => setSettings({ ...settings, currency: option.value })}
                                                className={`flex items-center justify-between p-4 rounded-xl border-2 transition-all ${isSelected
                                                    ? 'border-primary bg-primary/5'
                                                    : 'border-border hover:border-primary/50'
                                                    }`}
                                            >
                                                <div className="flex items-center gap-3">
                                                    <div className="w-8 h-8 bg-muted rounded-lg flex items-center justify-center font-bold text-sm">
                                                        {option.symbol}
                                                    </div>
                                                    <span className={`font-medium text-sm ${isSelected ? 'text-primary' : ''}`}>
                                                        {option.label}
                                                    </span>
                                                </div>
                                                {isSelected && <Check size={18} className="text-primary" />}
                                            </button>
                                        );
                                    })}
                                </div>
                            </div>
                        </div>
                    </motion.div>

                    {/* Preferences */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2 }}
                        className="bg-card border border-border rounded-2xl p-6 shadow-sm"
                    >
                        <div className="flex items-center gap-3 mb-5">
                            <div className="p-3 bg-primary/10 rounded-xl">
                                <SettingsIcon className="text-primary" size={24} />
                            </div>
                            <div>
                                <h3 className="font-semibold text-lg">Preferences</h3>
                                <p className="text-sm text-muted-foreground">Manage your account preferences</p>
                            </div>
                        </div>

                        <div className="space-y-4">
                            {[
                                { key: 'emailMarketing', label: 'Email Marketing', description: 'Receive promotional emails and special offers' },
                                { key: 'orderReminders', label: 'Order Reminders', description: 'Get reminders about your pending orders' },
                                { key: 'productRecommendations', label: 'Product Recommendations', description: 'Show personalized product suggestions' }
                            ].map(pref => (
                                <label
                                    key={pref.key}
                                    className="flex items-center justify-between p-4 rounded-xl border border-border cursor-pointer hover:bg-muted/30 transition-all"
                                >
                                    <div>
                                        <p className="font-medium">{pref.label}</p>
                                        <p className="text-sm text-muted-foreground">{pref.description}</p>
                                    </div>
                                    <div className="relative">
                                        <input
                                            type="checkbox"
                                            checked={settings[pref.key as keyof typeof settings] as boolean}
                                            onChange={(e) => setSettings({ ...settings, [pref.key]: e.target.checked })}
                                            className="sr-only peer"
                                        />
                                        <div className={`w-11 h-6 rounded-full transition-colors ${settings[pref.key as keyof typeof settings] ? 'bg-primary' : 'bg-border'
                                            }`} />
                                        <div className={`absolute left-0.5 top-0.5 w-5 h-5 bg-white rounded-full shadow transition-transform ${settings[pref.key as keyof typeof settings] ? 'translate-x-5' : ''
                                            }`} />
                                    </div>
                                </label>
                            ))}
                        </div>
                    </motion.div>
                </div>

                {/* Save Button - Mobile */}
                <Button
                    onClick={handleSave}
                    disabled={isSaving}
                    className="w-full rounded-xl py-6 mt-6 md:hidden text-base font-semibold"
                >
                    {isSaving ? (
                        <>
                            <Loader2 size={18} className="mr-2 animate-spin" />
                            Saving Changes...
                        </>
                    ) : (
                        <>
                            <Check size={18} className="mr-2" />
                            Save Changes
                        </>
                    )}
                </Button>
            </div>

            <Footer />
        </div>
    );
}
