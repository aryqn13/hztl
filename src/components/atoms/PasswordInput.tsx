import { useState } from 'react'
import { IconEye, IconEyeOff } from './Icons'

interface PasswordInputProps {
  placeholder: string
  value: string
  onChange: (val: string) => void
  id?: string
  required?: boolean
}

export function PasswordInput({ placeholder, value, onChange, id, required }: PasswordInputProps) {
  const [visible, setVisible] = useState(false)

  return (
    <div className="relative flex items-center border-b border-brand-dark">
      <input
        id={id}
        type={visible ? 'text' : 'password'}
        placeholder={placeholder}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full bg-transparent pb-3 pr-10 text-base font-semibold text-brand-dark placeholder-brand-dark/70 outline-none"
        required={required}
        autoComplete="off"
      />
      <button
        type="button"
        className="absolute right-0 bottom-3 text-brand-dark/60 hover:text-brand-dark transition-colors"
        onClick={() => setVisible(!visible)}
        aria-label={visible ? 'Hide password' : 'Show password'}
      >
        {visible ? <IconEyeOff /> : <IconEye />}
      </button>
    </div>
  )
}
