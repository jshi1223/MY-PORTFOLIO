import { Link, useParams } from 'react-router-dom'
import Artwork from '../components/Artwork'
import Portrait from '../components/Portrait'
import Reveal from '../components/Reveal'
import { content } from '../data/content'
import { usePageTitle } from '../hooks/usePageTitle'

function fmtDate(iso: string) {
  return new Date(iso).toLocaleDateString('en-PH', { year: 'numeric', month: 'long', day: 'numeric' })
}

export default function JournalPost() {
  const { slug } = useParams<{ slug: string }>()
  const post = content.posts.find((p) => p.slug === slug)
  usePageTitle(post ? post.title : 'Post not found')

  if (!post) {
    return (
      <section className="container-x pb-24 pt-40 text-center">
        <h1 className="font-display text-huge font-semibold tracking-tightest">Post not found</h1>
        <Link to="/journal" className="btn-solid mt-8">
          Back to the Journal
        </Link>
      </section>
    )
  }

  const others = content.posts.filter((p) => p.slug !== post.slug).slice(0, 2)

  return (
    <article className="container-x max-w-4xl pb-24 pt-32 sm:pt-40">
      <Reveal>
        <Link to="/journal" className="link-underline text-sm font-semibold uppercase tracking-widest text-smoke">
          ← Journal
        </Link>
        <p className="mt-8 text-xs font-bold uppercase tracking-widest text-accent">{post.category}</p>
        <h1 className="mt-3 font-display text-huge font-semibold leading-[1.02] tracking-tightest">{post.title}</h1>
        <p className="mt-5 text-xs uppercase tracking-widest text-smoke">
          {fmtDate(post.date)} · {post.readTime} · by {content.profile.name}
        </p>
      </Reveal>

      <Reveal delay={100}>
        <div className="mt-10 overflow-hidden rounded-2xl border border-ink/15">
          <div className="aspect-[21/9]">
            <Artwork seed={post.slug} label={post.category} className="h-full w-full" />
          </div>
        </div>
      </Reveal>

      <div className="mt-12">
        {post.blocks.map((block, i) => (
          <Reveal key={i} delay={50}>
            <section className="mt-10 first:mt-0">
              {block.h && (
                <h2 className="mb-4 font-display text-3xl font-semibold tracking-tight">{block.h}</h2>
              )}
              {block.p.map((para, j) => (
                <p key={j} className="mt-4 text-lg leading-relaxed text-ink/85 first:mt-0">
                  {para}
                </p>
              ))}
            </section>
          </Reveal>
        ))}
      </div>

      {/* Author box */}
      <Reveal>
        <aside className="mt-16 flex flex-col gap-5 rounded-2xl border border-ink/15 bg-cream p-7 sm:flex-row sm:items-center">
          <Portrait className="h-20 w-20 shrink-0 rounded-full border border-ink/15" rounded />
          <div>
            <p className="font-display text-xl font-semibold">Written by {content.profile.name}</p>
            <p className="mt-1 text-sm leading-relaxed text-smoke">
              Brand & web designer in Batangas, PH. If you enjoyed this, the newsletter goes out
              monthly-ish and contains at least one strong opinion per issue.
            </p>
            <Link to="/contact" className="link-underline mt-2 inline-block font-semibold text-accent">
              Start a conversation →
            </Link>
          </div>
        </aside>
      </Reveal>

      {/* More posts */}
      <Reveal>
        <div className="mt-20">
          <h2 className="eyebrow">Keep reading</h2>
          <div className="mt-6 grid gap-6 sm:grid-cols-2">
            {others.map((o) => (
              <Link
                key={o.slug}
                to={`/journal/${o.slug}`}
                className="group rounded-2xl border border-ink/15 p-6 transition-all duration-300 hover:-translate-y-1 hover:border-accent"
              >
                <p className="text-xs font-bold uppercase tracking-widest text-accent">{o.category}</p>
                <h3 className="mt-2 font-display text-xl font-semibold leading-snug tracking-tight group-hover:text-accent">
                  {o.title}
                </h3>
                <p className="mt-2 line-clamp-2 text-sm text-smoke">{o.excerpt}</p>
              </Link>
            ))}
          </div>
        </div>
      </Reveal>
    </article>
  )
}
