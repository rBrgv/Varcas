'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { Container, SectionHeading, Card, Button, Input, Textarea, Select, Alert } from '@/components/ui'
import { ScrollReveal } from '@/components/ScrollReveal'
import { useToast } from '@/hooks/useToast'
import { AdminLayout } from '@/components/admin/AdminLayout'

interface Job {
  id: string
  title: string
  department: string
  location: string
  experience: string
  description: string
  requirements: string
  is_active: boolean
}

export function AdminJobsPageContent() {
  const router = useRouter()
  const { showToast, ToastContainer } = useToast()
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [jobs, setJobs] = useState<Job[]>([])
  const [filteredJobs, setFilteredJobs] = useState<Job[]>([])
  const [loading, setLoading] = useState(true)
  const [showForm, setShowForm] = useState(false)
  const [editingJob, setEditingJob] = useState<Job | null>(null)
  const [searchQuery, setSearchQuery] = useState('')
  const [currentPage, setCurrentPage] = useState(1)
  const [sortField, setSortField] = useState<keyof Job | ''>('')
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('asc')
  const [selectedJobs, setSelectedJobs] = useState<Set<string>>(new Set())
  const itemsPerPage = 10
  const [formData, setFormData] = useState({
    title: '',
    department: '',
    location: '',
    experience: '',
    description: '',
    requirements: '',
    is_active: true,
  })

  useEffect(() => {
    // Check if already authenticated
    fetch('/api/admin/check')
      .then((res) => {
        if (res.ok) {
          setIsAuthenticated(true)
          fetchJobs()
        }
      })
      .catch(() => {})
      .finally(() => setLoading(false))
  }, [])

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
      fetchJobs()
    } else {
      setError('Invalid password')
    }
  }

  const fetchJobs = async () => {
    try {
      const response = await fetch('/api/admin/jobs')
      if (response.ok) {
        const data = await response.json()
        setJobs(data)
        setFilteredJobs(data)
      }
    } catch (error) {
      // Silently handle error
    }
  }

  useEffect(() => {
    let filtered = [...jobs]

    // Apply search filter
    if (searchQuery) {
      const query = searchQuery.toLowerCase()
      filtered = filtered.filter(
        (job) =>
          job.title.toLowerCase().includes(query) ||
          job.department.toLowerCase().includes(query) ||
          job.location.toLowerCase().includes(query) ||
          job.experience.toLowerCase().includes(query)
      )
    }

    // Apply sorting
    if (sortField) {
      filtered.sort((a, b) => {
        const aVal = a[sortField]
        const bVal = b[sortField]
        if (aVal < bVal) return sortDirection === 'asc' ? -1 : 1
        if (aVal > bVal) return sortDirection === 'asc' ? 1 : -1
        return 0
      })
    }

    setFilteredJobs(filtered)
    setCurrentPage(1)
  }, [jobs, searchQuery, sortField, sortDirection])

  const handleSort = (field: keyof Job) => {
    if (sortField === field) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc')
    } else {
      setSortField(field)
      setSortDirection('asc')
    }
  }


  const totalPages = Math.ceil(filteredJobs.length / itemsPerPage)
  const startIndex = (currentPage - 1) * itemsPerPage
  const paginatedJobs = filteredJobs.slice(startIndex, startIndex + itemsPerPage)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    const url = editingJob ? `/api/admin/jobs/${editingJob.id}` : '/api/admin/jobs'
    const method = editingJob ? 'PUT' : 'POST'

    const response = await fetch(url, {
      method,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(formData),
    })

    if (response.ok) {
      setShowForm(false)
      setEditingJob(null)
      setFormData({
        title: '',
        department: '',
        location: '',
        experience: '',
        description: '',
        requirements: '',
        is_active: true,
      })
      fetchJobs()
      showToast(editingJob ? 'Job updated successfully' : 'Job created successfully', 'success')
    } else {
      showToast('Failed to save job', 'error')
    }
  }

  const handleEdit = (job: Job) => {
    setEditingJob(job)
    setFormData({
      title: job.title,
      department: job.department,
      location: job.location,
      experience: job.experience,
      description: job.description,
      requirements: job.requirements,
      is_active: job.is_active,
    })
    setShowForm(true)
  }

  const handleToggleActive = async (job: Job) => {
    const response = await fetch(`/api/admin/jobs/${job.id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ ...job, is_active: !job.is_active }),
    })

    if (response.ok) {
      fetchJobs()
      showToast(`Job ${job.is_active ? 'deactivated' : 'activated'} successfully`, 'success')
    } else {
      showToast('Failed to update job status', 'error')
    }
  }

  const handleDelete = async (job: Job) => {
    if (!confirm(`Are you sure you want to delete "${job.title}"? This action cannot be undone.`)) {
      return
    }

    const response = await fetch(`/api/admin/jobs/${job.id}`, {
      method: 'DELETE',
    })

    if (response.ok) {
      fetchJobs()
      showToast('Job deleted successfully', 'success')
    } else {
      showToast('Failed to delete job', 'error')
    }
  }

  const handleBulkDelete = async () => {
    if (selectedJobs.size === 0) return
    if (!confirm(`Are you sure you want to delete ${selectedJobs.size} job(s)? This action cannot be undone.`)) {
      return
    }

    const deletePromises = Array.from(selectedJobs).map((id) =>
      fetch(`/api/admin/jobs/${id}`, { method: 'DELETE' })
    )

    const results = await Promise.all(deletePromises)
    const successCount = results.filter((r) => r.ok).length

    if (successCount > 0) {
      fetchJobs()
      setSelectedJobs(new Set())
      showToast(`Deleted ${successCount} job(s) successfully`, 'success')
    } else {
      showToast('Failed to delete jobs', 'error')
    }
  }

  const handleExport = () => {
    const csvContent = [
      ['Title', 'Department', 'Location', 'Experience', 'Status', 'Description', 'Requirements'].join(','),
      ...filteredJobs.map((job) =>
        [
          `"${job.title}"`,
          `"${job.department}"`,
          `"${job.location}"`,
          `"${job.experience}"`,
          job.is_active ? 'Active' : 'Inactive',
          `"${job.description.replace(/"/g, '""')}"`,
          `"${job.requirements.replace(/"/g, '""')}"`,
        ].join(',')
      ),
    ].join('\n')

    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' })
    const link = document.createElement('a')
    link.href = URL.createObjectURL(blob)
    link.download = `jobs-${new Date().toISOString().split('T')[0]}.csv`
    link.click()
    showToast('Jobs exported successfully', 'success')
  }

  const toggleJobSelection = (jobId: string) => {
    const newSelected = new Set(selectedJobs)
    if (newSelected.has(jobId)) {
      newSelected.delete(jobId)
    } else {
      newSelected.add(jobId)
    }
    setSelectedJobs(newSelected)
  }

  const toggleAllSelection = () => {
    if (selectedJobs.size === paginatedJobs.length) {
      setSelectedJobs(new Set())
    } else {
      setSelectedJobs(new Set(paginatedJobs.map((j) => j.id)))
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
            <Input
              type="password"
              label="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <Button type="submit" variant="primary" className="w-full mt-4">
              Login
            </Button>
          </form>
        </Card>
      </Container>
    )
  }

  return (
    <AdminLayout
      title={`Manage Jobs (${filteredJobs.length})`}
      onRefresh={fetchJobs}
      actions={
        <>
          <Button
            variant="outline"
            size="sm"
            onClick={handleExport}
            disabled={filteredJobs.length === 0}
            className="bg-slate-700/50 border-slate-600 text-slate-200 hover:bg-slate-600 hover:text-white disabled:opacity-30 disabled:cursor-not-allowed"
          >
            <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
            Export CSV
          </Button>
          {selectedJobs.size > 0 && (
            <Button
              variant="outline"
              size="sm"
              onClick={handleBulkDelete}
              className="bg-red-600/20 border-red-500/50 text-red-300 hover:bg-red-600/30 hover:border-red-400"
            >
              Delete Selected ({selectedJobs.size})
            </Button>
          )}
          <Button
            variant="primary"
            size="sm"
            onClick={() => {
              setShowForm(true)
              setEditingJob(null)
              setFormData({
                title: '',
                department: '',
                location: '',
                experience: '',
                description: '',
                requirements: '',
                is_active: true,
              })
            }}
            className="bg-gradient-to-r from-primary-600 to-primary-500 hover:from-primary-500 hover:to-primary-400"
          >
            <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
            </svg>
            Add Job
          </Button>
        </>
      }
    >
      <ToastContainer />

      {/* Search and Filters */}
      <Card variant="dark" className="mb-6 p-4">
        <div className="flex gap-4 items-center flex-wrap">
          <div className="flex-1 min-w-[200px]">
            <Input
              label="Search"
              placeholder="Search by title, department, location..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
        </div>
      </Card>

      {showForm && (
        <Card variant="dark" className="mb-8">
          <h3 className="text-xl font-bold text-white mb-4">
            {editingJob ? 'Edit Job' : 'Create New Job'}
          </h3>
          <form onSubmit={handleSubmit} className="space-y-4">
            <Input
              label="Title"
              value={formData.title}
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
              required
            />
            <Input
              label="Department"
              value={formData.department}
              onChange={(e) => setFormData({ ...formData, department: e.target.value })}
              required
            />
            <Input
              label="Location"
              value={formData.location}
              onChange={(e) => setFormData({ ...formData, location: e.target.value })}
              required
            />
            <Input
              label="Experience"
              value={formData.experience}
              onChange={(e) => setFormData({ ...formData, experience: e.target.value })}
              required
            />
            <Textarea
              label="Description"
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              required
              rows={5}
            />
            <Textarea
              label="Requirements"
              value={formData.requirements}
              onChange={(e) => setFormData({ ...formData, requirements: e.target.value })}
              required
              rows={5}
            />
            <div className="flex items-center gap-2">
              <input
                type="checkbox"
                id="is_active"
                checked={formData.is_active}
                onChange={(e) => setFormData({ ...formData, is_active: e.target.checked })}
                className="w-4 h-4"
              />
              <label htmlFor="is_active" className="text-sm text-slate-300">
                Active
              </label>
            </div>
            <div className="flex gap-4">
              <Button 
                type="submit" 
                variant="primary"
                className="bg-gradient-to-r from-primary-600 to-primary-500 hover:from-primary-500 hover:to-primary-400"
              >
                {editingJob ? 'Update' : 'Create'}
              </Button>
              <Button
                type="button"
                variant="outline"
                onClick={() => {
                  setShowForm(false)
                  setEditingJob(null)
                }}
                className="bg-slate-700/50 border-slate-600 text-slate-200 hover:bg-slate-600 hover:text-white"
              >
                Cancel
              </Button>
            </div>
          </form>
        </Card>
      )}

      {paginatedJobs.length === 0 ? (
        <Card variant="dark">
          <div className="text-center py-12 text-slate-400">
            {searchQuery ? 'No jobs found matching your search.' : 'No jobs yet.'}
          </div>
        </Card>
      ) : (
        <>
          <div className="space-y-4">
            {paginatedJobs.map((job) => (
              <Card variant="dark" key={job.id}>
                <div className="flex justify-between items-start">
                  <div className="flex items-start gap-3 flex-grow">
                    <input
                      type="checkbox"
                      checked={selectedJobs.has(job.id)}
                      onChange={() => toggleJobSelection(job.id)}
                      className="mt-1 w-4 h-4 accent-primary-500"
                    />
                    <div className="flex-grow">
                      <div className="flex items-center gap-3 mb-2">
                        <h3 className="text-xl font-bold text-white">{job.title}</h3>
                        <span
                          className={`px-2 py-1 rounded text-xs font-semibold ${
                            job.is_active
                              ? 'bg-green-500/20 text-green-400 border border-green-500/30'
                              : 'bg-slate-700/50 text-slate-400 border border-slate-600/50'
                          }`}
                        >
                          {job.is_active ? 'Active' : 'Inactive'}
                        </span>
                      </div>
                      <p className="text-slate-400">
                        {job.department} • {job.location} • {job.experience}
                      </p>
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <Button 
                      variant="outline" 
                      size="sm" 
                      onClick={() => handleEdit(job)}
                      className="bg-slate-700/50 border-slate-600 text-slate-200 hover:bg-slate-600 hover:text-white"
                    >
                      Edit
                    </Button>
                    <Button
                      variant={job.is_active ? 'outline' : 'primary'}
                      size="sm"
                      onClick={() => handleToggleActive(job)}
                      className={job.is_active 
                        ? "bg-slate-700/50 border-slate-600 text-slate-200 hover:bg-slate-600 hover:text-white"
                        : "bg-gradient-to-r from-primary-600 to-primary-500 hover:from-primary-500 hover:to-primary-400"
                      }
                    >
                      {job.is_active ? 'Deactivate' : 'Activate'}
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleDelete(job)}
                      className="bg-red-600/20 border-red-500/50 text-red-300 hover:bg-red-600/30 hover:border-red-400"
                    >
                      Delete
                    </Button>
                  </div>
                </div>
              </Card>
            ))}
          </div>

          {/* Pagination */}
          {totalPages > 1 && (
            <div className="flex justify-center items-center gap-4 mt-6">
              <Button
                variant="outline"
                onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
                disabled={currentPage === 1}
                className="bg-slate-700/50 border-slate-600 text-slate-200 hover:bg-slate-600 hover:text-white disabled:opacity-30 disabled:cursor-not-allowed"
              >
                Previous
              </Button>
              <span className="text-slate-300">
                Page {currentPage} of {totalPages}
              </span>
              <Button
                variant="outline"
                onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
                disabled={currentPage === totalPages}
                className="bg-slate-700/50 border-slate-600 text-slate-200 hover:bg-slate-600 hover:text-white disabled:opacity-30 disabled:cursor-not-allowed"
              >
                Next
              </Button>
            </div>
          )}
        </>
      )}
    </AdminLayout>
  )
}

