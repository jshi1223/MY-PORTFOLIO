import { content } from '../data/content'
import { projects } from '../data/projects'
import type { Post, Project, Testimonial } from '../types'

/**
 * The frontend reads from the Laravel API when it is running and silently
 * falls back to bundled content otherwise — so the site works in every
 * environment (static hosting included).
 */
const API_BASE: string = (import.meta.env.VITE_API_URL as string | undefined) ?? ''

async function tryFetch<T>(path: string, shape: (json: unknown) => T): Promise<T | null> {
  if (!API_BASE && !import.meta.env.DEV) return null
  try {
    const res = await fetch(`${API_BASE}/api${path}`, { headers: { Accept: 'application/json' } })
    if (!res.ok) return null
    return shape(await res.json())
  } catch {
    return null
  }
}

const mapProject = (p: Record<string, unknown>): Project => p as unknown as Project

export async function fetchProjects(): Promise<Project[]> {
  const list = await tryFetch<Record<string, unknown>[]>('/projects', (j) => (Array.isArray(j) ? j : (j as { data?: Record<string, unknown>[] })?.data ?? []))
  return list && list.length ? list.map(mapProject) : projects
}

export async function fetchProject(slug: string): Promise<Project | undefined> {
  const p = await tryFetch<Record<string, unknown> | null>(`/projects/${slug}`, (j) =>
    j && typeof j === 'object' ? ((j as { data?: Record<string, unknown> }).data ?? (j as Record<string, unknown>)) : null,
  )
  return p ? mapProject(p) : getFallbackProject(slug)
}

function getFallbackProject(slug: string): Project | undefined {
  return projects.find((p) => p.slug === slug)
}

export async function fetchTestimonials(): Promise<Testimonial[]> {
  const list = await tryFetch<Record<string, unknown>[]>('/testimonials', (j) => (Array.isArray(j) ? j : (j as { data?: Record<string, unknown>[] })?.data ?? []))
  return list && list.length ? (list as unknown as Testimonial[]) : content.testimonials
}

export async function fetchPosts(): Promise<Post[]> {
  const list = await tryFetch<Record<string, unknown>[]>('/posts', (j) => (Array.isArray(j) ? j : (j as { data?: Record<string, unknown>[] })?.data ?? []))
  return list && list.length ? (list as unknown as Post[]) : content.posts
}

export async function fetchPost(slug: string): Promise<Post | undefined> {
  const list = await fetchPosts()
  return list.find((p) => p.slug === slug)
}

export interface InquiryPayload {
  name: string
  email: string
  company?: string
  budget: string
  timeline: string
  project_type: string
  description: string
}

export interface InquiryResult {
  ok: boolean
  message: string
}

export async function sendInquiry(payload: InquiryPayload): Promise<InquiryResult> {
  try {
    const res = await fetch(`${API_BASE}/api/inquiries`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
      body: JSON.stringify(payload),
    })
    const json = await res.json().catch(() => ({}))
    if (res.status === 422) {
      const first = json?.errors ? Object.values(json.errors)[0] : null
      return { ok: false, message: Array.isArray(first) ? String(first[0]) : 'Please double-check the highlighted fields.' }
    }
    if (!res.ok) throw new Error('bad status')
    return { ok: true, message: json?.message ?? "Got it! I'll reply within one business day." }
  } catch {
    // Backend offline — open a prefilled email instead so the lead is never lost.
    const body = [
      `Name: ${payload.name}`,
      `Email: ${payload.email}`,
      `Company: ${payload.company || '—'}`,
      `Budget: ${payload.budget}`,
      `Timeline: ${payload.timeline}`,
      `Project type: ${payload.project_type}`,
      '',
      payload.description,
    ].join('\n')
    window.location.href = `mailto:${content.profile.email}?subject=${encodeURIComponent(
      `New project inquiry — ${payload.name}`,
    )}&body=${encodeURIComponent(body)}`
    return { ok: true, message: 'Opening your email app so your inquiry reaches me directly.' }
  }
}
