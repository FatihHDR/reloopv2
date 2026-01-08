// Wishlist Service for Reloop E-Commerce

import { api } from './api';
import type { ApiResponse, PaginatedResponse, WishlistItem } from '../types/api';

export const wishlistService = {
  // Get user's wishlist
  getAll: async (params?: { per_page?: number; page?: number }): Promise<PaginatedResponse<WishlistItem>> => {
    return api.get<PaginatedResponse<WishlistItem>>('/api/v1/wishlist', params);
  },

  // Get single wishlist item
  getById: async (id: number): Promise<ApiResponse<WishlistItem>> => {
    return api.get<ApiResponse<WishlistItem>>(`/api/v1/wishlist/${id}`);
  },

  // Add to wishlist
  add: async (productId: number): Promise<ApiResponse<WishlistItem>> => {
    return api.post<ApiResponse<WishlistItem>>('/api/v1/wishlist', { product_id: productId });
  },

  // Remove from wishlist by wishlist ID
  remove: async (id: number): Promise<void> => {
    return api.delete(`/api/v1/wishlist/${id}`);
  },

  // Remove from wishlist by product ID
  removeByProductId: async (productId: number): Promise<void> => {
    return api.delete(`/api/v1/wishlist/product/${productId}`);
  },

  // Check if product is in wishlist
  check: async (productId: number): Promise<ApiResponse<{ in_wishlist: boolean; wishlist_id?: number }>> => {
    return api.get<ApiResponse<{ in_wishlist: boolean; wishlist_id?: number }>>(`/api/v1/wishlist/check/${productId}`);
  },

  // Clear all wishlist items
  clear: async (): Promise<void> => {
    return api.delete('/api/v1/wishlist/clear');
  },
};

export default wishlistService;
