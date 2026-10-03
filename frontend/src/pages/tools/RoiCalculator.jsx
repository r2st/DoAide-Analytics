import { useEffect, useState } from 'react'
import ShareButtons from '../../components/ShareButtons'
import ToolsNav from '../../components/ToolsNav'
import { usePageTitle } from '../../hooks/usePageTitle'
import { track } from '../../lib/track'
import JsonLdTool from '../../components/JsonLdTool'

function calculate(currentCost, timeSaved, hourlyRate, months) {
  const monthlySavings = timeSaved * hourlyRate * 4.33
  const totalSavings = monthlySavings * months
  const totalCost = currentCost * months
  const netGain = totalSavings - totalCost
  const roi = totalCost > 0 ? ((totalSavings - totalCost) / totalCost) * 100 : 0
  const paybackMonths = monthlySavings > 0 ? currentCost / monthlySavings : 0
  return { monthlySavings, totalSavings, totalCost, netGain, roi, paybackMonths }
}

export default function RoiCalculator() {
  usePageTitle('Analytics ROI Calculator — Measure Your Analytics Investment')
  const [cost, setCost] = useState('')
  const [hours, setHours] = useState('')
  const [rate, setRate] = useState('')
  const [months, setMonths] = useState('12')

  const c = parseFloat(cost)
  const h = parseFloat(hours)
  const r = parseFloat(rate)
  const m = parseInt(months, 10)
  const valid = Number.isFinite(c) && c > 0 && Number.isFinite(h) && h > 0 && Number.isFinite(r) && r > 0 && Number.isFinite(m) && m > 0
  const result = valid ? calculate(c, h, r, m) : null

  useEffect(() => {
    if (result) track('tools_roi_calc', { cost: c, hours: h, rate: r, months: m })
  }, [result, c, h, r, m])

  const inputClass = 'px-3 py-2.5 border border-border dark:border-gray-700 rounded-lg bg-white dark:bg-surface-dark text-gray-900 dark:text-white focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none'

  return (
    <div className="min-h-screen bg-white dark:bg-surface-dark">
      <ToolsNav />
      <JsonLdTool name="Analytics ROI Calculator" description="Calculate the return on investment from your analytics tools and data-driven decisions." url="https://insights.doaide.com/tools/roi-calculator" />
      <main className="max-w-2xl mx-auto px-4 py-8 flex flex-col gap-8">
        <div>
          <h1 className="text-3xl font-extrabold text-gray-900 dark:text-white">Analytics ROI Calculator</h1>
          <p className="text-gray-500 dark:text-gray-400 mt-1">Calculate how much time and money your analytics investment saves.</p>
        </div>

        <div className="bg-white dark:bg-surface-dark-secondary border border-border dark:border-gray-800 rounded-xl p-6 flex flex-col gap-4">
          <label className="flex flex-col gap-1 text-sm font-medium text-gray-900 dark:text-white">
            Monthly Analytics Tool Cost ($)
            <input type="number" className={inputClass} value={cost} onChange={(e) => setCost(e.target.value)} placeholder="e.g. 99" min="0" inputMode="numeric" autoFocus />
          </label>
          <label className="flex flex-col gap-1 text-sm font-medium text-gray-900 dark:text-white">
            Hours Saved Per Week
            <input type="number" className={inputClass} value={hours} onChange={(e) => setHours(e.target.value)} placeholder="e.g. 10" min="0" inputMode="numeric" />
          </label>
          <label className="flex flex-col gap-1 text-sm font-medium text-gray-900 dark:text-white">
            Hourly Rate of Team ($)
            <input type="number" className={inputClass} value={rate} onChange={(e) => setRate(e.target.value)} placeholder="e.g. 50" min="0" inputMode="numeric" />
          </label>
          <label className="flex flex-col gap-1 text-sm font-medium text-gray-900 dark:text-white">
            Time Period (months)
            <select className={inputClass} value={months} onChange={(e) => setMonths(e.target.value)}>
              <option value="3">3 months</option>
              <option value="6">6 months</option>
              <option value="12">12 months</option>
              <option value="24">24 months</option>
            </select>
          </label>

          {result && (
            <div className="flex flex-col gap-2 pt-4 border-t border-border dark:border-gray-800" aria-live="polite">
              <div className="flex justify-between text-sm text-gray-500"><span>Monthly Savings</span><span className="font-semibold text-gray-900 dark:text-white">${result.monthlySavings.toLocaleString(undefined, { maximumFractionDigits: 0 })}</span></div>
              <div className="flex justify-between text-sm text-gray-500"><span>Total Savings ({m} months)</span><span className="font-semibold text-gray-900 dark:text-white">${result.totalSavings.toLocaleString(undefined, { maximumFractionDigits: 0 })}</span></div>
              <div className="flex justify-between text-sm text-gray-500"><span>Total Cost ({m} months)</span><span className="font-semibold text-gray-900 dark:text-white">${result.totalCost.toLocaleString(undefined, { maximumFractionDigits: 0 })}</span></div>
              <div className="flex justify-between text-sm text-gray-500"><span>Net Gain</span><span className={`font-semibold ${result.netGain >= 0 ? 'text-green-500' : 'text-red-500'}`}>${result.netGain.toLocaleString(undefined, { maximumFractionDigits: 0 })}</span></div>
              <div className="flex justify-between text-sm bg-primary/5 -mx-2 px-2 py-2 rounded-lg"><span className="text-gray-500">ROI</span><span className="font-bold text-lg text-primary">{result.roi.toFixed(1)}%</span></div>
              <div className="flex justify-between text-sm text-gray-500"><span>Payback Period</span><span className="font-semibold text-gray-900 dark:text-white">{result.paybackMonths.toFixed(1)} months</span></div>
              <ShareButtons path="/tools/roi-calculator" text={`Analytics ROI: ${result.roi.toFixed(0)}% — calculated free on DoAide Analytics`} />
            </div>
          )}
        </div>

        <section className="leading-relaxed">
          <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-2">Why Calculate Analytics ROI?</h2>
          <p className="text-gray-500 dark:text-gray-400 mb-3">Every dollar spent on analytics should return measurable value. This calculator estimates the time savings from automated reporting and data-driven decisions versus manual processes.</p>
          <h3 className="text-base font-semibold text-gray-900 dark:text-white mt-4">How It Works</h3>
          <ul className="text-gray-500 dark:text-gray-400 pl-5 list-disc space-y-1">
            <li><strong>Monthly savings</strong> = hours saved per week × hourly rate × 4.33 weeks</li>
            <li><strong>ROI</strong> = ((Total Savings − Total Cost) / Total Cost) × 100</li>
            <li><strong>Payback period</strong> = Monthly cost / Monthly savings</li>
            <li>Most analytics tools pay for themselves within 2-3 months</li>
          </ul>
        </section>
      </main>
    </div>
  )
}
