/**
 * File name: builder.store.test.ts
 * Purpose: Unit tests for builder store functionality
 * Function Summary:
 * 1. Test component management (add, update, delete)
 * 2. Test selection and reordering
 * 3. Test undo/redo functionality
 * 4. Test save/load operations
 * 
 * Author: AI Assistant
 * Version: 1.0.0
 * Created: 2025-01-31
 * Last modified: 2025-01-31 (initial store tests)
 */

import { renderHook, act } from '@testing-library/react';
import { useBuilderStore } from '@/lib/store/builder.store';
import { ComponentType } from '@/types/builder';

// Mock localStorage
const localStorageMock = {
  getItem: jest.fn(),
  setItem: jest.fn(),
  removeItem: jest.fn(),
  clear: jest.fn(),
};
Object.defineProperty(window, 'localStorage', {
  value: localStorageMock,
});

describe('Builder Store', () => {
  beforeEach(() => {
    // Clear all mocks before each test
    jest.clearAllMocks();
    
    // Reset store state
    const { result } = renderHook(() => useBuilderStore());
    act(() => {
      result.current.clearPage();
    });
  });

  describe('Component Management', () => {
    it('should add a component', () => {
      const { result } = renderHook(() => useBuilderStore());
      
      const newComponent = {
        type: 'hero' as ComponentType,
        props: { title: 'Test Hero' },
        isVisible: true,
      };

      act(() => {
        result.current.addComponent(newComponent);
      });

      expect(result.current.components).toHaveLength(1);
      expect(result.current.components[0].type).toBe('hero');
      expect(result.current.components[0].props.title).toBe('Test Hero');
      expect(result.current.isDirty).toBe(true);
    });

    it('should update a component', () => {
      const { result } = renderHook(() => useBuilderStore());
      
      // Add a component first
      act(() => {
        result.current.addComponent({
          type: 'hero' as ComponentType,
          props: { title: 'Original Title' },
          isVisible: true,
        });
      });

      const componentId = result.current.components[0].id;

      // Update the component
      act(() => {
        result.current.updateComponent(componentId, {
          props: { title: 'Updated Title' },
        });
      });

      expect(result.current.components[0].props.title).toBe('Updated Title');
      expect(result.current.isDirty).toBe(true);
    });

    it('should delete a component', () => {
      const { result } = renderHook(() => useBuilderStore());
      
      // Add a component first
      act(() => {
        result.current.addComponent({
          type: 'hero' as ComponentType,
          props: { title: 'Test Hero' },
          isVisible: true,
        });
      });

      const componentId = result.current.components[0].id;

      // Delete the component
      act(() => {
        result.current.deleteComponent(componentId);
      });

      expect(result.current.components).toHaveLength(0);
      expect(result.current.isDirty).toBe(true);
    });

    it('should clear selected component when deleted', () => {
      const { result } = renderHook(() => useBuilderStore());
      
      // Add a component first
      act(() => {
        result.current.addComponent({
          type: 'hero' as ComponentType,
          props: { title: 'Test Hero' },
          isVisible: true,
        });
      });

      const componentId = result.current.components[0].id;

      // Select the component
      act(() => {
        result.current.selectComponent(componentId);
      });

      expect(result.current.selectedComponentId).toBe(componentId);

      // Delete the component
      act(() => {
        result.current.deleteComponent(componentId);
      });

      expect(result.current.selectedComponentId).toBe(null);
    });
  });

  describe('Component Selection', () => {
    it('should select a component', () => {
      const { result } = renderHook(() => useBuilderStore());
      
      // Add a component first
      act(() => {
        result.current.addComponent({
          type: 'hero' as ComponentType,
          props: { title: 'Test Hero' },
          isVisible: true,
        });
      });

      const componentId = result.current.components[0].id;

      // Select the component
      act(() => {
        result.current.selectComponent(componentId);
      });

      expect(result.current.selectedComponentId).toBe(componentId);
    });

    it('should deselect a component', () => {
      const { result } = renderHook(() => useBuilderStore());
      
      // Add a component first
      act(() => {
        result.current.addComponent({
          type: 'hero' as ComponentType,
          props: { title: 'Test Hero' },
          isVisible: true,
        });
      });

      const componentId = result.current.components[0].id;

      // Select the component
      act(() => {
        result.current.selectComponent(componentId);
      });

      expect(result.current.selectedComponentId).toBe(componentId);

      // Deselect the component
      act(() => {
        result.current.selectComponent(null);
      });

      expect(result.current.selectedComponentId).toBe(null);
    });
  });

  describe('Component Reordering', () => {
    it('should reorder components', () => {
      const { result } = renderHook(() => useBuilderStore());
      
      // Add multiple components
      act(() => {
        result.current.addComponent({
          type: 'hero' as ComponentType,
          props: { title: 'Hero 1' },
          isVisible: true,
        });
        result.current.addComponent({
          type: 'about' as ComponentType,
          props: { title: 'About 1' },
          isVisible: true,
        });
        result.current.addComponent({
          type: 'contact' as ComponentType,
          props: { title: 'Contact 1' },
          isVisible: true,
        });
      });

      expect(result.current.components[0].type).toBe('hero');
      expect(result.current.components[1].type).toBe('about');
      expect(result.current.components[2].type).toBe('contact');

      // Reorder: move first component to last
      act(() => {
        result.current.reorderComponents(0, 2);
      });

      expect(result.current.components[0].type).toBe('about');
      expect(result.current.components[1].type).toBe('contact');
      expect(result.current.components[2].type).toBe('hero');
      expect(result.current.isDirty).toBe(true);
    });
  });

  describe('Undo/Redo', () => {
    it('should undo changes', () => {
      const { result } = renderHook(() => useBuilderStore());
      
      // Add a component
      act(() => {
        result.current.addComponent({
          type: 'hero' as ComponentType,
          props: { title: 'Original Title' },
          isVisible: true,
        });
      });

      const componentId = result.current.components[0].id;

      // Update the component
      act(() => {
        result.current.updateComponent(componentId, {
          props: { title: 'Updated Title' },
        });
      });

      expect(result.current.components[0].props.title).toBe('Updated Title');

      // Undo the change
      act(() => {
        result.current.undo();
      });

      expect(result.current.components[0].props.title).toBe('Original Title');
    });

    it('should redo changes', () => {
      const { result } = renderHook(() => useBuilderStore());
      
      // Add a component
      act(() => {
        result.current.addComponent({
          type: 'hero' as ComponentType,
          props: { title: 'Original Title' },
          isVisible: true,
        });
      });

      const componentId = result.current.components[0].id;

      // Update the component
      act(() => {
        result.current.updateComponent(componentId, {
          props: { title: 'Updated Title' },
        });
      });

      // Undo the change
      act(() => {
        result.current.undo();
      });

      expect(result.current.components[0].props.title).toBe('Original Title');

      // Redo the change
      act(() => {
        result.current.redo();
      });

      expect(result.current.components[0].props.title).toBe('Updated Title');
    });
  });

  describe('Save/Load', () => {
    it('should save components to localStorage', async () => {
      const { result } = renderHook(() => useBuilderStore());
      
      // Add a component
      act(() => {
        result.current.addComponent({
          type: 'hero' as ComponentType,
          props: { title: 'Test Hero' },
          isVisible: true,
        });
      });

      // Save the page
      await act(async () => {
        await result.current.save();
      });

      expect(localStorageMock.setItem).toHaveBeenCalledWith(
        'builder-data',
        expect.stringContaining('Test Hero')
      );
      expect(result.current.isDirty).toBe(false);
    });

    it('should load components from localStorage', () => {
      const { result } = renderHook(() => useBuilderStore());
      
      const mockComponents = [
        {
          id: 'test-id',
          type: 'hero' as ComponentType,
          props: { title: 'Loaded Hero' },
          order: 0,
          isVisible: true,
        },
      ];

      // Mock localStorage.getItem to return our test data
      localStorageMock.getItem.mockReturnValue(JSON.stringify(mockComponents));

      // Load the page
      act(() => {
        result.current.loadPage(mockComponents);
      });

      expect(result.current.components).toHaveLength(1);
      expect(result.current.components[0].props.title).toBe('Loaded Hero');
    });

    it('should clear the page', () => {
      const { result } = renderHook(() => useBuilderStore());
      
      // Add a component first
      act(() => {
        result.current.addComponent({
          type: 'hero' as ComponentType,
          props: { title: 'Test Hero' },
          isVisible: true,
        });
      });

      expect(result.current.components).toHaveLength(1);

      // Clear the page
      act(() => {
        result.current.clearPage();
      });

      expect(result.current.components).toHaveLength(0);
      expect(result.current.selectedComponentId).toBe(null);
      expect(result.current.isDirty).toBe(false);
    });
  });

  describe('Dirty State', () => {
    it('should mark as dirty when components change', () => {
      const { result } = renderHook(() => useBuilderStore());
      
      expect(result.current.isDirty).toBe(false);

      // Add a component
      act(() => {
        result.current.addComponent({
          type: 'hero' as ComponentType,
          props: { title: 'Test Hero' },
          isVisible: true,
        });
      });

      expect(result.current.isDirty).toBe(true);
    });

    it('should clear dirty state after save', async () => {
      const { result } = renderHook(() => useBuilderStore());
      
      // Add a component
      act(() => {
        result.current.addComponent({
          type: 'hero' as ComponentType,
          props: { title: 'Test Hero' },
          isVisible: true,
        });
      });

      expect(result.current.isDirty).toBe(true);

      // Save the page
      await act(async () => {
        await result.current.save();
      });

      expect(result.current.isDirty).toBe(false);
    });
  });
}); 