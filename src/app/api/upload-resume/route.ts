import { NextRequest, NextResponse } from 'next/server'
import { supabaseServer } from '@/lib/supabase/server'

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData()
    const file = formData.get('file') as File

    if (!file) {
      return NextResponse.json({ error: 'No file provided' }, { status: 400 })
    }

    // Validate file size (5MB max)
    if (file.size > 5 * 1024 * 1024) {
      return NextResponse.json({ error: 'File size must be less than 5MB' }, { status: 400 })
    }

    // Validate file type
    if (!file.type.includes('pdf') && !file.type.includes('doc')) {
      return NextResponse.json({ error: 'Please upload a PDF or DOC file' }, { status: 400 })
    }

    const fileExt = file.name.split('.').pop()
    const fileName = `${Date.now()}-${Math.random().toString(36).substring(7)}.${fileExt}`
    // Upload directly to bucket root (no folder prefix to avoid path issues)
    const filePath = fileName

    const supabase = supabaseServer()
    
    // First, verify the bucket exists
    const { data: buckets, error: bucketError } = await supabase.storage.listBuckets()
    
    if (bucketError) {
      console.error('Error listing buckets:', bucketError)
      return NextResponse.json(
        { error: 'Failed to access storage. Please ensure the resumes bucket exists.' },
        { status: 500 }
      )
    }

    const resumesBucket = buckets?.find(b => b.id === 'resumes')
    if (!resumesBucket) {
      console.error('Resumes bucket not found. Available buckets:', buckets?.map(b => b.id))
      return NextResponse.json(
        { error: 'Resumes bucket not found. Please create it in Supabase Storage settings.' },
        { status: 500 }
      )
    }

    // Convert File to ArrayBuffer
    const arrayBuffer = await file.arrayBuffer()
    const buffer = Buffer.from(arrayBuffer)

    // Upload file
    const { data: uploadData, error: uploadError } = await supabase.storage
      .from('resumes')
      .upload(filePath, buffer, {
        contentType: file.type,
        upsert: false,
      })

    if (uploadError) {
      return NextResponse.json(
        { error: uploadError.message || 'Failed to upload file' },
        { status: 500 }
      )
    }

    // Get public URL - use the exact path that was uploaded
    const actualPath = uploadData?.path || filePath
    const { data: publicUrlData } = supabase.storage
      .from('resumes')
      .getPublicUrl(actualPath)

    // Use public URL if bucket is public, otherwise generate signed URL
    let resumeUrl = publicUrlData.publicUrl

    // If bucket is private, generate a signed URL (valid for 1 year)
    if (!resumesBucket.public) {
      try {
        const actualPath = uploadData?.path || filePath
        const { data: signedUrlData, error: signedUrlError } = await supabase.storage
          .from('resumes')
          .createSignedUrl(actualPath, 31536000) // 1 year expiry

        if (!signedUrlError && signedUrlData) {
          resumeUrl = signedUrlData.signedUrl
        }
      } catch (err) {
        // Fall back to public URL if signed URL generation fails
      }
    }

    return NextResponse.json({ 
      success: true, 
      url: resumeUrl,
      path: filePath 
    }, { status: 200 })
  } catch (error: any) {
    return NextResponse.json(
      { error: error.message || 'Failed to upload resume' },
      { status: 500 }
    )
  }
}

