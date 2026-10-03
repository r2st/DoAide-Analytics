import { Link } from 'react-router-dom'
import ShareButtons from '../../components/ShareButtons'
import { usePageTitle } from '../../hooks/usePageTitle'

export default function SaasKpis() {
  usePageTitle('5 KPIs Every SaaS Business Should Track Automatically')
  return (
    <article className="leading-relaxed text-gray-900 dark:text-white">
      <Link to="/blog" className="text-sm text-primary no-underline">&larr; All articles</Link>
      <h1 className="text-2xl font-extrabold mt-4 mb-4">5 KPIs Every SaaS Business Should Track Automatically</h1>
      <p className="text-gray-500 dark:text-gray-400">SaaS metrics are uniquely important because they compound. A small improvement in churn or expansion revenue this month changes your trajectory for years. Here are the five KPIs that deserve automated dashboards — not monthly spreadsheets.</p>

      <h2 className="text-lg font-bold mt-6">1. Monthly Recurring Revenue (MRR)</h2>
      <p className="text-gray-500 dark:text-gray-400">MRR is the heartbeat of any subscription business. Track it broken down by new, expansion, contraction, and churned MRR to understand what is driving growth — not just whether you are growing.</p>
      <ul className="text-gray-500 dark:text-gray-400 pl-5 list-disc space-y-1">
        <li><strong>New MRR:</strong> revenue from first-time customers</li>
        <li><strong>Expansion MRR:</strong> upgrades and add-ons from existing customers</li>
        <li><strong>Churned MRR:</strong> revenue lost from cancellations</li>
        <li><strong>Net new MRR:</strong> new + expansion − churn. If this is positive, you are growing</li>
      </ul>

      <h2 className="text-lg font-bold mt-6">2. Churn Rate</h2>
      <p className="text-gray-500 dark:text-gray-400">Monthly churn above 3% means you are replacing a third of your customer base every year. Track both logo churn (number of customers) and revenue churn (dollars lost). Revenue churn can be negative if expansion outpaces cancellations — that is the goal.</p>

      <h2 className="text-lg font-bold mt-6">3. Customer Acquisition Cost (CAC)</h2>
      <p className="text-gray-500 dark:text-gray-400">CAC = total sales and marketing spend / new customers acquired. Track it by channel (organic, paid, referral) to see where your most efficient growth comes from. A blended CAC hides channel-level inefficiency.</p>

      <h2 className="text-lg font-bold mt-6">4. LTV:CAC Ratio</h2>
      <p className="text-gray-500 dark:text-gray-400">Lifetime Value (LTV) divided by CAC tells you how much value each acquired customer creates. Below 3:1 means you are spending too much to acquire. Above 5:1 means you are under-investing in growth. The sweet spot is 3-5x.</p>

      <h2 className="text-lg font-bold mt-6">5. Net Revenue Retention (NRR)</h2>
      <p className="text-gray-500 dark:text-gray-400">NRR measures how much revenue your existing customers generate over time, including expansion and churn. An NRR above 100% means your customer base grows even without new sales. Top SaaS companies target 120%+.</p>

      <h2 className="text-lg font-bold mt-6">Why Automate These?</h2>
      <ul className="text-gray-500 dark:text-gray-400 pl-5 list-disc space-y-1">
        <li>Manual calculation introduces errors and delays</li>
        <li>Real-time dashboards let you react to changes in days, not quarters</li>
        <li>Automated alerts catch negative trends before they become crises</li>
        <li>Board-ready reports generate themselves — no scramble before meetings</li>
      </ul>

      <p className="text-gray-500 dark:text-gray-400 mt-4">Use our <Link to="/tools/roi-calculator" className="text-primary">analytics ROI calculator</Link> to see how much automated KPI tracking could save your team.</p>

      <ShareButtons path="/blog/saas-kpis-to-track" text="5 KPIs Every SaaS Business Should Track Automatically" />
    </article>
  )
}
