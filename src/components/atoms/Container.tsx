import { ReactNode, ElementType } from 'react'

export type ContainerProps = {
  as?: ElementType
  className?: string
  children: ReactNode
}

export function Container({ as: Component = 'div', className = '', children }: ContainerProps) {
  return (
    <Component className={`container-desktop ${className}`.trim()}>
      {children}
    </Component>
  )
}
