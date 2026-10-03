import { useState } from 'react'
import {
  BarChart3,
  Brain,
  Calendar,
  Check,
  Database,
  FileText,
  LayoutDashboard,
} from 'lucide-react'
import { Link } from 'react-router-dom'
import Button from '../components/ui/Button'

const DOAIDE_PRODUCTS = [
  { name: "Proposals", url: "https://proposals.doaide.com" },
  { name: "Scheduler", url: "https://scheduler.doaide.com" },
  { name: "Payroll", url: "https://payroll.doaide.com" },
  { name: "Inventory", url: "https://inventory.doaide.com" },
  { name: "Support", url: "https://support.doaide.com" },
  { name: "Analytics", url: "https://analytics-app.doaide.com" },
  { name: "GST", url: "https://gst.doaide.com" },
  { name: "Desk", url: "https://desk.doaide.com" },
  { name: "Jobs", url: "https://job.doaide.com" },
  { name: "409A", url: "https://409a.doaide.com" },
  { name: "Pulse", url: "https://pulse.doaide.com" },
  { name: "Med", url: "https://med.doaide.com" },
  { name: "Realty", url: "https://realty.doaide.com" },
  { name: "Reach", url: "https://reach.doaide.com" },
  { name: "Trade", url: "https://trade.doaide.com" },
]

function RobotFace({ size = 32, color = "#F0B429" }) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32" width={size} height={size} aria-hidden="true">
      <line x1="16" y1="6" x2="16" y2="2" stroke={color} strokeWidth="1.5" strokeLinecap="round" />
      <circle cx="16" cy="1.5" r="1.5" fill={color} />
      <rect x="5" y="6" width="22" height="17" rx="5" fill={color} />
      <ellipse cx="11" cy="13" rx="2.5" ry="3" fill="#0A0A0B" />
      <ellipse cx="21" cy="13" rx="2.5" ry="3" fill="#0A0A0B" />
      <circle cx="11.5" cy="12.5" r="1" fill={color} opacity="0.6" />
      <circle cx="21.5" cy="12.5" r="1" fill={color} opacity="0.6" />
      <path d="M12 19Q16 22 20 19" stroke="#0A0A0B" strokeWidth="1.2" fill="none" strokeLinecap="round" />
      <rect x="1" y="10" width="4" height="5" rx="2" fill={color} opacity="0.8" />
      <rect x="27" y="10" width="4" height="5" rx="2" fill={color} opacity="0.8" />
    </svg>
  )
}

const features = [
  { icon: LayoutDashboard, title: 'Dashboard Builder', desc: 'Drag-and-drop widgets to build custom dashboards with charts, KPIs, and tables.' },
  { icon: Database, title: 'Data Connectors', desc: 'Import data from CSV files, Google Sheets, or enter manually.' },
  { icon: Brain, title: 'AI Insights', desc: 'Get trend detection, anomaly alerts, and natural language queries powered by AI.' },
  { icon: BarChart3, title: 'Rich Visualizations', desc: 'Line, bar, pie, funnel charts plus data tables and KPI cards.' },
  { icon: FileText, title: 'Report Generation', desc: 'Export dashboards as PDF or Excel reports with one click.' },
  { icon: Calendar, title: 'Scheduled Reports', desc: 'Automate report delivery to your team on a recurring schedule.' },
]

const HOW_IT_WORKS = [
  { step: '1', title: 'Connect your data', desc: 'Upload CSVs, link Google Sheets, or enter data manually. Your data stays in one place.' },
  { step: '2', title: 'Build dashboards', desc: 'Drag and drop charts, KPIs, and tables to create dashboards that tell your story.' },
  { step: '3', title: 'Get AI insights', desc: 'AI surfaces trends, anomalies, and recommendations. Ask questions in plain English.' },
]

