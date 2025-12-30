import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ShoppingBag, Star, CheckCircle, Clock, XCircle } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

import { Button } from './button';

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
        { id: '1', name: 'Premium Headphones', store: 'TechStore Pro', price: 299000, quantity: 1, image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400&auto=format&fit=crop' },
        { id: '2', name: 'USB-C Cable 2M', store: 'TechStore Pro', price: 45000, quantity: 2, image: 'https://images.unsplash.com/photo-1583394838336-acd977736f90?w=400&auto=format&fit=crop' },
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
        { id: '3', name: 'Phone Case', store: 'Accessories Hub', price: 89000, quantity: 1, image: 'https://images.unsplash.com/photo-1601784551446-20c9e07cdbdb?w=400&auto=format&fit=crop' },
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
        { id: '4', name: 'Screen Protector', store: 'Tech Accessories', price: 45000, quantity: 1, image: 'https://images.unsplash.com/photo-1603791440384-56cd371ee9a7?w=400&auto=format&fit=crop' },
        { id: '5', name: 'Charging Cable', store: 'Tech Accessories', price: 55000, quantity: 1, image: 'https://images.unsplash.com/photo-1583394838336-acd977736f90?w=400&auto=format&fit=crop' },
        { id: '6', name: 'Phone Stand', store: 'Tech Accessories', price: 56000, quantity: 1, image: 'https://images.unsplash.com/photo-1625948515291-69613efd103f?w=400&auto=format&fit=crop' },
      ],
      buyerName: 'Bob Wilson',
      buyerPhone: '+62 831 2345 6789',
      buyerAddress: 'Jln. Sudirman No. 789, Jakarta',
      paymentMethod: 'Transfer Bank',
    },
  ]);

  const [selectedTransaction, setSelectedTransaction] = useState<Transaction | null>(null);

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'Paid':
        return {
          icon: <CheckCircle className="w-4 h-4" />,
          label: 'Paid',
          className: 'bg-green-100 text-green-700 border-green-200'
        };
      case 'Pending':
        return {
          icon: <Clock className="w-4 h-4" />,
          label: 'Pending',
          className: 'bg-yellow-100 text-yellow-700 border-yellow-200'
        };
      case 'Canceled':
        return {
          icon: <XCircle className="w-4 h-4" />,
          label: 'Canceled',
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
          <h1 className="text-4xl md:text-5xl font-bold mb-2">My Orders</h1>
          <p className="text-muted-foreground">View and manage your past transactions</p>
        </motion.div>

        {/* Transaction List */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.4, delay: 0.1, staggerChildren: 0.08 }}
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
                    src={transaction.items[0]?.image}
                    alt={transaction.items[0]?.name}
                    className="w-24 h-24 object-cover rounded-xl"
                  />

                  {/* Transaction Info */}
                  <div className="flex-1">
                    <div className="flex items-start justify-between mb-2">
                      <div>
                        <h3 className="text-lg font-bold mb-1">
                          {transaction.items[0]?.name}
                        </h3>
                        <p className="text-sm text-muted-foreground mb-2">
                          {transaction.date}
                        </p>
                        <p className="text-sm text-muted-foreground">
                          {transaction.items.length === 1
                            ? '1 item'
                            : `${transaction.items.length} items`}
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
                      <p className="text-2xl font-bold">
                        Rp{transaction.total.toLocaleString('id-ID')}
                      </p>
                      <p className="text-xs text-muted-foreground mt-1">
                        {transaction.orderNumber}
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
                      View Details →
                    </Button>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </motion.div>
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
                <h2 className="text-2xl font-bold">Transaction Details</h2>
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
                {/* Order Number & Status */}
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="p-4 bg-accent/20 rounded-xl">
                    <p className="text-sm text-muted-foreground mb-1">Order Number</p>
                    <p className="font-mono font-bold text-primary">
                      {selectedTransaction.orderNumber}
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
                  <p className="text-sm text-muted-foreground mb-1">Transaction Date</p>
                  <p className="font-medium">{selectedTransaction.date}</p>
                </div>

                {/* Buyer Information */}
                <div className="bg-card border border-border rounded-xl p-6">
                  <h3 className="text-lg font-bold mb-4">Buyer Information</h3>
                  <div className="space-y-3">
                    <div className="flex justify-between p-3 bg-accent/10 rounded-lg">
                      <span className="text-muted-foreground">Full Name</span>
                      <span className="font-medium">{selectedTransaction.buyerName}</span>
                    </div>
                    <div className="flex justify-between p-3 bg-accent/10 rounded-lg">
                      <span className="text-muted-foreground">Phone Number</span>
                      <span className="font-medium">{selectedTransaction.buyerPhone}</span>
                    </div>
                    <div className="p-3 bg-accent/10 rounded-lg">
                      <span className="text-muted-foreground text-sm">Delivery Address</span>
                      <p className="font-medium mt-1">{selectedTransaction.buyerAddress}</p>
                    </div>
                  </div>
                </div>

                {/* Payment Method */}
                <div className="bg-card border border-border rounded-xl p-6">
                  <h3 className="text-lg font-bold mb-4">Payment Information</h3>
                  <div className="p-3 bg-accent/10 rounded-lg">
                    <span className="text-muted-foreground text-sm">Payment Method</span>
                    <p className="font-medium mt-1">{selectedTransaction.paymentMethod}</p>
                  </div>
                </div>

                {/* Items */}
                <div className="bg-card border border-border rounded-xl p-6">
                  <h3 className="text-lg font-bold mb-4">Order Items</h3>
                  <div className="space-y-4">
                    {selectedTransaction.items.map((item) => (
                      <div key={item.id} className="flex gap-4 p-4 bg-accent/10 rounded-lg">
                        <img
                          src={item.image}
                          alt={item.name}
                          className="w-20 h-20 object-cover rounded-lg"
                        />
                        <div className="flex-1">
                          <h4 className="font-semibold mb-1">{item.name}</h4>
                          <p className="text-sm text-muted-foreground mb-2">{item.store}</p>
                          <div className="flex items-center justify-between">
                            <span className="text-sm text-muted-foreground">
                              x{item.quantity}
                            </span>
                            <span className="font-bold">
                              Rp{(item.price * item.quantity).toLocaleString('id-ID')}
                            </span>
                          </div>
                        </div>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => navigate('/write-review', { state: { product: item } })}
                          className="rounded-full flex items-center gap-2 self-end"
                        >
                          <Star className="w-4 h-4" />
                          Review
                        </Button>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Price Summary */}
                <div className="bg-gradient-to-br from-accent/20 via-accent/10 to-primary/5 border border-border rounded-xl p-6">
                  <h3 className="text-lg font-bold mb-4">Price Summary</h3>
                  <div className="space-y-3">
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Subtotal</span>
                      <span className="font-medium">
                        Rp
                        {selectedTransaction.items
                          .reduce((sum, item) => sum + item.price * item.quantity, 0)
                          .toLocaleString('id-ID')}
                      </span>
                    </div>
                    <div className="flex justify-between text-green-600">
                      <span>Discount (10%)</span>
                      <span className="font-medium">
                        -Rp
                        {(
                          selectedTransaction.items.reduce(
                            (sum, item) => sum + item.price * item.quantity,
                            0
                          ) * 0.1
                        ).toLocaleString('id-ID')}
                      </span>
                    </div>
                    <div className="flex justify-between text-lg font-bold pt-3 border-t border-border">
                      <span>Total</span>
                      <span>Rp{selectedTransaction.total.toLocaleString('id-ID')}</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Modal Actions */}
              <div className="sticky bottom-0 bg-background border-t border-border p-6 flex gap-3">
                <Button
                  variant="outline"
                  className="flex-1 rounded-full py-6 text-base font-semibold flex items-center justify-center gap-2"
                  onClick={() => {
                    // Buy again logic
                    setSelectedTransaction(null);
                  }}
                >
                  <ShoppingBag className="w-5 h-5" />
                  Buy Again
                </Button>
                <Button
                  variant="default"
                  className="flex-1 rounded-full py-6 text-base font-semibold"
                  onClick={() => setSelectedTransaction(null)}
                >
                  Close
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
