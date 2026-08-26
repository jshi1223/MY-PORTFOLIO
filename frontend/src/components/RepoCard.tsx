import { useEffect, useState } from 'react'
import Artwork from './Artwork'
import { fetchRepos, langColor, repoBlurb, repoYear, sortRepos, classifyRepo, fetchReadme, type GithubRepo, type RepoType } from '../lib/github'
import snapshot from '../data/github-snapshot.json'

export function RepoCard({ repo, index = 0 }: { repo: GithubRepo; index?: number }) {
  const year = repoYear(repo)
  const type = classifyRepo(repo)
  const [readme, setReadme] = useState('')

  useEffect(() => {
    fetchReadme(repo.name).then(setReadme)
  }, [repo.name])

  const typeLabel: Record<RepoType, string> = {
    Web: 'Web',
    Mobile: 'Mobile',
    Desktop: 'Desktop',
    Other: 'Code',
  }

  return (
    <a
      href={repo.html_url}
      target="_blank"
      rel="noreferrer"
      className="group block focus:outline-none"
      aria-label={`${repo.name} on GitHub`}
    >
      <div className="relative overflow-hidden rounded-lg border border-border bg-card shadow-sm transition-shadow duration-200 group-hover:shadow-md">
        <div className="aspect-[4/5] sm:aspect-[3/2]">
          <Artwork seed={`repo-${repo.name}`} label={repo.language ?? 'code'} className="h-full w-full" />
        </div>
        {/* Hover overlay */}
        <div className="absolute inset-0 flex flex-col justify-end bg-gradient-to-t from-foreground/90 via-foreground/40 to-transparent p-5 opacity-0 transition-opacity duration-200 group-hover:opacity-100 group-focus-visible:opacity-100">
          <p className="line-clamp-3 max-w-md text-sm leading-relaxed text-background/90">{repoBlurb(repo)}</p>
          <span className="mt-3 inline-flex w-fit items-center gap-2 rounded-md bg-accent px-4 py-2 text-xs font-medium uppercase tracking-wide text-white">
            View on GitHub
            <svg width="12" height="12" viewBox="0 0 12 12" fill="none" aria-hidden>
              <path d="M2 10 L10 2 M4 2 H10 V8" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </span>
        </div>
        <span
          className="absolute left-4 top-4 flex items-center gap-1.5 rounded-md border border-border bg-background/85 px-3 py-1 text-[11px] font-medium uppercase tracking-wide backdrop-blur"
          title={repo.language ?? 'Unknown language'}
        >
          <span className="h-2 w-2 rounded-full" style={{ backgroundColor: langColor(repo.language) }} />
          {repo.language ?? 'Code'}
        </span>
        <span className="absolute right-4 top-4 rounded-md border border-border bg-background/85 px-3 py-1 text-[11px] font-medium uppercase tracking-wide backdrop-blur">
          {typeLabel[type]}
        </span>
        {repo.fork && (
          <span className="absolute right-4 top-12 rounded-md border border-border bg-background/85 px-3 py-1 text-[11px] font-medium uppercase tracking-wide backdrop-blur">
            Fork
          </span>
        )}
      </div>

      <div className="mt-4 flex items-start justify-between gap-4">
        <div className="flex-1">
          <h3 className="font-display text-xl font-semibold tracking-tight transition-colors group-hover:text-accent sm:text-2xl">
            {repo.name}
            <span className="ml-1 inline-block font-mono text-sm font-normal text-muted-foreground">
              {String(index + 1).padStart(2, '0')}
            </span>
          </h3>
          {readme ? (
            <p className="mt-1 line-clamp-2 text-sm leading-relaxed text-muted-foreground">{readme}</p>
          ) : (
            <p className="mt-1 line-clamp-1 text-sm text-muted-foreground">{repo.description ?? '\u00A0'}</p>
          )}
        </div>
        <span className="flex shrink-0 items-center gap-2 text-sm font-medium">
          <svg width="14" height="14" viewBox="0 0 16 16" fill="currentColor" aria-label="stars" className="text-accent">
            <path d="M8 .25a.75.75 0 01.673.418l1.882 3.815 4.21.612a.75.75 0 01.416 1.279l-3.046 2.97.719 4.192a.75.75 0 01-1.088.791L8 12.347l-3.766 1.98a.75.75 0 01-1.088-.79l.72-4.194L.818 6.374a.75.75 0 01.416-1.28l4.21-.611L7.327.668A.75.75 0 018 .25z" />
          </svg>
          {repo.stargazers_count}
          <span className="rounded-md border border-border px-3 py-1 text-xs">{year}</span>
        </span>
      </div>
    </a>
  )
}

/** Instant paint from snapshot, then silently refresh from the live API. */
export function useRepos(): GithubRepo[] {
  const [repos, setRepos] = useState<GithubRepo[]>(() => sortRepos(snapshot as GithubRepo[]))
  useEffect(() => {
    let alive = true
    fetchRepos().then((r) => alive && setRepos(r))
    return () => {
      alive = false
    }
  }, [])
  return repos
}
