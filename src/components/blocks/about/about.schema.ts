/**
 * File name: about.schema.ts
 * Purpose: Zod schema for About component props validation
 * Function Summary:
 * 1. Define About component prop types
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

// Skill schema
export const SkillSchema = z.object({
  name: z.string().min(1, 'Skill name is required').max(50, 'Skill name must be less than 50 characters'),
  level: z.number().min(0).max(100, 'Skill level must be between 0 and 100'),
  color: z.string().regex(/^#[0-9A-F]{6}$/i, 'Invalid color format').optional(),
  icon: z.string().optional()
});

// Contact info schema
export const ContactInfoSchema = z.object({
  email: z.string().email().optional().or(z.literal('')),
  phone: z.string().optional().or(z.literal('')),
  location: z.string().optional().or(z.literal('')),
  website: z.string().url().optional().or(z.literal(''))
});

// Layout options
export const LayoutSchema = z.enum(['left-image', 'right-image', 'center', 'split']);

// About component props schema
export const AboutPropsSchema = z.object({
  // Content
  title: z.string().min(1, 'Title is required').max(100, 'Title must be less than 100 characters'),
  subtitle: z.string().max(200, 'Subtitle must be less than 200 characters').optional(),
  content: z.string().min(1, 'Content is required').max(2000, 'Content must be less than 2000 characters'),
  
  // Image
  image: z.string().url().optional().or(z.literal('')),
  imageAlt: z.string().max(100, 'Image alt text must be less than 100 characters').optional(),
  imageStyle: z.enum(['rounded', 'square', 'circle']).default('rounded'),
  
  // Layout
  layout: LayoutSchema.default('left-image'),
  showImage: z.boolean().default(true),
  
  // Skills
  showSkills: z.boolean().default(false),
  skills: z.array(SkillSchema).max(10, 'Maximum 10 skills allowed').default([]),
  skillsTitle: z.string().max(100, 'Skills title must be less than 100 characters').optional(),
  
  // Contact Info
  showContactInfo: z.boolean().default(false),
  contactInfo: ContactInfoSchema.default({}),
  contactInfoTitle: z.string().max(100, 'Contact info title must be less than 100 characters').optional(),
  
  // Typography
  titleFontSize: z.enum(['sm', 'base', 'lg', 'xl', '2xl', '3xl', '4xl']).default('3xl'),
  subtitleFontSize: z.enum(['sm', 'base', 'lg', 'xl', '2xl']).default('xl'),
  contentFontSize: z.enum(['sm', 'base', 'lg', 'xl']).default('base'),
  titleFontWeight: z.enum(['normal', 'medium', 'semibold', 'bold']).default('bold'),
  subtitleFontWeight: z.enum(['normal', 'medium', 'semibold', 'bold']).default('normal'),
  contentFontWeight: z.enum(['normal', 'medium', 'semibold', 'bold']).default('normal'),
  
  // Colors
  titleColor: z.string().regex(/^#[0-9A-F]{6}$/i, 'Invalid color format').default('#1f2937'),
  subtitleColor: z.string().regex(/^#[0-9A-F]{6}$/i, 'Invalid color format').default('#6b7280'),
  contentColor: z.string().regex(/^#[0-9A-F]{6}$/i, 'Invalid color format').default('#374151'),
  
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
  mobileContentFontSize: z.enum(['sm', 'base', 'lg']).default('base'),
  
  // Advanced
  customCSS: z.string().max(1000, 'Custom CSS must be less than 1000 characters').optional(),
  className: z.string().max(200, 'Class name must be less than 200 characters').optional(),
  
  // SEO
  metaTitle: z.string().max(60, 'Meta title must be less than 60 characters').optional(),
  metaDescription: z.string().max(160, 'Meta description must be less than 160 characters').optional()
});

// Type export for TypeScript
export type AboutProps = z.infer<typeof AboutPropsSchema>;

// Default props
export const defaultAboutProps: AboutProps = {
  title: 'About Me',
  subtitle: 'Get to know me better',
  content: 'I am a passionate professional with expertise in web development, design, and digital strategy. With years of experience in creating innovative solutions, I help businesses achieve their goals through technology and creativity.',
  image: '',
  imageAlt: 'Profile photo',
  imageStyle: 'rounded',
  layout: 'left-image',
  showImage: true,
  showSkills: true,
  skills: [
    { name: 'JavaScript', level: 90, color: '#f7df1e' },
    { name: 'React', level: 85, color: '#61dafb' },
    { name: 'Node.js', level: 80, color: '#339933' },
    { name: 'TypeScript', level: 75, color: '#3178c6' },
    { name: 'Python', level: 70, color: '#3776ab' }
  ],
  skillsTitle: 'My Skills',
  showContactInfo: true,
  contactInfo: {
    email: 'hello@example.com',
    phone: '+1 (555) 123-4567',
    location: 'San Francisco, CA',
    website: 'https://example.com'
  },
  contactInfoTitle: 'Get In Touch',
  titleFontSize: '3xl',
  subtitleFontSize: 'xl',
  contentFontSize: 'base',
  titleFontWeight: 'bold',
  subtitleFontWeight: 'normal',
  contentFontWeight: 'normal',
  titleColor: '#1f2937',
  subtitleColor: '#6b7280',
  contentColor: '#374151',
  enableAnimation: true,
  animationType: 'fadeIn',
  animationDuration: 0.5,
  animationDelay: 0,
  mobileTitleFontSize: '2xl',
  mobileSubtitleFontSize: 'lg',
  mobileContentFontSize: 'base',
  padding: {
    top: 80,
    bottom: 80,
    left: 20,
    right: 20
  }
}; 