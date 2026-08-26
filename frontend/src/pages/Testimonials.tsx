import { useState } from 'react'
import { Link } from 'react-router-dom'
import Avatar from '../components/Avatar'
import { content } from '../data/content'
import { getProject } from '../data/projects'
import { usePageTitle } from '../hooks/usePageTitle'

export default function Testimonials() {
  usePageTitle('Testimonials')
  const items = content.testimonials
  const [active, setActive] = useState(0)
  const t = items[active]
  const project = t.projectSlug ? getProject(t.projectSlug) : undefined

  return (
    <>
      <section className="container-x pb-14 pt-32 sm:pt-40">
        <p className="small-caps mb-3">Kind words</p>
        <h1 className="max-w-4xl font-display text-huge font-medium leading-[1.02] tracking-tight">
          Clients say it better than I could<span className="text-accent">.</span>
        </h1>
        <p className="mt-6 max-w-2xl text-lg text-muted-foreground">
          Real quotes from real projects — each one linked to the case study it came from.
        </p>
      </section>

      {/* Featured carousel */}
      <section className="container-x pb-16">
        <figure className="relative overflow-hidden rounded-lg border p-8 sm:p-14" style={{ borderColor: 'rgb(var(--border))', backgroundColor: 'rgb(var(--foreground))', color: 'rgb(var(--background))' }}>
          <span aria-hidden className="absolute -top-10 left-8 font-display text-[180px] leading-none text-accent/90 select-none">
            "
          </span>
          <blockquote className="relative max-w-3xl font-display text-2xl font-medium leading-snug tracking-tight sm:text-4xl" key={t.id}>
            {t.quote}
          </blockquote>
          <figcaption className="relative mt-10 flex flex-wrap items-center gap-5">
            <Avatar initials={t.initials} size="lg" />
            <div>
              <p className="font-medium">{t.name}</p>
              <p className="text-sm" style={{ color: 'rgb(var(--background) / 0.6)' }}>
                {t.role}, {t.company}
              </p>
            </div>
            {project && (
              <Link
                to={`/work/${project.slug}`}
                className="ml-auto rounded-md border px-5 py-2.5 font-mono text-xs font-medium uppercase tracking-wide transition-colors duration-200 hover:border-accent hover:bg-accent hover:text-white"
                style={{ borderColor: 'rgb(var(--background) / 0.2)' }}
              >
                View the project →
              </Link>
            )}
          </figcaption>

          {/* controls */}
          <div className="mt-12 flex items-center justify-between pt-6" style={{ borderTop: '1px solid rgb(var(--background) / 0.1)' }}>
            <div className="flex gap-2">
              {items.map((item, i) => (
                <button
                  key={item.id}
                  onClick={() => setActive(i)}
                  aria-label={`Show testimonial ${i + 1} of ${items.length}`}
                  className="h-2 rounded-full transition-all duration-200"
                  style={{
                    width: i === active ? '32px' : '8px',
                    backgroundColor: i === active ? 'rgb(var(--accent))' : 'rgb(var(--background) / 0.3)',
                  }}
                />
              ))}
            </div>
            <div className="flex gap-3">
              <button
                onClick={() => setActive((active - 1 + items.length) % items.length)}
                aria-label="Previous testimonial"
                className="flex h-11 w-11 items-center justify-center rounded-md border transition-colors duration-200 hover:border-accent hover:bg-accent hover:text-white"
                style={{ borderColor: 'rgb(var(--background) / 0.2)' }}
              >
                ←
              </button>
              <button
                onClick={() => setActive((active + 1) % items.length)}
                aria-label="Next testimonial"
                className="flex h-11 w-11 items-center justify-center rounded-md border transition-colors duration-200 hover:border-accent hover:bg-accent hover:text-white"
                style={{ borderColor: 'rgb(var(--background) / 0.2)' }}
              >
                →
              </button>
            </div>
          </div>
        </figure>
      </section>

      {/* Grid of all */}
      <section className="container-x grid gap-6 pb-32 md:grid-cols-2 lg:grid-cols-3">
        {items.map((item) => {
          const proj = item.projectSlug ? getProject(item.projectSlug) : undefined
          return (
            <figure key={item.id} className="flex h-full flex-col rounded-lg border border-border bg-card p-7 shadow-sm transition-shadow duration-200 hover:shadow-md">
              <span aria-hidden className="font-display text-5xl leading-none text-accent">
                "
              </span>
              <blockquote className="mt-2 flex-1 leading-relaxed">{item.quote}</blockquote>
              <figcaption className="mt-6 flex items-center gap-3 border-t border-border pt-5">
                <Avatar initials={item.initials} />
                <div>
                  <p className="text-sm font-medium">{item.name}</p>
                  <p className="text-xs text-muted-foreground">
                    {item.role}, {item.company}
                  </p>
                </div>
                {proj && (
                  <Link
                    to={`/work/${proj.slug}`}
                    className="ml-auto rounded-md border px-3 py-1 font-mono text-[11px] font-medium uppercase tracking-wide transition-colors duration-200 hover:bg-foreground hover:text-background"
                    style={{ borderColor: 'rgb(var(--border))' }}
                    aria-label={`View ${proj.client} project`}
                  >
                    Project ↗
                  </Link>
                )}
              </figcaption>
            </figure>
          )
        })}
      </section>
    </>
  )
}
