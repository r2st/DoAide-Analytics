import { useQuery } from '@tanstack/react-query'
import { Calendar, Plus } from 'lucide-react'
import Badge from '../components/ui/Badge'
import Button from '../components/ui/Button'
import EmptyState from '../components/ui/EmptyState'
import LoadingSpinner from '../components/ui/LoadingSpinner'
import api from '../services/api'

export default function ScheduledReports() {
  const { data: scheduled, isLoading } = useQuery({
    queryKey: ['scheduled-reports'],
    queryFn: () => api.get('/scheduled-reports/').then((r) => r.data),
  })

  if (isLoading) return <LoadingSpinner className="py-20" />

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Scheduled Reports</h1>
          <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">Automate report delivery to your team</p>
        </div>
        <Button><Plus size={18} className="mr-2" /> Schedule Report</Button>
      </div>

      {!scheduled?.length ? (
        <EmptyState icon={Calendar} title="No scheduled reports" description="Set up automated report delivery on a recurring schedule." actionLabel="Schedule Report" />
      ) : (
        <div className="space-y-3">
          {scheduled.map((s) => (
            <div key={s.id} className="flex items-center justify-between rounded-xl border border-border dark:border-gray-800 bg-white dark:bg-surface-dark-secondary p-4">
              <div className="flex items-center gap-4">
                <Calendar className="text-primary" size={20} />
                <div>
                  <h3 className="font-medium text-gray-900 dark:text-white">Schedule {s.cron_expression}</h3>
                  <p className="text-xs text-gray-400 mt-0.5">Recipients: {s.recipients?.join(', ')}</p>
                </div>
              </div>
              <Badge color={s.is_active ? 'green' : 'gray'}>{s.is_active ? 'Active' : 'Paused'}</Badge>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
