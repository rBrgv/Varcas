import { JobDetailContent } from '@/components/pages/JobDetailContent'

export async function generateMetadata({ params }: { params: { id: string } }) {
  return {
    title: `Job Details | Varcas Enterprises`,
    description: 'View job details and apply',
  }
}

export default function JobDetailPage({ params }: { params: { id: string } }) {
  return <JobDetailContent jobId={params.id} />
}

