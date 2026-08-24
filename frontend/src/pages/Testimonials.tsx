import { useState } from 'react'
import { Link } from 'react-router-dom'
import Avatar from '../components/Avatar'
import Reveal from '../components/Reveal'
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
        <Reveal>
          <p className="eyebrow">Kind words</p>
          <h1 className="mt-3 max-w-4xl font-display text-huge font-semibold leading-[0.95] tracking-tightest">
            Clients say it better than I could<span className="text-accent">.</span>
          </h1>
          <p className="mt-6 max-w-2xl text-lg text-smoke">
            Real quotes from real projects — each one linked to the case study it came from.
          </p>
        </Reveal>
      </section>

      {/* Featured carousel */}
      <section className="container-x pb-16">
        <Reveal>
          <figure className="relative overflow-hidden rounded-3xl border border-ink/15 bg-ink p-8 text-paper sm:p-14">
            <span aria-hidden className="absolute -top-10 left-8 font-display text-[180px] leading-none text-accent/90 select-none">
              “
            </span>
            <blockquote className="relative max-w-3xl font-display text-2xl font-medium leading-snug tracking-tight sm:text-4xl" key={t.id}>
              {t.quote}
            </blockquote>
            <figcaption className="relative mt-10 flex flex-wrap items-center gap-5">
              <Avatar initials={t.initials} size="lg" />
              <div>
                <p className="font-semibold">{t.name}</p>
                <p className="text-sm text-paper/70">
                  {t.role}, {t.company}
                </p>
              </div>
              {project && (
                <Link
                  to={`/work/${project.slug}`}
                  className="ml-auto rounded-full border border-paper/30 px-5 py-2.5 text-xs font-bold uppercase tracking-widest transition-colors hover:border-accent hover:bg-accent"
                >
                  View the project →
                </Link>
              )}
            </figcaption>

            {/* controls */}
            <div className="mt-12 flex items-center justify-between border-t border-paper/15 pt-6">
              <div className="flex gap-2">
                {items.map((item, i) => (
                  <button
                    key={item.id}
                    onClick={() => setActive(i)}
                    aria-label={`Show testimonial ${i + 1} of ${items.length}`}
                    className={`h-2 rounded-full transition-all duration-300 ${
                      i === active ? 'w-8 bg-accent' : 'w-2 bg-paper/40 hover:bg-paper'
                    }`}
                  />
                ))}
              </div>
              <div className="flex gap-3">
                <button
                  onClick={() => setActive((active - 1 + items.length) % items.length)}
                  aria-label="Previous testimonial"
                  className="flex h-11 w-11 items-center justify-center rounded-full border border-paper/30 transition-colors hover:bg-accent hover:border-accent"
                >
                  ←
                </button>
                <button
                  onClick={() => setActive((active + 1) % items.length)}
                  aria-label="Next testimonial"
                  className="flex h-11 w-11 items-center justify-center rounded-full border border-paper/30 transition-colors hover:bg-accent hover:border-accent"
                >
                  →
                </button>
              </div>
            </div>
          </figure>
        </Reveal>
      </section>

      {/* Grid of all */}
      <section className="container-x grid gap-6 pb-24 md:grid-cols-2 lg:grid-cols-3">
        {items.map((item, i) => {
          const proj = item.projectSlug ? getProject(item.projectSlug) : undefined
          return (
            <Reveal key={item.id} delay={(i % 3) * 100}>
              <figure className="flex h-full flex-col rounded-2xl border border-ink/15 bg-paper p-7 transition-all duration-300 hover:-translate-y-1 hover:shadow-[6px_6px_0_0_#17130E]">
                <span aria-hidden className="font-display text-5xl leading-none text-accent">
                  “
                </span>
                <blockquote className="mt-2 flex-1 leading-relaxed">{item.quote}</blockquote>
                <figcaption className="mt-6 flex items-center gap-3 border-t border-ink/15 pt-5">
                  <Avatar initials={item.initials} />
                  <div>
                    <p className="text-sm font-semibold">{item.name}</p>
                    <p className="text-xs text-smoke">
                      {item.role}, {item.company}
                    </p>
                  </div>
                  {proj && (
                    <Link
                      to={`/work/${proj.slug}`}
                      className="ml-auto rounded-full border border-ink/20 px-3 py-1 text-[11px] font-bold uppercase tracking-widest transition-colors hover:bg-ink hover:text-paper"
                      aria-label={`View ${proj.client} project`}
                    >
                      Project ↗
                    </Link>
                  )}
                </figcaption>
              </figure>
            </Reveal>
          )
        })}
      </section>
    </>
  )
}
