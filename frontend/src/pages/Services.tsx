import { Link } from 'react-router-dom'
import { content } from '../data/content'
import { usePageTitle } from '../hooks/usePageTitle'

export default function Services() {
  usePageTitle('Services')

  return (
    <>
      <section className="container-x pb-16 pt-32 sm:pt-40">
        <p className="small-caps mb-3">Services & pricing</p>
        <h1 className="max-w-4xl font-display text-huge font-medium leading-[1.02] tracking-tight">
          Clear scope. Fixed price. No invoice anxiety<span className="text-accent">.</span>
        </h1>
        <p className="mt-6 max-w-2xl text-lg text-muted-foreground">
          Every engagement starts with a discovery call and ends with a fixed-price proposal —
          the number you see is the number you pay. Prices in USD; Philippine clients, we can talk pesos.
        </p>
      </section>

      <section className="container-x space-y-8 pb-32">
        {content.services.map((s, i) => (
          <article
            key={s.slug}
            id={s.slug}
            className="grid scroll-mt-28 gap-8 rounded-lg border p-8 shadow-sm transition-shadow duration-200 hover:shadow-md sm:p-10 lg:grid-cols-[1.4fr_1fr]"
            style={{ borderColor: 'rgb(var(--border))', backgroundColor: 'rgb(var(--card))' }}
          >
            <div>
              <p className="font-display text-lg italic text-accent">0{i + 1}</p>
              <h2 className="mt-2 font-display text-3xl font-semibold tracking-tight sm:text-5xl">{s.name}</h2>
              <p className="mt-2 text-lg text-muted-foreground">{s.tagline}</p>

              <h3 className="small-caps mt-8">What's included</h3>
              <ul className="mt-4 grid gap-x-8 gap-y-3 sm:grid-cols-2">
                {s.includes.map((inc) => (
                  <li key={inc} className="flex items-start gap-3 text-[15px] leading-relaxed">
                    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden className="mt-1 shrink-0 text-accent">
                      <path d="M2 8.5 L6 12 L14 4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                    {inc}
                  </li>
                ))}
              </ul>
            </div>

            <div className="flex flex-col justify-between gap-6 rounded-lg p-7" style={{ backgroundColor: 'rgb(var(--muted))' }}>
              <div className="space-y-5">
                <div className="card-line pt-4" style={{ borderTopColor: 'rgb(var(--border))' }}>
                  <p className="small-caps">Investment</p>
                  <p className="mt-1 font-display text-4xl font-semibold tracking-tight">{s.price}</p>
                </div>
                <div className="card-line pt-4">
                  <p className="small-caps">Typical timeline</p>
                  <p className="mt-1 font-display text-2xl font-semibold tracking-tight">{s.timeline}</p>
                </div>
                <p className="text-xs leading-relaxed text-muted-foreground">
                  Final quote depends on scope. Rush projects possible when my calendar allows (with a
                  rush fee and an apology to my sleep schedule).
                </p>
              </div>
              <Link to={`/contact?service=${s.name}`} className="btn-solid w-full">
                Inquire
              </Link>
            </div>
          </article>
        ))}

        <div className="rounded-lg border border-dashed border-border p-10 text-center">
          <h2 className="font-display text-3xl font-semibold tracking-tight">
            Something else in mind?
          </h2>
          <p className="mx-auto mt-3 max-w-xl text-muted-foreground">
            Naming, brand audits, workshops, design direction for your in-house team — if it involves
            making a brand more memorable, I probably do it.
          </p>
          <Link to="/contact" className="btn-solid mt-6">
            Ask me anything
          </Link>
        </div>
      </section>
    </>
  )
}
