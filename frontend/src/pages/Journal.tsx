import { Link } from 'react-router-dom'
import Artwork from '../components/Artwork'
import Reveal from '../components/Reveal'
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
        <Reveal>
          <p className="eyebrow">Journal</p>
          <h1 className="mt-3 max-w-4xl font-display text-huge font-semibold leading-[0.95] tracking-tightest">
            Notes from the studio floor<span className="text-accent">.</span>
          </h1>
          <p className="mt-6 max-w-2xl text-lg text-smoke">
            Behind-the-scenes stories, honest process notes, and the occasional strong opinion about
            Comic Sans (it has its place; your logo is not it).
          </p>
        </Reveal>
      </section>

      <section className="container-x pb-24">
        {/* Featured post */}
        <Reveal>
          <Link
            to={`/journal/${content.posts[0].slug}`}
            className="group grid overflow-hidden rounded-3xl border border-ink/15 bg-cream lg:grid-cols-2"
          >
            <div className="aspect-[16/10] lg:aspect-auto">
              <Artwork
                seed={content.posts[0].slug}
                label={content.posts[0].category}
                className="h-full w-full transition-transform duration-700 group-hover:scale-[1.03]"
              />
            </div>
            <div className="flex flex-col justify-center p-8 sm:p-12">
              <p className="eyebrow">Latest · {content.posts[0].category}</p>
              <h2 className="mt-4 font-display text-3xl font-semibold leading-tight tracking-tight transition-colors group-hover:text-accent sm:text-4xl">
                {content.posts[0].title}
              </h2>
              <p className="mt-4 leading-relaxed text-smoke">{content.posts[0].excerpt}</p>
              <p className="mt-6 text-xs uppercase tracking-widest text-smoke">
                {fmtDate(content.posts[0].date)} · {content.posts[0].readTime}
              </p>
            </div>
          </Link>
        </Reveal>

        <div className="mt-12 grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {content.posts.slice(1).map((post, i) => (
            <Reveal key={post.slug} delay={(i % 3) * 100}>
              <Link
                to={`/journal/${post.slug}`}
                className="group flex h-full flex-col overflow-hidden rounded-2xl border border-ink/15 bg-paper transition-all duration-300 hover:-translate-y-1 hover:shadow-[6px_6px_0_0_#17130E]"
              >
                <div className="aspect-[16/10] overflow-hidden">
                  <Artwork seed={post.slug} label={post.category} className="h-full w-full transition-transform duration-700 group-hover:scale-[1.05]" />
                </div>
                <div className="flex flex-1 flex-col p-6">
                  <p className="text-xs font-bold uppercase tracking-widest text-accent">{post.category}</p>
                  <h3 className="mt-2 font-display text-xl font-semibold leading-snug tracking-tight group-hover:text-accent">
                    {post.title}
                  </h3>
                  <p className="mt-2 flex-1 text-sm leading-relaxed text-smoke">{post.excerpt}</p>
                  <p className="mt-4 text-xs uppercase tracking-widest text-smoke">
                    {fmtDate(post.date)} · {post.readTime}
                  </p>
                </div>
              </Link>
            </Reveal>
          ))}
        </div>
      </section>
    </>
  )
}
