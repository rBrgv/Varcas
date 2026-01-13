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
          className="absolute inset-0 w-full h-full object-cover opacity-40"
          aria-hidden="true"
        >
          <source src="/solar-terrace-video.mp4" type="video/mp4" />
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
              <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold mb-8 leading-tight tracking-tight">
                <span className="block text-white mb-2" style={{ 
                  textShadow: '0 4px 20px rgba(0, 0, 0, 0.3)',
                  letterSpacing: '-0.02em'
                }}>
                  Varcas
                </span>
                <span className="block bg-gradient-to-r from-accent-300 via-white to-accent-300 bg-clip-text text-transparent" style={{
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  filter: 'drop-shadow(0 2px 10px rgba(255, 184, 77, 0.3))'
                }}>
                  Enterprises
                </span>
              </h1>
            </ScrollReveal>

            <ScrollReveal variant="fade" delay={200}>
              <div className="flex flex-wrap items-center justify-center gap-3 md:gap-5 mb-8 text-lg md:text-2xl">
                <span className="text-white/95 font-medium">{t('service.solar.title')}</span>
                <span className="text-accent-400 text-xl">●</span>
                <span className="text-white/95 font-medium">{t('service.telecom.title')}</span>
                <span className="text-accent-400 text-xl">●</span>
                <span className="text-white/95 font-medium">{t('service.hr.title')}</span>
              </div>
            </ScrollReveal>

            <ScrollReveal variant="fade" delay={300}>
              <p className="text-lg md:text-xl text-white/85 max-w-3xl mx-auto leading-relaxed font-light">
                {t(
                  'home.heroSubtitle',
                  'Trusted partner for enterprise solutions across Andhra Pradesh. Serving airports, educational institutions, and commercial facilities.'
                )}
              </p>
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

      {/* Partner Logos Section */}
      <section className="py-16 md:py-24 bg-white border-b border-primary-100/50">
        <Container>
          <ScrollReveal variant="fade">
            <div className="text-center mb-12">
              <p className="text-sm text-neutral-500 uppercase tracking-widest mb-4 font-semibold">
                Authorised Partners
              </p>
              <h2 className="text-2xl md:text-3xl font-bold text-primary-700 mb-4">
                We are an authorised sales partner for Waaree and Varna Solar
              </h2>
            </div>
          </ScrollReveal>
          
          <div className="flex flex-col md:flex-row items-center justify-center gap-8 md:gap-12">
            <ScrollReveal variant="scale" delay={0}>
              <div className="flex flex-col items-center group">
                <Image
                  src="https://api.waaree.com/upload/media/image_1_1_1749036191.png"
                  alt="Waaree Logo"
                  width={150}
                  height={80}
                  className="h-16 md:h-20 w-auto object-contain opacity-80 group-hover:opacity-100 transition-opacity duration-300"
                  unoptimized
                />
              </div>
            </ScrollReveal>
            
            <ScrollReveal variant="scale" delay={100}>
              <div className="flex flex-col items-center group">
                <Image
                  src="https://varnasolar.com/images/varna-logo2.png"
                  alt="Varna Solar Logo"
                  width={350}
                  height={210}
                  className="h-40 md:h-56 w-auto object-contain opacity-80 group-hover:opacity-100 transition-opacity duration-300"
                  unoptimized
                />
              </div>
            </ScrollReveal>
          </div>
        </Container>
      </section>

      {/* Statistics Section */}
      <section className="py-16 md:py-24 bg-gradient-elegant border-b border-primary-100/50">
        <Container>
          <ScrollReveal variant="fade">
            <h2 className="text-3xl md:text-4xl font-bold text-center text-primary-700 mb-12">
              Our Achievements
            </h2>
          </ScrollReveal>
          <Statistics
            stats={[
              { value: 500, suffix: '+', label: 'Projects Completed' },
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
                {t('home.trustedBy', 'Trusted by Leading Organizations')}
              </p>
              <h2 className="text-3xl md:text-4xl font-bold text-primary-700 mb-2">
                Serving Excellence Across Industries
              </h2>
              <p className="text-neutral-600 max-w-2xl mx-auto">
                From airports to educational institutions, we deliver trusted solutions
              </p>
            </div>
          </ScrollReveal>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
            <ScrollReveal variant="scale" delay={0}>
              <Card className="text-center group hover:shadow-large transition-all duration-300 hover-lift">
                <div className="w-20 h-20 mx-auto mb-6 rounded-2xl bg-gradient-to-br from-primary-600 via-primary-500 to-secondary-500 flex items-center justify-center group-hover:scale-110 transition-transform duration-300 shadow-lg">
                  <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                  </svg>
                </div>
                <h3 className="text-xl font-bold text-primary-700 mb-2 group-hover:text-primary-600 transition-colors">
                  Airports
                </h3>
                <p className="text-sm text-neutral-600">Aviation facilities & infrastructure</p>
              </Card>
            </ScrollReveal>
            <ScrollReveal variant="scale" delay={100}>
              <Card className="text-center group hover:shadow-large transition-all duration-300 hover-lift">
                <div className="w-20 h-20 mx-auto mb-6 rounded-2xl bg-gradient-to-br from-secondary-500 via-secondary-400 to-accent-500 flex items-center justify-center group-hover:scale-110 transition-transform duration-300 shadow-lg">
                  <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                  </svg>
                </div>
                <h3 className="text-xl font-bold text-primary-700 mb-2 group-hover:text-primary-600 transition-colors">
                  Educational Institutions
                </h3>
                <p className="text-sm text-neutral-600">Universities, colleges & schools</p>
              </Card>
            </ScrollReveal>
            <ScrollReveal variant="scale" delay={200}>
              <Card className="text-center group hover:shadow-large transition-all duration-300 hover-lift">
                <div className="w-20 h-20 mx-auto mb-6 rounded-2xl bg-gradient-to-br from-solar-500 via-solar-400 to-accent-500 flex items-center justify-center group-hover:scale-110 transition-transform duration-300 shadow-lg">
                  <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                  </svg>
                </div>
                <h3 className="text-xl font-bold text-primary-700 mb-2 group-hover:text-primary-600 transition-colors">
                  Commercial Facilities
                </h3>
                <p className="text-sm text-neutral-600">Industrial & commercial establishments</p>
              </Card>
            </ScrollReveal>
          </div>
        </Container>
      </section>

      {/* Coverage Section */}
      <section className="py-20 md:py-24 bg-gradient-warm relative">
        <div className="absolute inset-0 bg-pattern-mesh opacity-20"></div>
        <Container className="relative z-10">
          <ScrollReveal variant="fade">
            <SectionHeading className="text-center mb-12">
              {t('home.coverage', 'Our Coverage')}
            </SectionHeading>
            <p className="text-center text-neutral-700 mb-12 max-w-2xl mx-auto text-lg">
              Serving enterprise clients across Andhra Pradesh and India with comprehensive solutions
            </p>
          </ScrollReveal>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
            <ScrollReveal variant="left" delay={0}>
              <Card className="h-full hover:shadow-large transition-all duration-300 hover-lift border-l-4 border-l-primary-500 bg-gradient-to-br from-white to-primary-50/40">
                <div className="flex items-start gap-4 mb-6">
                  <div className="w-16 h-16 rounded-xl bg-gradient-to-br from-primary-600 via-primary-500 to-secondary-500 flex items-center justify-center flex-shrink-0 shadow-md">
                    <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold text-primary-700 mb-2">
                      {t('home.andhraPradesh', 'Andhra Pradesh')}
                    </h3>
                    <p className="text-neutral-600 mb-4">Primary service region with extensive presence</p>
                  </div>
                </div>
                <div className="space-y-3">
                  {['Tirupati & Chittoor District', 'Visakhapatnam', 'Vijayawada & Guntur', 'Nellore & Prakasam', 'Kurnool & Anantapur'].map((city) => (
                    <div key={city} className="flex items-center gap-3 text-neutral-700">
                      <div className="w-2 h-2 rounded-full bg-primary-500"></div>
                      <span className="font-medium">{city}</span>
                    </div>
                  ))}
                </div>
              </Card>
            </ScrollReveal>

            <ScrollReveal variant="right" delay={100}>
              <Card className="h-full hover:shadow-large transition-all duration-300 hover-lift border-l-4 border-l-secondary-500 bg-gradient-to-br from-white to-secondary-50/40">
                <div className="flex items-start gap-4 mb-6">
                  <div className="w-16 h-16 rounded-xl bg-gradient-to-br from-secondary-500 to-secondary-600 flex items-center justify-center flex-shrink-0 shadow-md">
                    <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold text-primary-700 mb-2">Key Service Areas</h3>
                    <p className="text-neutral-600 mb-4">Specialized solutions for major sectors</p>
                  </div>
                </div>
                <div className="space-y-3">
                  {['Airports & Aviation Facilities', 'Educational Institutions & Universities', 'Commercial & Industrial Facilities', 'Government & Public Sector', 'Healthcare & Hospitality'].map((area) => (
                    <div key={area} className="flex items-center gap-3 text-neutral-700">
                      <div className="w-2 h-2 rounded-full bg-secondary-500"></div>
                      <span className="font-medium">{area}</span>
                    </div>
                  ))}
                </div>
              </Card>
            </ScrollReveal>
          </div>

          {!showCoverage && (
            <div className="text-center mt-8">
              <Button
                variant="outline"
                onClick={() => setShowCoverage(true)}
                size="lg"
                className="hover-lift"
              >
                {t('home.expandCoverage', 'View Pan-India Coverage')}
              </Button>
            </div>
          )}

          {showCoverage && (
            <ScrollReveal variant="up" delay={0}>
              <Card className="mt-8 p-8 bg-gradient-to-br from-white to-accent-50/40 border-accent-100/50 shadow-large">
                <h3 className="text-2xl font-bold text-primary-700 text-center mb-6">
                  {t('home.india', 'Pan-India Presence')}
                </h3>
                <p className="text-neutral-700 text-center mb-8 max-w-xl mx-auto">
                  We extend our services beyond Andhra Pradesh, with a growing footprint across major states in India.
                </p>
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 mb-8">
                  {['Telangana', 'Karnataka', 'Tamil Nadu', 'Kerala', 'Maharashtra', 'Gujarat', 'Delhi NCR', 'Uttar Pradesh'].map((state) => (
                    <div key={state} className="text-center p-3 bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow">
                      <div className="w-3 h-3 mx-auto mb-2 rounded-full bg-solar-500"></div>
                      <span className="text-sm font-medium text-neutral-700">{state}</span>
                    </div>
                  ))}
                </div>
              </Card>
            </ScrollReveal>
          )}
        </Container>
      </section>

      {/* Resources Section */}
      <Resources
        resources={[
          {
            id: '1',
            title: 'Company Brochure',
            description: 'Download our comprehensive company brochure',
            type: 'brochure',
          },
          {
            id: '2',
            title: 'Solar Solutions Guide',
            description: 'Complete guide to our solar solutions',
            type: 'guide',
          },
          {
            id: '3',
            title: 'Case Study: Airport Project',
            description: 'Learn about our successful airport solar installation',
            type: 'case-study',
          },
        ]}
      />

      {/* Services Section */}
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
                'Comprehensive solutions tailored for enterprise clients across multiple sectors'
              )}
            </p>
          </ScrollReveal>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <ScrollReveal variant="scale" delay={0}>
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
                        'Enterprise-grade solar solutions for airports, institutions, and commercial facilities'
                      )}
                    </p>
                  </div>
                </Card>
              </Link>
            </ScrollReveal>
            <ScrollReveal variant="scale" delay={100}>
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
                        'Professional telecom infrastructure and network solutions'
                      )}
                    </p>
                  </div>
                </Card>
              </Link>
            </ScrollReveal>
            <ScrollReveal variant="scale" delay={200}>
              <Link href="/services/hr">
                <Card className="group hover:shadow-large transition-all duration-300 cursor-pointer h-full border-l-4 border-l-hr-500 hover:border-l-hr-600 hover:-translate-y-3 hover:scale-[1.02] bg-gradient-to-br from-white to-hr-50/30">
                  <div className="text-center">
                    <div className="flex justify-center mb-6 text-hr-500 group-hover:scale-110 group-hover:rotate-3 transition-all duration-300">
                      <HRIcon />
                    </div>
                    <h3 className="text-2xl font-bold text-primary-700 mb-4 group-hover:text-hr-600 transition-colors">
                      {t('service.hr.title')}
                    </h3>
                    <p className="text-neutral-700 leading-relaxed text-base">
                      {t(
                        'home.hrDesc',
                        'Strategic HR recruitment and talent management services'
                      )}
                    </p>
                  </div>
                </Card>
              </Link>
            </ScrollReveal>
          </div>
        </Container>
      </section>

      {/* Testimonials Section */}
      <Testimonials
        testimonials={[
          {
            id: '1',
            name: 'Dr. Priya Sharma',
            role: 'Principal',
            company: 'AP Educational Institution',
            content: 'Professional service from start to finish. The solar panels are performing excellently and our institution is now energy independent.',
            rating: 5,
            service: 'solar',
          },
          {
            id: '2',
            name: 'Vikram Reddy',
            role: 'Operations Director',
            company: 'Commercial Complex',
            content: 'Outstanding quality and service. The installation was completed on time and the team was very professional throughout the process.',
            rating: 5,
            service: 'solar',
          },
          {
            id: '3',
            name: 'Anil Kumar',
            role: 'IT Manager',
            company: 'Telecom Company',
            content: 'Excellent telecom infrastructure solutions. The team provided reliable network setup and ongoing support.',
            rating: 5,
            service: 'telecom',
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

