import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { register } from '../lib/auth'
import { PasswordInput } from '../components/atoms/PasswordInput'
import { PasswordStrength, isPasswordValid } from '../components/atoms/PasswordStrength'
import { IconArrowLeft } from '../components/atoms/Icons'

export function Signup() {
  const navigate = useNavigate()

  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')
  const [email, setEmail] = useState('')
  const [phone, setPhone] = useState('')
  const [department, setDepartment] = useState('')
  const [role, setRole] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')

  const [emailError, setEmailError] = useState('')
  const [globalError, setGlobalError] = useState('')
  const [captchaChecked, setCaptchaChecked] = useState(false)

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setEmailError('')
    setGlobalError('')

    // Validate email format
    if (!emailRegex.test(email)) {
      setEmailError('Please enter valid email formate.')
      return
    }

    // Validate password strength
    if (!isPasswordValid(password, confirmPassword)) {
      setGlobalError('Please meet all password requirements.')
      return
    }

    const result = register({
      firstName,
      lastName,
      email,
      phone,
      department,
      role,
      password,
    })

    if (result.ok) {
      navigate('/thank-you')
    } else {
      setGlobalError(
        result.error || 'Registration failed.',
      )
    }
  }

  return (
    <section className="bg-white py-16 lg:py-24">
      <div className="container-desktop">
        <div className="mx-auto max-w-lg">
          {/* Back */}
          <Link
            to="/login"
            className="mb-8 inline-flex items-center gap-2 text-sm text-brand-dark hover:text-brand-dark/70 transition-colors"
          >
            <IconArrowLeft />
            <span>Back</span>
          </Link>

          {/* Decorative bar */}
          <div className="mb-4 h-1.5 w-12 bg-brand-dark"></div>

          <h2 className="mb-10 text-brand-dark">Create an account</h2>

          <form className="flex flex-col gap-8" onSubmit={handleSubmit}>
            {/* First Name */}
            <div className="border-b border-brand-dark">
              <input
                type="text"
                placeholder="First Name*"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
                className="w-full bg-transparent pb-3 text-base font-semibold text-brand-dark placeholder-brand-dark/70 outline-none"
                required
              />
            </div>

            {/* Last Name */}
            <div className="border-b border-brand-dark">
              <input
                type="text"
                placeholder="Last Name*"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
                className="w-full bg-transparent pb-3 text-base font-semibold text-brand-dark placeholder-brand-dark/70 outline-none"
                required
              />
            </div>

            {/* Email */}
            <div>
              <div className="border-b border-brand-dark">
                <input
                  type="email"
                  placeholder="Email Address*"
                  value={email}
                  onChange={(e) => { setEmail(e.target.value); setEmailError('') }}
                  className="w-full bg-transparent pb-3 text-base font-semibold text-brand-dark placeholder-brand-dark/70 outline-none"
                  required
                />
              </div>
              {emailError && (
                <p className="mt-1 text-sm font-medium text-red-500">{emailError}</p>
              )}
            </div>

            {/* Phone */}
            <div className="border-b border-brand-dark">
              <input
                type="tel"
                placeholder="Phone Number*"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                className="w-full bg-transparent pb-3 text-base font-semibold text-brand-dark placeholder-brand-dark/70 outline-none"
                required
              />
            </div>

            {/* Department */}
            <div className="border-b border-brand-dark">
              <select
                value={department}
                onChange={(e) => setDepartment(e.target.value)}
                className="w-full appearance-none bg-transparent pb-3 text-base font-semibold text-brand-dark outline-none"
                required
              >
                <option value="" disabled>Department</option>
                <option value="UI/UX Department">UI/UX Department</option>
                <option value="Engineering">Engineering</option>
                <option value="Sales">Sales</option>
                <option value="Support">Support</option>
                <option value="Marketing">Marketing</option>
              </select>
            </div>

            {/* Role */}
            <div className="border-b border-brand-dark">
              <input
                type="text"
                placeholder="Role*"
                value={role}
                onChange={(e) => setRole(e.target.value)}
                className="w-full bg-transparent pb-3 text-base font-semibold text-brand-dark placeholder-brand-dark/70 outline-none"
                required
              />
            </div>

            {/* Password Strength Indicator */}
            <PasswordStrength password={password} confirmPassword={confirmPassword} />

            {/* Password */}
            <PasswordInput
              placeholder="Password*"
              value={password}
              onChange={setPassword}
              required
            />

            {/* Confirm Password */}
            <PasswordInput
              placeholder="Confirm Password*"
              value={confirmPassword}
              onChange={setConfirmPassword}
              required
            />

            {/* Fake reCAPTCHA */}
            <div className="flex items-center gap-3 rounded border border-gray-300 bg-gray-50 px-4 py-3 w-fit">
              <input
                type="checkbox"
                checked={captchaChecked}
                onChange={(e) => setCaptchaChecked(e.target.checked)}
                className="h-5 w-5 accent-brand-teal"
                id="captcha"
              />
              <label htmlFor="captcha" className="text-sm text-brand-dark select-none cursor-pointer">
                I'm not a robot
              </label>
              <span className="ml-6 text-[10px] text-gray-400 leading-tight">
                reCAPTCHA<br />Privacy · Terms
              </span>
            </div>

            {/* Global Error */}
            {globalError && (
              <p className="text-sm font-medium text-red-500">
                {globalError.includes('Email already') ? (
                  <>
                    Email already associated with a Horizontal portal account - please{' '}
                    <Link to="/login" className="font-bold underline text-red-500">log-in</Link>{' '}
                    using those credentials or choose a different email.
                  </>
                ) : (
                  globalError
                )}
              </p>
            )}

            {/* Submit */}
            <button
              type="submit"
              className="btn-primary w-full"
              disabled={!captchaChecked}
            >
              Submit
            </button>

            {/* Divider */}
            <div className="border-t border-brand-dark/20"></div>

            {/* Login link */}
            <p className="text-sm text-brand-dark">
              Already have an account?{' '}
              <Link to="/login" className="text-link">
                Sign in now
              </Link>
            </p>
          </form>
        </div>
      </div>
    </section>
  )
}
