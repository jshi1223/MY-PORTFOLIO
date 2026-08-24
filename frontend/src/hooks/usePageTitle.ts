import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'

export function usePageTitle(title?: string) {
  useEffect(() => {
    document.title = title
        ? `${title} — SHI STUDIO®`
        : 'SHI STUDIO® — I design brands that people remember'
  }, [title])
}

export function ScrollToTop() {
  const { pathname } = useLocation()
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' as ScrollBehavior })
  }, [pathname])
  return null
}
