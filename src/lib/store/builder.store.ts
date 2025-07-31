/**
 * File name: builder.store.ts
 * Purpose: Zustand store for managing builder state including components, selection, and history
 * Function Summary:
 * 1. Manage draggable components state
 * 2. Handle component selection and editing
 * 3. Maintain undo/redo history
 * 4. Handle auto-save functionality
 * 
 * Author: AI Assistant
 * Version: 1.0.0
 * Created: 2025-01-31
 * Last modified: 2025-01-31 (initial implementation)
 */

import { create } from 'zustand';
import { devtools, persist } from 'zustand/middleware';
import { immer } from 'zustand/middleware/immer';

// Types for builder state management
export interface DraggableComponent {
  id: string;
  type: ComponentType;
  props: Record<string, any>;
  children?: DraggableComponent[];
  order: number;
  isVisible: boolean;
  animations?: AnimationConfig;
}

export interface AnimationConfig {
  type: 'fadeIn' | 'slideIn' | 'bounce' | 'none';
  duration: number;
  delay: number;
}

export interface HistoryState {
  past: DraggableComponent[][];
  future: DraggableComponent[][];
  maxSize: number;
}

export interface BuilderState {
  // State
  components: DraggableComponent[];
  selectedComponentId: string | null;
  isDirty: boolean;
  history: HistoryState;
  isSaving: boolean;
  lastSaved: Date | null;
  
  // Actions
  addComponent: (component: Omit<DraggableComponent, 'id' | 'order'>) => void;
  updateComponent: (id: string, updates: Partial<DraggableComponent>) => void;
  deleteComponent: (id: string) => void;
  selectComponent: (id: string | null) => void;
  reorderComponents: (fromIndex: number, toIndex: number) => void;
  duplicateComponent: (id: string) => void;
  undo: () => void;
  redo: () => void;
  save: () => Promise<void>;
  loadPage: (components: DraggableComponent[]) => void;
  clearPage: () => void;
  markAsDirty: () => void;
}

// Component types based on TRD
export type ComponentType = 
  | 'hero' 
  | 'about' 
  | 'portfolio' 
  | 'contact' 
  | 'testimonial' 
  | 'pricing' 
  | 'blog' 
  | 'footer';

// Generate unique ID for components
const generateId = (): string => {
  return `component_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
};

// Create the builder store with Zustand
export const useBuilderStore = create<BuilderState>()(
  devtools(
    persist(
      immer((set, get) => ({
        // Initial state
        components: [],
        selectedComponentId: null,
        isDirty: false,
        history: {
          past: [],
          future: [],
          maxSize: 50
        },
        isSaving: false,
        lastSaved: null,

        // Actions
        addComponent: (componentData) => {
          set((state) => {
            const newComponent: DraggableComponent = {
              id: generateId(),
              order: state.components.length,
              isVisible: true,
              animations: {
                type: 'fadeIn',
                duration: 0.5,
                delay: 0
              },
              ...componentData
            };

            // Add to history
            state.history.past.push([...state.components]);
            state.history.future = []; // Clear future when new action

            state.components.push(newComponent);
            state.isDirty = true;
            state.selectedComponentId = newComponent.id;
          });
        },

        updateComponent: (id, updates) => {
          set((state) => {
            const componentIndex = state.components.findIndex(c => c.id === id);
            if (componentIndex === -1) return;

            // Add to history before updating
            state.history.past.push([...state.components]);
            state.history.future = [];

            // Update component
            Object.assign(state.components[componentIndex], updates);
            state.isDirty = true;
          });
        },

        deleteComponent: (id) => {
          set((state) => {
            // Add to history
            state.history.past.push([...state.components]);
            state.history.future = [];

            // Remove component
            state.components = state.components.filter(c => c.id !== id);
            
            // Clear selection if deleted component was selected
            if (state.selectedComponentId === id) {
              state.selectedComponentId = null;
            }
            
            state.isDirty = true;
          });
        },

        selectComponent: (id) => {
          set((state) => {
            state.selectedComponentId = id;
          });
        },

        reorderComponents: (fromIndex, toIndex) => {
          set((state) => {
            // Add to history
            state.history.past.push([...state.components]);
            state.history.future = [];

            const [movedComponent] = state.components.splice(fromIndex, 1);
            state.components.splice(toIndex, 0, movedComponent);

            // Update order property
            state.components.forEach((component, index) => {
              component.order = index;
            });

            state.isDirty = true;
          });
        },

        duplicateComponent: (id) => {
          set((state) => {
            const originalComponent = state.components.find(c => c.id === id);
            if (!originalComponent) return;

            // Add to history
            state.history.past.push([...state.components]);
            state.history.future = [];

            const duplicatedComponent: DraggableComponent = {
              ...originalComponent,
              id: generateId(),
              order: state.components.length
            };

            state.components.push(duplicatedComponent);
            state.selectedComponentId = duplicatedComponent.id;
            state.isDirty = true;
          });
        },

        undo: () => {
          set((state) => {
            if (state.history.past.length === 0) return;

            const previous = state.history.past.pop()!;
            state.history.future.push([...state.components]);
            state.components = previous;
            state.isDirty = true;
          });
        },

        redo: () => {
          set((state) => {
            if (state.history.future.length === 0) return;

            const next = state.history.future.pop()!;
            state.history.past.push([...state.components]);
            state.components = next;
            state.isDirty = true;
          });
        },

        save: async () => {
          set((state) => {
            state.isSaving = true;
          });

          try {
            // Simulate API call for saving
            await new Promise(resolve => setTimeout(resolve, 1000));
            
            set((state) => {
              state.isSaving = false;
              state.isDirty = false;
              state.lastSaved = new Date();
            });
          } catch (error) {
            set((state) => {
              state.isSaving = false;
            });
            throw error;
          }
        },

        loadPage: (components) => {
          set((state) => {
            state.components = components;
            state.selectedComponentId = null;
            state.isDirty = false;
            state.history.past = [];
            state.history.future = [];
            state.lastSaved = new Date();
          });
        },

        clearPage: () => {
          set((state) => {
            state.components = [];
            state.selectedComponentId = null;
            state.isDirty = false;
            state.history.past = [];
            state.history.future = [];
            state.lastSaved = null;
          });
        },

        markAsDirty: () => {
          set((state) => {
            state.isDirty = true;
          });
        }
      })),
      {
        name: 'builder-storage',
        partialize: (state) => ({ 
          components: state.components,
          lastSaved: state.lastSaved
        })
      }
    )
  )
);

// Selector hooks for better performance
export const useComponents = () => useBuilderStore(state => state.components);
export const useSelectedComponent = () => useBuilderStore(state => 
  state.components.find(c => c.id === state.selectedComponentId)
);
export const useIsDirty = () => useBuilderStore(state => state.isDirty);
export const useCanUndo = () => useBuilderStore(state => state.history.past.length > 0);
export const useCanRedo = () => useBuilderStore(state => state.history.future.length > 0); 