import { useQuery } from '@tanstack/react-query'
import { LayoutDashboard, Plus } from 'lucide-react'
import { useNavigate } from 'react-router-dom'
import Badge from '../components/ui/Badge'
import Button from '../components/ui/Button'
import EmptyState from '../components/ui/EmptyState'
import LoadingSpinner from '../components/ui/LoadingSpinner'
import api from '../services/api'

export default function DashboardList() {
  const navigate = useNavigate()
  const { data: dashboards, isLoading } = useQuery({
    queryKey: ['dashboards'],
    queryFn: () => api.get('/dashboards/', { params: { business_id: '00000000-0000-0000-0000-000000000000' } }).then((r) => r.data),
  })

  if (isLoading) return <LoadingSpinner className="py-20" />

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Dashboards</h1>
          <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">Build and manage your analytics dashboards</p>
        </div>
        <Button onClick={() => navigate('/app/dashboards/new')}>
          <Plus size={18} className="mr-2" /> New Dashboard
        </Button>
      </div>

      <div className="mb-4">
        <Badge color="gray">Free Tier: 3 dashboards</Badge>
      </div>

      {!dashboards?.length ? (
        <EmptyState
          icon={LayoutDashboard}
          title="No dashboards yet"
          description="Create your first dashboard to start visualizing your data."
          actionLabel="Create Dashboard"
          onAction={() => navigate('/app/dashboards/new')}
        />
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {dashboards.map((d) => (
            <div
              key={d.id}
              onClick={() => navigate(`/app/dashboards/${d.id}`)}
              className="cursor-pointer rounded-xl border border-border dark:border-gray-800 bg-white dark:bg-surface-dark-secondary p-5 hover:border-primary/50 transition-colors"
            >
              <h3 className="font-semibold text-gray-900 dark:text-white">{d.name}</h3>
              {d.description && <p className="mt-1 text-sm text-gray-500 dark:text-gray-400 line-clamp-2">{d.description}</p>}
              <div className="mt-3 flex items-center gap-2 text-xs text-gray-400">
                <span>Updated {new Date(d.updated_at).toLocaleDateString()}</span>
                {d.is_shared && <Badge color="green">Shared</Badge>}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
