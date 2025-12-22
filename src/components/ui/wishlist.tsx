import { User, Heart, Settings, UserCog, Recycle } from 'lucide-react';
import { Link } from 'react-router-dom';
import {Component} from "../footer-taped-design";

export default function WishlistPage() {
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
        <div className="min-h-screen bg-background font-sans">
        {/* Profile Section */}
        <div className="max-w-7xl mx-auto">
            {/* Wishlist Section */}
            <div>
                <div className="p-8">
                <div className="flex items-center justify-between mb-6">
                    <div className="flex items-center space-x-3">
                    <Heart size={28} className="text-primary" />
                    <h2 className="text-2xl font-bold text-foreground">My Wishlist</h2>
                    </div>
                    <span className="text-sm text-muted-foreground">{featuredProducts.length} items</span>
                </div>

                {featuredProducts.length > 0 ? (
                    <div className="grid grid-cols-2 md:grid-cols-3 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-6">
                    {featuredProducts.map((item) => (
                        <div key={item.id} className="bg-card border border-border rounded-2xl overflow-hidden hover:shadow-lg transition-all hover:-translate-y-1 group">
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
                            <h3 className="font-semibold text-foreground text-lg group-hover:text-primary transition-colors">{item.title}</h3>
                            <p className="text-sm text-muted-foreground mt-1 hidden sm:block">{item.description}</p>
                            <div className="flex items-center justify-between mt-4">
                            <span className="text-sm font-medium text-muted-foreground hidden sm:block">By {item.brandName}</span>
                            <button className="px-4 py-2 bg-primary text-primary-foreground text-sm rounded-full hover:bg-primary/90 transition-colors">
                                View Item
                            </button>
                            </div>
                        </div>
                        </div>
                    ))}
                    </div>
                ) : (
                    <div className="text-center py-16">
                    <Heart size={64} className="text-muted-foreground/30 mx-auto mb-4" />
                    <h3 className="text-xl font-semibold text-foreground mb-2">Your wishlist is empty</h3>
                    <p className="text-muted-foreground">Start adding items you love!</p>
                    </div>
                )}
                </div>
            </div>
        </div>

        {/* Footer */}
        <Component />;
        </div>
    );
}