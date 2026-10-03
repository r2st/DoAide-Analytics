import { useQuery } from '@tanstack/react-query'
import { Brain } from 'lucide-react'
import { useState } from 'react'
import InsightCard from '../components/ai/InsightCard'
import QueryInput from '../components/ai/QueryInput'
import Badge from '../components/ui/Badge'
import EmptyState from '../components/ui/EmptyState'
import LoadingSpinner from '../components/ui/LoadingSpinner'
import api from '../services/api'

const filters = ['all', 'trend', 'anomaly', 'summary', 'query_response']

export default function AIInsights() {
  const [activeFilter, setActiveFilter] = useState('all')
  const [querying, setQuerying] = useState(false)

  const { data: insights, isLoading, refetch } = useQuery({
    queryKey: ['insights'],
    queryFn: () => api.get('/ai/insights', { params: { business_id: '00000000-0000-0000-0000-000000000000' } }).then((r) => r.data),
  })

  const handleQuery = async (query) => {
    setQuerying(true)
    try {
      await api.post('/ai/query', {
        query,
        dataset_id: '00000000-0000-0000-0000-000000000000',
        business_id: '00000000-0000-0000-0000-000000000000',
      })
      refetch()
    } finally {
      setQuerying(false)
    }
  }

  const filtered = activeFilter === 'all' ? insights : insights?.filter((i) => i.insight_type === activeFilter)

  return (
    <div>
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">AI Insights</h1>
        <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">Ask questions and discover patterns in your data</p>
      </div>

      <div className="mb-6">
        <QueryInput onSubmit={handleQuery} isLoading={querying} />
      </div>

      <div className="flex items-center gap-2 mb-6">
        {filters.map((f) => (
          <button
            key={f}
            onClick={() => setActiveFilter(f)}
            className={`rounded-full px-3 py-1 text-sm transition-colors ${
              activeFilter === f
                ? 'bg-primary text-white'
                : 'bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-gray-700'
            }`}
          >
            {f === 'query_response' ? 'Queries' : f.charAt(0).toUpperCase() + f.slice(1)}
          </button>
        ))}
      </div>

      {isLoading ? (
        <LoadingSpinner className="py-20" />
      ) : !filtered?.length ? (
        <EmptyState icon={Brain} title="No insights yet" description="Use the query input above or analyze a dataset to generate AI insights." />
      ) : (
        <div className="space-y-4">
          {filtered.map((insight) => (
            <InsightCard key={insight.id} insight={insight} />
          ))}
        </div>
      )}
    </div>
  )
}
