import { useState } from 'react'
import ShareButtons from '../components/ShareButtons'
import ToolsNav from '../components/ToolsNav'
import { usePageTitle } from '../hooks/usePageTitle'
import { copyToClipboard } from '../lib/share'
import { track } from '../lib/track'

const TEMPLATES = [
  {
    key: 'saas',
    name: 'SaaS Metrics Dashboard',
    desc: 'Track MRR, churn, LTV, CAC, and other key SaaS metrics in one view.',
    columns: ['Month', 'MRR', 'New MRR', 'Churned MRR', 'Net MRR Growth', 'Customers', 'Churn Rate %', 'LTV', 'CAC', 'LTV:CAC'],
  },
  {
    key: 'ecommerce',
    name: 'E-commerce Dashboard',
    desc: 'Revenue, orders, AOV, conversion rate, and top products for online stores.',
    columns: ['Date', 'Revenue', 'Orders', 'AOV', 'Visitors', 'Conversion Rate', 'Cart Abandonment', 'Top Product', 'Refund Rate'],
  },
  {
    key: 'marketing',
    name: 'Marketing Dashboard',
    desc: 'Campaign performance with spend, impressions, clicks, conversions, and ROI.',
    columns: ['Campaign', 'Channel', 'Spend', 'Impressions', 'Clicks', 'CTR %', 'Conversions', 'CPA', 'Revenue', 'ROI %'],
  },
  {
    key: 'sales',
    name: 'Sales Pipeline Dashboard',
    desc: 'Pipeline stages, deal values, win rates, and sales rep performance.',
    columns: ['Deal Name', 'Stage', 'Value', 'Probability', 'Expected Close', 'Owner', 'Days in Stage', 'Source', 'Win/Loss'],
  },
  {
    key: 'support',
    name: 'Support Metrics Dashboard',
    desc: 'Ticket volume, response time, resolution time, CSAT, and agent performance.',
    columns: ['Date', 'New Tickets', 'Resolved', 'Backlog', 'Avg Response Time', 'Avg Resolution Time', 'CSAT Score', 'NPS', 'Top Category'],
  },
  {
    key: 'executive',
    name: 'Executive Summary Dashboard',
    desc: 'High-level KPIs for C-suite: revenue, growth, margins, runway, and headcount.',
    columns: ['Quarter', 'Revenue', 'Growth %', 'Gross Margin', 'Net Income', 'Burn Rate', 'Runway (months)', 'Headcount', 'Revenue/Employee'],
  },
]

export default function TemplatesPage() {
  usePageTitle('Free Dashboard Templates — Analytics Spreadsheet Formats')
  const [copiedKey, setCopiedKey] = useState(null)

  const handleCopy = async (template) => {
    const csv = template.columns.join(',')
    const ok = await copyToClipboard(csv)
    if (ok) {
      track('template_copy', { template: template.key })
      setCopiedKey(template.key)
      setTimeout(() => setCopiedKey(null), 2000)
    }
  }

  return (
    <div className="min-h-screen bg-white dark:bg-surface-dark">
      <ToolsNav />
      <main className="max-w-3xl mx-auto px-4 py-8 flex flex-col gap-8">
        <div>
          <h1 className="text-3xl font-extrabold text-gray-900 dark:text-white">Dashboard Templates</h1>
          <p className="text-gray-500 dark:text-gray-400 mt-1">Free analytics dashboard templates. Copy the column headers and paste into your spreadsheet or BI tool.</p>
        </div>

        <div className="grid gap-4 sm:grid-cols-2">
          {TEMPLATES.map((t) => (
            <div key={t.key} className="bg-white dark:bg-surface-dark-secondary border border-border dark:border-gray-800 rounded-xl p-5 flex flex-col gap-2">
              <h3 className="text-base font-bold text-gray-900 dark:text-white">{t.name}</h3>
              <p className="text-sm text-gray-500 dark:text-gray-400 leading-relaxed">{t.desc}</p>
              <div className="flex flex-wrap gap-1 mt-1">
                {t.columns.slice(0, 5).map((col) => (
                  <span key={col} className="text-xs bg-gray-100 dark:bg-surface-dark px-2 py-0.5 rounded text-gray-500">{col}</span>
                ))}
                {t.columns.length > 5 && (
                  <span className="text-xs bg-gray-100 dark:bg-surface-dark px-2 py-0.5 rounded text-gray-400 italic">+{t.columns.length - 5} more</span>
                )}
              </div>
              <button onClick={() => handleCopy(t)} className="mt-auto px-4 py-2 bg-primary text-white rounded-lg font-semibold text-sm hover:bg-primary-dark transition-colors">
                {copiedKey === t.key ? 'Copied!' : 'Copy Columns'}
              </button>
            </div>
          ))}
        </div>

        <ShareButtons path="/templates" text="Free dashboard templates for SaaS, e-commerce, marketing, and more — DoAide Analytics" />

        <section className="leading-relaxed">
          <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-2">Which Dashboard Template Should You Use?</h2>
          <ul className="text-gray-500 dark:text-gray-400 pl-5 list-disc space-y-1">
            <li><strong>SaaS Metrics</strong> — For subscription businesses tracking MRR, churn, and unit economics.</li>
            <li><strong>E-commerce</strong> — For online stores monitoring revenue, orders, and conversion funnels.</li>
            <li><strong>Marketing</strong> — For teams measuring campaign ROI across channels.</li>
            <li><strong>Sales Pipeline</strong> — For sales teams tracking deals through pipeline stages.</li>
            <li><strong>Support</strong> — For customer support teams monitoring ticket volume and CSAT.</li>
            <li><strong>Executive Summary</strong> — For leadership wanting a high-level view of business health.</li>
          </ul>
        </section>
      </main>
    </div>
  )
}
