export type Category = 'Branding' | 'Web Design' | 'Print' | 'Motion'

export interface ProcessStep {
  title: string
  body: string
  seed: string
}

export interface Project {
  slug: string
  title: string
  client: string
  year: number
  category: Category
  tags: string[]
  blurb: string
  featured: boolean
  overview: {
    services: string[]
    collaborators: string[]
    duration: string
  }
  challenge: {
    problem: string
    goals: string[]
  }
  processIntro: string
  process: ProcessStep[]
  solution: {
    summary: string
    deliverables: string[]
    beforeAfter?: { beforeLabel: string; afterLabel: string }
  }
  results: {
    summary: string
    metrics: { value: string; label: string }[]
  }
  gallery: { seed: string; caption: string }[]
}

export interface Profile {
  brand: string
  name: string
  role: string
  headline: string
  intro: string
  email: string
  phone: string
  phoneRaw: string
  location: string
  availability: string
  github: string
  instagram: string
  behance: string
  calendly: string
}

export interface PressItem {
  source: string
  title: string
  year: string
}

export interface ProcessStepInfo {
  step: string
  title: string
  body: string
}

export interface Service {
  slug: string
  name: string
  tagline: string
  includes: string[]
  price: string
  timeline: string
}

export interface Faq {
  q: string
  a: string
}

export interface Testimonial {
  id: number
  quote: string
  name: string
  role: string
  company: string
  initials: string
  projectSlug: string | null
}

export interface PostBlock {
  h: string | null
  p: string[]
}

export interface Post {
  slug: string
  title: string
  category: string
  date: string
  readTime: string
  excerpt: string
  blocks: PostBlock[]
}

export interface Content {
  profile: Profile
  clients: string[]
  press: PressItem[]
  processSteps: ProcessStepInfo[]
  services: Service[]
  faqs: Faq[]
  testimonials: Testimonial[]
  posts: Post[]
  projects: Project[]
}

export const CATEGORIES = ['All', 'Branding', 'Web Design', 'Print', 'Motion'] as const

export const BUDGET_RANGES = ['Under $500', '$500 – $1,000', '$1,000 – $2,500', '$2,500 – $5,000', '$5,000+']

export const TIMELINES = ['ASAP — yesterday ideally', 'Within a month', '1–3 months', 'Flexible / planning ahead']

export const PROJECT_TYPES = [
  'Brand Identity',
  'Website Design',
  'Social Media Design',
  'Print Collateral',
  'Packaging Design',
  'Something else / not sure yet',
]
