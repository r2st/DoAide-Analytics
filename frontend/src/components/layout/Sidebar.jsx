import clsx from 'clsx'
import {
  BarChart3,
  Brain,
  Calendar,
  ChevronLeft,
  Database,
  FileText,
  LayoutDashboard,
  Settings,
} from 'lucide-react'
import { useState } from 'react'
import { Link, useLocation } from 'react-router-dom'

const navItems = [
  { path: '/app/dashboards', label: 'Dashboards', icon: LayoutDashboard },
  { path: '/app/data-sources', label: 'Data Sources', icon: Database },
  { path: '/app/insights', label: 'AI Insights', icon: Brain },
  { path: '/app/reports', label: 'Reports', icon: FileText },
  { path: '/app/scheduled-reports', label: 'Scheduled', icon: Calendar },
  { path: '/app/settings', label: 'Settings', icon: Settings },
]

export default function Sidebar() {
  const [collapsed, setCollapsed] = useState(false)
  const location = useLocation()

  return (
    <aside
      className={clsx(
        'flex flex-col border-r border-border dark:border-gray-800 bg-white dark:bg-surface-dark transition-all duration-200',
        collapsed ? 'w-16' : 'w-60'
      )}
    >
      <div className="flex items-center justify-between p-4 border-b border-border dark:border-gray-800">
        {!collapsed && (
          <div className="flex items-center gap-2">
            <BarChart3 className="text-primary" size={24} />
            <span className="font-bold text-gray-900 dark:text-white">DoAide</span>
          </div>
        )}
        <button
          onClick={() => setCollapsed(!collapsed)}
          className="p-1 rounded-md text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800"
        >
          <ChevronLeft size={18} className={clsx('transition-transform', collapsed && 'rotate-180')} />
        </button>
      </div>

      <nav className="flex-1 p-2 space-y-1">
        {navItems.map(({ path, label, icon: Icon }) => {
          const active = location.pathname.startsWith(path)
          return (
            <Link
              key={path}
              to={path}
              className={clsx(
                'flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition-colors',
                active
                  ? 'bg-primary/10 text-primary'
                  : 'text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800 hover:text-gray-900 dark:hover:text-white'
              )}
              title={collapsed ? label : undefined}
            >
              <Icon size={20} />
              {!collapsed && <span>{label}</span>}
            </Link>
          )
        })}
      </nav>
    </aside>
  )
}
