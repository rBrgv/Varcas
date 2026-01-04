'use client'

import Link from 'next/link'
import { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { Container, SectionHeading, Card, Button } from '@/components/ui'
import { ScrollReveal } from '@/components/ScrollReveal'
import { SmartEnquiryForm } from '@/components/SmartEnquiryForm'
import '@/lib/i18n'

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

export function JobDetailContent({ jobId }: { jobId: string }) {
  const { t } = useTranslation()
  const [job, setJob] = useState<Job | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function fetchJob() {
      try {
        const response = await fetch(`/api/jobs/${jobId}`)
        if (response.ok) {
          const data = await response.json()
          setJob(data)
        }
      } catch (error) {
        // Silently handle error - user will see "Job Not Found" message
      } finally {
        setLoading(false)
      }
    }
    fetchJob()
  }, [jobId])

  if (loading) {
    return (
      <Container className="py-20">
        <div className="text-center">
          <p className="text-neutral-600">Loading job details...</p>
        </div>
      </Container>
    )
  }

  if (!job) {
    return (
      <Container className="py-20">
        <Card className="text-center py-12">
          <h2 className="text-2xl font-bold text-primary-700 mb-4">Job Not Found</h2>
          <p className="text-neutral-600 mb-6">The job you&apos;re looking for doesn&apos;t exist or has been removed.</p>
          <Button variant="primary" as={Link} href="/careers">
            Back to Careers
          </Button>
        </Card>
      </Container>
    )
  }

  return (
    <>
      <section className="relative bg-gradient-hero text-white py-24 md:py-32 overflow-hidden">
        <Container className="relative z-10">
          <ScrollReveal variant="fade">
            <h1 className="text-4xl md:text-6xl font-bold mb-6">{job.title}</h1>
            <div className="flex flex-wrap gap-4 text-neutral-200">
              <span>{job.department}</span>
              <span>•</span>
              <span>{job.location}</span>
              <span>•</span>
              <span>{job.experience}</span>
            </div>
          </ScrollReveal>
        </Container>
      </section>

      <section className="py-20 md:py-24 bg-gradient-cool relative">
        <div className="absolute inset-0 bg-pattern-mesh opacity-15"></div>
        <Container className="relative z-10">
          <div className="max-w-4xl mx-auto">
            <ScrollReveal variant="fade">
              <Card className="mb-8">
                <h2 className="text-2xl font-bold text-primary-700 mb-4">Job Description</h2>
                <p className="text-neutral-700 whitespace-pre-line">{job.description}</p>
              </Card>

              <Card className="mb-8">
                <h2 className="text-2xl font-bold text-primary-700 mb-4">Requirements</h2>
                <p className="text-neutral-700 whitespace-pre-line">{job.requirements}</p>
              </Card>

              <div className="text-center">
                <Button variant="primary" size="lg" as={Link} href="/careers" className="mr-4">
                  Back to Careers
                </Button>
              </div>
            </ScrollReveal>
          </div>
        </Container>
      </section>

      <section className="py-20 bg-gradient-warm relative">
        <Container className="relative z-10">
          <ScrollReveal variant="fade">
            <SectionHeading className="text-center mb-12">
              Apply for This Position
            </SectionHeading>
            <div className="max-w-2xl mx-auto">
              <SmartEnquiryForm jobId={jobId} serviceType="hr" />
            </div>
          </ScrollReveal>
        </Container>
      </section>
    </>
  )
}

