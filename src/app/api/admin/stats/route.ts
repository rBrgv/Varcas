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

    const [jobsResult, applicationsResult, enquiriesResult] = await Promise.all([
      supabase.from('jobs').select('id', { count: 'exact', head: true }),
      supabase.from('job_applications').select('id', { count: 'exact', head: true }),
      supabase.from('enquiries').select('id', { count: 'exact', head: true }),
    ])

    const activeJobsResult = await supabase
      .from('jobs')
      .select('id', { count: 'exact', head: true })
      .eq('is_active', true)

    return NextResponse.json({
      totalJobs: jobsResult.count || 0,
      activeJobs: activeJobsResult.count || 0,
      totalApplications: applicationsResult.count || 0,
      totalEnquiries: enquiriesResult.count || 0,
    })
  } catch (error: any) {
    return NextResponse.json({ error: 'Failed to fetch statistics' }, { status: 500 })
  }
}

