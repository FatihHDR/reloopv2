// Review Service for Reloop E-Commerce

import { api } from './api';
import type { 
  ApiResponse, 
  PaginatedResponse, 
  Review, 
  UserRatingStats, 
  CreateReviewRequest 
} from '../types/api';

export const reviewService = {
  // Get all reviews
  getAll: async (params?: { 
    per_page?: number; 
    page?: number;
    target_user_id?: number;
    reviewer_id?: number;
    rating?: number;
    min_rating?: number;
  }): Promise<PaginatedResponse<Review>> => {
    return api.get<PaginatedResponse<Review>>('/api/v1/reviews', params);
  },

  // Get single review
  getById: async (id: number): Promise<ApiResponse<Review>> => {
    return api.get<ApiResponse<Review>>(`/api/v1/reviews/${id}`);
  },

  // Create review
  create: async (data: CreateReviewRequest): Promise<ApiResponse<Review>> => {
    return api.post<ApiResponse<Review>>('/api/v1/reviews', data);
  },

  // Update review
  update: async (id: number, data: { rating?: number; comment?: string }): Promise<ApiResponse<Review>> => {
    return api.put<ApiResponse<Review>>(`/api/v1/reviews/${id}`, data);
  },

  // Delete review
  delete: async (id: number): Promise<void> => {
    return api.delete(`/api/v1/reviews/${id}`);
  },

  // Get user's reviews (reviews they've written)
  getMyReviews: async (params?: { per_page?: number; page?: number }): Promise<PaginatedResponse<Review>> => {
    return api.get<PaginatedResponse<Review>>('/api/v1/reviews/my-reviews', params);
  },

  // Get received reviews
  getReceived: async (params?: { per_page?: number; page?: number }): Promise<PaginatedResponse<Review>> => {
    return api.get<PaginatedResponse<Review>>('/api/v1/reviews/received', params);
  },

  // Get user rating statistics
  getUserRating: async (userId: number): Promise<ApiResponse<UserRatingStats>> => {
    return api.get<ApiResponse<UserRatingStats>>(`/api/v1/reviews/user-rating/${userId}`);
  },
};

export default reviewService;
