import { Link } from 'react-router-dom'
import { content } from '../data/content'
import Reveal from './Reveal'

export default function Footer() {
  const p = content.profile
  return (
    <footer className="mt-24 bg-ink text-paper">
      <div className="container-x py-20">
        <Reveal>
          <p className="eyebrow !text-paper/60">Got a project in mind?</p>
          <Link to="/contact" className="group mt-4 block max-w-5xl">
            <h2 className="font-display text-huge font-semibold leading-[1.02] tracking-tightest">
              Let's make something{' '}
              <em className="text-accent">people remember</em>.
              <span className="ml-3 inline-block transition-transform duration-300 group-hover:translate-x-2">
                →
              </span>
            </h2>
          </Link>
        </Reveal>

        <div className="mt-16 grid gap-10 border-t border-paper/15 pt-10 sm:grid-cols-2 lg:grid-cols-4">
          <div>
            <p className="eyebrow !text-paper/60">Say hello</p>
            <a href={`mailto:${p.email}`} className="link-underline mt-3 block w-fit font-medium">
              {p.email}
            </a>
            <a href={`tel:${p.phoneRaw}`} className="link-underline mt-1 block w-fit font-medium">
              {p.phone}
            </a>
          </div>
          <div>
            <p className="eyebrow !text-paper/60">Studio</p>
            <p className="mt-3 font-medium">{p.location}</p>
            <p className="mt-1 text-sm text-paper/60">{p.availability}</p>
          </div>
          <div>
            <p className="eyebrow !text-paper/60">Elsewhere</p>
            <div className="mt-3 flex flex-col gap-1">
              <a href={p.github} target="_blank" rel="noreferrer" className="link-underline w-fit font-medium">
                GitHub — jshi1223
              </a>
              <a href={p.behance} target="_blank" rel="noreferrer" className="link-underline w-fit font-medium">
                Behance
              </a>
              <a href={p.instagram} target="_blank" rel="noreferrer" className="link-underline w-fit font-medium">
                Instagram
              </a>
            </div>
          </div>
          <div>
            <p className="eyebrow !text-paper/60">Sitemap</p>
            <div className="mt-3 grid grid-cols-2 gap-1">
              {[
                ['Work', '/work'],
                ['Services', '/services'],
                ['About', '/about'],
                ['Journal', '/journal'],
                ['Testimonials', '/testimonials'],
                ['Contact', '/contact'],
              ].map(([label, to]) => (
                <Link key={to} to={to} className="link-underline w-fit text-sm text-paper/80">
                  {label}
                </Link>
              ))}
            </div>
          </div>
        </div>

        <div className="mt-14 flex flex-col items-start justify-between gap-3 border-t border-paper/15 pt-6 text-xs uppercase tracking-widest text-paper/50 sm:flex-row sm:items-center">
          <p>© {new Date().getFullYear()} SHI STUDIO® — Designed & built by Vanessa</p>
          <p>React + TypeScript + Tailwind + Laravel · Batangas, PH</p>
          <button
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            className="link-underline normal-case tracking-normal"
          >
            Back to top ↑
          </button>
        </div>
      </div>
    </footer>
  )
}
