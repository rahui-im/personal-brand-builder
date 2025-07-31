/**
 * File name: PricingBlock.tsx
 * Purpose: Pricing section component for personal brand landing pages
 * Function Summary:
 * 1. Render pricing section with plans, features, and pricing options
 * 2. Support different layouts (cards, table, comparison)
 * 3. Handle currency display and billing periods
 * 4. Integrate popular plan highlighting and CTA buttons
 * 
 * Author: AI Assistant
 * Version: 1.0.0
 * Created: 2025-01-31
 * Last modified: 2025-01-31 (initial implementation)
 */

import React from 'react';
import { motion } from 'framer-motion';
import { PricingProps, defaultPricingProps } from './pricing.schema';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Check, X } from 'lucide-react';

// 가격 플랜 카드 컴포넌트
interface PricingCardProps {
  plan: any;
  currency: string;
  showCurrency: boolean;
  showPeriod: boolean;
  isPopular: boolean;
}

const PricingCard: React.FC<PricingCardProps> = ({
  plan,
  currency,
  showCurrency,
  showPeriod,
  isPopular
}) => (
  <motion.div
    className={cn(
      'relative',
      isPopular && 'transform scale-105'
    )}
    whileHover={{ y: -5 }}
    transition={{ duration: 0.2 }}
  >
    {isPopular && (
      <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
        <span className="bg-blue-600 text-white px-3 py-1 rounded-full text-xs font-medium">
          Most Popular
        </span>
      </div>
    )}

    <Card className={cn(
      'h-full',
      isPopular ? 'border-blue-500 shadow-lg' : 'border-gray-200'
    )}>
      <CardHeader className="text-center pb-4">
        <h3 className="text-xl font-semibold text-gray-900">{plan.name}</h3>
        <div className="mt-2">
          <span className="text-3xl font-bold text-gray-900">
            {showCurrency && currency}
            {plan.price}
          </span>
          {showPeriod && plan.period && (
            <span className="text-gray-600 ml-1">/{plan.period}</span>
          )}
        </div>
      </CardHeader>

      <CardContent className="pt-0">
        {/* 플랜 설명 */}
        {plan.description && (
          <p className="text-gray-600 text-sm text-center mb-6">
            {plan.description}
          </p>
        )}

        {/* 기능 목록 */}
        <ul className="space-y-3 mb-6">
          {plan.features.map((feature: any, index: number) => (
            <li key={index} className="flex items-center space-x-3">
              {feature.included ? (
                <Check className="w-4 h-4 text-green-500 flex-shrink-0" />
              ) : (
                <X className="w-4 h-4 text-gray-400 flex-shrink-0" />
              )}
              <span className={cn(
                'text-sm',
                feature.included ? 'text-gray-700' : 'text-gray-400 line-through'
              )}>
                {feature.name}
              </span>
            </li>
          ))}
        </ul>

        {/* CTA 버튼 */}
        <Button
          className={cn(
            'w-full',
            isPopular ? 'bg-blue-600 hover:bg-blue-700' : 'bg-gray-900 hover:bg-gray-800'
          )}
          asChild
        >
          <a href={plan.ctaLink || '#contact'}>
            {plan.ctaText || 'Get Started'}
          </a>
        </Button>
      </CardContent>
    </Card>
  </motion.div>
);

// 메인 PricingBlock 컴포넌트
export const PricingBlock: React.FC<{ props?: Partial<PricingProps> }> = ({ props = {} }) => {
  // 기본값과 병합
  const mergedProps = { ...defaultPricingProps, ...props };
  const {
    title,
    subtitle,
    plans,
    layout,
    showCurrency,
    currency,
    showPeriod,
    titleFontSize,
    subtitleFontSize,
    titleFontWeight,
    subtitleFontWeight,
    titleColor,
    subtitleColor,
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

  // 레이아웃 클래스
  const layoutClass = layout === 'cards'
    ? 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'
    : layout === 'table'
    ? 'space-y-4'
    : 'grid grid-cols-1 md:grid-cols-2 gap-8';

  // 컨테이너 스타일
  const containerStyle = {
    paddingTop: `${padding.top}px`,
    paddingBottom: `${padding.bottom}px`,
    paddingLeft: `${padding.left}px`,
    paddingRight: `${padding.right}px`,
  };

  return (
    <section
      className={cn('relative w-full', className)}
      style={containerStyle}
    >
      <div className="max-w-6xl mx-auto">
        {/* 헤더 */}
        <motion.div className="text-center mb-8" {...animationProps}>
          <h2
            className={cn(
              'mb-2',
              `text-${titleFontSize}`,
              `font-${titleFontWeight}`
            )}
            style={{ color: titleColor }}
          >
            {title}
          </h2>
          {subtitle && (
            <p
              className={cn(
                'text-lg',
                `text-${subtitleFontSize}`,
                `font-${subtitleFontWeight}`
              )}
              style={{ color: subtitleColor }}
            >
              {subtitle}
            </p>
          )}
        </motion.div>

        {/* 가격 플랜 */}
        <motion.div className={layoutClass} {...animationProps}>
          {plans.map((plan, index) => (
            <PricingCard
              key={plan.id || index}
              plan={plan}
              currency={currency}
              showCurrency={showCurrency}
              showPeriod={showPeriod}
              isPopular={plan.isPopular}
            />
          ))}
        </motion.div>

        {/* 추가 정보 */}
        <motion.div className="text-center mt-8" {...animationProps}>
          <p className="text-sm text-gray-600">
            All plans include a 30-day money-back guarantee
          </p>
        </motion.div>
      </div>

      {/* 커스텀 CSS */}
      {customCSS && <style dangerouslySetInnerHTML={{ __html: customCSS }} />}
    </section>
  );
};

export default PricingBlock; 