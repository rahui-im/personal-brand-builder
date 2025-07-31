/**
 * File name: ContactBlock.tsx
 * Purpose: Contact section component for personal brand pages
 * Function Summary:
 * 1. Display contact form and information with customizable layout
 * 2. Support multiple layout options (split, centered, form-only, info-only)
 * 3. Include form validation and submission handling
 * 4. Provide responsive design and animations
 * 
 * Author: AI Assistant
 * Version: 1.0.0
 * Created: 2025-01-31
 * Last modified: 2025-01-31 (initial implementation)
 */

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';
import { ContactProps } from './contact.schema';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { 
  Mail, 
  Phone, 
  MapPin,
  Twitter,
  Linkedin,
  Github,
  Instagram,
  Send,
  CheckCircle
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

// Layout component mappings
const layoutComponents = {
  split: 'grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12',
  centered: 'max-w-2xl mx-auto',
  'form-only': 'max-w-2xl mx-auto',
  'info-only': 'max-w-2xl mx-auto'
};

// Form field configurations
const formFieldConfigs = {
  name: {
    label: 'Name',
    type: 'text',
    placeholder: 'Your name',
    required: true
  },
  email: {
    label: 'Email',
    type: 'email',
    placeholder: 'your.email@example.com',
    required: true
  },
  phone: {
    label: 'Phone',
    type: 'tel',
    placeholder: 'Your phone number',
    required: false
  },
  subject: {
    label: 'Subject',
    type: 'text',
    placeholder: 'What is this about?',
    required: true
  },
  company: {
    label: 'Company',
    type: 'text',
    placeholder: 'Your company',
    required: false
  },
  message: {
    label: 'Message',
    type: 'textarea',
    placeholder: 'Your message...',
    required: true
  }
};

interface ContactBlockProps extends ContactProps {
  className?: string;
}

export const ContactBlock: React.FC<ContactBlockProps> = ({
  title,
  subtitle,
  showForm = true,
  formFields = ['name', 'email', 'message'],
  submitButtonText = 'Send Message',
  formTitle,
  contactInfo = {},
  showContactInfo = true,
  contactInfoTitle,
  layout = 'split',
  titleFontSize = '3xl',
  subtitleFontSize = 'xl',
  titleFontWeight = 'bold',
  subtitleFontWeight = 'normal',
  titleColor = '#1f2937',
  subtitleColor = '#6b7280',
  padding = { top: 80, bottom: 80, left: 20, right: 20 },
  enableAnimation = true,
  animationType = 'fadeIn',
  animationDuration = 0.5,
  animationDelay = 0,
  mobileTitleFontSize = '2xl',
  mobileSubtitleFontSize = 'lg',
  customCSS,
  className
}) => {
  const [formData, setFormData] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

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

  // Handle form input changes
  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  // Handle form submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      // Simulate form submission
      await new Promise(resolve => setTimeout(resolve, 1000));
      setIsSubmitted(true);
      setFormData({});
    } catch (error) {
      console.error('Form submission error:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  // Contact info component
  const renderContactInfo = () => {
    if (!showContactInfo) return null;

    const activeContactInfo = Object.entries(contactInfo).filter(([key, value]) => {
      if (key === 'socialLinks') return false;
      return value && value.trim() !== '';
    });

    const activeSocialLinks = Object.entries(contactInfo.socialLinks || {}).filter(([_, url]) => url);

    if (activeContactInfo.length === 0 && activeSocialLinks.length === 0) return null;

    const contactIcons = {
      email: Mail,
      phone: Phone,
      address: MapPin
    };

    const socialIcons = {
      twitter: Twitter,
      linkedin: Linkedin,
      github: Github,
      instagram: Instagram
    };

    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: animationDelay + 0.3 }}
        className="space-y-6"
      >
        {contactInfoTitle && (
          <h3 className="text-xl font-semibold" style={{ color: titleColor }}>
            {contactInfoTitle}
          </h3>
        )}

        {/* Contact Details */}
        {activeContactInfo.length > 0 && (
          <div className="space-y-4">
            {activeContactInfo.map(([key, value]) => {
              const Icon = contactIcons[key as keyof typeof contactIcons];
              if (!Icon) return null;

              return (
                <div key={key} className="flex items-start space-x-3">
                  <Icon className="w-5 h-5 text-gray-500 mt-0.5" />
                  <div>
                    <p className="font-medium text-gray-900 capitalize">{key}</p>
                    <p className="text-gray-600">{value}</p>
                  </div>
                </div>
              );
            })}
          </div>
        )}

        {/* Social Links */}
        {activeSocialLinks.length > 0 && (
          <div className="space-y-4">
            <h4 className="font-semibold text-gray-900">Follow Me</h4>
            <div className="flex space-x-4">
              {activeSocialLinks.map(([platform, url]) => {
                const Icon = socialIcons[platform as keyof typeof socialIcons];
                if (!Icon) return null;

                return (
                  <a
                    key={platform}
                    href={url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-2 rounded-full bg-gray-100 hover:bg-gray-200 transition-colors duration-200"
                  >
                    <Icon className="w-5 h-5 text-gray-600" />
                  </a>
                );
              })}
            </div>
          </div>
        )}
      </motion.div>
    );
  };

  // Contact form component
  const renderContactForm = () => {
    if (!showForm) return null;

    if (isSubmitted) {
      return (
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          className="text-center py-8"
        >
          <CheckCircle className="w-16 h-16 mx-auto text-green-500 mb-4" />
          <h3 className="text-xl font-semibold mb-2">Message Sent!</h3>
          <p className="text-gray-600 mb-4">
            Thank you for your message. I'll get back to you soon.
          </p>
          <Button
            onClick={() => setIsSubmitted(false)}
            variant="outline"
          >
            Send Another Message
          </Button>
        </motion.div>
      );
    }

    return (
      <motion.form
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: animationDelay + 0.4 }}
        onSubmit={handleSubmit}
        className="space-y-6"
      >
        {formTitle && (
          <h3 className="text-xl font-semibold" style={{ color: titleColor }}>
            {formTitle}
          </h3>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {formFields.map((field) => {
            const config = formFieldConfigs[field];
            if (!config) return null;

            if (field === 'message') {
              return (
                <div key={field} className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    {config.label}
                    {config.required && <span className="text-red-500 ml-1">*</span>}
                  </label>
                  <Textarea
                    placeholder={config.placeholder}
                    value={formData[field] || ''}
                    onChange={(e) => handleInputChange(field, e.target.value)}
                    required={config.required}
                    rows={4}
                    className="w-full"
                  />
                </div>
              );
            }

            return (
              <div key={field}>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  {config.label}
                  {config.required && <span className="text-red-500 ml-1">*</span>}
                </label>
                <Input
                  type={config.type}
                  placeholder={config.placeholder}
                  value={formData[field] || ''}
                  onChange={(e) => handleInputChange(field, e.target.value)}
                  required={config.required}
                  className="w-full"
                />
              </div>
            );
          })}
        </div>

        <Button
          type="submit"
          disabled={isSubmitting}
          className="w-full md:w-auto"
        >
          {isSubmitting ? (
            <>
              <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2" />
              Sending...
            </>
          ) : (
            <>
              <Send className="w-4 h-4 mr-2" />
              {submitButtonText}
            </>
          )}
        </Button>
      </motion.form>
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
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: animationDelay + 0.1 }}
          className="text-center mb-12"
        >
          <h2
            className={cn(
              "font-bold leading-tight mb-4",
              fontSizeClasses[titleFontSize],
              fontWeightClasses[titleFontWeight],
              "md:text-3xl lg:text-4xl",
              fontSizeClasses[mobileTitleFontSize]
            )}
            style={{ color: titleColor }}
          >
            {title}
          </h2>
          
          {subtitle && (
            <p
              className={cn(
                "max-w-2xl mx-auto",
                fontSizeClasses[subtitleFontSize],
                fontWeightClasses[subtitleFontWeight],
                "md:text-xl",
                fontSizeClasses[mobileSubtitleFontSize]
              )}
              style={{ color: subtitleColor }}
            >
              {subtitle}
            </p>
          )}
        </motion.div>

        {/* Content */}
        <div className={cn(
          layoutComponents[layout]
        )}>
          {/* Contact Info */}
          {layout === 'split' && renderContactInfo()}
          
          {/* Contact Form */}
          {renderContactForm()}
          
          {/* Contact Info (for other layouts) */}
          {layout !== 'split' && renderContactInfo()}
        </div>
      </div>

      {/* Custom CSS */}
      {customCSS && (
        <style dangerouslySetInnerHTML={{ __html: customCSS }} />
      )}
    </motion.section>
  );
}; 