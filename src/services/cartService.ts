// Cart Service - localStorage-based cart management with real Product data
import type { Product } from '../types/api';

export interface CartItem {
  id: number;
  product: Product;
  quantity: number;
  selected: boolean;
  addedAt: string;
}

const CART_STORAGE_KEY = 'reloop_cart';

// Get all cart items
export const getCart = (): CartItem[] => {
  try {
    const stored = localStorage.getItem(CART_STORAGE_KEY);
    if (!stored) return [];
    return JSON.parse(stored) as CartItem[];
  } catch {
    return [];
  }
};

// Save cart to localStorage
const saveCart = (items: CartItem[]): void => {
  localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(items));
  // Dispatch custom event so other components can react
  window.dispatchEvent(new CustomEvent('cart-updated', { detail: items }));
};

// Add product to cart
export const addToCart = (product: Product, quantity: number = 1): CartItem[] => {
  const cart = getCart();
  const existingIndex = cart.findIndex(item => item.id === product.id);
  
  if (existingIndex >= 0) {
    // Update quantity if already in cart
    cart[existingIndex].quantity += quantity;
  } else {
    // Add new item
    cart.push({
      id: product.id,
      product,
      quantity,
      selected: true,
      addedAt: new Date().toISOString(),
    });
  }
  
  saveCart(cart);
  return cart;
};

// Remove item from cart
export const removeFromCart = (productId: number): CartItem[] => {
  const cart = getCart().filter(item => item.id !== productId);
  saveCart(cart);
  return cart;
};

// Update item quantity
export const updateQuantity = (productId: number, quantity: number): CartItem[] => {
  const cart = getCart();
  const item = cart.find(i => i.id === productId);
  
  if (item) {
    item.quantity = Math.max(1, quantity);
  }
  
  saveCart(cart);
  return cart;
};

// Toggle item selection
export const toggleSelection = (productId: number): CartItem[] => {
  const cart = getCart();
  const item = cart.find(i => i.id === productId);
  
  if (item) {
    item.selected = !item.selected;
  }
  
  saveCart(cart);
  return cart;
};

// Toggle all items selection
export const toggleAllSelection = (selected: boolean): CartItem[] => {
  const cart = getCart().map(item => ({ ...item, selected }));
  saveCart(cart);
  return cart;
};

// Get cart count
export const getCartCount = (): number => {
  return getCart().reduce((sum, item) => sum + item.quantity, 0);
};

// Get selected items total
export const getSelectedTotal = (): number => {
  return getCart()
    .filter(item => item.selected)
    .reduce((sum, item) => sum + item.product.price * item.quantity, 0);
};

// Clear entire cart
export const clearCart = (): void => {
  localStorage.removeItem(CART_STORAGE_KEY);
  window.dispatchEvent(new CustomEvent('cart-updated', { detail: [] }));
};

// Check if product is in cart
export const isInCart = (productId: number): boolean => {
  return getCart().some(item => item.id === productId);
};

// Cart service object for named imports
export const cartService = {
  getCart,
  addToCart,
  removeFromCart,
  updateQuantity,
  toggleSelection,
  toggleAllSelection,
  getCartCount,
  getSelectedTotal,
  clearCart,
  isInCart,
};

export default cartService;
