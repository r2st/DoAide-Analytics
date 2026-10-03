import { BarChart3 } from 'lucide-react'
import { Link } from 'react-router-dom'
import Button from '../components/ui/Button'

const plans = [
  { name: 'Free', price: '$0', period: '/mo', features: ['3 dashboards', 'Basic charts', 'CSV upload', '1 user', 'Community support'] },
  { name: 'Pro', price: '$29', period: '/mo', features: ['Unlimited dashboards', 'AI-powered insights', 'Scheduled reports', 'Team sharing (5 users)', 'PDF & Excel export', 'Priority support'], popular: true },
  { name: 'Enterprise', price: 'Custom', period: '', features: ['Everything in Pro', 'Unlimited users', 'API access', 'SSO / SAML', 'Custom integrations', 'Dedicated support', 'SLA guarantee'] },
]

export default function Pricing() {
  return (
    <div className="min-h-screen bg-white dark:bg-surface-dark">
      <nav className="flex items-center justify-between px-6 py-4 max-w-6xl mx-auto">
        <Link to="/" className="flex items-center gap-2">
          <BarChart3 className="text-primary" size={28} />
          <span className="text-xl font-bold text-gray-900 dark:text-white">DoAide Analytics</span>
        </Link>
        <div className="flex items-center gap-4">
          <Link to="/login"><Button variant="ghost" size="sm">Sign In</Button></Link>
          <Link to="/register"><Button size="sm">Get Started</Button></Link>
        </div>
      </nav>

      <section className="py-20 px-6">
        <div className="max-w-6xl mx-auto text-center">
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white">Choose Your Plan</h1>
          <p className="mt-4 text-lg text-gray-600 dark:text-gray-400">Start free, upgrade when you need more.</p>

          <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {plans.map((plan) => (
              <div key={plan.name} className={`rounded-xl border p-8 text-left ${plan.popular ? 'border-primary ring-2 ring-primary/20' : 'border-border dark:border-gray-800'} bg-white dark:bg-surface-dark-secondary`}>
                {plan.popular && <span className="text-xs font-semibold text-primary uppercase tracking-wide">Most Popular</span>}
                <h3 className="text-2xl font-bold text-gray-900 dark:text-white mt-2">{plan.name}</h3>
                <p className="mt-4">
                  <span className="text-4xl font-bold text-gray-900 dark:text-white">{plan.price}</span>
                  <span className="text-gray-500">{plan.period}</span>
                </p>
                <ul className="mt-8 space-y-3">
                  {plan.features.map((f) => (
                    <li key={f} className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
                      <span className="text-primary text-lg">&#10003;</span> {f}
                    </li>
                  ))}
                </ul>
                <Link to="/register" className="block mt-8">
                  <Button variant={plan.popular ? 'primary' : 'outline'} className="w-full">
                    {plan.price === 'Custom' ? 'Contact Sales' : 'Get Started'}
                  </Button>
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}
