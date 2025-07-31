/**
 * File name: Canvas.tsx
 * Purpose: Main canvas component for the page builder with drag and drop support
 * Function Summary:
 * 1. Display page components in a responsive canvas
 * 2. Support drag and drop for component reordering
 * 3. Provide device preview modes (desktop, tablet, mobile)
 * 4. Handle component selection and editing
 * 
 * Author: AI Assistant
 * Version: 1.0.0
 * Created: 2025-01-31
 * Last modified: 2025-01-31 (drag and drop integration)
 */

import React, { useState, useCallback } from 'react';
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { useBuilderStore, useComponents, useSelectedComponent } from '@/lib/store/builder.store';
import { ComponentRenderer } from './ComponentRenderer';
import { cn } from '@/lib/utils';
import { 
  Monitor, 
  Tablet, 
  Smartphone, 
  Plus,
  Eye,
  EyeOff
} from 'lucide-react';
import { Button } from '@/components/ui/button';

// Device preview types
type DeviceView = 'desktop' | 'tablet' | 'mobile';

// Canvas drop zone component
const CanvasDropZone: React.FC = () => {
  const { setNodeRef } = useSortable({
    id: 'canvas-drop-zone',
    data: {
      type: 'canvas-drop-zone',
    },
  });

  return (
    <div
      ref={setNodeRef}
      className="min-h-[400px] border-2 border-dashed border-gray-300 rounded-lg flex items-center justify-center bg-gray-50 hover:bg-gray-100 transition-colors"
    >
      <div className="text-center text-gray-500">
        <Plus className="w-8 h-8 mx-auto mb-2" />
        <p className="text-sm">Drag components here to build your page</p>
      </div>
    </div>
  );
};

// Sortable component wrapper
interface SortableComponentProps {
  component: any;
  children: React.ReactNode;
}

const SortableComponent: React.FC<SortableComponentProps> = ({ component, children }) => {
  const { selectComponent, selectedComponentId } = useBuilderStore();
  
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({
    id: component.id,
    data: {
      type: 'canvas-component',
      componentId: component.id,
    },
  });

  const isSelected = selectedComponentId === component.id;

  const handleClick = useCallback((e: React.MouseEvent) => {
    e.stopPropagation();
    selectComponent(component.id);
  }, [component.id, selectComponent]);

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.5 : 1,
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      {...attributes}
      {...listeners}
      onClick={handleClick}
      className={cn(
        'relative group cursor-move',
        isSelected && 'ring-2 ring-blue-500 ring-offset-2',
        isDragging && 'z-50'
      )}
    >
      {/* Component toolbar overlay */}
      <div className={cn(
        'absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity z-10',
        isSelected && 'opacity-100'
      )}>
        <div className="flex items-center space-x-1 bg-white rounded-lg shadow-lg border p-1">
          <Button
            size="sm"
            variant="ghost"
            className="h-6 w-6 p-0"
            onClick={(e) => {
              e.stopPropagation();
              // Toggle visibility
            }}
          >
            {component.isVisible ? (
              <Eye className="w-3 h-3" />
            ) : (
              <EyeOff className="w-3 h-3" />
            )}
          </Button>
        </div>
      </div>

      {/* Component content */}
      <div className={cn(
        'relative',
        !component.isVisible && 'opacity-50'
      )}>
        {children}
      </div>

      {/* Drag handle indicator */}
      <div className="absolute top-0 left-0 w-full h-1 bg-blue-500 opacity-0 group-hover:opacity-100 transition-opacity" />
    </div>
  );
};

// Main Canvas component
export const Canvas: React.FC = () => {
  const components = useComponents();
  const selectedComponent = useSelectedComponent();
  const { selectComponent } = useBuilderStore();
  
  const [deviceView, setDeviceView] = useState<DeviceView>('desktop');
  const [showGrid, setShowGrid] = useState(false);

  // Handle canvas click to deselect
  const handleCanvasClick = useCallback(() => {
    selectComponent(null);
  }, [selectComponent]);

  // Device view configurations
  const deviceConfigs = {
    desktop: { maxWidth: 'none', className: '' },
    tablet: { maxWidth: '768px', className: 'mx-auto' },
    mobile: { maxWidth: '375px', className: 'mx-auto' },
  };

  const currentConfig = deviceConfigs[deviceView];

  return (
    <div className="flex flex-col h-full">
      {/* Canvas toolbar */}
      <div className="flex items-center justify-between p-4 border-b bg-white">
        <div className="flex items-center space-x-2">
          <h3 className="text-lg font-semibold">Canvas</h3>
          
          {/* Device preview buttons */}
          <div className="flex items-center space-x-1 bg-gray-100 rounded-lg p-1">
            <Button
              size="sm"
              variant={deviceView === 'desktop' ? 'default' : 'ghost'}
              onClick={() => setDeviceView('desktop')}
              className="h-8 w-8 p-0"
            >
              <Monitor className="w-4 h-4" />
            </Button>
            <Button
              size="sm"
              variant={deviceView === 'tablet' ? 'default' : 'ghost'}
              onClick={() => setDeviceView('tablet')}
              className="h-8 w-8 p-0"
            >
              <Tablet className="w-4 h-4" />
            </Button>
            <Button
              size="sm"
              variant={deviceView === 'mobile' ? 'default' : 'ghost'}
              onClick={() => setDeviceView('mobile')}
              className="h-8 w-8 p-0"
            >
              <Smartphone className="w-4 h-4" />
            </Button>
          </div>
        </div>

        <div className="flex items-center space-x-2">
          <Button
            size="sm"
            variant={showGrid ? 'default' : 'outline'}
            onClick={() => setShowGrid(!showGrid)}
          >
            Grid
          </Button>
        </div>
      </div>

      {/* Canvas area */}
      <div className="flex-1 overflow-auto bg-gray-100 p-4">
        <div
          className={cn(
            'bg-white shadow-lg min-h-full transition-all duration-300',
            currentConfig.className,
            showGrid && 'bg-grid-pattern'
          )}
          style={{ maxWidth: currentConfig.maxWidth }}
          onClick={handleCanvasClick}
        >
          {/* Canvas content */}
          <div className="relative">
            {components.length === 0 ? (
              <CanvasDropZone />
            ) : (
              <div className="space-y-4">
                {components.map((component) => (
                  <SortableComponent key={component.id} component={component}>
                    <ComponentRenderer
                      component={component}
                      isSelected={selectedComponent?.id === component.id}
                    />
                  </SortableComponent>
                ))}
              </div>
            )}

            {/* Empty state when no components */}
            {components.length === 0 && (
              <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                <div className="text-center text-gray-400">
                  <p className="text-sm">Start building your page by dragging components here</p>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Canvas footer */}
      <div className="p-4 border-t bg-white">
        <div className="flex items-center justify-between text-sm text-gray-500">
          <div>
            {components.length} component{components.length !== 1 ? 's' : ''}
          </div>
          <div>
            {deviceView === 'desktop' && 'Desktop'}
            {deviceView === 'tablet' && 'Tablet'}
            {deviceView === 'mobile' && 'Mobile'}
          </div>
        </div>
      </div>
    </div>
  );
}; 