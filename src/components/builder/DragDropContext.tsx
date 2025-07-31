/**
 * File name: DragDropContext.tsx
 * Purpose: Drag and drop context provider for the builder interface
 * Function Summary:
 * 1. Provide drag and drop context for the entire builder
 * 2. Handle drag start, drag over, and drag end events
 * 3. Manage drag sensors for mouse, touch, and keyboard
 * 4. Integrate with Zustand store for state management
 * 
 * Author: AI Assistant
 * Version: 1.0.0
 * Created: 2025-01-31
 * Last modified: 2025-01-31 (initial implementation)
 */

import React, { createContext, useContext, useCallback } from 'react';
import {
  DndContext,
  DragEndEvent,
  DragOverEvent,
  DragStartEvent,
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
  DragOverlay,
  defaultDropAnimationSideEffects,
  DropAnimation
} from '@dnd-kit/core';
import {
  arrayMove,
  SortableContext,
  sortableKeyboardCoordinates,
  verticalListSortingStrategy,
} from '@dnd-kit/sortable';
import { useBuilderStore } from '@/lib/store/builder.store';
import { ComponentType, getDefaultProps } from '@/lib/components/registry';

// Types for drag and drop
interface DragItem {
  id: string;
  type: ComponentType;
  data?: any;
}

interface DropZone {
  id: string;
  accepts: ComponentType[];
  maxItems?: number;
}

// Context for drag and drop state
interface DragDropContextType {
  activeId: string | null;
  activeItem: DragItem | null;
  isDragging: boolean;
}

const DragDropContext = createContext<DragDropContextType>({
  activeId: null,
  activeItem: null,
  isDragging: false,
});

// Custom drop animation
const dropAnimation: DropAnimation = {
  sideEffects: defaultDropAnimationSideEffects({
    styles: {
      active: {
        opacity: '0.5',
      },
    },
  }),
};

// Hook to use drag and drop context
export const useDragDrop = () => {
  const context = useContext(DragDropContext);
  if (!context) {
    throw new Error('useDragDrop must be used within DragDropProvider');
  }
  return context;
};

// Main drag and drop provider component
interface DragDropProviderProps {
  children: React.ReactNode;
}

export const DragDropProvider: React.FC<DragDropProviderProps> = ({ children }) => {
  const {
    components,
    addComponent,
    reorderComponents,
    selectComponent
  } = useBuilderStore();

  // State for active drag item
  const [activeId, setActiveId] = React.useState<string | null>(null);
  const [activeItem, setActiveItem] = React.useState<DragItem | null>(null);

  // Configure sensors for different input methods
  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 8, // Minimum distance to start drag
      },
    }),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  // Handle drag start
  const handleDragStart = useCallback((event: DragStartEvent) => {
    const { active } = event;
    setActiveId(active.id as string);

    // Check if dragging from component library
    if (active.data?.current?.type === 'component-library') {
      const componentType = active.data.current.componentType as ComponentType;
      setActiveItem({
        id: active.id as string,
        type: componentType,
        data: active.data.current
      });
    } else {
      // Dragging existing component
      const component = components.find(c => c.id === active.id);
      if (component) {
        setActiveItem({
          id: component.id,
          type: component.type,
          data: component
        });
      }
    }
  }, [components]);

  // Handle drag over (for visual feedback)
  const handleDragOver = useCallback((event: DragOverEvent) => {
    const { active, over } = event;
    
    if (!over) return;

    // Add visual feedback for drop zones
    const dropZone = over.data?.current?.type === 'drop-zone';
    if (dropZone) {
      // Add visual indicator for valid drop zone
      over.rect.current?.classList.add('drop-zone-active');
    }
  }, []);

  // Handle drag end
  const handleDragEnd = useCallback((event: DragEndEvent) => {
    const { active, over } = event;
    
    setActiveId(null);
    setActiveItem(null);

    if (!over) return;

    // Handle component library to canvas drop
    if (active.data?.current?.type === 'component-library' && 
        over.data?.current?.type === 'canvas-drop-zone') {
      
      const componentType = active.data.current.componentType as ComponentType;
      const defaultProps = getDefaultProps(componentType);
      
      addComponent({
        type: componentType,
        props: defaultProps,
        isVisible: true
      });

      // Select the newly added component
      const newComponent = components[components.length - 1];
      if (newComponent) {
        selectComponent(newComponent.id);
      }
    }

    // Handle component reordering within canvas
    if (active.data?.current?.type === 'canvas-component' && 
        over.data?.current?.type === 'canvas-component') {
      
      const oldIndex = components.findIndex(c => c.id === active.id);
      const newIndex = components.findIndex(c => c.id === over.id);

      if (oldIndex !== newIndex) {
        reorderComponents(oldIndex, newIndex);
      }
    }

    // Handle component to drop zone
    if (active.data?.current?.type === 'canvas-component' && 
        over.data?.current?.type === 'drop-zone') {
      
      const component = components.find(c => c.id === active.id);
      const dropZone = over.data.current as DropZone;

      if (component && dropZone.accepts.includes(component.type)) {
        // Move component to drop zone
        // This could be used for nested components or special layouts
        console.log(`Moving component ${component.id} to drop zone ${dropZone.id}`);
      }
    }
  }, [components, addComponent, reorderComponents, selectComponent]);

  // Context value
  const contextValue: DragDropContextType = {
    activeId,
    activeItem,
    isDragging: activeId !== null,
  };

  return (
    <DragDropContext.Provider value={contextValue}>
      <DndContext
        sensors={sensors}
        collisionDetection={closestCenter}
        onDragStart={handleDragStart}
        onDragOver={handleDragOver}
        onDragEnd={handleDragEnd}
      >
        {children}
        
        {/* Drag overlay for visual feedback */}
        <DragOverlay dropAnimation={dropAnimation}>
          {activeItem && (
            <div className="bg-white border-2 border-blue-500 rounded-lg p-4 shadow-lg opacity-90">
              <div className="flex items-center space-x-2">
                <div className="w-4 h-4 bg-blue-500 rounded"></div>
                <span className="text-sm font-medium">
                  {activeItem.type.charAt(0).toUpperCase() + activeItem.type.slice(1)}
                </span>
              </div>
            </div>
          )}
        </DragOverlay>
      </DndContext>
    </DragDropContext.Provider>
  );
};

// Sortable context for canvas components
interface SortableCanvasProps {
  children: React.ReactNode;
}

export const SortableCanvas: React.FC<SortableCanvasProps> = ({ children }) => {
  const { components } = useBuilderStore();
  const componentIds = components.map(c => c.id);

  return (
    <SortableContext
      items={componentIds}
      strategy={verticalListSortingStrategy}
    >
      {children}
    </SortableContext>
  );
};

// Utility hooks for drag and drop
export const useDragSensors = () => {
  return useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 8,
      },
    }),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );
};

// Hook for component library drag items
export const useComponentLibraryDrag = (componentType: ComponentType) => {
  return {
    id: `library-${componentType}-${Date.now()}`,
    data: {
      type: 'component-library',
      componentType,
    },
  };
};

// Hook for canvas component drag items
export const useCanvasComponentDrag = (componentId: string) => {
  return {
    id: componentId,
    data: {
      type: 'canvas-component',
      componentId,
    },
  };
};

// Hook for drop zones
export const useDropZone = (zoneId: string, accepts: ComponentType[], maxItems?: number) => {
  return {
    id: zoneId,
    data: {
      type: 'drop-zone',
      accepts,
      maxItems,
    },
  };
}; 