import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ShoppingBag, Star } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import './TransactionHistoryPage.css';

interface CartItem {
  id: string;
  name: string;
  store: string;
  price: number;
  quantity: number;
  image: string;
}

interface Transaction {
  id: string;
  orderNumber: string;
  date: string;
  status: 'Paid' | 'Pending' | 'Canceled';
  total: number;
  items: CartItem[];
  buyerName: string;
  buyerPhone: string;
  buyerAddress: string;
  paymentMethod: string;
}

const TransactionHistoryPage = () => {
  const navigate = useNavigate();
  const [transactions] = useState<Transaction[]>([
    {
      id: '1',
      orderNumber: 'ORD' + Date.now().toString().slice(-8),
      date: '2024-01-15',
      status: 'Paid',
      total: 432000,
      items: [
        { id: '1', name: 'Premium Headphones', store: 'TechStore Pro', price: 299000, quantity: 1, image: 'https://unsplash.com/photos/black-wireless-headphones-between-apple-keyboard-and-apple-magic-mouse-on-white-surface-YDZPdqv3Fc' },
        { id: '2', name: 'USB-C Cable 2M', store: 'TechStore Pro', price: 45000, quantity: 2, image: 'https://unsplash.com/photos/white-sync-cable-6cXZnFCd2KQ' },
      ],
      buyerName: 'John Doe',
      buyerPhone: '+62 812 3456 7890',
      buyerAddress: 'Jln. Contoh No. 123, Yogyakarta',
      paymentMethod: 'BRI (Bank Rakyat Indonesia)',
    },
    {
      id: '2',
      orderNumber: 'ORD' + (Date.now() - 86400000).toString().slice(-8),
      date: '2024-01-14',
      status: 'Pending',
      total: 89000,
      items: [
        { id: '3', name: 'Phone Case', store: 'Accessories Hub', price: 89000, quantity: 1, image: 'https://unsplash.com/photos/four-assorted-color-iphone-x-cases-FQXbLmlmvWY' },
      ],
      buyerName: 'Jane Smith',
      buyerPhone: '+62 821 9876 5432',
      buyerAddress: 'Jln. Merdeka No. 456, Bandung',
      paymentMethod: 'BCA (Bank Central Asia)',
    },
    {
      id: '3',
      orderNumber: 'ORD' + (Date.now() - 172800000).toString().slice(-8),
      date: '2024-01-13',
      status: 'Canceled',
      total: 156000,
      items: [
        { id: '4', name: 'Screen Protector', store: 'Tech Accessories', price: 45000, quantity: 1, image: 'https://unsplash.com/photos/a-bottle-of-liquid-next-to-a-pair-of-gloves-O8bTf-5rDoM' },
        { id: '5', name: 'Charging Cable', store: 'Tech Accessories', price: 55000, quantity: 1, image: 'https://unsplash.com/photos/a-metal-frame-sitting-on-top-of-a-blueprint-RgMvkk2K6V0' },
        { id: '6', name: 'Phone Stand', store: 'Tech Accessories', price: 56000, quantity: 1, image: 'https://unsplash.com/photos/white-power-bank-with-three-charging-cables-7JbgHNq4h4k' },
      ],
      buyerName: 'Bob Wilson',
      buyerPhone: '+62 831 2345 6789',
      buyerAddress: 'Jln. Sudirman No. 789, Jakarta',
      paymentMethod: 'Transfer Bank',
    },
  ]);

  const [selectedTransaction, setSelectedTransaction] = useState<Transaction | null>(null);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Paid':
        return 'paid';
      case 'Pending':
        return 'pending';
      case 'Canceled':
        return 'canceled';
      default:
        return 'default';
    }
  };

  const getStatusLabel = (status: string) => {
    switch (status) {
      case 'Paid':
        return '✓ Paid';
      case 'Pending':
        return '⏳ Pending';
      case 'Canceled':
        return '✕ Canceled';
      default:
        return status;
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
      transition: { staggerChildren: 0.08 },
    },
  };

  const itemVariants = {
    initial: { opacity: 0, y: 10 },
    animate: { opacity: 1, y: 0 },
  };

  return (
    <motion.div
      className="transaction-history-page"
      variants={pageVariants}
      initial="initial"
      animate="animate"
      transition={{ duration: 0.4 }}
    >
      <div className="history-header">
        <h1>Transaction History</h1>
        <p className="subtitle">View and manage your past transactions</p>
      </div>

      <motion.div
        className="transaction-list"
        variants={containerVariants}
        initial="initial"
        animate="animate"
      >
        {transactions.map((transaction) => (
          <motion.div
            key={transaction.id}
            className="transaction-card"
            variants={itemVariants}
            onClick={() => setSelectedTransaction(transaction)}
          >
            <div className="card-content">
              {/* Product Image */}
              <div className="product-image">
                <img src={transaction.items[0]?.image} alt="product" className="image-emoji" />
              </div>

              {/* Transaction Info */}
              <div className="transaction-info">
                <div className="info-header">
                  <h3 className="product-name">{transaction.items[0]?.name}</h3>
                  <span className={`status-badge ${getStatusColor(transaction.status)}`}>
                    {getStatusLabel(transaction.status)}
                  </span>
                </div>

                <p className="transaction-date">{transaction.date}</p>

                <div className="items-summary">
                  <span className="item-count">
                    {transaction.items.length === 1
                      ? `1 item`
                      : `1 item +${transaction.items.length - 1} other items`}
                  </span>
                </div>
              </div>

              {/* Price & Details */}
              <div className="transaction-details">
                <div className="price-section">
                  <p className="price">Rp {transaction.total.toLocaleString('id-ID')}</p>
                  <p className="order-number">{transaction.orderNumber}</p>
                </div>
                <button className="view-detail-btn">Detail →</button>
              </div>
            </div>
          </motion.div>
        ))}
      </motion.div>

      {/* Detail Modal */}
      <AnimatePresence>
        {selectedTransaction && (
          <motion.div
            className="detail-modal-overlay"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedTransaction(null)}
          >
            <motion.div
              className="modal-content"
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              transition={{ type: 'spring', damping: 25, stiffness: 300 }}
              onClick={(e) => e.stopPropagation()}
            >
              {/* Modal Header */}
              <div className="modal-header">
                <h2>Transaction Details</h2>
                <button
                  className="close-button"
                  onClick={() => setSelectedTransaction(null)}
                >
                  <X size={24} />
                </button>
              </div>

              {/* Modal Body */}
              <div className="modal-body">
                {/* Order Number & Status */}
                <div className="modal-section">
                  <div className="section-row">
                    <div>
                      <p className="label">Order Number</p>
                      <p className="value order-num">{selectedTransaction.orderNumber}</p>
                    </div>
                    <div>
                      <p className="label">Status</p>
                      <span className={`status-badge-modal ${getStatusColor(selectedTransaction.status)}`}>
                        {getStatusLabel(selectedTransaction.status)}
                      </span>
                    </div>
                  </div>
                  <div className="section-row">
                    <div>
                      <p className="label">Transaction Date</p>
                      <p className="value">{selectedTransaction.date}</p>
                    </div>
                  </div>
                </div>

                {/* Buyer Information */}
                <div className="modal-section">
                  <h3 className="section-title">Buyer Information</h3>
                  <div className="info-grid">
                    <div>
                      <p className="label">Full Name</p>
                      <p className="value">{selectedTransaction.buyerName}</p>
                    </div>
                    <div>
                      <p className="label">Phone Number</p>
                      <p className="value">{selectedTransaction.buyerPhone}</p>
                    </div>
                    <div className="full-width">
                      <p className="label">Delivery Address</p>
                      <p className="value">{selectedTransaction.buyerAddress}</p>
                    </div>
                  </div>
                </div>

                {/* Payment Method */}
                <div className="modal-section">
                  <h3 className="section-title">Payment Information</h3>
                  <div className="payment-info">
                    <p className="label">Payment Method</p>
                    <p className="value">{selectedTransaction.paymentMethod}</p>
                  </div>
                </div>

                {/* Items */}
                <div className="modal-section">
                  <h3 className="section-title">Order Items</h3>
                  <div className="items-list">
                    {selectedTransaction.items.map((item) => (
                      <div key={item.id} className="item-row">
                        <img src={item.image} alt={item.name} className="item-image" />
                        <div className="item-details">
                          <p className="item-name">{item.name}</p>
                          <p className="item-store">{item.store}</p>
                        </div>
                        <div className="item-pricing">
                          <span className="item-qty">x{item.quantity}</span>
                          <span className="item-price">
                            Rp {(item.price * item.quantity).toLocaleString('id-ID')}
                          </span>
                        <button 
                          className="btn-review"
                          onClick={() => navigate('/write-review', { state: { product: item } })}
                        >
                          <Star size={14} />
                          Write Review
                        </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Price Summary */}
                <div className="modal-section">
                  <div className="price-summary">
                    <div className="summary-row">
                      <span>Subtotal</span>
                      <span>
                        Rp{' '}
                        {selectedTransaction.items
                          .reduce((sum, item) => sum + item.price * item.quantity, 0)
                          .toLocaleString('id-ID')}
                      </span>
                    </div>
                    <div className="summary-row discount">
                      <span>Discount (10%)</span>
                      <span>
                        -Rp{' '}
                        {(
                          selectedTransaction.items.reduce((sum, item) => sum + item.price * item.quantity, 0) * 0.1
                        ).toLocaleString('id-ID')}
                      </span>
                    </div>
                    <div className="summary-row total">
                      <span>Total</span>
                      <span>Rp {selectedTransaction.total.toLocaleString('id-ID')}</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Modal Actions */}
              <div className="modal-actions">
                <button className="btn-buy-again">
                  <ShoppingBag size={18} />
                  Buy Again
                </button>
                <button className="btn-close" onClick={() => setSelectedTransaction(null)}>
                  Close
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

export default TransactionHistoryPage;