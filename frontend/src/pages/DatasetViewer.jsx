import { useQuery } from '@tanstack/react-query'
import { useParams } from 'react-router-dom'
import DataTable from '../components/charts/DataTable'
import Badge from '../components/ui/Badge'
import LoadingSpinner from '../components/ui/LoadingSpinner'
import api from '../services/api'

export default function DatasetViewer() {
  const { id } = useParams()
  const { data: dataset, isLoading } = useQuery({
    queryKey: ['dataset', id],
    queryFn: () => api.get(`/datasets/${id}`).then((r) => r.data),
  })

  if (isLoading) return <LoadingSpinner className="py-20" />
  if (!dataset) return <p className="text-gray-500 py-8">Dataset not found</p>

  return (
    <div>
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">{dataset.name}</h1>
        <div className="flex items-center gap-3 mt-2">
          <Badge color="gray">{dataset.row_count} rows</Badge>
          <Badge color="blue">{dataset.columns?.length || 0} columns</Badge>
        </div>
      </div>

      <div className="rounded-xl border border-border dark:border-gray-800 bg-white dark:bg-surface-dark-secondary overflow-hidden">
        <DataTable columns={dataset.columns || []} data={dataset.data || []} pageSize={25} />
      </div>
    </div>
  )
}
