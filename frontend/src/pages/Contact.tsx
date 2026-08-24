import { useMemo, useState, type FormEvent } from 'react'
import { useSearchParams } from 'react-router-dom'
import Reveal from '../components/Reveal'
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
          className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-ink/25 text-lg transition-all duration-300 ${
            open ? 'rotate-45 border-accent bg-accent text-paper' : ''
          }`}
          aria-hidden
        >
          +
        </span>
      </button>
      <div
        className={`grid transition-all duration-300 ${open ? 'grid-rows-[1fr] pb-6 opacity-100' : 'grid-rows-[0fr] opacity-0'}`}
      >
        <p className="overflow-hidden leading-relaxed text-smoke">{a}</p>
      </div>
    </div>
  )
}

const inputCls =
  'w-full rounded-xl border border-ink/20 bg-paper px-4 py-3 text-[15px] transition-colors placeholder:text-smoke/60 focus:border-accent focus:outline-none focus:ring-2 focus:ring-accent/30'

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

  const calendlySrc = useMemo(() => `${p.calendly}?hide_gdpr_banner=1&background_color=F6F1E7&text_color=17130E&primary_color=E8480C`, [p.calendly])

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
        <Reveal>
          <p className="eyebrow">Contact</p>
          <h1 className="mt-3 max-w-5xl font-display text-huge font-semibold leading-[0.95] tracking-tightest">
            Let's create something{' '}
            <em className="not-italic text-accent">together</em>.
          </h1>
          <p className="mt-6 max-w-2xl text-lg text-smoke">
            Tell me about your project below, or skip the form and grab a call slot directly. I reply to
            every serious inquiry within one business day — usually faster, unless the cats are on the keyboard.
          </p>
        </Reveal>
      </section>

      {/* ============ FORM + INFO ============ */}
      <section className="container-x grid gap-12 pb-24 lg:grid-cols-[1.35fr_1fr]">
        <Reveal>
          <form onSubmit={onSubmit} className="rounded-3xl border border-ink/15 bg-cream p-7 sm:p-10" noValidate={false}>
            <h2 className="font-display text-3xl font-semibold tracking-tight">Project inquiry</h2>
            <p className="mt-2 text-sm text-smoke">
              Fields marked * are required. The more detail, the better my first reply.
            </p>

            <div className="mt-8 grid gap-5 sm:grid-cols-2">
              <label className="block">
                <span className="eyebrow mb-2 block">Name *</span>
                <input required type="text" value={form.name} onChange={set('name')} placeholder="Juan dela Cruz" className={inputCls} />
              </label>
              <label className="block">
                <span className="eyebrow mb-2 block">Email *</span>
                <input required type="email" value={form.email} onChange={set('email')} placeholder="you@company.com" className={inputCls} />
              </label>
              <label className="block sm:col-span-2">
                <span className="eyebrow mb-2 block">Company / brand</span>
                <input type="text" value={form.company} onChange={set('company')} placeholder="Optional but helpful" className={inputCls} />
              </label>
              <label className="block">
                <span className="eyebrow mb-2 block">Budget range *</span>
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
                <span className="eyebrow mb-2 block">Timeline *</span>
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
                <span className="eyebrow mb-2 block">Project type *</span>
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
                <span className="eyebrow mb-2 block">Project description *</span>
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

            <button type="submit" disabled={status === 'sending'} className="btn-accent mt-8 w-full disabled:opacity-60 sm:w-auto">
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
                className={`mt-5 rounded-xl px-4 py-3 text-sm font-medium ${
                  status === 'sent' ? 'bg-moss/15 text-moss' : 'bg-accent/10 text-accent'
                }`}
              >
                {message}
              </p>
            )}
          </form>
        </Reveal>

        {/* Side column */}
        <div className="space-y-8">
          <Reveal delay={100}>
            <div className="rounded-3xl bg-ink p-8 text-paper">
              <h2 className="font-display text-2xl font-semibold tracking-tight">Prefer to talk first?</h2>
              <p className="mt-2 text-sm leading-relaxed text-paper/75">
                Book a free 20-minute discovery call. No slides, no pressure — just a friendly chat about
                whether we're a good fit.
              </p>
              <div className="mt-6 overflow-hidden rounded-xl border border-paper/20 bg-paper">
                <iframe
                  src={calendlySrc}
                  title="Book a discovery call via Calendly"
                  loading="lazy"
                  className="h-[520px] w-full"
                />
              </div>
              <p className="mt-4 text-xs text-paper/60">
                Scheduler not loading? Email{' '}
                <a href={`mailto:${p.email}`} className="link-underline text-accent">
                  {p.email}
                </a>{' '}
                and we'll find a time.
              </p>
            </div>
          </Reveal>

          <Reveal delay={180}>
            <div className="rounded-3xl border border-ink/15 p-8">
              <h2 className="font-display text-2xl font-semibold tracking-tight">Direct lines</h2>
              <ul className="mt-4 space-y-3 text-[15px]">
                <li>
                  <span className="text-smoke">Email — </span>
                  <a href={`mailto:${p.email}`} className="link-underline font-medium">{p.email}</a>
                </li>
                <li>
                  <span className="text-smoke">Phone / Viber — </span>
                  <a href={`tel:${p.phoneRaw}`} className="link-underline font-medium">{p.phone}</a>
                </li>
                <li>
                  <span className="text-smoke">GitHub — </span>
                  <a href={p.github} target="_blank" rel="noreferrer" className="link-underline font-medium">@jshi1223</a>
                </li>
                <li>
                  <span className="text-smoke">Studio — </span>
                  <span className="font-medium">{p.location}</span>
                </li>
              </ul>
              <p className="mt-5 rounded-xl bg-moss/10 px-4 py-3 text-xs leading-relaxed text-moss">
                Working hours: Mon–Fri, 9am–6pm PHT (GMT+8). Async-friendly across timezones.
              </p>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ============ FAQ ============ */}
      <section className="border-t border-ink/15 bg-cream/60 py-24">
        <div className="container-x grid gap-12 lg:grid-cols-[1fr_1.5fr]">
          <Reveal>
            <div className="lg:sticky lg:top-28">
              <p className="eyebrow">FAQ</p>
              <h2 className="mt-3 font-display text-huge font-semibold leading-none tracking-tightest">
                Working together, answered.
              </h2>
              <p className="mt-5 max-w-md text-smoke">
                The questions every client asks before saying yes — answered honestly, in public.
              </p>
            </div>
          </Reveal>
          <Reveal delay={120}>
            <div>
              {content.faqs.map((f) => (
                <Faq key={f.q} q={f.q} a={f.a} />
              ))}
            </div>
          </Reveal>
        </div>
      </section>
    </>
  )
}
