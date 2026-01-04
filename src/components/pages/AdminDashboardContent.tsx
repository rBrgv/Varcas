'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { Container, Card, Button, SectionHeading } from '@/components/ui'
import { Alert } from '@/components/ui/Alert'
import { useToast } from '@/hooks/useToast'
import { AdminLayout } from '@/components/admin/AdminLayout'

interface Stats {
  totalJobs: number
  activeJobs: number
  totalApplications: number
  totalEnquiries: number
}

export function AdminDashboardContent() {
  const router = useRouter()
  const { showToast, ToastContainer } = useToast()
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(true)
  const [stats, setStats] = useState<Stats | null>(null)

  useEffect(() => {
    // Check if already authenticated
    fetch('/api/admin/check')
      .then((res) => {
        if (res.ok) {
          setIsAuthenticated(true)
          fetchStats()
        }
      })
      .catch(() => {})
      .finally(() => setLoading(false))
  }, [])

  const fetchStats = async () => {
    try {
      const response = await fetch('/api/admin/stats')
      if (response.ok) {
        const data = await response.json()
        setStats(data)
      }
    } catch (error) {
      // Silently handle error - stats will remain at 0
    }
  }


  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')

    const response = await fetch('/api/admin/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ password }),
    })

    if (response.ok) {
      setIsAuthenticated(true)
    } else {
      setError('Invalid password')
    }
  }

  if (loading) {
    return (
      <Container className="py-20">
        <div className="text-center">Loading...</div>
      </Container>
    )
  }

  if (!isAuthenticated) {
    return (
      <Container className="py-20">
        <Card className="max-w-md mx-auto">
          <h2 className="text-2xl font-bold text-primary-700 mb-6">Admin Login</h2>
          <form onSubmit={handleLogin}>
            {error && <Alert variant="error" className="mb-4">{error}</Alert>}
            <div className="mb-4">
              <label className="block text-sm font-medium text-neutral-700 mb-2">
                Password
              </label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="w-full px-4 py-2 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
              />
            </div>
            <Button type="submit" variant="primary" className="w-full mt-4">
              Login
            </Button>
          </form>
        </Card>
      </Container>
    )
  }

  return (
    <AdminLayout title="Admin Dashboard">
      <ToastContainer />

      {stats && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card className="p-6 bg-gradient-to-br from-slate-800/90 to-slate-900/90 backdrop-blur-xl border border-primary-500/20 hover:border-primary-400/40 transition-all hover:shadow-2xl hover:shadow-primary-500/20 group">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-slate-400 mb-2 font-medium">Total Jobs</p>
                <p className="text-4xl font-bold bg-gradient-to-r from-white to-primary-200 bg-clip-text text-transparent">{stats.totalJobs}</p>
              </div>
              <div className="w-14 h-14 bg-gradient-to-br from-primary-500/20 to-primary-600/20 rounded-xl flex items-center justify-center border border-primary-500/30 group-hover:scale-110 transition-transform">
                <svg className="w-7 h-7 text-primary-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
              </div>
            </div>
          </Card>
          <Card className="p-6 bg-gradient-to-br from-slate-800/90 to-slate-900/90 backdrop-blur-xl border border-green-500/20 hover:border-green-400/40 transition-all hover:shadow-2xl hover:shadow-green-500/20 group">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-slate-400 mb-2 font-medium">Active Jobs</p>
                <p className="text-4xl font-bold bg-gradient-to-r from-white to-green-200 bg-clip-text text-transparent">{stats.activeJobs}</p>
              </div>
              <div className="w-14 h-14 bg-gradient-to-br from-green-500/20 to-green-600/20 rounded-xl flex items-center justify-center border border-green-500/30 group-hover:scale-110 transition-transform">
                <svg className="w-7 h-7 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
            </div>
          </Card>
          <Card className="p-6 bg-gradient-to-br from-slate-800/90 to-slate-900/90 backdrop-blur-xl border border-blue-500/20 hover:border-blue-400/40 transition-all hover:shadow-2xl hover:shadow-blue-500/20 group">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-slate-400 mb-2 font-medium">Applications</p>
                <p className="text-4xl font-bold bg-gradient-to-r from-white to-blue-200 bg-clip-text text-transparent">{stats.totalApplications}</p>
              </div>
              <div className="w-14 h-14 bg-gradient-to-br from-blue-500/20 to-blue-600/20 rounded-xl flex items-center justify-center border border-blue-500/30 group-hover:scale-110 transition-transform">
                <svg className="w-7 h-7 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
              </div>
            </div>
          </Card>
          <Card className="p-6 bg-gradient-to-br from-slate-800/90 to-slate-900/90 backdrop-blur-xl border border-purple-500/20 hover:border-purple-400/40 transition-all hover:shadow-2xl hover:shadow-purple-500/20 group">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-slate-400 mb-2 font-medium">Enquiries</p>
                <p className="text-4xl font-bold bg-gradient-to-r from-white to-purple-200 bg-clip-text text-transparent">{stats.totalEnquiries}</p>
              </div>
              <div className="w-14 h-14 bg-gradient-to-br from-purple-500/20 to-purple-600/20 rounded-xl flex items-center justify-center border border-purple-500/30 group-hover:scale-110 transition-transform">
                <svg className="w-7 h-7 text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
              </div>
            </div>
          </Card>
        </div>
      )}
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card className="p-5 bg-gradient-to-br from-slate-800/90 to-slate-900/90 backdrop-blur-xl border border-primary-500/20 hover:border-primary-400/40 transition-all hover:shadow-xl hover:shadow-primary-500/10 group cursor-pointer" onClick={() => router.push('/admin/jobs')}>
          <div className="flex items-center gap-3 mb-4">
            <div className="w-12 h-12 bg-gradient-to-br from-primary-500/30 to-primary-600/30 rounded-lg flex items-center justify-center border border-primary-500/40 group-hover:border-primary-400/60 transition-colors">
              <svg className="w-6 h-6 text-primary-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
            </div>
            <div>
              <h3 className="text-base font-bold text-white mb-0.5">Manage Jobs</h3>
              <p className="text-xs text-slate-400">Create and manage job postings</p>
            </div>
          </div>
          <Button
            variant="primary"
            size="sm"
            className="w-full bg-gradient-to-r from-primary-600 to-primary-500 hover:from-primary-500 hover:to-primary-400"
            onClick={(e) => {
              e.stopPropagation()
              router.push('/admin/jobs')
            }}
          >
            Go to Jobs
          </Button>
        </Card>

        <Card className="p-5 bg-gradient-to-br from-slate-800/90 to-slate-900/90 backdrop-blur-xl border border-primary-500/20 hover:border-primary-400/40 transition-all hover:shadow-xl hover:shadow-primary-500/10 group cursor-pointer" onClick={() => router.push('/admin/applications')}>
          <div className="flex items-center gap-3 mb-4">
            <div className="w-12 h-12 bg-gradient-to-br from-primary-500/30 to-primary-600/30 rounded-lg flex items-center justify-center border border-primary-500/40 group-hover:border-primary-400/60 transition-colors">
              <svg className="w-6 h-6 text-primary-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
            </div>
            <div>
              <h3 className="text-base font-bold text-white mb-0.5">View Applications</h3>
              <p className="text-xs text-slate-400">Review job applications</p>
            </div>
          </div>
          <Button
            variant="primary"
            size="sm"
            className="w-full bg-gradient-to-r from-primary-600 to-primary-500 hover:from-primary-500 hover:to-primary-400"
            onClick={(e) => {
              e.stopPropagation()
              router.push('/admin/applications')
            }}
          >
            Go to Applications
          </Button>
        </Card>

        <Card className="p-5 bg-gradient-to-br from-slate-800/90 to-slate-900/90 backdrop-blur-xl border border-primary-500/20 hover:border-primary-400/40 transition-all hover:shadow-xl hover:shadow-primary-500/10 group cursor-pointer" onClick={() => router.push('/admin/enquiries')}>
          <div className="flex items-center gap-3 mb-4">
            <div className="w-12 h-12 bg-gradient-to-br from-primary-500/30 to-primary-600/30 rounded-lg flex items-center justify-center border border-primary-500/40 group-hover:border-primary-400/60 transition-colors">
              <svg className="w-6 h-6 text-primary-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
            </div>
            <div>
              <h3 className="text-base font-bold text-white mb-0.5">View Enquiries</h3>
              <p className="text-xs text-slate-400">Check form submissions</p>
            </div>
          </div>
          <Button
            variant="primary"
            size="sm"
            className="w-full bg-gradient-to-r from-primary-600 to-primary-500 hover:from-primary-500 hover:to-primary-400"
            onClick={(e) => {
              e.stopPropagation()
              router.push('/admin/enquiries')
            }}
          >
            Go to Enquiries
          </Button>
        </Card>
      </div>
    </AdminLayout>
  )
}

