import { Link, useLocation } from 'react-router-dom'

const TOOLS = [
  { path: '/calculator', label: 'ROI Calculator' },
  { path: '/checker', label: 'Speed Checker' },
  { path: '/templates', label: 'Templates' },
  { path: '/tools/roi-calculator', label: 'Analytics ROI' },
  { path: '/tools/sample-size-calculator', label: 'Sample Size' },
  { path: '/tools/churn-predictor', label: 'Churn Risk' },
]

export default function ToolsNav() {
  const { pathname } = useLocation()
  return (
    <nav className="flex items-center gap-4 px-4 py-3 border-b border-border dark:border-gray-800 flex-wrap">
      <Link to="/" className="font-bold text-primary no-underline text-sm whitespace-nowrap">DoAide Analytics</Link>
      <div className="flex gap-2 flex-wrap">
        {TOOLS.map((t) => (
          <Link key={t.path} to={t.path} className={`text-sm px-3 py-1.5 rounded-md no-underline transition-colors ${pathname === t.path ? 'bg-primary/10 text-primary' : 'text-gray-500 hover:text-gray-900 dark:hover:text-white'}`}>
            {t.label}
          </Link>
        ))}
      </div>
      <Link to="/register" className="ml-auto text-sm px-4 py-1.5 bg-primary text-white rounded-md font-semibold no-underline whitespace-nowrap">Sign up free</Link>
    </nav>
  )
}
