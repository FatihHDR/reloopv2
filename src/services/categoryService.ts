// Category Service for Reloop E-Commerce

import { api } from './api';
import type { ApiResponse, PaginatedResponse, Category } from '../types/api';

export const categoryService = {
  // Get all categories
  getAll: async (params?: { per_page?: number; page?: number }): Promise<PaginatedResponse<Category>> => {
    return api.get<PaginatedResponse<Category>>('/api/v1/categories', params);
  },

  // Get single category
  getById: async (id: number): Promise<ApiResponse<Category>> => {
    return api.get<ApiResponse<Category>>(`/api/v1/categories/${id}`);
  },
};

export default categoryService;
