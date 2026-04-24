import { Link } from 'react-router-dom'

export type BreadcrumbItem = {
  label: string
  href?: string
}

export type BreadcrumbProps = {
  items: BreadcrumbItem[]
}

export function Breadcrumb({ items }: BreadcrumbProps) {
  return (
    <nav className="flex items-center gap-2 text-sm text-brand-muted" aria-label="Breadcrumb">
      {items.map((item, index) => (
        <span key={index} className="flex items-center gap-2">
          {index > 0 && <span className="text-brand-muted/60">|</span>}
          {item.href ? (
            <Link
              to={item.href}
              className="transition-colors hover:text-brand-dark"
            >
              {item.label}
            </Link>
          ) : (
            <span className="text-brand-muted/80">{item.label}</span>
          )}
        </span>
      ))}
    </nav>
  )
}
