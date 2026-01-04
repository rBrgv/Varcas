'use client'

import { Card, Button } from '@/components/ui'
import { ScrollReveal } from '@/components/ScrollReveal'

interface Resource {
  id: string
  title: string
  description: string
  type: 'pdf' | 'brochure' | 'case-study' | 'guide'
  downloadUrl?: string
  icon?: string
}

interface ResourcesProps {
  resources: Resource[]
  className?: string
}

export function Resources({ resources, className = '' }: ResourcesProps) {
  const typeLabels = {
    pdf: 'PDF Document',
    brochure: 'Brochure',
    'case-study': 'Case Study',
    guide: 'Guide',
  }

  const typeColors = {
    pdf: 'from-red-600 to-red-500',
    brochure: 'from-primary-600 to-primary-500',
    'case-study': 'from-solar-600 to-solar-500',
    guide: 'from-secondary-600 to-secondary-500',
  }

  const getResourceIcon = (type: Resource['type']) => {
    switch (type) {
      case 'pdf':
        return (
          <svg
            className="w-12 h-12 text-white"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            strokeWidth={2}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m0 12.75h7.5m-7.5 3H12M10.5 2.25H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z"
            />
          </svg>
        )
      case 'brochure':
        return (
          <svg
            className="w-12 h-12 text-white"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            strokeWidth={2}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M12 6.042A8.967 8.967 0 006 3.75c-1.052 0-2.062.18-3 .512v14.25A8.987 8.987 0 016 18c2.305 0 4.408.867 6 2.292m0-14.25a8.966 8.966 0 016-2.292c1.052 0 2.062.18 3 .512v14.25A8.987 8.987 0 0018 18a8.967 8.967 0 00-6 2.292m0-14.25v14.25"
            />
          </svg>
        )
      case 'case-study':
        return (
          <svg
            className="w-12 h-12 text-white"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            strokeWidth={2}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M3 13.125C3 12.504 3.504 12 4.125 12h2.25c.621 0 1.125.504 1.125 1.125v6.75C7.5 20.496 6.996 21 6.375 21h-2.25A1.125 1.125 0 013 19.875v-6.75zM9.75 8.625c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125v11.25c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V8.625zM16.5 4.125c0-.621.504-1.125 1.125-1.125h2.25C20.496 3 21 3.504 21 4.125v15.75c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V4.125z"
            />
          </svg>
        )
      case 'guide':
        return (
          <svg
            className="w-12 h-12 text-white"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            strokeWidth={2}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M12 6.042A8.967 8.967 0 006 3.75c-1.052 0-2.062.18-3 .512v14.25A8.987 8.987 0 016 18c2.305 0 4.408.867 6 2.292m0-14.25a8.966 8.966 0 016-2.292c1.052 0 2.062.18 3 .512v14.25A8.987 8.987 0 0018 18a8.967 8.967 0 00-6 2.292m0-14.25v14.25"
            />
          </svg>
        )
      default:
        return null
    }
  }

  return (
    <section className={`py-20 md:py-24 bg-gradient-cool relative ${className}`}>
      <div className="absolute inset-0 bg-pattern-mesh opacity-20"></div>
      <div className="container mx-auto px-4 relative z-10">
        <ScrollReveal variant="fade">
          <h2 className="text-4xl md:text-5xl font-bold text-center text-primary-700 mb-4">
            Resources & Downloads
          </h2>
          <p className="text-center text-neutral-600 mb-12 text-lg max-w-2xl mx-auto">
            Access our brochures, case studies, and helpful guides
          </p>
        </ScrollReveal>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {resources.map((resource, index) => (
            <ScrollReveal key={resource.id} variant="scale" delay={index * 100}>
              <Card className="h-full flex flex-col hover:shadow-large transition-all duration-300 hover-lift group bg-white border border-neutral-200 hover:border-primary-300 overflow-hidden">
                {/* Icon Header */}
                <div
                  className={`relative h-32 bg-gradient-to-br ${typeColors[resource.type]} flex items-center justify-center group-hover:scale-105 transition-transform duration-300`}
                >
                  {/* Type Badge - Top Right */}
                  <div className="absolute top-3 right-3 z-20">
                    <span className="px-2.5 py-1 text-xs font-semibold rounded-md bg-white/95 backdrop-blur-sm text-neutral-700 shadow-sm">
                      {typeLabels[resource.type]}
                    </span>
                  </div>
                  {/* Icon - Centered */}
                  <div className="relative z-10 flex items-center justify-center">
                    {getResourceIcon(resource.type)}
                  </div>
                </div>

                {/* Content */}
                <div className="p-6 flex flex-col flex-grow">
                  <h3 className="text-lg font-bold text-neutral-900 mb-2 group-hover:text-primary-700 transition-colors">
                    {resource.title}
                  </h3>
                  <p className="text-neutral-600 mb-6 flex-grow leading-relaxed text-sm">
                    {resource.description}
                  </p>
                  
                  {/* Action Button */}
                  <div className="mt-auto">
                    {resource.downloadUrl ? (
                      <a
                        href={resource.downloadUrl}
                        download
                        className="inline-flex items-center justify-center gap-2 w-full px-4 py-2.5 bg-primary-600 hover:bg-primary-700 text-white font-medium rounded-lg transition-all duration-300 group-hover:shadow-lg"
                      >
                        <svg
                          className="w-4 h-4"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                          strokeWidth={2.5}
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"
                          />
                        </svg>
                        <span>Download</span>
                      </a>
                    ) : (
                      <button
                        disabled
                        className="w-full px-4 py-2.5 bg-neutral-100 text-neutral-500 font-medium rounded-lg cursor-not-allowed"
                      >
                        Coming Soon
                      </button>
                    )}
                  </div>
                </div>
              </Card>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  )
}

