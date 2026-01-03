import React, { useState } from 'react';
import { ChevronLeft, Lock, Eye, EyeOff, Shield, Smartphone, Key, AlertTriangle, Check, Home, ShoppingBag, PackageSearch, Info, Loader2 } from 'lucide-react';
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

export default function SecurityPage() {
    const navigate = useNavigate();
    const [showCurrentPassword, setShowCurrentPassword] = useState(false);
    const [showNewPassword, setShowNewPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [isSaving, setIsSaving] = useState(false);
    const [twoFactorEnabled, setTwoFactorEnabled] = useState(false);

    const [passwordForm, setPasswordForm] = useState({
        currentPassword: '',
        newPassword: '',
        confirmPassword: ''
    });

    const [errors, setErrors] = useState<Record<string, string>>({});

    const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setPasswordForm(prev => ({ ...prev, [name]: value }));
        if (errors[name]) {
            setErrors(prev => ({ ...prev, [name]: '' }));
        }
    };

    const validatePassword = () => {
        const newErrors: Record<string, string> = {};

        if (!passwordForm.currentPassword) {
            newErrors.currentPassword = 'Current password is required';
        }

        if (!passwordForm.newPassword) {
            newErrors.newPassword = 'New password is required';
        } else if (passwordForm.newPassword.length < 8) {
            newErrors.newPassword = 'Password must be at least 8 characters';
        }

        if (passwordForm.newPassword !== passwordForm.confirmPassword) {
            newErrors.confirmPassword = 'Passwords do not match';
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = async () => {
        if (!validatePassword()) return;

        setIsSaving(true);
        await new Promise(resolve => setTimeout(resolve, 1500));
        setIsSaving(false);
        setPasswordForm({ currentPassword: '', newPassword: '', confirmPassword: '' });
    };

    const passwordStrength = (password: string) => {
        if (!password) return { strength: 0, label: '', color: '' };
        let strength = 0;
        if (password.length >= 8) strength++;
        if (/[a-z]/.test(password) && /[A-Z]/.test(password)) strength++;
        if (/\d/.test(password)) strength++;
        if (/[^a-zA-Z\d]/.test(password)) strength++;

        if (strength <= 1) return { strength, label: 'Weak', color: 'bg-red-500' };
        if (strength === 2) return { strength, label: 'Fair', color: 'bg-yellow-500' };
        if (strength === 3) return { strength, label: 'Good', color: 'bg-blue-500' };
        return { strength, label: 'Strong', color: 'bg-green-500' };
    };

    const strength = passwordStrength(passwordForm.newPassword);

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
                    <span className="text-foreground font-medium">Security</span>
                </nav>

                {/* Header */}
                <motion.div
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="flex items-center gap-4 mb-8"
                >
                    <button
                        onClick={() => navigate('/profile')}
                        className="w-11 h-11 rounded-xl border border-border bg-card flex items-center justify-center hover:bg-muted transition-all hover:scale-105 active:scale-95"
                    >
                        <ChevronLeft size={20} />
                    </button>
                    <div>
                        <h1 className="text-2xl md:text-3xl font-bold tracking-tight">Security Settings</h1>
                        <p className="text-sm text-muted-foreground mt-1">
                            Manage your password and security preferences
                        </p>
                    </div>
                </motion.div>

                <div className="space-y-6">
                    {/* Change Password */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="bg-card border border-border rounded-2xl p-6 shadow-sm"
                    >
                        <div className="flex items-center gap-3 mb-6">
                            <div className="p-3 bg-primary/10 rounded-xl">
                                <Key className="text-primary" size={24} />
                            </div>
                            <div>
                                <h3 className="font-semibold text-lg">Change Password</h3>
                                <p className="text-sm text-muted-foreground">Update your password regularly to keep your account secure</p>
                            </div>
                        </div>

                        <div className="space-y-4">
                            {/* Current Password */}
                            <div>
                                <label className="block text-sm font-medium mb-2">
                                    Current Password <span className="text-red-500">*</span>
                                </label>
                                <div className="relative">
                                    <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" size={16} />
                                    <input
                                        type={showCurrentPassword ? 'text' : 'password'}
                                        name="currentPassword"
                                        value={passwordForm.currentPassword}
                                        onChange={handlePasswordChange}
                                        placeholder="Enter current password"
                                        className={`w-full pl-10 pr-12 py-3 border rounded-xl bg-background focus:outline-none focus:ring-2 transition-all ${errors.currentPassword
                                            ? 'border-red-500 focus:ring-red-200'
                                            : 'border-border focus:ring-primary/30 focus:border-primary'
                                            }`}
                                    />
                                    <button
                                        type="button"
                                        onClick={() => setShowCurrentPassword(!showCurrentPassword)}
                                        className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                                    >
                                        {showCurrentPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                                    </button>
                                </div>
                                <AnimatePresence>
                                    {errors.currentPassword && (
                                        <motion.p
                                            initial={{ opacity: 0, y: -10 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            exit={{ opacity: 0 }}
                                            className="text-red-500 text-xs mt-2 flex items-center gap-1"
                                        >
                                            <AlertTriangle size={12} />
                                            {errors.currentPassword}
                                        </motion.p>
                                    )}
                                </AnimatePresence>
                            </div>

                            {/* New Password */}
                            <div>
                                <label className="block text-sm font-medium mb-2">
                                    New Password <span className="text-red-500">*</span>
                                </label>
                                <div className="relative">
                                    <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" size={16} />
                                    <input
                                        type={showNewPassword ? 'text' : 'password'}
                                        name="newPassword"
                                        value={passwordForm.newPassword}
                                        onChange={handlePasswordChange}
                                        placeholder="Enter new password"
                                        className={`w-full pl-10 pr-12 py-3 border rounded-xl bg-background focus:outline-none focus:ring-2 transition-all ${errors.newPassword
                                            ? 'border-red-500 focus:ring-red-200'
                                            : 'border-border focus:ring-primary/30 focus:border-primary'
                                            }`}
                                    />
                                    <button
                                        type="button"
                                        onClick={() => setShowNewPassword(!showNewPassword)}
                                        className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                                    >
                                        {showNewPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                                    </button>
                                </div>
                                {passwordForm.newPassword && (
                                    <motion.div
                                        initial={{ opacity: 0 }}
                                        animate={{ opacity: 1 }}
                                        className="mt-2"
                                    >
                                        <div className="flex items-center gap-2 mb-1">
                                            <div className="flex-1 h-1.5 bg-muted rounded-full overflow-hidden">
                                                <motion.div
                                                    initial={{ width: 0 }}
                                                    animate={{ width: `${(strength.strength / 4) * 100}%` }}
                                                    className={`h-full ${strength.color}`}
                                                />
                                            </div>
                                            <span className="text-xs font-medium">{strength.label}</span>
                                        </div>
                                    </motion.div>
                                )}
                                <AnimatePresence>
                                    {errors.newPassword && (
                                        <motion.p
                                            initial={{ opacity: 0, y: -10 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            exit={{ opacity: 0 }}
                                            className="text-red-500 text-xs mt-2 flex items-center gap-1"
                                        >
                                            <AlertTriangle size={12} />
                                            {errors.newPassword}
                                        </motion.p>
                                    )}
                                </AnimatePresence>
                            </div>

                            {/* Confirm Password */}
                            <div>
                                <label className="block text-sm font-medium mb-2">
                                    Confirm New Password <span className="text-red-500">*</span>
                                </label>
                                <div className="relative">
                                    <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" size={16} />
                                    <input
                                        type={showConfirmPassword ? 'text' : 'password'}
                                        name="confirmPassword"
                                        value={passwordForm.confirmPassword}
                                        onChange={handlePasswordChange}
                                        placeholder="Confirm new password"
                                        className={`w-full pl-10 pr-12 py-3 border rounded-xl bg-background focus:outline-none focus:ring-2 transition-all ${errors.confirmPassword
                                            ? 'border-red-500 focus:ring-red-200'
                                            : 'border-border focus:ring-primary/30 focus:border-primary'
                                            }`}
                                    />
                                    <button
                                        type="button"
                                        onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                                        className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                                    >
                                        {showConfirmPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                                    </button>
                                </div>
                                <AnimatePresence>
                                    {errors.confirmPassword && (
                                        <motion.p
                                            initial={{ opacity: 0, y: -10 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            exit={{ opacity: 0 }}
                                            className="text-red-500 text-xs mt-2 flex items-center gap-1"
                                        >
                                            <AlertTriangle size={12} />
                                            {errors.confirmPassword}
                                        </motion.p>
                                    )}
                                </AnimatePresence>
                            </div>

                            <Button
                                onClick={handleSubmit}
                                disabled={isSaving}
                                className="w-full md:w-auto rounded-xl px-6"
                            >
                                {isSaving ? (
                                    <>
                                        <Loader2 size={16} className="mr-2 animate-spin" />
                                        Updating Password...
                                    </>
                                ) : (
                                    <>
                                        <Check size={16} className="mr-2" />
                                        Update Password
                                    </>
                                )}
                            </Button>
                        </div>
                    </motion.div>

                    {/* Two-Factor Authentication */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.1 }}
                        className="bg-card border border-border rounded-2xl p-6 shadow-sm"
                    >
                        <div className="flex items-start justify-between">
                            <div className="flex items-start gap-3">
                                <div className="p-3 bg-green-500/10 rounded-xl">
                                    <Smartphone className="text-green-600" size={24} />
                                </div>
                                <div>
                                    <h3 className="font-semibold text-lg mb-1">Two-Factor Authentication</h3>
                                    <p className="text-sm text-muted-foreground mb-4">
                                        Add an extra layer of security to your account
                                    </p>
                                    {twoFactorEnabled && (
                                        <div className="flex items-center gap-2 text-green-600 text-sm">
                                            <Check size={16} />
                                            <span className="font-medium">Enabled</span>
                                        </div>
                                    )}
                                </div>
                            </div>
                            <div className="relative">
                                <input
                                    type="checkbox"
                                    checked={twoFactorEnabled}
                                    onChange={(e) => setTwoFactorEnabled(e.target.checked)}
                                    className="sr-only peer"
                                />
                                <div className={`w-14 h-7 rounded-full transition-colors ${twoFactorEnabled ? 'bg-primary' : 'bg-border'
                                    }`} />
                                <div className={`absolute left-1 top-1 w-5 h-5 bg-white rounded-full shadow transition-transform ${twoFactorEnabled ? 'translate-x-7' : ''
                                    }`} />
                            </div>
                        </div>
                    </motion.div>

                    {/* Security Tips */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2 }}
                        className="bg-blue-50 dark:bg-blue-950/20 border border-blue-200 dark:border-blue-900 rounded-2xl p-6"
                    >
                        <div className="flex gap-3">
                            <Shield className="text-blue-500 flex-shrink-0 mt-0.5" size={24} />
                            <div>
                                <h4 className="font-semibold text-blue-900 dark:text-blue-100 mb-3">Security Tips</h4>
                                <ul className="space-y-2 text-sm text-blue-800 dark:text-blue-200">
                                    <li className="flex items-start gap-2">
                                        <span className="text-blue-500 mt-0.5">•</span>
                                        <span>Use a strong password with at least 8 characters</span>
                                    </li>
                                    <li className="flex items-start gap-2">
                                        <span className="text-blue-500 mt-0.5">•</span>
                                        <span>Include uppercase, lowercase, numbers, and special characters</span>
                                    </li>
                                    <li className="flex items-start gap-2">
                                        <span className="text-blue-500 mt-0.5">•</span>
                                        <span>Never share your password with anyone</span>
                                    </li>
                                    <li className="flex items-start gap-2">
                                        <span className="text-blue-500 mt-0.5">•</span>
                                        <span>Enable two-factor authentication for extra security</span>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </motion.div>
                </div>
            </div>

            <Footer />
        </div>
    );
}
