import { useState } from 'react';
import { ChevronLeft, MapPin, Plus, Edit, Trash2, Star, Home as HomeIcon, Building, Building2, ShoppingBag, PackageSearch, Info, Home } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from './button';
import { NavBar } from './tubelight-navbar';
import { Component as Footer } from "../footer-taped-design";

const navItems = [
    { name: "Home", url: "/", icon: Home },
    { name: "Shop", url: "#shop", icon: ShoppingBag },
    { name: "Categories", url: "#categories", icon: PackageSearch },
    { name: "About", url: "/about", icon: Info },
];

interface Address {
    id: string;
    label: string;
    name: string;
    phone: string;
    fullAddress: string;
    isPrimary: boolean;
}

const mockAddresses: Address[] = [
    {
        id: '1',
        label: 'Home',
        name: 'Sarah Johnson',
        phone: '+62 812-3456-7890',
        fullAddress: 'Jl. Merdeka No. 123, Kec. Gubeng, Surabaya, Jawa Timur 60281',
        isPrimary: true
    },
    {
        id: '2',
        label: 'Office',
        name: 'Sarah Johnson',
        phone: '+62 812-3456-7890',
        fullAddress: 'Jl. Pemuda No. 45, Kec. Tegalsari, Surabaya, Jawa Timur 60264',
        isPrimary: false
    }
];

const labelIcons: Record<string, any> = {
    'Home': HomeIcon,
    'Office': Building,
    'Apartment': Building2
};

