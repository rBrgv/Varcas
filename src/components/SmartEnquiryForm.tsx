'use client'

import { useState, useRef } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { enquirySchema, jobApplicationSchema, type EnquiryFormData, type JobApplicationFormData } from '@/lib/validation/schemas'
import { Input, Select, Textarea, Button, Alert } from '@/components/ui'
import { useTranslation } from 'react-i18next'
import { uploadResume } from '@/lib/api'
import { SuccessAnimation } from '@/components/SuccessAnimation'
import '@/lib/i18n'

interface SmartEnquiryFormProps {
  onSuccess?: () => void
  jobId?: string
  serviceType?: 'solar' | 'telecom' | 'hr' | 'general'
}

export function SmartEnquiryForm({ onSuccess, jobId, serviceType }: SmartEnquiryFormProps) {
  const { t, i18n } = useTranslation()
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [success, setSuccess] = useState(false)
  const [resumeFile, setResumeFile] = useState<File | null>(null)
  const [uploadingResume, setUploadingResume] = useState(false)
  const fileInputRef = useRef<HTMLInputElement>(null)
  const isJobApplication = !!jobId || serviceType === 'hr'

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    setValue,
  } = useForm<EnquiryFormData>({
    resolver: zodResolver(enquirySchema),
    defaultValues: {
      name: '',
      email: '',
      phone: '',
      serviceType: serviceType || 'general',
      message: '',
      language: i18n.language || 'en',
      resumeUrl: '',
    },
    mode: 'onBlur', // Validate on blur to avoid interfering with typing
    reValidateMode: 'onChange',
    shouldUnregister: false, // Keep values in form state
  })

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return

    if (file.size > 5 * 1024 * 1024) {
      setError('File size must be less than 5MB')
      return
    }

    if (!file.type.includes('pdf') && !file.type.includes('doc')) {
      setError('Please upload a PDF or DOC file')
      return
    }

    setResumeFile(file)
    setUploadingResume(true)
    setError(null)

    try {
      const resumeUrl = await uploadResume(file)
      setValue('resumeUrl', resumeUrl)
    } catch (err: any) {
      setError(err.message || 'Failed to upload resume')
      setResumeFile(null)
    } finally {
      setUploadingResume(false)
    }
  }

  const onSubmit = async (data: EnquiryFormData) => {
    setIsSubmitting(true)
    setError(null)

    try {
      // Validate job application requires resume
      if (isJobApplication && !data.resumeUrl) {
        setError('Resume is required for job applications')
        setIsSubmitting(false)
        return
      }

      if (jobId && data.resumeUrl) {
        // Submit as job application
        // Note: phone will be transformed by the schema, so send raw value
        const applicationData = {
          jobId,
          name: data.name.trim(),
          email: data.email.trim().toLowerCase(),
          phone: data.phone, // Schema will transform this
          resumeUrl: data.resumeUrl,
          coverLetter: data.message.trim() || undefined,
        }
        const response = await fetch('/api/job-application', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(applicationData),
        })

        const responseData = await response.json().catch(() => ({}))
        
        if (!response.ok) {
          const errorMessage = responseData.error || `Failed to submit job application (${response.status})`
          throw new Error(errorMessage)
        }
      } else {
        // Submit as regular enquiry
        const response = await fetch('/api/enquiry', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            name: data.name.trim(),
            email: data.email.trim(),
            phone: data.phone, // Already processed by schema transform
            serviceType: data.serviceType,
            message: data.message.trim(),
            language: data.language || 'en',
            resumeUrl: data.resumeUrl || undefined,
            jobId,
          }),
        })

        if (!response.ok) {
          const errorData = await response.json().catch(() => ({}))
          throw new Error(errorData.error || `Failed to submit enquiry (${response.status})`)
        }
      }

      setSuccess(true)
      reset()
      setResumeFile(null)
      if (fileInputRef.current) fileInputRef.current.value = ''
      setTimeout(() => {
        if (onSuccess) onSuccess()
      }, 2000)
    } catch (err: any) {
      setError(err.message || 'Failed to submit. Please try again.')
    } finally {
      setIsSubmitting(false)
    }
  }

  if (success) {
    return (
      <div className="text-center py-8">
        <SuccessAnimation />
        <Alert variant="success" className="mt-4">
          <p className="font-semibold">Thank you! Your enquiry has been submitted successfully.</p>
        </Alert>
      </div>
    )
  }

  const onFormSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    handleSubmit(onSubmit)(e).catch(() => {
      setError('Please check all fields and try again')
    })
  }

  return (
    <form onSubmit={onFormSubmit} className="space-y-6">
      {error && <Alert variant="error">{error}</Alert>}
      
      {/* Debug: Show validation errors */}
      {Object.keys(errors).length > 0 && (
        <div className="bg-red-50 border border-red-200 rounded-lg p-4">
          <p className="text-sm font-semibold text-red-800 mb-2">Please fix the following errors:</p>
          <ul className="list-disc list-inside text-sm text-red-700 space-y-1">
            {errors.name && <li>Name: {errors.name.message}</li>}
            {errors.email && <li>Email: {errors.email.message}</li>}
            {errors.phone && <li>Phone: {errors.phone.message}</li>}
            {errors.serviceType && <li>Service Type: {errors.serviceType.message}</li>}
            {errors.message && <li>Message: {errors.message.message}</li>}
            {errors.resumeUrl && <li>Resume: {errors.resumeUrl.message}</li>}
          </ul>
        </div>
      )}

      <Input
        label={
          <>
            Name <span className="text-red-500">*</span>
          </>
        }
        {...register('name', { required: true })}
        error={errors.name?.message}
        placeholder="Your full name"
      />

      <Input
        label={
          <>
            Email <span className="text-red-500">*</span>
          </>
        }
        type="email"
        {...register('email', { required: true })}
        error={errors.email?.message}
        placeholder="your.email@example.com"
      />

      <Input
        label={
          <>
            Phone <span className="text-red-500">*</span>
          </>
        }
        type="tel"
        {...register('phone', {
          required: true,
          onChange: (e) => {
            // Auto-format phone number - only allow digits
            let value = e.target.value.replace(/\D/g, '')
            // Remove country code if present
            if (value.startsWith('91') && value.length > 10) {
              value = value.substring(2)
            }
            // Limit to 10 digits
            if (value.length > 10) {
              value = value.substring(0, 10)
            }
            // Only update if value changed
            if (e.target.value !== value) {
              setValue('phone', value, { shouldValidate: false, shouldDirty: true })
              e.target.value = value
            }
          },
        })}
        error={errors.phone?.message}
        placeholder="9876543210"
        maxLength={10}
      />

      <Select
        label={
          <>
            Service Type <span className="text-red-500">*</span>
          </>
        }
        {...register('serviceType')}
        error={errors.serviceType?.message}
        options={[
          { value: 'solar', label: 'Solar Solutions' },
          { value: 'telecom', label: 'Telecom Services' },
          { value: 'hr', label: 'HR Services' },
          { value: 'general', label: 'General Inquiry' },
        ]}
      />

      <Textarea
        label={
          <>
            {isJobApplication ? 'Cover Letter' : 'Message'} <span className="text-red-500">*</span>
          </>
        }
        {...register('message', { required: true })}
        error={errors.message?.message}
        placeholder={isJobApplication ? 'Tell us why you\'re interested in this position...' : 'Tell us about your requirements...'}
        rows={5}
      />

      {isJobApplication && (
        <div>
          <label className="block text-sm font-medium text-neutral-700 mb-2">
            Resume {isJobApplication && <span className="text-red-500">*</span>}
          </label>
          <input
            ref={fileInputRef}
            type="file"
            accept=".pdf,.doc,.docx"
            onChange={handleFileChange}
            required={isJobApplication}
            className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 outline-none transition-colors hover:border-primary-300 ${
              errors.resumeUrl ? 'border-red-500' : 'border-neutral-300'
            }`}
            disabled={uploadingResume}
          />
          {uploadingResume && (
            <p className="mt-1 text-sm text-primary-600">Uploading resume...</p>
          )}
          {resumeFile && !uploadingResume && (
            <p className="mt-1 text-sm text-green-600">✓ {resumeFile.name}</p>
          )}
          {errors.resumeUrl && (
            <p className="mt-1 text-sm text-red-600">{errors.resumeUrl.message}</p>
          )}
          <p className="mt-1 text-xs text-neutral-500">PDF or DOC format, max 5MB</p>
        </div>
      )}

      <Button
        type="submit"
        variant="primary"
        size="lg"
        disabled={isSubmitting}
        className="w-full"
      >
        {isSubmitting ? 'Submitting...' : 'Submit Enquiry'}
      </Button>
    </form>
  )
}

