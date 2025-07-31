/**
 * File name: BuilderHeader.tsx
 * Purpose: 빌더 페이지의 상단 헤더 컴포넌트
 * Function Summary:
 * 1. 페이지 제목 편집
 * 2. 저장/불러오기 기능
 * 3. 미리보기/퍼블리시 버튼
 * 4. 디바이스 뷰 전환
 * 
 * Author: Personal Brand Builder Team
 * Version: 1.0.0
 * Created: 2025-07-31
 * Last modified: 2025-07-31 (헤더 컴포넌트 구현)
 */

"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { useBuilderStore } from "@/lib/store/builder.store";

export function BuilderHeader() {
  const [pageTitle, setPageTitle] = useState("My Personal Brand");
  const { save, undo, redo } = useBuilderStore();
  const canUndo = useBuilderStore(state => state.history.past.length > 0);
  const canRedo = useBuilderStore(state => state.history.future.length > 0);
  const [deviceView, setDeviceView] = useState<'desktop' | 'tablet' | 'mobile'>('desktop');

  const handleSave = async () => {
    try {
      await save();
      // 성공 알림 표시
    } catch (error) {
      // 에러 알림 표시
      console.error('Save failed:', error);
    }
  };

  const handlePreview = () => {
    // 미리보기 모달 또는 새 탭에서 열기
    window.open('/preview', '_blank');
  };

  const [isDeploying, setIsDeploying] = useState(false);

  const handlePublish = async () => {
    setIsDeploying(true);
    try {
      const components = useBuilderStore.getState().components;
      const response = await fetch('/api/deploy', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          components,
          metadata: {
            title: pageTitle,
            description: 'Built with Personal Brand Builder'
          }
        }),
      });

      const result = await response.json();
      
      if (result.success) {
        // 성공 알림 표시
        alert(`배포 성공! URL: ${result.deploymentUrl}`);
        // 새 탭에서 배포된 사이트 열기
        window.open(result.deploymentUrl, '_blank');
      } else {
        throw new Error(result.message || '배포 실패');
      }
    } catch (error) {
      console.error('Deployment failed:', error);
      alert('배포 중 오류가 발생했습니다.');
    } finally {
      setIsDeploying(false);
    }
  };

  return (
    <header className="bg-white border-b border-gray-200 px-6 py-4 flex items-center justify-between">
      {/* Left Section */}
      <div className="flex items-center space-x-4">
        <input
          type="text"
          value={pageTitle}
          onChange={(e) => setPageTitle(e.target.value)}
          className="text-xl font-semibold bg-transparent border-none outline-none focus:ring-2 focus:ring-indigo-500 rounded px-2 py-1"
          placeholder="페이지 제목을 입력하세요"
        />
        
        {/* Device View Toggle */}
        <div className="flex items-center space-x-1 bg-gray-100 rounded-lg p-1">
          <Button
            variant={deviceView === 'desktop' ? 'default' : 'ghost'}
            size="sm"
            onClick={() => setDeviceView('desktop')}
            className="h-8 px-3"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
            </svg>
          </Button>
          <Button
            variant={deviceView === 'tablet' ? 'default' : 'ghost'}
            size="sm"
            onClick={() => setDeviceView('tablet')}
            className="h-8 px-3"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z" />
            </svg>
          </Button>
          <Button
            variant={deviceView === 'mobile' ? 'default' : 'ghost'}
            size="sm"
            onClick={() => setDeviceView('mobile')}
            className="h-8 px-3"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z" />
            </svg>
          </Button>
        </div>
      </div>

      {/* Center Section - Undo/Redo */}
      <div className="flex items-center space-x-2">
        <Button
          variant="outline"
          size="sm"
          onClick={undo}
          disabled={!canUndo}
          className="h-8 px-3"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h10a8 8 0 018 8v2M3 10l6 6m-6-6l6-6" />
          </svg>
        </Button>
        <Button
          variant="outline"
          size="sm"
          onClick={redo}
          disabled={!canRedo}
          className="h-8 px-3"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 10h-10a8 8 0 00-8 8v2M21 10l-6 6m6-6l-6-6" />
          </svg>
        </Button>
      </div>

      {/* Right Section */}
      <div className="flex items-center space-x-3">
        <Button variant="outline" size="sm" onClick={handleSave}>
          <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7H5a2 2 0 00-2 2v9a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-3m-1 4l-3 3m0 0l-3-3m3 3V4" />
          </svg>
          저장
        </Button>
        
        <Button variant="outline" size="sm" onClick={handlePreview}>
          <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
          </svg>
          미리보기
        </Button>
        
        <Button size="sm" onClick={handlePublish} disabled={isDeploying}>
          {isDeploying ? (
            <>
              <svg className="animate-spin w-4 h-4 mr-2" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              배포 중...
            </>
          ) : (
            <>
              <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
              </svg>
              배포
            </>
          )}
        </Button>
      </div>
    </header>
  );
} 