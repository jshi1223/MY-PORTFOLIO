import { useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import Artwork from '../components/Artwork'
import Avatar from '../components/Avatar'
import Marquee from '../components/Marquee'
import Portrait from '../components/Portrait'
import { RepoCard, useRepos } from '../components/RepoCard'
import Reveal from '../components/Reveal'
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
      className="relative overflow-hidden rounded-3xl border border-ink/15"
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
            className={`absolute inset-0 transition-opacity duration-700 ${
              idx === i ? 'opacity-100' : 'pointer-events-none opacity-0'
            }`}
            aria-hidden={idx !== i}
          >
            <Artwork seed={`repo-${repo.name}`} label={repo.language ?? 'code'} className="h-full w-full" />
            <div className="absolute inset-0 flex flex-col justify-end bg-gradient-to-t from-ink/80 via-transparent to-transparent p-6 text-paper sm:p-10">
              <p className="text-xs font-bold uppercase tracking-[0.25em] text-paper/80">
                {repo.language ?? 'Code'} · {new Date(repo.created_at).getFullYear()}
                {repo.fork ? ' · Fork' : ''}
              </p>
              <h3 className="mt-2 max-w-xl font-display text-2xl font-semibold tracking-tight sm:text-4xl">
                {repo.name}
              </h3>
              <p className="line-clamp-1 text-sm text-paper/75">{repo.description ?? repo.html_url}</p>
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
            className={`h-2 rounded-full transition-all duration-300 ${
              idx === i ? 'w-8 bg-accent' : 'w-2 bg-paper/60 hover:bg-paper'
            }`}
          />
        ))}
      </div>
      <span className="absolute left-4 top-4 rounded-full bg-ink/70 px-3 py-1 text-[11px] font-bold uppercase tracking-widest text-paper backdrop-blur">
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
      <section className="container-x pb-14 pt-32 sm:pt-40">
        <div className="grid gap-12 lg:grid-cols-[1.15fr_1fr] lg:items-end">
          <div>
            <Reveal>
              <p className="flex items-center gap-2 text-sm font-semibold uppercase tracking-[0.25em] text-smoke">
                <span className="relative flex h-2.5 w-2.5">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-moss opacity-60" />
                  <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-moss" />
                </span>
                {p.availability}
              </p>
            </Reveal>
            <Reveal delay={100}>
              <h1 className="mt-6 font-display text-mega font-semibold leading-[0.95] tracking-tightest">
                I design brands that{' '}
                <em className="relative whitespace-nowrap not-italic text-accent">
                  people remember
                  <svg
                    className="absolute -bottom-2 left-0 w-full"
                    viewBox="0 0 300 14"
                    fill="none"
                    preserveAspectRatio="none"
                    aria-hidden
                  >
                    <path d="M4 10 C 90 2, 210 2, 296 8" stroke="currentColor" strokeWidth="5" strokeLinecap="round" />
                  </svg>
                </em>
                .
              </h1>
            </Reveal>
            <Reveal delay={200}>
              <p className="mt-8 max-w-xl text-lg leading-relaxed text-smoke">{p.intro}</p>
            </Reveal>
            <Reveal delay={300}>
              <div className="mt-10 flex flex-wrap items-center gap-4">
                <Link to="/contact" className="btn-accent">
                  Start a Project
                  <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden>
                    <path d="M2 12 L12 2 M5 2 H12 V9" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </Link>
                <Link to="/work" className="btn-ghost">
                  See the Work
                </Link>
              </div>
            </Reveal>
          </div>

          <Reveal delay={250}>
            <Showreel repos={repos} />
          </Reveal>
        </div>
      </section>

      <Marquee />

      {/* ============ INTRO / STATS ============ */}
      <section className="container-x grid gap-12 py-24 lg:grid-cols-[0.85fr_1.05fr_1.3fr]">
        <Reveal>
          <figure className="relative mx-auto w-full max-w-[250px] -rotate-2 rounded-2xl border border-ink/15 bg-paper p-2 shadow-[6px_6px_0_0_#17130E] transition-transform duration-300 hover:rotate-0">
            <Portrait className="aspect-[4/5] w-full rounded-xl" />
            <figcaption className="pb-1 pt-3 text-center text-xs font-bold uppercase tracking-widest text-smoke">
              {p.name} — Batangas, PH
            </figcaption>
          </figure>
        </Reveal>
        <Reveal delay={80}>
          <div>
            <p className="eyebrow">Kamusta, I'm {p.name.split(' ')[0]}</p>
            <h2 className="mt-3 font-display text-huge font-semibold leading-none tracking-tightest">
              Designer.
              <br />
              Strategist.
              <br />
              <span className="italic text-accent">Kapanganakan ng ideas.</span>
            </h2>
          </div>
        </Reveal>
        <Reveal delay={150} className="lg:pt-16">
          <div className="space-y-6 text-lg leading-relaxed text-ink/85">
            <p>
              Six years ago I traded a Manila agency cubicle for a studio desk in Batangas with a view of Mount
              Makulot. Since then I've shipped over 40 identity and web projects for cafés, fintechs, hotels,
              and festivals — from my province to three continents.
            </p>
            <p>
              My work is strategy wearing good clothes: every color earns its place, every word pulls its
              weight. No templates, no recycled trends — just brands built to be remembered in markets full of
              wallpaper.
            </p>
            <dl className="grid grid-cols-3 gap-6 border-t border-ink/15 pt-6">
              {[
                ['6+', 'years designing'],
                ['40+', 'projects shipped'],
                ['3', 'continents served'],
              ].map(([v, l]) => (
                <div key={l}>
                  <dt className="font-display text-4xl font-semibold text-accent">{v}</dt>
                  <dd className="mt-1 text-sm uppercase tracking-widest text-smoke">{l}</dd>
                </div>
              ))}
            </dl>
          </div>
        </Reveal>
      </section>

      {/* ============ SELECTED WORK ============ */}
      <section className="border-y border-ink/15 bg-cream/60 py-24">
        <div className="container-x">
          <Reveal>
            <div className="flex flex-wrap items-end justify-between gap-6">
              <div>
                <p className="eyebrow">Selected work — live from GitHub</p>
                <h2 className="mt-3 font-display text-huge font-semibold leading-none tracking-tightest">
                  Proof, not promises.
                </h2>
              </div>
              <Link to="/work" className="btn-ghost">
                All Projects →
              </Link>
            </div>
          </Reveal>
          <div className="mt-12 grid gap-x-8 gap-y-14 sm:grid-cols-2">
            {repos.slice(0, 6).map((repo, i) => (
              <Reveal key={repo.name} delay={(i % 2) * 120}>
                <RepoCard repo={repo} index={i} />
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ============ TESTIMONIAL SNIPPET ============ */}
      <section className="container-x py-24">
        <Reveal>
          <figure className="mx-auto max-w-4xl text-center">
            <Avatar initials={content.testimonials[0].initials} size="lg" />
            <blockquote className="mt-8 font-display text-3xl font-medium leading-snug tracking-tight sm:text-4xl">
              “{content.testimonials[0].quote}”
            </blockquote>
            <figcaption className="mt-6 text-sm uppercase tracking-widest text-smoke">
              {content.testimonials[0].name} · {content.testimonials[0].role}, {content.testimonials[0].company}
            </figcaption>
            <Link to="/testimonials" className="link-underline mt-6 inline-block font-semibold text-accent">
              Read more kind words →
            </Link>
          </figure>
        </Reveal>
      </section>

      {/* ============ SERVICES TEASER ============ */}
      <section className="container-x pb-24">
        <Reveal>
          <p className="eyebrow">What I can do for you</p>
          <h2 className="mt-3 max-w-3xl font-display text-huge font-semibold leading-none tracking-tightest">
            Small studio. Full arsenal.
          </h2>
        </Reveal>
        <div className="mt-12 border-t border-ink/15">
          {content.services.map((s, i) => (
            <Reveal key={s.slug} delay={i * 60}>
              <Link
                to={`/services#${s.slug}`}
                className="group grid grid-cols-[auto_1fr_auto] items-center gap-4 border-b border-ink/15 py-6 transition-colors hover:bg-cream/60 sm:gap-8 sm:px-4"
              >
                <span className="font-display text-lg italic text-smoke">0{i + 1}</span>
                <div>
                  <h3 className="font-display text-2xl font-semibold tracking-tight transition-colors group-hover:text-accent sm:text-3xl">
                    {s.name}
                  </h3>
                  <p className="mt-1 text-sm text-smoke">{s.tagline}</p>
                </div>
                <span className="text-right text-xs font-bold uppercase tracking-widest text-smoke sm:text-sm">
                  {s.price}
                  <span className="mt-1 block transition-transform duration-300 group-hover:translate-x-1 group-hover:text-accent">
                    →
                  </span>
                </span>
              </Link>
            </Reveal>
          ))}
        </div>
      </section>
    </>
  )
}
