// Transaction Service for Reloop E-Commerce

import { api } from './api';
import type { ApiResponse, PaginatedResponse, Transaction, CreateTransactionRequest } from '../types/api';

export const transactionService = {
  // Get all transactions
  getAll: async (params?: { 
    per_page?: number; 
    page?: number; 
    status?: string;
    role?: string;
  }): Promise<PaginatedResponse<Transaction>> => {
    return api.get<PaginatedResponse<Transaction>>('/api/v1/transactions', params);
  },

  // Get single transaction
  getById: async (id: number): Promise<ApiResponse<Transaction>> => {
    return api.get<ApiResponse<Transaction>>(`/api/v1/transactions/${id}`);
  },

  // Create transaction (purchase)
  create: async (data: CreateTransactionRequest): Promise<ApiResponse<Transaction>> => {
    return api.post<ApiResponse<Transaction>>('/api/v1/transactions', data);
  },

  // Update transaction status
  updateStatus: async (id: number, status: string): Promise<ApiResponse<Transaction>> => {
    return api.put<ApiResponse<Transaction>>(`/api/v1/transactions/${id}`, { status });
  },

  // Get user's purchases
  getMyPurchases: async (params?: { per_page?: number; page?: number }): Promise<PaginatedResponse<Transaction>> => {
    return api.get<PaginatedResponse<Transaction>>('/api/v1/transactions/my-purchases', params);
  },

  // Get user's sales
  getMySales: async (params?: { per_page?: number; page?: number }): Promise<PaginatedResponse<Transaction>> => {
    return api.get<PaginatedResponse<Transaction>>('/api/v1/transactions/my-sales', params);
  },
};

export default transactionService;
