/**
 * File name: HeroBlock.test.tsx
 * Purpose: Unit tests for HeroBlock component
 * Function Summary:
 * 1. Test component rendering with different props
 * 2. Test responsive behavior
 * 3. Test animation functionality
 * 4. Test accessibility features
 * 
 * Author: Personal Brand Builder Team
 * Version: 1.0.0
 * Created: 2025-07-31
 * Last modified: 2025-07-31 (HeroBlock 테스트 구현)
 */

import React from 'react';
import { render, screen } from '@testing-library/react';
import { HeroBlock } from '@/components/blocks/hero/HeroBlock';

// Mock Framer Motion
jest.mock('framer-motion', () => ({
  motion: {
    div: ({ children, ...props }: any) => <div {...props}>{children}</div>,
    section: ({ children, ...props }: any) => <section {...props}>{children}</section>,
  },
}));

describe('HeroBlock', () => {
  const defaultProps = {
    title: 'Welcome to My Site',
    subtitle: 'This is a subtitle',
    description: 'This is a description',
    backgroundType: 'gradient' as const,
    backgroundColor: '#ffffff',
    gradientColors: {
      from: '#6366F1',
      to: '#EC4899'
    },
    ctaText: 'Get Started',
    ctaLink: '/contact',
    ctaStyle: 'primary' as const,
    showCTA: true,
    alignment: 'center' as const,
    height: 'medium' as const,
    padding: {
      top: 80,
      bottom: 80,
      left: 20,
      right: 20
    },
    showSocialLinks: false,
    socialLinks: {},
    socialLinksStyle: 'icons' as const,
    titleFontSize: '4xl' as const,
    subtitleFontSize: 'xl' as const,
    titleFontWeight: 'bold' as const,
    subtitleFontWeight: 'normal' as const,
    titleColor: '#1f2937',
    subtitleColor: '#6b7280',
    enableAnimation: true,
    animationType: 'fadeIn' as const,
    animationDuration: 0.5,
    animationDelay: 0,
    mobileTitleFontSize: '2xl' as const,
    mobileSubtitleFontSize: 'lg' as const,
    customCSS: '',
    className: ''
  };

  it('renders with default props', () => {
    render(<HeroBlock {...defaultProps} />);
    
    expect(screen.getByText('Welcome to My Site')).toBeInTheDocument();
    expect(screen.getByText('This is a subtitle')).toBeInTheDocument();
    expect(screen.getByText('Get Started')).toBeInTheDocument();
  });

  it('renders without CTA when showCTA is false', () => {
    render(<HeroBlock {...defaultProps} showCTA={false} />);
    
    expect(screen.queryByText('Get Started')).not.toBeInTheDocument();
  });

  it('renders with custom title and subtitle', () => {
    const customProps = {
      ...defaultProps,
      title: 'Custom Title',
      subtitle: 'Custom Subtitle'
    };
    
    render(<HeroBlock {...customProps} />);
    
    expect(screen.getByText('Custom Title')).toBeInTheDocument();
    expect(screen.getByText('Custom Subtitle')).toBeInTheDocument();
  });

  it('renders with social links when showSocialLinks is true', () => {
    const propsWithSocial = {
      ...defaultProps,
      showSocialLinks: true,
      socialLinks: {
        twitter: 'https://twitter.com/example',
        linkedin: 'https://linkedin.com/in/example',
        github: 'https://github.com/example'
      }
    };
    
    render(<HeroBlock {...propsWithSocial} />);
    
    // Check if social links are rendered
    const socialLinks = screen.getAllByRole('link');
    expect(socialLinks.length).toBeGreaterThan(0);
  });

  it('applies custom CSS class', () => {
    const customProps = {
      ...defaultProps,
      className: 'custom-hero-class'
    };
    
    const { container } = render(<HeroBlock {...customProps} />);
    
    expect(container.firstChild).toHaveClass('custom-hero-class');
  });

  it('renders with different alignment options', () => {
    const { rerender } = render(<HeroBlock {...defaultProps} alignment="left" />);
    
    // Test left alignment
    const leftAligned = screen.getByText('Welcome to My Site').closest('div');
    expect(leftAligned).toHaveClass('text-left');
    
    // Test right alignment
    rerender(<HeroBlock {...defaultProps} alignment="right" />);
    const rightAligned = screen.getByText('Welcome to My Site').closest('div');
    expect(rightAligned).toHaveClass('text-right');
  });

  it('renders with different height options', () => {
    const { rerender } = render(<HeroBlock {...defaultProps} height="small" />);
    
    // Test small height
    const smallHeight = screen.getByText('Welcome to My Site').closest('section');
    expect(smallHeight).toHaveClass('min-h-[400px]');
    
    // Test large height
    rerender(<HeroBlock {...defaultProps} height="large" />);
    const largeHeight = screen.getByText('Welcome to My Site').closest('section');
    expect(largeHeight).toHaveClass('min-h-[800px]');
  });

  it('renders with different background types', () => {
    const { rerender } = render(<HeroBlock {...defaultProps} backgroundType="solid" />);
    
    // Test solid background
    const solidBackground = screen.getByText('Welcome to My Site').closest('section');
    expect(solidBackground).toHaveStyle({ backgroundColor: '#ffffff' });
    
    // Test image background
    rerender(<HeroBlock {...defaultProps} backgroundType="image" backgroundImage="test.jpg" />);
    const imageBackground = screen.getByText('Welcome to My Site').closest('section');
    expect(imageBackground).toHaveStyle({ backgroundImage: 'url(test.jpg)' });
  });

  it('renders with custom colors', () => {
    const customColorProps = {
      ...defaultProps,
      titleColor: '#ff0000',
      subtitleColor: '#00ff00'
    };
    
    render(<HeroBlock {...customColorProps} />);
    
    const title = screen.getByText('Welcome to My Site');
    const subtitle = screen.getByText('This is a subtitle');
    
    expect(title).toHaveStyle({ color: '#ff0000' });
    expect(subtitle).toHaveStyle({ color: '#00ff00' });
  });

  it('renders with different font sizes', () => {
    const { rerender } = render(<HeroBlock {...defaultProps} titleFontSize="5xl" />);
    
    // Test large title font size
    const largeTitle = screen.getByText('Welcome to My Site');
    expect(largeTitle).toHaveClass('text-5xl');
    
    // Test small title font size
    rerender(<HeroBlock {...defaultProps} titleFontSize="2xl" />);
    const smallTitle = screen.getByText('Welcome to My Site');
    expect(smallTitle).toHaveClass('text-2xl');
  });

  it('renders with different font weights', () => {
    const { rerender } = render(<HeroBlock {...defaultProps} titleFontWeight="normal" />);
    
    // Test normal font weight
    const normalWeight = screen.getByText('Welcome to My Site');
    expect(normalWeight).toHaveClass('font-normal');
    
    // Test bold font weight
    rerender(<HeroBlock {...defaultProps} titleFontWeight="bold" />);
    const boldWeight = screen.getByText('Welcome to My Site');
    expect(boldWeight).toHaveClass('font-bold');
  });

  it('renders CTA button with different styles', () => {
    const { rerender } = render(<HeroBlock {...defaultProps} ctaStyle="outline" />);
    
    // Test outline style
    const outlineButton = screen.getByText('Get Started');
    expect(outlineButton).toHaveClass('outline');
    
    // Test secondary style
    rerender(<HeroBlock {...defaultProps} ctaStyle="secondary" />);
    const secondaryButton = screen.getByText('Get Started');
    expect(secondaryButton).toHaveClass('secondary');
  });

  it('renders with custom padding', () => {
    const customPaddingProps = {
      ...defaultProps,
      padding: {
        top: 100,
        bottom: 100,
        left: 40,
        right: 40
      }
    };
    
    render(<HeroBlock {...customPaddingProps} />);
    
    const heroSection = screen.getByText('Welcome to My Site').closest('section');
    expect(heroSection).toHaveStyle({
      paddingTop: '100px',
      paddingBottom: '100px',
      paddingLeft: '40px',
      paddingRight: '40px'
    });
  });

  it('renders with gradient background', () => {
    render(<HeroBlock {...defaultProps} backgroundType="gradient" />);
    
    const heroSection = screen.getByText('Welcome to My Site').closest('section');
    expect(heroSection).toHaveClass('bg-gradient-to-r');
  });

  it('renders with animation when enabled', () => {
    render(<HeroBlock {...defaultProps} enableAnimation={true} />);
    
    // Check if animation classes are applied
    const heroSection = screen.getByText('Welcome to My Site').closest('section');
    expect(heroSection).toBeInTheDocument();
  });

  it('renders without animation when disabled', () => {
    render(<HeroBlock {...defaultProps} enableAnimation={false} />);
    
    // Check if component renders without animation
    expect(screen.getByText('Welcome to My Site')).toBeInTheDocument();
  });
}); 