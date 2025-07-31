/**
 * File name: HeroBlock.tsx
 * Purpose: Hero section component for personal brand pages
 * Function Summary:
 * 1. Display hero content with customizable styling
 * 2. Support multiple background types (gradient, image, video)
 * 3. Include social links and call-to-action buttons
 * 4. Provide responsive design and animations
 * 
 * Author: AI Assistant
 * Version: 1.0.0
 * Created: 2025-01-31
 * Last modified: 2025-01-31 (initial implementation)
 */

import React from 'react';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { HeroProps } from './hero.schema';
import { 
  Twitter, 
  Linkedin, 
  Github, 
  Mail, 
  Instagram, 
  Facebook, 
  Youtube, 
  Globe 
} from 'lucide-react';

// Social media icons mapping
const socialIcons = {
  twitter: Twitter,
  linkedin: Linkedin,
  github: Github,
  email: Mail,
  instagram: Instagram,
  facebook: Facebook,
  youtube: Youtube,
  website: Globe
};

// Height classes mapping
const heightClasses = {
  small: 'min-h-[400px]',
  medium: 'min-h-[600px]',
  large: 'min-h-[800px]',
  full: 'min-h-screen'
};

// Font size classes mapping
const fontSizeClasses = {
  sm: 'text-sm',
  base: 'text-base',
  lg: 'text-lg',
  xl: 'text-xl',
  '2xl': 'text-2xl',
  '3xl': 'text-3xl',
  '4xl': 'text-4xl',
  '5xl': 'text-5xl'
};

// Font weight classes mapping
const fontWeightClasses = {
  normal: 'font-normal',
  medium: 'font-medium',
  semibold: 'font-semibold',
  bold: 'font-bold'
};

// CTA button variant mapping
const ctaButtonVariants = {
  primary: 'default',
  secondary: 'secondary',
  outline: 'outline',
  ghost: 'ghost'
} as const;

interface HeroBlockProps extends HeroProps {
  className?: string;
}

