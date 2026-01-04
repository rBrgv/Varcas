import { Container, Card } from '@/components/ui'

export const metadata = {
  title: 'Privacy Policy | Varcas Enterprises',
  description: 'Privacy Policy for Varcas Enterprises',
}

export default function PrivacyPolicyPage() {
  return (
    <Container className="py-20">
      <Card className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold text-primary-700 mb-8">Privacy Policy</h1>
        <div className="prose prose-lg max-w-none space-y-6 text-neutral-700">
          <section>
            <h2 className="text-2xl font-bold text-primary-700 mb-4">1. Information We Collect</h2>
            <p>
              We collect information that you provide directly to us, including your name, email address, phone number, and any other information you choose to provide when you submit an enquiry or job application.
            </p>
          </section>
          <section>
            <h2 className="text-2xl font-bold text-primary-700 mb-4">2. How We Use Your Information</h2>
            <p>
              We use the information we collect to respond to your enquiries, process job applications, and communicate with you about our services.
            </p>
          </section>
          <section>
            <h2 className="text-2xl font-bold text-primary-700 mb-4">3. Data Security</h2>
            <p>
              We implement appropriate security measures to protect your personal information. However, no method of transmission over the Internet is 100% secure.
            </p>
          </section>
          <section>
            <h2 className="text-2xl font-bold text-primary-700 mb-4">4. Contact Us</h2>
            <p>
              If you have any questions about this Privacy Policy, please contact us at varcasent@gmail.com
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

