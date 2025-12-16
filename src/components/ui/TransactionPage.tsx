import { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft } from 'lucide-react';
import './TransactionPage.css';

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
      navigate('/payment-confirmation', { 
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
    <motion.div
      className="transaction-page"
      variants={pageVariants}
      initial="initial"
      animate="animate"
      transition={{ duration: 0.4 }}
    >
      <div className="transaction-header">
        <button className="back-button" onClick={() => navigate('/cart')}>
          <ArrowLeft size={20} />
        </button>
        <h1>Transaction</h1>
      </div>

      <div className="transaction-layout">
        {/* Left Section - Form */}
        <motion.div className="form-section" variants={containerVariants} initial="initial" animate="animate">
          {/* Buyer Information */}
          <motion.div className="card" variants={itemVariants}>
            <h2>Buyer Information</h2>
            <div className="form-group">
              <label>Full Name</label>
              <input
                type="text"
                placeholder="John Doe"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              />
            </div>
            <div className="form-group">
              <label>Phone Number</label>
              <input
                type="text"
                placeholder="+62 812 3456 7890"
                value={formData.phone}
                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
              />
            </div>
            <div className="form-group">
              <label>Delivery Address</label>
              <textarea
                className="address-textarea"
                placeholder="Street address, city, province..."
                value={formData.address}
                onChange={(e) => setFormData({ ...formData, address: e.target.value })}
              />
            </div>
          </motion.div>

          {/* Payment Method */}
          <motion.div className="card" variants={itemVariants}>
            <h2>Payment Method</h2>
            <div className="form-group">
              <label>Select Payment Method</label>
              <select 
                value={paymentMethod} 
                onChange={(e) => setPaymentMethod(e.target.value)}
                className="payment-select"
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
              className="card bank-account-card"
              variants={itemVariants}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
            >
              <h3>Bank Account Details</h3>
              <div className="account-info">
                <div className="account-row">
                  <span className="label">Bank:</span>
                  <span className="value">{selectedBank?.name}</span>
                </div>
                <div className="account-row">
                  <span className="label">Account Name:</span>
                  <span className="value">Reloop</span>
                </div>
                <div className="account-row">
                  <span className="label">Account Number:</span>
                  <span className="value account-number">{selectedBank?.accountNumber}</span>
                </div>
              </div>
              <p className="account-note">
                Please transfer the exact amount to this account and save the proof of transfer for confirmation.
              </p>
            </motion.div>
          )}
        </motion.div>

        {/* Right Section - Summary */}
        <motion.div className="summary-section" variants={containerVariants} initial="initial" animate="animate">
          <motion.div className="card summary-card" variants={itemVariants}>
            <h2>Order Summary</h2>
            
            <div className="order-items">
              <h3>Items</h3>
              {selectedItems.map((item) => (
                <div key={item.id} className="order-item">
                  <span className="item-name">{item.name}</span>
                  <span className="item-qty">x{item.quantity}</span>
                  <span className="item-price">Rp {(item.price * item.quantity).toLocaleString('id-ID')}</span>
                </div>
              ))}
            </div>

            <div className="order-number">
              <span className="label">Order Number:</span>
              <span className="value">{orderNumber}</span>
            </div>

            <div className="price-breakdown">
              <div className="price-row">
                <span>Subtotal</span>
                <span>Rp {subtotal.toLocaleString('id-ID')}</span>
              </div>
              <div className="price-row discount">
                <span>Discount (10%)</span>
                <span>-Rp {discount.toLocaleString('id-ID')}</span>
              </div>
              <div className="price-row total">
                <span>Total</span>
                <span>Rp {total.toLocaleString('id-ID')}</span>
              </div>
            </div>

            <div className="button-group">
              <button className="btn-secondary" onClick={() => navigate('/cart')}>
                Back to Cart
              </button>
              <button 
                className="btn-primary" 
                onClick={handleProceed} 
                disabled={!isFormValid}
              >
                Proceed to Payment
              </button>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default TransactionPage;