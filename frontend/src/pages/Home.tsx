import { useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import Artwork from '../components/Artwork'
import Avatar from '../components/Avatar'
import Marquee from '../components/Marquee'
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
      className="relative overflow-hidden rounded-lg border border-border shadow-sm"
      onMouseEnter={() => (paused.current = true)}
      onMouseLeave={() => (paused.current = false)}
    >
      <div className="relative aspect-[4/5] sm:aspect-[16/9]">
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
            <div className="absolute inset-0 flex flex-col justify-end bg-gradient-to-t from-foreground/80 via-transparent to-transparent p-6 text-background sm:p-10">
              <p className="font-mono text-xs font-medium uppercase tracking-[0.15em] text-background/80">
                {repo.language ?? 'Code'} · {new Date(repo.created_at).getFullYear()}
                {repo.fork ? ' · Fork' : ''}
              </p>
              <h3 className="mt-2 max-w-xl font-display text-2xl font-semibold tracking-tight sm:text-4xl">
                {repo.name}
              </h3>
              <p className="line-clamp-1 text-sm text-background/75">{repo.description ?? repo.html_url}</p>
            </div>
          </a>
        ))}
      </div>

      {/* Controls */}
      <div className="absolute bottom-4 right-4 flex items-center gap-2">
        {featured.map((_, idx) => (
          <button
            key={idx}
            onClick={() => setI(idx)}
            aria-label={`Go to slide ${idx + 1}`}
            className={`h-2 rounded-full transition-all duration-200 ${
              idx === i ? 'w-8 bg-accent' : 'w-2 bg-background/60 hover:bg-background'
            }`}
          />
        ))}
      </div>
      <span className="absolute left-4 top-4 rounded-md bg-foreground/70 px-3 py-1 font-mono text-[11px] font-medium uppercase tracking-[0.15em] text-background backdrop-blur">
        Showreel — live from GitHub
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
      <section className="container-x py-32 sm:py-40">
        <div className="grid gap-12 lg:grid-cols-[1.15fr_1fr] lg:items-end">
          <div>
            <p className="flex items-center gap-2 font-mono text-xs font-medium uppercase tracking-[0.15em] text-muted-foreground">
              <span className="relative flex h-2.5 w-2.5">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-accent opacity-40" />
                <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-accent" />
              </span>
              {p.availability}
            </p>
            <h1 className="mt-6 font-display text-mega font-medium leading-[1.02] tracking-tight">
              I build apps that{' '}
              <em className="relative whitespace-nowrap not-italic text-accent">
                people use
                <svg
                  className="absolute -bottom-2 left-0 w-full"
                  viewBox="0 0 300 14"
                  fill="none"
                  preserveAspectRatio="none"
                  aria-hidden
                >
                  <path d="M4 10 C 90 2, 210 2, 296 8" stroke="currentColor" strokeWidth="3" strokeLinecap="round" />
                </svg>
              </em>
              .
            </h1>
            <p className="mt-8 max-w-xl text-lg leading-relaxed text-muted-foreground">{p.intro}</p>
            <div className="mt-10 flex flex-wrap items-center gap-4">
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

      <Marquee />

      {/* ============ INTRO / STATS ============ */}
      <section className="container-x grid gap-12 py-32 lg:grid-cols-[0.85fr_1.05fr_1.3fr]">
        <figure className="relative mx-auto w-full max-w-[250px] -rotate-1 rounded-lg border border-border bg-card p-2 shadow-sm transition-transform duration-200 hover:rotate-0">
          <Portrait className="aspect-[4/5] w-full rounded-md" />
          <figcaption className="pb-1 pt-3 text-center font-mono text-xs font-medium uppercase tracking-[0.15em] text-muted-foreground">
            {p.name} — Batangas, PH
          </figcaption>
        </figure>
        <div className="lg:pt-0">
          <p className="small-caps mb-3">Kamusta, I'm {p.name.split(' ')[0]}</p>
          <h2 className="font-display text-huge font-medium leading-[1.1] tracking-tight">
            Web Dev.
            <br />
            Mobile Dev.
            <br />
            <span className="italic text-accent">Desktop Dev.</span>
          </h2>
        </div>
          <div className="space-y-6 text-lg leading-relaxed text-foreground/85 lg:pt-16">
          <p>
            I've been coding for years — started with frontend, then went full-stack because
            I couldn't stop at just making things pretty. I build web apps with React, mobile apps
            with React Native, and desktop software with Tauri.
          </p>
          <p>
            My approach is simple: understand the problem first, pick the right tools, and write
            code that someone else can maintain. No over-engineering, no unnecessary complexity —
            just apps that work and people enjoy using.
          </p>
          <dl className="grid grid-cols-3 gap-6 border-t border-border pt-6">
            {[
              ['6+', 'years designing'],
              ['40+', 'projects shipped'],
              ['3', 'continents served'],
            ].map(([v, l]) => (
              <div key={l}>
                <dt className="font-display text-4xl font-semibold text-accent">{v}</dt>
                <dd className="mt-1 font-mono text-xs uppercase tracking-[0.15em] text-muted-foreground">{l}</dd>
              </div>
            ))}
          </dl>
        </div>
      </section>

      {/* ============ SELECTED WORK ============ */}
      <section className="border-y border-border bg-muted/50 py-32">
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
      <section className="container-x py-32">
        <figure className="mx-auto max-w-4xl text-center">
          <Avatar initials={content.testimonials[0].initials} size="lg" />
          <blockquote className="mt-8 font-display text-3xl font-medium leading-snug tracking-tight sm:text-4xl">
            <span className="text-accent">"</span>{content.testimonials[0].quote}<span className="text-accent">"</span>
          </blockquote>
          <figcaption className="mt-6 font-mono text-xs uppercase tracking-[0.15em] text-muted-foreground">
            {content.testimonials[0].name} · {content.testimonials[0].role}, {content.testimonials[0].company}
          </figcaption>
          <Link to="/testimonials" className="link-underline mt-6 inline-block font-medium text-accent">
            Read more kind words →
          </Link>
        </figure>
      </section>

      {/* ============ SERVICES TEASER ============ */}
      <section className="container-x pb-32">
        <div className="section-label">
          <span className="rule" />
          <span className="label">What I can do for you</span>
          <span className="rule" />
        </div>
        <h2 className="max-w-3xl font-display text-huge font-medium leading-[1.1] tracking-tight">
          Small studio. Full arsenal.
        </h2>
        <div className="mt-12 border-t border-border">
          {content.services.map((s, i) => (
            <Link
              key={s.slug}
              to={`/services#${s.slug}`}
              className="group grid grid-cols-[auto_1fr_auto] items-center gap-4 border-b border-border py-6 transition-colors duration-200 hover:bg-muted/50 sm:gap-8 sm:px-4"
            >
              <span className="font-display text-lg italic text-muted-foreground">0{i + 1}</span>
              <div>
                <h3 className="font-display text-2xl font-semibold tracking-tight transition-colors duration-200 group-hover:text-accent sm:text-3xl">
                  {s.name}
                </h3>
                <p className="mt-1 text-sm text-muted-foreground">{s.tagline}</p>
              </div>
              <span className="text-right text-xs font-medium uppercase tracking-wide text-muted-foreground sm:text-sm">
                {s.price}
                <span className="mt-1 block transition-transform duration-200 group-hover:translate-x-1 group-hover:text-accent">
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
