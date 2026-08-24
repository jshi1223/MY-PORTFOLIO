import { useMemo, useState } from 'react'
import ProjectCard from '../components/ProjectCard'
import Reveal from '../components/Reveal'
import { projects } from '../data/projects'
import { usePageTitle } from '../hooks/usePageTitle'
import { CATEGORIES } from '../types'

type Filter = (typeof CATEGORIES)[number]

export default function Work() {
  usePageTitle('Work')
  const [filter, setFilter] = useState<Filter>('All')

  const filtered = useMemo(
    () => (filter === 'All' ? projects : projects.filter((p) => p.category === filter)),
    [filter],
  )

  return (
    <>
      <section className="container-x pb-12 pt-32 sm:pt-40">
        <Reveal>
          <p className="eyebrow">The work</p>
          <h1 className="mt-3 max-w-4xl font-display text-huge font-semibold leading-[0.95] tracking-tightest">
            Brands with receipts<span className="text-accent">.</span>
          </h1>
          <p className="mt-6 max-w-2xl text-lg text-smoke">
            Eight projects I'm proud of, across identity, web, print, and motion. Hover any card for the
            short version — click for the full story.
          </p>
        </Reveal>

        {/* Filters */}
        <Reveal delay={150}>
          <div className="mt-10 flex flex-wrap gap-2" role="tablist" aria-label="Filter projects by category">
            {CATEGORIES.map((c) => (
              <button
                key={c}
                role="tab"
                aria-selected={filter === c}
                onClick={() => setFilter(c)}
                className={`rounded-full border px-5 py-2.5 text-xs font-bold uppercase tracking-widest transition-all duration-300 ${
                  filter === c
                    ? 'border-accent bg-accent text-paper'
                    : 'border-ink/25 bg-transparent text-ink hover:border-ink hover:bg-ink hover:text-paper'
                }`}
              >
                {c}
                <span className="ml-2 opacity-60">
                  {c === 'All' ? projects.length : projects.filter((p) => p.category === c).length}
                </span>
              </button>
            ))}
          </div>
        </Reveal>
      </section>

      <section className="container-x pb-24">
        <div key={filter} className="grid gap-x-8 gap-y-14 sm:grid-cols-2">
          {filtered.map((project, i) => (
            <div key={project.slug} className="rise" style={{ animationDelay: `${i * 80}ms` }}>
              <ProjectCard project={project} index={projects.indexOf(project)} />
            </div>
          ))}
        </div>

        {filtered.length === 0 && (
          <p className="py-20 text-center text-lg text-smoke">Nothing here yet — check back soon!</p>
        )}
      </section>
    </>
  )
}
