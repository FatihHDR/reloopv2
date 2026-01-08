import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Trash2, Plus, Minus } from 'lucide-react';

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

const CartPage = () => {
  const navigate = useNavigate();
  const [items, setItems] = useState<CartItem[]>([
    { id: '1', name: 'White Jacket', store: 'Store A', price: 100000, quantity: 1, image: 'https://images.unsplash.com/photo-1683497802829-0ff027c1df61?auto=format&fit=crop&w=500&q=80', selected: false },
    { id: '2', name: 'Wireless Headphones', store: 'Store B', price: 200000, quantity: 2, image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=500&q=80', selected: true },
    { id: '3', name: 'Smart Watch', store: 'Store B', price: 200000, quantity: 3, image: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&w=500&q=80', selected: true },
  ]);
  const [selectAll, setSelectAll] = useState(false);

  const toggleSelectAll = () => {
    const value = !selectAll;
    setSelectAll(value);
    setItems(items.map(i => ({ ...i, selected: value })));
  };

  const toggleSelect = (id: string) => {
    setItems(items.map(i => i.id === id ? { ...i, selected: !i.selected } : i));
  };

  const toggleStore = (store: string) => {
    const storeSelected = items.filter(i => i.store === store).every(i => i.selected);
    setItems(items.map(i => i.store === store ? { ...i, selected: !storeSelected } : i));
  };

  const changeQuantity = (id: string, delta: number) => {
    setItems(items.map(i =>
      i.id === id ? { ...i, quantity: Math.max(1, i.quantity + delta) } : i
    ));
  };

  const removeItem = (id: string) => {
    setItems(items.filter(i => i.id !== id));
  };

  const selectedItems = items.filter(i => i.selected);
  const subtotal = selectedItems.reduce((s, i) => s + i.price * i.quantity, 0);
  const discount = 10000;
  const total = subtotal - discount;
  const totalItems = selectedItems.reduce((s, i) => s + i.quantity, 0);

  const stores = Array.from(new Set(items.map(i => i.store)));

  const handleCheckout = () => {
    if (selectedItems.length > 0) {
      navigate('/checkout', { state: { selectedItems } });
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
          <h1 className="text-4xl md:text-5xl font-bold mb-2">Shopping Cart</h1>
          <p className="text-muted-foreground">Review and manage your selected items</p>
        </motion.div>

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
            className="w-5 h-5 rounded border-2 border-primary cursor-pointer"
          />
          <span className="font-medium">Select all items</span>
        </motion.div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Cart Items */}
          <div className="lg:col-span-2 space-y-4">
            <AnimatePresence>
              {stores.map(store => {
                const storeItems = items.filter(i => i.store === store);
                const storeSelected = storeItems.every(i => i.selected);
                return (
                  <motion.div
                    key={store}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    transition={{ duration: 0.3 }}
                    className="bg-card border border-border rounded-2xl p-6 shadow-sm"
                  >
                    {/* Store Header */}
                    <div className="flex items-center gap-3 pb-4 mb-4 border-b border-border">
                      <input
                        type="checkbox"
                        checked={storeSelected}
                        onChange={() => toggleStore(store)}
                        className="w-5 h-5 rounded border-2 border-primary cursor-pointer"
                      />
                      <h3 className="text-lg font-semibold">{store}</h3>
                    </div>

                    {/* Store Items */}
                    <div className="space-y-4">
                      {storeItems.map(item => (
                        <div key={item.id} className="flex gap-4">
                          <input
                            type="checkbox"
                            checked={item.selected}
                            onChange={() => toggleSelect(item.id)}
                            className="w-5 h-5 rounded border-2 border-primary cursor-pointer mt-2"
                          />
                          <img
                            src={item.image}
                            alt={item.name}
                            className="w-24 h-24 object-cover rounded-xl"
                          />
                          <div className="flex-1">
                            <h4 className="font-semibold text-lg mb-1">{item.name}</h4>
                            <p className="text-sm text-muted-foreground mb-3">{item.store}</p>
                            <div className="flex items-center gap-2">
                              {item.quantity === 1 ? (
                                <Button
                                  variant="outline"
                                  size="sm"
                                  onClick={() => removeItem(item.id)}
                                  className="h-8 w-8 p-0 rounded-full"
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
                            <p className="text-xl font-bold">
                              Rp{(item.price * item.quantity).toLocaleString('id-ID')}
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
              <h2 className="text-2xl font-bold mb-6">Order Summary</h2>

              <div className="space-y-3 mb-4">
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Total Items</span>
                  <span className="font-medium">{totalItems}</span>
                </div>

                {selectedItems.length > 0 && (
                  <div className="border-t border-border pt-3 space-y-2">
                    {selectedItems.map(item => (
                      <div key={item.id} className="flex justify-between text-sm">
                        <span className="text-muted-foreground truncate flex-1">
                          {item.name} x{item.quantity}
                        </span>
                        <span className="font-medium ml-2">
                          Rp{(item.price * item.quantity).toLocaleString('id-ID')}
                        </span>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              <div className="border-t border-border pt-4 space-y-3 mb-6">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Subtotal</span>
                  <span className="font-medium">Rp{subtotal.toLocaleString('id-ID')}</span>
                </div>
                <div className="flex justify-between text-green-600">
                  <span>Discount</span>
                  <span className="font-medium">-Rp{discount.toLocaleString('id-ID')}</span>
                </div>
                <div className="flex justify-between text-lg font-bold pt-3 border-t border-border">
                  <span>Total</span>
                  <span>Rp{total.toLocaleString('id-ID')}</span>
                </div>
              </div>

              <Button
                onClick={handleCheckout}
                disabled={selectedItems.length === 0}
                className="w-full bg-primary text-primary-foreground rounded-full py-6 text-base font-semibold hover:shadow-lg transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Proceed to Checkout ({selectedItems.length} {selectedItems.length === 1 ? 'item' : 'items'})
              </Button>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default CartPage;