const plans = [
  { name: 'Free', price: '$0', period: '/month', desc: 'For individuals exploring their data', features: ['3 dashboards', 'Basic charts', 'CSV upload', '1 user'], cta: 'Get Started' },
  { name: 'Pro', price: '$29', period: '/month', desc: 'For teams that need deeper insights', features: ['Unlimited dashboards', 'AI insights', 'Scheduled reports', 'Team sharing', 'PDF/Excel export', 'Google Sheets connector'], cta: 'Start Free Trial', featured: true },
  { name: 'Enterprise', price: 'Custom', period: '', desc: 'For organizations at scale', features: ['Everything in Pro', 'API access', 'SSO/SAML', 'Dedicated support', 'Custom integrations', 'SLA guarantee'], cta: 'Contact Sales' },
]

const TESTIMONIALS = [
  { name: 'Rebecca T.', role: 'Marketing Director', quote: 'We replaced three BI tools with DoAide Analytics. The AI insights alone pay for themselves — it surfaced a conversion drop we would have missed.' },
  { name: 'Pradeep K.', role: 'Product Manager', quote: 'Non-technical team members build their own dashboards now. No more waiting on the data team for every report.' },
  { name: 'Sarah L.', role: 'CFO', quote: 'Scheduled reports land in my inbox every Monday morning. I start the week knowing exactly where we stand financially.' },
]

const FAQ_ITEMS = [
  { q: 'What data sources can I connect?', a: 'You can upload CSV files, connect Google Sheets, or enter data manually. Pro plans include additional connectors and API access for custom integrations.' },
  { q: 'How does the AI insights feature work?', a: 'AI analyzes your data to detect trends, anomalies, and patterns. You can also ask questions in plain English like "What was our top product last quarter?" and get instant answers.' },
  { q: 'Can I share dashboards with my team?', a: 'Yes. Pro plans include team sharing with role-based access. Share read-only views or give collaborators edit access to specific dashboards.' },
  { q: 'What export formats are supported?', a: 'Export dashboards and reports as PDF or Excel files. Scheduled reports can be delivered via email on a daily, weekly, or monthly basis.' },
  { q: 'Is there a free plan?', a: 'Yes. The Free plan includes 3 dashboards, basic charts, and CSV upload for 1 user. No credit card required to get started.' },
  { q: 'Can I use it for financial reporting?', a: 'Absolutely. Many teams use DoAide Analytics for revenue dashboards, expense tracking, and financial KPIs. Export-ready reports make board presentations easy.' },
]

function FaqSection() {
  const [openIndex, setOpenIndex] = useState(null)
  return (
    <section className="py-20 px-4 sm:px-6" aria-labelledby="faq-heading">
      <div className="max-w-3xl mx-auto">
        <h2 id="faq-heading" className="text-3xl font-bold text-center text-gray-900 dark:text-white mb-12">
          Frequently Asked Questions
        </h2>
        <dl className="space-y-4">
          {FAQ_ITEMS.map((item, i) => (
            <div key={i} className="border border-border dark:border-gray-800 rounded-xl overflow-hidden">
              <dt>
                <button
                  className="w-full flex items-center justify-between p-5 text-left font-medium text-gray-900 dark:text-white hover:bg-gray-50 dark:hover:bg-surface-dark-secondary transition-colors"
                  aria-expanded={openIndex === i}
                  onClick={() => setOpenIndex(openIndex === i ? null : i)}
                >
                  {item.q}
                  <span className="ml-4 text-primary text-xl flex-shrink-0">{openIndex === i ? '−' : '+'}</span>
                </button>
              </dt>
              {openIndex === i && (
                <dd className="px-5 pb-5 text-gray-600 dark:text-gray-400 leading-relaxed">{item.a}</dd>
              )}
            </div>
          ))}
        </dl>
      </div>
    </section>
  )
}

