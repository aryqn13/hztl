import { ReactNode } from 'react'
import { Link } from 'react-router-dom'
import { Text } from '../atoms/Text'

export type CardProps = {
  icon?: string
  title: string
  href?: string
  className?: string
  children?: ReactNode
}

export function Card({ icon, title, href, className = '', children }: CardProps) {
  const content = (
    <>
      {icon && (
        <img 
          src={icon} 
          alt="" 
          className="mb-6 h-[88px] w-auto transition-all group-hover:brightness-0 group-hover:invert" 
        />
      )}
      <Text 
        as="h3" 
        variant="h3" 
        color="brand-dark" 
        align="center" 
        className="mb-6 transition-colors group-hover:text-white"
      >
        {title}
      </Text>
      {children}
    </>
  )

  const sharedClassName = `group flex flex-col items-center transition-colors hover:bg-brand-teal ${className}`.trim()

  if (href) {
    return (
      <Link to={href} className={sharedClassName}>
        {content}
      </Link>
    )
  }

  return (
    <div className={sharedClassName}>
      {content}
    </div>
  )
}
