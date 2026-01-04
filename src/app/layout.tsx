import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import { Layout } from '@/components/layout/Layout'
import '@/styles/globals.css'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Varcas Enterprises | Solar, Telecom & HR Solutions',
  description: 'Enterprise solutions for Solar, Telecom, and HR services across Andhra Pradesh. Serving airports, educational institutions, and commercial facilities.',
  keywords: ['solar', 'telecom', 'HR', 'enterprise solutions', 'Andhra Pradesh'],
  openGraph: {
    title: 'Varcas Enterprises',
    description: 'Enterprise solutions for Solar, Telecom, and HR services',
    type: 'website',
  },
  icons: {
    icon: '/favicon.ico',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://varcasenterprises.com'
  
  const organizationSchema = {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: 'Varcas Enterprises',
    url: baseUrl,
    logo: `${baseUrl}/favicon.ico`,
    description: 'Enterprise solutions for Solar, Telecom, and HR services across Andhra Pradesh',
    address: {
      '@type': 'PostalAddress',
      streetAddress: '5-5, RGT-SKHT Road',
      addressLocality: 'Renigunta, Tirupati',
      postalCode: '517520',
      addressRegion: 'Andhra Pradesh',
      addressCountry: 'IN',
    },
    contactPoint: {
      '@type': 'ContactPoint',
      telephone: '+91-93468-72545',
      contactType: 'Customer Service',
      email: 'varcasent@gmail.com',
    },
    sameAs: [
      'https://www.varcasenterprises.com',
    ],
  }

  const websiteSchema = {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: 'Varcas Enterprises',
    url: baseUrl,
    potentialAction: {
      '@type': 'SearchAction',
      target: {
        '@type': 'EntryPoint',
        urlTemplate: `${baseUrl}/services?q={search_term_string}`,
      },
      'query-input': 'required name=search_term_string',
    },
  }

  return (
    <html lang="en">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteSchema) }}
        />
      </head>
      <body className={inter.className}>
        <Layout>{children}</Layout>
      </body>
    </html>
  )
}

