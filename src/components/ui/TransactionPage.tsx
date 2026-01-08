import { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import { CreditCard, User, Loader2, CheckCircle } from 'lucide-react';

import { Button } from './button';
import { Input } from './input';
import { Label } from './label';
import { api } from '../../services/api';
import { authService, getToken } from '../../services';
import { cartService, type CartItem } from '../../services/cartService';

interface BankAccount {
  name: string;
  accountNumber: string;
}

const bankAccounts: Record<string, BankAccount> = {
  bri: { name: 'BRI (Bank Rakyat Indonesia)', accountNumber: String(Math.floor(Math.random() * 9000000000000000) + 1000000000000000) },
  bni: { name: 'BNI (Bank Negara Indonesia)', accountNumber: String(Math.floor(Math.random() * 9000000000000000) + 1000000000000000) },
  bca: { name: 'BCA (Bank Central Asia)', accountNumber: String(Math.floor(Math.random() * 9000000000000000) + 1000000000000000) },
  bsi: { name: 'BSI (Bank Syariah Indonesia)', accountNumber: String(Math.floor(Math.random() * 9000000000000000) + 1000000000000000) },
  btn: { name: 'BTN (Bank Tabungan Negara)', accountNumber: String(Math.floor(Math.random() * 9000000000000000) + 1000000000000000) },
  cimb: { name: 'CIMB Niaga', accountNumber: String(Math.floor(Math.random() * 9000000000000000) + 1000000000000000) },
  danamon: { name: 'Bank Danamon', accountNumber: String(Math.floor(Math.random() * 9000000000000000) + 1000000000000000) },
  mega: { name: 'Bank Mega', accountNumber: String(Math.floor(Math.random() * 9000000000000000) + 1000000000000000) },
  cod: { name: 'Cash on Delivery', accountNumber: '' },
};

const TransactionPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const selectedItems = (location.state?.selectedItems as CartItem[]) || [];

  const [isLoadingUser, setIsLoadingUser] = useState(true);
  const [isProcessing, setIsProcessing] = useState(false);
  const [paymentSuccess, setPaymentSuccess] = useState(false);

  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    address: '',
  });

  const [paymentMethod, setPaymentMethod] = useState('');

  // Fetch user data on mount
  useEffect(() => {
    const fetchUser = async () => {
      const token = getToken();
      if (!token) {
        navigate('/login');
        return;
      }

      try {
        const userData = await authService.me();
        // Pre-fill form with user data
        setFormData({
          name: userData.full_name || '',
          phone: userData.phone_number || '',
          address: userData.address || '',
        });
      } catch (err) {
        console.error('Error fetching user:', err);
        navigate('/login');
      } finally {
        setIsLoadingUser(false);
      }
    };

    fetchUser();
  }, [navigate]);

  const subtotal = selectedItems.reduce((sum, item) => sum + item.product.price * item.quantity, 0);
  const total = subtotal;

  const isFormValid = formData.name && formData.phone && formData.address && paymentMethod;

  const selectedBank = paymentMethod ? bankAccounts[paymentMethod] : null;

  // Simulated payment - creates transactions via API
  const handlePayment = async () => {
    if (!isFormValid) return;

    setIsProcessing(true);

    try {
      // Create a transaction for each item in the cart
      for (const item of selectedItems) {
        await api.post('/api/v1/transactions', {
          product_id: item.product.id,
          deal_price: item.product.price * item.quantity,
        });
      }

      // Clear cart after successful payment
      selectedItems.forEach(item => {
        cartService.removeFromCart(item.id);
      });

      setPaymentSuccess(true);

      // Redirect to order confirmation after 2 seconds
      setTimeout(() => {
        navigate('/my-orders');
      }, 2000);
    } catch (err) {
      console.error('Error creating transaction:', err);
      alert('Gagal memproses pembayaran. Silakan coba lagi.');
    } finally {
      setIsProcessing(false);
    }
  };

  const containerVariants = {
    initial: { opacity: 0 },
    animate: {
      opacity: 1,
      transition: { staggerChildren: 0.1 },
    },
  };

  const itemVariants = {
    initial: { opacity: 0, y: 10 },
    animate: { opacity: 1, y: 0 },
  };

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      minimumFractionDigits: 0
    }).format(price);
  };

  // Payment success screen
  if (paymentSuccess) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="text-center p-8"
        >
          <div className="w-20 h-20 mx-auto mb-6 bg-green-100 rounded-full flex items-center justify-center">
            <CheckCircle className="w-12 h-12 text-green-600" />
          </div>
          <h1 className="text-3xl font-bold mb-2">Pembayaran Berhasil!</h1>
          <p className="text-muted-foreground mb-4">Pesanan Anda sedang diproses</p>
          <p className="text-sm text-muted-foreground">Mengalihkan ke halaman pesanan...</p>
        </motion.div>
      </div>
    );
  }

  if (isLoadingUser) {
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
    <div className="min-h-screen bg-background">
      <div className="container px-4 md:px-6 mx-auto max-w-7xl py-8">
        {/* Page Title */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="mb-8"
        >
          <h1 className="text-4xl md:text-5xl font-bold mb-2">Checkout</h1>
          <p className="text-muted-foreground">Lengkapi detail pesanan Anda</p>
        </motion.div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Left Section - Form */}
          <motion.div
            className="lg:col-span-2 space-y-6"
            variants={containerVariants}
            initial="initial"
            animate="animate"
          >
            {/* Buyer Information */}
            <motion.div
              variants={itemVariants}
              className="bg-card border border-border rounded-2xl p-6 shadow-sm"
            >
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center">
                  <User className="w-5 h-5 text-primary" />
                </div>
                <h2 className="text-2xl font-bold">Informasi Pembeli</h2>
              </div>

              <div className="space-y-4">
                <div>
                  <Label htmlFor="name">Nama Lengkap</Label>
                  <Input
                    id="name"
                    type="text"
                    placeholder="Nama lengkap"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="mt-2"
                  />
                </div>
                <div>
                  <Label htmlFor="phone">Nomor Telepon</Label>
                  <Input
                    id="phone"
                    type="text"
                    placeholder="+62 812 3456 7890"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    className="mt-2"
                  />
                </div>
                <div>
                  <Label htmlFor="address">Alamat Pengiriman</Label>
                  <textarea
                    id="address"
                    placeholder="Alamat lengkap pengiriman..."
                    value={formData.address}
                    onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                    className="w-full mt-2 min-h-[120px] px-3 py-2 text-sm rounded-md border border-input bg-background ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                  />
                </div>
              </div>
            </motion.div>

            {/* Payment Method */}
            <motion.div
              variants={itemVariants}
              className="bg-card border border-border rounded-2xl p-6 shadow-sm"
            >
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center">
                  <CreditCard className="w-5 h-5 text-primary" />
                </div>
                <h2 className="text-2xl font-bold">Metode Pembayaran</h2>
              </div>

              <div>
                <Label htmlFor="payment">Pilih Metode Pembayaran</Label>
                <select
                  id="payment"
                  value={paymentMethod}
                  onChange={(e) => setPaymentMethod(e.target.value)}
                  className="w-full mt-2 px-3 py-2 text-sm rounded-md border border-input bg-background ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                >
                  <option value="">Pilih metode pembayaran</option>
                  <option value="bri">BRI (Bank Rakyat Indonesia)</option>
                  <option value="bni">BNI (Bank Negara Indonesia)</option>
                  <option value="bca">BCA (Bank Central Asia)</option>
                  <option value="bsi">BSI (Bank Syariah Indonesia)</option>
                  <option value="btn">BTN (Bank Tabungan Negara)</option>
                  <option value="cimb">CIMB Niaga</option>
                  <option value="danamon">Bank Danamon</option>
                  <option value="mega">Bank Mega</option>
                  <option value="cod">Cash on Delivery (COD)</option>
                </select>
              </div>
            </motion.div>

            {/* Bank Account Info */}
            {paymentMethod && paymentMethod !== 'cod' && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
                className="bg-gradient-to-br from-accent/20 via-accent/10 to-primary/5 border border-border rounded-2xl p-6"
              >
                <h3 className="text-lg font-bold mb-4">Detail Rekening Bank</h3>
                <div className="space-y-3 mb-4">
                  <div className="flex justify-between p-3 bg-background/50 rounded-lg">
                    <span className="text-muted-foreground">Bank:</span>
                    <span className="font-semibold">{selectedBank?.name}</span>
                  </div>
                  <div className="flex justify-between p-3 bg-background/50 rounded-lg">
                    <span className="text-muted-foreground">Nama Akun:</span>
                    <span className="font-semibold">Reloop</span>
                  </div>
                  <div className="flex justify-between p-3 bg-background/50 rounded-lg">
                    <span className="text-muted-foreground">Nomor Rekening:</span>
                    <span className="font-mono font-bold text-primary">{selectedBank?.accountNumber}</span>
                  </div>
                </div>
                <p className="text-sm text-muted-foreground bg-background/50 p-3 rounded-lg">
                  Silakan transfer sesuai jumlah total dan simpan bukti transfer untuk konfirmasi.
                </p>
              </motion.div>
            )}
          </motion.div>

          {/* Right Section - Summary */}
          <motion.div
            className="lg:col-span-1"
            variants={containerVariants}
            initial="initial"
            animate="animate"
          >
            <motion.div
              variants={itemVariants}
              className="bg-gradient-to-br from-accent/20 via-accent/10 to-primary/5 border border-border rounded-2xl p-6 sticky top-6"
            >
              <h2 className="text-2xl font-bold mb-6">Ringkasan Pesanan</h2>

              {/* Items */}
              <div className="mb-6">
                <h3 className="font-semibold mb-3">Produk</h3>
                <div className="space-y-2 max-h-48 overflow-y-auto">
                  {selectedItems.map((item) => (
                    <div key={item.id} className="flex justify-between text-sm p-2 bg-background/30 rounded-lg">
                      <span className="text-muted-foreground truncate flex-1">{item.product.name} x{item.quantity}</span>
                      <span className="font-medium ml-2">{formatPrice(item.product.price * item.quantity)}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Price Breakdown */}
              <div className="space-y-3 mb-6 pt-4 border-t border-border">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Subtotal</span>
                  <span className="font-medium">{formatPrice(subtotal)}</span>
                </div>
                <div className="flex justify-between text-lg font-bold pt-3 border-t border-border">
                  <span>Total</span>
                  <span className="text-primary">{formatPrice(total)}</span>
                </div>
              </div>

              {/* Payment Simulation Notice */}
              <div className="bg-yellow-50 border border-yellow-200 rounded-xl p-4 mb-4">
                <p className="text-sm text-yellow-700">
                  <strong>Simulasi Pembayaran:</strong> Klik tombol "Bayar Sekarang" untuk mensimulasikan pembayaran dan membuat transaksi.
                </p>
              </div>

              {/* Buttons */}
              <div className="space-y-3">
                <Button
                  onClick={handlePayment}
                  disabled={!isFormValid || isProcessing}
                  className="w-full bg-primary text-primary-foreground rounded-full py-6 text-base font-semibold hover:shadow-lg transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isProcessing ? (
                    <>
                      <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                      Memproses...
                    </>
                  ) : (
                    '💳 Bayar Sekarang'
                  )}
                </Button>
                <Button
                  variant="outline"
                  onClick={() => navigate('/cart')}
                  disabled={isProcessing}
                  className="w-full rounded-full py-6 text-base font-semibold"
                >
                  Kembali ke Keranjang
                </Button>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default TransactionPage;
