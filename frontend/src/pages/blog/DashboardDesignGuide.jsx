import { Link } from 'react-router-dom'
import { usePageTitle } from '../../hooks/usePageTitle'

export default function DashboardDesignGuide() {
  usePageTitle('Dashboard Design Best Practices — Build Dashboards People Actually Use')
  return (
    <article className="leading-relaxed text-gray-900 dark:text-white">
      <Link to="/blog" className="text-sm text-primary no-underline">&larr; All articles</Link>
      <h1 className="text-2xl font-extrabold mt-4 mb-4">Dashboard Design Best Practices — Build Dashboards People Actually Use</h1>
      <p className="text-gray-500 dark:text-gray-400">Most dashboards fail because they show everything instead of what matters. Here&apos;s how to build ones people actually open every day.</p>

      <h2 className="text-lg font-bold mt-6">Start With the Decision</h2>
      <p className="text-gray-500 dark:text-gray-400">Before adding any chart, ask: &quot;What decision will this help someone make?&quot; If you can&apos;t answer, the chart doesn&apos;t belong. A dashboard for a marketing manager should answer &quot;Which campaigns should I increase budget on?&quot; — not just &quot;How much did we spend?&quot;</p>

      <h2 className="text-lg font-bold mt-6">The 5-Second Rule</h2>
      <p className="text-gray-500 dark:text-gray-400">A viewer should understand the key message within 5 seconds of opening the dashboard. Put the most important KPI in the top-left corner (that&apos;s where eyes land first), use large numbers with trend indicators, and save detail for drill-down views.</p>

      <h2 className="text-lg font-bold mt-6">Choosing the Right Chart</h2>
      <ul className="text-gray-500 dark:text-gray-400 pl-5 list-disc space-y-1">
        <li><strong>Trends over time:</strong> line chart (never a pie chart)</li>
        <li><strong>Comparing categories:</strong> horizontal bar chart</li>
        <li><strong>Part-to-whole:</strong> stacked bar or donut chart (use sparingly)</li>
        <li><strong>Single KPI:</strong> big number with sparkline</li>
        <li><strong>Geographic data:</strong> choropleth map</li>
        <li><strong>Correlation:</strong> scatter plot</li>
      </ul>

      <h2 className="text-lg font-bold mt-6">Layout Principles</h2>
      <ul className="text-gray-500 dark:text-gray-400 pl-5 list-disc space-y-1">
        <li>Group related metrics in visual sections</li>
        <li>Use consistent time ranges across all charts</li>
        <li>Limit to 6-8 components per view — more creates cognitive overload</li>
        <li>Add context with comparison periods (vs last month, vs target)</li>
        <li>Use color intentionally — red/green for good/bad, not decoration</li>
      </ul>

      <h2 className="text-lg font-bold mt-6">Common Mistakes</h2>
      <ul className="text-gray-500 dark:text-gray-400 pl-5 list-disc space-y-1">
        <li>Too many metrics — if everything is important, nothing is</li>
        <li>No context — numbers without comparison are meaningless</li>
        <li>3D charts — they distort data and look unprofessional</li>
        <li>Auto-refreshing when data only updates daily</li>
        <li>Ignoring mobile — many executives check dashboards on phones</li>
      </ul>

      <p className="text-gray-500 dark:text-gray-400 mt-4">Download our <Link to="/templates" className="text-primary">free dashboard templates</Link> as a starting point for your own analytics dashboards.</p>
    </article>
  )
}
