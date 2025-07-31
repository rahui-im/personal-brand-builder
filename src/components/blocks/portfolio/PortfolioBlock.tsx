/**
 * File name: PortfolioBlock.tsx
 * Purpose: Portfolio section component for personal brand pages
 * Function Summary:
 * 1. Display portfolio projects with customizable layout and styling
 * 2. Support multiple layout options (grid, masonry, list, carousel)
 * 3. Include filtering and pagination functionality
 * 4. Provide responsive design and animations
 * 
 * Author: AI Assistant
 * Version: 1.0.0
 * Created: 2025-01-31
 * Last modified: 2025-01-31 (initial implementation)
 */

import React, { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';
import { PortfolioProps, ProjectSchema } from './portfolio.schema';
import { 
  ExternalLink, 
  Eye,
  Calendar,
  Tag
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
  grid: 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6',
  masonry: 'columns-1 md:columns-2 lg:columns-3 gap-6 space-y-6',
  list: 'space-y-6',
  carousel: 'flex overflow-x-auto space-x-6 pb-4'
};

interface PortfolioBlockProps extends PortfolioProps {
  className?: string;
}

export const PortfolioBlock: React.FC<PortfolioBlockProps> = ({
  title,
  subtitle,
  projects = [],
  layout = 'grid',
  showFilters = true,
  filters = ['All', 'Web', 'Mobile', 'Design'],
  itemsPerPage = 6,
  showProjectImages = true,
  showProjectDescriptions = true,
  showProjectTags = true,
  showProjectLinks = true,
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
  const [activeFilter, setActiveFilter] = useState('All');
  const [currentPage, setCurrentPage] = useState(1);

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

  // Filter projects based on active filter
  const filteredProjects = useMemo(() => {
    if (activeFilter === 'All') {
      return projects;
    }
    return projects.filter(project => 
      project.tags.some(tag => tag.toLowerCase() === activeFilter.toLowerCase())
    );
  }, [projects, activeFilter]);

  // Paginate projects
  const paginatedProjects = useMemo(() => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    return filteredProjects.slice(startIndex, startIndex + itemsPerPage);
  }, [filteredProjects, currentPage, itemsPerPage]);

  // Project card component
  const ProjectCard: React.FC<{ project: any; index: number }> = ({ project, index }) => (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: animationDelay + (index * 0.1) }}
      className={cn(
        "group relative overflow-hidden rounded-lg shadow-lg hover:shadow-xl transition-all duration-300",
        layout === 'masonry' && "break-inside-avoid mb-6",
        layout === 'carousel' && "flex-shrink-0 w-80"
      )}
    >
      {/* Project Image */}
      {showProjectImages && project.image && (
        <div className="relative overflow-hidden aspect-video">
          <img
            src={project.image}
            alt={project.title}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
          />
          <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        </div>
      )}

      {/* Project Content */}
      <div className="p-6 bg-white">
        {/* Project Title */}
        <h3 className="text-xl font-semibold mb-2 group-hover:text-blue-600 transition-colors duration-200">
          {project.title}
        </h3>

        {/* Project Description */}
        {showProjectDescriptions && project.description && (
          <p className="text-gray-600 mb-4 line-clamp-3">
            {project.description}
          </p>
        )}

        {/* Project Meta */}
        <div className="space-y-2">
          {/* Date */}
          {project.date && (
            <div className="flex items-center text-sm text-gray-500">
              <Calendar className="w-4 h-4 mr-2" />
              {project.date}
            </div>
          )}

          {/* Tags */}
          {showProjectTags && project.tags && project.tags.length > 0 && (
            <div className="flex items-center flex-wrap gap-2">
              <Tag className="w-4 h-4 text-gray-500" />
              {project.tags.map((tag: string, tagIndex: number) => (
                <span
                  key={tagIndex}
                  className="px-2 py-1 text-xs bg-gray-100 text-gray-700 rounded-full"
                >
                  {tag}
                </span>
              ))}
            </div>
          )}
        </div>

        {/* Project Link */}
        {showProjectLinks && project.link && (
          <div className="mt-4">
            <a
              href={project.link}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center text-blue-600 hover:text-blue-700 font-medium transition-colors duration-200"
            >
              <ExternalLink className="w-4 h-4 mr-1" />
              View Project
            </a>
          </div>
        )}
      </div>
    </motion.div>
  );

  // Filter buttons component
  const renderFilters = () => {
    if (!showFilters) return null;

    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: animationDelay + 0.2 }}
        className="flex flex-wrap justify-center gap-2 mb-8"
      >
        {filters.map((filter) => (
          <button
            key={filter}
            onClick={() => {
              setActiveFilter(filter);
              setCurrentPage(1);
            }}
            className={cn(
              "px-4 py-2 rounded-full text-sm font-medium transition-all duration-200",
              activeFilter === filter
                ? "bg-blue-600 text-white"
                : "bg-gray-100 text-gray-700 hover:bg-gray-200"
            )}
          >
            {filter}
          </button>
        ))}
      </motion.div>
    );
  };

  // Pagination component
  const renderPagination = () => {
    const totalPages = Math.ceil(filteredProjects.length / itemsPerPage);
    if (totalPages <= 1) return null;

    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: animationDelay + 0.4 }}
        className="flex justify-center items-center space-x-2 mt-8"
      >
        <button
          onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
          disabled={currentPage === 1}
          className="px-3 py-2 rounded-md bg-gray-100 text-gray-700 hover:bg-gray-200 disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-200"
        >
          Previous
        </button>
        
        <span className="px-4 py-2 text-gray-600">
          Page {currentPage} of {totalPages}
        </span>
        
        <button
          onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
          disabled={currentPage === totalPages}
          className="px-3 py-2 rounded-md bg-gray-100 text-gray-700 hover:bg-gray-200 disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-200"
        >
          Next
        </button>
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
      <div className="container mx-auto max-w-7xl">
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

        {/* Filters */}
        {renderFilters()}

        {/* Projects Grid */}
        <div className={cn(
          layoutComponents[layout],
          layout === 'masonry' && "w-full"
        )}>
          {paginatedProjects.map((project, index) => (
            <ProjectCard
              key={project.id}
              project={project}
              index={index}
            />
          ))}
        </div>

        {/* Empty State */}
        {paginatedProjects.length === 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-12"
          >
            <Eye className="w-16 h-16 mx-auto text-gray-400 mb-4" />
            <p className="text-gray-500 text-lg">
              No projects found for the selected filter.
            </p>
          </motion.div>
        )}

        {/* Pagination */}
        {renderPagination()}
      </div>

      {/* Custom CSS */}
      {customCSS && (
        <style dangerouslySetInnerHTML={{ __html: customCSS }} />
      )}
    </motion.section>
  );
}; 