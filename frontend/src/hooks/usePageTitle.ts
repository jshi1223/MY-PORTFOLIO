import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'

export function usePageTitle(title?: string) {
  useEffect(() => {
    document.title = title
        ? `${title} — John Vaness`
        : 'John Vaness M. Aquino — Full-Stack Developer'
  }, [title])
}

export function ScrollToTop() {
  const { pathname } = useLocation()
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' as ScrollBehavior })
  }, [pathname])
  return null
}
