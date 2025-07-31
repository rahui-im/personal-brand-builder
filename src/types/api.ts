/**
 * File name: api.ts
 * Purpose: API related type definitions for the Personal Brand Builder
 * Function Summary:
 * 1. Define API request/response types
 * 2. Define authentication types
 * 3. Define file upload types
 * 4. Define error handling types
 * 
 * Author: AI Assistant
 * Version: 1.0.0
 * Created: 2025-01-31
 * Last modified: 2025-01-31 (initial API types)
 */

// Base API response structure
export interface ApiResponse<T = any> {
  success: boolean;
  data?: T;
  error?: string;
  message?: string;
  timestamp: string;
}

// Authentication types
export interface LoginRequest {
  email: string;
  password: string;
  rememberMe?: boolean;
}

export interface RegisterRequest {
  email: string;
  password: string;
  confirmPassword: string;
  firstName: string;
  lastName: string;
  acceptTerms: boolean;
}

export interface AuthResponse {
  user: User;
  token: string;
  refreshToken: string;
  expiresAt: string;
}

export interface User {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  avatar?: string;
  isEmailVerified: boolean;
  createdAt: string;
  updatedAt: string;
  subscription?: Subscription;
}

export interface Subscription {
  id: string;
  plan: 'free' | 'pro' | 'enterprise';
  status: 'active' | 'canceled' | 'past_due' | 'unpaid';
  currentPeriodStart: string;
  currentPeriodEnd: string;
  cancelAtPeriodEnd: boolean;
}

// Page management API types
export interface CreatePageRequest {
  name: string;
  slug: string;
  components: any[];
  metadata: {
    title: string;
    description: string;
    keywords: string[];
  };
  settings: {
    theme: 'light' | 'dark' | 'auto';
    layout: 'full' | 'contained' | 'boxed';
    showHeader: boolean;
    showFooter: boolean;
  };
}

export interface UpdatePageRequest extends Partial<CreatePageRequest> {
  id: string;
}

export interface PageResponse {
  id: string;
  name: string;
  slug: string;
  components: any[];
  metadata: {
    title: string;
    description: string;
    keywords: string[];
  };
  settings: {
    theme: 'light' | 'dark' | 'auto';
    layout: 'full' | 'contained' | 'boxed';
    showHeader: boolean;
    showFooter: boolean;
  };
  publishedAt?: string;
  createdAt: string;
  updatedAt: string;
}

// File upload types
export interface UploadRequest {
  file: File;
  type: 'image' | 'video' | 'document';
  folder?: string;
}

export interface UploadResponse {
  id: string;
  url: string;
  filename: string;
  size: number;
  mimeType: string;
  uploadedAt: string;
}

// Template API types
export interface Template {
  id: string;
  name: string;
  description: string;
  category: 'personal' | 'business' | 'portfolio' | 'blog';
  thumbnail: string;
  preview: string;
  components: any[];
  tags: string[];
  isPremium: boolean;
  downloads: number;
  rating: number;
  createdAt: string;
}

export interface TemplateResponse {
  templates: Template[];
  total: number;
  page: number;
  limit: number;
}

// Error types
export interface ApiError {
  code: string;
  message: string;
  details?: Record<string, any>;
  field?: string;
}

export interface ValidationError {
  field: string;
  message: string;
  code: string;
}

// Pagination types
export interface PaginationParams {
  page?: number;
  limit?: number;
  sortBy?: string;
  sortOrder?: 'asc' | 'desc';
  search?: string;
  filter?: Record<string, any>;
}

export interface PaginatedResponse<T> {
  data: T[];
  pagination: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
    hasNext: boolean;
    hasPrev: boolean;
  };
}

// Webhook types
export interface WebhookEvent {
  id: string;
  type: 'page.published' | 'page.updated' | 'user.subscription_changed';
  data: Record<string, any>;
  createdAt: string;
}

// Analytics types
export interface AnalyticsData {
  pageViews: number;
  uniqueVisitors: number;
  bounceRate: number;
  averageSessionDuration: number;
  topPages: Array<{
    path: string;
    views: number;
  }>;
  topReferrers: Array<{
    source: string;
    visits: number;
  }>;
  period: {
    start: string;
    end: string;
  };
}

// Export all types
export type {
  ApiResponse,
  LoginRequest,
  RegisterRequest,
  AuthResponse,
  User,
  Subscription,
  CreatePageRequest,
  UpdatePageRequest,
  PageResponse,
  UploadRequest,
  UploadResponse,
  Template,
  TemplateResponse,
  ApiError,
  ValidationError,
  PaginationParams,
  PaginatedResponse,
  WebhookEvent,
  AnalyticsData,
}; 