export const HeroBlock: React.FC<HeroBlockProps> = ({
  title,
  subtitle,
  description,
  backgroundType = 'gradient',
  backgroundImage,
  backgroundColor,
  gradientColors,
  ctaText,
  ctaLink,
  ctaStyle = 'primary',
  showCTA = true,
  alignment = 'center',
  height = 'medium',
  padding = { top: 80, bottom: 80, left: 20, right: 20 },
  showSocialLinks = false,
  socialLinks = {},
  socialLinksStyle = 'icons',
  titleFontSize = '4xl',
  subtitleFontSize = 'xl',
  titleFontWeight = 'bold',
  subtitleFontWeight = 'normal',
  titleColor = '#1f2937',
  subtitleColor = '#6b7280',
  enableAnimation = true,
  animationType = 'fadeIn',
  animationDuration = 0.5,
  animationDelay = 0,
  mobileTitleFontSize = '2xl',
  mobileSubtitleFontSize = 'lg',
  customCSS,
  className
}) => {
  // Animation variants
  const animationVariants = {
    fadeIn: {
      initial: { opacity: 0 },
      animate: { opacity: 1 },
      transition: { duration: animationDuration, delay: animationDelay }
    },
    slideIn: {
      initial: { opacity: 0, y: 50 },
      animate: { opacity: 1, y: 0 },
      transition: { duration: animationDuration, delay: animationDelay }
    },
    bounce: {
      initial: { opacity: 0, scale: 0.8 },
      animate: { opacity: 1, scale: 1 },
      transition: { 
        duration: animationDuration, 
        delay: animationDelay,
        type: 'spring',
        stiffness: 200
      }
    },
    none: {
      initial: { opacity: 1 },
      animate: { opacity: 1 }
    }
  };

  // Background styles
  const getBackgroundStyle = () => {
    switch (backgroundType) {
      case 'solid':
        return backgroundColor ? { backgroundColor } : {};
      case 'gradient':
        if (gradientColors) {
          return {
            background: `linear-gradient(135deg, ${gradientColors.from} 0%, ${gradientColors.to} 100%)`
          };
        }
        return {
          background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)'
        };
      case 'image':
        return backgroundImage ? {
          backgroundImage: `url(${backgroundImage})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat'
        } : {};
      default:
        return {};
    }
  };

  // Alignment classes
  const alignmentClasses = {
    left: 'text-left items-start',
    center: 'text-center items-center',
    right: 'text-right items-end'
  };

  // Social links component
  const renderSocialLinks = () => {
    if (!showSocialLinks) return null;

    const activeLinks = Object.entries(socialLinks).filter(([_, url]) => url);
    
    if (activeLinks.length === 0) return null;

    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: animationDelay + 0.6 }}
        className="flex items-center justify-center space-x-4 mt-8"
      >
        {activeLinks.map(([platform, url]) => {
          const Icon = socialIcons[platform as keyof typeof socialIcons];
          if (!Icon) return null;

          return (
            <a
              key={platform}
              href={url}
              target="_blank"
              rel="noopener noreferrer"
              className={cn(
                "transition-colors duration-200 hover:opacity-80",
                socialLinksStyle === 'icons' && "p-2 rounded-full bg-white/10 backdrop-blur-sm hover:bg-white/20",
                socialLinksStyle === 'text' && "text-sm underline hover:no-underline",
                socialLinksStyle === 'buttons' && "px-4 py-2 rounded-md bg-white/10 backdrop-blur-sm hover:bg-white/20"
              )}
            >
              <Icon className="w-5 h-5" />
            </a>
          );
        })}
      </motion.div>
    );
  };

  return (
    <motion.section
      className={cn(
        "relative flex items-center justify-center",
        heightClasses[height],
        alignmentClasses[alignment],
        className
      )}
      style={{
        ...getBackgroundStyle(),
        paddingTop: `${padding.top}px`,
        paddingBottom: `${padding.bottom}px`,
        paddingLeft: `${padding.left}px`,
        paddingRight: `${padding.right}px`
      }}
      initial={enableAnimation ? animationVariants[animationType].initial : undefined}
      animate={enableAnimation ? animationVariants[animationType].animate : undefined}
      transition={enableAnimation ? animationVariants[animationType].transition : undefined}
    >
      {/* Background overlay for better text readability */}
      {backgroundType === 'image' && (
        <div className="absolute inset-0 bg-black/20" />
      )}

      <div className="relative z-10 max-w-4xl mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: animationDelay + 0.2 }}
          className="space-y-6"
        >
          {/* Title */}
          <motion.h1
            className={cn(
              "font-bold leading-tight",
              fontSizeClasses[titleFontSize],
              fontWeightClasses[titleFontWeight],
              "md:text-4xl lg:text-5xl xl:text-6xl",
              fontSizeClasses[mobileTitleFontSize],
              "text-white"
            )}
            style={{ color: titleColor }}
          >
            {title}
          </motion.h1>

          {/* Subtitle */}
          {subtitle && (
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: animationDelay + 0.3 }}
              className={cn(
                "max-w-2xl",
                fontSizeClasses[subtitleFontSize],
                fontWeightClasses[subtitleFontWeight],
                "md:text-xl lg:text-2xl",
                fontSizeClasses[mobileSubtitleFontSize],
                "text-white/90"
              )}
              style={{ color: subtitleColor }}
            >
              {subtitle}
            </motion.p>
          )}

          {/* Description */}
          {description && (
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: animationDelay + 0.4 }}
              className="text-lg text-white/80 max-w-3xl"
            >
              {description}
            </motion.p>
          )}

          {/* Call to Action */}
          {showCTA && ctaText && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: animationDelay + 0.5 }}
              className="flex flex-col sm:flex-row gap-4 justify-center items-center"
            >
              <Button
                variant={ctaButtonVariants[ctaStyle]}
                size="lg"
                className="px-8 py-3 text-lg"
                asChild
              >
                <a href={ctaLink || '#contact'}>
                  {ctaText}
                </a>
              </Button>
            </motion.div>
          )}

          {/* Social Links */}
          {renderSocialLinks()}
        </motion.div>
      </div>

      {/* Custom CSS */}
      {customCSS && (
        <style dangerouslySetInnerHTML={{ __html: customCSS }} />
      )}
    </motion.section>
  );
}; 