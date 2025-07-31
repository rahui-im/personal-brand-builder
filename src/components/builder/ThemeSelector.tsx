/**
 * File name: ThemeSelector.tsx
 * Purpose: 테마 선택 및 커스터마이징 컴포넌트
 * Function Summary:
 * 1. 5가지 기본 테마 선택
 * 2. 커스텀 색상 설정
 * 3. 테마 미리보기
 * 4. 테마 저장/삭제
 * 
 * Author: Personal Brand Builder Team
 * Version: 1.0.0
 * Created: 2025-07-31
 * Last modified: 2025-07-31 (테마 선택기 구현)
 */

"use client";

import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { 
  Palette, 
  Save, 
  Trash2, 
  RotateCcw,
  Eye,
  Settings
} from 'lucide-react';
import { 
  useThemeStore, 
  useCurrentTheme, 
  useCustomColors, 
  useThemes, 
  useThemeActions,
  ThemeColors,
  defaultThemes
} from '@/lib/store/theme.store';

interface ThemePreviewProps {
  theme: ThemeColors;
  name: string;
  isSelected: boolean;
  onClick: () => void;
}

const ThemePreview: React.FC<ThemePreviewProps> = ({ theme, name, isSelected, onClick }) => {
  return (
    <Card 
      className={`cursor-pointer transition-all hover:shadow-md ${
        isSelected ? 'ring-2 ring-primary' : ''
      }`}
      onClick={onClick}
    >
      <CardHeader className="pb-2">
        <CardTitle className="text-sm">{name}</CardTitle>
      </CardHeader>
      <CardContent className="pt-0">
        <div className="space-y-2">
          {/* 색상 미리보기 */}
          <div className="flex space-x-1">
            <div 
              className="w-4 h-4 rounded border"
              style={{ backgroundColor: theme.primary }}
            />
            <div 
              className="w-4 h-4 rounded border"
              style={{ backgroundColor: theme.secondary }}
            />
            <div 
              className="w-4 h-4 rounded border"
              style={{ backgroundColor: theme.accent }}
            />
            <div 
              className="w-4 h-4 rounded border"
              style={{ backgroundColor: theme.background }}
            />
          </div>
          
          {/* 미니 버튼 미리보기 */}
          <div className="flex space-x-1">
            <div 
              className="h-2 w-8 rounded text-xs flex items-center justify-center text-white"
              style={{ backgroundColor: theme.primary }}
            >
              B
            </div>
            <div 
              className="h-2 w-6 rounded border text-xs flex items-center justify-center"
              style={{ 
                backgroundColor: theme.background,
                borderColor: theme.border,
                color: theme.foreground
              }}
            >
              T
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export const ThemeSelector: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'themes' | 'customize'>('themes');
  const [customThemeName, setCustomThemeName] = useState('');
  
  const currentTheme = useCurrentTheme();
  const customColors = useCustomColors();
  const themes = useThemes();
  const { setTheme, updateCustomColor, resetCustomColors, saveCustomTheme, deleteCustomTheme } = useThemeActions();

  const handleColorChange = (colorKey: keyof ThemeColors, value: string) => {
    updateCustomColor(colorKey, value);
  };

  const handleSaveCustomTheme = () => {
    if (customThemeName.trim()) {
      saveCustomTheme(customThemeName.trim());
      setCustomThemeName('');
    }
  };

  const colorInputs: Array<{ key: keyof ThemeColors; label: string; description: string }> = [
    { key: 'primary', label: 'Primary', description: '주요 액션 버튼과 링크' },
    { key: 'secondary', label: 'Secondary', description: '보조 액션과 강조 요소' },
    { key: 'accent', label: 'Accent', description: '특별한 강조 요소' },
    { key: 'background', label: 'Background', description: '페이지 배경색' },
    { key: 'foreground', label: 'Foreground', description: '주요 텍스트 색상' },
    { key: 'muted', label: 'Muted', description: '배경과 구분되는 요소' },
    { key: 'mutedForeground', label: 'Muted Text', description: '보조 텍스트 색상' },
    { key: 'border', label: 'Border', description: '테두리 색상' },
    { key: 'destructive', label: 'Destructive', description: '삭제/경고 액션' },
    { key: 'success', label: 'Success', description: '성공 상태' },
    { key: 'warning', label: 'Warning', description: '경고 상태' }
  ];

  return (
    <div className="space-y-4">
      {/* 탭 전환 */}
      <div className="flex space-x-1 bg-gray-100 rounded-lg p-1">
        <Button
          size="sm"
          variant={activeTab === 'themes' ? 'default' : 'ghost'}
          onClick={() => setActiveTab('themes')}
          className="flex-1"
        >
          <Palette className="w-4 h-4 mr-2" />
          테마
        </Button>
        <Button
          size="sm"
          variant={activeTab === 'customize' ? 'default' : 'ghost'}
          onClick={() => setActiveTab('customize')}
          className="flex-1"
        >
          <Settings className="w-4 h-4 mr-2" />
          커스터마이징
        </Button>
      </div>

      {activeTab === 'themes' && (
        <div className="space-y-4">
          {/* 기본 테마들 */}
          <div>
            <h3 className="text-sm font-medium mb-3">기본 테마</h3>
            <div className="grid grid-cols-2 gap-3">
              {Object.entries(defaultThemes).map(([name, theme]) => (
                <ThemePreview
                  key={name}
                  theme={theme}
                  name={name.charAt(0).toUpperCase() + name.slice(1)}
                  isSelected={currentTheme === name}
                  onClick={() => setTheme(name)}
                />
              ))}
            </div>
          </div>

          {/* 커스텀 테마들 */}
          {Object.keys(themes).filter(name => !defaultThemes[name]).length > 0 && (
            <div>
              <h3 className="text-sm font-medium mb-3">커스텀 테마</h3>
              <div className="grid grid-cols-2 gap-3">
                {Object.entries(themes)
                  .filter(([name]) => !defaultThemes[name])
                  .map(([name, theme]) => (
                    <div key={name} className="relative">
                      <ThemePreview
                        theme={theme}
                        name={name}
                        isSelected={currentTheme === name}
                        onClick={() => setTheme(name)}
                      />
                      <Button
                        size="sm"
                        variant="destructive"
                        className="absolute top-1 right-1 h-6 w-6 p-0"
                        onClick={() => deleteCustomTheme(name)}
                      >
                        <Trash2 className="w-3 h-3" />
                      </Button>
                    </div>
                  ))}
              </div>
            </div>
          )}
        </div>
      )}

      {activeTab === 'customize' && (
        <div className="space-y-4">
          {/* 색상 커스터마이징 */}
          <div className="space-y-3">
            {colorInputs.map(({ key, label, description }) => (
              <div key={key} className="space-y-2">
                <Label className="text-sm font-medium">{label}</Label>
                <div className="flex space-x-2">
                  <Input
                    type="color"
                    value={customColors[key] || themes[currentTheme][key]}
                    onChange={(e) => handleColorChange(key, e.target.value)}
                    className="w-12 h-8 p-1"
                  />
                  <Input
                    type="text"
                    value={customColors[key] || themes[currentTheme][key]}
                    onChange={(e) => handleColorChange(key, e.target.value)}
                    placeholder="#000000"
                    className="flex-1"
                  />
                </div>
                <p className="text-xs text-muted-foreground">{description}</p>
              </div>
            ))}
          </div>

          {/* 액션 버튼들 */}
          <div className="flex space-x-2 pt-4 border-t">
            <Button
              size="sm"
              variant="outline"
              onClick={resetCustomColors}
              className="flex-1"
            >
              <RotateCcw className="w-4 h-4 mr-2" />
              초기화
            </Button>
            <Button
              size="sm"
              onClick={handleSaveCustomTheme}
              disabled={!customThemeName.trim()}
              className="flex-1"
            >
              <Save className="w-4 h-4 mr-2" />
              저장
            </Button>
          </div>

          {/* 커스텀 테마 이름 입력 */}
          <div className="space-y-2">
            <Label className="text-sm font-medium">테마 이름</Label>
            <Input
              type="text"
              value={customThemeName}
              onChange={(e) => setCustomThemeName(e.target.value)}
              placeholder="커스텀 테마 이름을 입력하세요"
            />
          </div>
        </div>
      )}
    </div>
  );
}; 