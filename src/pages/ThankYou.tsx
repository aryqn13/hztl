import { Link } from 'react-router-dom'

export function ThankYou() {
  return (
    <section className="bg-white py-16 lg:py-24">
      <div className="container-desktop">
        <div className="mx-auto max-w-lg">
          {/* Decorative bar */}
          <div className="mb-4 h-1.5 w-12 bg-brand-dark"></div>

          <h2 className="mb-6 text-brand-dark">Thank you!</h2>

          <p className="mb-10 text-base text-brand-dark/80">
            You've successfully created your account with Horizontal Training Portal.
          </p>

          <Link to="/login" className="btn-primary w-full text-center">
            Log in for continue browsing
          </Link>
        </div>
      </div>
    </section>
  )
}
