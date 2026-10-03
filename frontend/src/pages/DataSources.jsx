import { useQuery } from '@tanstack/react-query'
import { Database, FileSpreadsheet, Globe, Pencil, Plus } from 'lucide-react'
import { useState } from 'react'
import FileUpload from '../components/data/FileUpload'
import Badge from '../components/ui/Badge'
import Button from '../components/ui/Button'
import EmptyState from '../components/ui/EmptyState'
import LoadingSpinner from '../components/ui/LoadingSpinner'
import Modal from '../components/ui/Modal'
import api from '../services/api'

const typeIcons = { csv: FileSpreadsheet, google_sheets: Globe, manual: Pencil }
const typeColors = { csv: 'green', google_sheets: 'blue', manual: 'yellow' }

export default function DataSources() {
  const [showUpload, setShowUpload] = useState(false)
  const { data: sources, isLoading } = useQuery({
    queryKey: ['data-sources'],
    queryFn: () => api.get('/data-sources/', { params: { business_id: '00000000-0000-0000-0000-000000000000' } }).then((r) => r.data),
  })

  if (isLoading) return <LoadingSpinner className="py-20" />

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Data Sources</h1>
          <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">Connect and manage your data</p>
        </div>
        <Button onClick={() => setShowUpload(true)}>
          <Plus size={18} className="mr-2" /> Add Source
        </Button>
      </div>

      {!sources?.length ? (
        <EmptyState
          icon={Database}
          title="No data sources"
          description="Upload a CSV file or connect a data source to get started."
          actionLabel="Add Data Source"
          onAction={() => setShowUpload(true)}
        />
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {sources.map((s) => {
            const Icon = typeIcons[s.source_type] || Database
            return (
              <div key={s.id} className="rounded-xl border border-border dark:border-gray-800 bg-white dark:bg-surface-dark-secondary p-5">
                <div className="flex items-center gap-3 mb-3">
                  <Icon className="text-primary" size={24} />
                  <h3 className="font-semibold text-gray-900 dark:text-white">{s.name}</h3>
                </div>
                <div className="flex items-center gap-2">
                  <Badge color={typeColors[s.source_type] || 'gray'}>{s.source_type}</Badge>
                  <Badge color={s.status === 'active' ? 'green' : 'red'}>{s.status}</Badge>
                </div>
                <p className="mt-3 text-xs text-gray-400">Added {new Date(s.created_at).toLocaleDateString()}</p>
              </div>
            )
          })}
        </div>
      )}

      <Modal isOpen={showUpload} onClose={() => setShowUpload(false)} title="Upload CSV">
        <FileUpload onFileSelect={(file) => { setShowUpload(false) }} />
      </Modal>
    </div>
  )
}
