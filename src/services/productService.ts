// Product Service for Reloop E-Commerce

import { api } from './api';
import type { ApiResponse, PaginatedResponse, Product, ProductFilters } from '../types/api';

export const productService = {
  // Get all products with filters
  getAll: async (filters?: ProductFilters): Promise<PaginatedResponse<Product>> => {
    return api.get<PaginatedResponse<Product>>('/api/v1/products', filters as Record<string, unknown>);
  },

  // Get single product
  getById: async (id: number): Promise<ApiResponse<Product>> => {
    return api.get<ApiResponse<Product>>(`/api/v1/products/${id}`);
  },

  // Get current user's products
  getMyProducts: async (params?: { per_page?: number; page?: number }): Promise<PaginatedResponse<Product>> => {
    return api.get<PaginatedResponse<Product>>('/api/v1/products/my-products', params);
  },

  // Create product
  create: async (data: Partial<Product>): Promise<ApiResponse<Product>> => {
    return api.post<ApiResponse<Product>>('/api/v1/products', data);
  },

  // Update product
  update: async (id: number, data: Partial<Product>): Promise<ApiResponse<Product>> => {
    return api.put<ApiResponse<Product>>(`/api/v1/products/${id}`, data);
  },

  // Delete product
  delete: async (id: number): Promise<void> => {
    return api.delete(`/api/v1/products/${id}`);
  },
};

export default productService;
