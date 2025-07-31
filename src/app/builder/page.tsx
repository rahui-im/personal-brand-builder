/**
 * File name: page.tsx
 * Purpose: Main builder page that integrates all builder components
 * Function Summary:
 * 1. Layout the builder interface with sidebar, canvas, and property panel
 * 2. Integrate drag and drop context
 * 3. Handle responsive design for different screen sizes
 * 4. Provide keyboard shortcuts and accessibility features
 * 
 * Author: AI Assistant
 * Version: 1.0.0
 * Created: 2025-01-31
 * Last modified: 2025-01-31 (drag and drop integration)
 */

"use client";

import React, { useEffect, useState } from 'react';
import { DragDropProvider, SortableCanvas } from '@/components/builder/DragDropContext';
import { BuilderHeader } from '@/components/builder/BuilderHeader';
import { ComponentLibrary } from '@/components/builder/ComponentLibrary';
import { Canvas } from '@/components/builder/Canvas';
import { PropertyPanel } from '@/components/builder/PropertyPanel';
import { useBuilderStore } from '@/lib/store/builder.store';
import { cn } from '@/lib/utils';
import { 
  PanelLeft, 
  PanelRight, 
  PanelBottom,
  Keyboard,
  Save,
  Eye,
  Settings
} from 'lucide-react';
import { Button } from '@/components/ui/button';

// Panel visibility state
interface PanelState {
  left: boolean;
  right: boolean;
  bottom: boolean;
}

