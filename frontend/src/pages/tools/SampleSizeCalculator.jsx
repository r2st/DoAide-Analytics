import { useEffect, useState } from 'react'
import ShareButtons from '../../components/ShareButtons'
import ToolsNav from '../../components/ToolsNav'
import { usePageTitle } from '../../hooks/usePageTitle'
import { track } from '../../lib/track'
import JsonLdTool from '../../components/JsonLdTool'

function zScore(confidence) {
  const map = { 90: 1.645, 95: 1.96, 99: 2.576 }
  return map[confidence] || 1.96
}

function calculateSampleSize(baseline, mde, confidence) {
  const z = zScore(confidence)
  const p1 = baseline / 100
  const p2 = p1 + (p1 * mde) / 100
  const pBar = (p1 + p2) / 2
  const num = 2 * pBar * (1 - pBar) * (z + 0.84) ** 2
  const den = (p2 - p1) ** 2
  const perVariant = Math.ceil(num / den)
  return { perVariant, total: perVariant * 2, p1, p2 }
}

export default function SampleSizeCalculator() {
  usePageTitle('A/B Test Sample Size Calculator — Statistical Significance')
  const [baseline, setBaseline] = useState('5')
  const [mde, setMde] = useState('20')
  const [confidence, setConfidence] = useState('95')

  const b = parseFloat(baseline)
  const m = parseFloat(mde)
  const c = parseInt(confidence, 10)
  const valid = Number.isFinite(b) && b > 0 && b < 100 && Number.isFinite(m) && m > 0 && Number.isFinite(c)
  const result = valid ? calculateSampleSize(b, m, c) : null

  useEffect(() => {
    if (result) track('sample_size_calc', { baseline: b, mde: m, confidence: c })
  }, [result, b, m, c])

  const inputClass = 'px-3 py-2.5 border border-border dark:border-gray-700 rounded-lg bg-white dark:bg-surface-dark text-gray-900 dark:text-white focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none'

  return (
    <div className="min-h-screen bg-white dark:bg-surface-dark">
      <ToolsNav />
      <JsonLdTool name="A/B Test Sample Size Calculator" description="Calculate the minimum sample size needed for statistically significant A/B test results." url="https://insights.doaide.com/tools/sample-size-calculator" />
      <main className="max-w-2xl mx-auto px-4 py-8 flex flex-col gap-8">
        <div>
          <h1 className="text-3xl font-extrabold text-gray-900 dark:text-white">A/B Test Sample Size Calculator</h1>
          <p className="text-gray-500 dark:text-gray-400 mt-1">Calculate the minimum visitors needed to reach statistical significance in your A/B tests.</p>
        </div>

        <div className="bg-white dark:bg-surface-dark-secondary border border-border dark:border-gray-800 rounded-xl p-6 flex flex-col gap-4">
          <label className="flex flex-col gap-1 text-sm font-medium text-gray-900 dark:text-white">
            Baseline Conversion Rate (%)
            <input type="number" className={inputClass} value={baseline} onChange={(e) => setBaseline(e.target.value)} placeholder="e.g. 5" min="0.1" max="99" step="0.1" inputMode="decimal" autoFocus />
          </label>
          <label className="flex flex-col gap-1 text-sm font-medium text-gray-900 dark:text-white">
            Minimum Detectable Effect (% relative)
            <input type="number" className={inputClass} value={mde} onChange={(e) => setMde(e.target.value)} placeholder="e.g. 20" min="1" step="1" inputMode="numeric" />
          </label>
          <label className="flex flex-col gap-1 text-sm font-medium text-gray-900 dark:text-white">
            Confidence Level
            <select className={inputClass} value={confidence} onChange={(e) => setConfidence(e.target.value)}>
              <option value="90">90%</option>
              <option value="95">95%</option>
              <option value="99">99%</option>
            </select>
          </label>

          {result && (
            <div className="flex flex-col gap-2 pt-4 border-t border-border dark:border-gray-800" aria-live="polite">
              <div className="flex justify-between text-sm bg-primary/5 -mx-2 px-2 py-2 rounded-lg"><span className="text-gray-500">Per Variant</span><span className="font-bold text-lg text-primary">{result.perVariant.toLocaleString()}</span></div>
              <div className="flex justify-between text-sm text-gray-500"><span>Total (both variants)</span><span className="font-semibold text-gray-900 dark:text-white">{result.total.toLocaleString()}</span></div>
              <div className="flex justify-between text-sm text-gray-500"><span>Control Rate</span><span className="font-semibold text-gray-900 dark:text-white">{(result.p1 * 100).toFixed(1)}%</span></div>
              <div className="flex justify-between text-sm text-gray-500"><span>Target Rate</span><span className="font-semibold text-gray-900 dark:text-white">{(result.p2 * 100).toFixed(1)}%</span></div>
              <div className="flex justify-between text-sm text-gray-500"><span>Statistical Power</span><span className="font-semibold text-gray-900 dark:text-white">80%</span></div>
              <ShareButtons path="/tools/sample-size-calculator" text={`Need ${result.total.toLocaleString()} visitors for this A/B test — calculated free on DoAide Analytics`} />
            </div>
          )}
        </div>

        <section className="leading-relaxed">
          <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-2">Understanding Sample Size</h2>
          <p className="text-gray-500 dark:text-gray-400 mb-3">Running an A/B test without enough traffic leads to false conclusions. This calculator uses standard two-proportion z-test formulas to determine the minimum visitors needed per variant.</p>
          <h3 className="text-base font-semibold text-gray-900 dark:text-white mt-4">Key Concepts</h3>
          <ul className="text-gray-500 dark:text-gray-400 pl-5 list-disc space-y-1">
            <li><strong>Baseline rate</strong> — your current conversion rate (control)</li>
            <li><strong>MDE</strong> — the smallest improvement worth detecting (relative change)</li>
            <li><strong>Confidence level</strong> — probability of avoiding a false positive (typically 95%)</li>
            <li><strong>Power</strong> — probability of detecting a real effect (fixed at 80%)</li>
          </ul>
        </section>
      </main>
    </div>
  )
}
