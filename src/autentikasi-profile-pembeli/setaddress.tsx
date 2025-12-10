import React, { useState } from 'react';
import { MapPin, Navigation, Search } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function AddAddressPage() {
    const [formData, setFormData] = useState({
        label: "",
        recipientName: "",
        phoneNumber: "",
        province: "",
        city: "",
        district: "",
        subDistrict: "",
        postalCode: "",
        fullAddress: "",
        addressNote: "",
        isPrimary: false
    });

    const [mapLocation, setMapLocation] = useState({
        lat: -7.2575,
        lng: 112.7521,
        address: "Surabaya, Jawa Timur"
    });

    const [showMap, setShowMap] = useState(false);

    const provinces = ["Jawa Timur", "Jawa Barat", "Jawa Tengah", "DKI Jakarta", "Bali"];
    const cities = ["Surabaya", "Sidoarjo", "Gresik", "Malang", "Mojokerto"];
    const districts = ["Gubeng", "Tegalsari", "Genteng", "Wonokromo", "Rungkut"];
    const subDistricts = ["Airlangga", "Gubeng", "Kertajaya", "Pucang Sewu", "Mojo"];

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSave = () => {
        // Validasi
        if (!formData.recipientName || !formData.phoneNumber || !formData.fullAddress) {
        alert('Please fill in all required fields');
        return;
        }
        
        console.log('Address Data:', formData);
        console.log('Map Location:', mapLocation);
        alert('Address saved successfully!');
        // Navigate back or close
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
            alert('Current location set!');
            },
            (error) => {
            alert('Unable to get location: ' + error.message);
            }
        );
        } else {
        alert('Geolocation is not supported by your browser');
        }
    };

    return (
        <div className="min-h-screen bg-background font-sans">
        {/* Header */}
        <header className="border-b border-border sticky top-0 z-50 backdrop-blur-md bg-background/80">
            <div className="max-w-7xl mx-auto px-6 py-4">
            <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                <Link to="/profile/edit">
                <button 
                    className="w-10 h-10 rounded-full bg-secondary hover:bg-secondary/80 flex items-center justify-center transition-colors"
                >
                    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M12.5 15L7.5 10L12.5 5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                </button>
                </Link>
                <h1 className="text-xl font-bold text-foreground">Add New Address</h1>
                </div>
                <button 
                onClick={handleSave}
                className="px-6 py-2 bg-primary text-primary-foreground rounded-2xl hover:bg-primary/90 transition-colors font-medium"
                >
                Save
                </button>
            </div>
            </div>
        </header>

        <div className="max-w-4xl mx-auto px-6 py-8">
            {/* Address Label */}
            <div className="bg-card border border-border rounded-3xl shadow-sm p-6 mb-6">
            <h2 className="text-lg font-bold text-foreground mb-4">Address Label</h2>
            <div className="flex flex-wrap gap-3">
                {['Home', 'Office', 'Apartment'].map((label) => (
                <button
                    key={label}
                    onClick={() => setFormData({ ...formData, label })}
                    className={`px-6 py-2 rounded-2xl text-sm font-medium transition-colors ${
                    formData.label === label
                        ? 'bg-primary text-primary-foreground'
                        : 'bg-secondary text-foreground hover:bg-secondary/80'
                    }`}
                >
                    {label}
                </button>
                ))}
                <input
                type="text"
                name="label"
                value={formData.label && !['Home', 'Kos', 'Apartment'].includes(formData.label) ? formData.label : ''}
                onChange={handleInputChange}
                placeholder="Other (type here)"
                className="px-4 py-2 border border-border bg-background rounded-2xl text-sm focus:outline-none focus:ring-2 focus:ring-primary text-foreground"
                />
            </div>
            </div>

            {/* Contact Information */}
            <div className="bg-card border border-border rounded-3xl shadow-sm p-6 mb-6">
            <h2 className="text-lg font-bold text-foreground mb-4">Contact Information</h2>
            <div className="space-y-4">
                <div>
                <label className="block text-sm font-medium text-foreground mb-2">
                    Recipient Name <span className="text-destructive">*</span>
                </label>
                <input
                    type="text"
                    name="recipientName"
                    value={formData.recipientName}
                    onChange={handleInputChange}
                    placeholder="Enter recipient name"
                    className="w-full px-4 py-3 border border-border bg-background rounded-2xl focus:outline-none focus:ring-2 focus:ring-primary text-foreground"
                />
                </div>
                <div>
                <label className="block text-sm font-medium text-foreground mb-2">
                    Phone Number <span className="text-destructive">*</span>
                </label>
                <input
                    type="tel"
                    name="phoneNumber"
                    value={formData.phoneNumber}
                    onChange={handleInputChange}
                    placeholder="Enter phone number"
                    className="w-full px-4 py-3 border border-border bg-background rounded-2xl focus:outline-none focus:ring-2 focus:ring-primary text-foreground"
                />
                </div>
            </div>
            </div>

            {/* Address Details */}
            <div className="bg-card border border-border rounded-3xl shadow-sm p-6 mb-6">
            <h2 className="text-lg font-bold text-foreground mb-4">Address Details</h2>
            <div className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Province</label>
                    <select
                    name="province"
                    value={formData.province}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-black"
                    >
                    <option value="">Select Province</option>
                    {provinces.map(prov => (
                        <option key={prov} value={prov}>{prov}</option>
                    ))}
                    </select>
                </div>
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">City/Regency</label>
                    <select
                    name="city"
                    value={formData.city}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-black"
                    >
                    <option value="">Select City</option>
                    {cities.map(city => (
                        <option key={city} value={city}>{city}</option>
                    ))}
                    </select>
                </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">District</label>
                    <select
                    name="district"
                    value={formData.district}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-black"
                    >
                    <option value="">Select District</option>
                    {districts.map(dist => (
                        <option key={dist} value={dist}>{dist}</option>
                    ))}
                    </select>
                </div>
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Sub-district</label>
                    <select
                    name="subDistrict"
                    value={formData.subDistrict}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-black"
                    >
                    <option value="">Select Sub-district</option>
                    {subDistricts.map(sub => (
                        <option key={sub} value={sub}>{sub}</option>
                    ))}
                    </select>
                </div>
                </div>

                <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Postal Code</label>
                <input
                    type="text"
                    name="postalCode"
                    value={formData.postalCode}
                    onChange={handleInputChange}
                    placeholder="Enter postal code"
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-black"
                />
                </div>

                <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                    Full Address <span className="text-red-500">*</span>
                </label>
                <textarea
                    name="fullAddress"
                    value={formData.fullAddress}
                    onChange={handleInputChange}
                    placeholder="Street name, building number, floor, etc."
                    rows={3}
                    className="w-full px-4 py-3 border border-border bg-background rounded-2xl focus:outline-none focus:ring-2 focus:ring-primary text-foreground resize-none"
                />
                </div>

                <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                    Address Note (Optional)
                </label>
                <input
                    type="text"
                    name="addressNote"
                    value={formData.addressNote}
                    onChange={handleInputChange}
                    placeholder="e.g., Near the mall, beside the park"
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-black"
                />
                </div>
            </div>
            </div>

            {/* Map Container */}
            <div className="relative mb-4">
                <div className="w-full h-64 bg-secondary/30 border border-border rounded-2xl overflow-hidden relative">
                {/* Placeholder Map - In real app, use Google Maps or Leaflet */}
                <div className="absolute inset-0 flex items-center justify-center">
                    <div className="text-center">
                    <MapPin size={48} className="text-muted-foreground mx-auto mb-2" />
                    <p className="text-foreground text-sm font-medium">Interactive Map</p>
                    <p className="text-muted-foreground text-xs mt-1">Lat: {mapLocation.lat}, Lng: {mapLocation.lng}</p>
                    </div>
                </div>
                {/* Pin Marker in center */}
                <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-full">
                    <MapPin size={40} className="text-primary fill-primary" />
                </div>
                </div>
                <button
                onClick={() => setShowMap(!showMap)}
                className="mt-3 w-full px-4 py-2 bg-secondary text-foreground rounded-2xl hover:bg-secondary/80 transition-colors text-sm flex items-center justify-center space-x-2 font-medium"
                >
                <Search size={16} />
                <span>Search Location on Map</span>
                </button>
            </div>

            {/* Set as Primary */}
            <div className="bg-card border border-border rounded-3xl shadow-sm p-6 mb-6">
            <label className="flex items-center justify-between cursor-pointer">
                <div>
                <p className="font-semibold text-foreground">Set as primary address</p>
                <p className="text-sm text-muted-foreground mt-1">This address will be used as your default shipping address</p>
                </div>
                <input
                type="checkbox"
                checked={formData.isPrimary}
                onChange={(e) => setFormData({ ...formData, isPrimary: e.target.checked })}
                className="w-5 h-5 rounded border-border text-primary focus:ring-primary"
                />
            </label>
            </div>

            {/* Save Button (Mobile) */}
            <button 
            onClick={handleSave}
            className="w-full md:hidden px-6 py-3 bg-primary text-primary-foreground rounded-2xl hover:bg-primary/90 transition-colors font-medium"
            >
            Save Address
            </button>
        </div>
        </div>
    );
}