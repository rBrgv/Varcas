'use client'

import Image from 'next/image'
import { ScrollReveal } from '@/components/ScrollReveal'
import { SectionHeading } from './ui'

interface ClientLogo {
  id: string
  name: string
  logo?: string
  category: 'airport' | 'education' | 'commercial' | 'government'
}

interface ClientLogosProps {
  clients: ClientLogo[]
  className?: string
}

export function ClientLogos({ clients, className = '' }: ClientLogosProps) {
  return (
    <section className={`py-16 md:py-20 bg-white ${className}`}>
      <div className="container mx-auto px-4">
        <ScrollReveal variant="fade">
          <SectionHeading className="text-center mb-12">
            Our Valued Partners
          </SectionHeading>
        </ScrollReveal>
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-8 items-center">
          {clients.map((client, index) => (
            <ScrollReveal key={client.id} variant="scale" delay={index * 50}>
              <div className="flex items-center justify-center p-4 hover:scale-110 transition-transform duration-300">
                {client.logo ? (
                  <div className="relative w-24 h-12">
                    <Image
                      src={client.logo}
                      alt={client.name}
                      fill
                      className="object-contain grayscale hover:grayscale-0 transition-all duration-300 opacity-60 hover:opacity-100"
                      loading="lazy"
                      sizes="(max-width: 768px) 50px, 100px"
                      unoptimized={client.logo.startsWith('http')}
                    />
                  </div>
                ) : (
                  <div className="text-center">
                    <div className="w-16 h-16 mx-auto mb-2 rounded-lg bg-gradient-to-br from-primary-100 to-secondary-100 flex items-center justify-center">
                      <span className="text-2xl font-bold text-primary-600">
                        {client.name.charAt(0)}
                      </span>
                    </div>
                    <span className="text-xs text-neutral-600 font-medium">
                      {client.name}
                    </span>
                  </div>
                )}
              </div>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  )
}

