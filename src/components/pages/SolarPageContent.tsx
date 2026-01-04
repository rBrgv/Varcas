'use client'

import { useState, useEffect } from 'react'
import Image from 'next/image'
import { useTranslation } from 'react-i18next'
import { Container, SectionHeading, Card, Button } from '@/components/ui'
import { ScrollReveal } from '@/components/ScrollReveal'
import { SmartEnquiryForm } from '@/components/SmartEnquiryForm'
import { Testimonials } from '@/components/Testimonials'
import '@/lib/i18n'

export function SolarPageContent() {
  const { t } = useTranslation()
  const [activeTab, setActiveTab] = useState<'residential' | 'commercial'>('commercial')
  const [currentImageIndex, setCurrentImageIndex] = useState(0)
  const [selectedImageIndex, setSelectedImageIndex] = useState<number | null>(null)

  const solarImages = [
    { src: '/Solar 1.jpeg', alt: 'Solar Installation 1' },
    { src: '/Solar 2.jpeg', alt: 'Solar Installation 2' },
    { src: '/Solar installation.jpeg', alt: 'Solar Installation Project' },
    { src: '/Fuse.jpeg', alt: 'Solar Fuse Component' },
  ]

  const nextImage = () => {
    setCurrentImageIndex((prev) => (prev + 1) % solarImages.length)
  }

  const prevImage = () => {
    setCurrentImageIndex((prev) => (prev - 1 + solarImages.length) % solarImages.length)
  }

  // Auto-play carousel
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prev) => (prev + 1) % solarImages.length)
    }, 5000) // Change image every 5 seconds

    return () => clearInterval(interval)
  }, [solarImages.length])


  const residentialProducts = [
    {
      id: '1',
      title: 'Residential Solar Kits',
      description: 'Complete solar power solutions for homes: 3kW, 5kW, 7kW, 10kW',
      variants: ['3kW', '5kW', '7kW', '10kW'],
    },
    {
      id: '2',
      title: 'Solar Lights',
      description: 'Energy-efficient solar lighting for homes and gardens',
    },
    {
      id: '3',
      title: 'Solar Water Heaters',
      description: 'Residential solar water heating systems',
    },
    {
      id: '4',
      title: 'Solar Fencing',
      description: 'Solar-powered security fencing for residential properties',
    },
  ]

  const b2bProducts = [
    {
      id: '1',
      title: 'Solar Kits',
      description: 'Complete solar power kits: 3kW, 5kW, 7kW, 10kW for commercial installations',
      variants: ['3kW', '5kW', '7kW', '10kW'],
    },
    {
      id: '2',
      title: 'Solar Lights',
      description: 'Energy-efficient solar lighting solutions',
    },
    {
      id: '3',
      title: 'Solar Fencing',
      description: 'Security solutions powered by solar energy',
    },
    {
      id: '4',
      title: 'Solar Water Heaters',
      description: 'Commercial-grade solar water heating systems',
    },
  ]

  return (
    <>
      {/* Video Background Section - Hero Style */}
      <section className="relative bg-gradient-to-br from-primary-700 via-primary-600 to-primary-800 text-white py-24 md:py-32 overflow-hidden">
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

        <Container className="relative z-10">
          <ScrollReveal variant="fade">
            <div className="text-center max-w-4xl mx-auto">
              <h2 className="text-3xl md:text-5xl font-bold mb-6">
                Our Solar Installations
              </h2>
              <p className="text-lg md:text-xl text-white/90 max-w-2xl mx-auto">
                See our solar units in action - professional installations on terraces and commercial facilities
              </p>
            </div>
          </ScrollReveal>
        </Container>
      </section>

      <section className="py-16 bg-gradient-warm relative">
        <div className="absolute inset-0 bg-pattern-mesh opacity-25"></div>
        <Container className="relative z-10">
          <div className="flex justify-center mb-8">
            <div className="inline-flex rounded-lg border border-primary-200 bg-white p-1">
              <button
                onClick={() => setActiveTab('residential')}
                className={`px-6 py-2 rounded-md font-medium transition-colors ${
                  activeTab === 'residential'
                    ? 'bg-primary-500 text-white'
                    : 'text-neutral-700 hover:bg-neutral-100'
                }`}
              >
                Residential
              </button>
              <button
                onClick={() => setActiveTab('commercial')}
                className={`px-6 py-2 rounded-md font-medium transition-colors ${
                  activeTab === 'commercial'
                    ? 'bg-primary-500 text-white'
                    : 'text-neutral-700 hover:bg-neutral-100'
                }`}
              >
                Commercial / B2B
              </button>
            </div>
          </div>

          {activeTab === 'commercial' && (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {b2bProducts.map((product, index) => (
                <ScrollReveal key={product.id} variant="scale" delay={index * 100}>
                  <Card className="h-full flex flex-col">
                    <h3 className="text-xl font-bold text-primary-700 mb-3">{product.title}</h3>
                    <p className="text-neutral-600 mb-4 flex-grow">{product.description}</p>
                    {product.variants && (
                      <div className="mb-4">
                        <p className="text-sm font-semibold text-neutral-700 mb-2">Available Sizes:</p>
                        <div className="flex flex-wrap gap-2">
                          {product.variants.map((variant) => (
                            <span
                              key={variant}
                              className="px-3 py-1 bg-solar-100 text-solar-700 rounded-full text-xs font-medium"
                            >
                              {variant}
                            </span>
                          ))}
                        </div>
                      </div>
                    )}
                    <Button
                      variant="primary"
                      onClick={() => {
                        const form = document.getElementById('enquiry-form')
                        if (form) form.scrollIntoView({ behavior: 'smooth' })
                      }}
                    >
                      Get Quote
                    </Button>
                  </Card>
                </ScrollReveal>
              ))}
            </div>
          )}

          {activeTab === 'residential' && (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {residentialProducts.map((product, index) => (
                <ScrollReveal key={product.id} variant="scale" delay={index * 100}>
                  <Card className="h-full flex flex-col">
                    <h3 className="text-xl font-bold text-primary-700 mb-3">{product.title}</h3>
                    <p className="text-neutral-600 mb-4 flex-grow">{product.description}</p>
                    {product.variants && (
                      <div className="mb-4">
                        <p className="text-sm font-semibold text-neutral-700 mb-2">Available Sizes:</p>
                        <div className="flex flex-wrap gap-2">
                          {product.variants.map((variant) => (
                            <span
                              key={variant}
                              className="px-3 py-1 bg-solar-100 text-solar-700 rounded-full text-xs font-medium"
                            >
                              {variant}
                            </span>
                          ))}
                        </div>
                      </div>
                    )}
                    <Button
                      variant="primary"
                      onClick={() => {
                        const form = document.getElementById('enquiry-form')
                        if (form) form.scrollIntoView({ behavior: 'smooth' })
                      }}
                    >
                      Get Quote
                    </Button>
                  </Card>
                </ScrollReveal>
              ))}
            </div>
          )}
        </Container>
      </section>

      {/* Image Gallery Section - Compact with Click to Open */}
      <section className="py-16 bg-gradient-to-br from-neutral-50 to-neutral-100 relative overflow-hidden">
        <Container className="relative z-10">
          <ScrollReveal variant="fade">
            <div className="text-center mb-8">
              <h2 className="text-2xl md:text-3xl font-bold text-neutral-900 mb-2">
                Installation Gallery
              </h2>
              <p className="text-neutral-600">Click on any image to view in full size</p>
            </div>
          </ScrollReveal>
          
          <div className="max-w-4xl mx-auto">
            {/* Image Carousel */}
            <ScrollReveal variant="fade" delay={200}>
              <div className="relative">
                <div className="relative rounded-2xl overflow-hidden shadow-xl bg-neutral-900">
                  <div className="aspect-video relative">
                    {/* Images */}
                    <div className="relative w-full h-full">
                      {solarImages.map((image, index) => (
                        <div
                          key={index}
                          className={`absolute inset-0 transition-opacity duration-500 ${
                            index === currentImageIndex ? 'opacity-100' : 'opacity-0'
                          }`}
                        >
                          <Image
                            src={image.src}
                            alt={image.alt}
                            fill
                            className="object-cover cursor-pointer"
                            onClick={() => setSelectedImageIndex(index)}
                            loading={index === 0 ? 'eager' : 'lazy'}
                            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                          />
                        </div>
                      ))}
                    </div>

                    {/* Navigation Arrows */}
                    <button
                      onClick={prevImage}
                      className="absolute left-4 top-1/2 -translate-y-1/2 bg-black/60 hover:bg-black/80 text-white p-3 rounded-full transition-all duration-300 hover:scale-110 backdrop-blur-sm z-10"
                      aria-label="Previous image"
                    >
                      <svg
                        className="w-6 h-6"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M15 19l-7-7 7-7"
                        />
                      </svg>
                    </button>
                    <button
                      onClick={nextImage}
                      className="absolute right-4 top-1/2 -translate-y-1/2 bg-black/60 hover:bg-black/80 text-white p-3 rounded-full transition-all duration-300 hover:scale-110 backdrop-blur-sm z-10"
                      aria-label="Next image"
                    >
                      <svg
                        className="w-6 h-6"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M9 5l7 7-7 7"
                        />
                      </svg>
                    </button>

                    {/* Dots Indicator */}
                    <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2 z-10">
                      {solarImages.map((_, index) => (
                        <button
                          key={index}
                          onClick={() => setCurrentImageIndex(index)}
                          className={`h-2 rounded-full transition-all duration-300 ${
                            index === currentImageIndex
                              ? 'w-8 bg-white'
                              : 'w-2 bg-white/50 hover:bg-white/75'
                          }`}
                          aria-label={`Go to image ${index + 1}`}
                        />
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </ScrollReveal>
          </div>
        </Container>

        {/* Lightbox Modal */}
        {selectedImageIndex !== null && (
          <div
            className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center p-4"
            onClick={() => setSelectedImageIndex(null)}
          >
            <button
              onClick={() => setSelectedImageIndex(null)}
              className="absolute top-4 right-4 text-white hover:text-gray-300 transition-colors z-10"
              aria-label="Close"
            >
              <svg
                className="w-8 h-8"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
            
            <div className="relative max-w-6xl w-full" onClick={(e) => e.stopPropagation()}>
              <div className="relative aspect-video max-h-[90vh]">
                <Image
                  src={solarImages[selectedImageIndex].src}
                  alt={solarImages[selectedImageIndex].alt}
                  fill
                  className="object-contain rounded-lg"
                  sizes="90vw"
                  priority
                />
                
                {/* Navigation Arrows in Modal */}
                {solarImages.length > 1 && (
                  <>
                    <button
                      onClick={(e) => {
                        e.stopPropagation()
                        setSelectedImageIndex((prev) => (prev! - 1 + solarImages.length) % solarImages.length)
                      }}
                      className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/20 hover:bg-white/30 text-white p-3 rounded-full transition-all duration-300 backdrop-blur-sm"
                      aria-label="Previous image"
                    >
                      <svg
                        className="w-6 h-6"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M15 19l-7-7 7-7"
                        />
                      </svg>
                    </button>
                    <button
                      onClick={(e) => {
                        e.stopPropagation()
                        setSelectedImageIndex((prev) => (prev! + 1) % solarImages.length)
                      }}
                      className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/20 hover:bg-white/30 text-white p-3 rounded-full transition-all duration-300 backdrop-blur-sm"
                      aria-label="Next image"
                    >
                      <svg
                        className="w-6 h-6"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M9 5l7 7-7 7"
                        />
                      </svg>
                    </button>
                  </>
                )}
              </div>
              
              {/* Image Counter */}
              <div className="absolute bottom-4 left-1/2 -translate-x-1/2 bg-black/50 text-white px-4 py-2 rounded-full backdrop-blur-sm">
                {selectedImageIndex + 1} / {solarImages.length}
              </div>
            </div>
          </div>
        )}
      </section>

      <section id="enquiry-form" className="py-20 bg-gradient-cool relative">
        <Container className="relative z-10">
          <ScrollReveal variant="fade">
            <SectionHeading className="text-center mb-12">
              Request a Quote
            </SectionHeading>
            <div className="max-w-2xl mx-auto">
              <SmartEnquiryForm serviceType="solar" />
            </div>
          </ScrollReveal>
        </Container>
      </section>

      {/* Testimonials Section */}
      <Testimonials
        testimonials={[
          {
            id: '1',
            name: 'Rajesh Kumar',
            role: 'Facilities Manager',
            company: 'Tirupati Airport',
            content: 'Varcas Enterprises delivered an exceptional solar installation for our airport. The system has been running flawlessly and significantly reduced our energy costs.',
            rating: 5,
            service: 'solar',
          },
          {
            id: '2',
            name: 'Dr. Priya Sharma',
            role: 'Principal',
            company: 'AP Educational Institution',
            content: 'Professional service from start to finish. The solar panels are performing excellently and our institution is now energy independent.',
            rating: 5,
            service: 'solar',
          },
          {
            id: '3',
            name: 'Vikram Reddy',
            role: 'Operations Director',
            company: 'Commercial Complex',
            content: 'Outstanding quality and service. The installation was completed on time and the team was very professional throughout the process.',
            rating: 5,
            service: 'solar',
          },
        ]}
      />
    </>
  )
}

