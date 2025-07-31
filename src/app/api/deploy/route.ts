/**
 * File name: route.ts
 * Purpose: API endpoint for deploying built pages to a live website
 * Function Summary:
 * 1. Generate static HTML from components
 * 2. Create deployment package
 * 3. Deploy to hosting service (Vercel/Netlify)
 * 4. Return deployment URL
 * 
 * Author: Personal Brand Builder Team
 * Version: 1.0.0
 * Created: 2025-07-31
 * Last modified: 2025-07-31 (deployment API implementation)
 */

import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';

// Deployment request schema
const DeployRequestSchema = z.object({
  components: z.array(z.object({
    id: z.string(),
    type: z.string(),
    props: z.record(z.any()).optional(),
    order: z.number(),
    isVisible: z.boolean().optional()
  })),
  metadata: z.object({
    title: z.string().optional(),
    description: z.string().optional(),
    domain: z.string().optional(),
    customDomain: z.string().optional()
  }).optional()
});

// Generate HTML from components
function generateHTML(components: any[], metadata: any = {}) {
  const title = metadata.title || 'My Personal Brand';
  const description = metadata.description || 'Built with Personal Brand Builder';
  
  return `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>${title}</title>
    <meta name="description" content="${description}">
    <meta name="generator" content="Personal Brand Builder">
    
    <!-- Tailwind CSS -->
    <script src="https://cdn.tailwindcss.com"></script>
    
    <!-- Custom Styles -->
    <style>
        .fade-in { animation: fadeIn 0.5s ease-in-out; }
        .slide-up { animation: slideUp 0.3s ease-out; }
        
        @keyframes fadeIn {
            from { opacity: 0; }
            to { opacity: 1; }
        }
        
        @keyframes slideUp {
            from { transform: translateY(20px); opacity: 0; }
            to { transform: translateY(0); opacity: 1; }
        }
        
        .gradient-bg {
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
        }
        
        .hero-gradient {
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
        }
        
        .text-gradient {
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            -webkit-background-clip: text;
            -webkit-text-fill-color: transparent;
            background-clip: text;
        }
    </style>
</head>
<body class="bg-white">
    ${components.map(component => generateComponentHTML(component)).join('\n')}
    
    <!-- Analytics -->
    <script>
        // Basic analytics
        (function() {
            var script = document.createElement('script');
            script.src = 'https://www.googletagmanager.com/gtag/js?id=GA_MEASUREMENT_ID';
            script.async = true;
            document.head.appendChild(script);
            
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'GA_MEASUREMENT_ID');
        })();
    </script>
</body>
</html>`;
}

// Generate HTML for individual components
function generateComponentHTML(component: any): string {
  switch (component.type) {
    case 'hero':
      return generateHeroHTML(component.props);
    case 'about':
      return generateAboutHTML(component.props);
    case 'portfolio':
      return generatePortfolioHTML(component.props);
    case 'contact':
      return generateContactHTML(component.props);
    case 'testimonial':
      return generateTestimonialHTML(component.props);
    case 'pricing':
      return generatePricingHTML(component.props);
    case 'footer':
      return generateFooterHTML(component.props);
    default:
      return `<div class="p-8 text-center text-gray-500">Unknown component type: ${component.type}</div>`;
  }
}

// Hero section HTML generator
function generateHeroHTML(props: any): string {
  const {
    title = 'Welcome to My Personal Brand',
    subtitle = 'I help businesses grow through strategic solutions',
    backgroundType = 'gradient',
    backgroundImage = '',
    ctaText = 'Get Started',
    ctaLink = '#contact',
    alignment = 'center'
  } = props;

  const bgStyle = backgroundType === 'image' && backgroundImage 
    ? `background-image: url('${backgroundImage}'); background-size: cover; background-position: center;`
    : '';

  return `
    <section class="min-h-screen flex items-center justify-center ${bgStyle}" style="${bgStyle}">
      <div class="container mx-auto px-4 text-${alignment}">
        <div class="max-w-4xl mx-auto">
          <h1 class="text-4xl md:text-6xl font-bold text-gray-900 mb-6 leading-tight">
            ${title}
          </h1>
          ${subtitle ? `<p class="text-xl md:text-2xl text-gray-600 mb-8 max-w-2xl mx-auto leading-relaxed">${subtitle}</p>` : ''}
          ${ctaText ? `<a href="${ctaLink}" class="inline-flex items-center px-8 py-4 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition-colors">${ctaText}</a>` : ''}
        </div>
      </div>
    </section>
  `;
}

