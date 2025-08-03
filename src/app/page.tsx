/**
 * File name: page.tsx
 * Purpose: Personal Brand Builder homepage - jincoding style redesign
 * Function Summary:
 * 1. Modern, clean design inspired by jincoding.com
 * 2. Pretendard font and orange/navy color scheme
 * 3. Grid layout and card-based sections
 * 
 * Author: AI Assistant
 * Version: 2.0.0
 * Created: 2025-01-31
 * Last modified: 2025-02-03 (jincoding style redesign)
 */

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { 
  ArrowRight,
  CheckCircle,
  Sparkles,
  Zap,
  Palette,
  Code,
  Globe,
  Users,
  Star,
  BarChart,
  Lightbulb,
  Shield,
  Rocket
} from "lucide-react";

export default function Home() {
  return (
    <div className="min-h-screen bg-[#F7F0B5]">
      {/* Header */}
      <header className="bg-white sticky top-0 z-50">
        {/* Top Bar */}
        <div className="border-b border-gray-200">
          <div className="container mx-auto px-4 h-12 flex items-center justify-between">
            <Link href="/" className="flex items-center space-x-2">
              <Button variant="ghost" className="text-xl font-bold text-gray-800 hover:bg-transparent px-0">
                희희락락
              </Button>
              <span className="text-xs text-gray-600">기쁘고 즐거운 일만</span>
            </Link>
            
            <div className="flex items-center space-x-3">
              <Link href="/login" className="text-sm text-gray-600 hover:text-gray-800">
                로그인 / 회원가입
              </Link>
            </div>
          </div>
        </div>
        
        {/* Main Navigation */}
        <nav className="border-b border-gray-200">
          <div className="container mx-auto px-4 h-12 flex items-center justify-between">
            <div className="flex items-center space-x-6">
              <button className="flex items-center text-[#3C828F] hover:text-[#84C46E] transition-colors font-medium">
                <svg className="w-5 h-5 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                </svg>
                전체메뉴
              </button>
              <Link href="/jingoding" className="text-[#3C828F] hover:text-[#84C46E] transition-colors font-medium">
                소개
              </Link>
              <Link href="/online" className="text-[#3C828F] hover:text-[#84C46E] transition-colors font-medium">
                온라인 강의
              </Link>
              <Link href="/qna" className="text-[#3C828F] hover:text-[#84C46E] transition-colors font-medium">
                전자책
              </Link>
              <Link href="/blog" className="text-[#3C828F] hover:text-[#84C46E] transition-colors font-medium">
                블로그
              </Link>
              <Link href="/youtube" className="text-[#3C828F] hover:text-[#84C46E] transition-colors font-medium flex items-center">
                <svg className="w-5 h-5 mr-1 text-red-600" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
                </svg>
                YouTube
              </Link>
            </div>
            
            <div className="hidden lg:flex items-center space-x-4 text-sm">
              <Link href="/business" className="text-gray-600 hover:text-gray-800">문의</Link>
              <Link href="/brand" className="text-gray-600 hover:text-gray-800">새소식</Link>
              <Link href="/news" className="text-gray-600 hover:text-gray-800">뉴스레터</Link>
            </div>
          </div>
        </nav>
      </header>

      {/* Hero Section - Banner Slider */}
      <section className="bg-[#3C828F] py-12">
        <div className="container mx-auto px-4">
          <div className="bg-[#3C828F] rounded-lg overflow-hidden">
            <div className="flex items-center">
              {/* Left Content */}
              <div className="w-1/2 p-12 text-white">
                <h2 className="text-4xl font-bold mb-4">
                  생성형 AI 활용 강의
                </h2>
                <p className="text-lg mb-6 leading-relaxed">
                  찐코딩의 생성형 AI 활용 강의로<br />
                  번복 업무는 AI에 맡기고 나의 능력 개발에만 집중하세요.<br />
                  입무 성과는 높아지고 야근은 없어집니다.
                </p>
                
                {/* Slider Navigation */}
                <div className="flex items-center space-x-4">
                  <button className="w-10 h-10 rounded-full border border-white/30 flex items-center justify-center hover:bg-white/10 transition">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                    </svg>
                  </button>
                  <button className="w-10 h-10 rounded-full border border-white/30 flex items-center justify-center hover:bg-white/10 transition">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </button>
                </div>
              </div>
              
              {/* Right Image */}
              <div className="w-1/2 relative">
                <div className="bg-gradient-to-l from-[#3C828F] to-transparent absolute inset-y-0 left-0 w-20 z-10"></div>
                <img 
                  src="https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=800&h=400&fit=crop" 
                  alt="AI Express" 
                  className="w-full h-[400px] object-cover"
                />
                <div className="absolute bottom-4 right-4 bg-black/50 text-white px-3 py-1 rounded">
                  1 / 3
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      

      {/* Features Section - Horizontal Scroll */}
      <section className="py-16 bg-[#F5F5F5]">
        <div className="container mx-auto px-4">
          <div className="flex justify-center overflow-x-auto pb-4">
            <div className="flex space-x-6">
              {/* 찐코딩 */}
              <Card className="bg-white hover:shadow-lg transition-all duration-300 border-0 shadow-sm w-56 flex-shrink-0">
                <CardHeader className="p-6">
                  <div className="flex items-center mb-3">
                    <div className="w-12 h-12 bg-[#84C46E] rounded-xl flex items-center justify-center mr-3">
                      <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
                      </svg>
                    </div>
                    <div>
                      <CardTitle className="text-lg text-[#3C828F] mb-0">소개</CardTitle>
                    </div>
                  </div>
                  <CardDescription className="text-[#79A991] text-sm leading-relaxed">
                    누구나 쉽고 재밌게 인공 지능의 도움을 받을 수 있는 세상을 꿈꿉니다.
                  </CardDescription>
                </CardHeader>
              </Card>

              {/* 기업강의 */}
              <Card className="bg-white hover:shadow-lg transition-all duration-300 border-0 shadow-sm w-56 flex-shrink-0">
                <CardHeader className="p-6">
                  <div className="flex items-center mb-3">
                    <div className="w-12 h-12 bg-[#C0E8E6] rounded-xl flex items-center justify-center mr-3">
                      <svg className="w-6 h-6 text-[#3C828F]" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
                      </svg>
                    </div>
                    <div>
                      <CardTitle className="text-lg text-[#3C828F] mb-0">온라인 강의</CardTitle>
                    </div>
                  </div>
                  <CardDescription className="text-[#79A991] text-sm leading-relaxed">
                    임직원들의 AI 역량 강화를 통해 업무 생산성과 조직 경쟁력을 높여드립니다.
                  </CardDescription>
                </CardHeader>
              </Card>

              {/* 온라인 강의 */}
              <Card className="bg-white hover:shadow-lg transition-all duration-300 border-0 shadow-sm w-56 flex-shrink-0">
                <CardHeader className="p-6">
                  <div className="flex items-center mb-3">
                    <div className="w-12 h-12 bg-[#EEEAA2] rounded-xl flex items-center justify-center mr-3">
                      <Code className="w-6 h-6 text-[#3C828F]" />
                    </div>
                    <div>
                      <CardTitle className="text-lg text-[#3C828F] mb-0">전자책</CardTitle>
                    </div>
                  </div>
                  <CardDescription className="text-[#79A991] text-sm leading-relaxed">
                    시간과 장소의 제약 없이, 나만의 속도로 찐코딩 AI 활용법을 배워보세요.
                  </CardDescription>
                </CardHeader>
              </Card>

              {/* 자동화 시나리오 */}
              <Card className="bg-white hover:shadow-lg transition-all duration-300 border-0 shadow-sm w-56 flex-shrink-0">
                <CardHeader className="p-6">
                  <div className="flex items-center mb-3">
                    <div className="w-12 h-12 bg-[#84C46E] rounded-xl flex items-center justify-center mr-3">
                      <Globe className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <CardTitle className="text-lg text-[#3C828F] mb-0">블로그</CardTitle>
                    </div>
                  </div>
                  <CardDescription className="text-[#79A991] text-sm leading-relaxed">
                    반복되는 업무는 알아서! AI에게 맡기고, 더 가치 있는 일에 집중하세요.
                  </CardDescription>
                </CardHeader>
              </Card>

              {/* 전자책 */}
              <Card className="bg-white hover:shadow-lg transition-all duration-300 border-0 shadow-sm w-56 flex-shrink-0">
                <CardHeader className="p-6">
                  <div className="flex items-center mb-3">
                    <div className="w-12 h-12 bg-[#A989BB] rounded-xl flex items-center justify-center mr-3">
                      <BarChart className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <CardTitle className="text-lg text-[#3C828F] mb-0">
                        YouTube
                        <span className="ml-2 text-xs bg-[#84C46E] text-white px-2 py-1 rounded">기간할인</span>
                      </CardTitle>
                    </div>
                  </div>
                  <CardDescription className="text-[#79A991] text-sm leading-relaxed">
                    AI의 핵심 개념부터 실전 활용까지, 체계적으로 정리된 가이드북입니다.
                  </CardDescription>
                </CardHeader>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* How it works */}
      <section className="py-20 bg-[#C0E8E6]">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-[#3C828F] mb-4">
              어떻게 작동하나요?
            </h2>
            <p className="text-lg text-[#3C828F] max-w-2xl mx-auto">
              단 3단계로 나만의 개인 브랜드 웹사이트를 만들어보세요
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            <div className="text-center">
              <div className="w-20 h-20 bg-[#EEEAA2] rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-3xl font-bold text-[#3C828F]">1</span>
              </div>
              <h3 className="text-xl font-bold text-[#3C828F] mb-2">템플릿 선택</h3>
              <p className="text-[#79A991]">
                다양한 템플릿 중에서 당신의 스타일에 맞는 것을 선택하세요
              </p>
            </div>
            
            <div className="text-center">
              <div className="w-20 h-20 bg-[#C0E8E6] rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-3xl font-bold text-[#3C828F]">2</span>
              </div>
              <h3 className="text-xl font-bold text-[#3C828F] mb-2">내용 수정</h3>
              <p className="text-[#79A991]">
                드래그 앤 드롭으로 쉽게 내용을 수정하고 이미지를 추가하세요
              </p>
            </div>
            
            <div className="text-center">
              <div className="w-20 h-20 bg-[#6BBCB3] rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-3xl font-bold text-white">3</span>
              </div>
              <h3 className="text-xl font-bold text-[#3C828F] mb-2">게시하기</h3>
              <p className="text-[#79A991]">
                버튼 하나로 당신의 웹사이트를 전 세계에 공개하세요
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-[#3C828F] text-white py-12">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center space-x-2 mb-4">
                <div className="w-10 h-10 bg-[#84C46E] rounded-lg flex items-center justify-center">
                  <Sparkles className="w-6 h-6 text-white" />
                </div>
                <span className="text-xl font-bold">희희락락</span>
              </div>
              <p className="text-gray-300">
                코딩 없이 만드는 나만의 개인 브랜드 웹사이트
              </p>
            </div>
            
            <div>
              <h3 className="font-semibold mb-4">제품</h3>
              <ul className="space-y-2 text-gray-300">
                <li><Link href="/templates" className="hover:text-white transition-colors">템플릿</Link></li>
                <li><Link href="/pricing" className="hover:text-white transition-colors">가격</Link></li>
                <li><Link href="/builder" className="hover:text-white transition-colors">빌더</Link></li>
                <li><Link href="/features" className="hover:text-white transition-colors">기능</Link></li>
              </ul>
            </div>
            
            <div>
              <h3 className="font-semibold mb-4">지원</h3>
              <ul className="space-y-2 text-gray-300">
                <li><Link href="/help" className="hover:text-white transition-colors">도움말 센터</Link></li>
                <li><Link href="/contact" className="hover:text-white transition-colors">문의하기</Link></li>
                <li><Link href="/docs" className="hover:text-white transition-colors">문서</Link></li>
                <li><Link href="/tutorials" className="hover:text-white transition-colors">튜토리얼</Link></li>
              </ul>
            </div>
            
            <div>
              <h3 className="font-semibold mb-4">회사</h3>
              <ul className="space-y-2 text-gray-300">
                <li><Link href="/about" className="hover:text-white transition-colors">회사소개</Link></li>
                <li><Link href="/blog" className="hover:text-white transition-colors">블로그</Link></li>
                <li><Link href="/careers" className="hover:text-white transition-colors">채용</Link></li>
                <li><Link href="/privacy" className="hover:text-white transition-colors">개인정보처리방침</Link></li>
              </ul>
            </div>
          </div>
          
          <div className="border-t border-gray-600 mt-8 pt-8 text-center text-gray-300">
            <p>&copy; 2025 희희락락. 모든 권리 보유.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}