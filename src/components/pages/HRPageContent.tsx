'use client'

import Link from 'next/link'
import Image from 'next/image'
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

      {/* HR Imagery / Story Section */}
      <section className="py-16 md:py-20 bg-white relative border-b border-primary-50">
        <Container className="relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
            <div>
              <ScrollReveal variant="left">
                <SectionHeading className="mb-4 text-left">
                  People-Centric HR Partnerships
                </SectionHeading>
                <p className="text-neutral-700 text-lg leading-relaxed mb-4">
                  We work closely with your leadership and HR teams to understand the culture,
                  skills, and timelines you care about most. Our focus is on long-term
                  partnerships, not just filling positions.
                </p>
                <p className="text-neutral-700 leading-relaxed">
                  From technical specialists to non-technical roles, we help you build teams
                  that stay, grow, and deliver. Varcas HR services are the core of our
                  business, with Solar and Telecom solutions supporting your wider operations.
                </p>
              </ScrollReveal>
            </div>

            <div className="grid grid-cols-2 gap-4 md:gap-6">
              <ScrollReveal variant="scale" delay={0}>
                <div className="relative h-40 md:h-56 rounded-2xl overflow-hidden shadow-md">
                  <Image
                    src="https://images.pexels.com/photos/7731327/pexels-photo-7731327.jpeg"
                    alt="HR team having a meeting in a modern office"
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 40vw"
                    unoptimized
                  />
                </div>
              </ScrollReveal>
              <div className="flex flex-col gap-4 md:gap-6">
                <ScrollReveal variant="up" delay={100}>
                  <div className="relative h-32 md:h-28 rounded-2xl overflow-hidden shadow-md">
                    <Image
                      src="https://images.pexels.com/photos/5716008/pexels-photo-5716008.jpeg"
                      alt="Diverse team smiling while working together"
                      fill
                      className="object-cover"
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 40vw"
                      unoptimized
                    />
                  </div>
                </ScrollReveal>
                <ScrollReveal variant="up" delay={150}>
                  <div className="relative h-32 md:h-28 rounded-2xl overflow-hidden shadow-md">
                    <Image
                      src="https://images.pexels.com/photos/29267517/pexels-photo-29267517.jpeg"
                      alt="Hiring manager reviewing candidate profiles on a laptop"
                      fill
                      className="object-cover"
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 40vw"
                      unoptimized
                    />
                  </div>
                </ScrollReveal>
              </div>
            </div>
          </div>
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

