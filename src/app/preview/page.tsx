/**
 * File name: page.tsx
 * Purpose: Preview page for displaying built pages in a realistic website view
 * Function Summary:
 * 1. Render components from builder in a realistic preview
 * 2. Support responsive design and device simulation
 * 3. Provide navigation and export options
 * 4. Handle loading states and empty states
 * 
 * Author: AI Assistant
 * Version: 1.0.0
 * Created: 2025-01-31
 * Last modified: 2025-01-31 (preview functionality)
 */

"use client";

import { useEffect, useState } from "react";
import { useBuilderStore } from "@/lib/store/builder.store";
import { ComponentRenderer } from "@/components/builder/ComponentRenderer";
import { Button } from "@/components/ui/button";
import { 
  ArrowLeft, 
  Printer, 
  Download, 
  Smartphone, 
  Tablet, 
  Monitor,
  Eye,
  EyeOff,
  Share2
} from "lucide-react";

// Device preview types
type DeviceView = 'desktop' | 'tablet' | 'mobile';

export default function PreviewPage() {
  const { components, loadPage } = useBuilderStore();
  const [isLoading, setIsLoading] = useState(true);
  const [deviceView, setDeviceView] = useState<DeviceView>('desktop');
  const [showPreviewHeader, setShowPreviewHeader] = useState(true);
  const [isFullscreen, setIsFullscreen] = useState(false);

  useEffect(() => {
    // Load saved data from localStorage
    const savedData = localStorage.getItem('builder-storage');
    if (savedData) {
      try {
        const parsed = JSON.parse(savedData);
        if (parsed.components && Array.isArray(parsed.components)) {
          loadPage(parsed.components);
        }
      } catch (error) {
        console.error('Failed to load preview data:', error);
      }
    }
    setIsLoading(false);
  }, [loadPage]);

  // Device view classes
  const deviceClasses = {
    desktop: 'max-w-none',
    tablet: 'max-w-2xl mx-auto',
    mobile: 'max-w-sm mx-auto'
  };

  // Toggle fullscreen mode
  const toggleFullscreen = () => {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen();
      setIsFullscreen(true);
    } else {
      document.exitFullscreen();
      setIsFullscreen(false);
    }
  };

  // Print page
  const handlePrint = () => {
    window.print();
  };

  // Share page (copy URL)
  const handleShare = async () => {
    try {
      await navigator.clipboard.writeText(window.location.href);
      alert('URL copied to clipboard!');
    } catch (error) {
      console.error('Failed to copy URL:', error);
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading preview...</p>
        </div>
      </div>
    );
  }

  if (components.length === 0) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center max-w-md mx-auto px-4">
          <div className="w-16 h-16 bg-gray-200 rounded-full flex items-center justify-center mx-auto mb-4">
            <Eye className="w-8 h-8 text-gray-400" />
          </div>
          <h2 className="text-xl font-semibold text-gray-900 mb-2">Empty Page</h2>
          <p className="text-gray-600 mb-6">
            No components have been added yet. Start building your page in the builder.
          </p>
          <div className="space-y-3">
            <Button asChild className="w-full">
              <a href="/builder">
                <ArrowLeft className="w-4 h-4 mr-2" />
                Go to Builder
              </a>
            </Button>
            <Button variant="outline" asChild className="w-full">
              <a href="/templates">
                Browse Templates
              </a>
            </Button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Preview Header */}
      {showPreviewHeader && !isFullscreen && (
        <div className="bg-white border-b border-gray-200 px-6 py-4 shadow-sm">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-6">
              <Button variant="ghost" size="sm" asChild>
                <a href="/builder">
                  <ArrowLeft className="w-4 h-4 mr-2" />
                  Back to Builder
                </a>
              </Button>
              
              <div className="flex items-center space-x-2">
                <span className="text-sm font-medium text-gray-700">Preview:</span>
                <div className="flex bg-gray-100 rounded-lg p-1">
                  <button
                    onClick={() => setDeviceView('desktop')}
                    className={`px-3 py-1 rounded-md text-xs font-medium transition-colors ${
                      deviceView === 'desktop' 
                        ? 'bg-white text-gray-900 shadow-sm' 
                        : 'text-gray-600 hover:text-gray-900'
                    }`}
                  >
                    <Monitor className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => setDeviceView('tablet')}
                    className={`px-3 py-1 rounded-md text-xs font-medium transition-colors ${
                      deviceView === 'tablet' 
                        ? 'bg-white text-gray-900 shadow-sm' 
                        : 'text-gray-600 hover:text-gray-900'
                    }`}
                  >
                    <Tablet className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => setDeviceView('mobile')}
                    className={`px-3 py-1 rounded-md text-xs font-medium transition-colors ${
                      deviceView === 'mobile' 
                        ? 'bg-white text-gray-900 shadow-sm' 
                        : 'text-gray-600 hover:text-gray-900'
                    }`}
                  >
                    <Smartphone className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>

            <div className="flex items-center space-x-2">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setShowPreviewHeader(false)}
              >
                <EyeOff className="w-4 h-4 mr-2" />
                Hide Header
              </Button>
              
              <Button
                variant="ghost"
                size="sm"
                onClick={handleShare}
              >
                <Share2 className="w-4 h-4 mr-2" />
                Share
              </Button>
              
              <Button
                variant="ghost"
                size="sm"
                onClick={handlePrint}
              >
                <Printer className="w-4 h-4 mr-2" />
                Print
              </Button>
              
              <Button
                variant="ghost"
                size="sm"
                onClick={toggleFullscreen}
              >
                <Download className="w-4 h-4 mr-2" />
                Fullscreen
              </Button>
            </div>
          </div>
        </div>
      )}

      {/* Show Header Button (when hidden) */}
      {!showPreviewHeader && !isFullscreen && (
        <div className="fixed top-4 right-4 z-50">
          <Button
            variant="secondary"
            size="sm"
            onClick={() => setShowPreviewHeader(true)}
            className="shadow-lg"
          >
            <Eye className="w-4 h-4 mr-2" />
            Show Header
          </Button>
        </div>
      )}

      {/* Preview Content */}
      <div className={`transition-all duration-300 ${deviceClasses[deviceView]}`}>
        <div className="bg-white min-h-screen shadow-lg">
          {components.length === 0 ? (
            <div className="flex items-center justify-center min-h-screen">
              <div className="text-center">
                <Eye className="w-16 h-16 mx-auto text-gray-400 mb-4" />
                <h2 className="text-xl font-semibold text-gray-900 mb-2">
                  No Components
                </h2>
                <p className="text-gray-600 mb-4">
                  Add some components to see your preview here.
                </p>
                <Button asChild>
                  <a href="/builder">Go to Builder</a>
                </Button>
              </div>
            </div>
          ) : (
            <div className="relative">
              {components.map((component, index) => (
                <ComponentRenderer
                  key={component.id}
                  component={component}
                  index={index}
                  isSelected={false}
                  onSelect={() => {}}
                  isPreview={true}
                />
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Print Styles */}
      <style jsx global>{`
        @media print {
          .preview-header {
            display: none !important;
          }
        }
      `}</style>
    </div>
  );
} 