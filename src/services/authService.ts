// Auth Service for Reloop E-Commerce

import { api, setToken, removeToken } from './api';
import type { 
  AuthResponse, 
  User, 
  LoginRequest, 
  RegisterRequest 
} from '../types/api';

// Auth response is returned directly (not wrapped in ApiResponse.data)
export const authService = {
  // Register new user
  register: async (data: RegisterRequest): Promise<AuthResponse> => {
    const response = await api.post<AuthResponse>('/api/auth/register', data);
    // Token is at root level of response
    if (response.access_token) {
      setToken(response.access_token);
      // Dispatch auth changed event
      window.dispatchEvent(new CustomEvent('auth-changed', { detail: { user: response.user } }));
    }
    return response;
  },

  // Login user
  login: async (data: LoginRequest): Promise<AuthResponse> => {
    console.log('[AuthService] Calling login API...');
    const response = await api.post<AuthResponse>('/api/auth/login', data);
    console.log('[AuthService] Login response:', response);
    console.log('[AuthService] access_token exists:', !!response.access_token);
    // Token is at root level of response (not inside response.data)
    if (response.access_token) {
      console.log('[AuthService] Setting token...');
      setToken(response.access_token);
      console.log('[AuthService] Token set. Dispatching auth-changed event...');
      // Dispatch auth changed event
      window.dispatchEvent(new CustomEvent('auth-changed', { detail: { user: response.user } }));
    } else {
      console.warn('[AuthService] No access_token in response!');
    }
    return response;
  },

  // Get current user - returns user directly (may or may not be wrapped)
  me: async (): Promise<User> => {
    const response = await api.get<{ data?: User } & User>('/api/auth/me');
    // Handle both wrapped and unwrapped responses
    return response.data || response as User;
  },

  // Logout user
  logout: async (): Promise<void> => {
    try {
      await api.post('/api/auth/logout');
    } finally {
      removeToken();
      // Dispatch auth changed event
      window.dispatchEvent(new CustomEvent('auth-changed', { detail: { user: null } }));
    }
  },

  // Refresh token
  refresh: async (): Promise<AuthResponse> => {
    const response = await api.post<AuthResponse>('/api/auth/refresh');
    if (response.access_token) {
      setToken(response.access_token);
    }
    return response;
  },
};

export default authService;
