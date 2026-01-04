import { NextRequest, NextResponse } from 'next/server'
import { cookies } from 'next/headers'
import { supabaseServer } from '@/lib/supabase/server'

async function checkAuth() {
  const cookieStore = await cookies()
  const adminCookie = cookieStore.get('admin_ok')
  return adminCookie?.value === 'true'
}

export async function POST(request: NextRequest) {
  if (!(await checkAuth())) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  try {
    const supabase = supabaseServer()
    
    // Get all enquiries and job applications with resume URLs
    const [enquiriesResult, applicationsResult] = await Promise.all([
      supabase.from('enquiries').select('id, resume_url').not('resume_url', 'is', null),
      supabase.from('job_applications').select('id, resume_url').not('resume_url', 'is', null),
    ])

    const fixes: any[] = []

    // Check and fix enquiry resume URLs
    if (enquiriesResult.data) {
      for (const enquiry of enquiriesResult.data) {
        if (!enquiry.resume_url) continue

        // Extract filename from URL
        const filenameMatch = enquiry.resume_url.match(/\/([^/]+\.(pdf|doc|docx))$/i)
        if (!filenameMatch) continue

        const filename = filenameMatch[1]
        const baseUrl = enquiry.resume_url.match(/^(https?:\/\/[^\/]+\/storage\/v1\/object\/public\/resumes)/)?.[1]
        
        if (!baseUrl) continue

        // Try different path variations
        const variations = [
          `${baseUrl}/${filename}`, // Root
          `${baseUrl}/resumes/${filename}`, // In resumes folder
        ]

        // Check which variation works
        for (const variation of variations) {
          try {
            const response = await fetch(variation, { method: 'HEAD' })
            if (response.ok) {
              if (variation !== enquiry.resume_url) {
                // Update the URL in database
                await supabase
                  .from('enquiries')
                  .update({ resume_url: variation })
                  .eq('id', enquiry.id)

                fixes.push({
                  type: 'enquiry',
                  id: enquiry.id,
                  old: enquiry.resume_url,
                  new: variation,
                })
              }
              break
            }
          } catch (err) {
            // Continue to next variation
          }
        }
      }
    }

    // Check and fix application resume URLs
    if (applicationsResult.data) {
      for (const application of applicationsResult.data) {
        if (!application.resume_url) continue

        // Extract filename from URL
        const filenameMatch = application.resume_url.match(/\/([^/]+\.(pdf|doc|docx))$/i)
        if (!filenameMatch) continue

        const filename = filenameMatch[1]
        const baseUrl = application.resume_url.match(/^(https?:\/\/[^\/]+\/storage\/v1\/object\/public\/resumes)/)?.[1]
        
        if (!baseUrl) continue

        // Try different path variations
        const variations = [
          `${baseUrl}/${filename}`, // Root
          `${baseUrl}/resumes/${filename}`, // In resumes folder
        ]

        // Check which variation works
        for (const variation of variations) {
          try {
            const response = await fetch(variation, { method: 'HEAD' })
            if (response.ok) {
              if (variation !== application.resume_url) {
                // Update the URL in database
                await supabase
                  .from('job_applications')
                  .update({ resume_url: variation })
                  .eq('id', application.id)

                fixes.push({
                  type: 'application',
                  id: application.id,
                  old: application.resume_url,
                  new: variation,
                })
              }
              break
            }
          } catch (err) {
            // Continue to next variation
          }
        }
      }
    }

    return NextResponse.json({
      success: true,
      fixes: fixes.length,
      details: fixes,
    })
  } catch (error: any) {
    return NextResponse.json(
      { error: error.message || 'Failed to fix resume URLs' },
      { status: 500 }
    )
  }
}

