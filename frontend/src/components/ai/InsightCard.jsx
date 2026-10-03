import Badge from '../ui/Badge'

const typeBadge = {
  trend: { color: 'blue', label: 'Trend' },
  anomaly: { color: 'red', label: 'Anomaly' },
  summary: { color: 'green', label: 'Summary' },
  query_response: { color: 'primary', label: 'Query' },
}

export default function InsightCard({ insight }) {
  const badge = typeBadge[insight.insight_type] || typeBadge.summary
  return (
    <div className="rounded-xl border border-border dark:border-gray-800 bg-white dark:bg-surface-dark-secondary p-5">
      <div className="flex items-center justify-between mb-3">
        <Badge color={badge.color}>{badge.label}</Badge>
        <span className="text-xs text-gray-400">{new Date(insight.created_at).toLocaleDateString()}</span>
      </div>
      <p className="text-sm text-gray-700 dark:text-gray-300 whitespace-pre-wrap">{insight.content}</p>
    </div>
  )
}
