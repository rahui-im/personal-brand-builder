/**
 * File name: pricing.schema.ts
 * Purpose: Zod schema for Pricing component validation
 * Function Summary:
 * 1. Define pricing component props structure
 * 2. Provide type validation for pricing plans
 * 3. Enable runtime type checking
 * 
 * Author: Personal Brand Builder Team
 * Version: 1.0.0
 * Created: 2025-07-31
 * Last modified: 2025-07-31 (pricing schema implementation)
 */

import { z } from 'zod';

export const PricingPropsSchema = z.object({
  title: z.string().optional(),
  description: z.string().optional(),
  plans: z.array(z.object({
    id: z.string(),
    name: z.string(),
    price: z.string(),
    currency: z.string().optional(),
    period: z.string().optional(),
    description: z.string().optional(),
    features: z.array(z.string()).optional(),
    isPopular: z.boolean().optional(),
    buttonText: z.string().optional(),
    buttonUrl: z.string().optional(),
    color: z.string().optional()
  })).optional(),
  layout: z.enum(['grid', 'list', 'cards']).optional(),
  showCurrency: z.boolean().optional(),
  showPeriod: z.boolean().optional(),
  backgroundColor: z.string().optional(),
  textColor: z.string().optional()
});

export type PricingProps = z.infer<typeof PricingPropsSchema>;

export const defaultPricingProps: PricingProps = {
  title: 'Pricing Plans',
  description: 'Choose the perfect plan for your needs',
  plans: [
    {
      id: '1',
      name: 'Basic',
      price: '$29',
      currency: '$',
      period: '/month',
      description: 'Perfect for individuals and small projects',
      features: [
        'Up to 5 pages',
        'Basic templates',
        'Email support',
        'Custom domain',
        'SSL certificate'
      ],
      isPopular: false,
      buttonText: 'Get Started',
      buttonUrl: '#',
      color: '#3b82f6'
    },
    {
      id: '2',
      name: 'Pro',
      price: '$79',
      currency: '$',
      period: '/month',
      description: 'Great for growing businesses',
      features: [
        'Up to 20 pages',
        'Premium templates',
        'Priority support',
        'Custom domain',
        'SSL certificate',
        'Analytics',
        'SEO tools'
      ],
      isPopular: true,
      buttonText: 'Get Started',
      buttonUrl: '#',
      color: '#10b981'
    },
    {
      id: '3',
      name: 'Enterprise',
      price: '$199',
      currency: '$',
      period: '/month',
      description: 'For large organizations',
      features: [
        'Unlimited pages',
        'Custom templates',
        '24/7 support',
        'Multiple domains',
        'Advanced analytics',
        'White-label options',
        'API access'
      ],
      isPopular: false,
      buttonText: 'Contact Sales',
      buttonUrl: '#',
      color: '#8b5cf6'
    }
  ],
  layout: 'grid',
  showCurrency: true,
  showPeriod: true,
  backgroundColor: '#f8fafc',
  textColor: '#1f2937'
}; 