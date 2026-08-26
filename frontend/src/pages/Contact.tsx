import { useMemo, useState, type FormEvent } from 'react'
import { useSearchParams } from 'react-router-dom'
import { content } from '../data/content'
import { sendInquiry } from '../lib/api'
import { usePageTitle } from '../hooks/usePageTitle'
import { BUDGET_RANGES, PROJECT_TYPES, TIMELINES } from '../types'

function Faq({ q, a }: { q: string; a: string }) {
  const [open, setOpen] = useState(false)
  return (
    <div className="card-line">
      <button
        onClick={() => setOpen(!open)}
        aria-expanded={open}
        className="flex w-full items-center justify-between gap-4 py-5 text-left"
      >
        <span className="font-display text-xl font-semibold tracking-tight">{q}</span>
        <span
          className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-md border text-lg transition-all duration-200 ${
            open ? 'rotate-45 border-accent bg-accent text-white' : 'border-border'
          }`}
          aria-hidden
        >
          +
        </span>
      </button>
      <div
        className={`grid transition-all duration-200 ${open ? 'grid-rows-[1fr] pb-6 opacity-100' : 'grid-rows-[0fr] opacity-0'}`}
      >
        <p className="overflow-hidden leading-relaxed text-muted-foreground">{a}</p>
      </div>
    </div>
  )
}

const inputCls =
  'w-full rounded-md border border-border bg-card px-4 py-3 text-[15px] transition-colors duration-200 placeholder:text-muted-foreground/60 focus:border-accent focus:outline-none focus:ring-2 focus:ring-accent/20'

export default function Contact() {
  usePageTitle("Let's create something together")
  const p = content.profile
  const [params] = useSearchParams()
  const preselected = params.get('service')

  const [form, setForm] = useState({
    name: '',
    email: '',
    company: '',
    budget: '',
    timeline: '',
    project_type: PROJECT_TYPES.find((t) => t === preselected) ?? '',
    description: '',
  })
  const [status, setStatus] = useState<'idle' | 'sending' | 'sent' | 'error'>('idle')
  const [message, setMessage] = useState('')

  const calendlySrc = useMemo(() => `${p.calendly}?hide_gdpr_banner=1&background_color=FAFAF8&text_color=1A1A1A&primary_color=B8860B`, [p.calendly])

  const set = (key: keyof typeof form) => (e: { target: { value: string } }) =>
    setForm((f) => ({ ...f, [key]: e.target.value }))

  async function onSubmit(e: FormEvent) {
    e.preventDefault()
    setStatus('sending')
    const result = await sendInquiry(form)
    setMessage(result.message)
    setStatus(result.ok ? 'sent' : 'error')
    if (result.ok && !result.message.includes('email')) {
      setForm({ name: '', email: '', company: '', budget: '', timeline: '', project_type: '', description: '' })
    }
  }

  return (
    <>
      {/* ============ HEADER ============ */}
      <section className="container-x pb-16 pt-32 sm:pt-40">
        <p className="small-caps mb-3">Contact</p>
        <h1 className="max-w-5xl font-display text-huge font-medium leading-[1.02] tracking-tight">
          Let's create something{' '}
          <em className="not-italic text-accent">together</em>.
        </h1>
        <p className="mt-6 max-w-2xl text-lg text-muted-foreground">
          Tell me about your project below, or skip the form and grab a call slot directly. I reply to
          every serious inquiry within one business day — usually faster, unless the cats are on the keyboard.
        </p>
      </section>

      {/* ============ FORM + INFO ============ */}
      <section className="container-x grid gap-12 pb-32 lg:grid-cols-[1.35fr_1fr]">
        <form onSubmit={onSubmit} className="rounded-lg border border-border bg-muted p-7 shadow-sm sm:p-10" noValidate={false}>
          <h2 className="font-display text-3xl font-semibold tracking-tight">Project inquiry</h2>
          <p className="mt-2 text-sm text-muted-foreground">
            Fields marked * are required. The more detail, the better my first reply.
          </p>

          <div className="mt-8 grid gap-5 sm:grid-cols-2">
            <label className="block">
              <span className="small-caps mb-2 block">Name *</span>
              <input required type="text" value={form.name} onChange={set('name')} placeholder="Juan dela Cruz" className={inputCls} />
            </label>
            <label className="block">
              <span className="small-caps mb-2 block">Email *</span>
              <input required type="email" value={form.email} onChange={set('email')} placeholder="you@company.com" className={inputCls} />
            </label>
            <label className="block sm:col-span-2">
              <span className="small-caps mb-2 block">Company / brand</span>
              <input type="text" value={form.company} onChange={set('company')} placeholder="Optional but helpful" className={inputCls} />
            </label>
            <label className="block">
              <span className="small-caps mb-2 block">Budget range *</span>
              <select required value={form.budget} onChange={set('budget')} className={inputCls}>
                <option value="" disabled>
                  Select a range…
                </option>
                {BUDGET_RANGES.map((b) => (
                  <option key={b} value={b}>
                    {b}
                  </option>
                ))}
              </select>
            </label>
            <label className="block">
              <span className="small-caps mb-2 block">Timeline *</span>
              <select required value={form.timeline} onChange={set('timeline')} className={inputCls}>
                <option value="" disabled>
                  When do you need it?
                </option>
                {TIMELINES.map((t) => (
                  <option key={t} value={t}>
                    {t}
                  </option>
                ))}
              </select>
            </label>
            <label className="block sm:col-span-2">
              <span className="small-caps mb-2 block">Project type *</span>
              <select required value={form.project_type} onChange={set('project_type')} className={inputCls}>
                <option value="" disabled>
                  What are we making?
                </option>
                {PROJECT_TYPES.map((t) => (
                  <option key={t} value={t}>
                    {t}
                  </option>
                ))}
              </select>
            </label>
            <label className="block sm:col-span-2">
              <span className="small-caps mb-2 block">Project description *</span>
              <textarea
                required
                rows={6}
                value={form.description}
                onChange={set('description')}
                placeholder="What are you building, who is it for, and what does success look like? Links to anything relevant are welcome."
                className={`${inputCls} resize-y`}
              />
            </label>
          </div>

          <button type="submit" disabled={status === 'sending'} className="btn-solid mt-8 w-full disabled:opacity-60 sm:w-auto">
            {status === 'sending' ? 'Sending…' : 'Send Inquiry'}
            {status !== 'sending' && (
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden>
                <path d="M1 7 H13 M8 2 L13 7 L8 12" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            )}
          </button>

          {(status === 'sent' || status === 'error') && (
            <p
              role="status"
              className={`mt-5 rounded-md px-4 py-3 text-sm font-medium ${
                status === 'sent' ? 'bg-accent/10 text-accent' : 'bg-accent/10 text-accent'
              }`}
            >
              {message}
            </p>
          )}
        </form>

        {/* Side column */}
        <div className="space-y-8">
          <div className="rounded-lg bg-foreground p-8 text-background shadow-md">
            <h2 className="font-display text-2xl font-semibold tracking-tight">Prefer to talk first?</h2>
            <p className="mt-2 text-sm leading-relaxed text-background/75">
              Book a free 20-minute discovery call. No slides, no pressure — just a friendly chat about
              whether we're a good fit.
            </p>
            <div className="mt-6 overflow-hidden rounded-md border border-white/20 bg-background">
              <iframe
                src={calendlySrc}
                title="Book a discovery call via Calendly"
                loading="lazy"
                className="h-[520px] w-full"
              />
            </div>
            <p className="mt-4 text-xs text-background/60">
              Scheduler not loading? Email{' '}
              <a href={`mailto:${p.email}`} className="link-underline text-accent">
                {p.email}
              </a>{' '}
              and we'll find a time.
            </p>
          </div>

          <div className="rounded-lg border border-border p-8 shadow-sm">
            <h2 className="font-display text-2xl font-semibold tracking-tight">Direct lines</h2>
            <ul className="mt-4 space-y-3 text-[15px]">
              <li>
                <span className="text-muted-foreground">Email — </span>
                <a href={`mailto:${p.email}`} className="link-underline font-medium">{p.email}</a>
              </li>
              <li>
                <span className="text-muted-foreground">Phone / Viber — </span>
                <a href={`tel:${p.phoneRaw}`} className="link-underline font-medium">{p.phone}</a>
              </li>
              <li>
                <span className="text-muted-foreground">GitHub — </span>
                <a href={p.github} target="_blank" rel="noreferrer" className="link-underline font-medium">@jshi1223</a>
              </li>
              <li>
                <span className="text-muted-foreground">Studio — </span>
                <span className="font-medium">{p.location}</span>
              </li>
            </ul>
            <p className="mt-5 rounded-md bg-accent/10 px-4 py-3 text-xs leading-relaxed text-accent">
              Working hours: Mon–Fri, 9am–6pm PHT (GMT+8). Async-friendly across timezones.
            </p>
          </div>
        </div>
      </section>

      {/* ============ FAQ ============ */}
      <section className="border-t border-border bg-muted/50 py-32">
        <div className="container-x grid gap-12 lg:grid-cols-[1fr_1.5fr]">
          <div className="lg:sticky lg:top-28">
            <p className="small-caps mb-3">FAQ</p>
            <h2 className="font-display text-huge font-medium leading-[1.1] tracking-tight">
              Working together, answered.
            </h2>
            <p className="mt-5 max-w-md text-muted-foreground">
              The questions every client asks before saying yes — answered honestly, in public.
            </p>
          </div>
          <div>
            {content.faqs.map((f) => (
              <Faq key={f.q} q={f.q} a={f.a} />
            ))}
          </div>
        </div>
      </section>
    </>
  )
}
