import { Link, useParams } from 'react-router-dom'
import Artwork from '../components/Artwork'
import BeforeAfter from '../components/BeforeAfter'
import Reveal from '../components/Reveal'
import { getProject, projects } from '../data/projects'
import { usePageTitle } from '../hooks/usePageTitle'

function Meta({ label, value }: { label: string; value: string | string[] }) {
  return (
    <div className="border-t border-ink/15 py-4">
      <dt className="text-xs font-bold uppercase tracking-[0.2em] text-smoke">{label}</dt>
      <dd className="mt-1 font-medium">
        {Array.isArray(value) ? value.join(' · ') : value}
      </dd>
    </div>
  )
}

export default function CaseStudy() {
  const { slug } = useParams<{ slug: string }>()
  const project = slug ? getProject(slug) : undefined
  usePageTitle(project ? `${project.client}` : 'Project not found')

  if (!project) {
    return (
      <section className="container-x pb-24 pt-40 text-center">
        <h1 className="font-display text-huge font-semibold tracking-tightest">Project not found</h1>
        <p className="mt-4 text-lg text-smoke">It may have been moved or renamed.</p>
        <Link to="/work" className="btn-solid mt-8">
          Back to all work
        </Link>
      </section>
    )
  }

  const idx = projects.findIndex((p) => p.slug === project.slug)
  const next = projects[(idx + 1) % projects.length]

  return (
    <article>
      {/* ============ HERO ============ */}
      <header className="container-x pb-12 pt-32 sm:pt-36">
        <Reveal>
          <Link to="/work" className="link-underline text-sm font-semibold uppercase tracking-widest text-smoke">
            ← All Work
          </Link>
          <div className="mt-6 flex flex-wrap items-center gap-3">
            <span className="rounded-full bg-accent px-4 py-1.5 text-xs font-bold uppercase tracking-widest text-paper">
              {project.category}
            </span>
            {project.tags.map((t) => (
              <span key={t} className="rounded-full border border-ink/25 px-4 py-1.5 text-xs font-semibold uppercase tracking-widest">
                {t}
              </span>
            ))}
          </div>
          <h1 className="mt-6 max-w-5xl font-display text-huge font-semibold leading-[0.95] tracking-tightest">
            {project.title}
          </h1>
          <p className="mt-4 text-xl text-smoke sm:text-2xl">{project.client} · {project.year}</p>
        </Reveal>
      </header>

      {/* Full-width hero image */}
      <Reveal>
        <div className="mx-auto w-full max-w-[1600px] px-3 sm:px-5">
          <div className="overflow-hidden rounded-3xl border border-ink/15">
            <div className="aspect-[16/10] sm:aspect-[21/9]">
              <Artwork seed={`${project.slug}-hero`} label={project.title} className="h-full w-full" />
            </div>
          </div>
        </div>
      </Reveal>

      {/* ============ OVERVIEW ============ */}
      <section className="container-x grid gap-10 py-20 lg:grid-cols-[1.3fr_1fr]">
        <Reveal>
          <div>
            <p className="eyebrow">Project overview</p>
            <p className="mt-4 max-w-2xl text-xl leading-relaxed text-ink/90">{project.blurb}</p>
            <p className="mt-4 max-w-2xl leading-relaxed text-smoke">{project.challenge.problem}</p>
          </div>
        </Reveal>
        <Reveal delay={120}>
          <dl>
            <Meta label="Client" value={project.client} />
            <Meta label="Services" value={project.overview.services} />
            <Meta label="Year" value={String(project.year)} />
            <Meta label="Collaborators" value={project.overview.collaborators} />
            <Meta label="Duration" value={project.overview.duration} />
          </dl>
        </Reveal>
      </section>

      {/* ============ CHALLENGE ============ */}
      <section className="bg-ink py-20 text-paper">
        <div className="container-x grid gap-10 lg:grid-cols-[1fr_1.3fr]">
          <Reveal>
            <h2 className="font-display text-huge font-semibold leading-none tracking-tightest">
              The <em className="text-accent">challenge</em>.
            </h2>
          </Reveal>
          <Reveal delay={150}>
            <div className="space-y-8">
              <p className="text-xl leading-relaxed text-paper/85">{project.challenge.problem}</p>
              <ul className="space-y-3">
                {project.challenge.goals.map((g, i) => (
                  <li key={i} className="flex items-start gap-4 border-b border-paper/15 pb-3">
                    <span className="mt-1 font-display italic text-accent">0{i + 1}</span>
                    <span>{g}</span>
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ============ PROCESS ============ */}
      <section className="container-x py-24">
        <Reveal>
          <p className="eyebrow">The process</p>
          <h2 className="mt-3 max-w-3xl font-display text-huge font-semibold leading-none tracking-tightest">
            How it got made.
          </h2>
          <p className="mt-6 max-w-2xl text-lg text-smoke">{project.processIntro}</p>
        </Reveal>

        <ol className="mt-16 space-y-20">
          {project.process.map((step, i) => (
            <li key={step.title}>
              <div
                className={`grid items-center gap-8 lg:grid-cols-2 ${
                  i % 2 === 1 ? 'lg:[&>*:first-child]:order-2' : ''
                }`}
              >
                <Reveal>
                  <Artwork
                    seed={step.seed}
                    label={`Process ${String(i + 1).padStart(2, '0')}`}
                    className="w-full rounded-2xl border border-ink/15"
                  />
                </Reveal>
                <Reveal delay={100}>
                  <div>
                    <p className="font-display text-lg italic text-accent">
                      Step {String(i + 1).padStart(2, '0')}
                    </p>
                    <h3 className="mt-2 font-display text-3xl font-semibold tracking-tight sm:text-4xl">
                      {step.title}
                    </h3>
                    <p className="mt-4 max-w-xl leading-relaxed text-ink/85">{step.body}</p>
                    <p className="mt-3 text-xs uppercase tracking-widest text-smoke">
                      {['Sketches', 'Wireframes', 'Concept boards', 'Iterations'][i % 4]} shown above
                    </p>
                  </div>
                </Reveal>
              </div>
            </li>
          ))}
        </ol>
      </section>

      {/* ============ SOLUTION ============ */}
      <section className="border-y border-ink/15 bg-cream/60 py-24">
        <div className="container-x">
          <Reveal>
            <p className="eyebrow">The solution</p>
            <h2 className="mt-3 max-w-3xl font-display text-huge font-semibold leading-none tracking-tightest">
              What shipped<span className="text-accent">.</span>
            </h2>
            <p className="mt-6 max-w-2xl text-lg text-smoke">{project.solution.summary}</p>
          </Reveal>

          {project.solution.beforeAfter && (
            <Reveal delay={100}>
              <div className="mx-auto mt-14 max-w-4xl">
                <BeforeAfter
                  seedBefore={`${project.slug}-before`}
                  seedAfter={`${project.slug}-after`}
                  beforeLabel={project.solution.beforeAfter.beforeLabel}
                  afterLabel={project.solution.beforeAfter.afterLabel}
                />
              </div>
            </Reveal>
          )}

          {/* Gallery */}
          <div className="mt-16 grid gap-6 md:grid-cols-2">
            {project.gallery.map((img, i) => (
              <Reveal key={img.seed} delay={(i % 2) * 100} className={i === 0 ? 'md:col-span-2' : ''}>
                <figure className="group overflow-hidden rounded-2xl border border-ink/15 bg-paper">
                  <div className={i === 0 ? 'aspect-[21/9]' : 'aspect-[3/2]'}>
                    <Artwork seed={img.seed} label={project.title} className="h-full w-full transition-transform duration-700 group-hover:scale-[1.03]" />
                  </div>
                  <figcaption className="border-t border-ink/15 px-5 py-3 text-xs uppercase tracking-widest text-smoke">
                    {img.caption}
                  </figcaption>
                </figure>
              </Reveal>
            ))}
          </div>

          {/* Deliverables */}
          <Reveal delay={100}>
            <div className="mt-14 rounded-2xl border border-ink/15 bg-paper p-8 sm:p-10">
              <h3 className="eyebrow !text-accent">Deliverables</h3>
              <ul className="mt-5 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
                {project.solution.deliverables.map((d) => (
                  <li key={d} className="flex items-start gap-3 border-t border-ink/15 pt-3 text-sm font-medium">
                    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden className="mt-0.5 shrink-0 text-accent">
                      <path d="M2 8.5 L6 12 L14 4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                    {d}
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ============ RESULTS ============ */}
      <section className="container-x py-24">
        <Reveal>
          <div className="grid gap-12 lg:grid-cols-[1fr_1.2fr]">
            <div>
              <p className="eyebrow">The results</p>
              <h2 className="mt-3 font-display text-huge font-semibold leading-none tracking-tightest">
                Did it work?
              </h2>
              <p className="mt-6 text-lg leading-relaxed text-smoke">{project.results.summary}</p>
            </div>
            <dl className="grid content-start gap-6 sm:grid-cols-3">
              {project.results.metrics.map((m, i) => (
                <Reveal key={m.label} delay={i * 100}>
                  <div className="rounded-2xl border border-ink/15 p-6">
                    <dt className="sr-only">{m.label}</dt>
                    <dd className="font-display text-4xl font-semibold text-accent">{m.value}</dd>
                    <dd className="mt-2 text-sm uppercase tracking-widest text-smoke">{m.label}</dd>
                  </div>
                </Reveal>
              ))}
            </dl>
          </div>
        </Reveal>
      </section>

      {/* ============ NEXT PROJECT ============ */}
      <Link to={`/work/${next.slug}`} className="group block border-t border-ink/15 transition-colors hover:bg-ink hover:text-paper">
        <div className="container-x flex flex-col items-center py-20 text-center">
          <p className="eyebrow">Next project</p>
          <h2 className="mt-4 font-display text-huge font-semibold tracking-tightest transition-colors group-hover:text-accent">
            {next.title} <span className="inline-block transition-transform duration-300 group-hover:translate-x-3">→</span>
          </h2>
          <p className="mt-2 text-smoke group-hover:text-paper/70">{next.client} · {next.year}</p>
        </div>
      </Link>
    </article>
  )
}
