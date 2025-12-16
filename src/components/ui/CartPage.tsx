import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowLeft } from 'lucide-react';
import './CartPage.css';

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

  return (
    <div className="cart-page">
      <div className="cart-header">
        <button className="back-btn" onClick={() => navigate(-1)}>
          <ArrowLeft size={20} />
        </button>
        <h1>Cart</h1>
      </div>

      <div className="select-all">
        <input type="checkbox" checked={selectAll} onChange={toggleSelectAll} />
        <span>Select all</span>
      </div>

      <div className="cart-layout">
        <div className="cart-items">
          <AnimatePresence>
            {stores.map(store => {
              const storeItems = items.filter(i => i.store === store);
              const storeSelected = storeItems.every(i => i.selected);
              return (
                <motion.div
                  key={store}
                  className="store-card"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.3 }}
                >
                  <div className="store-header">
                    <input type="checkbox" checked={storeSelected} onChange={() => toggleStore(store)} />
                    <h3>{store}</h3>
                  </div>

                  {storeItems.map(item => (
                    <div key={item.id} className="cart-item">
                      <div className="item-left">
                        <input type="checkbox" checked={item.selected} onChange={() => toggleSelect(item.id)} />
                        <img src={item.image} alt={item.name} className="item-image" />
                        <div className="item-info">
                          <h4>{item.name}</h4>
                          <p className="store-name">{item.store}</p>
                          <div className="quantity-controls">
                            {item.quantity === 1 ? (
                              <button className="remove-btn" onClick={() => removeItem(item.id)}>
                                <img src="/src/assets/trash-can.png" alt="Remove" className="trash-icon" />
                              </button>
                            ) : (
                              <button onClick={() => changeQuantity(item.id, -1)}>−</button>
                            )}
                            <span>{item.quantity}</span>
                            <button onClick={() => changeQuantity(item.id, 1)}>+</button>
                          </div>
                        </div>
                      </div>
                      <div className="item-right">
                        <span className="price">Rp{(item.price * item.quantity).toLocaleString('id-ID')}</span>
                      </div>
                    </div>
                  ))}
                </motion.div>
              );
            })}
          </AnimatePresence>
        </div>

        <motion.div
          className="cart-summary"
          initial={{ opacity: 0, x: 30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.4 }}
        >
          <div className="summary-row">
            <span>Total Items</span>
            <span>{totalItems}</span>
          </div>
          <div className="selected-items-list">
            {selectedItems.map(item => (
              <div key={item.id} className="selected-item">
                <span>{item.name} x{item.quantity}</span>
                <span>Rp{(item.price * item.quantity).toLocaleString('id-ID')}</span>
              </div>
            ))}
          </div>
          <div className="summary-row">
            <span>Subtotal</span>
            <span>Rp{subtotal.toLocaleString('id-ID')}</span>
          </div>
          <div className="summary-row">
            <span>Discount</span>
            <span>-Rp{discount.toLocaleString('id-ID')}</span>
          </div>
          <div className="summary-row total">
            <span>Total</span>
            <span>Rp{total.toLocaleString('id-ID')}</span>
          </div>

          <button
            className="checkout-btn"
            onClick={() => navigate('/transaction', { state: { selectedItems } })}
          >
            Checkout
          </button>
        </motion.div>
      </div>
    </div>
  );
};

export default CartPage;