import React, { useState } from 'react';
import { User, Camera, Mail, Phone, Plus, Check, MapPin, ChevronRight, Shield, Package, Settings, LogOut, CreditCard, Bell, Lock, Home, ShoppingBag, PackageSearch, Info } from 'lucide-react';
import { Link } from 'react-router-dom';
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

export default function EditProfilePage() {
    const [profileData, setProfileData] = useState({
        name: "Sarah Johnson",
        email: "sarah.johnson@gmail.com",
        phone: "+62 812-3456-7890",
        profileImage: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=800&auto=format&fit=crop",
        memberSince: "December 2025",
        isVerified: true,
    });

    const [addresses] = useState([
        {
            id: 1,
            label: "Home",
            name: "Sarah Johnson",
            phone: "+62 812-3456-7890",
            fullAddress: "Jl. Merdeka No. 123, Kec. Gubeng, Surabaya, Jawa Timur 60281",
            isPrimary: true
        },
        {
            id: 2,
            label: "Office",
            name: "Sarah Johnson",
            phone: "+62 812-3456-7890",
            fullAddress: "Jl. Pemuda No. 45, Kec. Tegalsari, Surabaya, Jawa Timur 60264",
            isPrimary: false
        }
    ]);

    const [editingField, setEditingField] = useState<string | null>(null);
    const [tempValue, setTempValue] = useState("");

    const handleEdit = (field: string, value: string) => {
        setEditingField(field);
        setTempValue(value);
    };

    const handleSave = (field: string) => {
        setProfileData({ ...profileData, [field]: tempValue });
        setEditingField(null);
    };

    const handleCancel = () => {
        setEditingField(null);
        setTempValue("");
    };

    const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setProfileData({ ...profileData, profileImage: reader.result as string });
            };
            reader.readAsDataURL(file);
        }
    };

    const menuItems = [
        { icon: Package, label: "My Orders", href: "/orders", badge: "2" },
        { icon: MapPin, label: "Addresses", href: "/addresses" },
        { icon: CreditCard, label: "Payment Methods", href: "/payments" },
        { icon: Bell, label: "Notifications", href: "/notifications" },
        { icon: Lock, label: "Security", href: "/security" },
        { icon: Settings, label: "Settings", href: "/settings" },
    ];

    return (
        <div className="min-h-screen bg-muted/30">
            <NavBar items={navItems} />

            <div className="container px-4 md:px-6 mx-auto max-w-6xl py-8">
                {/* Breadcrumb */}
                <nav className="flex items-center gap-2 text-sm text-muted-foreground mb-6">
                    <Link to="/" className="hover:text-primary transition-colors">Home</Link>
                    <span>/</span>
                    <span className="text-foreground font-medium">My Account</span>
                </nav>

                <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
                    {/* Sidebar */}
                    <div className="lg:col-span-1">
                        <div className="bg-card border border-border rounded-xl p-6">
                            {/* Profile Summary */}
                            <div className="text-center mb-6 pb-6 border-b border-border">
                                <div className="relative w-20 h-20 mx-auto mb-3">
                                    <img
                                        src={profileData.profileImage || ""}
                                        alt={profileData.name}
                                        className="w-full h-full rounded-full object-cover border-4 border-background shadow-lg"
                                    />
                                    {profileData.isVerified && (
                                        <div className="absolute -bottom-1 -right-1 w-6 h-6 bg-blue-500 rounded-full flex items-center justify-center border-2 border-background">
                                            <Check size={12} className="text-white" />
                                        </div>
                                    )}
                                </div>
                                <h3 className="font-semibold">{profileData.name}</h3>
                                <p className="text-sm text-muted-foreground">{profileData.email}</p>
                            </div>

                            {/* Menu */}
                            <nav className="space-y-1">
                                {menuItems.map((item) => (
                                    <Link
                                        key={item.label}
                                        to={item.href}
                                        className="flex items-center justify-between p-3 rounded-lg hover:bg-muted transition-colors group"
                                    >
                                        <div className="flex items-center gap-3">
                                            <item.icon size={18} className="text-muted-foreground group-hover:text-primary transition-colors" />
                                            <span className="text-sm font-medium">{item.label}</span>
                                        </div>
                                        <div className="flex items-center gap-2">
                                            {item.badge && (
                                                <span className="bg-primary text-primary-foreground text-xs px-2 py-0.5 rounded-full">
                                                    {item.badge}
                                                </span>
                                            )}
                                            <ChevronRight size={16} className="text-muted-foreground" />
                                        </div>
                                    </Link>
                                ))}
                                <button className="w-full flex items-center gap-3 p-3 rounded-lg hover:bg-red-50 dark:hover:bg-red-900/20 text-red-600 transition-colors">
                                    <LogOut size={18} />
                                    <span className="text-sm font-medium">Log Out</span>
                                </button>
                            </nav>
                        </div>
                    </div>

                    {/* Main Content */}
                    <div className="lg:col-span-3 space-y-6">
                        {/* Profile Card */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="bg-card border border-border rounded-xl overflow-hidden"
                        >
                            <div className="p-6 border-b border-border">
                                <h2 className="text-lg font-semibold">Profile Information</h2>
                                <p className="text-sm text-muted-foreground">Manage your personal information</p>
                            </div>
                            <div className="p-6">
                                {/* Profile Photo */}
                                <div className="flex items-center gap-6 mb-8 pb-8 border-b border-border">
                                    <div className="relative">
                                        <div className="w-24 h-24 rounded-xl overflow-hidden bg-muted">
                                            {profileData.profileImage ? (
                                                <img
                                                    src={profileData.profileImage}
                                                    alt="Profile"
                                                    className="w-full h-full object-cover"
                                                />
                                            ) : (
                                                <div className="w-full h-full flex items-center justify-center">
                                                    <User size={32} className="text-muted-foreground" />
                                                </div>
                                            )}
                                        </div>
                                        <label className="absolute -bottom-2 -right-2 w-8 h-8 bg-primary rounded-lg flex items-center justify-center cursor-pointer hover:bg-primary/90 transition-colors shadow-lg">
                                            <Camera size={14} className="text-primary-foreground" />
                                            <input
                                                type="file"
                                                accept="image/*"
                                                onChange={handleImageUpload}
                                                className="hidden"
                                            />
                                        </label>
                                    </div>
                                    <div>
                                        <p className="font-medium mb-1">Profile Photo</p>
                                        <p className="text-sm text-muted-foreground mb-3">JPG, PNG or GIF. Max 2MB</p>
                                        <div className="flex gap-2">
                                            <label className="cursor-pointer">
                                                <Button variant="outline" size="sm" className="rounded-lg" asChild>
                                                    <span>Change Photo</span>
                                                </Button>
                                                <input
                                                    type="file"
                                                    accept="image/*"
                                                    onChange={handleImageUpload}
                                                    className="hidden"
                                                />
                                            </label>
                                            {profileData.profileImage && (
                                                <Button
                                                    variant="ghost"
                                                    size="sm"
                                                    className="rounded-lg text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20"
                                                    onClick={() => setProfileData({ ...profileData, profileImage: "" })}
                                                >
                                                    Remove
                                                </Button>
                                            )}
                                        </div>
                                    </div>
                                </div>

                                {/* Form Fields */}
                                <div className="space-y-6">
                                    {/* Name */}
                                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 items-start">
                                        <label className="text-sm font-medium text-muted-foreground pt-2">Full Name</label>
                                        <div className="md:col-span-2">
                                            {editingField === 'name' ? (
                                                <div className="flex gap-2">
                                                    <input
                                                        type="text"
                                                        value={tempValue}
                                                        onChange={(e) => setTempValue(e.target.value)}
                                                        className="flex-1 px-4 py-2 border border-border rounded-lg bg-background focus:outline-none focus:ring-2 focus:ring-primary/30"
                                                        autoFocus
                                                    />
                                                    <Button size="sm" onClick={() => handleSave('name')} className="rounded-lg">Save</Button>
                                                    <Button size="sm" variant="ghost" onClick={handleCancel} className="rounded-lg">Cancel</Button>
                                                </div>
                                            ) : (
                                                <div className="flex items-center justify-between">
                                                    <span className="font-medium">{profileData.name}</span>
                                                    <Button
                                                        variant="ghost"
                                                        size="sm"
                                                        onClick={() => handleEdit('name', profileData.name)}
                                                        className="text-primary rounded-lg"
                                                    >
                                                        Edit
                                                    </Button>
                                                </div>
                                            )}
                                        </div>
                                    </div>

                                    {/* Email */}
                                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 items-start">
                                        <label className="text-sm font-medium text-muted-foreground pt-2">Email</label>
                                        <div className="md:col-span-2">
                                            <div className="flex items-center justify-between">
                                                <div className="flex items-center gap-2">
                                                    <Mail size={16} className="text-muted-foreground" />
                                                    <span className="font-medium">{profileData.email}</span>
                                                    {profileData.isVerified && (
                                                        <span className="bg-green-100 dark:bg-green-900/30 text-green-600 dark:text-green-400 text-xs px-2 py-0.5 rounded-full flex items-center gap-1">
                                                            <Shield size={10} />
                                                            Verified
                                                        </span>
                                                    )}
                                                </div>
                                                <Button variant="ghost" size="sm" className="text-primary rounded-lg">
                                                    Change
                                                </Button>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Phone */}
                                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 items-start">
                                        <label className="text-sm font-medium text-muted-foreground pt-2">Phone</label>
                                        <div className="md:col-span-2">
                                            <div className="flex items-center justify-between">
                                                <div className="flex items-center gap-2">
                                                    <Phone size={16} className="text-muted-foreground" />
                                                    <span className="font-medium">{profileData.phone}</span>
                                                </div>
                                                <Button variant="ghost" size="sm" className="text-primary rounded-lg">
                                                    Change
                                                </Button>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Member Since */}
                                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 items-start">
                                        <label className="text-sm font-medium text-muted-foreground pt-2">Member Since</label>
                                        <div className="md:col-span-2">
                                            <span className="font-medium">{profileData.memberSince}</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </motion.div>

                        {/* Addresses Card */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.1 }}
                            className="bg-card border border-border rounded-xl overflow-hidden"
                        >
                            <div className="p-6 border-b border-border flex items-center justify-between">
                                <div>
                                    <h2 className="text-lg font-semibold">Saved Addresses</h2>
                                    <p className="text-sm text-muted-foreground">Manage your delivery addresses</p>
                                </div>
                                <Link to="/profile/address">
                                    <Button size="sm" className="rounded-lg">
                                        <Plus size={16} className="mr-2" />
                                        Add New
                                    </Button>
                                </Link>
                            </div>
                            <div className="divide-y divide-border">
                                {addresses.map((address) => (
                                    <div key={address.id} className="p-6 hover:bg-muted/50 transition-colors">
                                        <div className="flex items-start justify-between gap-4">
                                            <div className="flex gap-4">
                                                <div className="w-10 h-10 bg-muted rounded-lg flex items-center justify-center flex-shrink-0">
                                                    <MapPin size={18} className="text-muted-foreground" />
                                                </div>
                                                <div>
                                                    <div className="flex items-center gap-2 mb-1">
                                                        <span className="font-medium">{address.label}</span>
                                                        {address.isPrimary && (
                                                            <span className="bg-primary/10 text-primary text-xs px-2 py-0.5 rounded-full">
                                                                Primary
                                                            </span>
                                                        )}
                                                    </div>
                                                    <p className="text-sm text-muted-foreground mb-1">{address.name} • {address.phone}</p>
                                                    <p className="text-sm text-muted-foreground">{address.fullAddress}</p>
                                                </div>
                                            </div>
                                            <Link to="/profile/address" state={{ address }}>
                                                <Button variant="ghost" size="sm" className="text-primary rounded-lg">
                                                    Edit
                                                </Button>
                                            </Link>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </motion.div>
                    </div>
                </div>
            </div>

            <Footer />
        </div>
    );
}