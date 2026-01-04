import { NextRequest, NextResponse } from 'next/server'
import { cookies } from 'next/headers'
import { supabaseServer } from '@/lib/supabase/server'

async function checkAuth() {
  const cookieStore = await cookies()
  const adminCookie = cookieStore.get('admin_ok')
  return adminCookie?.value === 'true'
}

export async function GET() {
  if (!(await checkAuth())) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  try {
    const supabase = supabaseServer()

    const { data, error } = await supabase
      .from('job_applications')
      .select(`
        *,
        jobs (
          id,
          title,
          department
        )
      `)
      .order('created_at', { ascending: false })

    if (error) {
      if (error.code === '42501' || error.message?.includes('policy')) {
        return NextResponse.json({
          error: 'RLS policy blocking access. Please ensure SUPABASE_SERVICE_ROLE_KEY is set correctly.'
        }, { status: 500 })
      }

      return NextResponse.json({ error: 'Failed to fetch applications' }, { status: 500 })
    }

    return NextResponse.json(data || [])
  } catch (error: any) {
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}

