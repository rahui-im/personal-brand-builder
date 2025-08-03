/**
 * File name: page.tsx
 * Purpose: Blog contents page inspired by jincoding.com/contents/
 * Function Summary:
 * 1. Display blog posts in a grid layout
 * 2. Category tabs for filtering
 * 3. Search functionality
 * 
 * Author: AI Assistant
 * Version: 1.0.0
 * Created: 2025-02-03
 */

"use client";

import { useState } from "react";
import Link from "next/link";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search, Calendar, Clock, User, Eye, MessageSquare, Heart } from "lucide-react";

interface BlogPost {
  id: number;
  title: string;
  description: string;
  category: string;
  date: string;
  readTime: string;
  author: string;
  views: number;
  likes: number;
  comments: number;
  thumbnail: string;
  featured?: boolean;
}

const blogPosts: BlogPost[] = [
  {
    id: 1,
    title: "[강의후기] 연구원을 위한 GenAI 활용 (현대자동차)",
    description: "현대자동차 연구원분들을 대상으로 진행한 GenAI 활용 교육 후기입니다.",
    category: "기업 강의",
    date: "25년 02월 24일",
    readTime: "5분",
    author: "찐코딩",
    views: 1234,
    likes: 45,
    comments: 12,
    thumbnail: "https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?w=400&h=250&fit=crop",
    featured: true
  },
  {
    id: 2,
    title: "[강의후기] 연구원과 행정직군을 위한 생성형 AI 업무 활용 (경제인문사회연구소(NRC))",
    description: "경제인문사회연구소에서 진행한 AI 활용 교육 사례를 공유합니다.",
    category: "기업 강의",
    date: "25년 02월 14일",
    readTime: "7분",
    author: "찐코딩",
    views: 892,
    likes: 32,
    comments: 8,
    thumbnail: "https://images.unsplash.com/photo-1517180102446-f3ece451e9d8?w=400&h=250&fit=crop",
  },
  {
    id: 3,
    title: "[강의후기] SK 아카데미 (신입 입원 AI 교육과정) (SK Academy)",
    description: "SK 신입사원을 위한 AI 기초 교육 과정을 진행했습니다.",
    category: "기업 강의",
    date: "25년 01월 14일",
    readTime: "6분",
    author: "찐코딩",
    views: 2156,
    likes: 67,
    comments: 23,
    thumbnail: "https://images.unsplash.com/photo-1552664730-d307ca884978?w=400&h=250&fit=crop",
  },
  {
    id: 4,
    title: "[강의후기] MAKE로 만드는 보고서 자동화 (SKNetworks)",
    description: "MAKE를 활용한 업무 자동화 프로세스 구축 사례입니다.",
    category: "기업 강의",
    date: "24년 10월 18일",
    readTime: "10분",
    author: "찐코딩",
    views: 3421,
    likes: 89,
    comments: 34,
    thumbnail: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=400&h=250&fit=crop",
  },
  {
    id: 5,
    title: "[강의후기] 생성AI와 노코딩을 만드는 나만의 최신 뉴스 정리 서비스 (SKT)",
    description: "생성AI와 노코딩 툴을 활용하여 맞춤형 뉴스 서비스를 만드는 방법을 소개합니다.",
    category: "기업 강의",
    date: "24년 07월 31일",
    readTime: "8분",
    author: "찐코딩",
    views: 1876,
    likes: 54,
    comments: 19,
    thumbnail: "https://images.unsplash.com/photo-1504711434969-e33886168f5c?w=400&h=250&fit=crop",
  },
  {
    id: 6,
    title: "[강의후기] HuggingFace를 이용한 LLM 모델 Fine-tuning (SKT)",
    description: "HuggingFace 플랫폼을 활용한 대규모 언어 모델 파인튜닝 실습 후기입니다.",
    category: "기업 강의",
    date: "24년 04월 29일",
    readTime: "12분",
    author: "찐코딩",
    views: 4532,
    likes: 126,
    comments: 45,
    thumbnail: "https://images.unsplash.com/photo-1677442136019-21780ecad995?w=400&h=250&fit=crop",
  },
  {
    id: 7,
    title: "[강의후기] OpenAI API를 사용한 생성AI 서비스 개발 (SKT)",
    description: "OpenAI API를 활용하여 실무에 적용 가능한 AI 서비스를 개발하는 과정을 다룹니다.",
    category: "기업 강의",
    date: "24년 04월 23일",
    readTime: "9분",
    author: "찐코딩",
    views: 3214,
    likes: 98,
    comments: 37,
    thumbnail: "https://images.unsplash.com/photo-1655720828018-edd2daec9349?w=400&h=250&fit=crop",
  },
  {
    id: 8,
    title: "[강의후기] HuggingFace를 이용한 LLM모델의 활용 (SKT)",
    description: "HuggingFace 생태계를 활용한 다양한 LLM 모델 활용 사례를 소개합니다.",
    category: "기업 강의",
    date: "24년 03월 26일",
    readTime: "11분",
    author: "찐코딩",
    views: 2876,
    likes: 87,
    comments: 29,
    thumbnail: "https://images.unsplash.com/photo-1620712943543-bcc4688e7485?w=400&h=250&fit=crop",
  }
];

