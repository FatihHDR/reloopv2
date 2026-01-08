import { useState, useEffect } from 'react';
import { Heart, Trash2, ShoppingCart, Grid, List, Home, ShoppingBag, PackageSearch, Info, Loader2 } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Component as Footer } from "../footer-taped-design";
import { Button } from './button';
import { NavBar } from './tubelight-navbar';
import { wishlistService, getToken } from '../../services';
import type { WishlistItem } from '../../types/api';

const navItems = [
    { name: "Home", url: "/", icon: Home },
    { name: "Shop", url: "/shop", icon: ShoppingBag },
    { name: "Categories", url: "/shop#categories", icon: PackageSearch },
    { name: "About", url: "/about", icon: Info },
];

export default function WishlistPage() {
    const navigate = useNavigate();
    const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
    const [wishlistItems, setWishlistItems] = useState<WishlistItem[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    // Fetch wishlist on mount
    useEffect(() => {
        const fetchWishlist = async () => {
            // Check if user is logged in
            if (!getToken()) {
                navigate('/login');
                return;
            }

            try {
                setLoading(true);
                setError(null);
                const response = await wishlistService.getAll({ per_page: 50 });
                setWishlistItems(response.data || []);
            } catch (err) {
                console.error('Error fetching wishlist:', err);
                setError('Gagal memuat wishlist. Silakan coba lagi.');
            } finally {
                setLoading(false);
            }
        };

        fetchWishlist();
    }, [navigate]);

    const removeFromWishlist = async (id: number) => {
        try {
            await wishlistService.remove(id);
            setWishlistItems(items => items.filter(item => item.id !== id));
        } catch (err) {
            console.error('Error removing from wishlist:', err);
        }
    };

    const getConditionColor = (condition?: string) => {
        if (condition === "like_new") return "text-emerald-600 bg-emerald-50 dark:bg-emerald-900/20 dark:text-emerald-400";
        if (condition === "new_with_tag") return "text-green-600 bg-green-50 dark:bg-green-900/20 dark:text-green-400";
        if (condition === "good") return "text-blue-600 bg-blue-50 dark:bg-blue-900/20 dark:text-blue-400";
        return "text-amber-600 bg-amber-50 dark:bg-amber-900/20 dark:text-amber-400";
    };

    const getConditionLabel = (condition?: string) => {
        switch (condition) {
            case "new_with_tag": return "New with Tag";
            case "like_new": return "Like New";
            case "good": return "Good";
            case "fair": return "Fair";
            default: return condition || "Unknown";
        }
    };

    // Format price to Indonesian Rupiah
    const formatPrice = (price?: number) => {
        if (!price) return 'Rp 0';
        return new Intl.NumberFormat('id-ID', {
            style: 'currency',
            currency: 'IDR',
            minimumFractionDigits: 0,
            maximumFractionDigits: 0,
        }).format(price);
    };

    // Get primary image URL
    const getImageUrl = (product?: WishlistItem['product']) => {
        if (!product) return "https://images.unsplash.com/photo-1560393464-5c69a73c5770?w=800&auto=format&fit=crop";
        if (product.primary_image?.image_url) return product.primary_image.image_url;
        if (product.images && product.images.length > 0) return product.images[0].image_url;
        return "https://images.unsplash.com/photo-1560393464-5c69a73c5770?w=800&auto=format&fit=crop";
    };

    if (loading) {
        return (
            <div className="min-h-screen bg-background">
                <NavBar items={navItems} />
                <div className="flex items-center justify-center min-h-[60vh]">
                    <div className="flex flex-col items-center gap-4">
                        <Loader2 className="w-12 h-12 text-primary animate-spin" />
                        <p className="text-muted-foreground">Memuat wishlist...</p>
                    </div>
                </div>
                <Footer />
            </div>
        );
    }

    if (error) {
        return (
            <div className="min-h-screen bg-background">
                <NavBar items={navItems} />
                <div className="flex items-center justify-center min-h-[60vh]">
                    <div className="text-center">
                        <p className="text-red-500 mb-4">{error}</p>
                        <Button onClick={() => window.location.reload()}>Coba Lagi</Button>
                    </div>
                </div>
                <Footer />
            </div>
        );
    }

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
                                                src={getImageUrl(item.product)}
                                                alt={item.product?.name || 'Product'}
                                                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                                            />
                                            <button
                                                onClick={() => removeFromWishlist(item.id)}
                                                className="absolute top-3 right-3 w-8 h-8 bg-white/90 dark:bg-black/70 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity hover:bg-white dark:hover:bg-black"
                                            >
                                                <Heart size={16} className="text-red-500 fill-red-500" />
                                            </button>
                                        </div>

                                        {/* Content */}
                                        <div className="p-4">
                                            <span className={`inline-block text-xs font-medium px-2 py-0.5 rounded mb-2 ${getConditionColor(item.product?.condition_status)}`}>
                                                {getConditionLabel(item.product?.condition_status)}
                                            </span>
                                            <h3 className="font-medium text-sm line-clamp-2 mb-2 min-h-[40px]">
                                                {item.product?.name || 'Unknown Product'}
                                            </h3>
                                            <div className="flex items-center gap-2 mb-3">
                                                {item.product?.seller?.profile_picture_url && (
                                                    <img src={item.product.seller.profile_picture_url} alt={item.product.seller.full_name} className="w-5 h-5 rounded-full" />
                                                )}
                                                <span className="text-xs text-muted-foreground">{item.product?.seller?.full_name || item.product?.seller?.username}</span>
                                            </div>
                                            <div className="flex items-center gap-2 mb-4">
                                                <span className="text-lg font-bold text-primary">{formatPrice(item.product?.price)}</span>
                                            </div>
                                            <div className="flex gap-2">
                                                <Link to={`/product/${item.product_id}`} className="flex-1">
                                                    <Button size="sm" className="w-full rounded-lg">
                                                        <ShoppingCart size={14} className="mr-1.5" />
                                                        View Product
                                                    </Button>
                                                </Link>
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
                                                src={getImageUrl(item.product)}
                                                alt={item.product?.name || 'Product'}
                                                className="w-full h-full object-cover"
                                            />
                                        </div>
                                        <div className="flex-1 min-w-0">
                                            <div className="flex items-start justify-between gap-4">
                                                <div className="min-w-0">
                                                    <span className={`inline-block text-xs font-medium px-2 py-0.5 rounded mb-2 ${getConditionColor(item.product?.condition_status)}`}>
                                                        {getConditionLabel(item.product?.condition_status)}
                                                    </span>
                                                    <h3 className="font-medium line-clamp-1 mb-1">{item.product?.name}</h3>
                                                    <div className="flex items-center gap-2 mb-2">
                                                        {item.product?.seller?.profile_picture_url && (
                                                            <img src={item.product.seller.profile_picture_url} alt={item.product.seller.full_name} className="w-4 h-4 rounded-full" />
                                                        )}
                                                        <span className="text-xs text-muted-foreground">{item.product?.seller?.full_name}</span>
                                                    </div>
                                                    <div className="flex items-center gap-2">
                                                        <span className="text-lg font-bold text-primary">{formatPrice(item.product?.price)}</span>
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
                                                <Link to={`/product/${item.product_id}`}>
                                                    <Button size="sm" className="rounded-lg">
                                                        <ShoppingCart size={14} className="mr-1.5" />
                                                        View Product
                                                    </Button>
                                                </Link>
                                                <Button size="sm" variant="outline" className="rounded-lg" onClick={() => removeFromWishlist(item.id)}>
                                                    Remove
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
                        <Link to="/shop">
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