import { useEffect, useState } from 'react'
import ShareButtons from '../components/ShareButtons'
import ToolsNav from '../components/ToolsNav'
import { usePageTitle } from '../hooks/usePageTitle'
import { track } from '../lib/track'

function calculate(spend, revenue) {
  const roi = ((revenue - spend) / spend) * 100
  const roas = revenue / spend
  const profit = revenue - spend
  const cpa = spend > 0 && revenue > 0 ? spend / (revenue / 100) : 0
  return { roi, roas, profit, cpa }
}

export default function CalculatorPage() {
  usePageTitle('Marketing ROI Calculator — Measure Campaign Performance')
  const [spend, setSpend] = useState('')
  const [revenue, setRevenue] = useState('')

  const s = parseFloat(spend)
  const r = parseFloat(revenue)
  const valid = Number.isFinite(s) && s > 0 && Number.isFinite(r) && r >= 0
  const result = valid ? calculate(s, r) : null

  useEffect(() => {
    if (result) track('roi_calc', { spend: s, revenue: r })
  }, [result, s, r])

  return (
    <div className="min-h-screen bg-white dark:bg-surface-dark">
      <ToolsNav />
      <main className="max-w-2xl mx-auto px-4 py-8 flex flex-col gap-8">
        <div>
          <h1 className="text-3xl font-extrabold text-gray-900 dark:text-white">Marketing ROI Calculator</h1>
          <p className="text-gray-500 dark:text-gray-400 mt-1">Enter your marketing spend and revenue generated to calculate ROI, ROAS, and profit.</p>
        </div>

        <div className="bg-white dark:bg-surface-dark-secondary border border-border dark:border-gray-800 rounded-xl p-6 flex flex-col gap-4">
          <label className="flex flex-col gap-1 text-sm font-medium text-gray-900 dark:text-white">
            Marketing Spend ($)
            <input type="number" className="px-3 py-2.5 border border-border dark:border-gray-700 rounded-lg bg-white dark:bg-surface-dark text-gray-900 dark:text-white focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none" value={spend} onChange={(e) => setSpend(e.target.value)} placeholder="Total campaign spend" min="0" inputMode="numeric" autoFocus />
          </label>
          <label className="flex flex-col gap-1 text-sm font-medium text-gray-900 dark:text-white">
            Revenue Generated ($)
            <input type="number" className="px-3 py-2.5 border border-border dark:border-gray-700 rounded-lg bg-white dark:bg-surface-dark text-gray-900 dark:text-white focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none" value={revenue} onChange={(e) => setRevenue(e.target.value)} placeholder="Revenue attributed to campaign" min="0" inputMode="numeric" />
          </label>

          {result && (
            <div className="flex flex-col gap-2 pt-4 border-t border-border dark:border-gray-800" aria-live="polite">
              <div className="flex justify-between text-sm text-gray-500"><span>Marketing Spend</span><span className="font-semibold text-gray-900 dark:text-white">${s.toLocaleString()}</span></div>
              <div className="flex justify-between text-sm text-gray-500"><span>Revenue</span><span className="font-semibold text-gray-900 dark:text-white">${r.toLocaleString()}</span></div>
              <div className="flex justify-between text-sm text-gray-500"><span>Profit</span><span className={`font-semibold ${result.profit >= 0 ? 'text-green-500' : 'text-red-500'}`}>${result.profit.toLocaleString()}</span></div>
              <div className="flex justify-between text-sm bg-primary/5 -mx-2 px-2 py-2 rounded-lg"><span className="text-gray-500">ROI</span><span className="font-bold text-lg text-primary">{result.roi.toFixed(1)}%</span></div>
              <div className="flex justify-between text-sm text-gray-500"><span>ROAS</span><span className="font-semibold text-gray-900 dark:text-white">{result.roas.toFixed(2)}x</span></div>
              <ShareButtons path="/calculator" text={`Marketing ROI: ${result.roi.toFixed(1)}% — calculated free on DoAide Analytics`} />
            </div>
          )}
        </div>

        <section className="leading-relaxed">
          <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-2">Understanding Marketing ROI</h2>
          <p className="text-gray-500 dark:text-gray-400 mb-3">ROI (Return on Investment) measures the profitability of your marketing campaigns relative to what you spent.</p>
          <h3 className="text-base font-semibold text-gray-900 dark:text-white mt-4">Formulas</h3>
          <ul className="text-gray-500 dark:text-gray-400 pl-5 list-disc space-y-1">
            <li><strong>ROI</strong> = ((Revenue − Spend) / Spend) × 100</li>
            <li><strong>ROAS</strong> = Revenue / Spend</li>
            <li>An ROI of 100% means you doubled your investment</li>
            <li>ROAS of 4x is often considered a good benchmark</li>
          </ul>
        </section>
      </main>
    </div>
  )
}