export default function Landing() {
  return (
    <div className="min-h-screen bg-white dark:bg-surface-dark">
      <header className="border-b border-border dark:border-gray-800">
        <nav className="flex items-center justify-between px-6 py-4 max-w-7xl mx-auto">
          <a href="https://doaide.com" className="flex items-center gap-2.5 no-underline">
            <RobotFace size={28} color="#F0B429" />
            <span className="text-xl font-bold text-gray-900 dark:text-white">
              DoAide <span className="text-primary">Analytics</span>
            </span>
          </a>
          <div className="flex items-center gap-4">
            <Link to="/pricing" className="text-sm text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white no-underline">Pricing</Link>
            <Link to="/login" className="no-underline"><Button variant="ghost" size="sm">Sign In</Button></Link>
            <Link to="/register" className="no-underline"><Button size="sm">Get Started</Button></Link>
          </div>
        </nav>
      </header>

      <main>
        <section className="relative overflow-hidden py-20 sm:py-28 px-6">
          <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-accent/5 to-transparent" />
          <div className="relative max-w-4xl mx-auto text-center">
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold leading-tight">
              <span className="text-primary">AI-Powered Analytics</span>
              <br />
              <span className="text-gray-900 dark:text-white">for Growing Businesses</span>
            </h1>
            <p className="mt-6 text-lg sm:text-xl text-gray-600 dark:text-gray-400 max-w-2xl mx-auto leading-relaxed">
              Build beautiful dashboards, uncover trends with AI, and share insights
              with your team. Enterprise-grade analytics without the complexity.
            </p>
            <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link to="/register" className="no-underline"><Button size="lg">Start Free</Button></Link>
              <Link to="/pricing" className="no-underline"><Button variant="outline" size="lg">View Pricing</Button></Link>
            </div>
          </div>
        </section>

        <section className="py-20 px-6 border-t border-border dark:border-gray-800" aria-labelledby="features-heading">
          <div className="max-w-7xl mx-auto">
            <h2 id="features-heading" className="text-3xl font-bold text-center text-gray-900 dark:text-white mb-4">
              Everything You Need to Understand Your Business
            </h2>
            <p className="text-gray-600 dark:text-gray-400 text-center mb-14 max-w-xl mx-auto">
              From data ingestion to AI-powered insights. One platform for all your analytics needs.
            </p>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {features.map(({ icon: Icon, title, desc }) => (
                <div key={title} className="p-6 rounded-xl border border-border dark:border-gray-800 hover:border-primary/50 transition-colors">
                  <div className="h-10 w-10 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
                    <Icon className="h-5 w-5 text-primary" />
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">{title}</h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed">{desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="py-20 px-6 border-t border-border dark:border-gray-800" aria-labelledby="how-heading">
          <div className="max-w-4xl mx-auto">
            <h2 id="how-heading" className="text-3xl font-bold text-center text-gray-900 dark:text-white mb-14">How It Works</h2>
            <div className="grid md:grid-cols-3 gap-8">
              {HOW_IT_WORKS.map((s) => (
                <div key={s.step} className="text-center">
                  <div className="w-12 h-12 rounded-full bg-primary text-[#0A0A0B] text-xl font-bold flex items-center justify-center mx-auto mb-4">{s.step}</div>
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">{s.title}</h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed">{s.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section id="pricing" className="py-20 px-6 border-t border-border dark:border-gray-800 bg-gray-50 dark:bg-surface-dark-secondary" aria-labelledby="pricing-heading">
          <div className="max-w-5xl mx-auto">
            <h2 id="pricing-heading" className="text-3xl font-bold text-center text-gray-900 dark:text-white mb-4">Simple, Transparent Pricing</h2>
            <p className="text-gray-600 dark:text-gray-400 text-center mb-14">Start free. Upgrade when you need more.</p>
            <div className="grid md:grid-cols-3 gap-8">
              {plans.map((plan) => (
                <div key={plan.name} className={`p-8 rounded-xl border ${plan.featured ? 'border-primary ring-2 ring-primary/20' : 'border-border dark:border-gray-800'} bg-white dark:bg-surface-dark`}>
                  {plan.featured && <p className="text-xs font-semibold text-primary uppercase tracking-wide mb-2">Most Popular</p>}
                  <h3 className="text-xl font-bold text-gray-900 dark:text-white">{plan.name}</h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">{plan.desc}</p>
                  <div className="mt-4 mb-6">
                    <span className="text-4xl font-bold text-gray-900 dark:text-white">{plan.price}</span>
                    {plan.period && <span className="text-gray-500">{plan.period}</span>}
                  </div>
                  <ul className="space-y-3 mb-8">
                    {plan.features.map((f) => (
                      <li key={f} className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
                        <Check className="h-4 w-4 text-primary flex-shrink-0" />
                        {f}
                      </li>
                    ))}
                  </ul>
                  <Link to="/register" className="block no-underline">
                    <Button variant={plan.featured ? 'primary' : 'outline'} className="w-full">
                      {plan.cta}
                    </Button>
                  </Link>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="py-20 px-6 border-t border-border dark:border-gray-800" aria-labelledby="testimonials-heading">
          <div className="max-w-5xl mx-auto">
            <h2 id="testimonials-heading" className="text-3xl font-bold text-center text-gray-900 dark:text-white mb-14">
              Trusted by Data-Driven Teams
            </h2>
            <div className="grid md:grid-cols-3 gap-8">
              {TESTIMONIALS.map((t) => (
                <blockquote key={t.name} className="p-6 rounded-xl border border-border dark:border-gray-800">
                  <p className="text-gray-600 dark:text-gray-400 leading-relaxed mb-4">&ldquo;{t.quote}&rdquo;</p>
                  <footer>
                    <strong className="text-gray-900 dark:text-white">{t.name}</strong>
                    <span className="block text-sm text-gray-500">{t.role}</span>
                  </footer>
                </blockquote>
              ))}
            </div>
          </div>
        </section>

        <FaqSection />

        <section className="py-20 px-6 text-center border-t border-border dark:border-gray-800">
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">Ready to Unlock Your Data?</h2>
          <p className="text-gray-600 dark:text-gray-400 mb-8 max-w-lg mx-auto">Start building dashboards today. Free forever for up to 3 dashboards.</p>
          <Link to="/register" className="no-underline"><Button size="lg">Get Started Free</Button></Link>
        </section>
      </main>

      <footer className="border-t border-border dark:border-gray-800 py-12 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-10">
            <div>
              <h4 className="text-sm font-semibold text-gray-900 dark:text-white mb-3">Product</h4>
              <div className="space-y-2 text-sm">
                <Link to="/pricing" className="block text-gray-500 hover:text-primary no-underline">Pricing</Link>
                <a href="#features-heading" className="block text-gray-500 hover:text-primary no-underline" onClick={(e) => { e.preventDefault(); document.getElementById('features-heading')?.scrollIntoView({ behavior: 'smooth' }) }}>Features</a>
                <a href="#faq-heading" className="block text-gray-500 hover:text-primary no-underline" onClick={(e) => { e.preventDefault(); document.getElementById('faq-heading')?.scrollIntoView({ behavior: 'smooth' }) }}>FAQ</a>
              </div>
            </div>
            <div>
              <h4 className="text-sm font-semibold text-gray-900 dark:text-white mb-3">Company</h4>
              <div className="space-y-2 text-sm">
                <a href="https://doaide.com" className="block text-gray-500 hover:text-primary no-underline">About DoAide</a>
                <a href="mailto:support@doaide.com" className="block text-gray-500 hover:text-primary no-underline">Contact</a>
              </div>
            </div>
            <div className="col-span-2">
              <h4 className="text-sm font-semibold text-gray-900 dark:text-white mb-3">DoAide Products</h4>
              <div className="flex flex-wrap gap-x-4 gap-y-1 text-sm">
                {DOAIDE_PRODUCTS.map((p) => (
                  <a key={p.name} href={p.url} className="text-gray-500 hover:text-primary no-underline">{p.name}</a>
                ))}
              </div>
            </div>
          </div>
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-8 border-t border-border dark:border-gray-800">
            <a href="https://doaide.com" className="flex items-center gap-2 no-underline">
              <RobotFace size={16} color="#F0B429" />
              <span className="text-sm text-gray-500">doaide.com</span>
            </a>
            <span className="text-sm text-gray-500">&copy; {new Date().getFullYear()} DoAide. All rights reserved.</span>
          </div>
        </div>
      </footer>
    </div>
  )
}
