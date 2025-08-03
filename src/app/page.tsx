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
      <header className="bg-white border-b border-gray-200 sticky top-0 z-50">
        <nav className="container mx-auto px-4 h-16 flex items-center justify-between">
          <div className="flex items-center space-x-8">
            <Link href="/" className="flex items-center space-x-2">
              <Button variant="ghost" className="text-2xl font-bold text-gray-800 hover:bg-transparent px-0">
                희희락락
              </Button>
              <span className="text-sm text-gray-600">기쁘고 즐거운 일만</span>
            </Link>
            
            <div className="hidden md:flex items-center space-x-6">
              <button className="flex items-center text-[#3C828F] hover:text-[#84C46E] transition-colors font-medium">
                <svg className="w-5 h-5 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                </svg>
                전체메뉴
              </button>
              <Link href="/jingoding" className="text-[#3C828F] hover:text-[#84C46E] transition-colors font-medium">
                찐코딩 소개
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
            </div>
          </div>

          <div className="flex items-center space-x-6">
            <div className="hidden lg:flex items-center space-x-4 text-sm">
              <Link href="/business" className="text-gray-600 hover:text-gray-800">기업문의</Link>
              <Link href="/brand" className="text-gray-600 hover:text-gray-800">세소식</Link>
              <Link href="/news" className="text-gray-600 hover:text-gray-800">뉴스레터</Link>
              <Link href="/youtube" className="text-gray-600 hover:text-gray-800 flex items-center">
                <svg className="w-4 h-4 mr-1 text-red-600" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
                </svg>
                찐코딩
              </Link>
            </div>
            
            <div className="flex items-center space-x-3">
              <Link href="/login" className="text-sm text-gray-600 hover:text-gray-800">
                로그인 / 회원가입
              </Link>
            </div>
          </div>
        </nav>
      </header>

      {/* Hero Section */}
      <section className="bg-[#C0E8E6] py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            
            <h1 className="text-5xl md:text-6xl font-bold text-[#3C828F] mb-6 tracking-tight">
              나만의 개인 브랜드를
              <br />
              <span className="text-[#84C46E]">쉽고 빠르게</span> 만들어보세요
            </h1>
            
            <p className="text-xl text-[#3C828F] mb-10 leading-relaxed">
              코딩 없이 드래그 앤 드롭으로 전문적인 웹사이트를 만들 수 있습니다.
              <br />
              지금 바로 시작하고 5분 안에 당신의 브랜드를 온라인에 공개하세요.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
              <Button size="lg" className="bg-[#84C46E] hover:bg-[#79A991] text-white text-lg px-8 py-6" asChild>
                <Link href="/builder">
                  무료로 시작하기
                  <ArrowRight className="w-5 h-5 ml-2" />
                </Link>
              </Button>
              <Button variant="outline" size="lg" className="border-[#3C828F] text-[#3C828F] hover:bg-[#3C828F] hover:text-white text-lg px-8 py-6" asChild>
                <Link href="/demo">데모 보기</Link>
              </Button>
            </div>

          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section className="py-20 bg-[#F7F0B5]">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-[#3C828F] mb-4">
              왜 희희락락을 선택해야 할까요?
            </h2>
            <p className="text-lg text-[#3C828F] max-w-2xl mx-auto">
              개인 브랜드 웹사이트를 만드는 가장 쉽고 빠른 방법
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            <Card className="bg-white hover:shadow-xl transition-all duration-300 border-0 shadow-md">
              <CardHeader className="p-6">
                <div className="w-14 h-14 bg-[#C0E8E6] rounded-xl flex items-center justify-center mb-4">
                  <Zap className="w-7 h-7 text-[#84C46E]" />
                </div>
                <CardTitle className="text-xl text-[#3C828F]">빛처럼 빠른 제작</CardTitle>
                <CardDescription className="text-[#79A991] mt-2">
                  템플릿을 선택하고 내용을 수정하면 5분 안에 웹사이트가 완성됩니다
                </CardDescription>
              </CardHeader>
            </Card>
            
            <Card className="bg-white hover:shadow-xl transition-all duration-300 border-0 shadow-md">
              <CardHeader className="p-6">
                <div className="w-14 h-14 bg-[#EEEAA2] rounded-xl flex items-center justify-center mb-4">
                  <Code className="w-7 h-7 text-[#3C828F]" />
                </div>
                <CardTitle className="text-xl text-[#3C828F]">코딩 없이 제작</CardTitle>
                <CardDescription className="text-[#79A991] mt-2">
                  드래그 앤 드롭으로 누구나 쉽게 전문적인 웹사이트를 만들 수 있습니다
                </CardDescription>
              </CardHeader>
            </Card>
            
            <Card className="bg-white hover:shadow-xl transition-all duration-300 border-0 shadow-md">
              <CardHeader className="p-6">
                <div className="w-14 h-14 bg-[#C0E8E6] rounded-xl flex items-center justify-center mb-4">
                  <Palette className="w-7 h-7 text-[#84C46E]" />
                </div>
                <CardTitle className="text-xl text-[#3C828F]">아름다운 디자인</CardTitle>
                <CardDescription className="text-[#79A991] mt-2">
                  전문 디자이너가 만든 50개 이상의 템플릿으로 시작하세요
                </CardDescription>
              </CardHeader>
            </Card>
            
            <Card className="bg-white hover:shadow-xl transition-all duration-300 border-0 shadow-md">
              <CardHeader className="p-6">
                <div className="w-14 h-14 bg-[#EEEAA2] rounded-xl flex items-center justify-center mb-4">
                  <Globe className="w-7 h-7 text-[#3C828F]" />
                </div>
                <CardTitle className="text-xl text-[#3C828F]">즉시 배포</CardTitle>
                <CardDescription className="text-[#79A991] mt-2">
                  버튼 하나로 전 세계에 당신의 웹사이트를 공개할 수 있습니다
                </CardDescription>
              </CardHeader>
            </Card>
            
            <Card className="bg-white hover:shadow-xl transition-all duration-300 border-0 shadow-md">
              <CardHeader className="p-6">
                <div className="w-14 h-14 bg-[#C0E8E6] rounded-xl flex items-center justify-center mb-4">
                  <Shield className="w-7 h-7 text-[#84C46E]" />
                </div>
                <CardTitle className="text-xl text-[#3C828F]">보안 & SEO</CardTitle>
                <CardDescription className="text-[#79A991] mt-2">
                  SSL 인증서와 SEO 최적화로 안전하고 검색 가능한 웹사이트
                </CardDescription>
              </CardHeader>
            </Card>
            
            <Card className="bg-white hover:shadow-xl transition-all duration-300 border-0 shadow-md">
              <CardHeader className="p-6">
                <div className="w-14 h-14 bg-[#EEEAA2] rounded-xl flex items-center justify-center mb-4">
                  <Users className="w-7 h-7 text-[#3C828F]" />
                </div>
                <CardTitle className="text-xl text-[#3C828F]">24/7 지원</CardTitle>
                <CardDescription className="text-[#79A991] mt-2">
                  언제든지 도움이 필요하면 전문가 팀이 지원해드립니다
                </CardDescription>
              </CardHeader>
            </Card>
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

      {/* CTA Section */}
      <section className="py-20 bg-[#F7F0B5]">
        <div className="container mx-auto px-4">
          <div className="bg-gradient-to-r from-[#84C46E] to-[#6BBCB3] rounded-2xl p-12 text-center text-white">
            <h2 className="text-4xl font-bold mb-4">
              지금 시작할 준비가 되셨나요?
            </h2>
            <p className="text-xl mb-8 opacity-90 max-w-2xl mx-auto">
              5분 안에 당신만의 개인 브랜드 웹사이트를 만들어보세요.
              <br />
              신용카드 없이 무료로 시작할 수 있습니다.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" className="bg-white text-[#84C46E] hover:bg-gray-100 text-lg px-8 py-6" asChild>
                <Link href="/builder">
                  무료로 시작하기
                  <ArrowRight className="w-5 h-5 ml-2" />
                </Link>
              </Button>
              <Button size="lg" variant="outline" className="text-white border-white/30 hover:bg-white/10 text-lg px-8 py-6" asChild>
                <Link href="/templates">템플릿 둘러보기</Link>
              </Button>
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