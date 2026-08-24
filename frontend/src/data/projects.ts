import { content } from './content'
import type { Category, Project } from '../types'

/**
 * Full case studies are optional — the Work grid is powered by Vanessa's live
 * GitHub repositories (src/lib/github.ts). If you author rich case studies,
 * add them to shared/content.json under "projects" and they light up here.
 */
export const projects: Project[] = content.projects ?? []

export const categories: ('All' | Category)[] = ['All', 'Branding', 'Web Design', 'Print', 'Motion']

export function getProject(slug: string): Project | undefined {
  return projects.find((p) => p.slug === slug)
}
