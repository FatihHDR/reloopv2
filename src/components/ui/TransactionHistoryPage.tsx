import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ShoppingBag, Star, CheckCircle, Clock, XCircle, Loader2, Truck, Package } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

import { Button } from './button';
import { api } from '../../services/api';
import { getToken } from '../../services';
import type { Transaction } from '../../types/api';

const TransactionHistoryPage = () => {
  const navigate = useNavigate();
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedTransaction, setSelectedTransaction] = useState<Transaction | null>(null);

  useEffect(() => {
    const fetchTransactions = async () => {
      const token = getToken();
      if (!token) {
        navigate('/login');
        return;
      }

      try {
        // API returns transactions for the logged-in user
        // Use role=buyer to get purchases (my-purchases endpoint doesn't exist on this backend)
        const response = await api.get<{ data?: Transaction[] } | Transaction[]>('/api/v1/transactions?role=buyer');
        console.log('[TransactionHistory] API Response:', response);

        // Handle both wrapped { data: [...] } and direct array responses
        let transactionData: Transaction[] = [];
        if (Array.isArray(response)) {
          transactionData = response;
        } else if (response && Array.isArray(response.data)) {
          transactionData = response.data;
        }

        setTransactions(transactionData);
      } catch (err: unknown) {
        console.error('[TransactionHistory] Error fetching transactions:', err);
        // Show more specific error if available
        const errorMessage = err instanceof Error ? err.message : 'Gagal memuat riwayat transaksi';
        setError(errorMessage);
      } finally {
        setIsLoading(false);
      }
    };

    fetchTransactions();
  }, [navigate]);

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'completed':
        return {
          icon: <CheckCircle className="w-4 h-4" />,
          label: 'Selesai',
          className: 'bg-green-100 text-green-700 border-green-200'
        };
      case 'confirmed':
        return {
          icon: <Package className="w-4 h-4" />,
          label: 'Dikonfirmasi',
          className: 'bg-blue-100 text-blue-700 border-blue-200'
        };
      case 'shipped':
        return {
          icon: <Truck className="w-4 h-4" />,
          label: 'Dikirim',
          className: 'bg-purple-100 text-purple-700 border-purple-200'
        };
      case 'pending':
        return {
          icon: <Clock className="w-4 h-4" />,
          label: 'Menunggu',
          className: 'bg-yellow-100 text-yellow-700 border-yellow-200'
        };
      case 'cancelled':
        return {
          icon: <XCircle className="w-4 h-4" />,
          label: 'Dibatalkan',
          className: 'bg-red-100 text-red-700 border-red-200'
        };
      default:
        return {
          icon: null,
          label: status,
          className: 'bg-gray-100 text-gray-700 border-gray-200'
        };
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('id-ID', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      minimumFractionDigits: 0
    }).format(price);
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="flex flex-col items-center gap-4">
          <Loader2 className="w-12 h-12 animate-spin text-primary" />
          <p className="text-muted-foreground">Memuat riwayat transaksi...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <p className="text-red-500 mb-4">{error}</p>
          <Button onClick={() => window.location.reload()}>Coba Lagi</Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="container px-4 md:px-6 mx-auto max-w-7xl py-8">
        {/* Page Title */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="mb-8"
        >
          <h1 className="text-4xl md:text-5xl font-bold mb-2">Pesanan Saya</h1>
          <p className="text-muted-foreground">Lihat dan kelola riwayat transaksi Anda</p>
        </motion.div>

        {/* Transaction List */}
        {transactions.length === 0 ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="bg-card border border-border rounded-2xl p-12 text-center"
          >
            <ShoppingBag className="w-16 h-16 mx-auto text-muted-foreground mb-4" />
            <h3 className="text-xl font-semibold mb-2">Belum ada transaksi</h3>
            <p className="text-muted-foreground mb-6">Mulai belanja untuk melihat riwayat transaksi Anda</p>
            <Button onClick={() => navigate('/shop')} className="rounded-full">
              Mulai Belanja
            </Button>
          </motion.div>
        ) : (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.4, delay: 0.1 }}
            className="space-y-4"
          >
            {transactions.map((transaction, index) => {
              const statusBadge = getStatusBadge(transaction.status);
              return (
                <motion.div
                  key={transaction.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: index * 0.1 }}
                  onClick={() => setSelectedTransaction(transaction)}
                  className="bg-card border border-border rounded-2xl p-6 shadow-sm hover:shadow-md transition-all cursor-pointer"
                >
                  <div className="flex gap-4">
                    {/* Product Image */}
                    <img
                      src={transaction.product?.primary_image?.image_url || transaction.product?.images?.[0]?.image_url || 'https://images.unsplash.com/photo-1560393464-5c69a73c5770?w=500'}
                      alt={transaction.product?.name || 'Product'}
                      className="w-24 h-24 object-cover rounded-xl"
                    />

                    {/* Transaction Info */}
                    <div className="flex-1">
                      <div className="flex items-start justify-between mb-2">
                        <div>
                          <h3 className="text-lg font-bold mb-1">
                            {transaction.product?.name || 'Product'}
                          </h3>
                          <p className="text-sm text-muted-foreground mb-2">
                            {formatDate(transaction.created_at)}
                          </p>
                          <p className="text-sm text-muted-foreground">
                            Penjual: {transaction.seller?.full_name || transaction.seller?.username || 'Unknown'}
                          </p>
                        </div>
                        <span className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-sm font-medium border ${statusBadge.className}`}>
                          {statusBadge.icon}
                          {statusBadge.label}
                        </span>
                      </div>
                    </div>

                    {/* Price & Action */}
                    <div className="flex flex-col items-end justify-between">
                      <div className="text-right">
                        <p className="text-2xl font-bold text-primary">
                          {formatPrice(transaction.deal_price)}
                        </p>
                        <p className="text-xs text-muted-foreground mt-1">
                          ID: {transaction.id}
                        </p>
                      </div>
                      <Button
                        variant="outline"
                        size="sm"
                        className="rounded-full"
                        onClick={(e) => {
                          e.stopPropagation();
                          setSelectedTransaction(transaction);
                        }}
                      >
                        Lihat Detail →
                      </Button>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </motion.div>
        )}
      </div>

      {/* Detail Modal */}
      <AnimatePresence>
        {selectedTransaction && (
          <motion.div
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedTransaction(null)}
          >
            <motion.div
              className="bg-background border border-border rounded-2xl max-w-3xl w-full max-h-[90vh] overflow-y-auto"
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              transition={{ type: 'spring', damping: 25, stiffness: 300 }}
              onClick={(e) => e.stopPropagation()}
            >
              {/* Modal Header */}
              <div className="sticky top-0 bg-background border-b border-border p-6 flex items-center justify-between">
                <h2 className="text-2xl font-bold">Detail Transaksi</h2>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setSelectedTransaction(null)}
                  className="rounded-full"
                >
                  <X className="w-5 h-5" />
                </Button>
              </div>

              {/* Modal Body */}
              <div className="p-6 space-y-6">
                {/* Transaction ID & Status */}
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="p-4 bg-accent/20 rounded-xl">
                    <p className="text-sm text-muted-foreground mb-1">ID Transaksi</p>
                    <p className="font-mono font-bold text-primary">
                      TRX-{selectedTransaction.id}
                    </p>
                  </div>
                  <div className="p-4 bg-accent/20 rounded-xl">
                    <p className="text-sm text-muted-foreground mb-2">Status</p>
                    {(() => {
                      const badge = getStatusBadge(selectedTransaction.status);
                      return (
                        <span className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-sm font-medium border ${badge.className}`}>
                          {badge.icon}
                          {badge.label}
                        </span>
                      );
                    })()}
                  </div>
                </div>

                <div className="p-4 bg-accent/20 rounded-xl">
                  <p className="text-sm text-muted-foreground mb-1">Tanggal Transaksi</p>
                  <p className="font-medium">{formatDate(selectedTransaction.created_at)}</p>
                </div>

                {/* Seller Information */}
                <div className="bg-card border border-border rounded-xl p-6">
                  <h3 className="text-lg font-bold mb-4">Informasi Penjual</h3>
                  <div className="flex items-center gap-4 p-3 bg-accent/10 rounded-lg">
                    {selectedTransaction.seller?.profile_picture_url ? (
                      <img
                        src={selectedTransaction.seller.profile_picture_url}
                        alt={selectedTransaction.seller.full_name}
                        className="w-12 h-12 rounded-full object-cover"
                      />
                    ) : (
                      <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
                        <span className="text-primary font-bold text-lg">
                          {(selectedTransaction.seller?.full_name || 'U').charAt(0)}
                        </span>
                      </div>
                    )}
                    <div>
                      <p className="font-medium">{selectedTransaction.seller?.full_name || selectedTransaction.seller?.username}</p>
                      <p className="text-sm text-muted-foreground">{selectedTransaction.seller?.city || 'Location unknown'}</p>
                    </div>
                  </div>
                </div>

                {/* Product */}
                <div className="bg-card border border-border rounded-xl p-6">
                  <h3 className="text-lg font-bold mb-4">Produk</h3>
                  <div className="flex gap-4 p-4 bg-accent/10 rounded-lg">
                    <img
                      src={selectedTransaction.product?.primary_image?.image_url || selectedTransaction.product?.images?.[0]?.image_url || 'https://images.unsplash.com/photo-1560393464-5c69a73c5770?w=500'}
                      alt={selectedTransaction.product?.name}
                      className="w-24 h-24 object-cover rounded-lg"
                    />
                    <div className="flex-1">
                      <h4 className="font-semibold mb-1">{selectedTransaction.product?.name}</h4>
                      <p className="text-sm text-muted-foreground mb-2 line-clamp-2">{selectedTransaction.product?.description}</p>
                      <p className="text-sm text-muted-foreground">Lokasi: {selectedTransaction.product?.location}</p>
                    </div>
                    {selectedTransaction.status === 'completed' && (
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => navigate('/write-review', { state: { product: selectedTransaction.product, transaction: selectedTransaction } })}
                        className="rounded-full flex items-center gap-2 self-end"
                      >
                        <Star className="w-4 h-4" />
                        Review
                      </Button>
                    )}
                  </div>
                </div>

                {/* Price Summary */}
                <div className="bg-gradient-to-br from-accent/20 via-accent/10 to-primary/5 border border-border rounded-xl p-6">
                  <h3 className="text-lg font-bold mb-4">Ringkasan Harga</h3>
                  <div className="flex justify-between text-lg font-bold">
                    <span>Total</span>
                    <span className="text-primary">{formatPrice(selectedTransaction.deal_price)}</span>
                  </div>
                </div>
              </div>

              {/* Modal Actions */}
              <div className="sticky bottom-0 bg-background border-t border-border p-6 flex gap-3">
                <Button
                  variant="outline"
                  className="flex-1 rounded-full py-6 text-base font-semibold flex items-center justify-center gap-2"
                  onClick={() => {
                    navigate(`/product/${selectedTransaction.product_id}`);
                    setSelectedTransaction(null);
                  }}
                >
                  <ShoppingBag className="w-5 h-5" />
                  Beli Lagi
                </Button>
                <Button
                  variant="default"
                  className="flex-1 rounded-full py-6 text-base font-semibold"
                  onClick={() => setSelectedTransaction(null)}
                >
                  Tutup
                </Button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default TransactionHistoryPage;

