import { useState } from 'react'
import { Navigate, useNavigate } from 'react-router-dom'
import { useAuth } from '../lib/useAuth'
import { changePassword } from '../lib/auth'
import { PasswordInput } from '../components/atoms/PasswordInput'
import { PasswordStrength, isPasswordValid } from '../components/atoms/PasswordStrength'
import { IconClose } from '../components/atoms/Icons'

export function ChangePassword() {
  const { loggedIn } = useAuth()
  const navigate = useNavigate()

  const [currentPw, setCurrentPw] = useState('')
  const [newPw, setNewPw] = useState('')
  const [confirmPw, setConfirmPw] = useState('')
  const [error, setError] = useState('')
  const [captchaChecked, setCaptchaChecked] = useState(false)

  if (!loggedIn) return <Navigate to="/login" replace />

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setError('')

    if (!isPasswordValid(newPw, confirmPw)) {
      setError('Please meet all password requirements.')
      return
    }

    const result = changePassword(currentPw, newPw)
    if (result.ok) {
      navigate('/profile')
    } else {
      setError(result.error || 'Failed to change password.')
    }
  }

  return (
    <section className="bg-white py-16 lg:py-24">
      {/* Modal-like overlay on desktop, full page on mobile */}
      <div className="container-desktop">
        <div className="mx-auto max-w-2xl rounded-sm bg-white p-6 lg:shadow-xl lg:border lg:border-gray-200 lg:p-12">
          {/* Close */}
          <div className="flex justify-end mb-4">
            <button
              type="button"
              className="inline-flex items-center gap-1 text-sm text-brand-dark hover:text-brand-dark/70 transition-colors"
              onClick={() => navigate('/profile')}
            >
              Close <IconClose className="w-4 h-4" />
            </button>
          </div>

          {/* Decorative bar */}
          <div className="mb-4 h-1.5 w-12 bg-brand-dark"></div>

          <h2 className="mb-10 text-brand-dark">Change Password</h2>

          <form className="flex flex-col gap-8" onSubmit={handleSubmit}>
            {/* Current Password */}
            <PasswordInput
              placeholder="Current Password*"
              value={currentPw}
              onChange={setCurrentPw}
              required
            />

            {/* Strength indicator */}
            <PasswordStrength password={newPw} confirmPassword={confirmPw} />

            {/* New & Confirm — side by side on desktop */}
            <div className="grid gap-8 lg:grid-cols-2">
              <PasswordInput
                placeholder="New Password*"
                value={newPw}
                onChange={setNewPw}
                required
              />
              <PasswordInput
                placeholder="Confirm Password*"
                value={confirmPw}
                onChange={setConfirmPw}
                required
              />
            </div>

            {/* Fake reCAPTCHA */}
            <div className="flex items-center gap-3 rounded border border-gray-300 bg-gray-50 px-4 py-3 w-fit">
              <input
                type="checkbox"
                checked={captchaChecked}
                onChange={(e) => setCaptchaChecked(e.target.checked)}
                className="h-5 w-5 accent-brand-teal"
                id="captcha-cp"
              />
              <label htmlFor="captcha-cp" className="text-sm text-brand-dark select-none cursor-pointer">
                I'm not a robot
              </label>
              <span className="ml-6 text-[10px] text-gray-400 leading-tight">
                reCAPTCHA<br />Privacy · Terms
              </span>
            </div>

            {error && (
              <p className="text-sm font-medium text-red-500">{error}</p>
            )}

            <button
              type="submit"
              className="btn-primary w-full"
              disabled={!captchaChecked}
            >
              Submit
            </button>
          </form>
        </div>
      </div>
    </section>
  )
}
