import { Link } from 'react-router-dom'
import Artwork from '../components/Artwork'
import { content } from '../data/content'
import { usePageTitle } from '../hooks/usePageTitle'

function fmtDate(iso: string) {
  return new Date(iso).toLocaleDateString('en-PH', { year: 'numeric', month: 'long', day: 'numeric' })
}

export default function Journal() {
  usePageTitle('Journal')

  return (
    <>
      <section className="container-x pb-14 pt-32 sm:pt-40">
        <p className="small-caps mb-3">Journal</p>
        <h1 className="max-w-4xl font-display text-huge font-medium leading-[1.02] tracking-tight">
          Notes from the studio floor<span className="text-accent">.</span>
        </h1>
        <p className="mt-6 max-w-2xl text-lg text-muted-foreground">
          Behind-the-scenes breakdowns, tech deep-dives, and honest lessons from building
          real apps — web, mobile, and desktop.
        </p>
      </section>

      <section className="container-x pb-32">
        {/* Featured post */}
        <Link
          to={`/journal/${content.posts[0].slug}`}
          className="group grid overflow-hidden rounded-lg border border-border bg-muted shadow-sm lg:grid-cols-2"
        >
          <div className="aspect-[16/10] lg:aspect-auto">
            <Artwork
              seed={content.posts[0].slug}
              label={content.posts[0].category}
              className="h-full w-full transition-transform duration-500 group-hover:scale-[1.02]"
            />
          </div>
          <div className="flex flex-col justify-center p-8 sm:p-12">
            <p className="small-caps">Latest · {content.posts[0].category}</p>
            <h2 className="mt-4 font-display text-3xl font-semibold leading-tight tracking-tight transition-colors duration-200 group-hover:text-accent sm:text-4xl">
              {content.posts[0].title}
            </h2>
            <p className="mt-4 leading-relaxed text-muted-foreground">{content.posts[0].excerpt}</p>
            <p className="mt-6 font-mono text-xs uppercase tracking-[0.15em] text-muted-foreground">
              {fmtDate(content.posts[0].date)} · {content.posts[0].readTime}
            </p>
          </div>
        </Link>

        <div className="mt-12 grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {content.posts.slice(1).map((post) => (
            <Link
              key={post.slug}
              to={`/journal/${post.slug}`}
              className="group flex h-full flex-col overflow-hidden rounded-lg border border-border bg-card shadow-sm transition-shadow duration-200 hover:shadow-md"
            >
              <div className="aspect-[16/10] overflow-hidden">
                <Artwork seed={post.slug} label={post.category} className="h-full w-full transition-transform duration-500 group-hover:scale-[1.02]" />
              </div>
              <div className="flex flex-1 flex-col p-6">
                <p className="font-mono text-xs font-medium uppercase tracking-wide text-accent">{post.category}</p>
                <h3 className="mt-2 font-display text-xl font-semibold leading-snug tracking-tight transition-colors duration-200 group-hover:text-accent">
                  {post.title}
                </h3>
                <p className="mt-2 flex-1 text-sm leading-relaxed text-muted-foreground">{post.excerpt}</p>
                <p className="mt-4 font-mono text-xs uppercase tracking-[0.15em] text-muted-foreground">
                  {fmtDate(post.date)} · {post.readTime}
                </p>
              </div>
            </Link>
          ))}
        </div>
      </section>
    </>
  )
}
