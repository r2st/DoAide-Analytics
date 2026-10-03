import clsx from 'clsx'
import { Upload } from 'lucide-react'
import { useCallback, useState } from 'react'

export default function FileUpload({ onFileSelect, accept = '.csv' }) {
  const [dragging, setDragging] = useState(false)

  const handleDrop = useCallback(
    (e) => {
      e.preventDefault()
      setDragging(false)
      const file = e.dataTransfer.files[0]
      if (file) onFileSelect(file)
    },
    [onFileSelect]
  )

  const handleChange = (e) => {
    const file = e.target.files?.[0]
    if (file) onFileSelect(file)
  }

  return (
    <div
      className={clsx(
        'relative rounded-xl border-2 border-dashed p-8 text-center transition-colors cursor-pointer',
        dragging
          ? 'border-primary bg-primary/5'
          : 'border-border dark:border-gray-700 hover:border-primary/50'
      )}
      onDragOver={(e) => { e.preventDefault(); setDragging(true) }}
      onDragLeave={() => setDragging(false)}
      onDrop={handleDrop}
    >
      <input type="file" accept={accept} onChange={handleChange} className="absolute inset-0 opacity-0 cursor-pointer" />
      <Upload className="mx-auto text-gray-400" size={32} />
      <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
        Drag & drop your CSV file here, or click to browse
      </p>
      <p className="mt-1 text-xs text-gray-400">Supports CSV files up to 10MB</p>
    </div>
  )
}
