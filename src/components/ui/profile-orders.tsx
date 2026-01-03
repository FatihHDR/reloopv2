import React, { useState } from 'react';
import { ChevronLeft, Package, Search, Filter, Clock, CheckCircle2, XCircle, Truck, MapPin, Phone, ShoppingBag, PackageSearch, Info, Home, ChevronRight, Eye } from 'lucide-react';
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

type OrderStatus = 'pending' | 'processing' | 'shipped' | 'delivered' | 'cancelled';

interface Order {
    id: string;
    orderNumber: string;
    date: string;
    status: OrderStatus;
    total: number;
    items: {
        id: string;
        name: string;
        image: string;
        quantity: number;
        price: number;
    }[];
    shippingAddress: string;
}

const mockOrders: Order[] = [
    {
        id: '1',
        orderNumber: 'ORD-2026-00123',
        date: '2026-01-02',
        status: 'processing',
        total: 1250000,
        items: [
            {
                id: '1',
                name: 'Vintage Denim Jacket',
                image: 'https://images.unsplash.com/photo-1551028719-00167b16eac5?w=400',
                quantity: 1,
                price: 750000
            },
            {
                id: '2',
                name: 'Cotton T-Shirt',
                image: 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=400',
                quantity: 2,
                price: 250000
            }
        ],
        shippingAddress: 'Jl. Merdeka No. 123, Surabaya'
    },
    {
        id: '2',
        orderNumber: 'ORD-2025-00987',
        date: '2025-12-28',
        status: 'delivered',
        total: 890000,
        items: [
            {
                id: '3',
                name: 'Leather Sneakers',
                image: 'https://images.unsplash.com/photo-1549298916-b41d501d3772?w=400',
                quantity: 1,
                price: 890000
            }
        ],
        shippingAddress: 'Jl. Pemuda No. 45, Surabaya'
    }
];

const statusConfig = {
    pending: { label: 'Pending', icon: Clock, color: 'text-yellow-600 bg-yellow-50 border-yellow-200', darkColor: 'dark:text-yellow-400 dark:bg-yellow-950/20 dark:border-yellow-900' },
    processing: { label: 'Processing', icon: Package, color: 'text-blue-600 bg-blue-50 border-blue-200', darkColor: 'dark:text-blue-400 dark:bg-blue-950/20 dark:border-blue-900' },
    shipped: { label: 'Shipped', icon: Truck, color: 'text-purple-600 bg-purple-50 border-purple-200', darkColor: 'dark:text-purple-400 dark:bg-purple-950/20 dark:border-purple-900' },
    delivered: { label: 'Delivered', icon: CheckCircle2, color: 'text-green-600 bg-green-50 border-green-200', darkColor: 'dark:text-green-400 dark:bg-green-950/20 dark:border-green-900' },
    cancelled: { label: 'Cancelled', icon: XCircle, color: 'text-red-600 bg-red-50 border-red-200', darkColor: 'dark:text-red-400 dark:bg-red-950/20 dark:border-red-900' }
};