export default function AddressListPage() {
    const navigate = useNavigate();
    const [addresses, setAddresses] = useState<Address[]>(mockAddresses);

    const handleSetPrimary = (id: string) => {
        setAddresses(addresses.map(addr => ({
            ...addr,
            isPrimary: addr.id === id
        })));
    };

    const handleDelete = (id: string) => {
        if (window.confirm('Are you sure you want to delete this address?')) {
            setAddresses(addresses.filter(addr => addr.id !== id));
        }
    };

    const handleEdit = (address: Address) => {
        navigate('/profile/address', { state: { address } });
    };

    return (
        <div className="min-h-screen bg-gradient-to-b from-muted/30 to-background">
            <NavBar items={navItems} />

            <div className="container px-4 md:px-6 mx-auto max-w-4xl py-6 md:py-10 pt-24 md:pt-28">
                {/* Breadcrumb */}
                <nav className="flex items-center gap-2 text-sm text-muted-foreground mb-6">
                    <Link to="/" className="hover:text-primary transition-colors">Home</Link>
                    <span>/</span>
                    <Link to="/profile" className="hover:text-primary transition-colors">My Account</Link>
                    <span>/</span>
                    <span className="text-foreground font-medium">Addresses</span>
                </nav>

                {/* Header */}
                <motion.div
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="flex items-center justify-between mb-8"
                >
                    <div className="flex items-center gap-4">
                        <button
                            onClick={() => navigate('/profile')}
                            className="w-11 h-11 rounded-xl border border-border bg-card flex items-center justify-center hover:bg-muted transition-all hover:scale-105 active:scale-95"
                        >
                            <ChevronLeft size={20} />
                        </button>
                        <div>
                            <h1 className="text-2xl md:text-3xl font-bold tracking-tight">My Addresses</h1>
                            <p className="text-sm text-muted-foreground mt-1">
                                Manage your delivery addresses
                            </p>
                        </div>
                    </div>
                    <Button onClick={() => navigate('/profile/address')} className="rounded-xl hidden md:flex">
                        <Plus size={16} className="mr-2" />
                        Add Address
                    </Button>
                </motion.div>

                {/* Addresses List */}
                <div className="space-y-4">
                    <AnimatePresence mode="popLayout">
                        {addresses.length === 0 ? (
                            <motion.div
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                exit={{ opacity: 0 }}
                                className="bg-card border border-border rounded-2xl p-12 text-center"
                            >
                                <MapPin className="mx-auto mb-4 text-muted-foreground" size={48} />
                                <h3 className="text-lg font-semibold mb-2">No addresses saved</h3>
                                <p className="text-muted-foreground mb-6">
                                    Add a delivery address to make checkout easier
                                </p>
                                <Button onClick={() => navigate('/profile/address')}>
                                    <Plus size={16} className="mr-2" />
                                    Add Your First Address
                                </Button>
                            </motion.div>
                        ) : (
                            addresses.map((address, index) => {
                                const LabelIcon = labelIcons[address.label] || MapPin;
                                return (
                                    <motion.div
                                        key={address.id}
                                        initial={{ opacity: 0, y: 20 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        exit={{ opacity: 0, scale: 0.9 }}
                                        transition={{ delay: index * 0.1 }}
                                        className={`bg-card border-2 rounded-2xl p-6 shadow-sm hover:shadow-md transition-all ${address.isPrimary ? 'border-primary bg-primary/5' : 'border-border'
                                            }`}
                                    >
                                        <div className="flex items-start justify-between gap-4">
                                            <div className="flex-1">
                                                <div className="flex items-center gap-3 mb-4">
                                                    <div className={`p-2.5 rounded-lg ${address.isPrimary
                                                        ? 'bg-primary/10'
                                                        : 'bg-muted'
                                                        }`}>
                                                        <LabelIcon
                                                            size={20}
                                                            className={address.isPrimary ? 'text-primary' : 'text-muted-foreground'}
                                                        />
                                                    </div>
                                                    <div>
                                                        <h3 className={`font-semibold text-lg ${address.isPrimary ? 'text-primary' : ''
                                                            }`}>
                                                            {address.label}
                                                        </h3>
                                                        {address.isPrimary && (
                                                            <div className="flex items-center gap-1 text-primary text-xs font-medium mt-0.5">
                                                                <Star size={12} fill="currentColor" />
                                                                <span>Primary Address</span>
                                                            </div>
                                                        )}
                                                    </div>
                                                </div>

                                                <div className="space-y-2 text-sm">
                                                    <p className="font-medium">{address.name}</p>
                                                    <p className="text-muted-foreground">{address.phone}</p>
                                                    <p className="text-muted-foreground leading-relaxed">
                                                        {address.fullAddress}
                                                    </p>
                                                </div>
                                            </div>

                                            <div className="flex flex-col gap-2">
                                                <Button
                                                    variant="outline"
                                                    size="sm"
                                                    onClick={() => handleEdit(address)}
                                                    className="rounded-lg"
                                                >
                                                    <Edit size={14} className="mr-1" />
                                                    Edit
                                                </Button>
                                                {!address.isPrimary && (
                                                    <Button
                                                        variant="outline"
                                                        size="sm"
                                                        onClick={() => handleSetPrimary(address.id)}
                                                        className="rounded-lg"
                                                    >
                                                        <Star size={14} className="mr-1" />
                                                        Set Primary
                                                    </Button>
                                                )}
                                                <Button
                                                    variant="outline"
                                                    size="sm"
                                                    onClick={() => handleDelete(address.id)}
                                                    className="rounded-lg text-red-600 hover:text-red-700 hover:bg-red-50"
                                                >
                                                    <Trash2 size={14} className="mr-1" />
                                                    Delete
                                                </Button>
                                            </div>
                                        </div>
                                    </motion.div>
                                );
                            })
                        )}
                    </AnimatePresence>
                </div>

                {/* Add Button - Mobile */}
                {addresses.length > 0 && (
                    <Button
                        onClick={() => navigate('/profile/address')}
                        className="w-full rounded-xl py-6 mt-6 md:hidden text-base font-semibold"
                    >
                        <Plus size={18} className="mr-2" />
                        Add New Address
                    </Button>
                )}
            </div>

            <Footer />
        </div>
    );
}
