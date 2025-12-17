import { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import { CreditCard, User, Phone, MapPin } from 'lucide-react';
import { SharedHeader } from '../shared-header';
import { Button } from './button';
import { Input } from './input';
import { Label } from './label';

interface CartItem {
  id: string;
  name: string;
  store: string;
  price: number;
  quantity: number;
  image: string;
  selected: boolean;
}

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

  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    address: '',
  });

  const [paymentMethod, setPaymentMethod] = useState('');

  const orderNumber = 'ORD' + Date.now();
  const subtotal = selectedItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const discount = subtotal * 0.1;
  const total = subtotal - discount;

  const isFormValid = formData.name && formData.phone && formData.address && paymentMethod;

  const selectedBank = paymentMethod ? bankAccounts[paymentMethod] : null;

  const handleProceed = () => {
    if (isFormValid) {
      navigate('/order-confirmation', { 
        state: { 
          orderNumber, 
          selectedItems, 
          total,
          formData,
          paymentMethod,
        } 
      });
    }
  };

  const pageVariants = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
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

  return (
    <div className="min-h-screen bg-background">
      <SharedHeader />
      
      <div className="container px-4 md:px-6 mx-auto max-w-7xl py-8">
        {/* Page Title */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="mb-8"
        >
          <h1 className="text-4xl md:text-5xl font-bold mb-2">Checkout</h1>
          <p className="text-muted-foreground">Complete your order details</p>
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
                <h2 className="text-2xl font-bold">Buyer Information</h2>
              </div>
              
              <div className="space-y-4">
                <div>
                  <Label htmlFor="name">Full Name</Label>
                  <Input
                    id="name"
                    type="text"
                    placeholder="John Doe"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="mt-2"
                  />
                </div>
                <div>
                  <Label htmlFor="phone">Phone Number</Label>
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
                  <Label htmlFor="address">Delivery Address</Label>
                  <textarea
                    id="address"
                    placeholder="Street address, city, province..."
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
                <h2 className="text-2xl font-bold">Payment Method</h2>
              </div>
              
              <div>
                <Label htmlFor="payment">Select Payment Method</Label>
                <select
                  id="payment"
                  value={paymentMethod}
                  onChange={(e) => setPaymentMethod(e.target.value)}
                  className="w-full mt-2 px-3 py-2 text-sm rounded-md border border-input bg-background ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                >
                  <option value="">Choose a payment method</option>
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
                <h3 className="text-lg font-bold mb-4">Bank Account Details</h3>
                <div className="space-y-3 mb-4">
                  <div className="flex justify-between p-3 bg-background/50 rounded-lg">
                    <span className="text-muted-foreground">Bank:</span>
                    <span className="font-semibold">{selectedBank?.name}</span>
                  </div>
                  <div className="flex justify-between p-3 bg-background/50 rounded-lg">
                    <span className="text-muted-foreground">Account Name:</span>
                    <span className="font-semibold">Reloop</span>
                  </div>
                  <div className="flex justify-between p-3 bg-background/50 rounded-lg">
                    <span className="text-muted-foreground">Account Number:</span>
                    <span className="font-mono font-bold text-primary">{selectedBank?.accountNumber}</span>
                  </div>
                </div>
                <p className="text-sm text-muted-foreground bg-background/50 p-3 rounded-lg">
                  Please transfer the exact amount to this account and save the proof of transfer for confirmation.
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
              <h2 className="text-2xl font-bold mb-6">Order Summary</h2>
              
              {/* Order Number */}
              <div className="mb-4 p-3 bg-background/50 rounded-lg">
                <span className="text-sm text-muted-foreground">Order Number</span>
                <p className="font-mono font-bold text-primary mt-1">{orderNumber}</p>
              </div>

              {/* Items */}
              <div className="mb-6">
                <h3 className="font-semibold mb-3">Items</h3>
                <div className="space-y-2">
                  {selectedItems.map((item) => (
                    <div key={item.id} className="flex justify-between text-sm p-2 bg-background/30 rounded-lg">
                      <span className="text-muted-foreground truncate flex-1">{item.name} x{item.quantity}</span>
                      <span className="font-medium ml-2">Rp {(item.price * item.quantity).toLocaleString('id-ID')}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Price Breakdown */}
              <div className="space-y-3 mb-6 pt-4 border-t border-border">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Subtotal</span>
                  <span className="font-medium">Rp {subtotal.toLocaleString('id-ID')}</span>
                </div>
                <div className="flex justify-between text-green-600">
                  <span>Discount (10%)</span>
                  <span className="font-medium">-Rp {discount.toLocaleString('id-ID')}</span>
                </div>
                <div className="flex justify-between text-lg font-bold pt-3 border-t border-border">
                  <span>Total</span>
                  <span>Rp {total.toLocaleString('id-ID')}</span>
                </div>
              </div>

              {/* Buttons */}
              <div className="space-y-3">
                <Button
                  onClick={handleProceed}
                  disabled={!isFormValid}
                  className="w-full bg-primary text-primary-foreground rounded-full py-6 text-base font-semibold hover:shadow-lg transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Proceed to Payment
                </Button>
                <Button
                  variant="outline"
                  onClick={() => navigate('/cart')}
                  className="w-full rounded-full py-6 text-base font-semibold"
                >
                  Back to Cart
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