'use client'

import Link from 'next/link'
import { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { Container, SectionHeading, Card, Button } from '@/components/ui'
import { ScrollReveal } from '@/components/ScrollReveal'
import '@/lib/i18n'

interface Job {
  id: string
  title: string
  department: string
  location: string
  experience: string
  is_active: boolean
}

export function CareersPageContent() {
  const { t } = useTranslation()
  const [jobs, setJobs] = useState<Job[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function fetchJobs() {
      try {
        const response = await fetch('/api/jobs')
        if (response.ok) {
          const data = await response.json()
          setJobs(data.filter((job: Job) => job.is_active))
        }
      } catch (error) {
        // Silently handle error - user will see "No job openings" message
      } finally {
        setLoading(false)
      }
    }
    fetchJobs()
  }, [])

  return (
    <>
      <section className="relative bg-gradient-hero text-white py-24 md:py-32 overflow-hidden">
        <Container className="relative z-10">
          <ScrollReveal variant="fade">
            <h1 className="text-4xl md:text-6xl font-bold mb-6 text-center">
              {t('nav.careers', 'Careers')}
            </h1>
            <p className="text-xl text-center text-neutral-200 max-w-3xl mx-auto">
              Join our team and build your career with Varcas Enterprises
            </p>
          </ScrollReveal>
        </Container>
      </section>

      <section className="py-20 md:py-24 bg-gradient-elegant relative">
        <div className="absolute inset-0 bg-pattern-mesh opacity-20"></div>
        <Container className="relative z-10">
          <ScrollReveal variant="fade">
            <SectionHeading className="text-center mb-12">
              Current Openings
            </SectionHeading>

            {loading ? (
              <div className="text-center py-12">
                <p className="text-neutral-600">Loading jobs...</p>
              </div>
            ) : jobs.length === 0 ? (
              <Card className="text-center py-12">
                <p className="text-neutral-600 text-lg">
                  {t('careers.noJobs', 'No job openings at the moment. Please check back later.')}
                </p>
              </Card>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {jobs.map((job, index) => (
                  <ScrollReveal key={job.id} variant="up" delay={index * 100}>
                    <Card className="h-full flex flex-col hover:shadow-large transition-all">
                      <h3 className="text-xl font-bold text-primary-700 mb-2">{job.title}</h3>
                      <div className="space-y-2 mb-4 flex-grow">
                        <p className="text-sm text-neutral-600">
                          <span className="font-semibold">Department:</span> {job.department}
                        </p>
                        <p className="text-sm text-neutral-600">
                          <span className="font-semibold">Location:</span> {job.location}
                        </p>
                        <p className="text-sm text-neutral-600">
                          <span className="font-semibold">Experience:</span> {job.experience}
                        </p>
                      </div>
                      <Button variant="primary" as={Link} href={`/careers/${job.id}`} className="w-full">
                        View Details
                      </Button>
                    </Card>
                  </ScrollReveal>
                ))}
              </div>
            )}
          </ScrollReveal>
        </Container>
      </section>
    </>
  )
}

