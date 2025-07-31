/**
 * File name: theme.store.test.ts
 * Purpose: Unit tests for theme store functionality
 * Function Summary:
 * 1. Test theme switching functionality
 * 2. Test custom color updates
 * 3. Test theme persistence
 * 4. Test CSS variable application
 * 
 * Author: Personal Brand Builder Team
 * Version: 1.0.0
 * Created: 2025-07-31
 * Last modified: 2025-07-31 (테마 스토어 테스트 구현)
 */

import { renderHook, act } from '@testing-library/react';
import { useThemeStore, defaultThemes } from '@/lib/store/theme.store';

// Mock document.documentElement
const mockDocumentElement = {
  style: {
    setProperty: jest.fn(),
  },
};

Object.defineProperty(document, 'documentElement', {
  value: mockDocumentElement,
  writable: true,
});

describe('Theme Store', () => {
  beforeEach(() => {
    // Clear all mocks before each test
    jest.clearAllMocks();
    
    // Reset store state
    const { result } = renderHook(() => useThemeStore());
    act(() => {
      result.current.resetCustomColors();
    });
  });

  describe('Theme Management', () => {
    it('should initialize with modern theme', () => {
      const { result } = renderHook(() => useThemeStore());
      
      expect(result.current.currentTheme).toBe('modern');
      expect(result.current.themes).toEqual(defaultThemes);
    });

    it('should switch themes', () => {
      const { result } = renderHook(() => useThemeStore());
      
      act(() => {
        result.current.setTheme('classic');
      });

      expect(result.current.currentTheme).toBe('classic');
    });

    it('should apply theme colors to CSS variables', () => {
      const { result } = renderHook(() => useThemeStore());
      
      act(() => {
        result.current.setTheme('vibrant');
      });

      // Check if CSS variables were set
      expect(mockDocumentElement.style.setProperty).toHaveBeenCalled();
      
      // Check for specific color variables
      const calls = mockDocumentElement.style.setProperty.mock.calls;
      expect(calls.some(call => call[0] === '--primary' && call[1] === '#F59E0B')).toBe(true);
    });

    it('should get current theme colors', () => {
      const { result } = renderHook(() => useThemeStore());
      
      const colors = result.current.getCurrentThemeColors();
      
      expect(colors).toHaveProperty('primary');
      expect(colors).toHaveProperty('secondary');
      expect(colors).toHaveProperty('background');
      expect(colors).toHaveProperty('foreground');
    });
  });

  describe('Custom Colors', () => {
    it('should update custom colors', () => {
      const { result } = renderHook(() => useThemeStore());
      
      act(() => {
        result.current.updateCustomColor('primary', '#ff0000');
      });

      expect(result.current.customColors.primary).toBe('#ff0000');
    });

    it('should apply custom colors to CSS variables', () => {
      const { result } = renderHook(() => useThemeStore());
      
      act(() => {
        result.current.updateCustomColor('primary', '#ff0000');
      });

      // Check if custom color was applied to CSS
      expect(mockDocumentElement.style.setProperty).toHaveBeenCalledWith('--primary', '#ff0000');
    });

    it('should reset custom colors', () => {
      const { result } = renderHook(() => useThemeStore());
      
      // Add some custom colors
      act(() => {
        result.current.updateCustomColor('primary', '#ff0000');
        result.current.updateCustomColor('secondary', '#00ff00');
      });

      expect(result.current.customColors.primary).toBe('#ff0000');
      expect(result.current.customColors.secondary).toBe('#00ff00');

      // Reset custom colors
      act(() => {
        result.current.resetCustomColors();
      });

      expect(result.current.customColors).toEqual({});
    });

    it('should merge custom colors with base theme', () => {
      const { result } = renderHook(() => useThemeStore());
      
      act(() => {
        result.current.setTheme('modern');
        result.current.updateCustomColor('primary', '#ff0000');
      });

      const colors = result.current.getCurrentThemeColors();
      
      expect(colors.primary).toBe('#ff0000'); // Custom color
      expect(colors.secondary).toBe('#EC4899'); // Base theme color
    });
  });

  describe('Custom Themes', () => {
    it('should save custom theme', () => {
      const { result } = renderHook(() => useThemeStore());
      
      // Set up custom colors
      act(() => {
        result.current.updateCustomColor('primary', '#ff0000');
        result.current.updateCustomColor('secondary', '#00ff00');
      });

      // Save custom theme
      act(() => {
        result.current.saveCustomTheme('my-custom-theme');
      });

      expect(result.current.themes['my-custom-theme']).toBeDefined();
      expect(result.current.themes['my-custom-theme'].primary).toBe('#ff0000');
      expect(result.current.themes['my-custom-theme'].secondary).toBe('#00ff00');
    });

    it('should delete custom theme', () => {
      const { result } = renderHook(() => useThemeStore());
      
      // Save a custom theme
      act(() => {
        result.current.updateCustomColor('primary', '#ff0000');
        result.current.saveCustomTheme('my-custom-theme');
      });

      expect(result.current.themes['my-custom-theme']).toBeDefined();

      // Delete the custom theme
      act(() => {
        result.current.deleteCustomTheme('my-custom-theme');
      });

      expect(result.current.themes['my-custom-theme']).toBeUndefined();
    });

    it('should not delete default themes', () => {
      const { result } = renderHook(() => useThemeStore());
      
      act(() => {
        result.current.deleteCustomTheme('modern');
      });

      // Default theme should still exist
      expect(result.current.themes['modern']).toBeDefined();
    });
  });

  describe('Theme Colors', () => {
    it('should have all required color properties', () => {
      const { result } = renderHook(() => useThemeStore());
      
      const colors = result.current.getCurrentThemeColors();
      
      const requiredColors = [
        'primary', 'secondary', 'accent', 'background', 'foreground',
        'muted', 'mutedForeground', 'border', 'input', 'ring',
        'destructive', 'success', 'warning'
      ];

      requiredColors.forEach(color => {
        expect(colors).toHaveProperty(color);
        expect(typeof colors[color]).toBe('string');
        expect(colors[color]).toMatch(/^#[0-9A-F]{6}$/i);
      });
    });

    it('should have different colors for different themes', () => {
      const { result } = renderHook(() => useThemeStore());
      
      // Get modern theme colors
      act(() => {
        result.current.setTheme('modern');
      });
      const modernColors = result.current.getCurrentThemeColors();

      // Get classic theme colors
      act(() => {
        result.current.setTheme('classic');
      });
      const classicColors = result.current.getCurrentThemeColors();

      // Colors should be different
      expect(modernColors.primary).not.toBe(classicColors.primary);
      expect(modernColors.secondary).not.toBe(classicColors.secondary);
    });
  });

  describe('CSS Variable Application', () => {
    it('should apply theme colors as CSS variables', () => {
      const { result } = renderHook(() => useThemeStore());
      
      act(() => {
        result.current.setTheme('vibrant');
      });

      // Check if CSS variables were set
      expect(mockDocumentElement.style.setProperty).toHaveBeenCalled();
      
      const calls = mockDocumentElement.style.setProperty.mock.calls;
      
      // Check for specific variables
      expect(calls.some(call => call[0] === '--primary')).toBe(true);
      expect(calls.some(call => call[0] === '--secondary')).toBe(true);
      expect(calls.some(call => call[0] === '--background')).toBe(true);
      expect(calls.some(call => call[0] === '--foreground')).toBe(true);
    });

    it('should convert camelCase to kebab-case for CSS variables', () => {
      const { result } = renderHook(() => useThemeStore());
      
      act(() => {
        result.current.setTheme('modern');
      });

      const calls = mockDocumentElement.style.setProperty.mock.calls;
      
      // Check for kebab-case conversion
      expect(calls.some(call => call[0] === '--muted-foreground')).toBe(true);
      expect(calls.some(call => call[0] === '--primary-foreground')).toBe(true);
    });
  });

  describe('Default Themes', () => {
    it('should have 5 default themes', () => {
      const { result } = renderHook(() => useThemeStore());
      
      expect(Object.keys(defaultThemes)).toHaveLength(5);
      expect(defaultThemes).toHaveProperty('modern');
      expect(defaultThemes).toHaveProperty('classic');
      expect(defaultThemes).toHaveProperty('vibrant');
      expect(defaultThemes).toHaveProperty('minimal');
      expect(defaultThemes).toHaveProperty('dark');
    });

    it('should have valid color values in default themes', () => {
      Object.values(defaultThemes).forEach(theme => {
        Object.values(theme).forEach(color => {
          expect(color).toMatch(/^#[0-9A-F]{6}$/i);
        });
      });
    });
  });
}); 