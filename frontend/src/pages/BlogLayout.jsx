import { Link, Outlet } from 'react-router-dom'

const ARTICLES = [
  {
    slug: 'marketing-roi-guide',
    title: 'Marketing ROI Explained — How to Measure Campaign Performance',
    description: 'Learn how to calculate marketing ROI, ROAS, and CPA. Includes formulas, benchmarks, and tips for optimizing ad spend.',
  },
  {
    slug: 'website-performance-metrics',
    title: 'Core Web Vitals — The Website Performance Metrics That Matter',
    description: 'Understand FCP, LCP, CLS, and TTFB. Learn how these metrics affect user experience and search rankings.',
  },
  {
    slug: 'dashboard-design-best-practices',
    title: 'Dashboard Design Best Practices — Build Dashboards People Actually Use',
    description: 'Principles for designing effective analytics dashboards. Layout, metrics selection, visualization types, and common mistakes.',
  },
]

export { ARTICLES }

export default function BlogLayout() {
  return (
    <div className="max-w-2xl mx-auto px-4 py-8">
      <header className="mb-8">
        <Link to="/" className="text-sm text-primary no-underline">&larr; Back to DoAide Analytics</Link>
        <h1 className="text-2xl font-extrabold text-gray-900 dark:text-white mt-2">DoAide Analytics Blog</h1>
        <p className="text-gray-500 dark:text-gray-400">Guides and resources for business analytics</p>
      </header>
      <Outlet />
    </div>
  )
}

export function BlogIndex() {
  return (
    <div className="flex flex-col gap-4">
      {ARTICLES.map((a) => (
        <Link key={a.slug} to={`/blog/${a.slug}`} className="block p-5 border border-border dark:border-gray-800 rounded-xl no-underline hover:border-primary transition-colors">
          <h2 className="text-lg font-bold text-gray-900 dark:text-white mb-1">{a.title}</h2>
          <p className="text-sm text-gray-500 dark:text-gray-400 leading-relaxed">{a.description}</p>
          <span className="text-sm text-primary font-semibold mt-2 inline-block">Read more &rarr;</span>
        </Link>
      ))}
    </div>
  )
}
