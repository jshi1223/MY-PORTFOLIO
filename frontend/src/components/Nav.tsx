import { useEffect, useState } from 'react'
import { Link, NavLink, useLocation } from 'react-router-dom'
import { content } from '../data/content'
import ThemeToggle from './ThemeToggle'

const LINKS = [
  { to: '/work', label: 'Work' },
  { to: '/services', label: 'Services' },
  { to: '/about', label: 'About' },
  { to: '/journal', label: 'Journal' },
]

export default function Nav() {
  const [open, setOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const location = useLocation()

  useEffect(() => setOpen(false), [location.pathname])

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [open])

  return (
    <>
      <header
        className={`fixed inset-x-0 top-0 z-50 transition-all duration-200 ${
          scrolled ? 'border-b backdrop-blur-md' : 'bg-transparent'
        }`}
        style={{
          borderColor: scrolled ? 'rgb(var(--border))' : 'transparent',
          backgroundColor: scrolled ? 'rgb(var(--background) / 0.9)' : undefined,
        }}
      >
        <div className="container-x flex h-16 items-center justify-between sm:h-20">
          <Link to="/" className="font-display text-xl font-semibold tracking-tight" style={{ color: 'rgb(var(--foreground))' }} aria-label="Home">
            JOHN VANESS
          </Link>

          <nav className="hidden items-center gap-8 md:flex" aria-label="Primary">
            {LINKS.map((l) => (
              <NavLink
                key={l.to}
                to={l.to}
                className={({ isActive }) =>
                  `text-sm font-medium tracking-wide transition-colors duration-200 ${isActive ? 'text-accent' : 'hover:text-foreground'}`
                }
                style={{ color: 'rgb(var(--muted-foreground))' }}
              >
                {l.label}
              </NavLink>
            ))}
            <Link to="/contact" className="btn-solid !px-5 !py-2.5">
              Start a Project
            </Link>
            <ThemeToggle />
          </nav>

          <div className="flex items-center gap-3 md:hidden">
            <ThemeToggle />
            <button
              onClick={() => setOpen(!open)}
              aria-expanded={open}
              aria-label={open ? 'Close menu' : 'Open menu'}
              className="flex h-11 w-11 items-center justify-center rounded-md border"
              style={{ borderColor: 'rgb(var(--border))' }}
            >
              <svg width="18" height="14" viewBox="0 0 18 14" fill="none" aria-hidden>
                {open ? (
                  <path d="M2 2 L16 12 M16 2 L2 12" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
                ) : (
                  <path d="M1 1 H17 M1 7 H17 M1 13 H17" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
                )}
              </svg>
            </button>
          </div>
        </div>
      </header>

      {/* Mobile overlay menu */}
      <div
        className={`fixed inset-0 z-40 flex flex-col pt-24 transition-all duration-300 md:hidden ${
          open ? 'pointer-events-auto opacity-100' : 'pointer-events-none opacity-0'
        }`}
        style={{ backgroundColor: 'rgb(var(--foreground))', color: 'rgb(var(--background))' }}
      >
        <nav className="container-x flex flex-col gap-1" aria-label="Mobile">
          {[...LINKS, { to: '/testimonials', label: 'Testimonials' }, { to: '/contact', label: 'Start a Project' }].map(
            (l, i) => (
              <NavLink
                key={l.to}
                to={l.to}
                className={({ isActive }) =>
                  `py-4 font-display text-3xl font-medium transition-all duration-300 border-b ${
                    open ? 'translate-x-0 opacity-100' : 'translate-x-6 opacity-0'
                  } ${isActive ? 'text-accent' : ''}`
                }
                style={{
                  transitionDelay: `${i * 40}ms`,
                  borderBottomColor: 'rgb(var(--background) / 0.1)',
                }}
              >
                {l.label}
              </NavLink>
            ),
          )}
        </nav>
        <div className="container-x mt-auto pb-10 text-sm" style={{ color: 'rgb(var(--background) / 0.6)' }}>
          <p>{content.profile.email}</p>
          <p>{content.profile.phone}</p>
          <p>{content.profile.location}</p>
        </div>
      </div>
    </>
  )
}
