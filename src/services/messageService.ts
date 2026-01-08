// Message Service for Reloop E-Commerce

import { api } from './api';
import type { 
  ApiResponse, 
  PaginatedResponse, 
  Message, 
  Conversation,
  SendMessageRequest 
} from '../types/api';

export const messageService = {
  // Get all messages
  getAll: async (params?: { 
    per_page?: number; 
    page?: number;
    user_id?: number;
    product_id?: number;
    is_read?: boolean;
  }): Promise<PaginatedResponse<Message>> => {
    return api.get<PaginatedResponse<Message>>('/api/v1/messages', params);
  },

  // Get single message
  getById: async (id: number): Promise<ApiResponse<Message>> => {
    return api.get<ApiResponse<Message>>(`/api/v1/messages/${id}`);
  },

  // Send message
  send: async (data: SendMessageRequest): Promise<ApiResponse<Message>> => {
    return api.post<ApiResponse<Message>>('/api/v1/messages', data);
  },

  // Mark as read
  markAsRead: async (id: number): Promise<ApiResponse<Message>> => {
    return api.put<ApiResponse<Message>>(`/api/v1/messages/${id}`, { is_read: true });
  },

  // Mark multiple as read
  markMultipleAsRead: async (messageIds: number[]): Promise<void> => {
    return api.post('/api/v1/messages/mark-as-read', { message_ids: messageIds });
  },

  // Delete message
  delete: async (id: number): Promise<void> => {
    return api.delete(`/api/v1/messages/${id}`);
  },

  // Get conversations
  getConversations: async (): Promise<ApiResponse<Conversation[]>> => {
    return api.get<ApiResponse<Conversation[]>>('/api/v1/messages/conversations');
  },
};

export default messageService;
