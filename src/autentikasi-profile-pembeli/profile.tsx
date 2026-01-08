import { useState, useEffect } from 'react';
import { User, Heart, Settings, UserCog, Recycle, Loader2 } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { authService, getToken } from '../services';
import type { User as UserType, WishlistItem } from '../types/api';
import { api } from '../services/api';

export default function ProfilePage() {
    const navigate = useNavigate();
    const [user, setUser] = useState<UserType | null>(null);
    const [wishlistItems, setWishlistItems] = useState<WishlistItem[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchData = async () => {
            const token = getToken();
            if (!token) {
                navigate('/login');
                return;
            }

            try {
                // Fetch user data
                const userData = await authService.me();
                setUser(userData);

                // Fetch wishlist
                try {
                    const wishlistResponse = await api.get<{ data: WishlistItem[] }>('/api/wishlist');
                    setWishlistItems(wishlistResponse.data || []);
                } catch {
                    // Wishlist might be empty or endpoint might not exist
                    setWishlistItems([]);
                }
            } catch (err) {
                console.error('Error fetching profile data:', err);
                setError('Gagal memuat data profil');
            } finally {
                setIsLoading(false);
            }
        };

        fetchData();
    }, [navigate]);

    // Format join date
    const formatJoinDate = (dateString: string) => {
        const date = new Date(dateString);
        return date.toLocaleDateString('id-ID', { month: 'long', year: 'numeric' });
    };

    if (isLoading) {
        return (
            <div className="min-h-screen bg-background flex items-center justify-center">
                <div className="flex flex-col items-center gap-4">
                    <Loader2 className="w-12 h-12 animate-spin text-primary" />
                    <p className="text-muted-foreground">Memuat profil...</p>
                </div>
            </div>
        );
    }

    if (error || !user) {
        return (
            <div className="min-h-screen bg-background flex items-center justify-center">
                <div className="text-center">
                    <p className="text-red-500 mb-4">{error || 'User tidak ditemukan'}</p>
                    <Link to="/login" className="text-primary hover:underline">
                        Kembali ke Login
                    </Link>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-background font-sans">
            {/* Profile Section */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                <div className="bg-card border border-border rounded-3xl overflow-hidden shadow-sm">
                    {/* Profile Header */}
                    <div className="p-8">
                        <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-6">
                            <div className="flex items-center sm:items-start sm:flex-row flex-col sm:space-x-6 space-x-0 space-y-4 sm:space-y-0">
                                {/* Avatar */}
                                <div className="w-32 h-32 rounded-full bg-gray-200 overflow-hidden shadow-lg">
                                    {user.profile_picture_url ? (
                                        <img
                                            src={user.profile_picture_url}
                                            alt={user.full_name}
                                            className="w-full h-full object-cover"
                                        />
                                    ) : (
                                        <div className="w-full h-full flex items-center justify-center bg-primary/10">
                                            <User size={40} className="text-primary" />
                                        </div>
                                    )}
                                </div>

                                {/* User Info */}
                                <div>
                                    <h1 className="text-3xl font-bold text-foreground">{user.full_name || user.username}</h1>
                                    <p className="text-muted-foreground mt-1">{user.email}</p>
                                    <div className="flex items-center space-x-3 mt-2">
                                        <p className="text-sm text-muted-foreground">
                                            Member since {formatJoinDate(user.created_at)}
                                        </p>
                                        <span className="px-3 py-1 bg-primary/10 text-primary text-xs font-medium rounded-full flex items-center gap-1">
                                            <Recycle className="w-3 h-3" />
                                            Buyer
                                        </span>
                                    </div>
                                    {user.bio && (
                                        <p className="text-muted-foreground mt-3 text-sm">{user.bio}</p>
                                    )}
                                    {user.city && (
                                        <p className="text-muted-foreground mt-1 text-sm">📍 {user.city}</p>
                                    )}
                                </div>
                            </div>

                            {/* Action Buttons */}
                            <div className="flex flex-col space-y-3">
                                <Link to="/profile/edit">
                                    <button className="w-full px-6 py-3 bg-primary text-primary-foreground rounded-2xl hover:bg-primary/90 transition-colors flex items-center justify-center space-x-2 font-medium">
                                        <Settings size={18} />
                                        <span>Edit Profile</span>
                                    </button>
                                </Link>
                                <button
                                    onClick={() => alert('Fitur Become a Seller akan segera hadir!')}
                                    className="px-6 py-3 bg-secondary border border-border text-foreground rounded-2xl hover:bg-secondary/80 transition-colors flex items-center justify-center space-x-2 font-medium"
                                >
                                    <UserCog size={18} />
                                    <span>Become a Seller</span>
                                </button>
                            </div>
                        </div>
                    </div>

                    {/* Wishlist Section */}
                    <div className="border-t border-border">
                        <div className="p-8">
                            <div className="flex items-center justify-between mb-6">
                                <div className="flex items-center space-x-3">
                                    <Heart size={28} className="text-primary fill-primary/20" />
                                    <h2 className="text-2xl font-bold text-foreground">My Wishlist</h2>
                                </div>
                                <span className="text-sm text-muted-foreground">{wishlistItems.length} items</span>
                            </div>

                            {wishlistItems.length > 0 ? (
                                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                                    {wishlistItems.map((item) => (
                                        <Link
                                            key={item.id}
                                            to={`/product/${item.product_id}`}
                                            className="bg-card border border-border rounded-2xl overflow-hidden hover:shadow-lg transition-all hover:-translate-y-1 group"
                                        >
                                            <div className="aspect-square bg-gray-100 flex items-center justify-center relative overflow-hidden">
                                                {item.product?.images?.[0]?.image_url || item.product?.primary_image?.image_url ? (
                                                    <img
                                                        src={item.product?.primary_image?.image_url || item.product?.images?.[0]?.image_url}
                                                        alt={item.product?.name}
                                                        className="w-full h-full object-cover"
                                                    />
                                                ) : (
                                                    <Heart size={48} className="text-gray-300" />
                                                )}
                                            </div>
                                            <div className="p-4">
                                                <h3 className="font-semibold text-foreground text-lg group-hover:text-primary transition-colors">
                                                    {item.product?.name || 'Product'}
                                                </h3>
                                                <p className="text-sm text-muted-foreground mt-1 line-clamp-2">
                                                    {item.product?.description || 'No description'}
                                                </p>
                                                <div className="flex items-center justify-between mt-4">
                                                    <span className="text-lg font-bold text-primary">
                                                        Rp {item.product?.price?.toLocaleString('id-ID') || '0'}
                                                    </span>
                                                    <span className="px-3 py-1 bg-primary text-primary-foreground text-sm rounded-full">
                                                        View
                                                    </span>
                                                </div>
                                            </div>
                                        </Link>
                                    ))}
                                </div>
                            ) : (
                                <div className="text-center py-16">
                                    <Heart size={64} className="text-muted-foreground/30 mx-auto mb-4" />
                                    <h3 className="text-xl font-semibold text-foreground mb-2">Wishlist kamu kosong</h3>
                                    <p className="text-muted-foreground mb-4">Mulai tambahkan produk yang kamu suka!</p>
                                    <Link
                                        to="/shop"
                                        className="inline-block px-6 py-3 bg-primary text-primary-foreground rounded-full hover:bg-primary/90 transition-colors"
                                    >
                                        Jelajahi Produk
                                    </Link>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}