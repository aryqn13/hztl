import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { login } from '../lib/auth'
import { PasswordInput } from '../components/atoms/PasswordInput'

export function Login() {
  const navigate = useNavigate()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    const result = login(email, password)
    if (result.ok) {
      navigate('/')
    } else {
      setError(result.error || 'Invalid credentials.')
    }
  }

  return (
    <section className="bg-white py-16 lg:py-24">
      <div className="container-desktop">
        <div className="mx-auto max-w-lg">
          {/* Decorative bar */}
          <div className="mb-4 h-1.5 w-12 bg-brand-dark"></div>

          <h2 className="mb-10 text-brand-dark">Log into your account</h2>

          <form className="flex flex-col gap-8" onSubmit={handleSubmit}>
            {/* Email */}
            <div className="border-b border-brand-dark">
              <input
                type="email"
                placeholder="Email Address*"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full bg-transparent pb-3 text-base font-semibold text-brand-dark placeholder-brand-dark/70 outline-none"
                required
              />
            </div>

            {/* Password */}
            <PasswordInput
              placeholder="Password*"
              value={password}
              onChange={setPassword}
              required
            />

            {/* Forgot password */}
            <div className="flex justify-end -mt-4">
              <Link
                to="/forgot-password"
                className="text-sm text-brand-dark/70 hover:text-brand-dark transition-colors"
              >
                Forgot password?
              </Link>
            </div>

            {/* Error message */}
            {error && (
              <p className="text-sm font-medium text-red-500">{error}</p>
            )}

            {/* Submit */}
            <button type="submit" className="btn-primary w-full">
              Log In
            </button>

            {/* Divider */}
            <div className="border-t border-brand-dark/20"></div>

            {/* Signup link */}
            <p className="text-sm text-brand-dark">
              Don't have an account with Horizontal Training Portal?{' '}
              <Link to="/signup" className="text-link">
                Create an account now
              </Link>
            </p>
          </form>
        </div>
      </div>
    </section>
  )
}
