import { useEffect } from 'react'

export function usePageTitle(title) {
  useEffect(() => {
    document.title = title ? `${title} — DoAide Analytics` : 'DoAide Analytics'
    return () => { document.title = 'DoAide Analytics' }
  }, [title])
}
