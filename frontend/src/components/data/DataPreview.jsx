import DataTable from '../charts/DataTable'

export default function DataPreview({ columns, data }) {
  if (!data?.length) return <p className="text-sm text-gray-500 py-4">No data to preview</p>
  return (
    <div className="rounded-xl border border-border dark:border-gray-800 overflow-hidden">
      <DataTable columns={columns} data={data} pageSize={10} />
    </div>
  )
}
