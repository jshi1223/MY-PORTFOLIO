import { Link } from 'react-router-dom'
import Portrait from '../components/Portrait'
import { content } from '../data/content'
import { usePageTitle } from '../hooks/usePageTitle'

export default function About() {
  usePageTitle('About')
  const p = content.profile

  return (
    <>
      {/* ============ HEADER ============ */}
      <section className="container-x grid gap-12 pb-20 pt-32 sm:pt-40 lg:grid-cols-[1fr_1fr]">
        <div className="flex h-full flex-col justify-center">
          <p className="small-caps mb-4">About the human behind the work</p>
          <h1 className="font-display text-huge font-medium leading-[1.02] tracking-tight">
            Hi, I'm Vaness<span className="text-accent">.</span> I build apps
            worth using.
          </h1>
          <p className="mt-6 max-w-xl text-lg leading-relaxed text-muted-foreground">{p.intro}</p>
          <div className="mt-8 flex flex-wrap gap-4">
            <Link to="/contact" className="btn-solid">
              Work with me
            </Link>
            <a href={`mailto:${p.email}`} className="btn-ghost">
              {p.email}
            </a>
          </div>
        </div>
        <div className="relative overflow-hidden rounded-lg border border-border bg-muted">
          <Portrait className="aspect-[4/5] w-full" />
          <span className="absolute bottom-4 left-4 rounded-md bg-foreground/80 px-4 py-1.5 font-mono text-xs font-medium uppercase tracking-[0.15em] text-background backdrop-blur">
            {content.profile.name} — {content.profile.role}
          </span>
        </div>
      </section>

      {/* ============ STORY ============ */}
      <section className="border-y border-border bg-muted/50 py-32">
        <div className="container-x grid gap-12 lg:grid-cols-[1fr_1.4fr]">
          <div>
            <p className="small-caps mb-3">Why I do this</p>
            <h2 className="font-display text-huge font-medium leading-[1.1] tracking-tight">
              The long version.
            </h2>
          </div>
          <div className="space-y-5 text-lg leading-relaxed text-foreground/85">
            <p>
              I started by tweaking WordPress themes for classmates. Then I discovered that the real
              power is in building things from scratch — not just making them look good, but making
              them actually work. That curiosity pulled me from CSS into JavaScript, then into full-stack
              development.
            </p>
            <p>
              I've built web apps with React and Next.js, mobile apps with React Native, and desktop
              software with Electron and Tauri. Every project teaches me something new — a better
              pattern, a faster approach, a cleaner architecture. Code is a craft, and I treat it like one.
            </p>
            <p>
              Based in Batangas, Philippines, I work with clients across timezones. Whether it's a POS
              system for a local store or a SaaS platform for a startup, I bring the same attention to
              detail: clean code, smooth UX, and zero drama.
            </p>
          </div>
        </div>
      </section>

      {/* ============ SERVICES OFFERED ============ */}
      <section className="container-x py-32">
        <div className="section-label">
          <span className="rule" />
          <span className="label">What I offer</span>
          <span className="rule" />
        </div>
        <h2 className="mt-3 max-w-3xl font-display text-huge font-medium leading-[1.1] tracking-tight">
          Capabilities, briefly.
        </h2>
        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {content.services.map((s, i) => (
            <Link
              key={s.slug}
              to={`/services#${s.slug}`}
              className="group flex h-full flex-col rounded-lg border border-border bg-card p-7 shadow-sm transition-all duration-200 hover:shadow-md hover:border-accent"
            >
              <span className="font-display italic text-muted-foreground">0{i + 1}</span>
              <h3 className="mt-2 font-display text-2xl font-semibold tracking-tight transition-colors duration-200 group-hover:text-accent">
                {s.name}
              </h3>
              <p className="mt-2 flex-1 text-sm leading-relaxed text-muted-foreground">{s.tagline}</p>
              <span className="mt-4 font-mono text-xs font-medium uppercase tracking-wide text-accent">{s.price} →</span>
            </Link>
          ))}
        </div>
      </section>

      {/* ============ PROCESS ============ */}
      <section className="bg-foreground py-32 text-background">
        <div className="container-x">
          <p className="small-caps !text-background/50 mb-3">How we'll work together</p>
          <h2 className="mt-3 max-w-3xl font-display text-huge font-medium leading-[1.1] tracking-tight">
            Five steps. Zero mystery.
          </h2>
          <ol className="mt-14 grid gap-px overflow-hidden rounded-lg border border-white/20 bg-white/20 sm:grid-cols-2 lg:grid-cols-5">
            {content.processSteps.map((step) => (
              <li key={step.step} className="bg-foreground p-7 transition-colors duration-200 hover:bg-accent">
                <p className="font-display text-4xl font-semibold text-accent">{step.step}</p>
                <h3 className="mt-3 font-display text-2xl font-semibold tracking-tight">{step.title}</h3>
                <p className="mt-3 text-sm leading-relaxed text-background/75">{step.body}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* ============ CLIENTS ============ */}
      <section className="container-x py-32">
        <p className="small-caps mb-3">Trusted by</p>
        <h2 className="font-display text-huge font-medium leading-[1.1] tracking-tight">
          Some good company.
        </h2>
        <ul className="mt-12 grid grid-cols-2 overflow-hidden rounded-lg border border-border sm:grid-cols-3 lg:grid-cols-5">
          {content.clients.map((c) => (
            <li
              key={c}
              className="-mr-px -mb-px flex items-center justify-center border-b border-r border-border px-4 py-8 text-center"
            >
              <span className="font-display text-lg font-semibold tracking-tight text-muted-foreground transition-colors duration-200 hover:text-accent sm:text-xl">
                {c}
              </span>
            </li>
          ))}
        </ul>
      </section>

      {/* ============ PRESS + INTERESTS ============ */}
      <section className="container-x grid gap-16 pb-32 lg:grid-cols-2">
        <div>
          <p className="small-caps mb-3">Press & features</p>
          <h2 className="font-display text-huge font-medium leading-[1.1] tracking-tight">
            In the wild.
          </h2>
          <div className="mt-10">
            {content.press.map((item) => (
              <div key={item.title} className="card-line flex items-baseline justify-between gap-4 py-5">
                <div>
                  <p className="font-medium">{item.title}</p>
                  <p className="text-sm text-muted-foreground">{item.source}</p>
                </div>
                <span className="shrink-0 rounded-md border border-border px-3 py-1 font-mono text-xs font-medium">
                  {item.year}
                </span>
              </div>
            ))}
          </div>
        </div>

        <div>
          <p className="small-caps mb-3">Off the clock</p>
          <h2 className="font-display text-huge font-medium leading-[1.1] tracking-tight">
            Things I love that have nothing to do with kerning.
          </h2>
          <ul className="mt-10 space-y-0">
            {[
              ['Open Source', 'Contributing to projects and sharing my own tools on GitHub. If it\'s useful, I open-source it.'],
              ['Side Projects', 'Always building something. POS systems, CLI tools, game prototypes — if it solves a problem, I\'m in.'],
              ['Coffee & Code', 'Late-night coding sessions fueled by kapeng barako. Some of my best commits happen after midnight.'],
              ['Gaming', 'When I\'m not coding, I\'m gaming. RTS, RPG, or the occasional competitive round — it keeps the problem-solving sharp.'],
              ['Tech Blogging', 'Writing about what I learn. Process notes, architecture decisions, and lessons from shipped projects.'],
            ].map(([title, note]) => (
              <li key={title} className="card-line list-none py-5">
                <p className="font-display text-xl font-semibold tracking-tight">{title}</p>
                <p className="mt-1 text-muted-foreground">{note}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>
    </>
  )
}
