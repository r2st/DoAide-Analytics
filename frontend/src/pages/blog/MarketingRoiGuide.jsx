import { Link } from 'react-router-dom'
import { usePageTitle } from '../../hooks/usePageTitle'

export default function MarketingRoiGuide() {
  usePageTitle('Marketing ROI Explained — How to Measure Campaign Performance')
  return (
    <article className="leading-relaxed text-gray-900 dark:text-white">
      <Link to="/blog" className="text-sm text-primary no-underline">&larr; All articles</Link>
      <h1 className="text-2xl font-extrabold mt-4 mb-4">Marketing ROI Explained — How to Measure Campaign Performance</h1>
      <p className="text-gray-500 dark:text-gray-400">Marketing without measurement is guessing. ROI (Return on Investment) tells you whether your campaigns are making money or burning it.</p>

      <h2 className="text-lg font-bold mt-6">The ROI Formula</h2>
      <p className="text-gray-500 dark:text-gray-400"><strong>ROI = ((Revenue − Marketing Spend) / Marketing Spend) × 100</strong></p>
      <p className="text-gray-500 dark:text-gray-400">An ROI of 200% means you earned $3 for every $1 spent. An ROI of 0% means you broke even.</p>

      <h2 className="text-lg font-bold mt-6">ROI vs. ROAS</h2>
      <p className="text-gray-500 dark:text-gray-400">ROAS (Return on Ad Spend) is the simpler cousin: <strong>ROAS = Revenue / Spend</strong>. A ROAS of 4x means $4 in revenue per $1 spent. While ROI accounts for profit, ROAS only measures revenue. Both matter — ROAS for campaign-level decisions, ROI for business-level strategy.</p>

      <h2 className="text-lg font-bold mt-6">Benchmarks by Channel</h2>
      <ul className="text-gray-500 dark:text-gray-400 pl-5 list-disc space-y-1">
        <li><strong>Email marketing:</strong> Average ROI of 36:1 (highest of any channel)</li>
        <li><strong>Google Ads:</strong> Average ROAS of 2-4x depending on industry</li>
        <li><strong>Facebook Ads:</strong> Average ROAS of 2-3x for e-commerce</li>
        <li><strong>Content marketing:</strong> 3x ROI over 12 months (compounds over time)</li>
      </ul>

      <h2 className="text-lg font-bold mt-6">Common Mistakes</h2>
      <ul className="text-gray-500 dark:text-gray-400 pl-5 list-disc space-y-1">
        <li>Measuring vanity metrics (likes, impressions) instead of revenue</li>
        <li>Not accounting for attribution (which touchpoint gets credit?)</li>
        <li>Ignoring the time dimension — some campaigns take months to show ROI</li>
        <li>Forgetting indirect costs like team time and tool subscriptions</li>
      </ul>

      <p className="text-gray-500 dark:text-gray-400 mt-4">Try our <Link to="/calculator" className="text-primary">free marketing ROI calculator</Link> to measure your campaign performance.</p>
    </article>
  )
}
