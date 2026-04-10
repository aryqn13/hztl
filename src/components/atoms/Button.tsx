import { ReactNode, MouseEvent } from 'react'

type ButtonVariant = 'primary' | 'outline' | 'dark'

export type ButtonProps = {
  variant?: ButtonVariant
  href?: string
  onClick?: (e: MouseEvent<HTMLAnchorElement | HTMLButtonElement>) => void
  type?: 'button' | 'submit'
  className?: string
  children: ReactNode
}

export function Button({
  variant = 'primary',
  href,
  onClick,
  type = 'button',
  className = '',
  children,
}: ButtonProps) {
  const variantClass = `btn-${variant}`
  const classes = `${variantClass} ${className}`.trim()

  if (href) {
    return (
      <a href={href} onClick={onClick} className={classes}>
        {children}
      </a>
    )
  }

  return (
    <button type={type} onClick={onClick} className={classes}>
      {children}
    </button>
  )
}
