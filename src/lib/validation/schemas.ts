import { z } from 'zod'

// Phone validation for Indian numbers
const phoneRegex = /^(\+91[\s-]?)?[6-9]\d{9}$/

export const enquirySchema = z.object({
  name: z
    .string({ required_error: 'Name is required' })
    .min(1, 'Name is required')
    .min(2, 'Name must be at least 2 characters')
    .max(100, 'Name must be less than 100 characters')
    .regex(/^[a-zA-Z\s'-]+$/, 'Name can only contain letters, spaces, hyphens, and apostrophes'),
  email: z
    .string({ required_error: 'Email is required' })
    .min(1, 'Email is required')
    .email('Please enter a valid email address')
    .toLowerCase()
    .max(255, 'Email is too long'),
  phone: z
    .string({ required_error: 'Phone number is required' })
    .min(1, 'Phone number is required')
    .transform((val) => val.replace(/\D/g, '')) // Remove non-digits
    .refine((val) => val.length === 10, 'Phone number must be exactly 10 digits')
    .refine((val) => /^[6-9]/.test(val), 'Phone number must start with 6, 7, 8, or 9'),
  serviceType: z.enum(['solar', 'telecom', 'hr', 'general'], {
    required_error: 'Please select a service type',
    invalid_type_error: 'Please select a service type',
  }),
  message: z
    .string({ required_error: 'Message is required' })
    .min(1, 'Message is required')
    .min(10, 'Message must be at least 10 characters')
    .max(2000, 'Message must be less than 2000 characters'),
  language: z.string().optional(),
  resumeUrl: z
    .union([z.string().url(), z.literal(''), z.null()])
    .optional()
    .nullable()
    .transform((val) => val || ''),
})

export const jobApplicationSchema = z.object({
  jobId: z.string().uuid('Invalid job ID'),
  name: z
    .string()
    .min(2, 'Name must be at least 2 characters')
    .max(100, 'Name must be less than 100 characters')
    .regex(/^[a-zA-Z\s'-]+$/, 'Name can only contain letters, spaces, hyphens, and apostrophes'),
  email: z
    .string()
    .min(1, 'Email is required')
    .email('Please enter a valid email address')
    .toLowerCase()
    .max(255, 'Email is too long'),
  phone: z
    .string()
    .min(1, 'Phone number is required')
    .transform((val) => val.replace(/\D/g, '')) // Remove non-digits
    .refine((val) => val.length === 10, 'Phone number must be exactly 10 digits')
    .refine((val) => /^[6-9]/.test(val), 'Phone number must start with 6, 7, 8, or 9'),
  resumeUrl: z
    .string()
    .min(1, 'Resume is required')
    .url('Invalid resume URL'),
  coverLetter: z
    .string()
    .max(2000, 'Cover letter must be less than 2000 characters')
    .optional()
    .nullable(),
})

export type EnquiryFormData = z.infer<typeof enquirySchema>
export type JobApplicationFormData = z.infer<typeof jobApplicationSchema>

