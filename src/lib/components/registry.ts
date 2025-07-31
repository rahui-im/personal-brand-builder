/**
 * File name: registry.ts
 * Purpose: Central registry for all page block components with their metadata and schemas
 * Function Summary:
 * 1. Define component metadata (icons, categories, default props)
 * 2. Provide Zod schemas for type validation
 * 3. Enable dynamic component loading
 * 4. Support component categorization and filtering
 * 
 * Author: AI Assistant
 * Version: 1.0.0
 * Created: 2025-01-31
 * Last modified: 2025-01-31 (initial implementation)
 */

import React from 'react';
import { z } from 'zod';
import dynamic from 'next/dynamic';
import { 
  LayoutIcon, 
  UserIcon, 
  BriefcaseIcon, 
  MessageSquareIcon,
  StarIcon,
  DollarSignIcon,
  FileTextIcon
} from 'lucide-react';

// Import component schemas
import { HeroPropsSchema } from '@/components/blocks/hero/hero.schema';
import { AboutPropsSchema } from '@/components/blocks/about/about.schema';
import { PortfolioPropsSchema } from '@/components/blocks/portfolio/portfolio.schema';
import { ContactPropsSchema } from '@/components/blocks/contact/contact.schema';
import { TestimonialPropsSchema } from '@/components/blocks/testimonial/testimonial.schema';
import { PricingPropsSchema } from '@/components/blocks/pricing/pricing.schema';
import { BlogPropsSchema } from '@/components/blocks/blog/blog.schema';
import { FooterPropsSchema } from '@/components/blocks/footer/footer.schema';

// Dynamic imports for components (lazy loading)
const HeroBlock = dynamic(() => import('@/components/blocks/hero/HeroBlock'), {
  loading: () => React.createElement('div', { className: "h-64 bg-gray-100 animate-pulse rounded-lg" })
});

const AboutBlock = dynamic(() => import('@/components/blocks/about/AboutBlock'), {
  loading: () => React.createElement('div', { className: "h-64 bg-gray-100 animate-pulse rounded-lg" })
});

const PortfolioBlock = dynamic(() => import('@/components/blocks/portfolio/PortfolioBlock'), {
  loading: () => React.createElement('div', { className: "h-64 bg-gray-100 animate-pulse rounded-lg" })
});

const ContactBlock = dynamic(() => import('@/components/blocks/contact/ContactBlock'), {
  loading: () => React.createElement('div', { className: "h-64 bg-gray-100 animate-pulse rounded-lg" })
});

const TestimonialBlock = dynamic(() => import('@/components/blocks/testimonial/TestimonialBlock'), {
  loading: () => React.createElement('div', { className: "h-64 bg-gray-100 animate-pulse rounded-lg" })
});

const PricingBlock = dynamic(() => import('@/components/blocks/pricing/PricingBlock'), {
  loading: () => React.createElement('div', { className: "h-64 bg-gray-100 animate-pulse rounded-lg" })
});

const BlogBlock = dynamic(() => import('@/components/blocks/blog/BlogBlock'), {
  loading: () => React.createElement('div', { className: "h-64 bg-gray-100 animate-pulse rounded-lg" })
});

const FooterBlock = dynamic(() => import('@/components/blocks/footer/FooterBlock'), {
  loading: () => React.createElement('div', { className: "h-64 bg-gray-100 animate-pulse rounded-lg" })
});

// Component categories for organization
export type ComponentCategory = 
  | 'layout' 
  | 'content' 
  | 'interaction' 
  | 'marketing' 
  | 'navigation';

