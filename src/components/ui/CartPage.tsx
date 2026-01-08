import { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Trash2, Plus, Minus, ShoppingBag, ArrowRight } from 'lucide-react';

import { Button } from './button';
import { cartService, type CartItem } from '../../services/cartService';
import { getToken } from '../../services';

const CartPage = () => {
  const navigate = useNavigate();
  const [items, setItems] = useState<CartItem[]>([]);
  const [selectAll, setSelectAll] = useState(false);

  // Load cart from localStorage on mount
  useEffect(() => {
    setItems(cartService.getCart());

    // Listen for cart updates from other components
    const handleCartUpdate = (e: CustomEvent<CartItem[]>) => {
      setItems(e.detail);
    };

    window.addEventListener('cart-updated', handleCartUpdate as EventListener);
    return () => {
      window.removeEventListener('cart-updated', handleCartUpdate as EventListener);
    };
  }, []);

  // Update selectAll state when items change
  useEffect(() => {
    if (items.length > 0) {
      setSelectAll(items.every(i => i.selected));
    }
  }, [items]);

  const toggleSelectAll = () => {
    const value = !selectAll;
    setSelectAll(value);
    setItems(cartService.toggleAllSelection(value));
  };

  const toggleSelect = (id: number) => {
    setItems(cartService.toggleSelection(id));
  };

  const changeQuantity = (id: number, delta: number) => {
    const item = items.find(i => i.id === id);
    if (item) {
      setItems(cartService.updateQuantity(id, item.quantity + delta));
    }
  };

  const removeItem = (id: number) => {
    setItems(cartService.removeFromCart(id));
  };

  const selectedItems = items.filter(i => i.selected);
  const subtotal = selectedItems.reduce((s, i) => s + i.product.price * i.quantity, 0);
  const total = subtotal;
  const totalItems = selectedItems.reduce((s, i) => s + i.quantity, 0);

  // Group items by seller
  const sellers = Array.from(new Set(items.map(i => i.product.seller?.full_name || i.product.seller?.username || 'Unknown Seller')));

  const handleCheckout = () => {
    // Check if user is logged in
    if (!getToken()) {
      navigate('/login');
      return;
    }

    if (selectedItems.length > 0) {
      navigate('/checkout', { state: { selectedItems } });
    }
  };

  // Format price to Indonesian Rupiah
  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(price);
  };

  // Get image URL from product
  const getImageUrl = (item: CartItem) => {
    if (item.product.primary_image?.image_url) return item.product.primary_image.image_url;
    if (item.product.images && item.product.images.length > 0) return item.product.images[0].image_url;
    return 'https://images.unsplash.com/photo-1560393464-5c69a73c5770?w=500&auto=format&fit=crop';
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
          <h1 className="text-4xl md:text-5xl font-bold mb-2">Keranjang Belanja</h1>
          <p className="text-muted-foreground">Kelola produk yang ingin kamu beli</p>
        </motion.div>

        {items.length === 0 ? (
          // Empty Cart State
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center py-20"
          >
            <div className="w-24 h-24 mx-auto mb-6 bg-muted/50 rounded-full flex items-center justify-center">
              <ShoppingBag className="w-12 h-12 text-muted-foreground" />
            </div>
            <h2 className="text-2xl font-semibold mb-2">Keranjang kosong</h2>
            <p className="text-muted-foreground mb-6">Belum ada produk di keranjang belanja kamu</p>
            <Link to="/shop">
              <Button size="lg" className="rounded-full px-8">
                Mulai Belanja
                <ArrowRight className="w-5 h-5 ml-2" />
              </Button>
            </Link>
          </motion.div>
        ) : (
          <>
            {/* Select All */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.1 }}
              className="flex items-center gap-3 mb-6 p-4 bg-accent/30 rounded-xl"
            >
              <input
                type="checkbox"
                checked={selectAll}
                onChange={toggleSelectAll}
                className="w-5 h-5 rounded border-2 border-primary cursor-pointer accent-primary"
              />
              <span className="font-medium">Pilih semua ({items.length} produk)</span>
            </motion.div>

            <div className="grid lg:grid-cols-3 gap-8">
              {/* Cart Items */}
              <div className="lg:col-span-2 space-y-4">
                <AnimatePresence>
                  {sellers.map(seller => {
                    const sellerItems = items.filter(i =>
                      (i.product.seller?.full_name || i.product.seller?.username || 'Unknown Seller') === seller
                    );
                    const sellerSelected = sellerItems.every(i => i.selected);

                    const toggleSeller = () => {
                      sellerItems.forEach(item => {
                        if (item.selected === sellerSelected) {
                          cartService.toggleSelection(item.id);
                        }
                      });
                      setItems(cartService.getCart());
                    };

                    return (
                      <motion.div
                        key={seller}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        transition={{ duration: 0.3 }}
                        className="bg-card border border-border rounded-2xl p-6 shadow-sm"
                      >
                        {/* Seller Header */}
                        <div className="flex items-center gap-3 pb-4 mb-4 border-b border-border">
                          <input
                            type="checkbox"
                            checked={sellerSelected}
                            onChange={toggleSeller}
                            className="w-5 h-5 rounded border-2 border-primary cursor-pointer accent-primary"
                          />
                          <div className="flex items-center gap-2">
                            {sellerItems[0]?.product.seller?.profile_picture_url && (
                              <img
                                src={sellerItems[0].product.seller.profile_picture_url}
                                alt={seller}
                                className="w-8 h-8 rounded-full object-cover"
                              />
                            )}
                            <h3 className="text-lg font-semibold">{seller}</h3>
                            {sellerItems[0]?.product.seller?.seller_code && (
                              <span className="bg-blue-100 text-blue-700 text-xs px-2 py-0.5 rounded">Verified</span>
                            )}
                          </div>
                        </div>

                        {/* Seller Items */}
                        <div className="space-y-4">
                          {sellerItems.map(item => (
                            <div key={item.id} className="flex gap-4">
                              <input
                                type="checkbox"
                                checked={item.selected}
                                onChange={() => toggleSelect(item.id)}
                                className="w-5 h-5 rounded border-2 border-primary cursor-pointer mt-2 accent-primary"
                              />
                              <Link to={`/product/${item.id}`}>
                                <img
                                  src={getImageUrl(item)}
                                  alt={item.product.name}
                                  className="w-24 h-24 object-cover rounded-xl hover:opacity-80 transition-opacity"
                                />
                              </Link>
                              <div className="flex-1 min-w-0">
                                <Link to={`/product/${item.id}`}>
                                  <h4 className="font-semibold text-lg mb-1 hover:text-primary transition-colors line-clamp-1">
                                    {item.product.name}
                                  </h4>
                                </Link>
                                <p className="text-sm text-muted-foreground mb-3 line-clamp-1">
                                  {item.product.category?.name} • {item.product.location}
                                </p>
                                <div className="flex items-center gap-2">
                                  {item.quantity === 1 ? (
                                    <Button
                                      variant="outline"
                                      size="sm"
                                      onClick={() => removeItem(item.id)}
                                      className="h-8 w-8 p-0 rounded-full hover:bg-red-50 hover:border-red-200"
                                    >
                                      <Trash2 className="w-4 h-4 text-destructive" />
                                    </Button>
                                  ) : (
                                    <Button
                                      variant="outline"
                                      size="sm"
                                      onClick={() => changeQuantity(item.id, -1)}
                                      className="h-8 w-8 p-0 rounded-full"
                                    >
                                      <Minus className="w-4 h-4" />
                                    </Button>
                                  )}
                                  <span className="w-12 text-center font-medium">{item.quantity}</span>
                                  <Button
                                    variant="outline"
                                    size="sm"
                                    onClick={() => changeQuantity(item.id, 1)}
                                    className="h-8 w-8 p-0 rounded-full"
                                  >
                                    <Plus className="w-4 h-4" />
                                  </Button>
                                </div>
                              </div>
                              <div className="text-right">
                                <p className="text-xl font-bold text-primary">
                                  {formatPrice(item.product.price * item.quantity)}
                                </p>
                                <p className="text-sm text-muted-foreground">
                                  @{formatPrice(item.product.price)}
                                </p>
                              </div>
                            </div>
                          ))}
                        </div>
                      </motion.div>
                    );
                  })}
                </AnimatePresence>
              </div>

              {/* Order Summary */}
              <motion.div
                initial={{ opacity: 0, x: 30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.4, delay: 0.2 }}
                className="lg:col-span-1"
              >
                <div className="bg-gradient-to-br from-accent/20 via-accent/10 to-primary/5 border border-border rounded-2xl p-6 sticky top-6">
                  <h2 className="text-2xl font-bold mb-6">Ringkasan Pesanan</h2>

                  <div className="space-y-3 mb-4">
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">Total Item</span>
                      <span className="font-medium">{totalItems} produk</span>
                    </div>

                    {selectedItems.length > 0 && (
                      <div className="border-t border-border pt-3 space-y-2 max-h-48 overflow-y-auto">
                        {selectedItems.map(item => (
                          <div key={item.id} className="flex justify-between text-sm">
                            <span className="text-muted-foreground truncate flex-1">
                              {item.product.name} x{item.quantity}
                            </span>
                            <span className="font-medium ml-2">
                              {formatPrice(item.product.price * item.quantity)}
                            </span>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>

                  <div className="border-t border-border pt-4 space-y-3 mb-6">
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Subtotal</span>
                      <span className="font-medium">{formatPrice(subtotal)}</span>
                    </div>
                    <div className="flex justify-between text-lg font-bold pt-3 border-t border-border">
                      <span>Total</span>
                      <span className="text-primary">{formatPrice(total)}</span>
                    </div>
                  </div>

                  <Button
                    onClick={handleCheckout}
                    disabled={selectedItems.length === 0}
                    className="w-full bg-primary text-primary-foreground rounded-full py-6 text-base font-semibold hover:shadow-lg transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    Lanjut ke Pembayaran ({selectedItems.length} {selectedItems.length === 1 ? 'item' : 'items'})
                  </Button>
                </div>
              </motion.div>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default CartPage;