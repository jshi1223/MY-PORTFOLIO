import { content } from './content'
import type { Category, Project } from '../types'

export const projects: Project[] = content.projects

export const categories: ('All' | Category)[] = ['All', 'Branding', 'Web Design', 'Print', 'Motion']

export function getProject(slug: string): Project | undefined {
  return projects.find((p) => p.slug === slug)
}
