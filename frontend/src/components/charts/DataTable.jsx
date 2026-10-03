import { ArrowDown, ArrowUp, ChevronLeft, ChevronRight } from 'lucide-react'
import { useState } from 'react'

export default function DataTable({ columns, data, pageSize = 10 }) {
  const [page, setPage] = useState(0)
  const [sortCol, setSortCol] = useState(null)
  const [sortDir, setSortDir] = useState('asc')

  const sorted = sortCol
    ? [...data].sort((a, b) => {
        const av = a[sortCol], bv = b[sortCol]
        const cmp = av < bv ? -1 : av > bv ? 1 : 0
        return sortDir === 'asc' ? cmp : -cmp
      })
    : data

  const totalPages = Math.ceil(sorted.length / pageSize)
  const pageData = sorted.slice(page * pageSize, (page + 1) * pageSize)

  const toggleSort = (col) => {
    if (sortCol === col) setSortDir((d) => (d === 'asc' ? 'desc' : 'asc'))
    else { setSortCol(col); setSortDir('asc') }
  }

  return (
    <div>
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-border dark:border-gray-800">
              {columns.map((col) => (
                <th
                  key={col}
                  onClick={() => toggleSort(col)}
                  className="px-4 py-3 text-left font-medium text-gray-500 dark:text-gray-400 cursor-pointer hover:text-gray-700 dark:hover:text-gray-200 select-none"
                >
                  <span className="inline-flex items-center gap-1">
                    {col}
                    {sortCol === col && (sortDir === 'asc' ? <ArrowUp size={14} /> : <ArrowDown size={14} />)}
                  </span>
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {pageData.map((row, i) => (
              <tr key={i} className="border-b border-border/50 dark:border-gray-800/50 hover:bg-gray-50 dark:hover:bg-gray-800/30">
                {columns.map((col) => (
                  <td key={col} className="px-4 py-3 text-gray-700 dark:text-gray-300">
                    {row[col]?.toString() ?? ''}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {totalPages > 1 && (
        <div className="flex items-center justify-between px-4 py-3 text-sm text-gray-500 dark:text-gray-400">
          <span>{sorted.length} rows</span>
          <div className="flex items-center gap-2">
            <button onClick={() => setPage((p) => Math.max(0, p - 1))} disabled={page === 0} className="p-1 disabled:opacity-30">
              <ChevronLeft size={18} />
            </button>
            <span>{page + 1} / {totalPages}</span>
            <button onClick={() => setPage((p) => Math.min(totalPages - 1, p + 1))} disabled={page >= totalPages - 1} className="p-1 disabled:opacity-30">
              <ChevronRight size={18} />
            </button>
          </div>
        </div>
      )}
    </div>
  )
}