export default function MyOrdersPage() {
    const navigate = useNavigate();
    const [searchQuery, setSearchQuery] = useState('');
    const [filterStatus, setFilterStatus] = useState<OrderStatus | 'all'>('all');
    const [orders] = useState<Order[]>(mockOrders);

    const filteredOrders = orders.filter(order => {
        const matchesSearch = order.orderNumber.toLowerCase().includes(searchQuery.toLowerCase()) ||
            order.items.some(item => item.name.toLowerCase().includes(searchQuery.toLowerCase()));
        const matchesFilter = filterStatus === 'all' || order.status === filterStatus;
        return matchesSearch && matchesFilter;
    });

    const formatCurrency = (amount: number) => {
        return new Intl.NumberFormat('id-ID', {
            style: 'currency',
            currency: 'IDR',
            minimumFractionDigits: 0
        }).format(amount);
    };

    const formatDate = (dateString: string) => {
        return new Date(dateString).toLocaleDateString('id-ID', {
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        });
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
                    <span className="text-foreground font-medium">My Orders</span>
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
                            <h1 className="text-2xl md:text-3xl font-bold tracking-tight">My Orders</h1>
                            <p className="text-sm text-muted-foreground mt-1">
                                Track and manage your orders
                            </p>
                        </div>
                    </div>
                </motion.div>

                {/* Search and Filter */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="bg-card border border-border rounded-2xl p-4 mb-6 shadow-sm"
                >
                    <div className="flex flex-col md:flex-row gap-4">
                        <div className="flex-1 relative">
                            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" size={18} />
                            <input
                                type="text"
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                placeholder="Search by order number or product name..."
                                className="w-full pl-10 pr-4 py-3 border border-border rounded-xl bg-background focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary transition-all"
                            />
                        </div>
                        <div className="flex items-center gap-2">
                            <Filter className="text-muted-foreground" size={18} />
                            <select
                                value={filterStatus}
                                onChange={(e) => setFilterStatus(e.target.value as OrderStatus | 'all')}
                                className="px-4 py-3 border border-border rounded-xl bg-background focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary cursor-pointer transition-all"
                            >
                                <option value="all">All Orders</option>
                                <option value="pending">Pending</option>
                                <option value="processing">Processing</option>
                                <option value="shipped">Shipped</option>
                                <option value="delivered">Delivered</option>
                                <option value="cancelled">Cancelled</option>
                            </select>
                        </div>
                    </div>
                </motion.div>

                {/* Orders List */}
                <div className="space-y-4">
                    <AnimatePresence mode="popLayout">
                        {filteredOrders.length === 0 ? (
                            <motion.div
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                exit={{ opacity: 0 }}
                                className="bg-card border border-border rounded-2xl p-12 text-center"
                            >
                                <Package className="mx-auto mb-4 text-muted-foreground" size={48} />
                                <h3 className="text-lg font-semibold mb-2">No orders found</h3>
                                <p className="text-muted-foreground mb-4">
                                    {searchQuery || filterStatus !== 'all'
                                        ? "Try adjusting your search or filter"
                                        : "You haven't placed any orders yet"}
                                </p>
                                <Button onClick={() => navigate('/')}>
                                    Start Shopping
                                </Button>
                            </motion.div>
                        ) : (
                            filteredOrders.map((order, index) => {
                                const statusInfo = statusConfig[order.status];
                                const StatusIcon = statusInfo.icon;

                                return (
                                    <motion.div
                                        key={order.id}
                                        initial={{ opacity: 0, y: 20 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        exit={{ opacity: 0, y: -20 }}
                                        transition={{ delay: index * 0.1 }}
                                        className="bg-card border border-border rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition-all"
                                    >
                                        {/* Order Header */}
                                        <div className="bg-muted/30 px-6 py-4 border-b border-border">
                                            <div className="flex flex-wrap items-center justify-between gap-4">
                                                <div className="flex items-center gap-4">
                                                    <div>
                                                        <p className="text-sm text-muted-foreground">Order Number</p>
                                                        <p className="font-semibold">{order.orderNumber}</p>
                                                    </div>
                                                    <div className="h-8 w-px bg-border" />
                                                    <div>
                                                        <p className="text-sm text-muted-foreground">Order Date</p>
                                                        <p className="font-medium">{formatDate(order.date)}</p>
                                                    </div>
                                                </div>
                                                <div className={`flex items-center gap-2 px-4 py-2 rounded-xl border ${statusInfo.color} ${statusInfo.darkColor}`}>
                                                    <StatusIcon size={16} />
                                                    <span className="font-medium text-sm">{statusInfo.label}</span>
                                                </div>
                                            </div>
                                        </div>

                                        {/* Order Items */}
                                        <div className="p-6">
                                            <div className="space-y-4 mb-4">
                                                {order.items.map((item) => (
                                                    <div key={item.id} className="flex gap-4">
                                                        <img
                                                            src={item.image}
                                                            alt={item.name}
                                                            className="w-20 h-20 object-cover rounded-lg border border-border"
                                                        />
                                                        <div className="flex-1">
                                                            <h4 className="font-medium mb-1">{item.name}</h4>
                                                            <p className="text-sm text-muted-foreground">
                                                                Quantity: {item.quantity}
                                                            </p>
                                                            <p className="text-sm font-semibold text-primary mt-1">
                                                                {formatCurrency(item.price)}
                                                            </p>
                                                        </div>
                                                    </div>
                                                ))}
                                            </div>

                                            {/* Shipping Address */}
                                            <div className="bg-muted/30 rounded-xl p-4 mb-4">
                                                <div className="flex items-start gap-2">
                                                    <MapPin className="text-muted-foreground flex-shrink-0 mt-0.5" size={16} />
                                                    <div>
                                                        <p className="text-sm font-medium mb-1">Shipping Address</p>
                                                        <p className="text-sm text-muted-foreground">{order.shippingAddress}</p>
                                                    </div>
                                                </div>
                                            </div>

                                            {/* Footer */}
                                            <div className="flex items-center justify-between pt-4 border-t border-border">
                                                <div>
                                                    <p className="text-sm text-muted-foreground mb-1">Total Amount</p>
                                                    <p className="text-xl font-bold text-primary">{formatCurrency(order.total)}</p>
                                                </div>
                                                <Button variant="outline" className="rounded-xl">
                                                    <Eye size={16} className="mr-2" />
                                                    View Details
                                                </Button>
                                            </div>
                                        </div>
                                    </motion.div>
                                );
                            })
                        )}
                    </AnimatePresence>
                </div>
            </div>

            <Footer />
        </div>
    );
}
