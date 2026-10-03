const COLORS = ['#7c3aed', '#8b5cf6', '#a78bfa', '#c4b5fd', '#ddd6fe']

export default function FunnelChart({ data, nameKey, valueKey }) {
  if (!data?.length) return null
  const max = Math.max(...data.map((d) => d[valueKey]))

  return (
    <div className="space-y-2 py-4">
      {data.map((item, i) => {
        const pct = max > 0 ? (item[valueKey] / max) * 100 : 0
        return (
          <div key={i} className="flex items-center gap-3">
            <div className="w-24 text-right text-sm text-gray-600 dark:text-gray-400 truncate">
              {item[nameKey]}
            </div>
            <div className="flex-1">
              <div
                className="h-8 rounded-md flex items-center px-3 text-white text-sm font-medium"
                style={{ width: `${Math.max(pct, 10)}%`, backgroundColor: COLORS[i % COLORS.length] }}
              >
                {item[valueKey].toLocaleString()}
              </div>
            </div>
          </div>
        )
      })}
    </div>
  )
}
