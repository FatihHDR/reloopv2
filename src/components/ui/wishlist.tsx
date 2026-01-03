import { useState } from 'react';
import { Heart, Trash2, ShoppingCart, Grid, List, Home, ShoppingBag, PackageSearch, Info } from 'lucide-react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Component as Footer } from "../footer-taped-design";
import { Button } from './button';
import { NavBar } from './tubelight-navbar';

const navItems = [
    { name: "Home", url: "/", icon: Home },
    { name: "Shop", url: "#shop", icon: ShoppingBag },
    { name: "Categories", url: "#categories", icon: PackageSearch },
    { name: "About", url: "/about", icon: Info },
];

type WishlistItem = {
    id: number;
    imageSrc: string;
    title: string;
    seller: string;
    sellerAvatar: string;
    price: string;
    originalPrice?: string;
    discount?: number;
    condition: string;
    stock: number;
};

export default function WishlistPage() {
    const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
    const [wishlistItems, setWishlistItems] = useState<WishlistItem[]>([
        {
            id: 1,
            imageSrc: "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=800&auto=format&fit=crop",
            title: "Vintage Oak Chair - Mid Century Modern Design",
            seller: "KosKita Thrift",
            sellerAvatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop",
            price: "Rp 250.000",
            originalPrice: "Rp 500.000",
            discount: 50,
            condition: "Like New",
            stock: 1,
        },
        {
            id: 2,
            imageSrc: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=800&auto=format&fit=crop",
            title: "Sony WH-1000XM4 Wireless Headphones",
            seller: "ElectroSwap",
            sellerAvatar: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=100&h=100&fit=crop",
            price: "Rp 1.800.000",
            originalPrice: "Rp 4.500.000",
            discount: 60,
            condition: "Good",
            stock: 1,
        },
        {
            id: 3,
            imageSrc: "https://images.unsplash.com/photo-1551028719-00167b16eac5?w=800&auto=format&fit=crop",
            title: "Coach Leather Handbag - Authentic",
            seller: "ThriftThreads",
            sellerAvatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop",
            price: "Rp 2.500.000",
            originalPrice: "Rp 6.000.000",
            discount: 58,
            condition: "Like New",
            stock: 1,
        },
        {
            id: 4,
            imageSrc: "https://images.unsplash.com/photo-1512820790803-83ca734da794?w=800&auto=format&fit=crop",
            title: "Classics Literature Collection - 10 Books",
            seller: "BookLovers ID",
            sellerAvatar: "https://images.unsplash.com/photo-1527980965255-d3b416303d12?w=100&h=100&fit=crop",
            price: "Rp 450.000",
            originalPrice: "Rp 750.000",
            discount: 40,
            condition: "Good",
            stock: 2,
        },
    ]);

    const removeFromWishlist = (id: number) => {
        setWishlistItems(items => items.filter(item => item.id !== id));
    };

    const getConditionColor = (condition: string) => {
        if (condition === "Like New") return "text-emerald-600 bg-emerald-50 dark:bg-emerald-900/20 dark:text-emerald-400";
        if (condition === "Good") return "text-blue-600 bg-blue-50 dark:bg-blue-900/20 dark:text-blue-400";
        return "text-amber-600 bg-amber-50 dark:bg-amber-900/20 dark:text-amber-400";
    };

    return (
        <div className="min-h-screen bg-background">
            {/* Navigation */}
            <NavBar items={navItems} />

            <div className="container px-4 md:px-6 mx-auto max-w-7xl py-8">
                {/* Breadcrumb */}
                <nav className="flex items-center gap-2 text-sm text-muted-foreground mb-6">
                    <Link to="/" className="hover:text-primary transition-colors">Home</Link>
                    <span>/</span>
                    <span className="text-foreground font-medium">My Wishlist</span>
                </nav>

                {/* Header */}
                <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-8">
                    <div>
                        <h1 className="text-2xl md:text-3xl font-bold mb-1">My Wishlist</h1>
                        <p className="text-muted-foreground">{wishlistItems.length} items saved</p>
                    </div>
                    <div className="flex items-center gap-3">
                        <div className="flex items-center border border-border rounded-lg overflow-hidden">
                            <button
                                onClick={() => setViewMode('grid')}
                                className={`p-2.5 transition-colors ${viewMode === 'grid' ? 'bg-primary text-primary-foreground' : 'bg-background hover:bg-muted'}`}
                            >
                                <Grid size={18} />
                            </button>
                            <button
                                onClick={() => setViewMode('list')}
                                className={`p-2.5 transition-colors ${viewMode === 'list' ? 'bg-primary text-primary-foreground' : 'bg-background hover:bg-muted'}`}
                            >
                                <List size={18} />
                            </button>
                        </div>
                    </div>
                </div>

                {/* Wishlist Content */}
                {wishlistItems.length > 0 ? (
                    <div className={viewMode === 'grid'
                        ? "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5"
                        : "space-y-4"
                    }>
                        <AnimatePresence>
                            {wishlistItems.map((item, index) => (
                                viewMode === 'grid' ? (
                                    <motion.div
                                        key={item.id}
                                        initial={{ opacity: 0, y: 20 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        exit={{ opacity: 0, scale: 0.9 }}
                                        transition={{ delay: index * 0.05 }}
                                        className="bg-card border border-border rounded-xl overflow-hidden group hover:shadow-lg transition-shadow"
                                    >
                                        {/* Image */}
                                        <div className="relative aspect-square overflow-hidden bg-muted">
                                            <img
                                                src={item.imageSrc}
                                                alt={item.title}
                                                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                                            />
                                            {item.discount && (
                                                <span className="absolute top-3 left-3 bg-red-500 text-white text-xs font-bold px-2 py-1 rounded">
                                                    -{item.discount}%
                                                </span>
                                            )}
                                            <button
                                                onClick={() => removeFromWishlist(item.id)}
                                                className="absolute top-3 right-3 w-8 h-8 bg-white/90 dark:bg-black/70 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity hover:bg-white dark:hover:bg-black"
                                            >
                                                <Heart size={16} className="text-red-500 fill-red-500" />
                                            </button>
                                        </div>

                                        {/* Content */}
                                        <div className="p-4">
                                            <span className={`inline-block text-xs font-medium px-2 py-0.5 rounded mb-2 ${getConditionColor(item.condition)}`}>
                                                {item.condition}
                                            </span>
                                            <h3 className="font-medium text-sm line-clamp-2 mb-2 min-h-[40px]">
                                                {item.title}
                                            </h3>
                                            <div className="flex items-center gap-2 mb-3">
                                                <img src={item.sellerAvatar} alt={item.seller} className="w-5 h-5 rounded-full" />
                                                <span className="text-xs text-muted-foreground">{item.seller}</span>
                                            </div>
                                            <div className="flex items-center gap-2 mb-4">
                                                <span className="text-lg font-bold text-primary">{item.price}</span>
                                                {item.originalPrice && (
                                                    <span className="text-sm text-muted-foreground line-through">{item.originalPrice}</span>
                                                )}
                                            </div>
                                            <div className="flex gap-2">
                                                <Button size="sm" className="flex-1 rounded-lg">
                                                    <ShoppingCart size={14} className="mr-1.5" />
                                                    Add to Cart
                                                </Button>
                                                <Button
                                                    size="sm"
                                                    variant="outline"
                                                    className="rounded-lg"
                                                    onClick={() => removeFromWishlist(item.id)}
                                                >
                                                    <Trash2 size={14} />
                                                </Button>
                                            </div>
                                        </div>
                                    </motion.div>
                                ) : (
                                    <motion.div
                                        key={item.id}
                                        initial={{ opacity: 0, x: -20 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        exit={{ opacity: 0, x: 20 }}
                                        transition={{ delay: index * 0.05 }}
                                        className="bg-card border border-border rounded-xl p-4 flex gap-4 group hover:shadow-md transition-shadow"
                                    >
                                        <div className="relative w-32 h-32 flex-shrink-0 rounded-lg overflow-hidden bg-muted">
                                            <img
                                                src={item.imageSrc}
                                                alt={item.title}
                                                className="w-full h-full object-cover"
                                            />
                                            {item.discount && (
                                                <span className="absolute top-2 left-2 bg-red-500 text-white text-[10px] font-bold px-1.5 py-0.5 rounded">
                                                    -{item.discount}%
                                                </span>
                                            )}
                                        </div>
                                        <div className="flex-1 min-w-0">
                                            <div className="flex items-start justify-between gap-4">
                                                <div className="min-w-0">
                                                    <span className={`inline-block text-xs font-medium px-2 py-0.5 rounded mb-2 ${getConditionColor(item.condition)}`}>
                                                        {item.condition}
                                                    </span>
                                                    <h3 className="font-medium line-clamp-1 mb-1">{item.title}</h3>
                                                    <div className="flex items-center gap-2 mb-2">
                                                        <img src={item.sellerAvatar} alt={item.seller} className="w-4 h-4 rounded-full" />
                                                        <span className="text-xs text-muted-foreground">{item.seller}</span>
                                                    </div>
                                                    <div className="flex items-center gap-2">
                                                        <span className="text-lg font-bold text-primary">{item.price}</span>
                                                        {item.originalPrice && (
                                                            <span className="text-sm text-muted-foreground line-through">{item.originalPrice}</span>
                                                        )}
                                                    </div>
                                                </div>
                                                <button
                                                    onClick={() => removeFromWishlist(item.id)}
                                                    className="text-muted-foreground hover:text-red-500 transition-colors"
                                                >
                                                    <Heart size={20} className="fill-red-500 text-red-500" />
                                                </button>
                                            </div>
                                            <div className="flex gap-2 mt-3">
                                                <Button size="sm" className="rounded-lg">
                                                    <ShoppingCart size={14} className="mr-1.5" />
                                                    Add to Cart
                                                </Button>
                                                <Button size="sm" variant="outline" className="rounded-lg">
                                                    Buy Now
                                                </Button>
                                            </div>
                                        </div>
                                    </motion.div>
                                )
                            ))}
                        </AnimatePresence>
                    </div>
                ) : (
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="text-center py-20 bg-card border border-border rounded-xl"
                    >
                        <div className="w-20 h-20 mx-auto mb-6 bg-muted rounded-full flex items-center justify-center">
                            <Heart size={32} className="text-muted-foreground" />
                        </div>
                        <h3 className="text-xl font-semibold mb-2">Your wishlist is empty</h3>
                        <p className="text-muted-foreground mb-6 max-w-md mx-auto">
                            Save items you love by clicking the heart icon on any product
                        </p>
                        <Link to="/">
                            <Button className="rounded-lg">
                                Start Shopping
                            </Button>
                        </Link>
                    </motion.div>
                )}
            </div>

            <Footer />
        </div>
    );
}