import React, { useState } from 'react';
import { Navigation, Home, Building, Building2, ChevronLeft, Check, ShoppingBag, PackageSearch, Info } from 'lucide-react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
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
        { value: 'Home', icon: Home },
        { value: 'Office', icon: Building },
        { value: 'Apartment', icon: Building2 },
    ];

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSave = () => {
        if (!formData.recipientName || !formData.phoneNumber || !formData.fullAddress) {
            alert('Please fill in all required fields');
            return;
        }

        if (isEditMode) {
            alert("Address updated successfully!");
        } else {
            alert("Address saved successfully!");
        }

        navigate("/profile");
    };

    const handleUseCurrentLocation = () => {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(
                (position) => {
                    setMapLocation({
                        lat: position.coords.latitude,
                        lng: position.coords.longitude,
                        address: "Current Location"
                    });
                },
                (error) => {
                    alert('Unable to get location: ' + error.message);
                }
            );
        }
    };

    return (
        <div className="min-h-screen bg-muted/30">
            <NavBar items={navItems} />

            <div className="container px-4 md:px-6 mx-auto max-w-4xl py-8">
                {/* Breadcrumb */}
                <nav className="flex items-center gap-2 text-sm text-muted-foreground mb-6">
                    <Link to="/" className="hover:text-primary transition-colors">Home</Link>
                    <span>/</span>
                    <Link to="/profile" className="hover:text-primary transition-colors">My Account</Link>
                    <span>/</span>
                    <span className="text-foreground font-medium">{isEditMode ? "Edit Address" : "Add Address"}</span>
                </nav>

                {/* Header */}
                <div className="flex items-center justify-between mb-8">
                    <div className="flex items-center gap-4">
                        <button
                            onClick={() => navigate(-1)}
                            className="w-10 h-10 rounded-lg border border-border bg-card flex items-center justify-center hover:bg-muted transition-colors"
                        >
                            <ChevronLeft size={20} />
                        </button>
                        <div>
                            <h1 className="text-2xl font-bold">{isEditMode ? "Edit Address" : "Add New Address"}</h1>
                            <p className="text-sm text-muted-foreground">Fill in the details below</p>
                        </div>
                    </div>
                    <Button onClick={handleSave} className="rounded-lg hidden md:flex">
                        <Check size={16} className="mr-2" />
                        {isEditMode ? "Update" : "Save"} Address
                    </Button>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                    {/* Form */}
                    <div className="lg:col-span-2 space-y-6">
                        {/* Label Selection */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="bg-card border border-border rounded-xl p-6"
                        >
                            <h3 className="font-semibold mb-4">Address Label</h3>
                            <div className="flex flex-wrap gap-3">
                                {labelOptions.map((option) => {
                                    const Icon = option.icon;
                                    const isSelected = formData.label === option.value;
                                    return (
                                        <button
                                            key={option.value}
                                            onClick={() => setFormData({ ...formData, label: option.value })}
                                            className={`flex items-center gap-2 px-4 py-2.5 rounded-lg border transition-all ${isSelected
                                                ? 'border-primary bg-primary/5 text-primary'
                                                : 'border-border bg-background hover:border-primary/50'
                                                }`}
                                        >
                                            <Icon size={18} />
                                            <span className="font-medium">{option.value}</span>
                                            {isSelected && <Check size={16} />}
                                        </button>
                                    );
                                })}
                                <input
                                    type="text"
                                    placeholder="Other"
                                    value={!['Home', 'Office', 'Apartment'].includes(formData.label) ? formData.label : ''}
                                    onChange={(e) => setFormData({ ...formData, label: e.target.value })}
                                    className="px-4 py-2.5 border border-border rounded-lg bg-background text-sm focus:outline-none focus:ring-2 focus:ring-primary/30 w-32"
                                />
                            </div>
                        </motion.div>

                        {/* Contact Info */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.1 }}
                            className="bg-card border border-border rounded-xl p-6"
                        >
                            <h3 className="font-semibold mb-4">Contact Information</h3>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-sm font-medium mb-2">
                                        Recipient Name <span className="text-red-500">*</span>
                                    </label>
                                    <input
                                        type="text"
                                        name="recipientName"
                                        value={formData.recipientName}
                                        onChange={handleInputChange}
                                        placeholder="Enter full name"
                                        className="w-full px-4 py-2.5 border border-border rounded-lg bg-background focus:outline-none focus:ring-2 focus:ring-primary/30"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium mb-2">
                                        Phone Number <span className="text-red-500">*</span>
                                    </label>
                                    <input
                                        type="tel"
                                        name="phoneNumber"
                                        value={formData.phoneNumber}
                                        onChange={handleInputChange}
                                        placeholder="+62"
                                        className="w-full px-4 py-2.5 border border-border rounded-lg bg-background focus:outline-none focus:ring-2 focus:ring-primary/30"
                                    />
                                </div>
                            </div>
                        </motion.div>

                        {/* Address Details */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.2 }}
                            className="bg-card border border-border rounded-xl p-6"
                        >
                            <h3 className="font-semibold mb-4">Address Details</h3>
                            <div className="space-y-4">
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <div>
                                        <label className="block text-sm font-medium mb-2">Province</label>
                                        <select
                                            name="province"
                                            value={formData.province}
                                            onChange={handleInputChange}
                                            className="w-full px-4 py-2.5 border border-border rounded-lg bg-background focus:outline-none focus:ring-2 focus:ring-primary/30"
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
                                            className="w-full px-4 py-2.5 border border-border rounded-lg bg-background focus:outline-none focus:ring-2 focus:ring-primary/30"
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
                                            className="w-full px-4 py-2.5 border border-border rounded-lg bg-background focus:outline-none focus:ring-2 focus:ring-primary/30"
                                        >
                                            <option value="">Select</option>
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
                                            className="w-full px-4 py-2.5 border border-border rounded-lg bg-background focus:outline-none focus:ring-2 focus:ring-primary/30"
                                        >
                                            <option value="">Select</option>
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
                                            className="w-full px-4 py-2.5 border border-border rounded-lg bg-background focus:outline-none focus:ring-2 focus:ring-primary/30"
                                        />
                                    </div>
                                </div>

                                <div>
                                    <label className="block text-sm font-medium mb-2">
                                        Full Address <span className="text-red-500">*</span>
                                    </label>
                                    <textarea
                                        name="fullAddress"
                                        value={formData.fullAddress}
                                        onChange={handleInputChange}
                                        placeholder="Street name, building number, floor, unit, etc."
                                        rows={3}
                                        className="w-full px-4 py-2.5 border border-border rounded-lg bg-background focus:outline-none focus:ring-2 focus:ring-primary/30 resize-none"
                                    />
                                </div>

                                <div>
                                    <label className="block text-sm font-medium mb-2">
                                        Address Note <span className="text-muted-foreground font-normal">(Optional)</span>
                                    </label>
                                    <input
                                        type="text"
                                        name="addressNote"
                                        value={formData.addressNote}
                                        onChange={handleInputChange}
                                        placeholder="e.g. Near the mall, next to gas station"
                                        className="w-full px-4 py-2.5 border border-border rounded-lg bg-background focus:outline-none focus:ring-2 focus:ring-primary/30"
                                    />
                                </div>
                            </div>
                        </motion.div>

                        {/* Primary Toggle - Mobile */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.3 }}
                            className="bg-card border border-border rounded-xl p-6 lg:hidden"
                        >
                            <label className="flex items-center justify-between cursor-pointer">
                                <div>
                                    <p className="font-medium">Set as primary address</p>
                                    <p className="text-sm text-muted-foreground">Use as default shipping address</p>
                                </div>
                                <div className="relative">
                                    <input
                                        type="checkbox"
                                        checked={formData.isPrimary}
                                        onChange={(e) => setFormData({ ...formData, isPrimary: e.target.checked })}
                                        className="sr-only peer"
                                    />
                                    <div className="w-11 h-6 bg-muted rounded-full peer peer-checked:bg-primary transition-colors" />
                                    <div className="absolute left-0.5 top-0.5 w-5 h-5 bg-white rounded-full shadow peer-checked:translate-x-5 transition-transform" />
                                </div>
                            </label>
                        </motion.div>

                        {/* Save Button - Mobile */}
                        <Button onClick={handleSave} className="w-full rounded-lg py-6 md:hidden text-base font-semibold">
                            {isEditMode ? "Update" : "Save"} Address
                        </Button>
                    </div>

                    {/* Sidebar */}
                    <div className="lg:col-span-1 space-y-6">
                        {/* Map */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.2 }}
                            className="bg-card border border-border rounded-xl overflow-hidden sticky top-24"
                        >
                            <div className="p-4 border-b border-border">
                                <h3 className="font-semibold mb-1">Pin Location</h3>
                                <p className="text-sm text-muted-foreground">Mark your exact location on map</p>
                            </div>
                            <div className="h-64">
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
                            <div className="p-4 border-t border-border">
                                <Button
                                    variant="outline"
                                    size="sm"
                                    onClick={handleUseCurrentLocation}
                                    className="w-full rounded-lg"
                                >
                                    <Navigation size={14} className="mr-2" />
                                    Use Current Location
                                </Button>
                            </div>
                        </motion.div>

                        {/* Set Primary - Desktop */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.3 }}
                            className="bg-card border border-border rounded-xl p-4 hidden lg:block"
                        >
                            <label className="flex items-start gap-3 cursor-pointer">
                                <div className="relative mt-0.5">
                                    <input
                                        type="checkbox"
                                        checked={formData.isPrimary}
                                        onChange={(e) => setFormData({ ...formData, isPrimary: e.target.checked })}
                                        className="sr-only peer"
                                    />
                                    <div className="w-5 h-5 border-2 border-border rounded peer-checked:border-primary peer-checked:bg-primary transition-colors flex items-center justify-center">
                                        {formData.isPrimary && <Check size={12} className="text-white" />}
                                    </div>
                                </div>
                                <div>
                                    <p className="font-medium text-sm">Set as primary address</p>
                                    <p className="text-xs text-muted-foreground">This will be your default shipping address</p>
                                </div>
                            </label>
                        </motion.div>
                    </div>
                </div>
            </div>

            <Footer />
        </div>
    );
}