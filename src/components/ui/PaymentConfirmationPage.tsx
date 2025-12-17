import { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Upload, X } from 'lucide-react';
import './PaymentConfirmationPage.css';

interface CartItem {
  id: string;
  name: string;
  store: string;
  price: number;
  quantity: number;
  image: string;
  selected: boolean;
}

const PaymentConfirmationPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { orderNumber, total, selectedItems, formData, paymentMethod } = location.state || {};

  const [status, setStatus] = useState<'pending' | 'success'>('pending');
  const [uploadedFile, setUploadedFile] = useState<File | null>(null);
  const [dragActive, setDragActive] = useState(false);

  const subtotal = selectedItems?.reduce(
    (sum: number, item: CartItem) => sum + item.price * item.quantity,
    0
  ) || 0;
  const discount = Math.floor(subtotal * 0.1);

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === 'dragenter' || e.type === 'dragover') {
      setDragActive(true);
    } else if (e.type === 'dragleave') {
      setDragActive(false);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    const files = e.dataTransfer.files;
    if (files.length > 0) {
      setUploadedFile(files[0]);
    }
  };

  const handleFileInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.currentTarget.files;
    if (files && files.length > 0) {
      setUploadedFile(files[0]);
    }
  };

  const handleConfirm = () => {
    if (uploadedFile) setStatus('success');
  };

  const handleCancel = () => {
    if (window.confirm('Are you sure you want to cancel this transaction?')) {
      navigate('/cart');
    }
  };

  const handleRemoveFile = () => setUploadedFile(null);

  const pageVariants = {
    initial: { opacity: 0 },
    animate: { opacity: 1 },
    exit: { opacity: 0 },
  };

  const containerVariants = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0, transition: { staggerChildren: 0.1 } },
  };

  const itemVariants = {
    initial: { opacity: 0, y: 10 },
    animate: { opacity: 1, y: 0, transition: { duration: 0.5 } },
  };

  const paymentMethodLabels: { [key: string]: string } = {
    bca: 'Bank BCA',
    bri: 'Bank BRI',
    bni: 'Bank BNI',
    bsi: 'Bank BSI',
    btn: 'Bank BTN',
    cimb: 'CIMB Niaga',
    danamon: 'Bank Danamon',
    mega: 'Bank Mega',
    cod: 'Cash on Delivery',
  };

  return (
    <motion.div
      className="payment-confirmation-page"
      variants={pageVariants}
      initial="initial"
      animate="animate"
      exit="exit"
      transition={{ duration: 0.5 }}
    >
      {/* Header */}
      <motion.div className="confirmation-header" variants={itemVariants}>
        <h1>Payment Confirmation</h1>
      </motion.div>

      {/* Main Layout */}
      <motion.div
        className="confirmation-layout"
        variants={containerVariants}
        initial="initial"
        animate="animate"
      >
        {/* Left Column: Status + Upload */}
        <motion.div className="left-column" variants={itemVariants}>
          {/* Status */}
          <motion.div className="card status-section" variants={itemVariants}>
            <div className="status-badge">
              {status === 'pending' ? (
                <>
                  <span className="status-icon pending">⏳</span>
                  <div className="status-text">
                    <h2>Waiting for Payment</h2>
                    <p>Please upload your payment proof to confirm</p>
                  </div>
                </>
              ) : (
                <>
                  <span className="status-icon success">✅</span>
                  <div className="status-text">
                    <h2>Payment Successful</h2>
                    <p>Your transaction has been confirmed</p>
                  </div>
                </>
              )}
            </div>
          </motion.div>

          {/* Upload */}
          {status === 'pending' && (
            <motion.div className="card upload-section" variants={itemVariants}>
              <h2>Upload Payment Proof</h2>
              <p className="section-description">
                Upload a screenshot or image of your payment transfer proof
              </p>

              <div
                className={`drop-zone ${dragActive ? 'active' : ''} ${uploadedFile ? 'has-file' : ''}`}
                onDragEnter={handleDrag}
                onDragLeave={handleDrag}
                onDragOver={handleDrag}
                onDrop={handleDrop}
              >
                {uploadedFile ? (
                  <div className="file-preview">
                    <div className="file-icon">📄</div>
                    <div className="file-info">
                      <p className="file-name">{uploadedFile.name}</p>
                      <p className="file-size">{(uploadedFile.size / 1024).toFixed(2)} KB</p>
                    </div>
                    <button className="remove-file-btn" onClick={handleRemoveFile} type="button">
                      <X size={18} />
                    </button>
                  </div>
                ) : (
                  <div className="drop-zone-content">
                    <Upload size={32} />
                    <p>Drag and drop your payment proof here</p>
                    <p className="or-text">or</p>
                    <label className="file-input-label">
                      Choose File
                      <input
                        type="file"
                        accept="image/*,.pdf"
                        onChange={handleFileInput}
                        style={{ display: 'none' }}
                      />
                    </label>
                  </div>
                )}
              </div>
            </motion.div>
          )}
        </motion.div>

        {/* Right Column: Summary + Buttons */}
        <motion.div className="right-column" variants={itemVariants}>
          <motion.div className="card order-summary" variants={itemVariants}>
            <h2>Order Summary</h2>

            {/* Order Number */}
            <div className="info-group">
              <span className="label">Order Number</span>
              <span className="value">{orderNumber}</span>
            </div>

            {/* Buyer Info */}
            <div className="info-section">
              <h3>Buyer Information</h3>
              <div className="info-grid">
                <div className="info-item full-width">
                  <span className="label">Full Name</span>
                  <span className="value">{formData?.name || '-'}</span>
                </div>
                <div className="info-item full-width">
                  <span className="label">Phone</span>
                  <span className="value">{formData?.phone || '-'}</span>
                </div>
                <div className="info-item full-width">
                  <span className="label">Address</span>
                  <span className="value">{formData?.address || '-'}</span>
                </div>
              </div>
            </div>

            {/* Payment Method */}
            <div className="info-section">
              <h3>Payment Method</h3>
              <div className="info-group">
                <span className="label">Method</span>
                <span className="value">{paymentMethodLabels[paymentMethod] || paymentMethod}</span>
              </div>
            </div>

            {/* Items */}
            <div className="info-section">
              <h3>Order Items</h3>
              {selectedItems && selectedItems.length > 0 ? (
                <div className="items-list">
                  {selectedItems.map((item: CartItem) => (
                    <div key={item.id} className="item-row">
                      <div className="item-details">
                        <p className="item-name">{item.name}</p>
                        <p className="item-store">{item.store}</p>
                      </div>
                      <div className="item-quantity">x{item.quantity}</div>
                      <div className="item-price">
                        Rp{(item.price * item.quantity).toLocaleString('id-ID')}
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="no-items">No items in order</p>
              )}
            </div>

            {/* Price Breakdown */}
            <div className="price-breakdown">
              <h3>Price Breakdown</h3>
              <div className="price-row">
                <span>Subtotal</span>
                <span>Rp{subtotal.toLocaleString('id-ID')}</span>
              </div>
              <div className="price-row discount">
                <span>Discount (10%)</span>
                <span>-Rp{discount.toLocaleString('id-ID')}</span>
              </div>
              <div className="price-row total">
                <span>Total Payment</span>
                <span>Rp{total?.toLocaleString('id-ID') || 'Rp0'}</span>
              </div>
            </div>

            {/* Action Buttons */}
            <motion.div className="action-buttons" variants={itemVariants}>
              <button className="btn btn-secondary" onClick={status === 'success' ? () => navigate('/') : handleCancel}>
                {status === 'success' ? 'Back to Home' : 'Cancel Transaction'}
              </button>
              {status === 'pending' && (
                <button className="btn btn-primary" onClick={handleConfirm} disabled={!uploadedFile}>
                  Confirm Payment
                </button>
              )}
              {status === 'success' && (
                <button className="btn btn-primary" onClick={() => navigate('/my-orders')}>
                  View My Orders
                </button>
              )}
            </motion.div>
          </motion.div>
        </motion.div>
      </motion.div>
    </motion.div>
  );
};

export default PaymentConfirmationPage;
