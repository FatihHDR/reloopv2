import React from 'react';
import { User, Heart, Settings, UserCog } from 'lucide-react';

export default function ProfilePage() {
    // Sample user data
    const userData = {
        name: "Sarah Johnson",
        email: "Sarah@gmail.com",
        avatar: null,
        joinDate: "Desember 2025",
        role: "Buyer",
        src: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=800&auto=format&fit=crop",
        stats: {
        wishlist: 15,
        purchases: 8
        }
    };

    const featuredProducts= [
        {
            id: 1,
            imageSrc: "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=800&auto=format&fit=crop",
            imageAlt: "Vintage wooden chair",
            tag: "Like New",
            title: "Vintage Oak Chair",
            description: "Mid-century modern design in excellent condition",
            brandLogoSrc: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop",
            brandName: "Sarah M.",
            promoCode: "50% OFF",
            href: "#",
        },
        {
            id: 2,
            imageSrc: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=800&auto=format&fit=crop",
            imageAlt: "Wireless headphones",
            tag: "Electronics",
            title: "Premium Headphones",
            description: "Noise-cancelling wireless headphones with case",
            brandLogoSrc: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=100&h=100&fit=crop",
            brandName: "John D.",
            promoCode: "70% OFF",
            href: "#",
        },
        {
            id: 3,
            imageSrc: "https://images.unsplash.com/photo-1551028719-00167b16eac5?w=800&auto=format&fit=crop",
            imageAlt: "Designer handbag",
            tag: "Fashion",
            title: "Leather Handbag",
            description: "Genuine leather, barely used designer bag",
            brandLogoSrc: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop",
            brandName: "Emily R.",
            promoCode: "60% OFF",
            href: "#",
        },
        {
            id: 4,
            imageSrc: "https://images.unsplash.com/photo-1512820790803-83ca734da794?w=800&auto=format&fit=crop",
            imageAlt: "Collection of books",
            tag: "Books",
            title: "Classic Novel Set",
            description: "Complete collection of literary classics",
            brandLogoSrc: "https://images.unsplash.com/photo-1527980965255-d3b416303d12?w=100&h=100&fit=crop",
            brandName: "Michael T.",
            promoCode: "40% OFF",
            href: "#",
        },
        {
            id: 5,
            imageSrc: "https://images.unsplash.com/photo-1491553895911-0055eca6402d?w=800&auto=format&fit=crop",
            imageAlt: "Running shoes",
            tag: "Sports",
            title: "Running Sneakers",
            description: "Barely worn premium running shoes",
            brandLogoSrc: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop",
            brandName: "Alex K.",
            promoCode: "55% OFF",
            href: "#",
        },
    ];

    return (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">

        {/* Profile Section */}
        <div className="max-w-7xl mx-auto px-6 py-12">
            <div className="bg-white rounded-2xl overflow-hidden">
            {/* Profile Header */}
            <div className="p-8">
                <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-6">
                <div className="flex items-center sm:items-start sm:flex-row flex-col sm:space-x-6 space-x-0 space-y-4 sm:space-y-0">
                    {/* Avatar */}
                    <div className="w-32 h-32 rounded-full bg-gray-200 overflow-hidden shadow-lg">
                    {userData.src ? (
                        <img 
                        src={userData.src} 
                        alt={userData.name}
                        className="w-full h-full object-cover"
                        />
                    ) : (
                        <div className="w-full h-full flex items-center justify-center">
                        <User size={40} className="text-gray-400" />
                        </div>
                    )}
                    </div>
                    
                    {/* User Info */}
                    <div>
                    <h1 className="text-3xl font-bold text-gray-900">{userData.name}</h1>
                    <p className="text-gray-600 mt-1">{userData.email}</p>
                    <div className="flex items-center space-x-3 mt-2">
                        <p className="text-sm text-gray-500">Member since {userData.joinDate}</p>
                        <span className="px-3 py-1 bg-blue-100 text-blue-700 text-xs font-medium rounded-full">
                        {userData.role}
                        </span>
                    </div>
                    </div>
                </div>

                {/* Action Buttons */}
                <div className="flex flex-col space-y-3">
                    <button 
                    onClick={() => alert('Navigate to Edit Profile page')}
                    className="px-6 py-3 bg-black text-white rounded-full hover:bg-gray-800 transition-colors flex items-center justify-center space-x-2"
                    >
                    <Settings size={18} />
                    <span>Edit Profile</span>
                    </button>
                    <button 
                    onClick={() => alert('Change role to Admin')}
                    className="px-6 py-3 bg-white border-2 border-gray-300 text-gray-700 rounded-full hover:bg-gray-50 transition-colors flex items-center justify-center space-x-2"
                    >
                    <UserCog size={18} />
                    <span>Change Role as Admin</span>
                    </button>
                </div>
                </div>
            </div>

            {/* Wishlist Section */}
            <div className="border-t border-gray-200">
                <div className="p-8">
                <div className="flex items-center justify-between mb-6">
                    <div className="flex items-center space-x-3">
                    <Heart size={28} className="text-gray-700" />
                    <h2 className="text-2xl font-bold text-gray-900">My Wishlist</h2>
                    </div>
                    <span className="text-sm text-gray-600">{featuredProducts.length} items</span>
                </div>

                {featuredProducts.length > 0 ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {featuredProducts.map((item) => (
                        <div key={item.id} className="bg-white border border-gray-200 rounded-xl overflow-hidden hover:shadow-lg transition-all hover:-translate-y-1">
                        <div className="aspect-square bg-gray-100 flex items-center justify-center relative overflow-hidden">
                        {featuredProducts[item.id - 1]?.imageSrc ? (
                            <img 
                                src={featuredProducts[item.id - 1].imageSrc} 
                                alt={item.title}
                                className="w-full h-full object-cover"
                            />
                        ) : (
                            <Heart size={48} className="text-gray-300" />
                        )}
                    </div>
                        <div className="p-4">
                            <h3 className="font-semibold text-gray-900 text-lg">{item.title}</h3>
                            <p className="text-sm text-gray-500 mt-1">{item.description}</p>
                            <div className="flex items-center justify-between mt-4">
                            <span className="text-xl font-bold text-gray-900">By {item.brandName}</span>
                            <button className="px-4 py-2 bg-black text-white text-sm rounded-full hover:bg-gray-800 transition-colors">
                                View Item
                            </button>
                            </div>
                        </div>
                        </div>
                    ))}
                    </div>
                ) : (
                    <div className="text-center py-16">
                    <Heart size={64} className="text-gray-300 mx-auto mb-4" />
                    <h3 className="text-xl font-semibold text-gray-900 mb-2">Your wishlist is empty</h3>
                    </div>
                )}
                </div>
            </div>
            </div>
        </div>

        {/* Footer */}
        </div>
    );
}