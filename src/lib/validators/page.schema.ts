/**
 * File name: page.schema.ts
 * Purpose: Zod validation schemas for page management
 * Function Summary:
 * 1. Page creation validation
 * 2. Page update validation
 * 3. Component validation
 * 4. Metadata validation
 * 
 * Author: AI Assistant
 * Version: 1.0.0
 * Created: 2025-01-31
 * Last modified: 2025-01-31 (initial page schemas)
 */

import { z } from 'zod';

// Component type enum
export const ComponentTypeEnum = z.enum([
  'hero',
  'about',
  'portfolio',
  'contact',
  'testimonial',
  'pricing',
  'blog',
  'footer'
]);

// Animation type enum
export const AnimationTypeEnum = z.enum([
  'fadeIn',
  'slideIn',
  'bounce',
  'none'
]);

// Component schema
export const componentSchema = z.object({
  id: z.string().min(1, '컴포넌트 ID가 필요합니다'),
  type: ComponentTypeEnum,
  props: z.record(z.any()),
  children: z.array(z.lazy(() => componentSchema)).optional(),
  order: z.number().int().min(0, '순서는 0 이상이어야 합니다'),
  isVisible: z.boolean(),
  animations: z.object({
    type: AnimationTypeEnum,
    duration: z.number().min(0).max(5000),
    delay: z.number().min(0).max(2000),
    easing: z.enum(['ease', 'ease-in', 'ease-out', 'ease-in-out']).optional(),
  }).optional(),
  styles: z.object({
    backgroundColor: z.string().optional(),
    textColor: z.string().optional(),
    padding: z.object({
      top: z.number().min(0).max(100),
      right: z.number().min(0).max(100),
      bottom: z.number().min(0).max(100),
      left: z.number().min(0).max(100),
    }).optional(),
    margin: z.object({
      top: z.number().min(0).max(100),
      right: z.number().min(0).max(100),
      bottom: z.number().min(0).max(100),
      left: z.number().min(0).max(100),
    }).optional(),
    borderRadius: z.number().min(0).max(50).optional(),
    borderWidth: z.number().min(0).max(10).optional(),
    borderColor: z.string().optional(),
    shadow: z.enum(['none', 'sm', 'md', 'lg', 'xl']).optional(),
  }).optional(),
});

// Page settings schema
export const pageSettingsSchema = z.object({
  theme: z.enum(['light', 'dark', 'auto']),
  layout: z.enum(['full', 'contained', 'boxed']),
  showHeader: z.boolean(),
  showFooter: z.boolean(),
});

// Page metadata schema
export const pageMetadataSchema = z.object({
  title: z
    .string()
    .min(1, '페이지 제목을 입력해주세요')
    .max(60, '페이지 제목은 최대 60자까지 가능합니다'),
  description: z
    .string()
    .min(1, '페이지 설명을 입력해주세요')
    .max(160, '페이지 설명은 최대 160자까지 가능합니다'),
  keywords: z
    .array(z.string())
    .min(1, '최소 1개의 키워드를 입력해주세요')
    .max(10, '키워드는 최대 10개까지 가능합니다'),
});

// Slug validation schema
export const slugSchema = z
  .string()
  .min(1, '슬러그를 입력해주세요')
  .max(50, '슬러그는 최대 50자까지 가능합니다')
  .regex(/^[a-z0-9-]+$/, '슬러그는 영문 소문자, 숫자, 하이픈만 사용 가능합니다')
  .refine((slug) => !slug.startsWith('-') && !slug.endsWith('-'), {
    message: '슬러그는 하이픈으로 시작하거나 끝날 수 없습니다',
  });

// Page creation schema
export const createPageSchema = z.object({
  name: z
    .string()
    .min(1, '페이지 이름을 입력해주세요')
    .max(100, '페이지 이름은 최대 100자까지 가능합니다'),
  slug: slugSchema,
  components: z.array(componentSchema),
  metadata: pageMetadataSchema,
  settings: pageSettingsSchema,
});

export type CreatePageData = z.infer<typeof createPageSchema>;

// Page update schema
export const updatePageSchema = z.object({
  id: z.string().min(1, '페이지 ID가 필요합니다'),
  name: z
    .string()
    .min(1, '페이지 이름을 입력해주세요')
    .max(100, '페이지 이름은 최대 100자까지 가능합니다')
    .optional(),
  slug: slugSchema.optional(),
  components: z.array(componentSchema).optional(),
  metadata: pageMetadataSchema.optional(),
  settings: pageSettingsSchema.optional(),
});

export type UpdatePageData = z.infer<typeof updatePageSchema>;

// Page publish schema
export const publishPageSchema = z.object({
  id: z.string().min(1, '페이지 ID가 필요합니다'),
  publish: z.boolean(),
});

export type PublishPageData = z.infer<typeof publishPageSchema>;

// Page duplicate schema
export const duplicatePageSchema = z.object({
  id: z.string().min(1, '페이지 ID가 필요합니다'),
  newName: z
    .string()
    .min(1, '새 페이지 이름을 입력해주세요')
    .max(100, '페이지 이름은 최대 100자까지 가능합니다'),
  newSlug: slugSchema,
});

export type DuplicatePageData = z.infer<typeof duplicatePageSchema>;

// Page search schema
export const pageSearchSchema = z.object({
  query: z.string().optional(),
  status: z.enum(['draft', 'published', 'all']).optional(),
  sortBy: z.enum(['name', 'createdAt', 'updatedAt']).optional(),
  sortOrder: z.enum(['asc', 'desc']).optional(),
  page: z.number().int().min(1).optional(),
  limit: z.number().int().min(1).max(100).optional(),
});

export type PageSearchData = z.infer<typeof pageSearchSchema>;

// Template import schema
export const templateImportSchema = z.object({
  templateId: z.string().min(1, '템플릿 ID가 필요합니다'),
  pageName: z
    .string()
    .min(1, '페이지 이름을 입력해주세요')
    .max(100, '페이지 이름은 최대 100자까지 가능합니다'),
  slug: slugSchema,
});

export type TemplateImportData = z.infer<typeof templateImportSchema>; 