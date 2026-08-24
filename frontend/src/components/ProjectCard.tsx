import { Link } from 'react-router-dom'
import type { Project } from '../types'
import Artwork from './Artwork'

export default function ProjectCard({ project, index = 0 }: { project: Project; index?: number }) {
  return (
    <Link
      to={`/work/${project.slug}`}
      className="group block focus:outline-none"
      aria-label={`${project.client} — ${project.title}`}
    >
      <div className="relative overflow-hidden rounded-2xl border border-ink/15 bg-cream">
        <div className="aspect-[4/5] transition-transform duration-700 ease-out group-hover:scale-[1.04] sm:aspect-[3/2]">
          <Artwork
            seed={project.slug + '-' + (project.gallery[0]?.seed ?? 'cover')}
            label={project.title}
            className="h-full w-full"
          />
        </div>
        {/* Hover overlay */}
        <div className="absolute inset-0 flex flex-col justify-end bg-gradient-to-t from-ink/90 via-ink/40 to-transparent p-5 opacity-0 transition-opacity duration-300 group-hover:opacity-100 group-focus-visible:opacity-100">
          <p className="max-w-md text-sm leading-relaxed text-paper/90">{project.blurb}</p>
          <span className="mt-3 inline-flex w-fit items-center gap-2 rounded-full bg-accent px-4 py-2 text-xs font-bold uppercase tracking-widest text-paper">
            View Project
            <svg width="12" height="12" viewBox="0 0 12 12" fill="none" aria-hidden>
              <path d="M2 10 L10 2 M4 2 H10 V8" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </span>
        </div>
        <span className="absolute left-4 top-4 rounded-full border border-ink/15 bg-paper/85 px-3 py-1 text-[11px] font-bold uppercase tracking-widest backdrop-blur">
          {project.category}
        </span>
      </div>

      <div className="mt-4 flex items-start justify-between gap-4">
        <div>
          <h3 className="font-display text-xl font-semibold tracking-tight transition-colors group-hover:text-accent sm:text-2xl">
            {project.title}
            <span className="ml-1 inline-block font-body text-sm font-normal text-smoke">
              {String(index + 1).padStart(2, '0')}
            </span>
          </h3>
          <p className="text-sm text-smoke">{project.client}</p>
        </div>
        <span className="shrink-0 rounded-full border border-ink/20 px-3 py-1 text-xs font-semibold">{project.year}</span>
      </div>
    </Link>
  )
}
