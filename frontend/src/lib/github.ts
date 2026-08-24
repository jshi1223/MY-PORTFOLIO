export interface GithubRepo {
  name: string
  html_url: string
  description: string | null
  language: string | null
  topics: string[]
  fork: boolean
  stargazers_count: number
  created_at: string
  pushed_at: string
  homepage: string | null
}

import raw from '../data/github-snapshot.json'
import { content } from '../data/content'

const SNAPSHOT = raw as GithubRepo[]
const PROFILE_REPO = 'jshi1223' // special GitHub profile repo — not a project

/**
 * Live repos from the public GitHub API, with a bundled snapshot as fallback
 * (covers rate limits and offline builds). Forks sink to the bottom.
 */
export async function fetchRepos(): Promise<GithubRepo[]> {
  try {
    const res = await fetch('https://api.github.com/users/jshi1223/repos?per_page=100&sort=pushed', {
      headers: { Accept: 'application/vnd.github+json' },
    })
    if (!res.ok) throw new Error(`GitHub API ${res.status}`)
    const list = (await res.json()) as GithubRepo[]
    if (!Array.isArray(list) || list.length === 0) throw new Error('empty response')
    return sortRepos(list)
  } catch {
    return sortRepos(SNAPSHOT)
  }
}

export function sortRepos(repos: GithubRepo[]): GithubRepo[] {
  return [...repos]
    .filter((r) => r.name !== PROFILE_REPO)
    .sort((a, b) => {
      if (a.fork !== b.fork) return a.fork ? 1 : -1
      return (b.pushed_at ?? '').localeCompare(a.pushed_at ?? '')
    })
}

export function repoYear(repo: GithubRepo): number {
  return new Date(repo.created_at || Date.now()).getFullYear()
}

const LANG_COLORS: Record<string, string> = {
  TypeScript: '#3178c6',
  JavaScript: '#f1e05a',
  'C#': '#178600',
  Python: '#3572A5',
  'C++': '#f34b7d',
  HTML: '#e34c26',
  CSS: '#563d7c',
  Java: '#b07219',
  PHP: '#4F5D95',
  Dart: '#00B4AB',
}

export function langColor(language: string | null): string {
  return (language && LANG_COLORS[language]) || '#6B6255'
}

/** Availability blurb used on cards when a repo has no description. */
export function repoBlurb(repo: GithubRepo): string {
  if (repo.description) return repo.description
  const bits = [repo.language, ...repo.topics].filter(Boolean)
  return bits.length ? `${bits.join(' · ')} — source code on GitHub.` : content.profile.role + "'s open-source work on GitHub."
}
