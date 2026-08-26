import { useMemo, useState } from 'react'
import { RepoCard, useRepos } from '../components/RepoCard'
import { langColor } from '../lib/github'
import { usePageTitle } from '../hooks/usePageTitle'

export default function Work() {
  usePageTitle('Work')
  const repos = useRepos()
  const [filter, setFilter] = useState<string>('All')

  const languages = useMemo(() => {
    const counts = new Map<string, number>()
    repos.forEach((r) => {
      const key = r.language ?? 'Other'
      counts.set(key, (counts.get(key) ?? 0) + 1)
    })
    return ['All', ...[...counts.entries()].sort((a, b) => b[1] - a[1]).map(([l]) => l)]
  }, [repos])

  const filtered = useMemo(
    () => (filter === 'All' ? repos : repos.filter((r) => (r.language ?? 'Other') === filter)),
    [repos, filter],
  )

  return (
    <>
      <section className="container-x pb-12 pt-32 sm:pt-40">
        <p className="small-caps mb-3">The work</p>
        <h1 className="max-w-4xl font-display text-huge font-medium leading-[1.02] tracking-tight">
          Code with receipts<span className="text-accent">.</span>
        </h1>
        <p className="mt-6 max-w-2xl text-lg text-muted-foreground">
          Every public repository from my GitHub ({' '}
          <a
            href="https://github.com/jshi1223?tab=repositories"
            target="_blank"
            rel="noreferrer"
            className="link-underline font-medium text-accent"
          >
            github.com/jshi1223
          </a>{' '}
          ) — synced live, so this page is always up to date. Hover a card for the details.
        </p>

        {/* Filters */}
        <div className="mt-10 flex flex-wrap gap-2" role="tablist" aria-label="Filter projects by language">
          {languages.map((lang) => (
            <button
              key={lang}
              role="tab"
              aria-selected={filter === lang}
              onClick={() => setFilter(lang)}
              className={`flex items-center gap-2 rounded-md border px-5 py-2.5 font-mono text-xs font-medium uppercase tracking-wide transition-all duration-200 ${
                filter === lang
                  ? 'border-accent bg-accent text-white'
                  : 'border-border bg-transparent text-foreground hover:border-foreground hover:bg-foreground hover:text-background'
              }`}
            >
              {lang !== 'All' && (
                <span className="h-2 w-2 rounded-full" style={{ backgroundColor: langColor(lang === 'Other' ? null : lang) }} />
              )}
              {lang}
              <span className="opacity-60">
                {lang === 'All' ? repos.length : repos.filter((r) => (r.language ?? 'Other') === lang).length}
              </span>
            </button>
          ))}
        </div>
      </section>

      <section className="container-x pb-32">
        <div key={filter} className="grid gap-x-8 gap-y-14 sm:grid-cols-2">
          {filtered.map((repo, i) => (
            <RepoCard key={repo.name} repo={repo} index={i} />
          ))}
        </div>

        {filtered.length === 0 && (
          <p className="py-20 text-center text-lg text-muted-foreground">Nothing here yet — check back soon!</p>
        )}

        <div className="mt-20 rounded-lg border border-dashed border-border p-10 text-center">
          <h2 className="font-display text-3xl font-semibold tracking-tight">Want the raw source?</h2>
          <p className="mx-auto mt-3 max-w-xl text-muted-foreground">
            Everything above lives on my GitHub — star what you like, read the code, open an issue.
          </p>
          <a href="https://github.com/jshi1223" target="_blank" rel="noreferrer" className="btn-solid mt-6">
            Follow @jshi1223 on GitHub ↗
          </a>
        </div>
      </section>
    </>
  )
}
