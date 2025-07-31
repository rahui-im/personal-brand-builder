/**
 * File name: ComponentRenderer.tsx
 * Purpose: 캔버스에서 컴포넌트를 렌더링하는 컴포넌트
 * Function Summary:
 * 1. 컴포넌트 타입에 따른 렌더링
 * 2. 실제 컴포넌트 블록 사용
 * 3. 실시간 미리보기
 * 
 * Author: Personal Brand Builder Team
 * Version: 1.0.0
 * Created: 2025-07-31
 * Last modified: 2025-07-31 (실제 컴포넌트 블록 사용)
 */

"use client";

import { DraggableComponent } from "@/lib/store/builder.store";
import { HeroBlock } from "@/components/blocks/hero/HeroBlock";
import { AboutBlock } from "@/components/blocks/about/AboutBlock";
import { PortfolioBlock } from "@/components/blocks/portfolio/PortfolioBlock";
import { ContactBlock } from "@/components/blocks/contact/ContactBlock";
import { TestimonialBlock } from "@/components/blocks/testimonial/TestimonialBlock";
import { PricingBlock } from "@/components/blocks/pricing/PricingBlock";
import { BlogBlock } from "@/components/blocks/blog/BlogBlock";
import { FooterBlock } from "@/components/blocks/footer/FooterBlock";

interface ComponentRendererProps {
  component: DraggableComponent;
  isSelected?: boolean;
}

export function ComponentRenderer({ component, isSelected = false }: ComponentRendererProps) {
  const renderComponent = () => {
    switch (component.type) {
      case 'hero':
        return <HeroBlock {...component.props} />;
      case 'about':
        return <AboutBlock {...component.props} />;
      case 'portfolio':
        return <PortfolioBlock {...component.props} />;
      case 'contact':
        return <ContactBlock {...component.props} />;
      case 'testimonial':
        return <TestimonialBlock {...component.props} />;
      case 'pricing':
        return <PricingBlock {...component.props} />;
      case 'blog':
        return <BlogBlock {...component.props} />;
      case 'footer':
        return <FooterBlock {...component.props} />;
      default:
        return <DefaultComponent component={component} />;
    }
  };

  return (
    <div className={`w-full ${isSelected ? 'ring-2 ring-blue-500 ring-offset-2' : ''}`}>
      {renderComponent()}
    </div>
  );
}

// Default Component for unknown types
function DefaultComponent({ component }: { component: DraggableComponent }) {
  return (
    <div className="p-8 bg-gray-100 border-2 border-dashed border-gray-300 rounded-lg text-center">
      <h3 className="text-lg font-semibold text-gray-700 mb-2">
        {component.type.charAt(0).toUpperCase() + component.type.slice(1)} Component
      </h3>
      <p className="text-gray-500 text-sm">
        This component type is not yet implemented.
      </p>
      <div className="mt-4 text-xs text-gray-400">
        Props: {JSON.stringify(component.props, null, 2)}
      </div>
    </div>
  );
} 