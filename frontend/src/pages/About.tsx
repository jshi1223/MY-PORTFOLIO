import { Link } from 'react-router-dom'
import Portrait from '../components/Portrait'
import Reveal from '../components/Reveal'
import { content } from '../data/content'
import { usePageTitle } from '../hooks/usePageTitle'

export default function About() {
  usePageTitle('About')
  const p = content.profile

  return (
    <>
      {/* ============ HEADER ============ */}
      <section className="container-x grid gap-12 pb-20 pt-32 sm:pt-40 lg:grid-cols-[1fr_1fr]">
        <Reveal>
          <div className="flex h-full flex-col justify-center">
            <p className="eyebrow">About the human behind the work</p>
            <h1 className="mt-4 font-display text-huge font-semibold leading-[0.95] tracking-tightest">
              Hi, I'm Vanessa<span className="text-accent">.</span> I make brands
              worth remembering.
            </h1>
            <p className="mt-6 max-w-xl text-lg leading-relaxed text-smoke">{p.intro}</p>
            <div className="mt-8 flex flex-wrap gap-4">
              <Link to="/contact" className="btn-solid">
                Work with me
              </Link>
              <a href={`mailto:${p.email}`} className="btn-ghost">
                {p.email}
              </a>
            </div>
          </div>
        </Reveal>
        <Reveal delay={150}>
          <div className="relative overflow-hidden rounded-3xl border border-ink/15 bg-cream">
            <Portrait className="aspect-[4/5] w-full" />
            <span className="absolute bottom-4 left-4 rounded-full bg-ink/80 px-4 py-1.5 text-xs font-bold uppercase tracking-widest text-paper backdrop-blur">
              {content.profile.name} — {content.profile.role}
            </span>
          </div>
        </Reveal>
      </section>

      {/* ============ STORY ============ */}
      <section className="border-y border-ink/15 bg-cream/60 py-24">
        <div className="container-x grid gap-12 lg:grid-cols-[1fr_1.4fr]">
          <Reveal>
            <p className="eyebrow">Why I do this</p>
            <h2 className="mt-3 font-display text-huge font-semibold leading-none tracking-tightest">
              The long version.
            </h2>
          </Reveal>
          <Reveal delay={120}>
            <div className="space-y-5 text-lg leading-relaxed text-ink/85">
              <p>
                I grew up in my Lola's sari-sari store in Sto. Tomas, watching her sell by personality:
                regulars didn't come for the prices, they came for <em>her</em>. Years later in design
                school it clicked — that's branding. Not logos. Being impossible to confuse with anyone else.
              </p>
              <p>
                I spent my early career at a Manila agency learning systems, deadlines, and how to defend a
                concept to twelve stakeholders before lunch. Then in 2020 I moved home to Batangas, set up a
                desk facing Mount Makulot, and started SHI STUDIO with one rule:{' '}
                <strong>work only with people whose products I'd recommend to my Lola.</strong>
              </p>
              <p>
                Six years on, that rule has kept the calendar honest — cafés that remember your order,
                fintechs sending money home with dignity, festivals turning whole plazas into galleries.
                Small businesses deserve big-league design without big-agency theater. That's the whole
                business plan.
              </p>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ============ SERVICES OFFERED ============ */}
      <section className="container-x py-24">
        <Reveal>
          <p className="eyebrow">What I offer</p>
          <h2 className="mt-3 max-w-3xl font-display text-huge font-semibold leading-none tracking-tightest">
            Capabilities, briefly.
          </h2>
        </Reveal>
        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {content.services.map((s, i) => (
            <Reveal key={s.slug} delay={(i % 3) * 100}>
              <Link
                to={`/services#${s.slug}`}
                className="group flex h-full flex-col rounded-2xl border border-ink/15 bg-paper p-7 transition-all duration-300 hover:-translate-y-1 hover:border-accent hover:shadow-[6px_6px_0_0_#17130E]"
              >
                <span className="font-display italic text-smoke">0{i + 1}</span>
                <h3 className="mt-2 font-display text-2xl font-semibold tracking-tight group-hover:text-accent">
                  {s.name}
                </h3>
                <p className="mt-2 flex-1 text-sm leading-relaxed text-smoke">{s.tagline}</p>
                <span className="mt-4 text-xs font-bold uppercase tracking-widest text-accent">{s.price} →</span>
              </Link>
            </Reveal>
          ))}
        </div>
      </section>

      {/* ============ PROCESS ============ */}
      <section className="bg-ink py-24 text-paper">
        <div className="container-x">
          <Reveal>
            <p className="eyebrow !text-paper/60">How we'll work together</p>
            <h2 className="mt-3 max-w-3xl font-display text-huge font-semibold leading-none tracking-tightest">
              Five steps. Zero mystery.
            </h2>
          </Reveal>
          <ol className="mt-14 grid gap-px overflow-hidden rounded-2xl border border-paper/20 bg-paper/20 sm:grid-cols-2 lg:grid-cols-5">
            {content.processSteps.map((step, i) => (
              <li key={step.step} className="bg-ink p-7 transition-colors duration-300 hover:bg-moss">
                <Reveal delay={i * 80}>
                  <p className="font-display text-4xl font-semibold text-accent">{step.step}</p>
                  <h3 className="mt-3 font-display text-2xl font-semibold tracking-tight">{step.title}</h3>
                  <p className="mt-3 text-sm leading-relaxed text-paper/75">{step.body}</p>
                </Reveal>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* ============ CLIENTS ============ */}
      <section className="container-x py-24">
        <Reveal>
          <p className="eyebrow">Trusted by</p>
          <h2 className="mt-3 font-display text-huge font-semibold leading-none tracking-tightest">
            Some good company.
          </h2>
        </Reveal>
        <Reveal delay={100}>
          <ul className="mt-12 grid grid-cols-2 overflow-hidden rounded-2xl border border-ink/15 sm:grid-cols-3 lg:grid-cols-5">
            {content.clients.map((c, i) => (
              <li
                key={c}
                className="-mr-px -mb-px flex items-center justify-center border-b border-r border-ink/15 px-4 py-8 text-center"
                style={{ animationDelay: `${i * 40}ms` }}
              >
                <span className="font-display text-lg font-semibold tracking-tight text-smoke transition-colors hover:text-accent sm:text-xl">
                  {c}
                </span>
              </li>
            ))}
          </ul>
        </Reveal>
      </section>

      {/* ============ PRESS + INTERESTS ============ */}
      <section className="container-x grid gap-16 pb-24 lg:grid-cols-2">
        <div>
          <Reveal>
            <p className="eyebrow">Press & features</p>
            <h2 className="mt-3 font-display text-huge font-semibold leading-none tracking-tightest">
              In the wild.
            </h2>
          </Reveal>
          <div className="mt-10">
            {content.press.map((item, i) => (
              <Reveal key={item.title} delay={i * 60}>
                <div className="card-line flex items-baseline justify-between gap-4 py-5">
                  <div>
                    <p className="font-semibold">{item.title}</p>
                    <p className="text-sm text-smoke">{item.source}</p>
                  </div>
                  <span className="shrink-0 rounded-full border border-ink/20 px-3 py-1 text-xs font-bold">
                    {item.year}
                  </span>
                </div>
              </Reveal>
            ))}
          </div>
        </div>

        <div>
          <Reveal>
            <p className="eyebrow">Off the clock</p>
            <h2 className="mt-3 font-display text-huge font-semibold leading-none tracking-tightest">
              Things I love that have nothing to do with kerning.
            </h2>
          </Reveal>
          <ul className="mt-10 space-y-0">
            {[
              ['Film photography', 'A trusty Canon AE-1 and a fridge full of expired film. My portfolio would be better if my shots were.'],
              ['Pour-over obsession', '18g, 300ml, three pours. Working with coffee clients was inevitable and also dangerous for my budget.'],
              ['Badminton nights', 'Every Tuesday with tricycle drivers, teachers, and me. My smash is mediocre; my trash talk is elite.'],
              ['Cat fostering', 'Four rescue cats have passed through (three stayed). Studio meetings may include purring.'],
              ['Thrifted books', 'Batangas ukay-ukay stalls know me. Current stack: design monographs and Filipino folklore anthologies.'],
            ].map(([title, note], i) => (
              <Reveal key={title} delay={i * 60}>
                <li className="card-line list-none py-5">
                  <p className="font-display text-xl font-semibold tracking-tight">{title}</p>
                  <p className="mt-1 text-smoke">{note}</p>
                </li>
              </Reveal>
            ))}
          </ul>
        </div>
      </section>
    </>
  )
}
