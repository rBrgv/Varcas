'use client'

import { useTranslation } from 'react-i18next'
import { Container, SectionHeading, Card } from '@/components/ui'
import { ScrollReveal } from '@/components/ScrollReveal'

interface Testimonial {
  id: string
  name: string
  role: string
  company: string
  content: string
  rating: number
  service: 'solar' | 'telecom' | 'hr' | 'general'
}

interface TestimonialsProps {
  testimonials: Testimonial[]
  className?: string
}

const serviceColors = {
  solar: 'border-solar-500',
  telecom: 'border-telecom-500',
  hr: 'border-hr-500',
  general: 'border-primary-500',
}

export function Testimonials({ testimonials, className = '' }: TestimonialsProps) {
  const { t } = useTranslation()

  return (
    <section className={`py-12 md:py-16 bg-gradient-warm relative ${className}`}>
      <div className="absolute inset-0 bg-pattern-mesh opacity-20"></div>
      <Container className="relative z-10">
        <ScrollReveal variant="fade">
          <SectionHeading className="text-center mb-10">
            {t('testimonials.title', 'What Our Clients Say')}
          </SectionHeading>
        </ScrollReveal>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {testimonials.map((testimonial, index) => (
            <ScrollReveal key={testimonial.id} variant="up" delay={index * 100}>
              <Card className={`h-full flex flex-col p-6 border-l-4 ${serviceColors[testimonial.service]} bg-gradient-to-br from-white to-neutral-50/50 shadow-medium hover:shadow-large hover-lift transition-all duration-300`}>
                <div className="flex items-start justify-between mb-3">
                  <div className="flex items-center flex-1">
                    <div className="w-10 h-10 rounded-full bg-primary-100 flex items-center justify-center text-primary-700 font-bold text-base mr-3 flex-shrink-0">
                      {testimonial.name.charAt(0)}
                    </div>
                    <div className="min-w-0 flex-1">
                      <p className="font-semibold text-neutral-800 text-sm truncate">{testimonial.name}</p>
                      <p className="text-xs text-neutral-600 truncate">{testimonial.role}, {testimonial.company}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-0.5 flex-shrink-0 ml-2">
                    {[...Array(5)].map((_, i) => (
                      <svg
                        key={i}
                        className={`w-4 h-4 ${i < testimonial.rating ? 'text-accent-500' : 'text-gray-300'}`}
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.538 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.783.57-1.838-.197-1.538-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.462a1 1 0 00.95-.69l1.07-3.292z" />
                      </svg>
                    ))}
                  </div>
                </div>
                <p className="text-neutral-700 text-sm leading-relaxed flex-grow line-clamp-4">
                  &ldquo;{testimonial.content}&rdquo;
                </p>
              </Card>
            </ScrollReveal>
          ))}
        </div>
      </Container>
    </section>
  )
}

