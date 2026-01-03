import React, { useState } from 'react';
import { Navigation, Home, Building, Building2, ChevronLeft, Check, ShoppingBag, PackageSearch, Info, MapPin, Phone, User, AlertCircle, Loader2, Star } from 'lucide-react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from './button';
import MapPicker from './MapPicker';
import { NavBar } from './tubelight-navbar';
import { Component as Footer } from "../footer-taped-design";

const navItems = [
    { name: "Home", url: "/", icon: Home },
    { name: "Shop", url: "#shop", icon: ShoppingBag },
    { name: "Categories", url: "#categories", icon: PackageSearch },
    { name: "About", url: "/about", icon: Info },
];

export default function AddAddressPage() {
    const location = useLocation();
    const navigate = useNavigate();
    const editAddress = location.state?.address || null;
    const isEditMode = !!editAddress;

    const [formData, setFormData] = useState({
        label: editAddress?.label || "Home",
        recipientName: editAddress?.name || "",
        phoneNumber: editAddress?.phone || "",
        province: "",
        city: "",
        district: "",
        subDistrict: "",
        postalCode: "",
        fullAddress: editAddress?.fullAddress || "",
        addressNote: "",
        isPrimary: editAddress?.isPrimary || false
    });

    const [errors, setErrors] = useState<Record<string, string>>({});
    const [isSaving, setIsSaving] = useState(false);
    const [isGettingLocation, setIsGettingLocation] = useState(false);
    const [, setMapLocation] = useState({
        lat: -7.2575,
        lng: 112.7521,
        address: "Surabaya, Jawa Timur"
    });

    const provinces = ["Jawa Timur", "Jawa Barat", "Jawa Tengah", "DKI Jakarta", "Bali"];
    const cities = ["Surabaya", "Sidoarjo", "Gresik", "Malang", "Mojokerto"];
    const districts = ["Gubeng", "Tegalsari", "Genteng", "Wonokromo", "Rungkut"];
    const subDistricts = ["Airlangga", "Gubeng", "Kertajaya", "Pucang Sewu", "Mojo"];

    const labelOptions = [
        { value: 'Home', icon: Home, description: 'Residential address' },
        { value: 'Office', icon: Building, description: 'Workplace address' },
        { value: 'Apartment', icon: Building2, description: 'Apartment or condo' },
    ];


    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
        if (errors[name]) {
            setErrors({ ...errors, [name]: '' });
        }
    };

    const validateForm = () => {
        const newErrors: Record<string, string> = {};

        if (!formData.recipientName.trim()) {
            newErrors.recipientName = 'Recipient name is required';
        }

        if (!formData.phoneNumber.trim()) {
            newErrors.phoneNumber = 'Phone number is required';
        } else if (!/^[\d\s\+\-()]+$/.test(formData.phoneNumber)) {
            newErrors.phoneNumber = 'Invalid phone number format';
        }

        if (!formData.fullAddress.trim()) {
            newErrors.fullAddress = 'Full address is required';
        }

        if (!formData.label) {
            newErrors.label = 'Please select an address label';
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSave = async () => {
        if (!validateForm()) {
            return;
        }

        setIsSaving(true);
        
        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 1000));

        setIsSaving(false);
        
        if (isEditMode) {
            // Show success and navigate
            setTimeout(() => navigate("/profile"), 500);
        } else {
            setTimeout(() => navigate("/profile"), 500);
        }
    };

    const handleUseCurrentLocation = () => {
        if (navigator.geolocation) {
            setIsGettingLocation(true);
            navigator.geolocation.getCurrentPosition(
                (position) => {
                    setMapLocation({
                        lat: position.coords.latitude,
                        lng: position.coords.longitude,
                        address: "Current Location"
                    });
                    setIsGettingLocation(false);
                },
                (error) => {
                    alert('Unable to get location: ' + error.message);
                    setIsGettingLocation(false);
                }
            );
        }
    };

    return (
        <div className="min-h-screen bg-gradient-to-b from-muted/30 to-background">
            <NavBar items={navItems} />

            <div className="container px-4 md:px-6 mx-auto max-w-5xl py-6 md:py-10">
                {/* Breadcrumb */}
                <nav className="flex items-center gap-2 text-sm text-muted-foreground mb-6">
                    <Link to="/" className="hover:text-primary transition-colors">Home</Link>
                    <span>/</span>
                    <Link to="/profile" className="hover:text-primary transition-colors">My Account</Link>
                    <span>/</span>
                    <span className="text-foreground font-medium">{isEditMode ? "Edit Address" : "Add Address"}</span>
                </nav>

                {/* Header */}
                <motion.div 
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="flex items-center justify-between mb-8"
                >
                    <div className="flex items-center gap-4">
                        <button
                            onClick={() => navigate(-1)}
                            className="w-11 h-11 rounded-xl border border-border bg-card flex items-center justify-center hover:bg-muted transition-all hover:scale-105 active:scale-95"
                        >
                            <ChevronLeft size={20} />
                        </button>
                        <div>
                            <h1 className="text-2xl md:text-3xl font-bold tracking-tight">
                                {isEditMode ? "Edit Address" : "Add New Address"}
                            </h1>
                            <p className="text-sm text-muted-foreground mt-1">
                                {isEditMode ? "Update your address details" : "Fill in your delivery details below"}
                            </p>
                        </div>
                    </div>
                    <Button 
                        onClick={handleSave} 
                        disabled={isSaving}
                        className="rounded-xl hidden md:flex px-6 py-6 shadow-lg hover:shadow-xl transition-all"
                    >
                        {isSaving ? (
                            <>
                                <Loader2 size={16} className="mr-2 animate-spin" />
                                Saving...
                            </>
                        ) : (
                            <>
                                <Check size={16} className="mr-2" />
                                {isEditMode ? "Update" : "Save"} Address
                            </>
                        )}
                    </Button>
                </motion.div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                    {/* Form */}
                    <div className="lg:col-span-2 space-y-6">
                        {/* Label Selection */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="bg-card border border-border rounded-2xl p-6 shadow-sm"
                        >
                            <div className="flex items-center gap-2 mb-5">
                                <MapPin className="text-primary" size={20} />
                                <h3 className="font-semibold text-lg">Address Type</h3>
                            </div>
                            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                                {labelOptions.map((option) => {
                                    const Icon = option.icon;
                                    const isSelected = formData.label === option.value;
                                    return (
                                        <button
                                            key={option.value}
                                            onClick={() => setFormData({ ...formData, label: option.value })}
                                            className={`group relative flex flex-col items-center gap-2 px-4 py-4 rounded-xl border-2 transition-all ${isSelected
                                                ? 'border-primary bg-primary/5 shadow-md scale-[1.02]'
                                                : 'border-border bg-background hover:border-primary/50 hover:shadow-sm'
                                                }`}
                                        >
                                            <div className={`p-2 rounded-lg transition-colors ${
                                                isSelected ? 'bg-primary/10' : 'bg-muted group-hover:bg-primary/5'
                                            }`}>
                                                <Icon size={20} className={isSelected ? 'text-primary' : 'text-muted-foreground'} />
                                            </div>
                                            <div className="text-center">
                                                <span className={`font-semibold text-sm block ${isSelected ? 'text-primary' : ''}`}>
                                                    {option.value}
                                                </span>
                                                <span className="text-xs text-muted-foreground block mt-0.5">
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
                            <div className="mt-4">
                                <input
                                    type="text"
                                    placeholder="Or type custom label (e.g., Parent's House)"
                                    value={!['Home', 'Office', 'Apartment'].includes(formData.label) ? formData.label : ''}
                                    onChange={(e) => setFormData({ ...formData, label: e.target.value })}
                                    className="w-full px-4 py-3 border border-border rounded-xl bg-background text-sm focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary"
                                />
                            </div>
                            <AnimatePresence>
                                {errors.label && (
                                    <motion.div
                                        initial={{ opacity: 0, y: -10 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        exit={{ opacity: 0, y: -10 }}
                                        className="flex items-center gap-2 mt-3 text-red-500 text-sm"
                                    >
                                        <AlertCircle size={14} />
                                        <span>{errors.label}</span>
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </motion.div>

                        {/* Contact Info */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.1 }}
                            className="bg-card border border-border rounded-2xl p-6 shadow-sm"
                        >
                            <div className="flex items-center gap-2 mb-5">
                                <User className="text-primary" size={20} />
                                <h3 className="font-semibold text-lg">Contact Information</h3>
                            </div>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div>
                                    <label className="text-sm font-medium mb-2 flex items-center gap-1">
                                        Recipient Name <span className="text-red-500">*</span>
                                    </label>
                                    <div className="relative">
                                        <User className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" size={16} />
                                        <input
                                            type="text"
                                            name="recipientName"
                                            value={formData.recipientName}
                                            onChange={handleInputChange}
                                            placeholder="Enter full name"
                                            className={`w-full pl-10 pr-4 py-3 border rounded-xl bg-background focus:outline-none focus:ring-2 transition-all ${
                                                errors.recipientName 
                                                    ? 'border-red-500 focus:ring-red-200' 
                                                    : 'border-border focus:ring-primary/30 focus:border-primary'
                                            }`}
                                        />
                                    </div>
                                    <AnimatePresence>
                                        {errors.recipientName && (
                                            <motion.div
                                                initial={{ opacity: 0, y: -10 }}
                                                animate={{ opacity: 1, y: 0 }}
                                                exit={{ opacity: 0, y: -10 }}
                                                className="flex items-center gap-1 mt-2 text-red-500 text-xs"
                                            >
                                                <AlertCircle size={12} />
                                                <span>{errors.recipientName}</span>
                                            </motion.div>
                                        )}
                                    </AnimatePresence>
                                </div>
                                <div>
                                    <label className="text-sm font-medium mb-2 flex items-center gap-1">
                                        Phone Number <span className="text-red-500">*</span>
                                    </label>
                                    <div className="relative">
                                        <Phone className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" size={16} />
                                        <input
                                            type="tel"
                                            name="phoneNumber"
                                            value={formData.phoneNumber}
                                            onChange={handleInputChange}
                                            placeholder="+62 812-3456-7890"
                                            className={`w-full pl-10 pr-4 py-3 border rounded-xl bg-background focus:outline-none focus:ring-2 transition-all ${
                                                errors.phoneNumber 
                                                    ? 'border-red-500 focus:ring-red-200' 
                                                    : 'border-border focus:ring-primary/30 focus:border-primary'
                                            }`}
                                        />
                                    </div>
                                    <AnimatePresence>
                                        {errors.phoneNumber && (
                                            <motion.div
                                                initial={{ opacity: 0, y: -10 }}
                                                animate={{ opacity: 1, y: 0 }}
                                                exit={{ opacity: 0, y: -10 }}
                                                className="flex items-center gap-1 mt-2 text-red-500 text-xs"
                                            >
                                                <AlertCircle size={12} />
                                                <span>{errors.phoneNumber}</span>
                                            </motion.div>
                                        )}
                                    </AnimatePresence>
                                </div>
                            </div>
                        </motion.div>

                        {/* Address Details */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.2 }}
                            className="bg-card border border-border rounded-2xl p-6 shadow-sm"
                        >
                            <div className="flex items-center gap-2 mb-5">
                                <Building size={20} className="text-primary" />
                                <h3 className="font-semibold text-lg">Address Details</h3>
                            </div>
                            <div className="space-y-4">
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <div>
                                        <label className="block text-sm font-medium mb-2">Province</label>
                                        <select
                                            name="province"
                                            value={formData.province}
                                            onChange={handleInputChange}
                                            className="w-full px-4 py-3 border border-border rounded-xl bg-background focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary cursor-pointer transition-all"
                                        >
                                            <option value="">Select province</option>
                                            {provinces.map(prov => (
                                                <option key={prov} value={prov}>{prov}</option>
                                            ))}
                                        </select>
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium mb-2">City</label>
                                        <select
                                            name="city"
                                            value={formData.city}
                                            onChange={handleInputChange}
                                            className="w-full px-4 py-3 border border-border rounded-xl bg-background focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary cursor-pointer transition-all"
                                        >
                                            <option value="">Select city</option>
                                            {cities.map(city => (
                                                <option key={city} value={city}>{city}</option>
                                            ))}
                                        </select>
                                    </div>
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                    <div>
                                        <label className="block text-sm font-medium mb-2">District</label>
                                        <select
                                            name="district"
                                            value={formData.district}
                                            onChange={handleInputChange}
                                            className="w-full px-4 py-3 border border-border rounded-xl bg-background focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary cursor-pointer transition-all"
                                        >
                                            <option value="">Select district</option>
                                            {districts.map(dist => (
                                                <option key={dist} value={dist}>{dist}</option>
                                            ))}
                                        </select>
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium mb-2">Sub-district</label>
                                        <select
                                            name="subDistrict"
                                            value={formData.subDistrict}
                                            onChange={handleInputChange}
                                            className="w-full px-4 py-3 border border-border rounded-xl bg-background focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary cursor-pointer transition-all"
                                        >
                                            <option value="">Select sub-district</option>
                                            {subDistricts.map(sub => (
                                                <option key={sub} value={sub}>{sub}</option>
                                            ))}
                                        </select>
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium mb-2">Postal Code</label>
                                        <input
                                            type="text"
                                            name="postalCode"
                                            value={formData.postalCode}
                                            onChange={handleInputChange}
                                            placeholder="e.g. 60281"
                                            maxLength={5}
                                            className="w-full px-4 py-3 border border-border rounded-xl bg-background focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary transition-all"
                                        />
                                    </div>
                                </div>

                                <div>
                                    <label className="block text-sm font-medium mb-2">
                                        Street Address <span className="text-red-500">*</span>
                                    </label>
                                    <textarea
                                        name="fullAddress"
                                        value={formData.fullAddress}
                                        onChange={handleInputChange}
                                        placeholder="Enter your complete street address including building number, street name, block/unit"
                                        rows={3}
                                        className={`w-full px-4 py-3 border rounded-xl bg-background focus:outline-none focus:ring-2 resize-none transition-all ${
                                            errors.fullAddress 
                                                ? 'border-red-500 focus:ring-red-200' 
                                                : 'border-border focus:ring-primary/30 focus:border-primary'
                                        }`}
                                    />
                                    <AnimatePresence>
                                        {errors.fullAddress && (
                                            <motion.div
                                                initial={{ opacity: 0, y: -10 }}
                                                animate={{ opacity: 1, y: 0 }}
                                                exit={{ opacity: 0, y: -10 }}
                                                className="flex items-center gap-1 mt-2 text-red-500 text-xs"
                                            >
                                                <AlertCircle size={12} />
                                                <span>{errors.fullAddress}</span>
                                            </motion.div>
                                        )}
                                    </AnimatePresence>
                                </div>

                                <div>
                                    <label className="block text-sm font-medium mb-2">
                                        Address Note 
                                        <span className="text-muted-foreground font-normal ml-1">(Optional)</span>
                                    </label>
                                    <div className="relative">
                                        <input
                                            type="text"
                                            name="addressNote"
                                            value={formData.addressNote}
                                            onChange={handleInputChange}
                                            placeholder="e.g., Near the mall, next to gas station, behind the park"
                                            className="w-full px-4 py-3 border border-border rounded-xl bg-background focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary transition-all"
                                        />
                                    </div>
                                    <p className="text-xs text-muted-foreground mt-2">
                                        Help our courier find your location more easily
                                    </p>
                                </div>
                            </div>
                        </motion.div>

                        {/* Primary Toggle - Mobile */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.3 }}
                            className="bg-gradient-to-br from-primary/5 to-primary/10 border-2 border-primary/20 rounded-2xl p-6 lg:hidden"
                        >
                            <label className="flex items-center justify-between cursor-pointer group">
                                <div className="flex items-center gap-3">
                                    <div className="p-2 bg-primary/10 rounded-lg">
                                        <Star className="text-primary" size={20} />
                                    </div>
                                    <div>
                                        <p className="font-semibold">Set as primary address</p>
                                        <p className="text-sm text-muted-foreground">Use as default shipping address</p>
                                    </div>
                                </div>
                                <div className="relative">
                                    <input
                                        type="checkbox"
                                        checked={formData.isPrimary}
                                        onChange={(e) => setFormData({ ...formData, isPrimary: e.target.checked })}
                                        className="sr-only peer"
                                    />
                                    <div className="w-14 h-7 bg-border/50 rounded-full peer peer-checked:bg-primary transition-colors" />
                                    <div className="absolute left-1 top-1 w-5 h-5 bg-white rounded-full shadow-lg peer-checked:translate-x-7 transition-transform" />
                                </div>
                            </label>
                        </motion.div>

                        {/* Save Button - Mobile */}
                        <Button 
                            onClick={handleSave} 
                            disabled={isSaving}
                            className="w-full rounded-xl py-6 md:hidden text-base font-semibold shadow-lg hover:shadow-xl transition-all"
                        >
                            {isSaving ? (
                                <>
                                    <Loader2 size={18} className="mr-2 animate-spin" />
                                    Saving Address...
                                </>
                            ) : (
                                <>
                                    <Check size={18} className="mr-2" />
                                    {isEditMode ? "Update" : "Save"} Address
                                </>
                            )}
                        </Button>
                    </div>

                    {/* Sidebar */}
                    <div className="lg:col-span-1 space-y-6">
                        {/* Map */}
                        <motion.div
                            initial={{ opacity: 0, x: 20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: 0.2 }}
                            className="bg-card border border-border rounded-2xl overflow-hidden sticky top-24 shadow-sm"
                        >
                            <div className="bg-gradient-to-r from-primary/10 to-primary/5 p-5 border-b border-border">
                                <div className="flex items-center gap-2">
                                    <div className="p-2 bg-primary/10 rounded-lg">
                                        <MapPin className="text-primary" size={18} />
                                    </div>
                                    <div>
                                        <h3 className="font-semibold">Pin Location</h3>
                                        <p className="text-xs text-muted-foreground">Drag marker to adjust</p>
                                    </div>
                                </div>
                            </div>
                            <div className="h-72 relative">
                                <MapPicker
                                    onSelectLocation={(data) => {
                                        setMapLocation({
                                            lat: data.lat,
                                            lng: data.lng,
                                            address: data.address,
                                        });
                                        setFormData(prev => ({
                                            ...prev,
                                            fullAddress: data.address,
                                        }));
                                    }}
                                />
                            </div>
                            <div className="p-4 bg-muted/30 border-t border-border">
                                <Button
                                    variant="outline"
                                    size="sm"
                                    onClick={handleUseCurrentLocation}
                                    disabled={isGettingLocation}
                                    className="w-full rounded-xl border-primary/20 hover:bg-primary/5 hover:border-primary transition-all"
                                >
                                    {isGettingLocation ? (
                                        <>
                                            <Loader2 size={14} className="mr-2 animate-spin" />
                                            Getting location...
                                        </>
                                    ) : (
                                        <>
                                            <Navigation size={14} className="mr-2" />
                                            Use Current Location
                                        </>
                                    )}
                                </Button>
                            </div>
                        </motion.div>

                        {/* Set Primary - Desktop */}
                        <motion.div
                            initial={{ opacity: 0, x: 20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: 0.3 }}
                            className="bg-gradient-to-br from-primary/5 to-primary/10 border-2 border-primary/20 rounded-2xl p-5 hidden lg:block shadow-sm"
                        >
                            <label className="flex items-start gap-3 cursor-pointer group">
                                <div className="relative mt-0.5">
                                    <input
                                        type="checkbox"
                                        checked={formData.isPrimary}
                                        onChange={(e) => setFormData({ ...formData, isPrimary: e.target.checked })}
                                        className="sr-only peer"
                                    />
                                    <div className="w-6 h-6 border-2 border-primary/30 rounded-lg peer-checked:border-primary peer-checked:bg-primary transition-all flex items-center justify-center group-hover:border-primary/50">
                                        {formData.isPrimary && (
                                            <motion.div
                                                initial={{ scale: 0 }}
                                                animate={{ scale: 1 }}
                                            >
                                                <Check size={14} className="text-white" />
                                            </motion.div>
                                        )}
                                    </div>
                                </div>
                                <div>
                                    <div className="flex items-center gap-2 mb-1">
                                        <Star size={16} className="text-primary" />
                                        <p className="font-semibold text-sm">Set as primary address</p>
                                    </div>
                                    <p className="text-xs text-muted-foreground leading-relaxed">
                                        This will be your default shipping address for all future orders
                                    </p>
                                </div>
                            </label>
                        </motion.div>

                        {/* Info Card */}
                        <motion.div
                            initial={{ opacity: 0, x: 20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: 0.4 }}
                            className="bg-blue-50 dark:bg-blue-950/20 border border-blue-200 dark:border-blue-900 rounded-2xl p-4 hidden lg:block"
                        >
                            <div className="flex gap-3">
                                <Info className="text-blue-500 flex-shrink-0 mt-0.5" size={18} />
                                <div className="text-xs text-blue-900 dark:text-blue-100 space-y-2">
                                    <p className="font-medium">Tips for accurate delivery:</p>
                                    <ul className="space-y-1 list-disc list-inside text-blue-800 dark:text-blue-200">
                                        <li>Include landmark information</li>
                                        <li>Specify building/floor number</li>
                                        <li>Add any gate codes if applicable</li>
                                    </ul>
                                </div>
                            </div>
                        </motion.div>
                    </div>
                </div>
            </div>

            <Footer />
        </div>
    );
}