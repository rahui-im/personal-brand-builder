/**
 * File name: PropertyPanel.tsx
 * Purpose: 선택된 컴포넌트의 속성을 편집하는 패널
 * Function Summary:
 * 1. 선택된 컴포넌트의 속성 표시
 * 2. 실시간 속성 편집
 * 3. 컴포넌트별 맞춤 편집 옵션
 * 4. 스타일 및 레이아웃 설정
 * 
 * Author: Personal Brand Builder Team
 * Version: 1.0.0
 * Created: 2025-07-31
 * Last modified: 2025-07-31 (속성 패널 구현)
 */

"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { useBuilderStore } from "@/lib/store/builder.store";
import { ThemeSelector } from "./ThemeSelector";
import { ImageUpload } from "@/components/ui/image-upload";

export function PropertyPanel() {
  const { selectedComponentId, components, updateComponent } = useBuilderStore();
  const [activeTab, setActiveTab] = useState<'content' | 'style' | 'layout' | 'theme'>('content');

  const selectedComponent = components.find(c => c.id === selectedComponentId);

  if (!selectedComponent) {
    return (
      <div className="h-full flex flex-col">
        <div className="p-4 border-b border-gray-200">
          <h2 className="text-lg font-semibold">속성</h2>
        </div>
        <div className="flex-1 flex items-center justify-center">
          <div className="text-center text-gray-500">
            <svg className="w-12 h-12 mx-auto mb-4 text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
            </svg>
            <p className="text-sm">컴포넌트를 선택하여 속성을 편집하세요</p>
          </div>
        </div>
      </div>
    );
  }

  const handlePropertyChange = (property: string, value: any) => {
    updateComponent(selectedComponentId, {
      ...selectedComponent,
      props: {
        ...selectedComponent.props,
        [property]: value
      }
    });
  };

  const renderContentTab = () => {
    switch (selectedComponent.type) {
      case 'hero':
        return (
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">제목</label>
              <input
                type="text"
                value={selectedComponent.props.title || ''}
                onChange={(e) => handlePropertyChange('title', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                placeholder="메인 제목을 입력하세요"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">부제목</label>
              <input
                type="text"
                value={selectedComponent.props.subtitle || ''}
                onChange={(e) => handlePropertyChange('subtitle', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                placeholder="부제목을 입력하세요"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">배경 타입</label>
              <select
                value={selectedComponent.props.backgroundType || 'gradient'}
                onChange={(e) => handlePropertyChange('backgroundType', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
              >
                <option value="gradient">그라데이션</option>
                <option value="solid">단색</option>
                <option value="image">이미지</option>
              </select>
            </div>
            
            {selectedComponent.props.backgroundType === 'image' && (
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">배경 이미지</label>
                <ImageUpload
                  value={selectedComponent.props.backgroundImage || ''}
                  onChange={(url) => handlePropertyChange('backgroundImage', url)}
                  placeholder="배경 이미지를 업로드하세요"
                  maxSize={5}
                />
              </div>
            )}
          </div>
        );

      case 'about':
        return (
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">제목</label>
              <input
                type="text"
                value={selectedComponent.props.title || ''}
                onChange={(e) => handlePropertyChange('title', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                placeholder="섹션 제목"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">내용</label>
              <textarea
                rows={4}
                value={selectedComponent.props.content || ''}
                onChange={(e) => handlePropertyChange('content', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                placeholder="자기소개 내용을 입력하세요"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">프로필 이미지</label>
              <ImageUpload
                value={selectedComponent.props.imageUrl || ''}
                onChange={(url) => handlePropertyChange('imageUrl', url)}
                placeholder="프로필 이미지를 업로드하세요"
                maxSize={5}
              />
            </div>
          </div>
        );

      case 'contact':
        return (
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">제목</label>
              <input
                type="text"
                value={selectedComponent.props.title || ''}
                onChange={(e) => handlePropertyChange('title', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                placeholder="연락처 섹션 제목"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">이메일</label>
              <input
                type="email"
                value={selectedComponent.props.email || ''}
                onChange={(e) => handlePropertyChange('email', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                placeholder="연락받을 이메일"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">전화번호</label>
              <input
                type="tel"
                value={selectedComponent.props.phone || ''}
                onChange={(e) => handlePropertyChange('phone', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                placeholder="연락받을 전화번호"
              />
            </div>
          </div>
        );

      default:
        return (
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">제목</label>
              <input
                type="text"
                value={selectedComponent.props.title || ''}
                onChange={(e) => handlePropertyChange('title', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                placeholder="섹션 제목"
              />
            </div>
          </div>
        );
    }
  };

  const renderStyleTab = () => {
    return (
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">배경색</label>
          <input
            type="color"
            value={selectedComponent.props.backgroundColor || '#ffffff'}
            onChange={(e) => handlePropertyChange('backgroundColor', e.target.value)}
            className="w-full h-10 border border-gray-300 rounded-md"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">텍스트 색상</label>
          <input
            type="color"
            value={selectedComponent.props.textColor || '#000000'}
            onChange={(e) => handlePropertyChange('textColor', e.target.value)}
            className="w-full h-10 border border-gray-300 rounded-md"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">패딩</label>
          <div className="grid grid-cols-2 gap-2">
            <input
              type="number"
              value={selectedComponent.props.paddingY || 16}
              onChange={(e) => handlePropertyChange('paddingY', parseInt(e.target.value))}
              className="px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
              placeholder="상하 패딩"
            />
            <input
              type="number"
              value={selectedComponent.props.paddingX || 24}
              onChange={(e) => handlePropertyChange('paddingX', parseInt(e.target.value))}
              className="px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
              placeholder="좌우 패딩"
            />
          </div>
        </div>
      </div>
    );
  };

  const renderLayoutTab = () => {
    return (
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">최대 너비</label>
          <select
            value={selectedComponent.props.maxWidth || '4xl'}
            onChange={(e) => handlePropertyChange('maxWidth', e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
          >
            <option value="sm">Small</option>
            <option value="md">Medium</option>
            <option value="lg">Large</option>
            <option value="xl">Extra Large</option>
            <option value="2xl">2XL</option>
            <option value="4xl">4XL</option>
            <option value="full">Full Width</option>
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">정렬</label>
          <select
            value={selectedComponent.props.alignment || 'center'}
            onChange={(e) => handlePropertyChange('alignment', e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
          >
            <option value="left">왼쪽</option>
            <option value="center">가운데</option>
            <option value="right">오른쪽</option>
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">그리드 컬럼</label>
          <select
            value={selectedComponent.props.gridColumns || '1'}
            onChange={(e) => handlePropertyChange('gridColumns', e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
          >
            <option value="1">1 컬럼</option>
            <option value="2">2 컬럼</option>
            <option value="3">3 컬럼</option>
            <option value="4">4 컬럼</option>
          </select>
        </div>
      </div>
    );
  };

  return (
    <div className="h-full flex flex-col">
      {/* Header */}
      <div className="p-4 border-b border-gray-200">
        <h2 className="text-lg font-semibold mb-3">속성</h2>
        <p className="text-sm text-gray-500 mb-4">
          {selectedComponent.type} 컴포넌트
        </p>
        
        {/* Tabs */}
        <div className="flex space-x-1">
          <button
            onClick={() => setActiveTab('content')}
            className={`px-3 py-1 text-xs rounded-md transition-colors ${
              activeTab === 'content'
                ? 'bg-indigo-100 text-indigo-700'
                : 'text-gray-600 hover:bg-gray-100'
            }`}
          >
            콘텐츠
          </button>
          <button
            onClick={() => setActiveTab('style')}
            className={`px-3 py-1 text-xs rounded-md transition-colors ${
              activeTab === 'style'
                ? 'bg-indigo-100 text-indigo-700'
                : 'text-gray-600 hover:bg-gray-100'
            }`}
          >
            스타일
          </button>
          <button
            onClick={() => setActiveTab('layout')}
            className={`px-3 py-1 text-xs rounded-md transition-colors ${
              activeTab === 'layout'
                ? 'bg-indigo-100 text-indigo-700'
                : 'text-gray-600 hover:bg-gray-100'
            }`}
          >
            레이아웃
          </button>
          <button
            onClick={() => setActiveTab('theme')}
            className={`px-3 py-1 text-xs rounded-md transition-colors ${
              activeTab === 'theme'
                ? 'bg-indigo-100 text-indigo-700'
                : 'text-gray-600 hover:bg-gray-100'
            }`}
          >
            테마
          </button>
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-y-auto p-4">
        {activeTab === 'content' && renderContentTab()}
        {activeTab === 'style' && renderStyleTab()}
        {activeTab === 'layout' && renderLayoutTab()}
        {activeTab === 'theme' && <ThemeSelector />}
      </div>

      {/* Footer */}
      <div className="p-4 border-t border-gray-200">
        <Button
          variant="outline"
          size="sm"
          className="w-full"
          onClick={() => {
            // 컴포넌트 복제 로직
            console.log('Duplicate component');
          }}
        >
          컴포넌트 복제
        </Button>
      </div>
    </div>
  );
} 