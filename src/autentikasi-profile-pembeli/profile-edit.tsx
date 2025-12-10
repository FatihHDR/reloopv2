import React, { useState } from 'react';
import { User, Camera, X, Mail, Phone, Plus, Check } from 'lucide-react';

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
        <div className="min-h-screen bg-gray-50">
        {/* Header */}
        <header className="bg-white border-b border-gray-200 sticky top-0 z-50">
            <div className="max-w-7xl mx-auto px-6 py-4">
            <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                    <button 
                    onClick={() => window.history.back()} 
                    className="w-10 h-10 rounded-full bg-gray-100 hover:bg-gray-200 flex items-center justify-center transition-colors"
                    >
                        <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M12.5 15L7.5 10L12.5 5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                        </svg>
                    </button>
                <h1 className="text-xl font-bold">Edit Profile</h1>
                </div>
                <button 
                onClick={handleSave}
                className="px-6 py-2 bg-black text-white rounded-full hover:bg-gray-800 transition-colors"
                >
                Save Changes
                </button>
            </div>
            </div>
        </header>

        <div className="max-w-4xl mx-auto px-6 py-8">
            {/* Profile Photo Section */}
            <div className="bg-white rounded-2xl shadow-sm p-8 mb-6">
            <h2 className="text-lg font-bold text-gray-900 mb-6">Profile Photo</h2>
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
                <label className="absolute bottom-0 right-0 w-10 h-10 bg-black rounded-full flex items-center justify-center cursor-pointer hover:bg-gray-800 transition-colors">
                    <Camera size={20} className="text-white" />
                    <input 
                    type="file" 
                    accept="image/*" 
                    onChange={handleImageUpload}
                    className="hidden"
                    />
                </label>
                </div>
                <div className="flex-1">
                <p className="text-gray-600 text-sm mb-3">Upload a new profile photo or remove the current one</p>
                <div className="flex flex-col sm:flex-row sm:space-x-3 space-y-3 sm:space-y-0">
                    <button className="px-4 py-2 bg-gray-100 text-gray-700 rounded-full hover:bg-gray-200 transition-colors text-sm">
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
                        className="px-4 py-2 bg-red-50 text-red-600 rounded-full hover:bg-red-100 transition-colors text-sm"
                    >
                        Remove Photo
                    </button>
                    )}
                </div>
                </div>
            </div>
            </div>

            {/* Personal Information */}
            <div className="bg-white rounded-2xl shadow-sm p-8 mb-6">
            <h2 className="text-lg font-bold text-gray-900 mb-6">Personal Information</h2>
            <div className="space-y-5">
                <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Full Name</label>
                <input 
                    type="text"
                    value={profileData.name}
                    onChange={(e) => setProfileData({ ...profileData, name: e.target.value })}
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-black"
                />
                </div>
            </div>
            </div>

            {/* Contact Information */}
            <div className="bg-white rounded-2xl shadow-sm p-8 mb-6">
            <div className="flex items-center justify-between mb-6">
                <h2 className="text-lg font-bold text-gray-900">Contact Information</h2>
                <button className="text-sm text-blue-600 hover:text-blue-700 flex items-center space-x-1">
                <Plus size={16} />
                <span>Add Contact</span>
                </button>
            </div>
            <div className="space-y-4">
                <div className="flex items-center space-x-4 p-4 border border-gray-200 rounded-xl">
                <Mail size={20} className="text-gray-400" />
                <div className="flex-1">
                    <p className="text-sm text-gray-500">Email</p>
                    <p className="font-medium text-gray-900">{profileData.email}</p>
                </div>
                <button className="text-sm text-gray-600 hover:text-gray-900">Edit</button>
                </div>
                <div className="flex items-center space-x-4 p-4 border border-gray-200 rounded-xl">
                <Phone size={20} className="text-gray-400" />
                <div className="flex-1">
                    <p className="text-sm text-gray-500">Phone Number</p>
                    <p className="font-medium text-gray-900">{profileData.phone}</p>
                </div>
                <button className="text-sm text-gray-600 hover:text-gray-900">Edit</button>
                </div>
            </div>
            </div>

            {/* Address Section */}
            <div className="bg-white rounded-2xl shadow-sm p-8">
            <div className="flex items-center justify-between mb-6">
                <h2 className="text-lg font-bold text-gray-900">Addresses</h2>
                <button 
                onClick={() => setShowAddressModal(true)}
                className="text-sm text-blue-600 hover:text-blue-700 flex items-center space-x-1"
                >
                <Plus size={16} />
                <span>Add New Address</span>
                </button>
            </div>
            <div className="space-y-4">
                {addresses.map((address) => (
                <div 
                    key={address.id}
                    className={`p-5 border-2 rounded-xl transition-all ${
                    address.isPrimary 
                        ? 'border-black bg-gray-50' 
                        : 'border-gray-200 hover:border-gray-300'
                    }`}
                >
                    <div className="flex items-start justify-between mb-3">
                    <div className="flex items-center space-x-2">
                        <span className="px-3 py-1 bg-gray-100 text-gray-700 text-xs font-medium rounded-full">
                        {address.label}
                        </span>
                        {address.isPrimary && (
                        <span className="px-3 py-1 bg-black text-white text-xs font-medium rounded-full flex items-center space-x-1">
                            <Check size={12} />
                            <span>Primary</span>
                        </span>
                        )}
                    </div>
                    <button className="text-sm text-gray-600 hover:text-gray-900">Edit</button>
                    </div>
                    <p className="font-semibold text-gray-900 mb-1">{address.name}</p>
                    <p className="text-sm text-gray-600 mb-1">{address.phone}</p>
                    <p className="text-sm text-gray-600 mb-4">{address.fullAddress}</p>
                    {!address.isPrimary && (
                    <button 
                        onClick={() => setPrimaryAddress(address.id)}
                        className="text-sm text-blue-600 hover:text-blue-700 font-medium"
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
            <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-2xl max-w-2xl w-full p-8">
                <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-bold text-gray-900">Add New Address</h2>
                <button 
                    onClick={() => setShowAddressModal(false)}
                    className="text-gray-400 hover:text-gray-600"
                >
                    <X size={24} />
                </button>
                </div>
                <p className="text-gray-600 mb-6">This will open the Add Address page (to be created separately)</p>
                <button 
                onClick={() => setShowAddressModal(false)}
                className="w-full px-6 py-3 bg-black text-white rounded-full hover:bg-gray-800 transition-colors"
                >
                Close
                </button>
            </div>
            </div>
        )}
        </div>
    );
}