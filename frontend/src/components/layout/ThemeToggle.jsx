import { Monitor, Moon, Sun } from 'lucide-react'
import useThemeStore from '../../store/themeStore'

const modes = [
  { key: 'light', icon: Sun },
  { key: 'system', icon: Monitor },
  { key: 'dark', icon: Moon },
]

export default function ThemeToggle() {
  const { theme, setTheme } = useThemeStore()

  return (
    <div className="flex items-center gap-1 rounded-lg bg-gray-100 dark:bg-gray-800 p-1">
      {modes.map(({ key, icon: Icon }) => (
        <button
          key={key}
          onClick={() => setTheme(key)}
          className={`rounded-md p-1.5 transition-colors ${
            theme === key
              ? 'bg-white dark:bg-gray-700 text-primary shadow-sm'
              : 'text-gray-400 hover:text-gray-600 dark:hover:text-gray-300'
          }`}
          title={key}
        >
          <Icon size={16} />
        </button>
      ))}
    </div>
  )
}
