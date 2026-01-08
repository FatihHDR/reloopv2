// Auth Service for Reloop E-Commerce

import { api, setToken, removeToken } from './api';
import type { 
  ApiResponse, 
  AuthResponse, 
  User, 
  LoginRequest, 
  RegisterRequest 
} from '../types/api';

export const authService = {
  // Register new user
  register: async (data: RegisterRequest): Promise<ApiResponse<AuthResponse>> => {
    const response = await api.post<ApiResponse<AuthResponse>>('/api/auth/register', data);
    if (response.data?.access_token) {
      setToken(response.data.access_token);
    }
    return response;
  },

  // Login user
  login: async (data: LoginRequest): Promise<ApiResponse<AuthResponse>> => {
    const response = await api.post<ApiResponse<AuthResponse>>('/api/auth/login', data);
    if (response.data?.access_token) {
      setToken(response.data.access_token);
    }
    return response;
  },

  // Get current user
  me: async (): Promise<ApiResponse<User>> => {
    return api.get<ApiResponse<User>>('/api/auth/me');
  },

  // Logout user
  logout: async (): Promise<void> => {
    try {
      await api.post('/api/auth/logout');
    } finally {
      removeToken();
    }
  },

  // Refresh token
  refresh: async (): Promise<ApiResponse<AuthResponse>> => {
    const response = await api.post<ApiResponse<AuthResponse>>('/api/auth/refresh');
    if (response.data?.access_token) {
      setToken(response.data.access_token);
    }
    return response;
  },
};

export default authService;
