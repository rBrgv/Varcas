import { NextRequest, NextResponse } from 'next/server'
import { supabaseServer } from '@/lib/supabase/server'
import { enquirySchema } from '@/lib/validation/schemas'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const validatedData = enquirySchema.parse(body)

    const supabase = supabaseServer()
    const insertData: any = {
      name: validatedData.name,
      email: validatedData.email,
      phone: validatedData.phone,
      service_type: validatedData.serviceType,
      message: validatedData.message,
      language: validatedData.language || 'en',
    }
    
    // Only include resume_url if it exists and is not empty
    if (validatedData.resumeUrl && validatedData.resumeUrl !== '') {
      insertData.resume_url = validatedData.resumeUrl
    }
    
    const { data, error } = await supabase
      .from('enquiries')
      .insert(insertData)
      .select()
      .single()

    if (error) {
      return NextResponse.json(
        { error: error.message || 'Failed to create enquiry' },
        { status: 500 }
      )
    }

    return NextResponse.json({ success: true, data }, { status: 201 })
  } catch (error: any) {
    return NextResponse.json(
      { error: error.message || 'Invalid request data' },
      { status: 400 }
    )
  }
}