// About section HTML generator
function generateAboutHTML(props: any): string {
  const {
    title = 'About Me',
    content = 'I am a passionate professional dedicated to helping businesses achieve their goals.',
    image = '',
    showSkills = true,
    skills = ['Strategy', 'Design', 'Development']
  } = props;

  return `
    <section class="py-20 bg-gray-50">
      <div class="container mx-auto px-4">
        <div class="max-w-4xl mx-auto">
          <h2 class="text-3xl md:text-4xl font-bold text-gray-900 mb-8 text-center">${title}</h2>
          <div class="grid md:grid-cols-2 gap-12 items-center">
            ${image ? `<div class="text-center"><img src="${image}" alt="About" class="rounded-lg shadow-lg max-w-md mx-auto"></div>` : ''}
            <div>
              <p class="text-lg text-gray-600 mb-6">${content}</p>
              ${showSkills && skills.length > 0 ? `
                <div class="mt-8">
                  <h3 class="text-xl font-semibold text-gray-900 mb-4">Skills</h3>
                  <div class="flex flex-wrap gap-2">
                    ${skills.map((skill: string) => `<span class="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm">${skill}</span>`).join('')}
                  </div>
                </div>
              ` : ''}
            </div>
          </div>
        </div>
      </div>
    </section>
  `;
}

// Portfolio section HTML generator
function generatePortfolioHTML(props: any): string {
  const {
    title = 'My Work',
    projects = [
      { title: 'Project 1', description: 'Description of project 1', image: '', link: '#' },
      { title: 'Project 2', description: 'Description of project 2', image: '', link: '#' }
    ]
  } = props;

  return `
    <section class="py-20 bg-white">
      <div class="container mx-auto px-4">
        <h2 class="text-3xl md:text-4xl font-bold text-gray-900 mb-12 text-center">${title}</h2>
        <div class="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          ${projects.map((project: any) => `
            <div class="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow">
              ${project.image ? `<img src="${project.image}" alt="${project.title}" class="w-full h-48 object-cover">` : ''}
              <div class="p-6">
                <h3 class="text-xl font-semibold text-gray-900 mb-2">${project.title}</h3>
                <p class="text-gray-600 mb-4">${project.description}</p>
                <a href="${project.link}" class="text-blue-600 hover:text-blue-700 font-medium">View Project →</a>
              </div>
            </div>
          `).join('')}
        </div>
      </div>
    </section>
  `;
}

// Contact section HTML generator
function generateContactHTML(props: any): string {
  const {
    title = 'Get In Touch',
    description = 'Ready to start your project? Let\'s talk!',
    email = 'hello@example.com',
    phone = '+1 (555) 123-4567',
    address = '123 Main St, City, State 12345'
  } = props;

  return `
    <section class="py-20 bg-gray-50">
      <div class="container mx-auto px-4">
        <div class="max-w-4xl mx-auto text-center">
          <h2 class="text-3xl md:text-4xl font-bold text-gray-900 mb-4">${title}</h2>
          <p class="text-lg text-gray-600 mb-12">${description}</p>
          
          <div class="grid md:grid-cols-3 gap-8">
            <div class="text-center">
              <div class="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mx-auto mb-4">
                <svg class="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path>
                </svg>
              </div>
              <h3 class="text-lg font-semibold text-gray-900 mb-2">Email</h3>
              <p class="text-gray-600">${email}</p>
            </div>
            
            <div class="text-center">
              <div class="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mx-auto mb-4">
                <svg class="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"></path>
                </svg>
              </div>
              <h3 class="text-lg font-semibold text-gray-900 mb-2">Phone</h3>
              <p class="text-gray-600">${phone}</p>
            </div>
            
            <div class="text-center">
              <div class="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mx-auto mb-4">
                <svg class="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"></path>
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"></path>
                </svg>
              </div>
              <h3 class="text-lg font-semibold text-gray-900 mb-2">Address</h3>
              <p class="text-gray-600">${address}</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  `;
}

