import { Link, useParams } from 'react-router-dom'
import Artwork from '../components/Artwork'
import BeforeAfter from '../components/BeforeAfter'
import { getProject, projects } from '../data/projects'
import { usePageTitle } from '../hooks/usePageTitle'

function Meta({ label, value }: { label: string; value: string | string[] }) {
  return (
    <div className="border-t border-border py-4">
      <dt className="font-mono text-xs font-medium uppercase tracking-[0.15em] text-muted-foreground">{label}</dt>
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
        <h1 className="font-display text-huge font-medium tracking-tight">Project not found</h1>
        <p className="mt-4 text-lg text-muted-foreground">It may have been moved or renamed.</p>
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
        <Link to="/work" className="link-underline text-sm font-medium uppercase tracking-wide text-muted-foreground">
          ← All Work
        </Link>
        <div className="mt-6 flex flex-wrap items-center gap-3">
          <span className="rounded-md bg-accent px-4 py-1.5 font-mono text-xs font-medium uppercase tracking-wide text-white">
            {project.category}
          </span>
          {project.tags.map((t) => (
            <span key={t} className="rounded-md border border-border px-4 py-1.5 font-mono text-xs font-medium uppercase tracking-wide">
              {t}
            </span>
          ))}
        </div>
        <h1 className="mt-6 max-w-5xl font-display text-huge font-medium leading-[1.02] tracking-tight">
          {project.title}
        </h1>
        <p className="mt-4 text-xl text-muted-foreground sm:text-2xl">{project.client} · {project.year}</p>
      </header>

      {/* Full-width hero image */}
      <div className="mx-auto w-full max-w-[1600px] px-3 sm:px-5">
        <div className="overflow-hidden rounded-lg border border-border">
          <div className="aspect-[16/10] sm:aspect-[21/9]">
            <Artwork seed={`${project.slug}-hero`} label={project.title} className="h-full w-full" />
          </div>
        </div>
      </div>

      {/* ============ OVERVIEW ============ */}
      <section className="container-x grid gap-10 py-20 lg:grid-cols-[1.3fr_1fr]">
        <div>
          <p className="small-caps mb-4">Project overview</p>
          <p className="max-w-2xl text-xl leading-relaxed text-foreground/90">{project.blurb}</p>
          <p className="mt-4 max-w-2xl leading-relaxed text-muted-foreground">{project.challenge.problem}</p>
        </div>
        <dl>
          <Meta label="Client" value={project.client} />
          <Meta label="Services" value={project.overview.services} />
          <Meta label="Year" value={String(project.year)} />
          <Meta label="Collaborators" value={project.overview.collaborators} />
          <Meta label="Duration" value={project.overview.duration} />
        </dl>
      </section>

      {/* ============ CHALLENGE ============ */}
      <section className="bg-foreground py-20 text-background">
        <div className="container-x grid gap-10 lg:grid-cols-[1fr_1.3fr]">
          <div>
            <h2 className="font-display text-huge font-medium leading-[1.1] tracking-tight">
              The <em className="text-accent">challenge</em>.
            </h2>
          </div>
          <div className="space-y-8">
            <p className="text-xl leading-relaxed text-background/85">{project.challenge.problem}</p>
            <ul className="space-y-3">
              {project.challenge.goals.map((g, i) => (
                <li key={i} className="flex items-start gap-4 border-b border-white/10 pb-3">
                  <span className="mt-1 font-display italic text-accent">0{i + 1}</span>
                  <span>{g}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* ============ PROCESS ============ */}
      <section className="container-x py-32">
        <div className="section-label">
          <span className="rule" />
          <span className="label">The process</span>
          <span className="rule" />
        </div>
        <h2 className="mt-3 max-w-3xl font-display text-huge font-medium leading-[1.1] tracking-tight">
          How it got made.
        </h2>
        <p className="mt-6 max-w-2xl text-lg text-muted-foreground">{project.processIntro}</p>

        <ol className="mt-16 space-y-20">
          {project.process.map((step, i) => (
            <li key={step.title}>
              <div
                className={`grid items-center gap-8 lg:grid-cols-2 ${
                  i % 2 === 1 ? 'lg:[&>*:first-child]:order-2' : ''
                }`}
              >
                <Artwork
                  seed={step.seed}
                  label={`Process ${String(i + 1).padStart(2, '0')}`}
                  className="w-full rounded-lg border border-border"
                />
                <div>
                  <p className="font-display text-lg italic text-accent">
                    Step {String(i + 1).padStart(2, '0')}
                  </p>
                  <h3 className="mt-2 font-display text-3xl font-semibold tracking-tight sm:text-4xl">
                    {step.title}
                  </h3>
                  <p className="mt-4 max-w-xl leading-relaxed text-foreground/85">{step.body}</p>
                  <p className="mt-3 font-mono text-xs uppercase tracking-[0.15em] text-muted-foreground">
                    {['Sketches', 'Wireframes', 'Concept boards', 'Iterations'][i % 4]} shown above
                  </p>
                </div>
              </div>
            </li>
          ))}
        </ol>
      </section>

      {/* ============ SOLUTION ============ */}
      <section className="border-y border-border bg-muted/50 py-32">
        <div className="container-x">
          <div className="section-label">
            <span className="rule" />
            <span className="label">The solution</span>
            <span className="rule" />
          </div>
          <h2 className="mt-3 max-w-3xl font-display text-huge font-medium leading-[1.1] tracking-tight">
            What shipped<span className="text-accent">.</span>
          </h2>
          <p className="mt-6 max-w-2xl text-lg text-muted-foreground">{project.solution.summary}</p>

          {project.solution.beforeAfter && (
            <div className="mx-auto mt-14 max-w-4xl">
              <BeforeAfter
                seedBefore={`${project.slug}-before`}
                seedAfter={`${project.slug}-after`}
                beforeLabel={project.solution.beforeAfter.beforeLabel}
                afterLabel={project.solution.beforeAfter.afterLabel}
              />
            </div>
          )}

          {/* Gallery */}
          <div className="mt-16 grid gap-6 md:grid-cols-2">
            {project.gallery.map((img, i) => (
              <figure key={img.seed} className={`group overflow-hidden rounded-lg border border-border bg-card ${i === 0 ? 'md:col-span-2' : ''}`}>
                <div className={i === 0 ? 'aspect-[21/9]' : 'aspect-[3/2]'}>
                  <Artwork seed={img.seed} label={project.title} className="h-full w-full transition-transform duration-500 group-hover:scale-[1.02]" />
                </div>
                <figcaption className="border-t border-border px-5 py-3 font-mono text-xs uppercase tracking-[0.15em] text-muted-foreground">
                  {img.caption}
                </figcaption>
              </figure>
            ))}
          </div>

          {/* Deliverables */}
          <div className="mt-14 rounded-lg border border-border bg-card p-8 shadow-sm sm:p-10">
            <h3 className="small-caps !text-accent">Deliverables</h3>
            <ul className="mt-5 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
              {project.solution.deliverables.map((d) => (
                <li key={d} className="flex items-start gap-3 border-t border-border pt-3 text-sm font-medium">
                  <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden className="mt-0.5 shrink-0 text-accent">
                    <path d="M2 8.5 L6 12 L14 4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                  {d}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* ============ RESULTS ============ */}
      <section className="container-x py-32">
        <div className="grid gap-12 lg:grid-cols-[1fr_1.2fr]">
          <div>
            <p className="small-caps mb-3">The results</p>
            <h2 className="font-display text-huge font-medium leading-[1.1] tracking-tight">
              Did it work?
            </h2>
            <p className="mt-6 text-lg leading-relaxed text-muted-foreground">{project.results.summary}</p>
          </div>
          <dl className="grid content-start gap-6 sm:grid-cols-3">
            {project.results.metrics.map((m) => (
              <div key={m.label} className="rounded-lg border border-border p-6 shadow-sm">
                <dt className="sr-only">{m.label}</dt>
                <dd className="font-display text-4xl font-semibold text-accent">{m.value}</dd>
                <dd className="mt-2 font-mono text-xs uppercase tracking-[0.15em] text-muted-foreground">{m.label}</dd>
              </div>
            ))}
          </dl>
        </div>
      </section>

      {/* ============ NEXT PROJECT ============ */}
      <Link to={`/work/${next.slug}`} className="group block border-t border-border transition-colors duration-200 hover:bg-foreground hover:text-background">
        <div className="container-x flex flex-col items-center py-20 text-center">
          <p className="small-caps !text-background/50">Next project</p>
          <h2 className="mt-4 font-display text-huge font-medium tracking-tight transition-colors duration-200 group-hover:text-accent">
            {next.title} <span className="inline-block transition-transform duration-200 group-hover:translate-x-3">→</span>
          </h2>
          <p className="mt-2 text-muted-foreground group-hover:text-background/70">{next.client} · {next.year}</p>
        </div>
      </Link>
    </article>
  )
}
