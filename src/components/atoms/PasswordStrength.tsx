import { IconCheck, IconCircle } from './Icons'

interface PasswordStrengthProps {
  password: string
  confirmPassword: string
}

const RULES = [
  { label: 'minimum 10 characters', test: (p: string) => p.length >= 10 },
  { label: '1 uppercase letter', test: (p: string) => /[A-Z]/.test(p) },
  { label: '1 lowercase letter', test: (p: string) => /[a-z]/.test(p) },
  { label: '1 numeric character', test: (p: string) => /\d/.test(p) },
  { label: '1 special character (such as !, %, @, #)', test: (p: string) => /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/.test(p) },
]

export function PasswordStrength({ password, confirmPassword }: PasswordStrengthProps) {
  const passwordsMatch = password.length > 0 && confirmPassword.length > 0 && password === confirmPassword

  return (
    <div className="mt-2">
      <p className="mb-3 text-sm font-bold text-brand-dark">Password must contain:</p>
      <div className="grid grid-cols-2 gap-x-6 gap-y-2">
        {RULES.map((rule) => {
          const pass = rule.test(password)
          return (
            <div key={rule.label} className="flex items-center gap-2">
              {pass ? <IconCheck /> : <IconCircle />}
              <span className="text-xs text-brand-dark/70">{rule.label}</span>
            </div>
          )
        })}
        <div className="flex items-center gap-2">
          {passwordsMatch ? <IconCheck /> : <IconCircle />}
          <span className="text-xs text-brand-dark/70">Passwords match</span>
        </div>
      </div>
    </div>
  )
}

/** Returns true if all password rules pass AND passwords match */
export function isPasswordValid(password: string, confirmPassword: string): boolean {
  return RULES.every((r) => r.test(password)) && password === confirmPassword && password.length > 0
}
