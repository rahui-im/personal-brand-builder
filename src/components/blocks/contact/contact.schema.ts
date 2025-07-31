/**
 * File name: contact.schema.ts
 * Purpose: Zod schema for Contact component props validation
 * Function Summary:
 * 1. Define Contact component prop types
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

// Contact info schema
export const ContactInfoSchema = z.object({
  email: z.string().email().optional().or(z.literal('')),
  phone: z.string().optional().or(z.literal('')),
  address: z.string().optional().or(z.literal('')),
  socialLinks: z.object({
    twitter: z.string().url().optional().or(z.literal('')),
    linkedin: z.string().url().optional().or(z.literal('')),
    github: z.string().url().optional().or(z.literal('')),
    instagram: z.string().url().optional().or(z.literal(''))
  }).default({})
});

// Form field schema
export const FormFieldSchema = z.enum(['name', 'email', 'phone', 'message', 'subject', 'company']);

// Layout options
export const LayoutSchema = z.enum(['split', 'centered', 'form-only', 'info-only']);

// Contact component props schema
export const ContactPropsSchema = z.object({
  // Content
  title: z.string().min(1, 'Title is required').max(100, 'Title must be less than 100 characters'),
  subtitle: z.string().max(200, 'Subtitle must be less than 200 characters').optional(),
  
  // Form
  showForm: z.boolean().default(true),
  formFields: z.array(FormFieldSchema).default(['name', 'email', 'message']),
  submitButtonText: z.string().max(50, 'Submit button text must be less than 50 characters').default('Send Message'),
  formTitle: z.string().max(100, 'Form title must be less than 100 characters').optional(),
  
  // Contact Info
  contactInfo: ContactInfoSchema.default({}),
  showContactInfo: z.boolean().default(true),
  contactInfoTitle: z.string().max(100, 'Contact info title must be less than 100 characters').optional(),
  
  // Layout
  layout: LayoutSchema.default('split'),
  
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
export type ContactProps = z.infer<typeof ContactPropsSchema>;

// Default props
export const defaultContactProps: ContactProps = {
  title: 'Get In Touch',
  subtitle: 'Let\'s discuss your next project',
  showForm: true,
  formFields: ['name', 'email', 'message'],
  submitButtonText: 'Send Message',
  formTitle: 'Send a Message',
  contactInfo: {
    email: 'hello@example.com',
    phone: '+1 (555) 123-4567',
    address: '123 Main St, San Francisco, CA 94105',
    socialLinks: {
      twitter: 'https://twitter.com/example',
      linkedin: 'https://linkedin.com/in/example',
      github: 'https://github.com/example',
      instagram: 'https://instagram.com/example'
    }
  },
  showContactInfo: true,
  contactInfoTitle: 'Contact Information',
  layout: 'split',
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