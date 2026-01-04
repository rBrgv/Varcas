'use client'

import Link from 'next/link'
import { useTranslation } from 'react-i18next'
import { Container, SectionHeading, Card, Button } from '@/components/ui'
import { ScrollReveal } from '@/components/ScrollReveal'
import { SolarIcon } from '@/components/icons/SolarIcon'
import { TelecomIcon } from '@/components/icons/TelecomIcon'
import { HRIcon } from '@/components/icons/HRIcon'
import '@/lib/i18n'

export function ServicesPageContent() {
  const { t } = useTranslation()

  const services = [
    {
      id: 'solar',
      title: t('service.solar.title'),
      description: t('home.solarDesc'),
      href: '/services/solar',
      icon: SolarIcon,
      products: [
        { name: 'Solar Kits', sizes: ['3kW', '5kW', '7kW', '10kW'] },
        { name: 'Solar Lights' },
        { name: 'Solar Fencing' },
        { name: 'Solar Water Heaters' },
      ],
    },
    {
      id: 'telecom',
      title: t('service.telecom.title'),
      description: t('home.telecomDesc'),
      href: '/services/telecom',
      icon: TelecomIcon,
      products: [
        { name: 'Fibre Laying and O&M' },
        { name: 'POPs Setup & Maintenance' },
        { name: 'ISP Operations Support' },
        { name: 'Network Maintenance' },
        { name: 'Field Engineering Services' },
      ],
    },
    {
      id: 'hr',
      title: t('service.hr.title'),
      description: t('home.hrDesc'),
      href: '/services/hr',
      icon: HRIcon,
      products: [
        { name: 'Permanent Hiring' },
        { name: 'Contract Hiring' },
        { name: 'Technical Roles' },
        { name: 'Non-Technical Roles' },
      ],
    },
  ]

  return (
    <>
      <section className="relative bg-gradient-to-br from-primary-700 via-primary-600 to-primary-800 text-white py-20 md:py-24 overflow-hidden">
        <Container className="relative z-10">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-4xl md:text-6xl font-bold mb-6 leading-tight">
              {t('home.ourServices')}
            </h1>
            <p className="text-xl md:text-2xl text-gray-200 font-light">
              Comprehensive enterprise solutions across multiple sectors
            </p>
          </div>
        </Container>
      </section>
      <section className="py-20 md:py-24 bg-gradient-elegant relative">
        <div className="absolute inset-0 bg-pattern-mesh opacity-20"></div>
        <Container className="relative z-10">
          <ScrollReveal variant="fade">
            <SectionHeading className="text-center mb-16">
              Our Products & Services
            </SectionHeading>
          </ScrollReveal>
          <div className="space-y-16">
            {services.map((service, index) => {
              const IconComponent = service.icon
              return (
                <ScrollReveal key={service.id} variant="fade" delay={index * 150}>
                  <div className="bg-white rounded-2xl shadow-large p-8 md:p-12 border-l-4 border-l-primary-500">
                    <div className="flex flex-col md:flex-row gap-8 items-start">
                      <div className="flex-shrink-0">
                        <div className="w-20 h-20 rounded-xl bg-gradient-to-br from-primary-500 to-secondary-500 flex items-center justify-center text-white shadow-lg">
                          <IconComponent />
                        </div>
                      </div>
                      <div className="flex-grow">
                        <h2 className="text-3xl font-bold text-primary-700 mb-3">{service.title}</h2>
                        <p className="text-neutral-700 text-lg mb-6 leading-relaxed">{service.description}</p>
                        
                        <div className="mb-6">
                          <h3 className="text-lg font-semibold text-primary-700 mb-4">
                            {service.id === 'solar' ? 'Products:' : service.id === 'telecom' ? 'Services:' : 'Hiring Types:'}
                          </h3>
                          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                            {service.products.map((product, pIndex) => (
                              <div
                                key={pIndex}
                                className="p-4 bg-gradient-to-br from-neutral-50 to-white rounded-lg border border-neutral-200 hover:border-primary-300 hover:shadow-md transition-all"
                              >
                                <p className="font-semibold text-primary-700 mb-2">{product.name}</p>
                                {product.sizes && (
                                  <div className="flex flex-wrap gap-2 mt-2">
                                    {product.sizes.map((size) => (
                                      <span
                                        key={size}
                                        className="px-2 py-1 bg-primary-100 text-primary-700 rounded text-xs font-medium"
                                      >
                                        {size}
                                      </span>
                                    ))}
                                  </div>
                                )}
                              </div>
                            ))}
                          </div>
                        </div>

                        <Button
                          variant="primary"
                          size="lg"
                          as={Link}
                          href={service.href}
                          className="hover-lift"
                        >
                          Learn More About {service.title}
                        </Button>
                      </div>
                    </div>
                  </div>
                </ScrollReveal>
              )
            })}
          </div>
        </Container>
      </section>
    </>
  )
}

