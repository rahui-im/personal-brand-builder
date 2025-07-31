/**
 * File name: auth.schema.ts
 * Purpose: Zod validation schemas for authentication
 * Function Summary:
 * 1. Login form validation
 * 2. Registration form validation
 * 3. Password reset validation
 * 4. Profile update validation
 * 
 * Author: AI Assistant
 * Version: 1.0.0
 * Created: 2025-01-31
 * Last modified: 2025-01-31 (initial auth schemas)
 */

import { z } from 'zod';

// Login schema
export const loginSchema = z.object({
  email: z
    .string()
    .min(1, '이메일을 입력해주세요')
    .email('올바른 이메일 형식이 아닙니다'),
  password: z
    .string()
    .min(1, '비밀번호를 입력해주세요')
    .min(8, '비밀번호는 최소 8자 이상이어야 합니다'),
  rememberMe: z.boolean().optional(),
});

export type LoginFormData = z.infer<typeof loginSchema>;

// Registration schema
export const registerSchema = z.object({
  firstName: z
    .string()
    .min(1, '이름을 입력해주세요')
    .min(2, '이름은 최소 2자 이상이어야 합니다')
    .max(50, '이름은 최대 50자까지 가능합니다'),
  lastName: z
    .string()
    .min(1, '성을 입력해주세요')
    .min(2, '성은 최소 2자 이상이어야 합니다')
    .max(50, '성은 최대 50자까지 가능합니다'),
  email: z
    .string()
    .min(1, '이메일을 입력해주세요')
    .email('올바른 이메일 형식이 아닙니다'),
  password: z
    .string()
    .min(8, '비밀번호는 최소 8자 이상이어야 합니다')
    .regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/, '비밀번호는 영문 대소문자와 숫자를 포함해야 합니다'),
  confirmPassword: z
    .string()
    .min(1, '비밀번호 확인을 입력해주세요'),
  acceptTerms: z
    .boolean()
    .refine((val) => val === true, '이용약관에 동의해주세요'),
}).refine((data) => data.password === data.confirmPassword, {
  message: '비밀번호가 일치하지 않습니다',
  path: ['confirmPassword'],
});

export type RegisterFormData = z.infer<typeof registerSchema>;

// Password reset request schema
export const passwordResetRequestSchema = z.object({
  email: z
    .string()
    .min(1, '이메일을 입력해주세요')
    .email('올바른 이메일 형식이 아닙니다'),
});

export type PasswordResetRequestData = z.infer<typeof passwordResetRequestSchema>;

// Password reset schema
export const passwordResetSchema = z.object({
  token: z.string().min(1, '토큰이 필요합니다'),
  password: z
    .string()
    .min(8, '비밀번호는 최소 8자 이상이어야 합니다')
    .regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/, '비밀번호는 영문 대소문자와 숫자를 포함해야 합니다'),
  confirmPassword: z
    .string()
    .min(1, '비밀번호 확인을 입력해주세요'),
}).refine((data) => data.password === data.confirmPassword, {
  message: '비밀번호가 일치하지 않습니다',
  path: ['confirmPassword'],
});

export type PasswordResetData = z.infer<typeof passwordResetSchema>;

// Profile update schema
export const profileUpdateSchema = z.object({
  firstName: z
    .string()
    .min(1, '이름을 입력해주세요')
    .min(2, '이름은 최소 2자 이상이어야 합니다')
    .max(50, '이름은 최대 50자까지 가능합니다'),
  lastName: z
    .string()
    .min(1, '성을 입력해주세요')
    .min(2, '성은 최소 2자 이상이어야 합니다')
    .max(50, '성은 최대 50자까지 가능합니다'),
  email: z
    .string()
    .min(1, '이메일을 입력해주세요')
    .email('올바른 이메일 형식이 아닙니다'),
  avatar: z.string().optional(),
});

export type ProfileUpdateData = z.infer<typeof profileUpdateSchema>;

// Change password schema
export const changePasswordSchema = z.object({
  currentPassword: z
    .string()
    .min(1, '현재 비밀번호를 입력해주세요'),
  newPassword: z
    .string()
    .min(8, '새 비밀번호는 최소 8자 이상이어야 합니다')
    .regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/, '비밀번호는 영문 대소문자와 숫자를 포함해야 합니다'),
  confirmNewPassword: z
    .string()
    .min(1, '새 비밀번호 확인을 입력해주세요'),
}).refine((data) => data.newPassword === data.confirmNewPassword, {
  message: '새 비밀번호가 일치하지 않습니다',
  path: ['confirmNewPassword'],
});

export type ChangePasswordData = z.infer<typeof changePasswordSchema>;

// Email verification schema
export const emailVerificationSchema = z.object({
  token: z.string().min(1, '인증 토큰이 필요합니다'),
});

export type EmailVerificationData = z.infer<typeof emailVerificationSchema>; 