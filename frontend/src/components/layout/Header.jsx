import { LogOut, User } from 'lucide-react'
import { useState } from 'react'
import useAuthStore from '../../store/authStore'
import ThemeToggle from './ThemeToggle'

export default function Header() {
  const { user, logout } = useAuthStore()
  const [menuOpen, setMenuOpen] = useState(false)

  return (
    <header className="flex items-center justify-between px-6 py-3 border-b border-border dark:border-gray-800 bg-white dark:bg-surface-dark">
      <div className="text-sm text-gray-500 dark:text-gray-400">
        Analytics Dashboard
      </div>

      <div className="flex items-center gap-4">
        <ThemeToggle />

        <div className="relative">
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="flex items-center gap-2 rounded-lg px-3 py-1.5 text-sm text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800"
          >
            <User size={18} />
            <span>{user?.full_name || 'Account'}</span>
          </button>

          {menuOpen && (
            <div className="absolute right-0 top-full mt-1 w-48 rounded-lg bg-white dark:bg-surface-dark-secondary border border-border dark:border-gray-800 shadow-lg py-1 z-50">
              <button
                onClick={() => { logout(); setMenuOpen(false) }}
                className="flex items-center gap-2 w-full px-4 py-2 text-sm text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800"
              >
                <LogOut size={16} />
                Sign out
              </button>
            </div>
          )}
        </div>
      </div>
    </header>
  )
}
