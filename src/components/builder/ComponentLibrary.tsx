/**
 * File name: ComponentLibrary.tsx
 * Purpose: Component library sidebar with drag and drop support
 * Function Summary:
 * 1. Display available components organized by categories
 * 2. Support drag and drop from library to canvas
 * 3. Provide component previews and descriptions
 * 4. Enable component filtering and search
 * 
 * Author: AI Assistant
 * Version: 1.0.0
 * Created: 2025-01-31
 * Last modified: 2025-01-31 (drag and drop integration)
 */

import React, { useState, useMemo } from 'react';
import { useDraggable } from '@dnd-kit/core';
import { 
  ComponentRegistry, 
  ComponentType, 
  ComponentCategory,
  getComponentsByCategory,
  getComponentCategories
} from '@/lib/components/registry';
import { cn } from '@/lib/utils';
import { 
  Search, 
  Filter,
  Grid3X3,
  List,
  ChevronDown,
  ChevronRight
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

// Draggable component card
interface DraggableComponentCardProps {
  componentType: ComponentType;
  component: typeof ComponentRegistry[ComponentType];
}

const DraggableComponentCard: React.FC<DraggableComponentCardProps> = ({ 
  componentType, 
  component 
}) => {
  const { attributes, listeners, setNodeRef, isDragging } = useDraggable({
    id: `library-${componentType}-${Date.now()}`,
    data: {
      type: 'component-library',
      componentType,
    },
  });

  return (
    <div
      ref={setNodeRef}
      {...listeners}
      {...attributes}
      className={cn(
        'group relative bg-white border border-gray-200 rounded-lg p-3 cursor-move hover:border-blue-300 hover:shadow-md transition-all',
        isDragging && 'opacity-50 scale-95'
      )}
    >
      {/* Component icon */}
      <div className="flex items-center space-x-2 mb-2">
        <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center">
          <component.icon className="w-4 h-4 text-blue-600" />
        </div>
        <div className="flex-1 min-w-0">
          <h4 className="text-sm font-medium text-gray-900 truncate">
            {component.name}
          </h4>
        </div>
      </div>

      {/* Component description */}
      <p className="text-xs text-gray-500 mb-3 line-clamp-2">
        {component.description}
      </p>

      {/* Drag indicator */}
      <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity">
        <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
      </div>

      {/* Hover overlay */}
      <div className="absolute inset-0 bg-blue-50 opacity-0 group-hover:opacity-100 transition-opacity rounded-lg pointer-events-none" />
    </div>
  );
};

// Category section component
interface CategorySectionProps {
  category: ComponentCategory;
  components: Partial<typeof ComponentRegistry>;
  isExpanded: boolean;
  onToggle: () => void;
}

const CategorySection: React.FC<CategorySectionProps> = ({
  category,
  components,
  isExpanded,
  onToggle
}) => {
  const categoryNames = {
    layout: 'Layout',
    content: 'Content',
    interaction: 'Interaction',
    marketing: 'Marketing',
    navigation: 'Navigation'
  };

  const categoryIcons = {
    layout: '📐',
    content: '📝',
    interaction: '🖱️',
    marketing: '📢',
    navigation: '🧭'
  };

  return (
    <div className="border-b border-gray-200 last:border-b-0">
      <button
        onClick={onToggle}
        className="w-full flex items-center justify-between p-3 hover:bg-gray-50 transition-colors"
      >
        <div className="flex items-center space-x-2">
          <span className="text-lg">{categoryIcons[category]}</span>
          <span className="text-sm font-medium text-gray-700">
            {categoryNames[category]}
          </span>
          <span className="text-xs text-gray-500 bg-gray-100 px-2 py-1 rounded-full">
            {Object.keys(components).length}
          </span>
        </div>
        {isExpanded ? (
          <ChevronDown className="w-4 h-4 text-gray-400" />
        ) : (
          <ChevronRight className="w-4 h-4 text-gray-400" />
        )}
      </button>

      {isExpanded && (
        <div className="p-3 space-y-2">
          {Object.entries(components).map(([type, component]) => (
            <DraggableComponentCard
              key={type}
              componentType={type as ComponentType}
              component={component}
            />
          ))}
        </div>
      )}
    </div>
  );
};

// Main ComponentLibrary component
export const ComponentLibrary: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<ComponentCategory | 'all'>('all');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [expandedCategories, setExpandedCategories] = useState<Set<ComponentCategory>>(
    new Set(['layout', 'content'])
  );

  // Get all categories
  const categories = getComponentCategories();

  // Filter components based on search and category
  const filteredComponents = useMemo(() => {
    let components = ComponentRegistry;

    // Filter by search query
    if (searchQuery) {
      components = Object.entries(components).reduce((acc, [type, component]) => {
        if (
          component.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          component.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
          type.toLowerCase().includes(searchQuery.toLowerCase())
        ) {
          acc[type as ComponentType] = component;
        }
        return acc;
      }, {} as Partial<typeof ComponentRegistry>);
    }

    // Filter by category
    if (selectedCategory !== 'all') {
      components = getComponentsByCategory(selectedCategory);
    }

    return components;
  }, [searchQuery, selectedCategory]);

  // Group components by category
  const componentsByCategory = useMemo(() => {
    const grouped: Record<ComponentCategory, Partial<typeof ComponentRegistry>> = {
      layout: {},
      content: {},
      interaction: {},
      marketing: {},
      navigation: {}
    };

    Object.entries(filteredComponents).forEach(([type, component]) => {
      grouped[component.category][type as ComponentType] = component;
    });

    return grouped;
  }, [filteredComponents]);

  // Toggle category expansion
  const toggleCategory = (category: ComponentCategory) => {
    const newExpanded = new Set(expandedCategories);
    if (newExpanded.has(category)) {
      newExpanded.delete(category);
    } else {
      newExpanded.add(category);
    }
    setExpandedCategories(newExpanded);
  };

  return (
    <div className="flex flex-col h-full bg-white border-r border-gray-200">
      {/* Header */}
      <div className="p-4 border-b border-gray-200">
        <div className="flex items-center justify-between mb-3">
          <h3 className="text-lg font-semibold text-gray-900">Components</h3>
          <div className="flex items-center space-x-1">
            <Button
              size="sm"
              variant={viewMode === 'grid' ? 'default' : 'ghost'}
              onClick={() => setViewMode('grid')}
              className="h-8 w-8 p-0"
            >
              <Grid3X3 className="w-4 h-4" />
            </Button>
            <Button
              size="sm"
              variant={viewMode === 'list' ? 'default' : 'ghost'}
              onClick={() => setViewMode('list')}
              className="h-8 w-8 p-0"
            >
              <List className="w-4 h-4" />
            </Button>
          </div>
        </div>

        {/* Search */}
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
          <Input
            placeholder="Search components..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10"
          />
        </div>

        {/* Category filter */}
        <div className="mt-3">
          <div className="flex items-center space-x-1 overflow-x-auto">
            <Button
              size="sm"
              variant={selectedCategory === 'all' ? 'default' : 'outline'}
              onClick={() => setSelectedCategory('all')}
              className="whitespace-nowrap"
            >
              All
            </Button>
            {categories.map((category) => (
              <Button
                key={category}
                size="sm"
                variant={selectedCategory === category ? 'default' : 'outline'}
                onClick={() => setSelectedCategory(category)}
                className="whitespace-nowrap"
              >
                {category.charAt(0).toUpperCase() + category.slice(1)}
              </Button>
            ))}
          </div>
        </div>
      </div>

      {/* Component list */}
      <div className="flex-1 overflow-auto">
        {Object.keys(filteredComponents).length === 0 ? (
          <div className="p-6 text-center text-gray-500">
            <Search className="w-8 h-8 mx-auto mb-2 text-gray-300" />
            <p className="text-sm">No components found</p>
            <p className="text-xs text-gray-400 mt-1">
              Try adjusting your search or category filter
            </p>
          </div>
        ) : (
          <div className="p-4">
            {viewMode === 'grid' ? (
              // Grid view
              <div className="grid grid-cols-2 gap-3">
                {Object.entries(filteredComponents).map(([type, component]) => (
                  <DraggableComponentCard
                    key={type}
                    componentType={type as ComponentType}
                    component={component}
                  />
                ))}
              </div>
            ) : (
              // List view with categories
              <div className="space-y-1">
                {categories.map((category) => {
                  const categoryComponents = componentsByCategory[category];
                  if (Object.keys(categoryComponents).length === 0) return null;

                  return (
                    <CategorySection
                      key={category}
                      category={category}
                      components={categoryComponents}
                      isExpanded={expandedCategories.has(category)}
                      onToggle={() => toggleCategory(category)}
                    />
                  );
                })}
              </div>
            )}
          </div>
        )}
      </div>

      {/* Footer */}
      <div className="p-4 border-t border-gray-200">
        <div className="text-xs text-gray-500 text-center">
          {Object.keys(filteredComponents).length} component{Object.keys(filteredComponents).length !== 1 ? 's' : ''} available
        </div>
      </div>
    </div>
  );
}; 