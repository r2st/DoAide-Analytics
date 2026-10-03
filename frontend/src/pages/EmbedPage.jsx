import { useState } from 'react'
import ToolsNav from '../components/ToolsNav'
import { usePageTitle } from '../hooks/usePageTitle'
import { copyToClipboard, embedSnippet } from '../lib/share'
import { track } from '../lib/track'

const TOOLS = [
  { key: 'calculator', label: 'ROI Calculator', desc: 'Let visitors calculate marketing ROI on your website' },
  { key: 'checker', label: 'Speed Checker', desc: 'Let visitors test website speed' },
]

export default function EmbedPage() {
  usePageTitle('Embed Analytics Tools on Your Website — Free Widget')
  const [tool, setTool] = useState('calculator')
  const [copied, setCopied] = useState(false)

  const snippet = embedSnippet(tool)

  const handleCopy = async () => {
    const ok = await copyToClipboard(snippet)
    if (ok) {
      track('embed_copy', { tool })
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    }
  }

  return (
    <div className="min-h-screen bg-white dark:bg-surface-dark">
      <ToolsNav />
      <main className="max-w-2xl mx-auto px-4 py-8 flex flex-col gap-8">
        <div>
          <h1 className="text-3xl font-extrabold text-gray-900 dark:text-white">Embed Analytics Tools on Your Website</h1>
          <p className="text-gray-500 dark:text-gray-400 mt-1">Add a free ROI calculator or speed checker to your website with one line of code.</p>
        </div>

        <div className="bg-white dark:bg-surface-dark-secondary border border-border dark:border-gray-800 rounded-xl p-6 flex flex-col gap-4">
          <div className="flex gap-3 flex-wrap" role="group" aria-label="Choose tool to embed">
            {TOOLS.map((t) => (
              <button key={t.key} className={`flex-1 min-w-[200px] text-left px-4 py-3 rounded-lg border transition-colors ${tool === t.key ? 'border-primary bg-primary/5' : 'border-border dark:border-gray-700'}`} onClick={() => setTool(t.key)}>
                <strong className="block text-sm text-gray-900 dark:text-white">{t.label}</strong>
                <span className="text-xs text-gray-500">{t.desc}</span>
              </button>
            ))}
          </div>

          <label className="flex flex-col gap-1 text-sm font-medium text-gray-900 dark:text-white">
            Copy this code to your website
            <pre className="bg-gray-50 dark:bg-surface-dark p-4 rounded-lg text-xs overflow-x-auto whitespace-pre-wrap break-all text-gray-900 dark:text-white">{snippet}</pre>
          </label>

          <button onClick={handleCopy} className="px-4 py-2.5 bg-primary text-white rounded-lg font-semibold hover:bg-primary-dark transition-colors">
            {copied ? 'Copied!' : 'Copy embed code'}
          </button>
        </div>
      </main>
    </div>
  )
}