export default function BuilderPage() {
  const { isDirty, save, lastSaved, undo, redo } = useBuilderStore();
  const [panels, setPanels] = useState<PanelState>({
    left: true,
    right: true,
    bottom: false
  });
  const [isPreviewMode, setIsPreviewMode] = useState(false);

  // Handle keyboard shortcuts
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      // Ctrl/Cmd + S: Save
      if ((event.ctrlKey || event.metaKey) && event.key === 's') {
        event.preventDefault();
        save();
      }

      // Ctrl/Cmd + Z: Undo
      if ((event.ctrlKey || event.metaKey) && event.key === 'z' && !event.shiftKey) {
        event.preventDefault();
        undo();
      }

      // Ctrl/Cmd + Shift + Z: Redo
      if ((event.ctrlKey || event.metaKey) && event.key === 'Z' && event.shiftKey) {
        event.preventDefault();
        redo();
      }

      // Escape: Exit preview mode
      if (event.key === 'Escape' && isPreviewMode) {
        setIsPreviewMode(false);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [save, isPreviewMode]);

  // Auto-save functionality
  useEffect(() => {
    if (!isDirty) return;

    const autoSaveTimeout = setTimeout(() => {
      save();
    }, 30000); // Auto-save after 30 seconds of inactivity

    return () => clearTimeout(autoSaveTimeout);
  }, [isDirty, save]);

  // Toggle panel visibility
  const togglePanel = (panel: keyof PanelState) => {
    setPanels(prev => ({
      ...prev,
      [panel]: !prev[panel]
    }));
  };

  return (
    <DragDropProvider>
      <div className="h-screen flex flex-col bg-gray-50">
        {/* Header */}
        <BuilderHeader />

        {/* Main content */}
        <div className="flex-1 flex overflow-hidden">
          {/* Left sidebar - Component Library */}
          <div className={cn(
            'transition-all duration-300 ease-in-out',
            panels.left ? 'w-80' : 'w-0'
          )}>
            <div className={cn(
              'h-full',
              panels.left ? 'opacity-100' : 'opacity-0 pointer-events-none'
            )}>
              <ComponentLibrary />
            </div>
          </div>

          {/* Center - Canvas */}
          <div className="flex-1 flex flex-col">
            <SortableCanvas>
              <Canvas />
            </SortableCanvas>
          </div>

          {/* Right sidebar - Property Panel */}
          <div className={cn(
            'transition-all duration-300 ease-in-out',
            panels.right ? 'w-80' : 'w-0'
          )}>
            <div className={cn(
              'h-full',
              panels.right ? 'opacity-100' : 'opacity-0 pointer-events-none'
            )}>
              <PropertyPanel />
            </div>
          </div>
        </div>

        {/* Bottom panel - Timeline/History (optional) */}
        {panels.bottom && (
          <div className="h-48 border-t border-gray-200 bg-white">
            <div className="p-4">
              <h3 className="text-sm font-medium text-gray-900 mb-2">Timeline</h3>
              <p className="text-xs text-gray-500">Component history and changes</p>
            </div>
          </div>
        )}

        {/* Floating toolbar */}
        <div className="fixed bottom-6 right-6 flex flex-col space-y-2">
          {/* Panel toggles */}
          <div className="flex flex-col space-y-2 bg-white rounded-lg shadow-lg border p-2">
            <Button
              size="sm"
              variant={panels.left ? 'default' : 'ghost'}
              onClick={() => togglePanel('left')}
              className="h-8 w-8 p-0"
              title="Toggle Component Library"
            >
              <PanelLeft className="w-4 h-4" />
            </Button>
            
            <Button
              size="sm"
              variant={panels.right ? 'default' : 'ghost'}
              onClick={() => togglePanel('right')}
              className="h-8 w-8 p-0"
              title="Toggle Property Panel"
            >
              <PanelRight className="w-4 h-4" />
            </Button>
            
            <Button
              size="sm"
              variant={panels.bottom ? 'default' : 'ghost'}
              onClick={() => togglePanel('bottom')}
              className="h-8 w-8 p-0"
              title="Toggle Timeline"
            >
              <PanelBottom className="w-4 h-4" />
            </Button>
          </div>

          {/* Action buttons */}
          <div className="flex flex-col space-y-2 bg-white rounded-lg shadow-lg border p-2">
            <Button
              size="sm"
              variant="outline"
              onClick={() => setIsPreviewMode(!isPreviewMode)}
              className="h-8 w-8 p-0"
              title="Preview Mode"
            >
              <Eye className="w-4 h-4" />
            </Button>
            
            <Button
              size="sm"
              variant="outline"
              onClick={save}
              className="h-8 w-8 p-0"
              title="Save (Ctrl+S)"
            >
              <Save className="w-4 h-4" />
            </Button>
            
            <Button
              size="sm"
              variant="outline"
              className="h-8 w-8 p-0"
              title="Settings"
            >
              <Settings className="w-4 h-4" />
            </Button>
          </div>
        </div>

        {/* Status bar */}
        <div className="h-8 bg-white border-t border-gray-200 flex items-center justify-between px-4 text-xs text-gray-500">
          <div className="flex items-center space-x-4">
            <span className={cn(
              'flex items-center space-x-1',
              isDirty ? 'text-orange-600' : 'text-green-600'
            )}>
              <div className={cn(
                'w-2 h-2 rounded-full',
                isDirty ? 'bg-orange-500' : 'bg-green-500'
              )} />
              <span>{isDirty ? 'Unsaved changes' : 'All changes saved'}</span>
            </span>
            
            {lastSaved && (
              <span>
                Last saved: {new Date(lastSaved).toLocaleTimeString()}
              </span>
            )}
          </div>
          
          <div className="flex items-center space-x-2">
            <Keyboard className="w-3 h-3" />
            <span>Ctrl+S to save</span>
          </div>
        </div>

        {/* Preview mode overlay */}
        {isPreviewMode && (
          <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center">
            <div className="bg-white rounded-lg p-6 max-w-2xl w-full mx-4">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold">Preview Mode</h3>
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => setIsPreviewMode(false)}
                >
                  Exit Preview
                </Button>
              </div>
              <div className="bg-gray-100 rounded-lg p-4 h-96 overflow-auto">
                <p className="text-gray-500 text-center">
                  Preview content will be rendered here
                </p>
              </div>
            </div>
          </div>
        )}
      </div>
    </DragDropProvider>
  );
} 