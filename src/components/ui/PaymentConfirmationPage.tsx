import { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Upload, X, CheckCircle, Clock } from 'lucide-react';
import { SharedHeader } from '../shared-header';
import { Button } from './button';

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

  const paymentMethodLabels: { [key: string]: string} = {
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
          <h1 className="text-4xl md:text-5xl font-bold mb-2">Payment Confirmation</h1>
          <p className="text-muted-foreground">Upload your payment proof to complete the order</p>
        </motion.div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Left Section - Status & Upload */}
          <motion.div
            className="lg:col-span-2 space-y-6"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.1 }}
          >
            {/* Status Card */}
            <div className={`border rounded-2xl p-6 ${status === 'success' ? 'bg-green-50 border-green-200' : 'bg-yellow-50 border-yellow-200'}`}>
              <div className="flex items-center gap-4">
                {status === 'pending' ? (
                  <>
                    <div className="w-12 h-12 bg-yellow-100 rounded-full flex items-center justify-center">
                      <Clock className="w-6 h-6 text-yellow-600" />
                    </div>
                    <div>
                      <h2 className="text-2xl font-bold text-yellow-900">Waiting for Payment</h2>
                      <p className="text-yellow-700">Please upload your payment proof to confirm</p>
                    </div>
                  </>
                ) : (
                  <>
                    <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
                      <CheckCircle className="w-6 h-6 text-green-600" />
                    </div>
                    <div>
                      <h2 className="text-2xl font-bold text-green-900">Payment Successful!</h2>
                      <p className="text-green-700">Your transaction has been confirmed</p>
                    </div>
                  </>
                )}
              </div>
            </div>

            {/* Upload Section */}
            {status === 'pending' && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: 0.2 }}
                className="bg-card border border-border rounded-2xl p-6 shadow-sm"
              >
                <h2 className="text-2xl font-bold mb-4">Upload Payment Proof</h2>
                <p className="text-muted-foreground mb-6">
                  Upload a screenshot or image of your payment transfer proof
                </p>

                <div
                  className={`border-2 border-dashed rounded-xl p-8 transition-all ${
                    dragActive ? 'border-primary bg-accent/50' : 'border-border'
                  } ${uploadedFile ? 'bg-accent/20' : 'bg-background'}`}
                  onDragEnter={handleDrag}
                  onDragLeave={handleDrag}
                  onDragOver={handleDrag}
                  onDrop={handleDrop}
                >
                  {uploadedFile ? (
                    <div className="flex items-center justify-between gap-4">
                      <div className="flex items-center gap-4">
                        <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
                          <Upload className="w-6 h-6 text-primary" />
                        </div>
                        <div>
                          <p className="font-semibold">{uploadedFile.name}</p>
                          <p className="text-sm text-muted-foreground">
                            {(uploadedFile.size / 1024).toFixed(2)} KB
                          </p>
                        </div>
                      </div>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={handleRemoveFile}
                        className="rounded-full"
                      >
                        <X className="w-5 h-5" />
                      </Button>
                    </div>
                  ) : (
                    <div className="text-center">
                      <Upload className="w-12 h-12 mx-auto mb-4 text-muted-foreground" />
                      <p className="text-lg font-medium mb-2">Drag and drop your payment proof here</p>
                      <p className="text-sm text-muted-foreground mb-4">or</p>
                      <label className="inline-block">
                        <Button variant="outline" className="rounded-full" asChild>
                          <span>Choose File</span>
                        </Button>
                        <input
                          type="file"
                          accept="image/*,.pdf"
                          onChange={handleFileInput}
                          className="hidden"
                        />
                      </label>
                    </div>
                  )}
                </div>
              </motion.div>
            )}
          </motion.div>

          {/* Right Section - Summary */}
          <motion.div
            className="lg:col-span-1"
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.4, delay: 0.2 }}
          >
            <div className="bg-gradient-to-br from-accent/20 via-accent/10 to-primary/5 border border-border rounded-2xl p-6 sticky top-6 space-y-6">
              <h2 className="text-2xl font-bold">Order Summary</h2>

              {/* Order Number */}
              <div className="p-3 bg-background/50 rounded-lg">
                <span className="text-sm text-muted-foreground">Order Number</span>
                <p className="font-mono font-bold text-primary mt-1">{orderNumber}</p>
              </div>

              {/* Buyer Info */}
              <div className="space-y-3">
                <h3 className="font-semibold">Buyer Information</h3>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between p-2 bg-background/30 rounded-lg">
                    <span className="text-muted-foreground">Name</span>
                    <span className="font-medium">{formData?.name || '-'}</span>
                  </div>
                  <div className="flex justify-between p-2 bg-background/30 rounded-lg">
                    <span className="text-muted-foreground">Phone</span>
                    <span className="font-medium">{formData?.phone || '-'}</span>
                  </div>
                  <div className="p-2 bg-background/30 rounded-lg">
                    <span className="text-muted-foreground text-sm">Address</span>
                    <p className="font-medium mt-1">{formData?.address || '-'}</p>
                  </div>
                </div>
              </div>

              {/* Payment Method */}
              <div className="p-3 bg-background/50 rounded-lg">
                <span className="text-sm text-muted-foreground">Payment Method</span>
                <p className="font-medium mt-1">{paymentMethodLabels[paymentMethod] || paymentMethod}</p>
              </div>

              {/* Items */}
              <div className="space-y-3">
                <h3 className="font-semibold">Order Items</h3>
                <div className="space-y-2">
                  {selectedItems?.map((item: CartItem) => (
                    <div key={item.id} className="flex justify-between text-sm p-2 bg-background/30 rounded-lg">
                      <div className="flex-1">
                        <p className="font-medium">{item.name}</p>
                        <p className="text-xs text-muted-foreground">{item.store}</p>
                      </div>
                      <span className="text-muted-foreground">x{item.quantity}</span>
                      <span className="font-medium ml-2">
                        Rp{(item.price * item.quantity).toLocaleString('id-ID')}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Price Breakdown */}
              <div className="space-y-3 pt-4 border-t border-border">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Subtotal</span>
                  <span className="font-medium">Rp{subtotal.toLocaleString('id-ID')}</span>
                </div>
                <div className="flex justify-between text-green-600">
                  <span>Discount (10%)</span>
                  <span className="font-medium">-Rp{discount.toLocaleString('id-ID')}</span>
                </div>
                <div className="flex justify-between text-lg font-bold pt-3 border-t border-border">
                  <span>Total Payment</span>
                  <span>Rp{total?.toLocaleString('id-ID') || 'Rp0'}</span>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="space-y-3 pt-4">
                {status === 'pending' && (
                  <>
                    <Button
                      onClick={handleConfirm}
                      disabled={!uploadedFile}
                      className="w-full bg-primary text-primary-foreground rounded-full py-6 text-base font-semibold hover:shadow-lg transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      Confirm Payment
                    </Button>
                    <Button
                      variant="outline"
                      onClick={handleCancel}
                      className="w-full rounded-full py-6 text-base font-semibold"
                    >
                      Cancel Transaction
                    </Button>
                  </>
                )}
                {status === 'success' && (
                  <>
                    <Button
                      onClick={() => navigate('/my-orders')}
                      className="w-full bg-primary text-primary-foreground rounded-full py-6 text-base font-semibold hover:shadow-lg transition-all duration-300"
                    >
                      View My Orders
                    </Button>
                    <Button
                      variant="outline"
                      onClick={() => navigate('/')}
                      className="w-full rounded-full py-6 text-base font-semibold"
                    >
                      Back to Home
                    </Button>
                  </>
                )}
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default PaymentConfirmationPage;
