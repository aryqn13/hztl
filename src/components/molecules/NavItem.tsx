
import { IconChevronDown, IconChevronRight } from '../atoms/Icons'

export type NavItemProps = {
  id: string
  label: string
  hasDropdown: boolean
  isActive: boolean
  isMobile?: boolean
  onClick?: () => void
}

export function NavItem({ id, label, hasDropdown, isActive, isMobile = false, onClick }: NavItemProps) {
  if (isMobile) {
    return (
      <li className="border-b border-white/15">
        <a
          href={`#${id}`}
          onClick={onClick}
          className="flex items-center justify-between py-6 text-base font-bold leading-6 text-white"
        >
          <span>{label}</span>
          {hasDropdown && <IconChevronRight className="text-white" />}
        </a>
      </li>
    )
  }

  // Desktop usage
  return (
    <li className="flex items-center">
      <a
        href={`#${id}`}
        className={[
          'inline-flex items-center gap-1.5 text-base font-medium leading-7 transition-colors',
          isActive && id !== 'home'
            ? 'border-b-2 border-white pb-1 text-white'
            : 'border-b-2 border-transparent pb-1 text-white hover:text-white/85',
        ].join(' ')}
      >
        <span>{label}</span>
        {hasDropdown && <IconChevronDown className="opacity-90" />}
      </a>
    </li>
  )
}
