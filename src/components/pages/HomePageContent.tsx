'use client'

import Link from 'next/link'
import Image from 'next/image'
import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { Container, SectionHeading, Card, Button } from '@/components/ui'
import { SmartEnquiryForm } from '@/components/SmartEnquiryForm'
import { SolarIcon } from '@/components/icons/SolarIcon'
import { TelecomIcon } from '@/components/icons/TelecomIcon'
import { HRIcon } from '@/components/icons/HRIcon'
import { ScrollReveal } from '@/components/ScrollReveal'
import { Statistics } from '@/components/Statistics'
import { Resources } from '@/components/Resources'
import { Testimonials } from '@/components/Testimonials'
import { FAQ } from '@/components/FAQ'
import { Certifications } from '@/components/Certifications'
import { ProjectGallery } from '@/components/ProjectGallery'
import { ClientLogos } from '@/components/ClientLogos'
import '@/lib/i18n'

export function HomePageContent() {
  const { t } = useTranslation()
  const [showEnquiryModal, setShowEnquiryModal] = useState(false)
  const [showCoverage, setShowCoverage] = useState(false)

  const phoneNumber = '+91 93468 72545'
  const whatsappNumber = '919346872545'

  return (
    <>
      {/* Hero Section - Elegant Professional Design with Video Background */}
      <section className="relative bg-gradient-to-br from-primary-700 via-primary-600 to-primary-800 text-white py-28 md:py-40 overflow-hidden">
        {/* Video Background */}
        <video
          autoPlay
          loop
          muted
          playsInline
          className="absolute inset-0 w-full h-full object-cover opacity-30"
          aria-hidden="true"
        >
          {/* HR-focused background video (saved in /public as hr-team-meeting.mp4) */}
          <source src="/hr-team-meeting.mp4" type="video/mp4" />
        </video>

        {/* Video Overlay for better text readability */}
        <div className="absolute inset-0 bg-gradient-to-br from-primary-700/85 via-primary-600/80 to-primary-800/85"></div>

        {/* Animated Background Layers */}
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-gradient-to-br from-primary-600/40 via-transparent to-secondary-500/30"></div>
          <div className="absolute top-0 right-0 w-2/5 h-2/5 bg-secondary-500/20 rounded-full blur-3xl animate-float"></div>
          <div className="absolute bottom-0 left-0 w-2/5 h-2/5 bg-accent-500/15 rounded-full blur-3xl animate-float" style={{ animationDelay: '2s' }}></div>
        </div>

        {/* Elegant Grid Pattern */}
        <div className="absolute inset-0 opacity-10">
          <div
            className="absolute inset-0"
            style={{
              backgroundImage:
                'linear-gradient(rgba(255, 255, 255, 0.15) 1px, transparent 1px), linear-gradient(90deg, rgba(255, 255, 255, 0.15) 1px, transparent 1px)',
              backgroundSize: '60px 60px',
            }}
          ></div>
        </div>

        {/* Decorative Elements - Hidden on mobile */}
        <div className="hidden md:block absolute top-20 left-10 w-32 h-32 border border-white/10 rounded-full"></div>
        <div className="hidden md:block absolute bottom-20 right-10 w-24 h-24 border border-white/10 rounded-full"></div>
        <div className="hidden lg:block absolute top-1/2 right-20 w-16 h-16 border border-accent-400/20 rounded-full"></div>

        <Container className="relative z-10">
          <div className="text-center max-w-5xl mx-auto">
            <ScrollReveal variant="fade" delay={100}>
              <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold mb-6 leading-tight tracking-tight">
                <span className="block text-white mb-2" style={{
                  textShadow: '0 4px 20px rgba(0, 0, 0, 0.3)',
                  letterSpacing: '-0.02em'
                }}>
                  Strategic HR Solutions
                </span>
                <span className="block bg-gradient-to-r from-accent-300 via-white to-accent-300 bg-clip-text text-transparent text-4xl md:text-5xl lg:text-6xl pb-2" style={{
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  filter: 'drop-shadow(0 2px 10px rgba(255, 184, 77, 0.3))',
                  lineHeight: '1.3'
                }}>
                  for Growing Enterprises
                </span>
              </h1>
            </ScrollReveal>

            <ScrollReveal variant="fade" delay={200}>
              <p className="text-xl md:text-2xl text-white/90 max-w-3xl mx-auto mb-8 font-medium">
                Connecting talent with opportunity across India
              </p>
            </ScrollReveal>

            <ScrollReveal variant="fade" delay={300}>
              <p className="text-base md:text-lg text-white/75 max-w-2xl mx-auto leading-relaxed mb-10">
                Expert recruitment and talent management services for all enterprises. Also featuring Varcas Solar Division for enterprise energy solutions who have experience with solar for airports, educational institutions, and commercial facilities.
              </p>
            </ScrollReveal>

            <ScrollReveal variant="fade" delay={400}>
              <div className="flex flex-wrap items-center justify-center gap-4">
                <Button
                  variant="secondary"
                  size="lg"
                  as="a"
                  href="/services/hr"
                  className="hover-lift shadow-xl"
                >
                  Explore HR Services
                </Button>
                <Button
                  variant="outline"
                  size="lg"
                  as="a"
                  href="/services/solar"
                  className="bg-white/10 border-white/30 text-white hover:bg-white/20 hover-lift"
                >
                  Visit Varcas Solar →
                </Button>
              </div>
            </ScrollReveal>
          </div>
        </Container>

        {/* Scroll Indicator */}
        <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2">
          <div className="w-6 h-10 border-2 border-white/30 rounded-full flex items-start justify-center p-2">
            <div className="w-1.5 h-3 bg-white/60 rounded-full mt-1 animate-bounce"></div>
          </div>
        </div>
      </section>

      {/* Statistics Section */}
      <section className="py-16 md:py-24 bg-gradient-elegant border-b border-primary-100/50">
        <Container>
          <ScrollReveal variant="fade">
            <h2 className="text-3xl md:text-4xl font-bold text-center text-primary-700 mb-4">
              Our Track Record
            </h2>
            <p className="text-center text-neutral-600 mb-12 max-w-2xl mx-auto">
              Trusted by leading enterprises across India for strategic HR solutions
            </p>
          </ScrollReveal>
          <Statistics
            stats={[
              { value: 500, suffix: '+', label: 'Successful Placements' },
              { value: 50, suffix: '+', label: 'Enterprise Clients' },
              { value: 15, suffix: '+', label: 'Years Experience' },
              { value: 100, suffix: '%', label: 'Client Satisfaction' },
            ]}
          />
        </Container>
      </section>

      {/* Trust Section - Combined */}
      <section className="py-20 md:py-28 bg-gradient-cool relative border-b border-primary-100/50">
        <div className="absolute inset-0 bg-pattern-mesh opacity-25"></div>
        <Container className="relative z-10">
          <ScrollReveal variant="fade">
            <div className="text-center mb-12">
              <p className="text-xs text-neutral-500 uppercase tracking-widest mb-4 font-semibold">
                Our Expertise
              </p>
              <h2 className="text-3xl md:text-4xl font-bold text-primary-700 mb-2">
                HR Service Specializations
              </h2>
              <p className="text-neutral-600 max-w-2xl mx-auto">
                Comprehensive recruitment solutions tailored for your workforce needs
              </p>
            </div>
          </ScrollReveal>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
            <ScrollReveal variant="scale" delay={0}>
              <Card className="text-center group hover:shadow-large transition-all duration-300 hover-lift border-t-4 border-t-hr-500">
                <div className="w-16 h-16 mx-auto mb-4 rounded-2xl bg-gradient-to-br from-hr-600 via-hr-500 to-hr-400 flex items-center justify-center group-hover:scale-110 transition-transform duration-300 shadow-lg">
                  <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                  </svg>
                </div>
                <h3 className="text-lg font-bold text-primary-700 mb-2 group-hover:text-hr-600 transition-colors">
                  Bulk Hiring Solutions
                </h3>
                <p className="text-sm text-neutral-600">Large-scale recruitment for rapid workforce expansion</p>
              </Card>
            </ScrollReveal>

            <ScrollReveal variant="scale" delay={100}>
              <Card className="text-center group hover:shadow-large transition-all duration-300 hover-lift border-t-4 border-t-hr-500">
                <div className="w-16 h-16 mx-auto mb-4 rounded-2xl bg-gradient-to-br from-secondary-600 via-secondary-500 to-accent-500 flex items-center justify-center group-hover:scale-110 transition-transform duration-300 shadow-lg">
                  <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                </div>
                <h3 className="text-lg font-bold text-primary-700 mb-2 group-hover:text-hr-600 transition-colors">
                  Executive Search
                </h3>
                <p className="text-sm text-neutral-600">Strategic hiring for leadership and management positions</p>
              </Card>
            </ScrollReveal>

            <ScrollReveal variant="scale" delay={200}>
              <Card className="text-center group hover:shadow-large transition-all duration-300 hover-lift border-t-4 border-t-hr-500">
                <div className="w-16 h-16 mx-auto mb-4 rounded-2xl bg-gradient-to-br from-primary-600 via-primary-500 to-secondary-500 flex items-center justify-center group-hover:scale-110 transition-transform duration-300 shadow-lg">
                  <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                  </svg>
                </div>
                <h3 className="text-lg font-bold text-primary-700 mb-2 group-hover:text-hr-600 transition-colors">
                  Campus Recruitment
                </h3>
                <p className="text-sm text-neutral-600">Fresh talent acquisition from colleges and universities</p>
              </Card>
            </ScrollReveal>

            <ScrollReveal variant="scale" delay={300}>
              <Card className="text-center group hover:shadow-large transition-all duration-300 hover-lift border-t-4 border-t-hr-500">
                <div className="w-16 h-16 mx-auto mb-4 rounded-2xl bg-gradient-to-br from-accent-600 via-accent-500 to-accent-400 flex items-center justify-center group-hover:scale-110 transition-transform duration-300 shadow-lg">
                  <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                </div>
                <h3 className="text-lg font-bold text-primary-700 mb-2 group-hover:text-hr-600 transition-colors">
                  Contract Staffing
                </h3>
                <p className="text-sm text-neutral-600">Flexible workforce solutions for project-based needs</p>
              </Card>
            </ScrollReveal>

            <ScrollReveal variant="scale" delay={400}>
              <Card className="text-center group hover:shadow-large transition-all duration-300 hover-lift border-t-4 border-t-hr-500">
                <div className="w-16 h-16 mx-auto mb-4 rounded-2xl bg-gradient-to-br from-hr-700 via-hr-600 to-hr-500 flex items-center justify-center group-hover:scale-110 transition-transform duration-300 shadow-lg">
                  <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                </div>
                <h3 className="text-lg font-bold text-primary-700 mb-2 group-hover:text-hr-600 transition-colors">
                  Skilled Labor Supply
                </h3>
                <p className="text-sm text-neutral-600">Specialized tradespeople and technical workforce</p>
              </Card>
            </ScrollReveal>

            <ScrollReveal variant="scale" delay={500}>
              <Card className="text-center group hover:shadow-large transition-all duration-300 hover-lift border-t-4 border-t-hr-500">
                <div className="w-16 h-16 mx-auto mb-4 rounded-2xl bg-gradient-to-br from-primary-700 via-primary-600 to-secondary-600 flex items-center justify-center group-hover:scale-110 transition-transform duration-300 shadow-lg">
                  <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                  </svg>
                </div>
                <h3 className="text-lg font-bold text-primary-700 mb-2 group-hover:text-hr-600 transition-colors">
                  Talent Consulting
                </h3>
                <p className="text-sm text-neutral-600">Strategic workforce planning and HR advisory services</p>
              </Card>
            </ScrollReveal>
          </div>
        </Container>
      </section>

      {/* Services Overview Section */}
      <section className="py-20 md:py-24 bg-gradient-elegant relative">
        <div className="absolute inset-0 bg-pattern-mesh opacity-30"></div>
        <Container className="relative z-10">
          <ScrollReveal variant="fade">
            <SectionHeading className="text-center mb-4">
              {t('home.ourServices', 'Our Services')}
            </SectionHeading>
            <p className="text-center text-neutral-700 mb-16 max-w-2xl mx-auto text-xl leading-relaxed font-medium">
              {t(
                'home.servicesDesc',
                'HR recruitment and talent solutions at the core, with Solar and Telecom services supporting enterprises across Andhra Pradesh.'
              )}
            </p>
          </ScrollReveal>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* HR first for higher prominence */}
            <ScrollReveal variant="scale" delay={0}>
              <Link href="/services/hr">
                <Card className="group hover:shadow-large transition-all duration-300 cursor-pointer h-full border-l-4 border-l-hr-500 hover:border-l-hr-600 hover:-translate-y-3 hover:scale-[1.02] bg-gradient-to-br from-white to-hr-50/40">
                  <div className="text-center">
                    <div className="inline-flex items-center gap-3 mb-4 px-3 py-1 rounded-full bg-hr-100 text-hr-700 text-xs font-semibold uppercase tracking-wide">
                      <span className="w-2 h-2 rounded-full bg-hr-500" />
                      Core Service
                    </div>
                    <div className="flex justify-center mb-6 text-hr-500 group-hover:scale-110 group-hover:rotate-3 transition-all duration-300">
                      <HRIcon />
                    </div>
                    <h3 className="text-2xl font-bold text-primary-700 mb-4 group-hover:text-hr-600 transition-colors">
                      {t('service.hr.title')}
                    </h3>
                    <p className="text-neutral-700 leading-relaxed text-base">
                      {t(
                        'home.hrDesc',
                        'Strategic HR recruitment and talent management services for growing enterprises.'
                      )}
                    </p>
                  </div>
                </Card>
              </Link>
            </ScrollReveal>
            <ScrollReveal variant="scale" delay={100}>
              <Link href="/services/solar">
                <Card className="group hover:shadow-large transition-all duration-300 cursor-pointer h-full border-l-4 border-l-solar-500 hover:border-l-solar-600 hover:-translate-y-3 hover:scale-[1.02] bg-gradient-to-br from-white to-solar-50/30">
                  <div className="text-center">
                    <div className="flex justify-center mb-6 text-solar-500 group-hover:scale-110 group-hover:rotate-3 transition-all duration-300">
                      <SolarIcon />
                    </div>
                    <h3 className="text-2xl font-bold text-primary-700 mb-4 group-hover:text-solar-600 transition-colors">
                      {t('service.solar.title')}
                    </h3>
                    <p className="text-neutral-700 leading-relaxed text-base">
                      {t(
                        'home.solarDesc',
                        'Enterprise-grade solar solutions for airports, institutions, and commercial facilities.'
                      )}
                    </p>
                  </div>
                </Card>
              </Link>
            </ScrollReveal>
            <ScrollReveal variant="scale" delay={200}>
              <Link href="/services/telecom">
                <Card className="group hover:shadow-large transition-all duration-300 cursor-pointer h-full border-l-4 border-l-telecom-500 hover:border-l-telecom-600 hover:-translate-y-3 hover:scale-[1.02] bg-gradient-to-br from-white to-telecom-50/30">
                  <div className="text-center">
                    <div className="flex justify-center mb-6 text-telecom-500 group-hover:scale-110 group-hover:rotate-3 transition-all duration-300">
                      <TelecomIcon />
                    </div>
                    <h3 className="text-2xl font-bold text-primary-700 mb-4 group-hover:text-telecom-600 transition-colors">
                      {t('service.telecom.title')}
                    </h3>
                    <p className="text-neutral-700 leading-relaxed text-base">
                      {t(
                        'home.telecomDesc',
                        'Professional telecom infrastructure and network solutions.'
                      )}
                    </p>
                  </div>
                </Card>
              </Link>
            </ScrollReveal>
          </div>
        </Container>
      </section>

      {/* Testimonials Section - HR Focused Carousel */}
      <Testimonials
        carousel={true}
        testimonials={[
          {
            id: '1',
            name: 'Rajesh Kumar',
            role: 'HR Director',
            company: 'Tech Solutions Pvt Ltd',
            content: 'Varcas transformed our hiring process. They understood our technical requirements perfectly and delivered highly skilled candidates within weeks. Their recruitment team is professional, responsive, and truly cares about finding the right fit.',
            rating: 5,
            service: 'hr',
          },
          {
            id: '2',
            name: 'Meena Patel',
            role: 'Operations Manager',
            company: 'Manufacturing Excellence',
            content: 'We needed to scale our workforce quickly for a new facility. Varcas provided us with 50+ qualified workers in record time. Their screening process is thorough and the quality of candidates has been exceptional.',
            rating: 5,
            service: 'hr',
          },
          {
            id: '3',
            name: 'Suresh Reddy',
            role: 'CEO',
            company: 'Hospitality Group',
            content: 'Finding skilled hospitality staff was always a challenge until we partnered with Varcas. They have a deep understanding of our industry and consistently deliver candidates who exceed our expectations.',
            rating: 5,
            service: 'hr',
          },
          {
            id: '4',
            name: 'Priya Sharma',
            role: 'Plant Manager',
            company: 'Industrial Solutions',
            content: 'Varcas has been our trusted manpower partner for over 3 years. Their ability to provide skilled technicians and operators on short notice has been crucial to our operations. Highly recommend their services!',
            rating: 5,
            service: 'hr',
          },
          {
            id: '5',
            name: 'Arun Krishnan',
            role: 'Director',
            company: 'Educational Institution',
            content: 'We rely on Varcas for all our non-teaching staff recruitment. From security personnel to administrative staff, they have helped us build a reliable and professional support team. Excellent service!',
            rating: 5,
            service: 'hr',
          },
        ]}
      />

      {/* FAQ Section */}
      <FAQ
        faqs={[
          {
            id: '1',
            question: 'What services does Varcas Enterprises provide?',
            answer: 'We provide comprehensive enterprise solutions including Solar installations, Telecom infrastructure, and HR recruitment services for airports, educational institutions, and commercial facilities.',
          },
          {
            id: '2',
            question: 'What areas do you serve?',
            answer: 'We primarily serve Andhra Pradesh with extensive presence in Tirupati, Visakhapatnam, Vijayawada, and other major cities. We also extend services across India.',
          },
          {
            id: '3',
            question: 'How can I request a quote?',
            answer: 'You can request a quote by filling out our enquiry form, calling us at +91 93468 72545, or contacting us via WhatsApp or email.',
          },
          {
            id: '4',
            question: 'Do you provide maintenance services?',
            answer: 'Yes, we offer both project-based services and Annual Maintenance Contracts (AMC) for ongoing support and maintenance.',
          },
          {
            id: '5',
            question: 'What is your experience in the industry?',
            answer: 'We have over 15 years of experience serving enterprise clients across multiple sectors including airports, educational institutions, and commercial facilities.',
          },
        ]}
      />

      {/* CTA Section */}
      <section className="py-20 md:py-24 bg-gradient-to-r from-primary-700 via-primary-600 to-primary-800 text-white relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-accent-500/10 via-transparent to-secondary-500/10"></div>
        <Container className="relative z-10">
          <ScrollReveal variant="fade">
            <div className="text-center max-w-3xl mx-auto">
              <h2 className="text-3xl md:text-4xl font-bold mb-6">
                Ready to Get Started?
              </h2>
              <p className="text-xl text-neutral-200 mb-8">
                Contact us today for a consultation
              </p>
              <div className="flex flex-wrap justify-center gap-4">
                <Button
                  variant="secondary"
                  size="lg"
                  as="a"
                  href={`tel:${phoneNumber}`}
                  className="hover-lift"
                >
                  Call Us
                </Button>
                <Button
                  variant="secondary"
                  size="lg"
                  as="a"
                  href={`https://wa.me/${whatsappNumber}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover-lift"
                >
                  WhatsApp
                </Button>
                <Button
                  variant="outline"
                  size="lg"
                  onClick={() => setShowEnquiryModal(true)}
                  className="bg-white/10 border-white/30 text-white hover:bg-white/20 hover-lift"
                >
                  Request Quote
                </Button>
              </div>
            </div>
          </ScrollReveal>
        </Container>
      </section>

      {showEnquiryModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
          <div className="bg-white rounded-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="sticky top-0 bg-white border-b border-neutral-200 px-6 py-4 flex justify-between items-center">
              <h2 className="text-2xl font-bold text-primary-700">Request a Quote</h2>
              <button
                onClick={() => setShowEnquiryModal(false)}
                className="text-neutral-500 hover:text-neutral-700"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            <div className="p-6">
              <SmartEnquiryForm onSuccess={() => setShowEnquiryModal(false)} />
            </div>
          </div>
        </div>
      )}
    </>
  )
}

