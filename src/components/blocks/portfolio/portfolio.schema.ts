/**
 * File name: portfolio.schema.ts
 * Purpose: Zod schema for Portfolio component props validation
 * Function Summary:
 * 1. Define Portfolio component prop types
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

// Project schema
export const ProjectSchema = z.object({
  id: z.string().min(1, 'Project ID is required'),
  title: z.string().min(1, 'Project title is required').max(100, 'Project title must be less than 100 characters'),
  description: z.string().max(500, 'Project description must be less than 500 characters'),
  image: z.string().url().optional().or(z.literal('')),
  link: z.string().url().optional().or(z.literal('')),
  tags: z.array(z.string().max(20)).max(10, 'Maximum 10 tags allowed').default([]),
  featured: z.boolean().default(false),
  date: z.string().optional()
});

// Layout options
export const LayoutSchema = z.enum(['grid', 'masonry', 'list', 'carousel']);

// Portfolio component props schema
export const PortfolioPropsSchema = z.object({
  // Content
  title: z.string().min(1, 'Title is required').max(100, 'Title must be less than 100 characters'),
  subtitle: z.string().max(200, 'Subtitle must be less than 200 characters').optional(),
  
  // Projects
  projects: z.array(ProjectSchema).max(50, 'Maximum 50 projects allowed').default([]),
  
  // Layout
  layout: LayoutSchema.default('grid'),
  showFilters: z.boolean().default(true),
  filters: z.array(z.string().max(20)).max(10, 'Maximum 10 filters allowed').default(['All', 'Web', 'Mobile', 'Design']),
  itemsPerPage: z.number().min(1).max(50).default(6),
  
  // Display
  showProjectImages: z.boolean().default(true),
  showProjectDescriptions: z.boolean().default(true),
  showProjectTags: z.boolean().default(true),
  showProjectLinks: z.boolean().default(true),
  
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
export type PortfolioProps = z.infer<typeof PortfolioPropsSchema>;

// Default props
export const defaultPortfolioProps: PortfolioProps = {
  title: 'My Work',
  subtitle: 'Featured projects and case studies',
  projects: [
    {
      id: '1',
      title: 'E-commerce Platform',
      description: 'A modern e-commerce platform built with React and Node.js',
      image: '',
      link: 'https://example.com',
      tags: ['React', 'Node.js', 'MongoDB'],
      featured: true,
      date: '2024-01-15'
    },
    {
      id: '2',
      title: 'Mobile App',
      description: 'Cross-platform mobile application for task management',
      image: '',
      link: 'https://example.com',
      tags: ['React Native', 'Firebase'],
      featured: false,
      date: '2024-02-20'
    }
  ],
  layout: 'grid',
  showFilters: true,
  filters: ['All', 'Web', 'Mobile', 'Design'],
  itemsPerPage: 6,
  showProjectImages: true,
  showProjectDescriptions: true,
  showProjectTags: true,
  showProjectLinks: true,
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