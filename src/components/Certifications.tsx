'use client'

import { useTranslation } from 'react-i18next'
import { Container, SectionHeading, Card } from '@/components/ui'
import { ScrollReveal } from '@/components/ScrollReveal'

interface Certification {
  id: string
  name: string
  issuer: string
  year: string
  icon?: React.ReactNode
}

interface CertificationsProps {
  certifications: Certification[]
  className?: string
}

export function Certifications({ certifications, className = '' }: CertificationsProps) {
  const { t } = useTranslation()

  return (
    <section className={`py-20 md:py-24 bg-gradient-elegant relative ${className}`}>
      <div className="absolute inset-0 bg-pattern-mesh opacity-20"></div>
      <Container className="relative z-10">
        <ScrollReveal variant="fade">
          <SectionHeading className="text-center mb-16">
            {t('certifications.title', 'Our Certifications & Awards')}
          </SectionHeading>
        </ScrollReveal>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {certifications.map((cert, index) => (
            <ScrollReveal key={cert.id} variant="scale" delay={index * 100}>
              <Card className="text-center p-6 bg-gradient-to-br from-white to-primary-50/50 shadow-medium hover:shadow-large hover-lift">
                <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-gradient-to-br from-primary-500 to-secondary-500 flex items-center justify-center text-white text-3xl font-bold shadow-md">
                  {cert.icon || <span className="text-xl">{cert.name.charAt(0)}</span>}
                </div>
                <h3 className="text-xl font-bold text-primary-700 mb-2">{cert.name}</h3>
                <p className="text-neutral-600 text-sm">{cert.issuer}</p>
                <p className="text-neutral-500 text-xs mt-1">{cert.year}</p>
              </Card>
            </ScrollReveal>
          ))}
        </div>
      </Container>
    </section>
  )
}

