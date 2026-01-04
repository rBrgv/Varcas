'use client'

import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { Container, SectionHeading, Card } from '@/components/ui'
import { ScrollReveal } from '@/components/ScrollReveal'

interface FAQItem {
  id: string
  question: string
  answer: string
}

interface FAQProps {
  faqs: FAQItem[]
  className?: string
}

export function FAQ({ faqs, className = '' }: FAQProps) {
  const { t } = useTranslation()
  const [openId, setOpenId] = useState<string | null>(null)

  const toggleFAQ = (id: string) => {
    setOpenId(openId === id ? null : id)
  }

  return (
    <section className={`py-20 md:py-24 bg-gradient-cool relative ${className}`}>
      <div className="absolute inset-0 bg-pattern-mesh opacity-15"></div>
      <Container className="relative z-10">
        <ScrollReveal variant="fade">
          <SectionHeading className="text-center mb-16">
            {t('faq.title', 'Frequently Asked Questions')}
          </SectionHeading>
        </ScrollReveal>

        <div className="max-w-3xl mx-auto space-y-6">
          {faqs.map((faq, index) => (
            <ScrollReveal key={faq.id} variant="up" delay={index * 100}>
              <Card className="p-6 bg-gradient-to-br from-white to-neutral-50/50 shadow-medium hover:shadow-large hover-lift">
                <button
                  className="flex justify-between items-center w-full text-left font-semibold text-lg text-primary-700 hover:text-primary-600 transition-colors"
                  onClick={() => toggleFAQ(faq.id)}
                  aria-expanded={openId === faq.id}
                  aria-controls={`faq-answer-${faq.id}`}
                >
                  {faq.question}
                  <svg
                    className={`w-6 h-6 text-primary-500 transition-transform duration-300 ${
                      openId === faq.id ? 'rotate-180' : ''
                    }`}
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M19 9l-7 7-7-7"
                    />
                  </svg>
                </button>
                {openId === faq.id && (
                  <div
                    id={`faq-answer-${faq.id}`}
                    className="mt-4 text-neutral-700 leading-relaxed animate-fade-in"
                  >
                    {faq.answer}
                  </div>
                )}
              </Card>
            </ScrollReveal>
          ))}
        </div>
      </Container>
    </section>
  )
}

