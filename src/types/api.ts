// API Types matching backend responses

// Generic API Response
export interface ApiResponse<T> {
  success: boolean;
  message?: string;
  data: T;
}

// Paginated Response
export interface PaginatedResponse<T> {
  data: T[];
  meta: {
    current_page: number;
    from: number;
    last_page: number;
    per_page: number;
    to: number;
    total: number;
  };
  links: {
    first: string;
    last: string;
    prev: string | null;
    next: string | null;
  };
}

// User
export interface User {
  id: number;
  username: string;
  email: string;
  full_name: string;
  phone_number?: string;
  bio?: string;
  city?: string;
  address?: string;
  profile_picture_url?: string;
  seller_code?: string;
  created_at: string;
  updated_at: string;
}

// Auth Response
export interface AuthResponse {
  access_token: string;
  token_type: string;
  expires_in: number;
  user: User;
}

// Category
export interface Category {
  id: number;
  name: string;
  slug: string;
  icon_url?: string;
  created_at: string;
  updated_at: string;
}

// Product Image
export interface ProductImage {
  id: number;
  product_id: number;
  image_url: string;
  is_primary: boolean;
  created_at: string;
  updated_at: string;
}

// Product
export interface Product {
  id: number;
  category_id: number;
  seller_id: number;
  name: string;
  description: string;
  price: number;
  condition_status: 'new_with_tag' | 'like_new' | 'good' | 'fair';
  stock: number;
  location: string;
  status: 'active' | 'sold' | 'inactive';
  created_at: string;
  updated_at: string;
  category?: Category;
  seller?: User;
  images?: ProductImage[];
  primary_image?: ProductImage;
}

// Wishlist Item
export interface WishlistItem {
  id: number;
  user_id: number;
  product_id: number;
  created_at: string;
  product?: Product;
}

// Transaction
export interface Transaction {
  id: number;
  buyer_id: number;
  seller_id: number;
  product_id: number;
  deal_price: number;
  status: 'pending' | 'confirmed' | 'shipped' | 'completed' | 'cancelled';
  created_at: string;
  updated_at: string;
  buyer?: User;
  seller?: User;
  product?: Product;
}

// Review
export interface Review {
  id: number;
  transaction_id: number;
  reviewer_id: number;
  target_user_id: number;
  rating: number;
  comment: string;
  created_at: string;
  updated_at: string;
  reviewer?: User;
  target_user?: User;
  transaction?: Transaction;
}

// User Rating Stats
export interface UserRatingStats {
  user_id: number;
  average_rating: number;
  total_reviews: number;
  rating_distribution: {
    1: number;
    2: number;
    3: number;
    4: number;
    5: number;
  };
}

// Message
export interface Message {
  id: number;
  sender_id: number;
  receiver_id: number;
  product_id?: number;
  message_text: string;
  is_read: boolean;
  created_at: string;
  updated_at: string;
  sender?: User;
  receiver?: User;
  product?: Product;
}

// Conversation
export interface Conversation {
  user: User;
  last_message: Message;
  unread_count: number;
}

// Request Types
export interface LoginRequest {
  email: string;
  password: string;
}

export interface RegisterRequest {
  username: string;
  email: string;
  password: string;
  password_confirmation: string;
  full_name: string;
  phone_number: string;
  seller_code?: string;
  bio?: string;
  city?: string;
  address?: string;
  profile_picture_url?: string;
}

export interface ProductFilters {
  per_page?: number;
  page?: number;
  status?: string;
  category_id?: number;
  seller_id?: number;
  condition_status?: string;
  search?: string;
  min_price?: number;
  max_price?: number;
  sort_by?: string;
  sort_order?: 'asc' | 'desc';
}

export interface CreateTransactionRequest {
  product_id: number;
  deal_price: number;
}

export interface CreateReviewRequest {
  transaction_id: number;
  target_user_id: number;
  rating: number;
  comment: string;
}

export interface SendMessageRequest {
  receiver_id: number;
  product_id?: number;
  message_text: string;
}
