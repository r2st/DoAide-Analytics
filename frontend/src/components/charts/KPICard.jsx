import clsx from 'clsx'
import { TrendingDown, TrendingUp } from 'lucide-react'

export default function KPICard({ label, value, trend, trendValue, prefix, suffix }) {
  const isUp = trend === 'up'
  return (
    <div className="rounded-xl border border-border dark:border-gray-800 bg-white dark:bg-surface-dark-secondary p-5">
      <p className="text-sm text-gray-500 dark:text-gray-400">{label}</p>
      <p className="mt-1 text-2xl font-bold text-gray-900 dark:text-white">
        {prefix}{typeof value === 'number' ? value.toLocaleString() : value}{suffix}
      </p>
      {trendValue != null && (
        <div className={clsx('mt-2 flex items-center gap-1 text-sm', isUp ? 'text-green-600' : 'text-red-500')}>
          {isUp ? <TrendingUp size={16} /> : <TrendingDown size={16} />}
          <span>{trendValue}%</span>
        </div>
      )}
    </div>
  )
}
