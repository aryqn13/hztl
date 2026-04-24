import { useState } from 'react'
import { Link } from 'react-router-dom'

export function ForgotPassword() {
  const [email, setEmail] = useState('')
  const [submitted, setSubmitted] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // In a real app this would fire an API call.
    // For our localStorage demo we just show a success message.
    setSubmitted(true)
  }

  return (
    <section className="bg-white py-16 lg:py-24">
      <div className="container-desktop">
        <div className="mx-auto max-w-lg">
          {/* Decorative bar */}
          <div className="mb-4 h-1.5 w-12 bg-brand-dark"></div>

          <h2 className="mb-4 text-brand-dark">Forgot Password?</h2>

          <p className="mb-10 text-base text-brand-dark/80">
            Please enter in the email address associated with the account
          </p>

          {submitted ? (
            <div>
              <p className="mb-6 text-base font-semibold text-brand-dark">
                If an account exists for <strong>{email}</strong>, a password reset link has been sent.
              </p>
              <Link to="/login" className="btn-primary w-full text-center">
                Back to Log In
              </Link>
            </div>
          ) : (
            <form className="flex flex-col gap-10" onSubmit={handleSubmit}>
              <div className="border-b border-brand-dark">
                <input
                  type="email"
                  placeholder="Email Address"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full bg-transparent pb-3 text-base font-semibold text-brand-dark placeholder-brand-dark/70 outline-none"
                  required
                />
              </div>

              <button type="submit" className="btn-primary w-full">
                Submit
              </button>
            </form>
          )}
        </div>
      </div>
    </section>
  )
}
