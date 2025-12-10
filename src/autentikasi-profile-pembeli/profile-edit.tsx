import React, { useState } from 'react';
import { User, Camera, X, Mail, Phone, Plus, Check } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function EditProfilePage() {
    const [profileData, setProfileData] = useState<{
        name: string;
        email: string;
        phone: string;
        profileImage: string | null;
    }>({
        name: "Sarah Johnson",
        email: "Sarah@gmail.com",
        phone: "+62 812-3456-7890",
        profileImage: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=800&auto=format&fit=crop",
    });

    const [addresses, setAddresses] = useState([
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

    const [showAddressModal, setShowAddressModal] = useState(false);

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

    const handleRemoveImage = () => {
        setProfileData({ ...profileData, profileImage: null });
    };

    const setPrimaryAddress = (id: number) => {
        setAddresses(addresses.map(addr => ({
        ...addr,
        isPrimary: addr.id === id
        })));
    };

    const handleSave = () => {
        alert('Profile updated successfully!');
    };

    return (
        <div className="min-h-screen bg-background font-sans">
        {/* Header */}
        <header className="border-b border-border sticky top-0 z-50 backdrop-blur-md bg-background/80">
            <div className="max-w-7xl mx-auto px-6 py-4">
            <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                    <Link to="/profile">
                    <button 
                    className="w-10 h-10 rounded-full bg-secondary hover:bg-secondary/80 flex items-center justify-center transition-colors"
                    >
                        <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M12.5 15L7.5 10L12.5 5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                        </svg>
                    </button>
                    </Link>
                <h1 className="text-xl font-bold text-foreground">Edit Profile</h1>
                </div>
                <button 
                onClick={handleSave}
                className="px-6 py-2 bg-primary text-primary-foreground rounded-2xl hover:bg-primary/90 transition-colors font-medium"
                >
                Save Changes
                </button>
            </div>
            </div>
        </header>

        <div className="max-w-4xl mx-auto px-6 py-8">
            {/* Profile Photo Section */}
            <div className="bg-card border border-border rounded-3xl shadow-sm p-8 mb-6">
            <h2 className="text-lg font-bold text-foreground mb-6">Profile Photo</h2>
            <div className="flex items-center space-x-6">
                <div className="relative">
                <div className="w-32 h-32 rounded-full bg-gray-200 overflow-hidden">
                    {profileData.profileImage ? (
                    <img 
                        src={profileData.profileImage} 
                        alt="Profile"
                        className="w-full h-full object-cover"
                    />
                    ) : (
                    <div className="w-full h-full flex items-center justify-center">
                        <User size={48} className="text-gray-400" />
                    </div>
                    )}
                </div>
                <label className="absolute bottom-0 right-0 w-10 h-10 bg-primary rounded-full flex items-center justify-center cursor-pointer hover:bg-primary/90 transition-colors">
                    <Camera size={20} className="text-primary-foreground" />
                    <input 
                    type="file" 
                    accept="image/*" 
                    onChange={handleImageUpload}
                    className="hidden"
                    />
                </label>
                </div>
                <div className="flex-1">
                <p className="text-muted-foreground text-sm mb-3">Upload a new profile photo or remove the current one</p>
                <div className="flex flex-col sm:flex-row sm:space-x-3 space-y-3 sm:space-y-0">
                    <button className="px-4 py-2 bg-secondary text-foreground rounded-2xl hover:bg-secondary/80 transition-colors text-sm font-medium">
                    Upload Photo
                    <input 
                        type="file" 
                        accept="image/*" 
                        onChange={handleImageUpload}
                        className="hidden"
                    />
                    </button>
                    {profileData.profileImage && (
                    <button 
                        onClick={handleRemoveImage}
                        className="px-4 py-2 bg-destructive/10 text-destructive rounded-2xl hover:bg-destructive/20 transition-colors text-sm font-medium"
                    >
                        Remove Photo
                    </button>
                    )}
                </div>
                </div>
            </div>
            </div>

            {/* Personal Information */}
            <div className="bg-card border border-border rounded-3xl shadow-sm p-8 mb-6">
            <h2 className="text-lg font-bold text-foreground mb-6">Personal Information</h2>
            <div className="space-y-5">
                <div>
                <label className="block text-sm font-medium text-foreground mb-2">Full Name</label>
                <input 
                    type="text"
                    value={profileData.name}
                    onChange={(e) => setProfileData({ ...profileData, name: e.target.value })}
                    className="w-full px-4 py-3 border border-border rounded-2xl bg-background focus:outline-none focus:ring-2 focus:ring-primary text-foreground"
                />
                </div>
            </div>
            </div>

            {/* Contact Information */}
            <div className="bg-card border border-border rounded-3xl shadow-sm p-8 mb-6">
            <div className="flex items-center justify-between mb-6">
                <h2 className="text-lg font-bold text-foreground">Contact Information</h2>
                <button className="text-sm text-primary hover:text-primary/80 flex items-center space-x-1 font-medium">
                <Plus size={16} />
                <span>Add Contact</span>
                </button>
            </div>
            <div className="space-y-4">
                <div className="flex items-center space-x-4 p-4 border border-border rounded-2xl bg-background/50">
                <Mail size={20} className="text-muted-foreground" />
                <div className="flex-1">
                    <p className="text-sm text-muted-foreground">Email</p>
                    <p className="font-medium text-foreground">{profileData.email}</p>
                </div>
                <button className="text-sm text-primary hover:text-primary/80 font-medium">Edit</button>
                </div>
                <div className="flex items-center space-x-4 p-4 border border-border rounded-2xl bg-background/50">
                <Phone size={20} className="text-muted-foreground" />
                <div className="flex-1">
                    <p className="text-sm text-muted-foreground">Phone Number</p>
                    <p className="font-medium text-foreground">{profileData.phone}</p>
                </div>
                <button className="text-sm text-primary hover:text-primary/80 font-medium">Edit</button>
                </div>
            </div>
            </div>

            {/* Address Section */}
            <div className="bg-card border border-border rounded-3xl shadow-sm p-8">
            <div className="flex items-center justify-between mb-6">
                <h2 className="text-lg font-bold text-foreground">Addresses</h2>
                <Link to="/profile/address/add">
                <button 
                className="text-sm text-primary hover:text-primary/80 flex items-center space-x-1 font-medium"
                >
                <Plus size={16} />
                <span>Add New Address</span>
                </button>
                </Link>
            </div>
            <div className="space-y-4">
                {addresses.map((address) => (
                <div 
                    key={address.id}
                    className={`p-5 border-2 rounded-2xl transition-all ${
                    address.isPrimary 
                        ? 'border-primary bg-primary/5' 
                        : 'border-border hover:border-border/80'
                    }`}
                >
                    <div className="flex items-start justify-between mb-3">
                    <div className="flex items-center space-x-2">
                        <span className="px-3 py-1 bg-secondary text-foreground text-xs font-medium rounded-full">
                        {address.label}
                        </span>
                        {address.isPrimary && (
                        <span className="px-3 py-1 bg-primary text-primary-foreground text-xs font-medium rounded-full flex items-center space-x-1">
                            <Check size={12} />
                            <span>Primary</span>
                        </span>
                        )}
                    </div>
                    <button className="text-sm text-primary hover:text-primary/80 font-medium">Edit</button>
                    </div>
                    <p className="font-semibold text-foreground mb-1">{address.name}</p>
                    <p className="text-sm text-muted-foreground mb-1">{address.phone}</p>
                    <p className="text-sm text-muted-foreground mb-4">{address.fullAddress}</p>
                    {!address.isPrimary && (
                    <button 
                        onClick={() => setPrimaryAddress(address.id)}
                        className="text-sm text-primary hover:text-primary/80 font-medium"
                    >
                        Set as Primary Address
                    </button>
                    )}
                </div>
                ))}
            </div>
            </div>
        </div>

        {/* Add Address Modal (Placeholder) */}
        {showAddressModal && (
            <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
            <div className="bg-card border border-border rounded-3xl max-w-2xl w-full p-8">
                <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-bold text-foreground">Add New Address</h2>
                <button 
                    onClick={() => setShowAddressModal(false)}
                    className="text-muted-foreground hover:text-foreground"
                >
                    <X size={24} />
                </button>
                </div>
                <p className="text-muted-foreground mb-6">This will redirect to the Add Address page</p>
                <Link to="/profile/address/add">
                <button 
                className="w-full px-6 py-3 bg-primary text-primary-foreground rounded-2xl hover:bg-primary/90 transition-colors font-medium"
                >
                Go to Add Address
                </button>
                </Link>
            </div>
            </div>
        )}
        </div>
    );
}