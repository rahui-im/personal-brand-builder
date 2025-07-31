/**
 * File name: hero.schema.ts
 * Purpose: Zod schema for Hero component props validation
 * Function Summary:
 * 1. Define Hero component prop types
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

// Social links schema
export const SocialLinksSchema = z.object({
  twitter: z.string().url().optional().or(z.literal('')),
  linkedin: z.string().url().optional().or(z.literal('')),
  github: z.string().url().optional().or(z.literal('')),
  email: z.string().email().optional().or(z.literal('')),
  instagram: z.string().url().optional().or(z.literal('')),
  facebook: z.string().url().optional().or(z.literal('')),
  youtube: z.string().url().optional().or(z.literal('')),
  website: z.string().url().optional().or(z.literal(''))
});

// Background types
export const BackgroundTypeSchema = z.enum(['solid', 'gradient', 'image', 'video']);

// Alignment options
export const AlignmentSchema = z.enum(['left', 'center', 'right']);

// CTA button styles
export const CTAButtonStyleSchema = z.enum(['primary', 'secondary', 'outline', 'ghost']);

// Hero component props schema
export const HeroPropsSchema = z.object({
  // Content
  title: z.string().min(1, 'Title is required').max(100, 'Title must be less than 100 characters'),
  subtitle: z.string().max(200, 'Subtitle must be less than 200 characters').optional(),
  description: z.string().max(500, 'Description must be less than 500 characters').optional(),
  
  // Visual
  backgroundType: BackgroundTypeSchema.default('gradient'),
  backgroundImage: z.string().url().optional().or(z.literal('')),
  backgroundColor: z.string().regex(/^#[0-9A-F]{6}$/i, 'Invalid color format').optional(),
  gradientColors: z.object({
    from: z.string().regex(/^#[0-9A-F]{6}$/i, 'Invalid color format'),
    to: z.string().regex(/^#[0-9A-F]{6}$/i, 'Invalid color format')
  }).optional(),
  
  // Call to Action
  ctaText: z.string().max(50, 'CTA text must be less than 50 characters').optional(),
  ctaLink: z.string().optional(),
  ctaStyle: CTAButtonStyleSchema.default('primary'),
  showCTA: z.boolean().default(true),
  
  // Layout
  alignment: AlignmentSchema.default('center'),
  height: z.enum(['small', 'medium', 'large', 'full']).default('medium'),
  padding: z.object({
    top: z.number().min(0).max(100).default(80),
    bottom: z.number().min(0).max(100).default(80),
    left: z.number().min(0).max(100).default(20),
    right: z.number().min(0).max(100).default(20)
  }).default({}),
  
  // Social Links
  showSocialLinks: z.boolean().default(false),
  socialLinks: SocialLinksSchema.default({}),
  socialLinksStyle: z.enum(['icons', 'text', 'buttons']).default('icons'),
  
  // Typography
  titleFontSize: z.enum(['sm', 'base', 'lg', 'xl', '2xl', '3xl', '4xl', '5xl']).default('4xl'),
  subtitleFontSize: z.enum(['sm', 'base', 'lg', 'xl', '2xl']).default('xl'),
  titleFontWeight: z.enum(['normal', 'medium', 'semibold', 'bold']).default('bold'),
  subtitleFontWeight: z.enum(['normal', 'medium', 'semibold', 'bold']).default('normal'),
  
  // Colors
  titleColor: z.string().regex(/^#[0-9A-F]{6}$/i, 'Invalid color format').default('#1f2937'),
  subtitleColor: z.string().regex(/^#[0-9A-F]{6}$/i, 'Invalid color format').default('#6b7280'),
  
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
export type HeroProps = z.infer<typeof HeroPropsSchema>;

// Default props
export const defaultHeroProps: HeroProps = {
  title: 'Welcome to my personal brand',
  subtitle: 'I help businesses grow through strategic solutions',
  backgroundType: 'gradient',
  backgroundImage: '',
  ctaText: 'Get Started',
  ctaLink: '#contact',
  alignment: 'center',
  height: 'medium',
  showSocialLinks: true,
  socialLinks: {
    twitter: '',
    linkedin: '',
    github: '',
    email: ''
  },
  titleFontSize: '4xl',
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
  showCTA: true,
  ctaStyle: 'primary',
  socialLinksStyle: 'icons',
  padding: {
    top: 80,
    bottom: 80,
    left: 20,
    right: 20
  }
}; 