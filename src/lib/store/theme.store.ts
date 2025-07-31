/**
 * File name: theme.store.ts
 * Purpose: 테마 시스템을 위한 Zustand 스토어
 * Function Summary:
 * 1. 5가지 기본 테마 관리
 * 2. 커스텀 색상 설정
 * 3. 테마 전환 기능
 * 4. 테마 미리보기
 * 
 * Author: Personal Brand Builder Team
 * Version: 1.0.0
 * Created: 2025-07-31
 * Last modified: 2025-07-31 (테마 스토어 구현)
 */

import { create } from 'zustand';
import { devtools, persist } from 'zustand/middleware';
import { immer } from 'zustand/middleware/immer';

// 테마 색상 정의
export interface ThemeColors {
  primary: string;
  secondary: string;
  accent: string;
  background: string;
  foreground: string;
  muted: string;
  mutedForeground: string;
  border: string;
  input: string;
  ring: string;
  destructive: string;
  success: string;
  warning: string;
}

// 기본 테마들
export const defaultThemes: Record<string, ThemeColors> = {
  modern: {
    primary: '#6366F1',
    secondary: '#EC4899',
    accent: '#8B5CF6',
    background: '#FFFFFF',
    foreground: '#1F2937',
    muted: '#F9FAFB',
    mutedForeground: '#6B7280',
    border: '#E5E7EB',
    input: '#FFFFFF',
    ring: '#6366F1',
    destructive: '#EF4444',
    success: '#10B981',
    warning: '#F59E0B'
  },
  classic: {
    primary: '#1F2937',
    secondary: '#6B7280',
    accent: '#3B82F6',
    background: '#FFFFFF',
    foreground: '#111827',
    muted: '#F3F4F6',
    mutedForeground: '#6B7280',
    border: '#D1D5DB',
    input: '#FFFFFF',
    ring: '#1F2937',
    destructive: '#DC2626',
    success: '#059669',
    warning: '#D97706'
  },
  vibrant: {
    primary: '#F59E0B',
    secondary: '#EC4899',
    accent: '#8B5CF6',
    background: '#FFFFFF',
    foreground: '#1F2937',
    muted: '#FEF3C7',
    mutedForeground: '#92400E',
    border: '#FDE68A',
    input: '#FFFFFF',
    ring: '#F59E0B',
    destructive: '#EF4444',
    success: '#10B981',
    warning: '#F59E0B'
  },
  minimal: {
    primary: '#000000',
    secondary: '#6B7280',
    accent: '#3B82F6',
    background: '#FFFFFF',
    foreground: '#000000',
    muted: '#F9FAFB',
    mutedForeground: '#6B7280',
    border: '#E5E7EB',
    input: '#FFFFFF',
    ring: '#000000',
    destructive: '#EF4444',
    success: '#10B981',
    warning: '#F59E0B'
  },
  dark: {
    primary: '#6366F1',
    secondary: '#EC4899',
    accent: '#8B5CF6',
    background: '#0F172A',
    foreground: '#F8FAFC',
    muted: '#1E293B',
    mutedForeground: '#64748B',
    border: '#334155',
    input: '#1E293B',
    ring: '#6366F1',
    destructive: '#EF4444',
    success: '#10B981',
    warning: '#F59E0B'
  }
};

export interface ThemeState {
  // State
  currentTheme: string;
  customColors: Partial<ThemeColors>;
  themes: Record<string, ThemeColors>;
  
  // Actions
  setTheme: (themeName: string) => void;
  updateCustomColor: (colorKey: keyof ThemeColors, value: string) => void;
  resetCustomColors: () => void;
  saveCustomTheme: (name: string) => void;
  deleteCustomTheme: (name: string) => void;
  getCurrentThemeColors: () => ThemeColors;
  applyThemeToCSS: () => void;
}

export const useThemeStore = create<ThemeState>()(
  devtools(
    persist(
      immer((set, get) => ({
        // Initial state
        currentTheme: 'modern',
        customColors: {},
        themes: defaultThemes,

        setTheme: (themeName) => {
          set((state) => {
            state.currentTheme = themeName;
          });
          get().applyThemeToCSS();
        },

        updateCustomColor: (colorKey, value) => {
          set((state) => {
            state.customColors[colorKey] = value;
          });
          get().applyThemeToCSS();
        },

        resetCustomColors: () => {
          set((state) => {
            state.customColors = {};
          });
          get().applyThemeToCSS();
        },

        saveCustomTheme: (name) => {
          set((state) => {
            const baseTheme = state.themes[state.currentTheme];
            const customTheme = {
              ...baseTheme,
              ...state.customColors
            };
            state.themes[name] = customTheme;
          });
        },

        deleteCustomTheme: (name) => {
          set((state) => {
            if (state.themes[name] && !defaultThemes[name]) {
              delete state.themes[name];
            }
          });
        },

        getCurrentThemeColors: () => {
          const state = get();
          const baseTheme = state.themes[state.currentTheme];
          return {
            ...baseTheme,
            ...state.customColors
          };
        },

        applyThemeToCSS: () => {
          const colors = get().getCurrentThemeColors();
          
          // CSS 변수로 테마 적용
          const root = document.documentElement;
          Object.entries(colors).forEach(([key, value]) => {
            const cssVar = `--${key.replace(/([A-Z])/g, '-$1').toLowerCase()}`;
            root.style.setProperty(cssVar, value);
          });
        }
      })),
      {
        name: 'theme-store'
      }
    )
  )
);

// 편의 함수들
export const useCurrentTheme = () => useThemeStore(state => state.currentTheme);
export const useCustomColors = () => useThemeStore(state => state.customColors);
export const useThemes = () => useThemeStore(state => state.themes);
export const useThemeActions = () => useThemeStore(state => ({
  setTheme: state.setTheme,
  updateCustomColor: state.updateCustomColor,
  resetCustomColors: state.resetCustomColors,
  saveCustomTheme: state.saveCustomTheme,
  deleteCustomTheme: state.deleteCustomTheme
})); 