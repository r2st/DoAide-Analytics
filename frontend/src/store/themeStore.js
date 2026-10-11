import { create } from 'zustand'

const getInitialTheme = () => {
  try {
    return localStorage.getItem('theme') || 'light'
  } catch {
    return 'light'
  }
}

const applyTheme = (theme) => {
  const root = document.documentElement
  const isDark =
    theme === 'dark' ||
    (theme === 'system' && window.matchMedia('(prefers-color-scheme: dark)').matches)

  root.setAttribute('data-theme', isDark ? 'dark' : 'light')
  root.classList.toggle('dark', isDark)
}

const useThemeStore = create((set) => {
  const initial = getInitialTheme()
  if (typeof document !== 'undefined') applyTheme(initial)

  return {
    theme: initial,
    setTheme: (theme) => {
      try {
        localStorage.setItem('theme', theme)
      } catch {}
      applyTheme(theme)
      set({ theme })
    },
  }
})

export default useThemeStore
