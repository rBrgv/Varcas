import { supabaseClient } from './supabase/client'
import { enquirySchema, jobApplicationSchema, type EnquiryFormData, type JobApplicationFormData } from './validation/schemas'

export async function submitEnquiry(data: EnquiryFormData) {
  const validated = enquirySchema.parse(data)
  
  const { data: result, error } = await supabaseClient
    .from('enquiries')
    .insert({
      name: validated.name,
      email: validated.email,
      phone: validated.phone,
      service_type: validated.serviceType,
      message: validated.message,
      language: validated.language || 'en',
      resume_url: validated.resumeUrl || null,
    })
    .select()
    .single()

  if (error) throw new Error(error.message)
  return result
}

export async function fetchJobs() {
  const { data, error } = await supabaseClient
    .from('jobs')
    .select('*')
    .eq('is_active', true)
    .order('created_at', { ascending: false })

  if (error) throw new Error(error.message)
  return data || []
}

export async function fetchJob(id: string) {
  const { data, error } = await supabaseClient
    .from('jobs')
    .select('*')
    .eq('id', id)
    .single()

  if (error) throw new Error(error.message)
  return data
}

export async function submitJobApplication(data: JobApplicationFormData) {
  const validated = jobApplicationSchema.parse(data)
  
  const { data: result, error } = await supabaseClient
    .from('job_applications')
    .insert({
      job_id: validated.jobId,
      name: validated.name,
      email: validated.email,
      phone: validated.phone,
      resume_url: validated.resumeUrl,
      cover_letter: validated.coverLetter || null,
    })
    .select()
    .single()

  if (error) throw new Error(error.message)
  return result
}

export async function uploadResume(file: File): Promise<string> {
  const formData = new FormData()
  formData.append('file', file)

  const response = await fetch('/api/upload-resume', {
    method: 'POST',
    body: formData,
  })

  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}))
    throw new Error(errorData.error || 'Failed to upload resume')
  }

  const data = await response.json()
  return data.url
}

