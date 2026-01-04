import Link from 'next/link'
import { Container, Button } from '@/components/ui'

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-elegant">
      <Container>
        <div className="text-center">
          <h1 className="text-9xl font-bold text-primary-500 mb-4">404</h1>
          <h2 className="text-4xl font-bold text-primary-700 mb-4">Page Not Found</h2>
          <p className="text-neutral-600 text-lg mb-8 max-w-md mx-auto">
            The page you&apos;re looking for doesn&apos;t exist or has been moved.
          </p>
          <div className="flex gap-4 justify-center">
            <Button variant="primary" size="lg" as={Link} href="/">
              Go Home
            </Button>
            <Button variant="outline" size="lg" as={Link} href="/contact">
              Contact Us
            </Button>
          </div>
        </div>
      </Container>
    </div>
  )
}

