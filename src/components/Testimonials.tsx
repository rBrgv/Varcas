'use client'

import { useState, useEffect } from 'react'
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
  carousel?: boolean
}

const serviceColors = {
  solar: 'border-solar-500',
  telecom: 'border-telecom-500',
  hr: 'border-hr-500',
  general: 'border-primary-500',
}

export function Testimonials({ testimonials, className = '', carousel = false }: TestimonialsProps) {
  const { t } = useTranslation()
  const [currentIndex, setCurrentIndex] = useState(0)

  // Auto-play carousel
  useEffect(() => {
    if (!carousel || testimonials.length <= 1) return

    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % testimonials.length)
    }, 5000) // Change every 5 seconds

    return () => clearInterval(interval)
  }, [carousel, testimonials.length])

  const nextTestimonial = () => {
    setCurrentIndex((prev) => (prev + 1) % testimonials.length)
  }

  const prevTestimonial = () => {
    setCurrentIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length)
  }

  if (carousel) {
    return (
      <section className={`py-12 md:py-16 bg-gradient-warm relative ${className}`}>
        <div className="absolute inset-0 bg-pattern-mesh opacity-20"></div>
        <Container className="relative z-10">
          <ScrollReveal variant="fade">
            <SectionHeading className="text-center mb-10">
              {t('testimonials.title', 'What Our Clients Say')}
            </SectionHeading>
          </ScrollReveal>

          <div className="max-w-4xl mx-auto">
            <div className="relative">
              {/* Testimonial Cards */}
              <div className="overflow-hidden">
                <div className="relative min-h-[280px]">
                  {testimonials.map((testimonial, index) => (
                    <div
                      key={testimonial.id}
                      className={`absolute inset-0 transition-all duration-500 ${index === currentIndex ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-full'
                        }`}
                    >
                      <Card className={`p-8 border-l-4 ${serviceColors[testimonial.service]} bg-gradient-to-br from-white to-neutral-50/50 shadow-large`}>
                        <div className="flex items-start justify-between mb-4">
                          <div className="flex items-center flex-1">
                            <div className="w-14 h-14 rounded-full bg-primary-100 flex items-center justify-center text-primary-700 font-bold text-xl mr-4 flex-shrink-0">
                              {testimonial.name.charAt(0)}
                            </div>
                            <div className="min-w-0 flex-1">
                              <p className="font-semibold text-neutral-800 text-lg">{testimonial.name}</p>
                              <p className="text-sm text-neutral-600">{testimonial.role}, {testimonial.company}</p>
                            </div>
                          </div>
                          <div className="flex items-center gap-0.5 flex-shrink-0 ml-4">
                            {[...Array(5)].map((_, i) => (
                              <svg
                                key={i}
                                className={`w-5 h-5 ${i < testimonial.rating ? 'text-accent-500' : 'text-gray-300'}`}
                                fill="currentColor"
                                viewBox="0 0 20 20"
                              >
                                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.538 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.783.57-1.838-.197-1.538-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.462a1 1 0 00.95-.69l1.07-3.292z" />
                              </svg>
                            ))}
                          </div>
                        </div>
                        <p className="text-neutral-700 text-base leading-relaxed">
                          &ldquo;{testimonial.content}&rdquo;
                        </p>
                      </Card>
                    </div>
                  ))}
                </div>
              </div>

              {/* Navigation Arrows */}
              {testimonials.length > 1 && (
                <>
                  <button
                    onClick={prevTestimonial}
                    className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 md:-translate-x-12 bg-white hover:bg-primary-50 text-primary-600 p-3 rounded-full shadow-lg transition-all duration-300 hover:scale-110 z-10"
                    aria-label="Previous testimonial"
                  >
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                    </svg>
                  </button>
                  <button
                    onClick={nextTestimonial}
                    className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 md:translate-x-12 bg-white hover:bg-primary-50 text-primary-600 p-3 rounded-full shadow-lg transition-all duration-300 hover:scale-110 z-10"
                    aria-label="Next testimonial"
                  >
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </button>
                </>
              )}
            </div>

            {/* Dots Indicator */}
            {testimonials.length > 1 && (
              <div className="flex justify-center gap-2 mt-8">
                {testimonials.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentIndex(index)}
                    className={`h-2 rounded-full transition-all duration-300 ${index === currentIndex ? 'w-8 bg-primary-600' : 'w-2 bg-primary-300 hover:bg-primary-400'
                      }`}
                    aria-label={`Go to testimonial ${index + 1}`}
                  />
                ))}
              </div>
            )}
          </div>
        </Container>
      </section>
    )
  }

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

