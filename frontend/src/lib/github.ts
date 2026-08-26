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

export type RepoType = 'Web' | 'Mobile' | 'Desktop' | 'Other'

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
      if (a.fork !== b.fork) return a.fork ? 1 : -0
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
  Kotlin: '#A97BFF',
  Swift: '#F05138',
  Rust: '#DEA584',
  Ruby: '#701516',
  Go: '#00ADD8',
  'Objective-C': '#438EFF',
  Lua: '#000080',
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

/** Classify a repo as Web, Mobile, Desktop, or Other based on language & topics. */
export function classifyRepo(repo: GithubRepo): RepoType {
  const lang = (repo.language ?? '').toLowerCase()
  const topics = repo.topics.map((t) => t.toLowerCase())
  const name = repo.name.toLowerCase()

  // Mobile detection
  if (['dart', 'swift', 'kotlin', 'objective-c'].includes(lang)) return 'Mobile'
  if (topics.some((t) => ['react-native', 'flutter', 'android', 'ios', 'mobile'].includes(t))) return 'Mobile'
  if (name.includes('react-native') || name.includes('flutter') || name.includes('-app') && !name.includes('web')) return 'Mobile'

  // Desktop detection
  if (['c#', 'c++'].includes(lang) && topics.some((t) => ['desktop', 'wpf', 'winforms', 'gui'].includes(t))) return 'Desktop'
  if (topics.some((t) => ['electron', 'tauri', 'desktop', 'gui'].includes(t))) return 'Desktop'
  if (name.includes('electron') || name.includes('tauri') || name.includes('desktop')) return 'Desktop'

  // Web detection
  if (['html', 'css', 'php', 'ruby'].includes(lang)) return 'Web'
  if (topics.some((t) => ['react', 'nextjs', 'vue', 'angular', 'web', 'frontend', 'website'].includes(t))) return 'Web'
  if (name.includes('web') || name.includes('nextjs') || name.includes('react-app')) return 'Web'

  // Default: if it's JS/TS, assume web
  if (['javascript', 'typescript'].includes(lang)) return 'Web'

  return 'Other'
}

/** Fetch README content for a repo (first 300 chars of raw markdown). */
const readmeCache = new Map<string, string>()

export async function fetchReadme(repoName: string): Promise<string> {
  if (readmeCache.has(repoName)) return readmeCache.get(repoName)!
  try {
    const res = await fetch(
      `https://raw.githubusercontent.com/jshi1223/${repoName}/main/README.md`,
      { headers: { Accept: 'text/plain' } },
    )
    if (!res.ok) {
      // Try master branch
      const res2 = await fetch(
        `https://raw.githubusercontent.com/jshi1223/${repoName}/master/README.md`,
        { headers: { Accept: 'text/plain' } },
      )
      if (!res2.ok) return ''
      const text = await res2.text()
      const clean = cleanReadme(text)
      readmeCache.set(repoName, clean)
      return clean
    }
    const text = await res.text()
    const clean = cleanReadme(text)
    readmeCache.set(repoName, clean)
    return clean
  } catch {
    return ''
  }
}

/** Strip markdown syntax and truncate to a short blurb. */
function cleanReadme(raw: string): string {
  return raw
    .replace(/^#{1,6}\s+/gm, '')       // headings
    .replace(/\[([^\]]+)\]\([^)]+\)/g, '$1') // links → text
    .replace(/!\[([^\]]*)\]\([^)]+\)/g, '')  // images → remove
    .replace(/```[\s\S]*?```/g, '')           // code blocks → remove
    .replace(/`([^`]+)`/g, '$1')              // inline code → text
    .replace(/[*_~>]+/g, '')                  // emphasis markers
    .replace(/\n{2,}/g, '\n')                 // collapse newlines
    .trim()
    .slice(0, 300)                            // truncate
}
