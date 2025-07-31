/**
 * File name: TestimonialBlock.tsx
 * Purpose: Testimonial section component for personal brand landing pages
 * Function Summary:
 * 1. Render testimonial section with client reviews and ratings
 * 2. Support carousel and grid layouts
 * 3. Handle auto-play and manual navigation
 * 4. Integrate star ratings and client information
 * 
 * Author: AI Assistant
 * Version: 1.0.0
 * Created: 2025-01-31
 * Last modified: 2025-01-31 (initial implementation)
 */

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { TestimonialProps, defaultTestimonialProps } from './testimonial.schema';
import { cn } from '@/lib/utils';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ChevronLeft, ChevronRight, Star, Quote } from 'lucide-react';

// 별점 컴포넌트
const StarRating: React.FC<{ rating: number; maxRating?: number }> = ({ rating, maxRating = 5 }) => (
  <div className="flex space-x-1">
    {Array.from({ length: maxRating }, (_, i) => (
      <Star
        key={i}
        className={cn(
          'w-4 h-4',
          i < rating ? 'text-yellow-400 fill-current' : 'text-gray-300'
        )}
      />
    ))}
  </div>
);

// 테스티모니얼 카드 컴포넌트
interface TestimonialCardProps {
  testimonial: any;
  isActive: boolean;
  showRating: boolean;
}

const TestimonialCard: React.FC<TestimonialCardProps> = ({ testimonial, isActive, showRating }) => (
  <motion.div
    className={cn(
      'w-full',
      isActive ? 'opacity-100' : 'opacity-0 absolute inset-0'
    )}
    initial={{ opacity: 0, scale: 0.9 }}
    animate={{ opacity: isActive ? 1 : 0, scale: isActive ? 1 : 0.9 }}
    transition={{ duration: 0.3 }}
  >
    <Card className="h-full">
      <CardContent className="p-6 text-center">
        <Quote className="w-8 h-8 text-gray-300 mx-auto mb-4" />
        
        <p className="text-gray-600 mb-6 italic">
          "{testimonial.content}"
        </p>

        <div className="flex items-center justify-center space-x-3">
          {testimonial.avatar && (
            <img
              src={testimonial.avatar}
              alt={testimonial.name}
              className="w-12 h-12 rounded-full object-cover"
            />
          )}
          <div>
            <h4 className="font-semibold text-gray-900">{testimonial.name}</h4>
            <p className="text-sm text-gray-600">{testimonial.role}</p>
            {showRating && testimonial.rating && (
              <div className="mt-1">
                <StarRating rating={testimonial.rating} />
              </div>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  </motion.div>
);

// 메인 TestimonialBlock 컴포넌트
export const TestimonialBlock: React.FC<{ props?: Partial<TestimonialProps> }> = ({ props = {} }) => {
  // 기본값과 병합
  const mergedProps = { ...defaultTestimonialProps, ...props };
  const {
    title,
    subtitle,
    testimonials,
    layout,
    showRating,
    autoPlay,
    interval,
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

  const [currentIndex, setCurrentIndex] = useState(0);

  // 자동 재생
  useEffect(() => {
    if (!autoPlay || layout !== 'carousel') return;

    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % testimonials.length);
    }, interval);

    return () => clearInterval(timer);
  }, [autoPlay, interval, testimonials.length, layout]);

  // 애니메이션 설정
  const animationProps = enableAnimation
    ? {
        initial: { opacity: 0, y: 20 },
        animate: { opacity: 1, y: 0 },
        transition: { duration: animationDuration, delay: animationDelay }
      }
    : {};

  // 레이아웃 클래스
  const layoutClass = layout === 'grid'
    ? 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'
    : layout === 'carousel'
    ? 'relative'
    : 'space-y-6';

  // 컨테이너 스타일
  const containerStyle = {
    paddingTop: `${padding.top}px`,
    paddingBottom: `${padding.bottom}px`,
    paddingLeft: `${padding.left}px`,
    paddingRight: `${padding.right}px`,
  };

  // 네비게이션 핸들러
  const goToPrevious = () => {
    setCurrentIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  const goToNext = () => {
    setCurrentIndex((prev) => (prev + 1) % testimonials.length);
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

        {/* 테스티모니얼 컨텐츠 */}
        <motion.div className={layoutClass} {...animationProps}>
          {layout === 'carousel' ? (
            // 캐러셀 레이아웃
            <div className="relative">
              <div className="relative h-64">
                {testimonials.map((testimonial, index) => (
                  <TestimonialCard
                    key={testimonial.id || index}
                    testimonial={testimonial}
                    isActive={index === currentIndex}
                    showRating={showRating}
                  />
                ))}
              </div>

              {/* 네비게이션 버튼 */}
              <Button
                size="sm"
                variant="outline"
                onClick={goToPrevious}
                className="absolute left-4 top-1/2 transform -translate-y-1/2"
              >
                <ChevronLeft className="w-4 h-4" />
              </Button>
              <Button
                size="sm"
                variant="outline"
                onClick={goToNext}
                className="absolute right-4 top-1/2 transform -translate-y-1/2"
              >
                <ChevronRight className="w-4 h-4" />
              </Button>

              {/* 인디케이터 */}
              <div className="flex justify-center mt-4 space-x-2">
                {testimonials.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentIndex(index)}
                    className={cn(
                      'w-2 h-2 rounded-full transition-colors',
                      index === currentIndex ? 'bg-blue-600' : 'bg-gray-300'
                    )}
                  />
                ))}
              </div>
            </div>
          ) : (
            // 그리드/리스트 레이아웃
            testimonials.map((testimonial, index) => (
              <TestimonialCard
                key={testimonial.id || index}
                testimonial={testimonial}
                isActive={true}
                showRating={showRating}
              />
            ))
          )}
        </motion.div>
      </div>

      {/* 커스텀 CSS */}
      {customCSS && <style dangerouslySetInnerHTML={{ __html: customCSS }} />}
    </section>
  );
};

export default TestimonialBlock; 