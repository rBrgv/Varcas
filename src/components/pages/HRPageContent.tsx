'use client'

import Link from 'next/link'
import { useRef } from 'react'
import { useTranslation } from 'react-i18next'
import { Container, SectionHeading, Card, Button } from '@/components/ui'
import { ScrollReveal } from '@/components/ScrollReveal'
import { SmartEnquiryForm } from '@/components/SmartEnquiryForm'
import '@/lib/i18n'

export function HRPageContent() {
  const { t } = useTranslation()
  const enquiryFormRef = useRef<HTMLElement>(null)

  const hiringTypes = [
    {
      title: 'Permanent Hiring',
      description: 'Full-time permanent positions across various departments',
    },
    {
      title: 'Contract Hiring',
      description: 'Contract-based positions for project-specific requirements',
    },
    {
      title: 'Technical Roles',
      description: 'Engineering, IT, and technical positions',
    },
    {
      title: 'Non-Technical Roles',
      description: 'Administrative, sales, and support positions',
    },
  ]

  return (
    <>
      <section className="relative bg-gradient-hero text-white py-24 md:py-32 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-hr-500/30 via-transparent to-accent-500/20"></div>
        <Container className="relative z-10">
          <ScrollReveal variant="fade">
            <h1 className="text-4xl md:text-6xl font-bold mb-6 text-center">
              {t('service.hr.title', 'HR Services')}
            </h1>
            <p className="text-xl text-center text-neutral-200 max-w-3xl mx-auto">
              Strategic HR recruitment and talent management services
            </p>
          </ScrollReveal>
        </Container>
      </section>

      <section className="py-20 md:py-24 bg-gradient-warm relative">
        <div className="absolute inset-0 bg-pattern-mesh opacity-20"></div>
        <Container className="relative z-10">
          <ScrollReveal variant="fade">
            <SectionHeading className="text-center mb-12">
              Our Hiring Services
            </SectionHeading>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {hiringTypes.map((type, index) => (
                <ScrollReveal key={type.title} variant="scale" delay={index * 100}>
                  <Card className="h-full">
                    <h3 className="text-xl font-bold text-primary-700 mb-3">{type.title}</h3>
                    <p className="text-neutral-600">{type.description}</p>
                  </Card>
                </ScrollReveal>
              ))}
            </div>
          </ScrollReveal>
        </Container>
      </section>

      <section className="py-20 bg-gradient-elegant relative">
        <Container className="relative z-10">
          <ScrollReveal variant="fade">
            <div className="text-center max-w-3xl mx-auto">
              <h2 className="text-3xl font-bold text-primary-700 mb-4">
                Looking for Talent?
              </h2>
              <p className="text-neutral-700 mb-8 text-lg">
                Contact us to discuss your hiring needs. We&apos;ll help you find the right candidates.
              </p>
              <Button
                variant="hr"
                size="lg"
                onClick={() => {
                  enquiryFormRef.current?.scrollIntoView({ behavior: 'smooth' })
                }}
              >
                Employer Enquiry
              </Button>
            </div>
          </ScrollReveal>
        </Container>
      </section>

      <section className="py-20 bg-gradient-cool relative">
        <Container className="relative z-10">
          <ScrollReveal variant="fade">
            <div className="text-center max-w-3xl mx-auto">
              <h2 className="text-3xl font-bold text-primary-700 mb-4">
                Looking for Opportunities?
              </h2>
              <p className="text-neutral-700 mb-8 text-lg">
                Check out our current job openings and apply today.
              </p>
              <Button variant="primary" size="lg" as={Link} href="/careers">
                View Careers
              </Button>
            </div>
          </ScrollReveal>
        </Container>
      </section>

      <section
        ref={enquiryFormRef}
        className="py-20 md:py-24 bg-gradient-cool relative"
        tabIndex={-1}
      >
        <div className="absolute inset-0 bg-pattern-mesh opacity-15"></div>
        <Container className="relative z-10">
          <ScrollReveal variant="fade">
            <SectionHeading className="text-center mb-12">
              Employer Enquiry Form
            </SectionHeading>
            <div className="max-w-2xl mx-auto">
              <SmartEnquiryForm serviceType="hr" />
            </div>
          </ScrollReveal>
        </Container>
      </section>
    </>
  )
}

