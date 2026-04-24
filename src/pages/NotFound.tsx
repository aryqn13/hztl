import { Link } from 'react-router-dom'

export function NotFound() {
  return (
    <section className="bg-white py-16 lg:py-24">
      <div className="container-desktop">
        <div className="mx-auto max-w-2xl">
          <p className="mb-4 text-sm font-bold tracking-wider text-brand-dark uppercase">
            404 ERROR
          </p>

          <h2 className="mb-4 text-brand-dark">
            Whoops. You've reached a page that doesn't exist.
          </h2>

          <p className="mb-10 text-base text-brand-dark/80">
            Let's bring you back to a better place.
          </p>

          <Link to="/" className="btn-primary">
            Return to homepage
          </Link>
        </div>
      </div>
    </section>
  )
}
