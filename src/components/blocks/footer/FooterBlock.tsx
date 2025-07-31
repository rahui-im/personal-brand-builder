/**
 * File name: FooterBlock.tsx
 * Purpose: Footer section component for personal brand landing pages
 * Function Summary:
 * 1. Render footer section with links, social media, and company info
 * 2. Support different layouts and link organization
 * 3. Handle newsletter signup and contact information
 * 4. Integrate copyright and legal links
 * 
 * Author: AI Assistant
 * Version: 1.0.0
 * Created: 2025-01-31
 * Last modified: 2025-01-31 (initial implementation)
 */

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { FooterProps, defaultFooterProps } from './footer.schema';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { 
  Twitter, 
  Linkedin, 
  Github, 
  Instagram, 
  Facebook, 
  Youtube, 
  Mail,
  Send
} from 'lucide-react';

// 소셜 미디어 아이콘 매핑
const socialIcons = {
  twitter: Twitter,
  linkedin: Linkedin,
  github: Github,
  instagram: Instagram,
  facebook: Facebook,
  youtube: Youtube,
  email: Mail
};

// 링크 섹션 컴포넌트
interface LinkSectionProps {
  title: string;
  links: Array<{ name: string; url: string }>;
}

const LinkSection: React.FC<LinkSectionProps> = ({ title, links }) => (
  <div>
    <h3 className="text-sm font-semibold text-gray-900 mb-3">{title}</h3>
    <ul className="space-y-2">
      {links.map((link, index) => (
        <li key={index}>
          <a
            href={link.url}
            className="text-sm text-gray-600 hover:text-gray-900 transition-colors"
          >
            {link.name}
          </a>
        </li>
      ))}
    </ul>
  </div>
);

// 뉴스레터 구독 컴포넌트
interface NewsletterProps {
  text: string;
  placeholder: string;
  buttonText: string;
  onSubmit: (email: string) => void;
}

const Newsletter: React.FC<NewsletterProps> = ({ text, placeholder, buttonText, onSubmit }) => {
  const [email, setEmail] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email.trim()) {
      onSubmit(email);
      setEmail('');
    }
  };

  return (
    <div>
      <h3 className="text-sm font-semibold text-gray-900 mb-3">Newsletter</h3>
      <p className="text-sm text-gray-600 mb-4">{text}</p>
      <form onSubmit={handleSubmit} className="flex space-x-2">
        <Input
          type="email"
          placeholder={placeholder}
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="flex-1"
        />
        <Button type="submit" size="sm">
          <Send className="w-4 h-4" />
        </Button>
      </form>
    </div>
  );
};

// 메인 FooterBlock 컴포넌트
export const FooterBlock: React.FC<{ props?: Partial<FooterProps> }> = ({ props = {} }) => {
  // 기본값과 병합
  const mergedProps = { ...defaultFooterProps, ...props };
  const {
    showLogo,
    logo,
    companyName,
    description,
    links,
    socialLinks,
    showNewsletter,
    newsletterText,
    newsletterPlaceholder,
    newsletterButtonText,
    copyright,
    enableAnimation,
    animationType,
    animationDuration,
    animationDelay,
    padding,
    customCSS,
    className
  } = mergedProps;

  // 애니메이션 설정
  const animationProps = enableAnimation
    ? {
        initial: { opacity: 0, y: 20 },
        animate: { opacity: 1, y: 0 },
        transition: { duration: animationDuration, delay: animationDelay }
      }
    : {};

  // 컨테이너 스타일
  const containerStyle = {
    paddingTop: `${padding.top}px`,
    paddingBottom: `${padding.bottom}px`,
    paddingLeft: `${padding.left}px`,
    paddingRight: `${padding.right}px`,
  };

  // 뉴스레터 제출 핸들러
  const handleNewsletterSubmit = (email: string) => {
    console.log('Newsletter signup:', email);
    // 실제 API 호출 로직
  };

  return (
    <footer
      className={cn('bg-gray-900 text-white', className)}
      style={containerStyle}
    >
      <div className="max-w-6xl mx-auto">
        <motion.div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8" {...animationProps}>
          {/* 회사 정보 */}
          <div className="lg:col-span-1">
            {showLogo && logo && (
              <img src={logo} alt={companyName} className="h-8 mb-4" />
            )}
            <h3 className="text-lg font-semibold mb-2">{companyName}</h3>
            {description && (
              <p className="text-gray-400 text-sm mb-4">{description}</p>
            )}
            
            {/* 소셜 링크 */}
            {socialLinks && (
              <div className="flex space-x-3">
                {Object.entries(socialLinks).map(([platform, url]) => {
                  if (!url) return null;
                  const Icon = socialIcons[platform as keyof typeof socialIcons];
                  if (!Icon) return null;
                  
                  return (
                    <a
                      key={platform}
                      href={url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-gray-400 hover:text-white transition-colors"
                    >
                      <Icon className="w-5 h-5" />
                    </a>
                  );
                })}
              </div>
            )}
          </div>

          {/* 회사 링크 */}
          {links.company && links.company.length > 0 && (
            <div>
              <LinkSection title="Company" links={links.company} />
            </div>
          )}

          {/* 서비스 링크 */}
          {links.services && links.services.length > 0 && (
            <div>
              <LinkSection title="Services" links={links.services} />
            </div>
          )}

          {/* 뉴스레터 */}
          {showNewsletter && (
            <div>
              <Newsletter
                text={newsletterText}
                placeholder={newsletterPlaceholder}
                buttonText={newsletterButtonText}
                onSubmit={handleNewsletterSubmit}
              />
            </div>
          )}
        </motion.div>

        {/* 저작권 */}
        <motion.div 
          className="border-t border-gray-800 mt-8 pt-8 text-center"
          {...animationProps}
        >
          <p className="text-gray-400 text-sm">
            {copyright}
          </p>
        </motion.div>
      </div>

      {/* 커스텀 CSS */}
      {customCSS && <style dangerouslySetInnerHTML={{ __html: customCSS }} />}
    </footer>
  );
};

export default FooterBlock; 