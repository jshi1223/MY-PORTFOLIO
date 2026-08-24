import { Link } from 'react-router-dom'
import Artwork from '../components/Artwork'
import { usePageTitle } from '../hooks/usePageTitle'

export default function NotFound() {
  usePageTitle('Page not found')
  return (
    <section className="container-x grid items-center gap-10 pb-24 pt-40 lg:grid-cols-2">
      <div>
        <p className="eyebrow">Error 404</p>
        <h1 className="mt-3 font-display text-mega font-semibold leading-none tracking-tightest">
          Lost in the <em className="text-accent">grid</em>.
        </h1>
        <p className="mt-6 max-w-md text-lg text-smoke">
          This page wandered off the artboard. Let's get you back somewhere designed on purpose.
        </p>
        <div className="mt-8 flex flex-wrap gap-4">
          <Link to="/" className="btn-solid">
            Back home
          </Link>
          <Link to="/work" className="btn-ghost">
            See the work
          </Link>
        </div>
      </div>
      <Artwork seed="lost-page-404" label="Not Found" className="w-full rounded-3xl border border-ink/15" />
    </section>
  )
}
