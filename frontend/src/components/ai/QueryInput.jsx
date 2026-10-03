import { Send } from 'lucide-react'
import { useState } from 'react'

export default function QueryInput({ onSubmit, isLoading }) {
  const [query, setQuery] = useState('')

  const handleSubmit = (e) => {
    e.preventDefault()
    if (query.trim() && !isLoading) {
      onSubmit(query.trim())
      setQuery('')
    }
  }

  return (
    <form onSubmit={handleSubmit} className="flex gap-2">
      <input
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Ask a question about your data..."
        className="flex-1 rounded-lg border border-border dark:border-gray-700 bg-white dark:bg-surface-dark px-4 py-2.5 text-sm text-gray-900 dark:text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-primary/50"
        disabled={isLoading}
      />
      <button
        type="submit"
        disabled={!query.trim() || isLoading}
        className="rounded-lg bg-primary px-4 py-2.5 text-white hover:bg-primary-dark disabled:opacity-50 transition-colors"
      >
        <Send size={18} />
      </button>
    </form>
  )
}