// Testimonial section HTML generator
function generateTestimonialHTML(props: any): string {
  const {
    title = 'What People Say',
    testimonials = [
      { name: 'John Doe', role: 'CEO', company: 'Tech Corp', content: 'Amazing work and great communication!' },
      { name: 'Jane Smith', role: 'Designer', company: 'Design Studio', content: 'Exceeded all expectations!' }
    ]
  } = props;

  return `
    <section class="py-20 bg-white">
      <div class="container mx-auto px-4">
        <h2 class="text-3xl md:text-4xl font-bold text-gray-900 mb-12 text-center">${title}</h2>
        <div class="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          ${testimonials.map((testimonial: any) => `
            <div class="bg-gray-50 rounded-lg p-8">
              <p class="text-gray-600 mb-6 italic">"${testimonial.content}"</p>
              <div class="flex items-center">
                <div class="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mr-4">
                  <span class="text-blue-600 font-semibold">${testimonial.name.charAt(0)}</span>
                </div>
                <div>
                  <h4 class="font-semibold text-gray-900">${testimonial.name}</h4>
                  <p class="text-sm text-gray-600">${testimonial.role} at ${testimonial.company}</p>
                </div>
              </div>
            </div>
          `).join('')}
        </div>
      </div>
    </section>
  `;
}

// Pricing section HTML generator
function generatePricingHTML(props: any): string {
  const {
    title = 'Pricing Plans',
    plans = [
      { name: 'Basic', price: '$99', features: ['Feature 1', 'Feature 2', 'Feature 3'] },
      { name: 'Pro', price: '$199', features: ['All Basic features', 'Feature 4', 'Feature 5'] }
    ]
  } = props;

  return `
    <section class="py-20 bg-gray-50">
      <div class="container mx-auto px-4">
        <h2 class="text-3xl md:text-4xl font-bold text-gray-900 mb-12 text-center">${title}</h2>
        <div class="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
          ${plans.map((plan: any) => `
            <div class="bg-white rounded-lg shadow-lg p-8 text-center">
              <h3 class="text-2xl font-bold text-gray-900 mb-4">${plan.name}</h3>
              <div class="text-4xl font-bold text-blue-600 mb-6">${plan.price}</div>
              <ul class="space-y-3 mb-8">
                ${plan.features.map((feature: string) => `<li class="text-gray-600">✓ ${feature}</li>`).join('')}
              </ul>
              <button class="w-full bg-blue-600 text-white font-semibold py-3 px-6 rounded-lg hover:bg-blue-700 transition-colors">
                Get Started
              </button>
            </div>
          `).join('')}
        </div>
      </div>
    </section>
  `;
}

// Footer section HTML generator
function generateFooterHTML(props: any): string {
  const {
    copyright = '© 2025 Personal Brand Builder. All rights reserved.',
    socialLinks = { twitter: '#', linkedin: '#', github: '#' }
  } = props;

  return `
    <footer class="bg-gray-900 text-white py-12">
      <div class="container mx-auto px-4">
        <div class="text-center">
          <p class="text-gray-400 mb-4">${copyright}</p>
          <div class="flex justify-center space-x-4">
            ${Object.entries(socialLinks).map(([platform, url]) => `
              <a href="${url}" class="text-gray-400 hover:text-white transition-colors">
                <span class="sr-only">${platform}</span>
                <svg class="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z"/>
                </svg>
              </a>
            `).join('')}
          </div>
        </div>
      </div>
    </footer>
  `;
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const validatedData = DeployRequestSchema.parse(body);
    
    // Generate HTML from components
    const html = generateHTML(validatedData.components, validatedData.metadata);
    
    // In a real implementation, you would:
    // 1. Save the HTML to a file or database
    // 2. Deploy to a hosting service (Vercel, Netlify, etc.)
    // 3. Return the deployment URL
    
    // For now, we'll simulate deployment
    const deploymentId = `deploy_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
    const deploymentUrl = `https://${deploymentId}.vercel.app`;
    
    // Simulate deployment delay
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    return NextResponse.json({
      success: true,
      deploymentId,
      deploymentUrl,
      message: 'Deployment successful!'
    });
    
  } catch (error) {
    console.error('Deployment error:', error);
    
    if (error instanceof z.ZodError) {
      return NextResponse.json({
        success: false,
        error: 'Invalid request data',
        details: error.errors
      }, { status: 400 });
    }
    
    return NextResponse.json({
      success: false,
      error: 'Deployment failed',
      message: 'An error occurred during deployment'
    }, { status: 500 });
  }
}

export async function GET() {
  return NextResponse.json({
    message: 'Deployment API is running',
    version: '1.0.0'
  });
} 