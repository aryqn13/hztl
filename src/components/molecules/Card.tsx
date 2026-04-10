import { ReactNode } from 'react'
import { Text } from '../atoms/Text'

export type CardProps = {
  icon?: string
  title: string
  className?: string
  children?: ReactNode
}

export function Card({ icon, title, className = '', children }: CardProps) {
  return (
    <div className={`group flex flex-col items-center transition-colors hover:bg-brand-teal ${className}`.trim()}>
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
    </div>
  )
}
