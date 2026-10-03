import {
  BarChart3,
  Brain,
  Calendar,
  Database,
  FileText,
  LayoutDashboard,
} from 'lucide-react'
import { Link } from 'react-router-dom'
import Button from '../components/ui/Button'

const features = [
  { icon: LayoutDashboard, title: 'Dashboard Builder', desc: 'Drag-and-drop widgets to build custom dashboards with charts, KPIs, and tables.' },
  { icon: Database, title: 'Data Connectors', desc: 'Import data from CSV files, Google Sheets, or enter manually.' },
  { icon: Brain, title: 'AI Insights', desc: 'Get trend detection, anomaly alerts, and natural language queries powered by AI.' },
  { icon: BarChart3, title: 'Rich Visualizations', desc: 'Line, bar, pie, funnel charts plus data tables and KPI cards.' },
  { icon: FileText, title: 'Report Generation', desc: 'Export dashboards as PDF or Excel reports with one click.' },
  { icon: Calendar, title: 'Scheduled Reports', desc: 'Automate report delivery to your team on a recurring schedule.' },
]

export default function Landing() {
  return (
    <div className="min-h-screen bg-white dark:bg-surface-dark">
      <nav className="flex items-center justify-between px-6 py-4 max-w-6xl mx-auto">
        <div className="flex items-center gap-2">
          <BarChart3 className="text-primary" size={28} />
          <span className="text-xl font-bold text-gray-900 dark:text-white">DoAide Analytics</span>
        </div>
        <div className="flex items-center gap-4">
          <Link to="/pricing" className="text-sm text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white">Pricing</Link>
          <Link to="/login"><Button variant="ghost" size="sm">Sign In</Button></Link>
          <Link to="/register"><Button size="sm">Get Started</Button></Link>
        </div>
      </nav>

      <section className="relative overflow-hidden py-24 px-6">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-accent/5 to-transparent" />
        <div className="relative max-w-4xl mx-auto text-center">
          <h1 className="text-5xl font-bold text-gray-900 dark:text-white leading-tight">
            AI-Powered Analytics<br />
            <span className="text-primary">for Growing Businesses</span>
          </h1>
          <p className="mt-6 text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            Build beautiful dashboards, uncover trends with AI, and share insights with your team. Built for SMBs who want enterprise-grade analytics without the complexity.
          </p>
          <div className="mt-8 flex items-center justify-center gap-4">
            <Link to="/register"><Button size="lg">Start Free</Button></Link>
            <Link to="/pricing"><Button variant="outline" size="lg">View Pricing</Button></Link>
          </div>
        </div>
      </section>

      <section className="py-20 px-6 max-w-6xl mx-auto">
        <h2 className="text-3xl font-bold text-center text-gray-900 dark:text-white mb-12">
          Everything you need to understand your business
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map(({ icon: Icon, title, desc }) => (
            <div key={title} className="rounded-xl border border-border dark:border-gray-800 p-6 hover:border-primary/50 transition-colors">
              <Icon className="text-primary mb-4" size={28} />
              <h3 className="font-semibold text-gray-900 dark:text-white">{title}</h3>
              <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">{desc}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="py-20 px-6 bg-gray-50 dark:bg-surface-dark-secondary">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold text-center text-gray-900 dark:text-white mb-12">Simple, transparent pricing</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            {[
              { name: 'Free', price: '$0', features: ['3 dashboards', 'Basic charts', 'CSV upload', '1 user'] },
              { name: 'Pro', price: '$29', features: ['Unlimited dashboards', 'AI insights', 'Scheduled reports', 'Team sharing', 'PDF/Excel export'], popular: true },
              { name: 'Enterprise', price: 'Custom', features: ['Everything in Pro', 'API access', 'SSO', 'Dedicated support', 'Custom integrations'] },
            ].map((plan) => (
              <div key={plan.name} className={`rounded-xl border p-6 ${plan.popular ? 'border-primary ring-2 ring-primary/20' : 'border-border dark:border-gray-800'} bg-white dark:bg-surface-dark`}>
                {plan.popular && <span className="text-xs font-medium text-primary">Most Popular</span>}
                <h3 className="text-xl font-bold text-gray-900 dark:text-white mt-2">{plan.name}</h3>
                <p className="mt-2"><span className="text-3xl font-bold text-gray-900 dark:text-white">{plan.price}</span>{plan.price !== 'Custom' && <span className="text-gray-500">/mo</span>}</p>
                <ul className="mt-6 space-y-3">
                  {plan.features.map((f) => (
                    <li key={f} className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
                      <span className="text-primary">&#10003;</span> {f}
                    </li>
                  ))}
                </ul>
                <Link to="/register" className="block mt-6">
                  <Button variant={plan.popular ? 'primary' : 'outline'} className="w-full">
                    {plan.price === 'Custom' ? 'Contact Us' : 'Get Started'}
                  </Button>
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      <footer className="py-8 px-6 text-center text-sm text-gray-500 dark:text-gray-400">
        &copy; {new Date().getFullYear()} DoAide Analytics. All rights reserved.
      </footer>
    </div>
  )
}
