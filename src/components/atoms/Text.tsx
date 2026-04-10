import { ReactNode } from 'react'

export type TextVariant = 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'intro' | 'body' | 'small' | 'link'
export type TextColor = 'brand-dark' | 'brand-pureWhite' | 'brand-teal' | 'brand-navy' | 'brand-surface' | 'brand-muted'
export type TextAlign = 'left' | 'center' | 'right'

type TextProps = {
  as?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'p' | 'span' | 'small' | 'a'
  variant?: TextVariant
  color?: TextColor
  align?: TextAlign
  className?: string
  children: ReactNode
}

export function Text({
  as,
  variant,
  color,
  align,
  className = '',
  children,
}: TextProps) {
  // Compute default element from variant if not provided
  let Component: React.ElementType = 'p'
  if (as) {
    Component = as
  } else if (variant === 'h1' || variant === 'h2' || variant === 'h3' || variant === 'h4' || variant === 'h5') {
    Component = variant
  }

  const baseClasses = []

  if (variant === 'intro') baseClasses.push('intro')
  if (variant === 'link') baseClasses.push('text-link')

  if (color) baseClasses.push(`text-${color}`)
  if (align) baseClasses.push(`text-${align}`)

  return (
    <Component className={`${baseClasses.join(' ')} ${className}`.trim()}>
      {children}
    </Component>
  )
}
