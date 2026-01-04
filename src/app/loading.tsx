import { Container } from '@/components/ui'
import { LoadingSkeleton } from '@/components/LoadingSkeleton'

export default function Loading() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-elegant py-20">
      <Container>
        <div className="max-w-2xl mx-auto">
          <LoadingSkeleton className="mb-4" />
          <LoadingSkeleton className="mb-4" />
          <LoadingSkeleton className="w-3/4" />
        </div>
      </Container>
    </div>
  )
}

