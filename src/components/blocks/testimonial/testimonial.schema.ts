/**
 * File name: testimonial.schema.ts
 * Purpose: Zod schema for Testimonial component props validation
 * Function Summary:
 * 1. Define Testimonial component prop types
 * 2. Provide validation rules for all props
 * 3. Set default values and constraints
 * 4. Enable type-safe prop handling
 * 
 * Author: AI Assistant
 * Version: 1.0.0
 * Created: 2025-01-31
 * Last modified: 2025-01-31 (initial implementation)
 */

import { z } from 'zod';

// Testimonial item schema
export const TestimonialItemSchema = z.object({
  id: z.string().min(1, 'Testimonial ID is required'),
  name: z.string().min(1, 'Name is required').max(100, 'Name must be less than 100 characters'),
  role: z.string().max(100, 'Role must be less than 100 characters').optional(),
  company: z.string().max(100, 'Company must be less than 100 characters').optional(),
  content: z.string().min(1, 'Content is required').max(500, 'Content must be less than 500 characters'),
  avatar: z.string().url().optional().or(z.literal('')),
  rating: z.number().min(1).max(5).default(5),
  date: z.string().optional()
});

// Layout options
export const LayoutSchema = z.enum(['carousel', 'grid', 'list']);

// Testimonial component props schema
export const TestimonialPropsSchema = z.object({
  // Content
  title: z.string().min(1, 'Title is required').max(100, 'Title must be less than 100 characters'),
  subtitle: z.string().max(200, 'Subtitle must be less than 200 characters').optional(),
  
  // Testimonials
  testimonials: z.array(TestimonialItemSchema).max(20, 'Maximum 20 testimonials allowed').default([]),
  
  // Layout
  layout: LayoutSchema.default('carousel'),
  showRating: z.boolean().default(true),
  showAvatar: z.boolean().default(true),
  showDate: z.boolean().default(false),
  
  // Carousel settings
  autoPlay: z.boolean().default(true),
  interval: z.number().min(1000).max(10000).default(5000),
  showDots: z.boolean().default(true),
  showArrows: z.boolean().default(true),
  
  // Typography
  titleFontSize: z.enum(['sm', 'base', 'lg', 'xl', '2xl', '3xl', '4xl']).default('3xl'),
  subtitleFontSize: z.enum(['sm', 'base', 'lg', 'xl', '2xl']).default('xl'),
  titleFontWeight: z.enum(['normal', 'medium', 'semibold', 'bold']).default('bold'),
  subtitleFontWeight: z.enum(['normal', 'medium', 'semibold', 'bold']).default('normal'),
  
  // Colors
  titleColor: z.string().regex(/^#[0-9A-F]{6}$/i, 'Invalid color format').default('#1f2937'),
  subtitleColor: z.string().regex(/^#[0-9A-F]{6}$/i, 'Invalid color format').default('#6b7280'),
  
  // Spacing
  padding: z.object({
    top: z.number().min(0).max(100).default(80),
    bottom: z.number().min(0).max(100).default(80),
    left: z.number().min(0).max(100).default(20),
    right: z.number().min(0).max(100).default(20)
  }).default({}),
  
  // Animation
  enableAnimation: z.boolean().default(true),
  animationType: z.enum(['fadeIn', 'slideIn', 'bounce', 'none']).default('fadeIn'),
  animationDuration: z.number().min(0.1).max(3).default(0.5),
  animationDelay: z.number().min(0).max(2).default(0),
  
  // Responsive
  mobileTitleFontSize: z.enum(['sm', 'base', 'lg', 'xl', '2xl', '3xl']).default('2xl'),
  mobileSubtitleFontSize: z.enum(['sm', 'base', 'lg', 'xl']).default('lg'),
  
  // Advanced
  customCSS: z.string().max(1000, 'Custom CSS must be less than 1000 characters').optional(),
  className: z.string().max(200, 'Class name must be less than 200 characters').optional(),
  
  // SEO
  metaTitle: z.string().max(60, 'Meta title must be less than 60 characters').optional(),
  metaDescription: z.string().max(160, 'Meta description must be less than 160 characters').optional()
});

// Type export for TypeScript
export type TestimonialProps = z.infer<typeof TestimonialPropsSchema>;

// Default props
export const defaultTestimonialProps: TestimonialProps = {
  title: 'What People Say',
  subtitle: 'Testimonials from satisfied clients',
  testimonials: [
    {
      id: '1',
      name: 'John Doe',
      role: 'CEO',
      company: 'Tech Corp',
      content: 'Amazing work and great communication throughout the project. Highly recommended!',
      avatar: '',
      rating: 5,
      date: '2024-01-15'
    },
    {
      id: '2',
      name: 'Jane Smith',
      role: 'Marketing Director',
      company: 'Startup Inc',
      content: 'Professional, reliable, and delivered exactly what we needed. Will work together again!',
      avatar: '',
      rating: 5,
      date: '2024-02-20'
    }
  ],
  layout: 'carousel',
  showRating: true,
  showAvatar: true,
  showDate: false,
  autoPlay: true,
  interval: 5000,
  showDots: true,
  showArrows: true,
  titleFontSize: '3xl',
  subtitleFontSize: 'xl',
  titleFontWeight: 'bold',
  subtitleFontWeight: 'normal',
  titleColor: '#1f2937',
  subtitleColor: '#6b7280',
  enableAnimation: true,
  animationType: 'fadeIn',
  animationDuration: 0.5,
  animationDelay: 0,
  mobileTitleFontSize: '2xl',
  mobileSubtitleFontSize: 'lg',
  padding: {
    top: 80,
    bottom: 80,
    left: 20,
    right: 20
  }
}; 