import { NextRequest, NextResponse } from 'next/server'
import { supabaseServer } from '@/lib/supabase/server'
import { jobApplicationSchema } from '@/lib/validation/schemas'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const validatedData = jobApplicationSchema.parse(body)

    const supabase = supabaseServer()
    const insertData: any = {
      job_id: validatedData.jobId,
      name: validatedData.name,
      email: validatedData.email,
      phone: validatedData.phone,
      resume_url: validatedData.resumeUrl,
    }
    
    // Only include cover_letter if it exists and is not empty
    if (validatedData.coverLetter && validatedData.coverLetter.trim()) {
      insertData.cover_letter = validatedData.coverLetter.trim()
    }
    
    const { data, error } = await supabase
      .from('job_applications')
      .insert(insertData)
      .select()
      .single()

    if (error) {
      return NextResponse.json(
        { error: error.message || 'Failed to submit job application' },
        { status: 500 }
      )
    }

    return NextResponse.json({ success: true, data }, { status: 201 })
  } catch (error: any) {
    return NextResponse.json(
      { error: error.message || 'Invalid request data', details: error.errors },
      { status: 400 }
    )
  }
}

