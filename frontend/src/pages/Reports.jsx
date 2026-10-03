import { useQuery } from '@tanstack/react-query'
import { Download, FileText, Plus } from 'lucide-react'
import Badge from '../components/ui/Badge'
import Button from '../components/ui/Button'
import EmptyState from '../components/ui/EmptyState'
import LoadingSpinner from '../components/ui/LoadingSpinner'
import api from '../services/api'

export default function Reports() {
  const { data: reports, isLoading } = useQuery({
    queryKey: ['reports'],
    queryFn: () => api.get('/reports/', { params: { business_id: '00000000-0000-0000-0000-000000000000' } }).then((r) => r.data),
  })

  if (isLoading) return <LoadingSpinner className="py-20" />

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Reports</h1>
          <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">Generate and download analytics reports</p>
        </div>
        <Button><Plus size={18} className="mr-2" /> Generate Report</Button>
      </div>

      {!reports?.length ? (
        <EmptyState icon={FileText} title="No reports" description="Generate a report from one of your dashboards." actionLabel="Generate Report" />
      ) : (
        <div className="space-y-3">
          {reports.map((r) => (
            <div key={r.id} className="flex items-center justify-between rounded-xl border border-border dark:border-gray-800 bg-white dark:bg-surface-dark-secondary p-4">
              <div className="flex items-center gap-4">
                <FileText className="text-primary" size={20} />
                <div>
                  <h3 className="font-medium text-gray-900 dark:text-white">{r.name}</h3>
                  <p className="text-xs text-gray-400 mt-0.5">{new Date(r.created_at).toLocaleDateString()}</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <Badge color={r.format === 'pdf' ? 'red' : 'green'}>{r.format.toUpperCase()}</Badge>
                <Button variant="ghost" size="sm"><Download size={16} /></Button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
