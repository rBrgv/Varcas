import { NextRequest, NextResponse } from 'next/server'
import { supabaseServer } from '@/lib/supabase/server'

export async function POST(request: NextRequest) {
  try {
    const { url } = await request.json()

    if (!url) {
      return NextResponse.json({ error: 'URL is required' }, { status: 400 })
    }

    // Extract path from URL
    // Format: https://[project].supabase.co/storage/v1/object/public/resumes/[path]
    const urlMatch = url.match(/\/storage\/v1\/object\/public\/resumes\/(.+)$/)
    if (!urlMatch) {
      return NextResponse.json({ error: 'Invalid URL format' }, { status: 400 })
    }

    const filePath = urlMatch[1]
    const supabase = supabaseServer()

    // Try to list files to see if it exists
    const { data: files, error: listError } = await supabase.storage
      .from('resumes')
      .list('', {
        limit: 1000,
        offset: 0,
        sortBy: { column: 'name', order: 'asc' }
      })

    // Silently handle list errors - we'll try direct access instead

    // Try to get the file directly
    const { data: fileData, error: fileError } = await supabase.storage
      .from('resumes')
      .list(filePath.split('/').slice(0, -1).join('/') || '', {
        limit: 100,
      })

    // Try alternative paths
    const alternativePaths = [
      filePath,
      `resumes/${filePath}`,
      filePath.replace(/^resumes\//, ''),
    ]

    const results: any[] = []

    for (const altPath of alternativePaths) {
      try {
        const { data: publicUrl } = supabase.storage
          .from('resumes')
          .getPublicUrl(altPath)

        // Try to fetch the file to see if it exists
        const response = await fetch(publicUrl.publicUrl, { method: 'HEAD' })
        results.push({
          path: altPath,
          url: publicUrl.publicUrl,
          exists: response.ok,
          status: response.status,
        })
      } catch (err) {
        results.push({
          path: altPath,
          error: err,
        })
      }
    }

    return NextResponse.json({
      originalUrl: url,
      originalPath: filePath,
      results,
    })
  } catch (error: any) {
    return NextResponse.json(
      { error: error.message || 'Failed to verify URL' },
      { status: 500 }
    )
  }
}

