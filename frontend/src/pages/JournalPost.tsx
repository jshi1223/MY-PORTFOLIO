import { Link, useParams } from 'react-router-dom'
import Artwork from '../components/Artwork'
import Portrait from '../components/Portrait'
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
        <h1 className="font-display text-huge font-medium tracking-tight">Post not found</h1>
        <Link to="/journal" className="btn-solid mt-8">
          Back to the Journal
        </Link>
      </section>
    )
  }

  const others = content.posts.filter((p) => p.slug !== post.slug).slice(0, 2)

  return (
    <article className="container-x max-w-4xl pb-24 pt-32 sm:pt-40">
      <Link to="/journal" className="link-underline text-sm font-medium uppercase tracking-wide text-muted-foreground">
        ← Journal
      </Link>
      <p className="mt-8 font-mono text-xs font-medium uppercase tracking-wide text-accent">{post.category}</p>
      <h1 className="mt-3 font-display text-huge font-medium leading-[1.05] tracking-tight">{post.title}</h1>
      <p className="mt-5 font-mono text-xs uppercase tracking-[0.15em] text-muted-foreground">
        {fmtDate(post.date)} · {post.readTime} · by {content.profile.name}
      </p>

      <div className="mt-10 overflow-hidden rounded-lg border border-border">
        <div className="aspect-[21/9]">
          <Artwork seed={post.slug} label={post.category} className="h-full w-full" />
        </div>
      </div>

      <div className="mt-12">
        {post.blocks.map((block, i) => (
          <section key={i} className="mt-10 first:mt-0">
            {block.h && (
              <h2 className="mb-4 font-display text-3xl font-semibold tracking-tight">{block.h}</h2>
            )}
            {block.p.map((para, j) => (
              <p key={j} className="mt-4 text-lg leading-relaxed text-foreground/85 first:mt-0">
                {para}
              </p>
            ))}
          </section>
        ))}
      </div>

      {/* Author box */}
      <aside className="mt-16 flex flex-col gap-5 rounded-lg border border-border bg-muted p-7 sm:flex-row sm:items-center">
        <Portrait className="h-20 w-20 shrink-0 rounded-full border border-border" rounded />
        <div>
          <p className="font-display text-xl font-semibold">Written by {content.profile.name}</p>
          <p className="mt-1 text-sm leading-relaxed text-muted-foreground">
            Full-stack developer in Batangas, PH. If you enjoyed this, follow me on GitHub
              for more project breakdowns and code.
          </p>
          <Link to="/contact" className="link-underline mt-2 inline-block font-medium text-accent">
            Start a conversation →
          </Link>
        </div>
      </aside>

      {/* More posts */}
      <div className="mt-20">
        <p className="small-caps mb-3">Keep reading</p>
        <div className="mt-6 grid gap-6 sm:grid-cols-2">
          {others.map((o) => (
            <Link
              key={o.slug}
              to={`/journal/${o.slug}`}
              className="group rounded-lg border border-border p-6 transition-all duration-200 hover:border-accent hover:shadow-sm"
            >
              <p className="font-mono text-xs font-medium uppercase tracking-wide text-accent">{o.category}</p>
              <h3 className="mt-2 font-display text-xl font-semibold leading-snug tracking-tight transition-colors duration-200 group-hover:text-accent">
                {o.title}
              </h3>
              <p className="mt-2 line-clamp-2 text-sm text-muted-foreground">{o.excerpt}</p>
            </Link>
          ))}
        </div>
      </div>
    </article>
  )
}
