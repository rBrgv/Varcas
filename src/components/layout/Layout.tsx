import { ReactNode } from 'react'
import { Header } from './Header'
import { Footer } from './Footer'
import { WhatsAppFloat } from '@/components/WhatsAppFloat'

interface LayoutProps {
  children: ReactNode
}

export function Layout({ children }: LayoutProps) {
  return (
    <div className="min-h-screen flex flex-col overflow-x-hidden max-w-full">
      <Header />
      <main className="flex-grow w-full overflow-x-hidden">{children}</main>
      <Footer />
      <WhatsAppFloat />
    </div>
  )
}

