import React, { useState } from 'react';
import { ChevronLeft, Bell, Mail, MessageSquare, Package, ShoppingBag as ShoppingBagIcon, Star, Home, ShoppingBag, PackageSearch, Info } from 'lucide-react';
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

interface NotificationSettings {
    orderUpdates: {
        email: boolean;
        push: boolean;
        sms: boolean;
    };
    promotions: {
        email: boolean;
        push: boolean;
    };
    newsletter: {
        email: boolean;
    };
    reviews: {
        email: boolean;
        push: boolean;
    };
}

export default function NotificationsPage() {
    const navigate = useNavigate();
    const [settings, setSettings] = useState<NotificationSettings>({
        orderUpdates: { email: true, push: true, sms: true },
        promotions: { email: true, push: false },
        newsletter: { email: true },
        reviews: { email: true, push: true }
    });

    const [isSaving, setIsSaving] = useState(false);

    const handleToggle = (category: keyof NotificationSettings, channel: string) => {
        setSettings(prev => ({
            ...prev,
            [category]: {
                ...prev[category],
                [channel]: !prev[category][channel as keyof typeof prev[typeof category]]
            }
        }));
    };

    const handleSave = async () => {
        setIsSaving(true);
        await new Promise(resolve => setTimeout(resolve, 1000));
        setIsSaving(false);
    };

    const notificationCategories = [
        {
            key: 'orderUpdates' as keyof NotificationSettings,
            icon: Package,
            title: 'Order Updates',
            description: 'Get notified about your order status, shipping, and delivery',
            channels: ['email', 'push', 'sms']
        },
        {
            key: 'promotions' as keyof NotificationSettings,
            icon: Star,
            title: 'Promotions & Offers',
            description: 'Receive special deals, discounts, and exclusive offers',
            channels: ['email', 'push']
        },
        {
            key: 'newsletter' as keyof NotificationSettings,
            icon: Mail,
            title: 'Newsletter',
            description: 'Stay updated with our latest products and news',
            channels: ['email']
        },
        {
            key: 'reviews' as keyof NotificationSettings,
            icon: MessageSquare,
            title: 'Reviews & Feedback',
            description: 'Reminders to review your purchases and respond to feedback',
            channels: ['email', 'push']
        }
    ];

    const channelLabels = {
        email: { label: 'Email', icon: Mail },
        push: { label: 'Push', icon: Bell },
        sms: { label: 'SMS', icon: MessageSquare }
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
                    <span className="text-foreground font-medium">Notifications</span>
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
                            <h1 className="text-2xl md:text-3xl font-bold tracking-tight">Notification Settings</h1>
                            <p className="text-sm text-muted-foreground mt-1">
                                Choose how you want to be notified
                            </p>
                        </div>
                    </div>
                    <Button onClick={handleSave} disabled={isSaving} className="rounded-xl hidden md:flex">
                        {isSaving ? 'Saving...' : 'Save Changes'}
                    </Button>
                </motion.div>

                {/* Notification Categories */}
                <div className="space-y-6">
                    {notificationCategories.map((category, index) => {
                        const CategoryIcon = category.icon;
                        return (
                            <motion.div
                                key={category.key}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: index * 0.1 }}
                                className="bg-card border border-border rounded-2xl p-6 shadow-sm"
                            >
                                <div className="flex items-start gap-4 mb-4">
                                    <div className="p-3 bg-primary/10 rounded-xl">
                                        <CategoryIcon className="text-primary" size={24} />
                                    </div>
                                    <div className="flex-1">
                                        <h3 className="font-semibold text-lg mb-1">{category.title}</h3>
                                        <p className="text-sm text-muted-foreground">{category.description}</p>
                                    </div>
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-4 border-t border-border">
                                    {category.channels.map(channel => {
                                        const ChannelIcon = channelLabels[channel as keyof typeof channelLabels].icon;
                                        const isEnabled = settings[category.key][channel as keyof typeof settings[typeof category.key]];

                                        return (
                                            <label
                                                key={channel}
                                                className={`flex items-center justify-between p-4 rounded-xl border-2 cursor-pointer transition-all ${isEnabled
                                                    ? 'border-primary bg-primary/5'
                                                    : 'border-border hover:border-primary/50'
                                                    }`}
                                            >
                                                <div className="flex items-center gap-3">
                                                    <ChannelIcon size={18} className={isEnabled ? 'text-primary' : 'text-muted-foreground'} />
                                                    <span className={`font-medium ${isEnabled ? 'text-primary' : ''}`}>
                                                        {channelLabels[channel as keyof typeof channelLabels].label}
                                                    </span>
                                                </div>
                                                <div className="relative">
                                                    <input
                                                        type="checkbox"
                                                        checked={isEnabled}
                                                        onChange={() => handleToggle(category.key, channel)}
                                                        className="sr-only peer"
                                                    />
                                                    <div className={`w-11 h-6 rounded-full transition-colors ${isEnabled ? 'bg-primary' : 'bg-border'
                                                        }`} />
                                                    <div className={`absolute left-0.5 top-0.5 w-5 h-5 bg-white rounded-full shadow transition-transform ${isEnabled ? 'translate-x-5' : ''
                                                        }`} />
                                                </div>
                                            </label>
                                        );
                                    })}
                                </div>
                            </motion.div>
                        );
                    })}
                </div>

                {/* Save Button - Mobile */}
                <Button
                    onClick={handleSave}
                    disabled={isSaving}
                    className="w-full rounded-xl py-6 mt-6 md:hidden text-base font-semibold"
                >
                    {isSaving ? 'Saving Changes...' : 'Save Changes'}
                </Button>
            </div>

            <Footer />
        </div>
    );
}