const categories = [
  { id: "all", name: "전체", count: 8 },
  { id: "corp", name: "기업 강의", count: 8 },
  { id: "online", name: "온라인 강의", count: 0 },
  { id: "automation", name: "자동화 시나리오", count: 0 },
  { id: "ebook", name: "전자책", count: 0 },
];

export default function BlogPage() {
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");

  const filteredPosts = blogPosts.filter(post => {
    const matchesCategory = selectedCategory === "all" || 
      (selectedCategory === "corp" && post.category === "기업 강의");
    const matchesSearch = post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      post.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

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
              <Link href="/blog" className="text-[#84C46E] font-medium">
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

      {/* Hero Section */}
      <section className="bg-white py-12">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl font-bold text-[#3C828F] mb-4">찐코딩 AI 블로그</h1>
            <p className="text-lg text-[#79A991] mb-8">
              찐코딩이 전하는 AI 이야기 ✏️
            </p>
            
            {/* Search Bar */}
            <div className="relative max-w-2xl mx-auto">
              <Input
                type="text"
                placeholder="검색어를 입력하세요..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-12 pr-4 py-6 text-lg border-2 border-gray-300 rounded-lg focus:border-[#84C46E] focus:outline-none"
              />
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 w-6 h-6 text-gray-400" />
            </div>
          </div>
        </div>
      </section>

      {/* Category Tabs */}
      <section className="bg-white border-b border-gray-200">
        <div className="container mx-auto px-4">
          <div className="flex overflow-x-auto py-4 gap-2">
            {categories.map((category) => (
              <Button
                key={category.id}
                variant={selectedCategory === category.id ? "default" : "outline"}
                className={`flex-shrink-0 ${
                  selectedCategory === category.id
                    ? "bg-[#3C828F] text-white hover:bg-[#2A6070]"
                    : "border-gray-300 text-gray-700 hover:border-[#84C46E] hover:text-[#84C46E]"
                }`}
                onClick={() => setSelectedCategory(category.id)}
              >
                {category.name} {category.count > 0 && `(${category.count})`}
              </Button>
            ))}
          </div>
        </div>
      </section>

      {/* Blog Posts Grid */}
      <section className="py-12">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredPosts.map((post) => (
              <Card key={post.id} className="hover:shadow-lg transition-shadow duration-300 overflow-hidden">
                <Link href={`/blog/${post.id}`}>
                  <div className="relative h-48 overflow-hidden">
                    <img
                      src={post.thumbnail}
                      alt={post.title}
                      className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                    />
                    {post.featured && (
                      <span className="absolute top-2 left-2 bg-[#84C46E] text-white text-xs px-2 py-1 rounded">
                        Featured
                      </span>
                    )}
                    <span className="absolute top-2 right-2 bg-[#3C828F] text-white text-xs px-2 py-1 rounded">
                      {post.category}
                    </span>
                  </div>
                  <CardHeader className="pb-3">
                    <CardTitle className="text-base line-clamp-2 text-[#3C828F] hover:text-[#84C46E] transition-colors">
                      {post.title}
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <CardDescription className="text-sm line-clamp-2 mb-4">
                      {post.description}
                    </CardDescription>
                    
                    <div className="flex items-center justify-between text-xs text-gray-500 mb-3">
                      <span className="flex items-center">
                        <Calendar className="w-3 h-3 mr-1" />
                        {post.date}
                      </span>
                      <span className="flex items-center">
                        <Clock className="w-3 h-3 mr-1" />
                        {post.readTime}
                      </span>
                    </div>
                    
                    <div className="flex items-center justify-between text-xs text-gray-500">
                      <div className="flex items-center space-x-3">
                        <span className="flex items-center">
                          <Eye className="w-3 h-3 mr-1" />
                          {post.views.toLocaleString()}
                        </span>
                        <span className="flex items-center">
                          <Heart className="w-3 h-3 mr-1" />
                          {post.likes}
                        </span>
                        <span className="flex items-center">
                          <MessageSquare className="w-3 h-3 mr-1" />
                          {post.comments}
                        </span>
                      </div>
                    </div>
                  </CardContent>
                </Link>
              </Card>
            ))}
          </div>
          
          {filteredPosts.length === 0 && (
            <div className="text-center py-12">
              <p className="text-gray-500">검색 결과가 없습니다.</p>
            </div>
          )}
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-[#3C828F] text-white py-12">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center space-x-2 mb-4">
                <div className="w-10 h-10 bg-[#84C46E] rounded-lg flex items-center justify-center">
                  <span className="text-xl">✨</span>
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