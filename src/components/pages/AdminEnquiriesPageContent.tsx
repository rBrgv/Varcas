'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { Container, Card, Button, SectionHeading, Input } from '@/components/ui'
import { Alert } from '@/components/ui/Alert'
import { getResumeUrl } from '@/lib/utils/resumeUrl'
import { useToast } from '@/hooks/useToast'
import { AdminLayout } from '@/components/admin/AdminLayout'

interface Enquiry {
  id: string
  name: string
  email: string
  phone: string
  service_type: 'solar' | 'telecom' | 'hr' | 'general'
  message: string
  language: string
  resume_url?: string
  created_at: string
}

export function AdminEnquiriesPageContent() {
  const router = useRouter()
  const { showToast, ToastContainer } = useToast()
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [enquiries, setEnquiries] = useState<Enquiry[]>([])
  const [filteredEnquiries, setFilteredEnquiries] = useState<Enquiry[]>([])
  const [loading, setLoading] = useState(true)
  const [selectedEnquiry, setSelectedEnquiry] = useState<Enquiry | null>(null)
  const [searchQuery, setSearchQuery] = useState('')
  const [currentPage, setCurrentPage] = useState(1)
  const [selectedIds, setSelectedIds] = useState<Set<string>>(new Set())
  const [dateFilter, setDateFilter] = useState<'all' | 'today' | 'week' | 'month'>('all')
  const [serviceFilter, setServiceFilter] = useState<string>('all')
  const itemsPerPage = 10

  useEffect(() => {
    // Check if already authenticated
    fetch('/api/admin/check')
      .then((res) => {
        if (res.ok) {
          setIsAuthenticated(true)
          fetchEnquiries()
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
      fetchEnquiries()
    } else {
      setError('Invalid password')
    }
  }

  const fetchEnquiries = async () => {
    try {
      const response = await fetch('/api/admin/enquiries')
      if (response.ok) {
        const data = await response.json()
        setEnquiries(data)
        setFilteredEnquiries(data)
      } else {
        const errorData = await response.json().catch(() => ({}))
        setError(`Failed to load enquiries: ${errorData.error || 'Unknown error'}`)
      }
    } catch (error) {
      setError('Failed to load enquiries. Please try again.')
    }
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleString('en-IN', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    })
  }

  const getServiceTypeColor = (type: string) => {
    switch (type) {
      case 'solar':
        return 'bg-green-500/20 text-green-400 border border-green-500/30'
      case 'telecom':
        return 'bg-blue-500/20 text-blue-400 border border-blue-500/30'
      case 'hr':
        return 'bg-purple-500/20 text-purple-400 border border-purple-500/30'
      default:
        return 'bg-slate-700/50 text-slate-400 border border-slate-600/50'
    }
  }

  useEffect(() => {
    let filtered = [...enquiries]

    // Apply search filter
    if (searchQuery) {
      const query = searchQuery.toLowerCase()
      filtered = filtered.filter(
        (enq) =>
          enq.name.toLowerCase().includes(query) ||
          enq.email.toLowerCase().includes(query) ||
          enq.phone.includes(query) ||
          enq.message.toLowerCase().includes(query) ||
          enq.service_type.toLowerCase().includes(query)
      )
    }

    // Apply service filter
    if (serviceFilter !== 'all') {
      filtered = filtered.filter((enq) => enq.service_type === serviceFilter)
    }

    // Apply date filter
    if (dateFilter !== 'all') {
      const now = new Date()
      const filterDate = new Date()
      
      switch (dateFilter) {
        case 'today':
          filterDate.setHours(0, 0, 0, 0)
          break
        case 'week':
          filterDate.setDate(now.getDate() - 7)
          break
        case 'month':
          filterDate.setDate(now.getDate() - 30)
          break
      }

      filtered = filtered.filter((enq) => new Date(enq.created_at) >= filterDate)
    }

    setFilteredEnquiries(filtered)
    setCurrentPage(1)
  }, [enquiries, searchQuery, dateFilter, serviceFilter])


  const handleDelete = async (id: string, name: string) => {
    if (!confirm(`Are you sure you want to delete the enquiry from "${name}"? This action cannot be undone.`)) {
      return
    }

    const response = await fetch(`/api/admin/enquiries/${id}`, {
      method: 'DELETE',
    })

    if (response.ok) {
      fetchEnquiries()
      showToast('Enquiry deleted successfully', 'success')
    } else {
      showToast('Failed to delete enquiry', 'error')
    }
  }

  const handleBulkDelete = async () => {
    if (selectedIds.size === 0) return
    if (!confirm(`Are you sure you want to delete ${selectedIds.size} enquiry(ies)? This action cannot be undone.`)) {
      return
    }

    const deletePromises = Array.from(selectedIds).map((id) =>
      fetch(`/api/admin/enquiries/${id}`, { method: 'DELETE' })
    )

    const results = await Promise.all(deletePromises)
    const successCount = results.filter((r) => r.ok).length

    if (successCount > 0) {
      fetchEnquiries()
      setSelectedIds(new Set())
      showToast(`Deleted ${successCount} enquiry(ies) successfully`, 'success')
    } else {
      showToast('Failed to delete enquiries', 'error')
    }
  }

  const handleExport = () => {
    const csvContent = [
      ['Date', 'Name', 'Email', 'Phone', 'Service Type', 'Language', 'Message'].join(','),
      ...filteredEnquiries.map((enq) =>
        [
          formatDate(enq.created_at),
          `"${enq.name}"`,
          `"${enq.email}"`,
          `"${enq.phone}"`,
          `"${enq.service_type}"`,
          `"${enq.language}"`,
          `"${enq.message.replace(/"/g, '""')}"`,
        ].join(',')
      ),
    ].join('\n')

    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' })
    const link = document.createElement('a')
    link.href = URL.createObjectURL(blob)
    link.download = `enquiries-${new Date().toISOString().split('T')[0]}.csv`
    link.click()
    showToast('Enquiries exported successfully', 'success')
  }

  const toggleSelection = (id: string) => {
    const newSelected = new Set(selectedIds)
    if (newSelected.has(id)) {
      newSelected.delete(id)
    } else {
      newSelected.add(id)
    }
    setSelectedIds(newSelected)
  }

  const toggleAllSelection = () => {
    const paginated = filteredEnquiries.slice(
      (currentPage - 1) * itemsPerPage,
      currentPage * itemsPerPage
    )
    if (selectedIds.size === paginated.length) {
      setSelectedIds(new Set())
    } else {
      setSelectedIds(new Set(paginated.map((e) => e.id)))
    }
  }

  const totalPages = Math.ceil(filteredEnquiries.length / itemsPerPage)
  const startIndex = (currentPage - 1) * itemsPerPage
  const paginatedEnquiries = filteredEnquiries.slice(startIndex, startIndex + itemsPerPage)

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
    <AdminLayout
      title={`Form Enquiries (${filteredEnquiries.length})`}
      onRefresh={fetchEnquiries}
      actions={
        <>
          <Button
            variant="outline"
            size="sm"
            onClick={handleExport}
            disabled={filteredEnquiries.length === 0}
          >
            <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
            Export CSV
          </Button>
          {selectedIds.size > 0 && (
            <Button
              variant="outline"
              size="sm"
              onClick={handleBulkDelete}
              className="text-red-600 hover:text-red-700 hover:border-red-300"
            >
              Delete Selected ({selectedIds.size})
            </Button>
          )}
        </>
      }
    >
      <ToastContainer />

      {/* Search and Filters */}
      <Card variant="dark" className="mb-6 p-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Input
            label="Search"
            placeholder="Search by name, email, phone, message..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <div>
            <label className="block text-sm font-medium text-slate-300 mb-2">
              Service Type
            </label>
            <select
              value={serviceFilter}
              onChange={(e) => setServiceFilter(e.target.value)}
              className="w-full px-4 py-2 bg-slate-700/50 border border-slate-600/50 rounded-lg text-slate-200 focus:ring-2 focus:ring-primary-500 focus:border-primary-500/50"
            >
              <option value="all" className="bg-slate-800">All Services</option>
              <option value="solar" className="bg-slate-800">Solar</option>
              <option value="telecom" className="bg-slate-800">Telecom</option>
              <option value="hr" className="bg-slate-800">HR</option>
              <option value="general" className="bg-slate-800">General</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-300 mb-2">
              Date Filter
            </label>
            <select
              value={dateFilter}
              onChange={(e) => setDateFilter(e.target.value as any)}
              className="w-full px-4 py-2 bg-slate-700/50 border border-slate-600/50 rounded-lg text-slate-200 focus:ring-2 focus:ring-primary-500 focus:border-primary-500/50"
            >
              <option value="all" className="bg-slate-800">All Time</option>
              <option value="today" className="bg-slate-800">Today</option>
              <option value="week" className="bg-slate-800">Last 7 Days</option>
              <option value="month" className="bg-slate-800">Last 30 Days</option>
            </select>
          </div>
        </div>
      </Card>

      {filteredEnquiries.length === 0 ? (
        <Card variant="dark">
          <div className="text-center py-12 text-slate-400">
            {searchQuery || dateFilter !== 'all' || serviceFilter !== 'all' ? 'No enquiries found matching your filters.' : 'No enquiries yet.'}
          </div>
        </Card>
      ) : (
        <Card variant="dark" className="overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gradient-to-r from-slate-800/90 to-slate-700/90 border-b border-primary-500/30">
                <tr>
                  <th className="px-6 py-4 text-left">
                    <input
                      type="checkbox"
                      checked={selectedIds.size === paginatedEnquiries.length && paginatedEnquiries.length > 0}
                      onChange={toggleAllSelection}
                      className="w-4 h-4 accent-primary-500"
                    />
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-bold text-slate-200 uppercase tracking-wider cursor-pointer hover:bg-slate-700/50 transition-colors"
                    onClick={() => {
                      const sorted = [...filteredEnquiries].sort((a, b) => 
                        new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
                      )
                      setFilteredEnquiries(sorted)
                    }}
                  >
                    Date
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-bold text-slate-200 uppercase tracking-wider">
                    Name
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-bold text-slate-200 uppercase tracking-wider">
                    Contact
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-bold text-slate-200 uppercase tracking-wider">
                    Service
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-bold text-slate-200 uppercase tracking-wider">
                    Message
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-bold text-slate-200 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-700/50">
                {paginatedEnquiries.map((enquiry, index) => (
                  <tr 
                    key={enquiry.id} 
                    className={`transition-all duration-200 ${
                      index % 2 === 0 
                        ? 'bg-slate-800/40 hover:bg-slate-800/60' 
                        : 'bg-slate-800/20 hover:bg-slate-800/40'
                    } hover:border-l-2 hover:border-primary-500/50`}
                  >
                    <td className="px-6 py-4 whitespace-nowrap">
                      <input
                        type="checkbox"
                        checked={selectedIds.has(enquiry.id)}
                        onChange={() => toggleSelection(enquiry.id)}
                        className="w-4 h-4 accent-primary-500"
                      />
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-300">
                      {formatDate(enquiry.created_at)}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm font-semibold text-white">
                        {enquiry.name}
                      </div>
                      <div className="text-xs text-slate-400 mt-1">
                        {enquiry.language.toUpperCase()}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm">
                        <a
                          href={`mailto:${enquiry.email}`}
                          className="text-primary-400 hover:text-primary-300 block transition-colors"
                        >
                          {enquiry.email}
                        </a>
                        <a
                          href={`tel:${enquiry.phone}`}
                          className="text-primary-400 hover:text-primary-300 block mt-1 transition-colors"
                        >
                          {enquiry.phone}
                        </a>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`px-2 py-1 rounded-full text-xs font-semibold ${getServiceTypeColor(enquiry.service_type)}`}>
                        {enquiry.service_type.toUpperCase()}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <div className="text-sm text-slate-300 max-w-xs">
                        <p className="line-clamp-2">{enquiry.message}</p>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm">
                      <div className="flex gap-2">
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => setSelectedEnquiry(enquiry)}
                          className="bg-slate-700/50 border-slate-600 text-slate-200 hover:bg-slate-600 hover:text-white"
                        >
                          View
                        </Button>
                        {enquiry.resume_url && (
                          <a
                            href={getResumeUrl(enquiry.resume_url) || enquiry.resume_url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center px-3 py-1.5 text-xs font-medium text-blue-400 hover:text-blue-300 border border-blue-500/40 rounded-lg hover:bg-blue-500/10 transition-all"
                          >
                            Resume
                          </a>
                        )}
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => handleDelete(enquiry.id, enquiry.name)}
                          className="bg-red-600/20 border-red-500/50 text-red-300 hover:bg-red-600/30 hover:border-red-400"
                        >
                          Delete
                        </Button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Card>
      )}

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

      {/* Detail Modal */}
      {selectedEnquiry && (
        <div
          className="fixed inset-0 bg-black/70 backdrop-blur-sm z-50 flex items-center justify-center p-4"
          onClick={() => setSelectedEnquiry(null)}
        >
          <div
            className="max-w-2xl w-full max-h-[90vh] overflow-y-auto bg-gradient-to-br from-slate-800/95 to-slate-900/95 backdrop-blur-xl shadow-2xl border-2 border-primary-500/30 rounded-2xl p-6"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex justify-between items-start mb-4">
              <div>
                <h3 className="text-2xl font-bold text-white mb-2">
                  {selectedEnquiry.name}
                </h3>
                <div className="flex flex-wrap gap-2 mb-2">
                  <span className={`px-3 py-1 rounded-full text-xs font-semibold ${getServiceTypeColor(selectedEnquiry.service_type)}`}>
                    {selectedEnquiry.service_type.toUpperCase()}
                  </span>
                  <span className="px-3 py-1 rounded-full text-xs font-semibold bg-slate-700/50 text-slate-300 border border-slate-600/50">
                    {selectedEnquiry.language.toUpperCase()}
                  </span>
                </div>
              </div>
              <button
                onClick={() => setSelectedEnquiry(null)}
                className="text-slate-400 hover:text-white transition-colors"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
              <div>
                <p className="text-sm font-medium text-slate-300 mb-1">Email</p>
                <a href={`mailto:${selectedEnquiry.email}`} className="text-primary-400 hover:text-primary-300 transition-colors">
                  {selectedEnquiry.email}
                </a>
              </div>
              <div>
                <p className="text-sm font-medium text-slate-300 mb-1">Phone</p>
                <a href={`tel:${selectedEnquiry.phone}`} className="text-primary-400 hover:text-primary-300 transition-colors">
                  {selectedEnquiry.phone}
                </a>
              </div>
            </div>

            <div className="mb-4">
              <p className="text-sm font-medium text-slate-300 mb-2">Message</p>
              <p className="text-slate-200 whitespace-pre-wrap bg-slate-700/30 p-4 rounded-lg border border-slate-600/50">
                {selectedEnquiry.message}
              </p>
            </div>

            {selectedEnquiry.resume_url && (
              <div className="mb-4">
                <a
                  href={getResumeUrl(selectedEnquiry.resume_url) || selectedEnquiry.resume_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 text-primary-400 hover:text-primary-300 font-medium transition-colors"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                  View Resume
                </a>
              </div>
            )}

            <div className="flex gap-4 pt-4 border-t border-slate-700/50">
              <Button
                variant="outline"
                onClick={() => setSelectedEnquiry(null)}
                className="flex-1 bg-slate-700/50 border-slate-600 text-slate-200 hover:bg-slate-600 hover:text-white"
              >
                Close
              </Button>
              <Button
                variant="outline"
                onClick={() => {
                  if (selectedEnquiry) {
                    handleDelete(selectedEnquiry.id, selectedEnquiry.name)
                    setSelectedEnquiry(null)
                  }
                }}
                className="flex-1 bg-red-600/20 border-red-500/50 text-red-300 hover:bg-red-600/30 hover:border-red-400"
              >
                Delete
              </Button>
            </div>
          </div>
        </div>
      )}
    </AdminLayout>
  )
}

