/**
 * File name: page.tsx
 * Purpose: Template gallery page for browsing and selecting page templates
 * Function Summary:
 * 1. Display various template options with previews
 * 2. Support category filtering and search
 * 3. Provide template preview and selection
 * 4. Load templates into builder
 * 
 * Author: AI Assistant
 * Version: 1.0.0
 * Created: 2025-01-31
 * Last modified: 2025-01-31 (template gallery implementation)
 */

"use client";

import { useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { 
  Search, 
  Eye, 
  Play, 
  Star,
  Palette,
  Briefcase,
  User,
  Building,
  Sparkles
} from "lucide-react";
import { useBuilderStore } from "@/lib/store/builder.store";

interface Template {
  id: string;
  name: string;
  description: string;
  category: string;
  imageUrl: string;
  components: any[];
  tags: string[];
  difficulty: 'beginner' | 'intermediate' | 'advanced';
  rating: number;
  downloads: number;
}

const templates: Template[] = [
  {
    id: "portfolio-basic",
    name: "Basic Portfolio",
    description: "Clean and simple portfolio template for developers and designers",
    category: "portfolio",
    imageUrl: "https://images.unsplash.com/photo-1461749280684-dccba630e2f6?w=400&h=300&fit=crop",
    components: [
      { 
        type: "hero", 
        props: { 
          title: "Hello, I'm [Your Name]", 
          subtitle: "Web Developer & Designer",
          backgroundType: "gradient",
          showSocialLinks: true,
          socialLinks: {
            github: "https://github.com",
            linkedin: "https://linkedin.com",
            twitter: "https://twitter.com"
          }
        } 
      },
      { 
        type: "about", 
        props: { 
          title: "About Me", 
          content: "I'm a passionate web developer with expertise in modern technologies. I love creating beautiful and functional websites that solve real problems.",
          layout: "left-image",
          showSkills: true,
          skills: [
            { name: "React", level: 90, color: "#61dafb" },
            { name: "TypeScript", level: 85, color: "#3178c6" },
            { name: "Node.js", level: 80, color: "#339933" },
            { name: "UI/UX Design", level: 75, color: "#ff6b6b" }
          ]
        } 
      },
      { 
        type: "portfolio", 
        props: { 
          title: "My Projects",
          layout: "grid",
          showFilters: true,
          filters: ["All", "Web", "Mobile", "Design"]
        } 
      },
      { 
        type: "contact", 
        props: { 
          title: "Get in Touch",
          layout: "split",
          showForm: true,
          formFields: ["name", "email", "message"]
        } 
      }
    ],
    tags: ["portfolio", "developer", "minimal"],
    difficulty: "beginner",
    rating: 4.8,
    downloads: 1250
  },
  {
    id: "freelancer-pro",
    name: "Freelancer Pro",
    description: "Professional template for freelancers and consultants",
    category: "freelancer",
    imageUrl: "https://images.unsplash.com/photo-1551434678-e076c223a692?w=400&h=300&fit=crop",
    components: [
      { 
        type: "hero", 
        props: { 
          title: "Professional Freelancer", 
          subtitle: "High-quality services delivered on time",
          backgroundType: "image",
          backgroundImage: "https://images.unsplash.com/photo-1551434678-e076c223a692?w=1200&h=600&fit=crop"
        } 
      },
      { 
        type: "about", 
        props: { 
          title: "About My Services", 
          content: "With years of experience in the industry, I provide top-notch services to clients worldwide. My expertise spans across multiple domains.",
          layout: "right-image"
        } 
      },
      { 
        type: "portfolio", 
        props: { 
          title: "Recent Work",
          layout: "masonry",
          showProjectDescriptions: true
        } 
      },
      { 
        type: "contact", 
        props: { 
          title: "Let's Work Together",
          layout: "centered",
          showContactInfo: true,
          contactInfo: {
            email: "hello@example.com",
            phone: "+1 (555) 123-4567",
            address: "San Francisco, CA"
          }
        } 
      }
    ],
    tags: ["freelancer", "professional", "services"],
    difficulty: "intermediate",
    rating: 4.9,
    downloads: 890
  },
  {
    id: "creative-portfolio",
    name: "Creative Portfolio",
    description: "Bold and artistic template for creative professionals",
    category: "creative",
    imageUrl: "https://images.unsplash.com/photo-1561070791-2526d30994b5?w=400&h=300&fit=crop",
    components: [
      { 
        type: "hero", 
        props: { 
          title: "Creative Designer", 
          subtitle: "Visual Storytelling & Brand Identity",
          backgroundType: "gradient",
          gradientColors: { from: "#667eea", to: "#764ba2" }
        } 
      },
      { 
        type: "portfolio", 
        props: { 
          title: "Creative Works",
          layout: "carousel",
          showProjectImages: true
        } 
      },
      { 
        type: "about", 
        props: { 
          title: "My Creative Journey", 
          content: "I believe in the power of design to transform ideas into compelling visual experiences. Every project is an opportunity to tell a unique story.",
          layout: "center"
        } 
      },
      { 
        type: "contact", 
        props: { 
          title: "Let's Create Together",
          layout: "form-only"
        } 
      }
    ],
    tags: ["creative", "design", "art"],
    difficulty: "advanced",
    rating: 4.7,
    downloads: 650
  },
  {
    id: "business-card",
    name: "Business Card",
    description: "Simple and professional business introduction page",
    category: "business",
    imageUrl: "https://images.unsplash.com/photo-1556761175-b413da4baf72?w=400&h=300&fit=crop",
    components: [
      { 
        type: "hero", 
        props: { 
          title: "[Company Name]", 
          subtitle: "Business Solutions & Consulting",
          backgroundType: "solid",
          backgroundColor: "#1f2937"
        } 
      },
      { 
        type: "about", 
        props: { 
          title: "About Our Company", 
          content: "We provide innovative business solutions that help companies grow and succeed in today's competitive market.",
          layout: "split"
        } 
      },
      { 
        type: "contact", 
        props: { 
          title: "Contact Us",
          layout: "info-only",
          showContactInfo: true,
          contactInfo: {
            email: "info@company.com",
            phone: "+1 (555) 987-6543",
            address: "123 Business St, City, State"
          }
        } 
      }
    ],
    tags: ["business", "simple", "professional"],
    difficulty: "beginner",
    rating: 4.5,
    downloads: 1200
  }
];

const categories = [
  { id: "all", name: "All Templates", icon: Sparkles },
  { id: "portfolio", name: "Portfolio", icon: Briefcase },
  { id: "freelancer", name: "Freelancer", icon: User },
  { id: "creative", name: "Creative", icon: Palette },
  { id: "business", name: "Business", icon: Building }
];

export default function TemplatesPage() {
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  const { loadPage } = useBuilderStore();

  // Filter templates based on category and search
  const filteredTemplates = templates.filter(template => {
    const matchesCategory = selectedCategory === "all" || template.category === selectedCategory;
    const matchesSearch = template.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         template.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         template.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()));
    
    return matchesCategory && matchesSearch;
  });

  const handleTemplateSelect = (template: Template) => {
    // Load template components into builder
    loadPage(template.components);
    
    // Redirect to builder
    window.location.href = "/builder";
  };

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'beginner': return 'text-green-600 bg-green-100';
      case 'intermediate': return 'text-yellow-600 bg-yellow-100';
      case 'advanced': return 'text-red-600 bg-red-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="text-center">
            <h1 className="text-3xl font-bold text-gray-900 mb-4">
              Choose Your Template
            </h1>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Start with a professionally designed template and customize it to match your brand
            </p>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Search and Filters */}
        <div className="mb-8">
          <div className="flex flex-col sm:flex-row gap-4 mb-6">
            {/* Search */}
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              <Input
                placeholder="Search templates..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>
            
            {/* Back to Builder */}
            <Button variant="outline" asChild>
              <Link href="/builder">
                <Play className="w-4 h-4 mr-2" />
                Back to Builder
              </Link>
            </Button>
          </div>

          {/* Category Filters */}
          <div className="flex flex-wrap gap-2">
            {categories.map((category) => {
              const Icon = category.icon;
              return (
                <button
                  key={category.id}
                  onClick={() => setSelectedCategory(category.id)}
                  className={`flex items-center px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                    selectedCategory === category.id
                      ? "bg-blue-600 text-white"
                      : "bg-white text-gray-700 hover:bg-gray-50 border border-gray-200"
                  }`}
                >
                  <Icon className="w-4 h-4 mr-2" />
                  {category.name}
                </button>
              );
            })}
          </div>
        </div>

        {/* Templates Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredTemplates.map((template) => (
            <Card key={template.id} className="group hover:shadow-lg transition-shadow duration-200">
              <div className="relative">
                <img
                  src={template.imageUrl}
                  alt={template.name}
                  className="w-full h-48 object-cover rounded-t-lg"
                />
                <div className="absolute top-2 right-2">
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${getDifficultyColor(template.difficulty)}`}>
                    {template.difficulty}
                  </span>
                </div>
              </div>
              
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <CardTitle className="text-lg">{template.name}</CardTitle>
                    <CardDescription className="mt-2">
                      {template.description}
                    </CardDescription>
                  </div>
                </div>
                
                {/* Template Stats */}
                <div className="flex items-center justify-between text-sm text-gray-500 mt-3">
                  <div className="flex items-center">
                    <Star className="w-4 h-4 mr-1 text-yellow-400 fill-current" />
                    {template.rating}
                  </div>
                  <span>{template.downloads} downloads</span>
                </div>
              </CardHeader>
              
              <CardContent>
                {/* Tags */}
                <div className="flex flex-wrap gap-1 mb-4">
                  {template.tags.slice(0, 3).map((tag) => (
                    <span
                      key={tag}
                      className="px-2 py-1 bg-gray-100 text-gray-600 text-xs rounded-full"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
                
                {/* Actions */}
                <div className="flex gap-2">
                  <Button
                    onClick={() => handleTemplateSelect(template)}
                    className="flex-1"
                  >
                    <Play className="w-4 h-4 mr-2" />
                    Use Template
                  </Button>
                  <Button variant="outline" size="sm">
                    <Eye className="w-4 h-4" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Empty State */}
        {filteredTemplates.length === 0 && (
          <div className="text-center py-12">
            <Sparkles className="w-16 h-16 mx-auto text-gray-400 mb-4" />
            <h3 className="text-xl font-semibold text-gray-900 mb-2">
              No templates found
            </h3>
            <p className="text-gray-600 mb-4">
              Try adjusting your search or filter criteria
            </p>
            <Button
              onClick={() => {
                setSelectedCategory("all");
                setSearchQuery("");
              }}
              variant="outline"
            >
              Clear Filters
            </Button>
          </div>
        )}
      </div>
    </div>
  );
} 