import { Container, Card } from '@/components/ui'

export const metadata = {
  title: 'Terms of Service | Varcas Enterprises',
  description: 'Terms of Service for Varcas Enterprises',
}

export default function TermsPage() {
  return (
    <Container className="py-20">
      <Card className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold text-primary-700 mb-8">Terms of Service</h1>
        <div className="prose prose-lg max-w-none space-y-6 text-neutral-700">
          <section>
            <h2 className="text-2xl font-bold text-primary-700 mb-4">1. Acceptance of Terms</h2>
            <p>
              By accessing and using this website, you accept and agree to be bound by the terms and provision of this agreement.
            </p>
          </section>
          <section>
            <h2 className="text-2xl font-bold text-primary-700 mb-4">2. Use License</h2>
            <p>
              Permission is granted to temporarily download one copy of the materials on Varcas Enterprises&apos; website for personal, non-commercial transitory viewing only.
            </p>
          </section>
          <section>
            <h2 className="text-2xl font-bold text-primary-700 mb-4">3. Disclaimer</h2>
            <p>
              The materials on Varcas Enterprises&apos; website are provided on an &apos;as is&apos; basis. Varcas Enterprises makes no warranties, expressed or implied.
            </p>
          </section>
          <section>
            <h2 className="text-2xl font-bold text-primary-700 mb-4">4. Limitations</h2>
            <p>
              In no event shall Varcas Enterprises or its suppliers be liable for any damages arising out of the use or inability to use the materials on this website.
            </p>
          </section>
          <p className="text-sm text-neutral-500 mt-8">
            Last updated: {new Date().toLocaleDateString()}
          </p>
        </div>
      </Card>
    </Container>
  )
}

