/**
 * File name: blog.schema.ts
 * Purpose: Zod schema for Blog component validation
 * Function Summary:
 * 1. Define blog component props structure
 * 2. Provide type validation for blog posts
 * 3. Enable runtime type checking
 * 
 * Author: Personal Brand Builder Team
 * Version: 1.0.0
 * Created: 2025-07-31
 * Last modified: 2025-07-31 (blog schema implementation)
 */

import { z } from 'zod';

export const BlogPropsSchema = z.object({
  title: z.string().optional(),
  description: z.string().optional(),
  posts: z.array(z.object({
    id: z.string(),
    title: z.string(),
    excerpt: z.string(),
    image: z.string().optional(),
    date: z.string().optional(),
    author: z.string().optional(),
    category: z.string().optional(),
    readTime: z.string().optional(),
    url: z.string().optional()
  })).optional(),
  showFeatured: z.boolean().optional(),
  layout: z.enum(['grid', 'list', 'masonry']).optional(),
  postsPerPage: z.number().optional()
});

export type BlogProps = z.infer<typeof BlogPropsSchema>;

export const defaultBlogProps: BlogProps = {
  title: 'Latest Blog Posts',
  description: 'Stay updated with our latest articles and insights',
  posts: [
    {
      id: '1',
      title: 'Getting Started with Personal Branding',
      excerpt: 'Learn the basics of building your personal brand online.',
      image: '',
      date: '2025-01-15',
      author: 'John Doe',
      category: 'Personal Branding',
      readTime: '5 min read',
      url: '#'
    },
    {
      id: '2',
      title: 'Design Principles for Landing Pages',
      excerpt: 'Essential design principles to create effective landing pages.',
      image: '',
      date: '2025-01-10',
      author: 'Jane Smith',
      category: 'Design',
      readTime: '8 min read',
      url: '#'
    }
  ],
  showFeatured: true,
  layout: 'grid',
  postsPerPage: 6
}; 