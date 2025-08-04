/**
 * File name: BlogBlock.tsx
 * Purpose: Blog section component for personal brand landing pages
 * Function Summary:
 * 1. Render blog section with articles, excerpts, and metadata
 * 2. Support different layouts (grid, list, featured)
 * 3. Handle pagination and article filtering
 * 4. Integrate author info, dates, and read time
 * 
 * Author: AI Assistant
 * Version: 1.0.0
 * Created: 2025-01-31
 * Last modified: 2025-01-31 (initial implementation)
 */

import React, { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import { BlogProps, defaultBlogProps } from './blog.schema';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Calendar, Clock, User, ArrowRight } from 'lucide-react';

// 블로그 포스트 카드 컴포넌트
interface BlogPostCardProps {
  post: any;
  layout: string;
  showAuthor: boolean;
  showDate: boolean;
  showReadTime: boolean;
}

const BlogPostCard: React.FC<BlogPostCardProps> = ({
  post,
  layout,
  showAuthor,
  showDate,
  showReadTime
}) => {
  const cardClass = layout === 'grid'
    ? 'bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow'
    : 'bg-white rounded-lg shadow-md p-6';

  return (
    <motion.div
      className={cardClass}
      whileHover={{ y: -5 }}
      transition={{ duration: 0.2 }}
    >
      {/* 포스트 이미지 */}
      {post.image && (
        <div className="relative overflow-hidden">
          <img
            src={post.image}
            alt={post.title}
            className="w-full h-48 object-cover"
          />
        </div>
      )}

      {/* 포스트 정보 */}
      <div className={layout === 'grid' ? 'p-6' : ''}>
        <h3 className="text-lg font-semibold text-gray-900 mb-2 line-clamp-2">
          <a href={post.link || '#'} className="hover:text-blue-600 transition-colors">
            {post.title}
          </a>
        </h3>

        {/* 포스트 메타데이터 */}
        <div className="flex items-center space-x-4 text-sm text-gray-500 mb-3">
          {showDate && post.date && (
            <div className="flex items-center space-x-1">
              <Calendar className="w-3 h-3" />
              <span>{new Date(post.date).toLocaleDateString()}</span>
            </div>
          )}
          {showAuthor && post.author && (
            <div className="flex items-center space-x-1">
              <User className="w-3 h-3" />
              <span>{post.author}</span>
            </div>
          )}
          {showReadTime && post.readTime && (
            <div className="flex items-center space-x-1">
              <Clock className="w-3 h-3" />
              <span>{post.readTime}</span>
            </div>
          )}
        </div>

        {/* 포스트 요약 */}
        {post.excerpt && (
          <p className="text-gray-600 text-sm mb-4 line-clamp-3">
            {post.excerpt}
          </p>
        )}

        {/* 읽기 더보기 링크 */}
        <Button variant="ghost" size="sm" asChild>
          <a href={post.link || '#'} className="flex items-center space-x-1">
            <span>Read More</span>
            <ArrowRight className="w-3 h-3" />
          </a>
        </Button>
      </div>
    </motion.div>
  );
};

// 메인 BlogBlock 컴포넌트
export const BlogBlock: React.FC<{ props?: Partial<BlogProps> }> = ({ props = {} }) => {
  // 기본값과 병합
  const mergedProps = { ...defaultBlogProps, ...props };
  const {
    title,
    subtitle,
    posts,
    layout,
    showAuthor,
    showDate,
    showReadTime,
    itemsPerPage,
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

  const [currentPage, setCurrentPage] = useState(1);

  // 페이지네이션
  const paginatedPosts = useMemo(() => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    return posts.slice(startIndex, startIndex + itemsPerPage);
  }, [posts, currentPage, itemsPerPage]);

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
    : layout === 'list'
    ? 'space-y-6'
    : 'space-y-8';

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

        {/* 블로그 포스트 */}
        <motion.div className={layoutClass} {...animationProps}>
          {paginatedPosts.map((post, index) => (
            <BlogPostCard
              key={post.id || index}
              post={post}
              layout={layout}
              showAuthor={showAuthor}
              showDate={showDate}
              showReadTime={showReadTime}
            />
          ))}
        </motion.div>

        {/* 빈 상태 */}
        {paginatedPosts.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-500">No blog posts found.</p>
          </div>
        )}

        {/* 페이지네이션 */}
        {posts.length > itemsPerPage && (
          <div className="flex justify-center mt-8">
            <div className="flex space-x-2">
              <Button
                size="sm"
                variant="outline"
                onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
                disabled={currentPage === 1}
              >
                Previous
              </Button>
              <span className="flex items-center px-3 text-sm text-gray-600">
                Page {currentPage} of {Math.ceil(posts.length / itemsPerPage)}
              </span>
              <Button
                size="sm"
                variant="outline"
                onClick={() => setCurrentPage(Math.min(Math.ceil(posts.length / itemsPerPage), currentPage + 1))}
                disabled={currentPage >= Math.ceil(posts.length / itemsPerPage)}
              >
                Next
              </Button>
            </div>
          </div>
        )}

        {/* 모든 포스트 보기 버튼 */}
        <motion.div className="text-center mt-8" {...animationProps}>
          <Button variant="outline" asChild>
            <a href="https://heherockrock.blogspot.com" target="_blank" rel="noopener noreferrer">
              View All Posts
            </a>
          </Button>
        </motion.div>
      </div>

      {/* 커스텀 CSS */}
      {customCSS && <style dangerouslySetInnerHTML={{ __html: customCSS }} />}
    </section>
  );
};

export default BlogBlock; 