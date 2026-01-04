'use client'

import { useEffect } from 'react'
import { Container, Button } from '@/components/ui'

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  useEffect(() => {
    console.error(error)
  }, [error])

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-elegant">
      <Container>
        <div className="text-center">
          <h1 className="text-6xl font-bold text-primary-500 mb-4">Oops!</h1>
          <h2 className="text-3xl font-bold text-primary-700 mb-4">Something went wrong</h2>
          <p className="text-neutral-600 text-lg mb-8 max-w-md mx-auto">
            We encountered an error. Please try again or contact us if the problem persists.
          </p>
          <div className="flex gap-4 justify-center">
            <Button variant="primary" size="lg" onClick={reset}>
              Try Again
            </Button>
            <Button variant="outline" size="lg" as="a" href="/contact">
              Contact Support
            </Button>
          </div>
        </div>
      </Container>
    </div>
  )
}

