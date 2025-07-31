/**
 * File name: builder.ts
 * Purpose: Type definitions for the builder system
 * Function Summary:
 * 1. Define component types and interfaces
 * 2. Define drag and drop related types
 * 3. Define property panel types
 * 4. Define animation and styling types
 * 
 * Author: AI Assistant
 * Version: 1.0.0
 * Created: 2025-01-31
 * Last modified: 2025-01-31 (initial type definitions)
 */

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

// Draggable component interface
export interface DraggableComponent {
  id: string;
  type: ComponentType;
  props: Record<string, any>;
  children?: DraggableComponent[];
  order: number;
  isVisible: boolean;
  animations?: AnimationConfig;
  styles?: ComponentStyles;
}

// Animation configuration
export interface AnimationConfig {
  type: 'fadeIn' | 'slideIn' | 'bounce' | 'none';
  duration: number;
  delay: number;
  easing?: 'ease' | 'ease-in' | 'ease-out' | 'ease-in-out';
}

// Component styling
export interface ComponentStyles {
  backgroundColor?: string;
  textColor?: string;
  padding?: {
    top: number;
    right: number;
    bottom: number;
    left: number;
  };
  margin?: {
    top: number;
    right: number;
    bottom: number;
    left: number;
  };
  borderRadius?: number;
  borderWidth?: number;
  borderColor?: string;
  shadow?: 'none' | 'sm' | 'md' | 'lg' | 'xl';
}

// Property field types
export type PropertyFieldType = 
  | 'text' 
  | 'number' 
  | 'boolean' 
  | 'select' 
  | 'color' 
  | 'image' 
  | 'textarea' 
  | 'array';

// Property field definition
export interface PropertyField {
  name: string;
  type: PropertyFieldType;
  label: string;
  description?: string;
  defaultValue?: any;
  options?: Array<{ label: string; value: any }>;
  validation?: {
    required?: boolean;
    min?: number;
    max?: number;
    pattern?: string;
  };
}

// Component template definition
export interface ComponentTemplate {
  type: ComponentType;
  name: string;
  description: string;
  icon: string;
  category: 'layout' | 'content' | 'media' | 'interaction';
  properties: PropertyField[];
  defaultProps: Record<string, any>;
  preview: string; // URL to preview image
}

// Drag and drop events
export interface DragStartEvent {
  active: {
    id: string;
    data: {
      current: DraggableComponent;
    };
  };
}

export interface DragEndEvent {
  active: {
    id: string;
  };
  over: {
    id: string;
  } | null;
}

// Builder state
export interface BuilderState {
  components: DraggableComponent[];
  selectedComponentId: string | null;
  isDirty: boolean;
  history: {
    past: DraggableComponent[][];
    future: DraggableComponent[][];
    maxSize: number;
  };
  isSaving: boolean;
  lastSaved: Date | null;
  currentPage: string;
  pages: Record<string, DraggableComponent[]>;
}

// Page data structure
export interface PageData {
  id: string;
  name: string;
  slug: string;
  components: DraggableComponent[];
  metadata: {
    title: string;
    description: string;
    keywords: string[];
  };
  settings: {
    theme: 'light' | 'dark' | 'auto';
    layout: 'full' | 'contained' | 'boxed';
    showHeader: boolean;
    showFooter: boolean;
  };
}

// Export all types
export type {
  DraggableComponent as Component,
  AnimationConfig,
  ComponentStyles,
  PropertyField,
  ComponentTemplate,
  DragStartEvent,
  DragEndEvent,
  BuilderState,
  PageData,
}; 