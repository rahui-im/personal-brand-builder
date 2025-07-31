/**
 * File name: ThemeInitializer.tsx
 * Purpose: 앱 시작 시 테마를 초기화하는 컴포넌트
 * Function Summary:
 * 1. 앱 로드 시 저장된 테마 적용
 * 2. CSS 변수 설정
 * 3. 테마 스토어 초기화
 * 
 * Author: Personal Brand Builder Team
 * Version: 1.0.0
 * Created: 2025-07-31
 * Last modified: 2025-07-31 (테마 초기화 구현)
 */

"use client";

import { useEffect } from 'react';
import { useThemeStore } from '@/lib/store/theme.store';

export const ThemeInitializer: React.FC = () => {
  const { applyThemeToCSS } = useThemeStore();

  useEffect(() => {
    // 앱 시작 시 테마 적용
    applyThemeToCSS();
  }, [applyThemeToCSS]);

  return null; // 이 컴포넌트는 렌더링하지 않음
}; 