import { useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import Artwork from '../components/Artwork'
import Avatar from '../components/Avatar'
import Portrait from '../components/Portrait'
import { RepoCard, useRepos } from '../components/RepoCard'
import { content } from '../data/content'
import { usePageTitle } from '../hooks/usePageTitle'

function Showreel({ repos }: { repos: ReturnType<typeof useRepos> }) {
  const featured = repos.slice(0, 4)
  const [i, setI] = useState(0)
  const paused = useRef(false)

  useEffect(() => {
    const t = setInterval(() => {
      if (!paused.current) setI((v) => (v + 1) % Math.max(featured.length, 1))
    }, 4500)
    return () => clearInterval(t)
  }, [featured.length])

  return (
    <div
      className="relative overflow-hidden rounded-lg border shadow-sm"
      style={{ borderColor: 'rgb(var(--border))' }}
      onMouseEnter={() => (paused.current = true)}
      onMouseLeave={() => (paused.current = false)}
    >
      <div className="relative aspect-[16/9]">
        {featured.map((repo, idx) => (
          <a
            key={repo.name}
            href={repo.html_url}
            target="_blank"
            rel="noreferrer"
            className={`absolute inset-0 transition-opacity duration-500 ${
              idx === i ? 'opacity-100' : 'pointer-events-none opacity-0'
            }`}
            aria-hidden={idx !== i}
          >
            <Artwork seed={`repo-${repo.name}`} label={repo.language ?? 'code'} className="h-full w-full" />
            <div className="absolute inset-0 flex flex-col justify-end p-6 sm:p-8" style={{ background: 'linear-gradient(to top, rgb(var(--foreground) / 0.85), transparent 60%)' }}>
              <p className="font-mono text-[10px] font-medium uppercase tracking-[0.2em]" style={{ color: 'rgb(var(--background) / 0.7)' }}>
                {repo.language ?? 'Code'} · {new Date(repo.created_at).getFullYear()}
                {repo.fork ? ' · Fork' : ''}
              </p>
              <h3 className="mt-1 font-display text-xl font-semibold tracking-tight sm:text-3xl" style={{ color: 'rgb(var(--background))' }}>
                {repo.name}
              </h3>
              <p className="mt-1 line-clamp-1 text-sm" style={{ color: 'rgb(var(--background) / 0.7)' }}>{repo.description ?? repo.html_url}</p>
            </div>
          </a>
        ))}
      </div>

      {/* Controls */}
      <div className="absolute bottom-3 right-3 flex items-center gap-1.5 rounded-full px-2 py-1" style={{ backgroundColor: 'rgb(var(--foreground) / 0.5)' , backdropFilter: 'blur(8px)' }}>
        {featured.map((_, idx) => (
          <button
            key={idx}
            onClick={() => setI(idx)}
            aria-label={`Go to slide ${idx + 1}`}
            className="h-1.5 rounded-full transition-all duration-200"
            style={{
              width: idx === i ? '20px' : '6px',
              backgroundColor: idx === i ? 'rgb(var(--accent))' : 'rgb(var(--background) / 0.4)',
            }}
          />
        ))}
      </div>
      <span className="absolute left-3 top-3 rounded-md px-2.5 py-1 font-mono text-[10px] font-medium uppercase tracking-[0.15em] backdrop-blur" style={{ backgroundColor: 'rgb(var(--foreground) / 0.6)', color: 'rgb(var(--background))' }}>
        Live from GitHub
      </span>
    </div>
  )
}

export default function Home() {
  usePageTitle()
  const p = content.profile
  const repos = useRepos()

  return (
    <>
      {/* ============ HERO ============ */}
      <section className="container-x pb-16 pt-32 sm:pt-40">
        <div className="grid gap-12 lg:grid-cols-[1.2fr_1fr] lg:items-center">
          <div>
            <p className="flex items-center gap-2 font-mono text-xs font-medium uppercase tracking-[0.15em] text-muted-foreground">
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-accent opacity-40" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-accent" />
              </span>
              {p.availability}
            </p>
            <h1 className="mt-6 font-display text-mega font-medium leading-[1.02] tracking-tight">
              I build apps that{' '}
              <em className="relative whitespace-nowrap not-italic text-accent">
                people use
                <svg className="absolute -bottom-1 left-0 w-full" viewBox="0 0 300 12" fill="none" preserveAspectRatio="none" aria-hidden>
                  <path d="M4 9 C 80 2, 220 2, 296 7" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />
                </svg>
              </em>
              .
            </h1>
            <p className="mt-6 max-w-lg text-lg leading-relaxed text-muted-foreground">{p.intro}</p>
            <div className="mt-8 flex flex-wrap items-center gap-4">
              <Link to="/contact" className="btn-solid">
                Start a Project
                <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden>
                  <path d="M2 12 L12 2 M5 2 H12 V9" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </Link>
              <Link to="/work" className="btn-ghost">
                See the Work
              </Link>
            </div>
          </div>

          <Showreel repos={repos} />
        </div>
      </section>

      {/* ============ INTRO ============ */}
      <section className="container-x py-24">
        <div className="flex flex-col items-center text-center lg:flex-row lg:text-left lg:items-start lg:gap-16">
          <figure className="shrink-0">
            <div className="relative w-48 rounded-lg border p-2 shadow-sm" style={{ borderColor: 'rgb(var(--border))' }}>
              <Portrait className="aspect-[4/5] w-full rounded-md" />
            </div>
            <figcaption className="mt-3 text-center font-mono text-[11px] font-medium uppercase tracking-[0.15em] text-muted-foreground">
              {p.name}
            </figcaption>
          </figure>
          <div className="mt-10 lg:mt-0 max-w-2xl">
            <p className="small-caps mb-3">What I do</p>
            <h2 className="font-display text-huge font-medium leading-[1.1] tracking-tight">
              Web Dev. Mobile Dev.<br /><span className="italic text-accent">Desktop Dev.</span>
            </h2>
            <div className="mt-6 space-y-4 text-lg leading-relaxed text-foreground/80">
              <p>
                I've been coding for years — started with frontend, then went full-stack because
                I couldn't stop at just making things pretty. I build web apps with React, mobile apps
                with React Native, and desktop software with Tauri.
              </p>
              <p>
                My approach is simple: understand the problem first, pick the right tools, and write
                code that someone else can maintain. No over-engineering — just apps that work.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ============ SELECTED WORK ============ */}
      <section className="py-24" style={{ borderTop: '1px solid rgb(var(--border))', borderBottom: '1px solid rgb(var(--border))', backgroundColor: 'rgb(var(--muted) / 0.5)' }}>
        <div className="container-x">
          <div className="flex flex-wrap items-end justify-between gap-6">
            <div>
              <p className="small-caps mb-3">Selected work — live from GitHub</p>
              <h2 className="font-display text-huge font-medium leading-[1.1] tracking-tight">
                Proof, not promises.
              </h2>
            </div>
            <Link to="/work" className="btn-ghost">
              All Projects →
            </Link>
          </div>
          <div className="mt-12 grid gap-x-8 gap-y-14 sm:grid-cols-2">
            {repos.slice(0, 6).map((repo, i) => (
              <RepoCard key={repo.name} repo={repo} index={i} />
            ))}
          </div>
        </div>
      </section>

      {/* ============ TESTIMONIAL SNIPPET ============ */}
      <section className="container-x py-28">
        <figure className="mx-auto max-w-3xl text-center">
          <Avatar initials={content.testimonials[0].initials} size="lg" />
          <div className="relative mt-8">
            <span className="absolute -top-4 left-1/2 -translate-x-1/2 font-display text-[80px] leading-none text-accent/30 select-none">"</span>
            <blockquote className="relative font-display text-2xl font-medium leading-snug tracking-tight sm:text-3xl">
              {content.testimonials[0].quote}
            </blockquote>
          </div>
          <figcaption className="mt-6 font-mono text-xs uppercase tracking-[0.15em] text-muted-foreground">
            {content.testimonials[0].name} · {content.testimonials[0].role}, {content.testimonials[0].company}
          </figcaption>
          <Link to="/testimonials" className="link-underline mt-6 inline-block font-medium">
            Read more kind words →
          </Link>
        </figure>
      </section>

      {/* ============ SERVICES TEASER ============ */}
      <section className="container-x pb-28">
        <div className="section-label">
          <span className="rule" />
          <span className="label">What I can do for you</span>
          <span className="rule" />
        </div>
        <h2 className="max-w-3xl font-display text-huge font-medium leading-[1.1] tracking-tight">
          Small studio. Full arsenal.
        </h2>
        <div className="mt-10">
          {content.services.map((s, i) => (
            <Link
              key={s.slug}
              to={`/services#${s.slug}`}
              className="group grid grid-cols-[auto_1fr_auto] items-center gap-4 border-b py-5 transition-colors duration-200 hover:bg-muted/30 sm:gap-8 sm:px-4"
              style={{ borderColor: 'rgb(var(--border))' }}
            >
              <span className="font-display text-lg italic text-muted-foreground">0{i + 1}</span>
              <div>
                <h3 className="font-display text-xl font-semibold tracking-tight transition-colors duration-200 group-hover:text-accent sm:text-2xl">
                  {s.name}
                </h3>
                <p className="mt-0.5 text-sm text-muted-foreground">{s.tagline}</p>
              </div>
              <span className="text-right text-xs font-medium uppercase tracking-wide text-muted-foreground sm:text-sm">
                {s.price}
                <span className="mt-1 block transition-transform duration-200 group-hover:translate-x-1 text-accent">
                  →
                </span>
              </span>
            </Link>
          ))}
        </div>
      </section>
    </>
  )
}