// Component registry with metadata and schemas
export const ComponentRegistry = {
  hero: {
    component: HeroBlock,
    icon: LayoutIcon,
    category: 'layout' as ComponentCategory,
    name: 'Hero Section',
    description: 'Main landing section with headline and call-to-action',
    defaultProps: {
      title: 'Welcome to my personal brand',
      subtitle: 'I help businesses grow through strategic solutions',
      backgroundType: 'gradient',
      backgroundImage: '',
      ctaText: 'Get Started',
      ctaLink: '#contact',
      alignment: 'center',
      showSocialLinks: true,
      socialLinks: {
        twitter: '',
        linkedin: '',
        github: '',
        email: ''
      }
    },
    schema: HeroPropsSchema,
    preview: '/previews/hero.png'
  },

  about: {
    component: AboutBlock,
    icon: UserIcon,
    category: 'content' as ComponentCategory,
    name: 'About Section',
    description: 'Personal introduction and background information',
    defaultProps: {
      title: 'About Me',
      content: 'I am a passionate professional with expertise in...',
      image: '',
      showSkills: true,
      skills: [
        { name: 'JavaScript', level: 90 },
        { name: 'React', level: 85 },
        { name: 'Node.js', level: 80 }
      ],
      layout: 'left-image',
      showContactInfo: true,
      contactInfo: {
        email: '',
        phone: '',
        location: ''
      }
    },
    schema: AboutPropsSchema,
    preview: '/previews/about.png'
  },

  portfolio: {
    component: PortfolioBlock,
    icon: BriefcaseIcon,
    category: 'content' as ComponentCategory,
    name: 'Portfolio Section',
    description: 'Showcase your work and projects',
    defaultProps: {
      title: 'My Work',
      subtitle: 'Featured projects and case studies',
      projects: [
        {
          id: '1',
          title: 'Project One',
          description: 'A brief description of the project',
          image: '',
          link: '',
          tags: ['React', 'TypeScript']
        }
      ],
      layout: 'grid',
      showFilters: true,
      filters: ['All', 'Web', 'Mobile', 'Design'],
      itemsPerPage: 6
    },
    schema: PortfolioPropsSchema,
    preview: '/previews/portfolio.png'
  },

  contact: {
    component: ContactBlock,
    icon: MessageSquareIcon,
    category: 'interaction' as ComponentCategory,
    name: 'Contact Section',
    description: 'Contact form and contact information',
    defaultProps: {
      title: 'Get In Touch',
      subtitle: 'Let\'s discuss your next project',
      showForm: true,
      formFields: ['name', 'email', 'message'],
      contactInfo: {
        email: '',
        phone: '',
        address: '',
        socialLinks: {
          twitter: '',
          linkedin: '',
          github: ''
        }
      },
      layout: 'split',
      submitButtonText: 'Send Message'
    },
    schema: ContactPropsSchema,
    preview: '/previews/contact.png'
  },

  testimonial: {
    component: TestimonialBlock,
    icon: StarIcon,
    category: 'marketing' as ComponentCategory,
    name: 'Testimonials',
    description: 'Client testimonials and reviews',
    defaultProps: {
      title: 'What People Say',
      subtitle: 'Testimonials from satisfied clients',
      testimonials: [
        {
          id: '1',
          name: 'John Doe',
          role: 'CEO, Company Inc.',
          content: 'Amazing work and great communication throughout the project.',
          avatar: '',
          rating: 5
        }
      ],
      layout: 'carousel',
      showRating: true,
      autoPlay: true,
      interval: 5000
    },
    schema: TestimonialPropsSchema,
    preview: '/previews/testimonial.png'
  },

  pricing: {
    component: PricingBlock,
    icon: DollarSignIcon,
    category: 'marketing' as ComponentCategory,
    name: 'Pricing Plans',
    description: 'Service pricing and packages',
    defaultProps: {
      title: 'Pricing Plans',
      subtitle: 'Choose the plan that fits your needs',
      plans: [
        {
          id: '1',
          name: 'Basic',
          price: 99,
          period: 'month',
          features: ['Feature 1', 'Feature 2', 'Feature 3'],
          isPopular: false,
          ctaText: 'Get Started'
        }
      ],
      layout: 'cards',
      showCurrency: true,
      currency: 'USD',
      showPeriod: true
    },
    schema: PricingPropsSchema,
    preview: '/previews/pricing.png'
  },

  blog: {
    component: BlogBlock,
    icon: FileTextIcon,
    category: 'content' as ComponentCategory,
    name: 'Blog Section',
    description: 'Latest articles and blog posts',
    defaultProps: {
      title: 'Latest Articles',
      subtitle: 'Insights and updates from my blog',
      posts: [
        {
          id: '1',
          title: 'Sample Blog Post',
          excerpt: 'This is a sample blog post excerpt...',
          image: '',
          date: new Date().toISOString(),
          author: 'Your Name',
          readTime: '5 min read'
        }
      ],
      layout: 'grid',
      showAuthor: true,
      showDate: true,
      showReadTime: true,
      itemsPerPage: 6
    },
    schema: BlogPropsSchema,
    preview: '/previews/blog.png'
  },

  footer: {
    component: FooterBlock,
    icon: LayoutIcon,
    category: 'navigation' as ComponentCategory,
    name: 'Footer',
    description: 'Site footer with links and information',
    defaultProps: {
      showLogo: true,
      logo: '',
      companyName: 'Your Company',
      description: 'Brief company description',
      links: {
        company: [
          { name: 'About', url: '#about' },
          { name: 'Contact', url: '#contact' }
        ],
        services: [
          { name: 'Web Design', url: '#services' },
          { name: 'Development', url: '#services' }
        ]
      },
      socialLinks: {
        twitter: '',
        linkedin: '',
        github: '',
        instagram: ''
      },
      showNewsletter: true,
      newsletterText: 'Subscribe to our newsletter',
      copyright: '© 2025 Your Company. All rights reserved.'
    },
    schema: FooterPropsSchema,
    preview: '/previews/footer.png'
  }
} as const;

// Type-safe component type
export type ComponentType = keyof typeof ComponentRegistry;

// Type-safe component props
export type ComponentProps<T extends ComponentType> = 
  z.infer<typeof ComponentRegistry[T]['schema']>;

// Utility functions for component registry
export const getComponentByType = (type: ComponentType) => {
  return ComponentRegistry[type];
};

export const getComponentsByCategory = (category: ComponentCategory) => {
  return Object.entries(ComponentRegistry)
    .filter(([_, config]) => config.category === category)
    .reduce((acc, [type, config]) => {
      acc[type as ComponentType] = config;
      return acc;
    }, {} as Partial<typeof ComponentRegistry>);
};

export const getAllComponents = () => {
  return ComponentRegistry;
};

export const getComponentCategories = (): ComponentCategory[] => {
  const categories = new Set<ComponentCategory>();
  Object.values(ComponentRegistry).forEach(config => {
    categories.add(config.category);
  });
  return Array.from(categories);
};

// Component validation utilities
export const validateComponentProps = <T extends ComponentType>(
  type: T, 
  props: any
): ComponentProps<T> => {
  const component = ComponentRegistry[type];
  return component.schema.parse(props);
};

export const getDefaultProps = <T extends ComponentType>(type: T): ComponentProps<T> => {
  const component = ComponentRegistry[type];
  return component.defaultProps as ComponentProps<T>;
}; 