/**
 * File name: footer.schema.ts
 * Purpose: Zod schema for Footer component validation
 * Function Summary:
 * 1. Define footer component props structure
 * 2. Provide type validation for footer content
 * 3. Enable runtime type checking
 * 
 * Author: Personal Brand Builder Team
 * Version: 1.0.0
 * Created: 2025-07-31
 * Last modified: 2025-07-31 (footer schema implementation)
 */

import { z } from 'zod';

export const FooterPropsSchema = z.object({
  copyright: z.string().optional(),
  socialLinks: z.object({
    twitter: z.string().optional(),
    linkedin: z.string().optional(),
    github: z.string().optional(),
    instagram: z.string().optional(),
    facebook: z.string().optional(),
    youtube: z.string().optional()
  }).optional(),
  links: z.array(z.object({
    title: z.string(),
    url: z.string()
  })).optional(),
  showNewsletter: z.boolean().optional(),
  newsletterTitle: z.string().optional(),
  newsletterDescription: z.string().optional(),
  backgroundColor: z.string().optional(),
  textColor: z.string().optional()
});

export type FooterProps = z.infer<typeof FooterPropsSchema>;

export const defaultFooterProps: FooterProps = {
  copyright: '© 2025 Personal Brand Builder. All rights reserved.',
  socialLinks: {
    twitter: 'https://twitter.com',
    linkedin: 'https://linkedin.com',
    github: 'https://github.com',
    instagram: 'https://instagram.com',
    facebook: 'https://facebook.com',
    youtube: 'https://youtube.com'
  },
  links: [
    { title: 'About', url: '#about' },
    { title: 'Services', url: '#services' },
    { title: 'Contact', url: '#contact' },
    { title: 'Privacy Policy', url: '/privacy' }
  ],
  showNewsletter: true,
  newsletterTitle: 'Stay Updated',
  newsletterDescription: 'Get the latest updates and insights delivered to your inbox.',
  backgroundColor: '#1f2937',
  textColor: '#ffffff'
}; 