'use client'

import { useTranslation } from 'react-i18next'
import { Container, SectionHeading, Card } from '@/components/ui'
import { ScrollReveal } from '@/components/ScrollReveal'
import { SmartEnquiryForm } from '@/components/SmartEnquiryForm'
import '@/lib/i18n'

export function TelecomPageContent() {
  const { t } = useTranslation()

  const services = [
    {
      title: 'Fibre Laying and O&M',
      description: 'Complete fibre optic cable installation and ongoing maintenance services',
    },
    {
      title: 'POPs Setup & Maintenance',
      description: 'Point of Presence setup and maintenance for network infrastructure',
    },
    {
      title: 'ISP Operations Support',
      description: 'Comprehensive support for Internet Service Provider operations',
    },
    {
      title: 'Network Maintenance',
      description: 'Professional network maintenance and troubleshooting services',
    },
    {
      title: 'Field Engineering Services',
      description: 'On-site field engineering and technical support',
    },
  ]

  return (
    <>
      <section className="relative bg-gradient-hero text-white py-24 md:py-32 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-telecom-500/30 via-transparent to-accent-500/20"></div>
        <Container className="relative z-10">
          <ScrollReveal variant="fade">
            <h1 className="text-4xl md:text-6xl font-bold mb-6 text-center">
              {t('service.telecom.title', 'Telecom Services')}
            </h1>
            <p className="text-xl text-center text-neutral-200 max-w-3xl mx-auto">
              Professional telecom infrastructure and network solutions
            </p>
          </ScrollReveal>
        </Container>
      </section>

      <section className="py-20 md:py-24 bg-gradient-elegant relative">
        <div className="absolute inset-0 bg-pattern-mesh opacity-20"></div>
        <Container className="relative z-10">
          <ScrollReveal variant="fade">
            <SectionHeading className="text-center mb-12">
              Our Telecom Services
            </SectionHeading>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {services.map((service, index) => (
                <ScrollReveal key={service.title} variant="up" delay={index * 100}>
                  <Card className="h-full">
                    <h3 className="text-xl font-bold text-primary-700 mb-3">{service.title}</h3>
                    <p className="text-neutral-600">{service.description}</p>
                  </Card>
                </ScrollReveal>
              ))}
            </div>
          </ScrollReveal>
        </Container>
      </section>

      <section className="py-20 md:py-24 bg-gradient-cool relative">
        <Container className="relative z-10">
          <ScrollReveal variant="fade">
            <SectionHeading className="text-center mb-4">
              Service Models
            </SectionHeading>
            <p className="text-center text-neutral-700 mb-12 max-w-2xl mx-auto">
              We offer both Project-based and AMC (Annual Maintenance Contract) models to suit your needs.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
              <ScrollReveal variant="left">
                <Card>
                  <h3 className="text-xl font-bold text-primary-700 mb-3">Project Model</h3>
                  <p className="text-neutral-600">
                    One-time project implementation with complete handover and documentation.
                  </p>
                </Card>
              </ScrollReveal>
              <ScrollReveal variant="right">
                <Card>
                  <h3 className="text-xl font-bold text-primary-700 mb-3">AMC Model</h3>
                  <p className="text-neutral-600">
                    Annual maintenance contracts for ongoing support and maintenance services.
                  </p>
                </Card>
              </ScrollReveal>
            </div>
          </ScrollReveal>
        </Container>
      </section>

      <section className="py-20 bg-gradient-warm relative">
        <Container className="relative z-10">
          <ScrollReveal variant="fade">
            <SectionHeading className="text-center mb-12">
              Get in Touch
            </SectionHeading>
            <div className="max-w-2xl mx-auto">
              <SmartEnquiryForm serviceType="telecom" />
            </div>
          </ScrollReveal>
        </Container>
      </section>
    </>
  )
}

