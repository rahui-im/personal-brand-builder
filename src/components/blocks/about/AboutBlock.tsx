/**
 * File name: AboutBlock.tsx
 * Purpose: About section component for personal brand pages
 * Function Summary:
 * 1. Display about content with customizable layout and styling
 * 2. Support multiple layout options (left-image, right-image, center, split)
 * 3. Include skills display and contact information
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
import { AboutProps } from './about.schema';
import { 
  Mail, 
  Phone, 
  MapPin, 
  Globe,
  Star
} from 'lucide-react';

// Font size classes mapping
const fontSizeClasses = {
  sm: 'text-sm',
  base: 'text-base',
  lg: 'text-lg',
  xl: 'text-xl',
  '2xl': 'text-2xl',
  '3xl': 'text-3xl',
  '4xl': 'text-4xl'
};

// Font weight classes mapping
const fontWeightClasses = {
  normal: 'font-normal',
  medium: 'font-medium',
  semibold: 'font-semibold',
  bold: 'font-bold'
};

// Image style classes
const imageStyleClasses = {
  rounded: 'rounded-lg',
  square: 'rounded-none',
  circle: 'rounded-full'
};

// Layout component mappings
const layoutComponents = {
  'left-image': 'flex-row',
  'right-image': 'flex-row-reverse',
  'center': 'flex-col',
  'split': 'flex-col lg:flex-row'
};

interface AboutBlockProps extends AboutProps {
  className?: string;
}

export const AboutBlock: React.FC<AboutBlockProps> = ({
  title,
  subtitle,
  content,
  image,
  imageAlt,
  imageStyle = 'rounded',
  layout = 'left-image',
  showImage = true,
  showSkills = false,
  skills = [],
  skillsTitle,
  showContactInfo = false,
  contactInfo = {},
  contactInfoTitle,
  titleFontSize = '3xl',
  subtitleFontSize = 'xl',
  contentFontSize = 'base',
  titleFontWeight = 'bold',
  subtitleFontWeight = 'normal',
  contentFontWeight = 'normal',
  titleColor = '#1f2937',
  subtitleColor = '#6b7280',
  contentColor = '#374151',
  padding = { top: 80, bottom: 80, left: 20, right: 20 },
  enableAnimation = true,
  animationType = 'fadeIn',
  animationDuration = 0.5,
  animationDelay = 0,
  mobileTitleFontSize = '2xl',
  mobileSubtitleFontSize = 'lg',
  mobileContentFontSize = 'base',
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

  // Skills component
  const renderSkills = () => {
    if (!showSkills || skills.length === 0) return null;

    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: animationDelay + 0.4 }}
        className="mt-8"
      >
        {skillsTitle && (
          <h3 className="text-xl font-semibold mb-4" style={{ color: titleColor }}>
            {skillsTitle}
          </h3>
        )}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {skills.map((skill, index) => (
            <div key={index} className="space-y-2">
              <div className="flex justify-between items-center">
                <span className="font-medium" style={{ color: contentColor }}>
                  {skill.name}
                </span>
                <span className="text-sm text-gray-500">
                  {skill.level}%
                </span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div
                  className="h-2 rounded-full transition-all duration-300"
                  style={{
                    width: `${skill.level}%`,
                    backgroundColor: skill.color || '#3b82f6'
                  }}
                />
              </div>
            </div>
          ))}
        </div>
      </motion.div>
    );
  };

  // Contact info component
  const renderContactInfo = () => {
    if (!showContactInfo) return null;

    const activeContactInfo = Object.entries(contactInfo).filter(([_, value]) => value);
    
    if (activeContactInfo.length === 0) return null;

    const contactIcons = {
      email: Mail,
      phone: Phone,
      location: MapPin,
      website: Globe
    };

    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: animationDelay + 0.5 }}
        className="mt-8"
      >
        {contactInfoTitle && (
          <h3 className="text-xl font-semibold mb-4" style={{ color: titleColor }}>
            {contactInfoTitle}
          </h3>
        )}
        <div className="space-y-3">
          {activeContactInfo.map(([key, value]) => {
            const Icon = contactIcons[key as keyof typeof contactIcons];
            if (!Icon) return null;

            return (
              <div key={key} className="flex items-center space-x-3">
                <Icon className="w-5 h-5 text-gray-500" />
                <span style={{ color: contentColor }}>
                  {value}
                </span>
              </div>
            );
          })}
        </div>
      </motion.div>
    );
  };

  // Image component
  const renderImage = () => {
    if (!showImage || !image) return null;

    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: animationDelay + 0.3 }}
        className="flex-shrink-0"
      >
        <img
          src={image}
          alt={imageAlt || 'About image'}
          className={cn(
            "w-full h-auto object-cover",
            imageStyleClasses[imageStyle],
            layout === 'center' ? "max-w-md mx-auto" : "max-w-lg"
          )}
        />
      </motion.div>
    );
  };

  return (
    <motion.section
      className={cn(
        "py-16",
        className
      )}
      style={{
        paddingTop: `${padding.top}px`,
        paddingBottom: `${padding.bottom}px`,
        paddingLeft: `${padding.left}px`,
        paddingRight: `${padding.right}px`
      }}
      initial={enableAnimation ? animationVariants[animationType].initial : undefined}
      animate={enableAnimation ? animationVariants[animationType].animate : undefined}
      transition={enableAnimation ? animationVariants[animationType].transition : undefined}
    >
      <div className="container mx-auto max-w-6xl">
        <div className={cn(
          "flex items-start gap-8 lg:gap-12",
          layoutComponents[layout]
        )}>
          {/* Image */}
          {renderImage()}

          {/* Content */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: animationDelay + 0.2 }}
            className="flex-1 space-y-6"
          >
            {/* Title */}
            <motion.h2
              className={cn(
                "font-bold leading-tight",
                fontSizeClasses[titleFontSize],
                fontWeightClasses[titleFontWeight],
                "md:text-3xl lg:text-4xl",
                fontSizeClasses[mobileTitleFontSize]
              )}
              style={{ color: titleColor }}
            >
              {title}
            </motion.h2>

            {/* Subtitle */}
            {subtitle && (
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: animationDelay + 0.3 }}
                className={cn(
                  "leading-relaxed",
                  fontSizeClasses[subtitleFontSize],
                  fontWeightClasses[subtitleFontWeight],
                  "md:text-xl",
                  fontSizeClasses[mobileSubtitleFontSize]
                )}
                style={{ color: subtitleColor }}
              >
                {subtitle}
              </motion.p>
            )}

            {/* Content */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: animationDelay + 0.4 }}
              className={cn(
                "leading-relaxed",
                fontSizeClasses[contentFontSize],
                fontWeightClasses[contentFontWeight],
                fontSizeClasses[mobileContentFontSize]
              )}
              style={{ color: contentColor }}
              dangerouslySetInnerHTML={{ __html: content }}
            />

            {/* Skills */}
            {renderSkills()}

            {/* Contact Info */}
            {renderContactInfo()}
          </motion.div>
        </div>
      </div>

      {/* Custom CSS */}
      {customCSS && (
        <style dangerouslySetInnerHTML={{ __html: customCSS }} />
      )}
    </motion.section>
  );
};