import React, { useState, useEffect } from 'react';
import { User, Camera, Mail, Phone, Plus, Loader2, ShoppingCart } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { authService, getToken } from '../services';
import { api } from '../services/api';

export default function EditProfilePage() {
    const navigate = useNavigate();
    const [isLoading, setIsLoading] = useState(true);
    const [isSaving, setIsSaving] = useState(false);
    const [profileData, setProfileData] = useState({
        full_name: '',
        email: '',
        phone_number: '',
        bio: '',
        city: '',
        address: '',
        profile_picture_url: '',
    });

    useEffect(() => {
        const fetchUser = async () => {
            const token = getToken();
            if (!token) {
                navigate('/login');
                return;
            }

            try {
                const userData = await authService.me();
                setProfileData({
                    full_name: userData.full_name || '',
                    email: userData.email || '',
                    phone_number: userData.phone_number || '',
                    bio: userData.bio || '',
                    city: userData.city || '',
                    address: userData.address || '',
                    profile_picture_url: userData.profile_picture_url || '',
                });
            } catch (err) {
                console.error('Error fetching user:', err);
                navigate('/login');
            } finally {
                setIsLoading(false);
            }
        };

        fetchUser();
    }, [navigate]);

    const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setProfileData({ ...profileData, profile_picture_url: reader.result as string });
            };
            reader.readAsDataURL(file);
        }
    };

    const handleRemoveImage = () => {
        setProfileData({ ...profileData, profile_picture_url: '' });
    };

    const handleSave = async () => {
        setIsSaving(true);
        try {
            // Update profile via API
            await api.put('/api/auth/profile', {
                full_name: profileData.full_name,
                phone_number: profileData.phone_number,
                bio: profileData.bio,
                city: profileData.city,
                address: profileData.address,
            });
            alert('Profil berhasil diperbarui!');
            navigate('/profile');
        } catch (err) {
            console.error('Error updating profile:', err);
            alert('Gagal memperbarui profil. Silakan coba lagi.');
        } finally {
            setIsSaving(false);
        }
    };

    if (isLoading) {
        return (
            <div className="min-h-screen bg-background flex items-center justify-center">
                <div className="flex flex-col items-center gap-4">
                    <Loader2 className="w-12 h-12 animate-spin text-primary" />
                    <p className="text-muted-foreground">Memuat data...</p>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-background font-sans">
            {/* Header */}
            <header className="border-b border-border sticky top-0 z-50 backdrop-blur-md bg-background/80">
                <div className="max-w-7xl mx-auto px-6 py-4">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-4">
                            <Link to="/profile">
                                <button className="w-10 h-10 rounded-full bg-secondary hover:bg-secondary/80 flex items-center justify-center transition-colors">
                                    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M12.5 15L7.5 10L12.5 5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                    </svg>
                                </button>
                            </Link>
                            <h1 className="text-xl font-bold text-foreground">Edit Profile</h1>
                        </div>
                        <button
                            onClick={handleSave}
                            disabled={isSaving}
                            className="px-6 py-2 bg-primary text-primary-foreground rounded-2xl hover:bg-primary/90 transition-colors font-medium disabled:opacity-50 flex items-center gap-2"
                        >
                            {isSaving && <Loader2 className="w-4 h-4 animate-spin" />}
                            {isSaving ? 'Menyimpan...' : 'Simpan'}
                        </button>
                    </div>
                </div>
            </header>

            <div className="max-w-4xl mx-auto px-6 py-8">
                {/* Profile Photo Section */}
                <div className="bg-card border border-border rounded-3xl shadow-sm p-8 mb-6">
                    <h2 className="text-lg font-bold text-foreground mb-6">Foto Profil</h2>
                    <div className="flex items-center space-x-6">
                        <div className="relative">
                            <div className="w-32 h-32 rounded-full bg-gray-200 overflow-hidden">
                                {profileData.profile_picture_url ? (
                                    <img
                                        src={profileData.profile_picture_url}
                                        alt="Profile"
                                        className="w-full h-full object-cover"
                                    />
                                ) : (
                                    <div className="w-full h-full flex items-center justify-center bg-primary/10">
                                        <User size={48} className="text-primary" />
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
                            <p className="text-muted-foreground text-sm mb-3">Upload foto profil baru atau hapus yang ada</p>
                            <div className="flex flex-col sm:flex-row sm:space-x-3 space-y-3 sm:space-y-0">
                                <label className="px-4 py-2 bg-secondary text-foreground rounded-2xl hover:bg-secondary/80 transition-colors text-sm font-medium cursor-pointer text-center">
                                    Upload Foto
                                    <input
                                        type="file"
                                        accept="image/*"
                                        onChange={handleImageUpload}
                                        className="hidden"
                                    />
                                </label>
                                {profileData.profile_picture_url && (
                                    <button
                                        onClick={handleRemoveImage}
                                        className="px-4 py-2 bg-destructive/10 text-destructive rounded-2xl hover:bg-destructive/20 transition-colors text-sm font-medium"
                                    >
                                        Hapus Foto
                                    </button>
                                )}
                            </div>
                        </div>
                    </div>
                </div>

                {/* Personal Information */}
                <div className="bg-card border border-border rounded-3xl shadow-sm p-8 mb-6">
                    <h2 className="text-lg font-bold text-foreground mb-6">Informasi Pribadi</h2>
                    <div className="space-y-5">
                        <div>
                            <label className="block text-sm font-medium text-foreground mb-2">Nama Lengkap</label>
                            <input
                                type="text"
                                value={profileData.full_name}
                                onChange={(e) => setProfileData({ ...profileData, full_name: e.target.value })}
                                className="w-full px-4 py-3 border border-border rounded-2xl bg-background focus:outline-none focus:ring-2 focus:ring-primary text-foreground"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-foreground mb-2">Bio</label>
                            <textarea
                                value={profileData.bio}
                                onChange={(e) => setProfileData({ ...profileData, bio: e.target.value })}
                                rows={3}
                                placeholder="Ceritakan tentang diri kamu..."
                                className="w-full px-4 py-3 border border-border rounded-2xl bg-background focus:outline-none focus:ring-2 focus:ring-primary text-foreground resize-none"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-foreground mb-2">Kota</label>
                            <input
                                type="text"
                                value={profileData.city}
                                onChange={(e) => setProfileData({ ...profileData, city: e.target.value })}
                                placeholder="Jakarta, Surabaya, dll."
                                className="w-full px-4 py-3 border border-border rounded-2xl bg-background focus:outline-none focus:ring-2 focus:ring-primary text-foreground"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-foreground mb-2">Alamat</label>
                            <textarea
                                value={profileData.address}
                                onChange={(e) => setProfileData({ ...profileData, address: e.target.value })}
                                rows={2}
                                placeholder="Alamat lengkap untuk pengiriman"
                                className="w-full px-4 py-3 border border-border rounded-2xl bg-background focus:outline-none focus:ring-2 focus:ring-primary text-foreground resize-none"
                            />
                        </div>
                    </div>
                </div>

                {/* Contact Information */}
                <div className="bg-card border border-border rounded-3xl shadow-sm p-8 mb-6">
                    <div className="flex items-center justify-between mb-6">
                        <h2 className="text-lg font-bold text-foreground">Informasi Kontak</h2>
                    </div>
                    <div className="space-y-4">
                        <div className="flex items-center space-x-4 p-4 border border-border rounded-2xl bg-background/50">
                            <Mail size={20} className="text-muted-foreground" />
                            <div className="flex-1">
                                <p className="text-sm text-muted-foreground">Email</p>
                                <p className="font-medium text-foreground">{profileData.email}</p>
                            </div>
                            <span className="text-xs text-muted-foreground bg-secondary px-2 py-1 rounded-full">Tidak dapat diubah</span>
                        </div>
                        <div className="p-4 border border-border rounded-2xl bg-background/50">
                            <div className="flex items-center space-x-4 mb-3">
                                <Phone size={20} className="text-muted-foreground" />
                                <p className="text-sm text-muted-foreground">Nomor Telepon</p>
                            </div>
                            <input
                                type="tel"
                                value={profileData.phone_number}
                                onChange={(e) => setProfileData({ ...profileData, phone_number: e.target.value })}
                                placeholder="081234567890"
                                className="w-full px-4 py-3 border border-border rounded-2xl bg-background focus:outline-none focus:ring-2 focus:ring-primary text-foreground"
                            />
                        </div>
                    </div>
                </div>

                {/* Quick Actions */}
                <div className="bg-card border border-border rounded-3xl shadow-sm p-8">
                    <h2 className="text-lg font-bold text-foreground mb-6">Aksi Cepat</h2>
                    <div className="space-y-3">
                        <Link to="/cart" className="flex items-center justify-between p-4 border border-border rounded-2xl hover:bg-secondary/50 transition-colors">
                            <div className="flex items-center space-x-3">
                                <ShoppingCart size={20} className="text-primary" />
                                <span className="font-medium text-foreground">Keranjang Saya</span>
                            </div>
                            <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M7.5 15L12.5 10L7.5 5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                            </svg>
                        </Link>
                        <Link to="/profile/address/add" className="flex items-center justify-between p-4 border border-border rounded-2xl hover:bg-secondary/50 transition-colors">
                            <div className="flex items-center space-x-3">
                                <Plus size={20} className="text-primary" />
                                <span className="font-medium text-foreground">Tambah Alamat Baru</span>
                            </div>
                            <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M7.5 15L12.5 10L7.5 5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                            </svg>
                        </Link>
                        <Link to="/settings" className="flex items-center justify-between p-4 border border-border rounded-2xl hover:bg-secondary/50 transition-colors">
                            <div className="flex items-center space-x-3">
                                <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg" className="text-primary">
                                    <path d="M10 12.5C11.3807 12.5 12.5 11.3807 12.5 10C12.5 8.61929 11.3807 7.5 10 7.5C8.61929 7.5 7.5 8.61929 7.5 10C7.5 11.3807 8.61929 12.5 10 12.5Z" stroke="currentColor" strokeWidth="1.5" />
                                    <path d="M16.1667 10C16.1667 10.4167 16.125 10.8333 16.0417 11.2083L17.5 12.3333C17.625 12.4583 17.6667 12.625 17.5833 12.7917L16.25 15.0833C16.1667 15.25 16 15.3333 15.8333 15.2917L14.125 14.5833C13.625 14.9583 13.0833 15.2917 12.5 15.5417L12.25 17.3333C12.2083 17.5417 12.0417 17.6667 11.8333 17.6667H9.16667C8.95833 17.6667 8.79167 17.5417 8.75 17.3333L8.5 15.5417C7.91667 15.2917 7.375 14.9583 6.875 14.5833L5.16667 15.2917C5 15.3333 4.83333 15.25 4.75 15.0833L3.41667 12.7917C3.33333 12.625 3.375 12.4583 3.5 12.3333L4.95833 11.2083C4.875 10.8333 4.83333 10.4167 4.83333 10C4.83333 9.58333 4.875 9.16667 4.95833 8.79167L3.5 7.66667C3.375 7.54167 3.33333 7.375 3.41667 7.20833L4.75 4.91667C4.83333 4.75 5 4.66667 5.16667 4.70833L6.875 5.41667C7.375 5.04167 7.91667 4.70833 8.5 4.45833L8.75 2.66667C8.79167 2.45833 8.95833 2.33333 9.16667 2.33333H11.8333C12.0417 2.33333 12.2083 2.45833 12.25 2.66667L12.5 4.45833C13.0833 4.70833 13.625 5.04167 14.125 5.41667L15.8333 4.70833C16 4.66667 16.1667 4.75 16.25 4.91667L17.5833 7.20833C17.6667 7.375 17.625 7.54167 17.5 7.66667L16.0417 8.79167C16.125 9.16667 16.1667 9.58333 16.1667 10Z" stroke="currentColor" strokeWidth="1.5" />
                                </svg>
                                <span className="font-medium text-foreground">Pengaturan Akun</span>
                            </div>
                            <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M7.5 15L12.5 10L7.5 5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                            </svg>
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
}