'use client'

import { useState } from 'react'
import Image from 'next/image'
import { useTranslation } from 'react-i18next'
import { Container, SectionHeading, Card, Button } from '@/components/ui'
import { ScrollReveal } from '@/components/ScrollReveal'

interface Project {
  id: string
  title: string
  category: 'solar' | 'telecom' | 'hr' | 'all'
  description: string
  location: string
  year: string
  imageUrl?: string
}

interface ProjectGalleryProps {
  projects: Project[]
  className?: string
}

const categoryColors = {
  solar: 'bg-solar-500',
  telecom: 'bg-telecom-500',
  hr: 'bg-hr-500',
  all: 'bg-primary-500',
}

export function ProjectGallery({ projects, className = '' }: ProjectGalleryProps) {
  const { t } = useTranslation()
  const [filter, setFilter] = useState<'all' | 'solar' | 'telecom' | 'hr'>('all')

  const filteredProjects = projects.filter(
    (project) => filter === 'all' || project.category === filter
  )

  return (
    <section className={`py-20 md:py-24 bg-gradient-warm relative ${className}`}>
      <div className="absolute inset-0 bg-pattern-mesh opacity-15"></div>
      <Container className="relative z-10">
        <ScrollReveal variant="fade">
          <SectionHeading className="text-center mb-16">
            {t('projects.title', 'Our Recent Projects')}
          </SectionHeading>
        </ScrollReveal>

        <ScrollReveal variant="fade" delay={100}>
          <div className="flex flex-wrap justify-center gap-4 mb-12">
            <Button
              variant={filter === 'all' ? 'primary' : 'outline'}
              onClick={() => setFilter('all')}
              className="hover-lift"
            >
              {t('projects.filter.all', 'All')}
            </Button>
            <Button
              variant={filter === 'solar' ? 'solar' : 'outline'}
              onClick={() => setFilter('solar')}
              className="hover-lift"
            >
              {t('service.solar.title')}
            </Button>
            <Button
              variant={filter === 'telecom' ? 'telecom' : 'outline'}
              onClick={() => setFilter('telecom')}
              className="hover-lift"
            >
              {t('service.telecom.title')}
            </Button>
            <Button
              variant={filter === 'hr' ? 'hr' : 'outline'}
              onClick={() => setFilter('hr')}
              className="hover-lift"
            >
              {t('service.hr.title')}
            </Button>
          </div>
        </ScrollReveal>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredProjects.length > 0 ? (
            filteredProjects.map((project, index) => (
              <ScrollReveal key={project.id} variant="up" delay={index * 100}>
                <Card className="h-full flex flex-col overflow-hidden shadow-medium hover:shadow-large hover-lift bg-gradient-to-br from-white to-neutral-50/50">
                  {project.imageUrl && (
                    <div className="relative h-48 w-full overflow-hidden mb-4">
                      <Image
                        src={project.imageUrl}
                        alt={project.title}
                        fill
                        className="object-cover transition-transform duration-300 group-hover:scale-105"
                        loading="lazy"
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                        unoptimized={project.imageUrl.startsWith('http')}
                      />
                      <div className={`absolute top-4 left-4 px-3 py-1 rounded-full text-xs font-semibold text-white ${categoryColors[project.category]}`}>
                        {t(`service.${project.category}.title`, project.category)}
                      </div>
                    </div>
                  )}
                  <div className="p-6 flex-grow">
                    <h3 className="text-xl font-bold text-primary-700 mb-2 group-hover:text-primary-600 transition-colors">
                      {project.title}
                    </h3>
                    <p className="text-neutral-700 text-sm mb-4 flex-grow">{project.description}</p>
                    <div className="flex justify-between items-center text-neutral-600 text-xs">
                      <span>{project.location}</span>
                      <span>{project.year}</span>
                    </div>
                  </div>
                </Card>
              </ScrollReveal>
            ))
          ) : (
            <ScrollReveal variant="fade">
              <Card className="col-span-full text-center py-12 text-neutral-700 text-lg">
                {t('projects.noProjects', 'No projects found for this category.')}
              </Card>
            </ScrollReveal>
          )}
        </div>
      </Container>
    </section>
  )
}

